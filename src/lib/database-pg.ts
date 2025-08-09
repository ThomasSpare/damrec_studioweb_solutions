import { Pool, PoolClient } from 'pg'

// Create a connection pool only if DATABASE_URL is provided
let pool: Pool | null = null

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
} else {
  console.warn('DATABASE_URL not found. Analytics features will be disabled.')
}

// Initialize database tables
export async function initializeDatabase() {
  if (!pool) {
    throw new Error('Database not configured')
  }
  
  const client = await pool.connect()
  
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        path TEXT NOT NULL,
        referrer TEXT,
        user_agent TEXT,
        ip_address TEXT,
        country TEXT,
        city TEXT,
        device_type TEXT,
        browser TEXT,
        os TEXT,
        screen_resolution TEXT,
        session_id TEXT NOT NULL,
        is_unique_visitor BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        page_count INTEGER DEFAULT 1,
        duration INTEGER DEFAULT 0,
        ip_address TEXT,
        user_agent TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
      CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
      CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_created ON sessions(created_at);
    `)
    
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization failed:', error)
    throw error
  } finally {
    client.release()
  }
}

export async function insertPageView(
  path: string,
  referrer: string | null,
  userAgent: string,
  ipAddress: string,
  country: string | null,
  city: string | null,
  deviceType: string,
  browser: string,
  os: string,
  screenResolution: string | null,
  sessionId: string,
  isUniqueVisitor: boolean
) {
  if (!pool) throw new Error('Database not configured')
  const client = await pool.connect()
  
  try {
    const result = await client.query(`
      INSERT INTO page_views (
        path, referrer, user_agent, ip_address, country, city,
        device_type, browser, os, screen_resolution, session_id, is_unique_visitor
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id
    `, [path, referrer, userAgent, ipAddress, country, city, deviceType, browser, os, screenResolution, sessionId, isUniqueVisitor])
    
    return result.rows[0].id
  } finally {
    client.release()
  }
}

export async function insertSession(sessionId: string, pageCount: number, ipAddress: string, userAgent: string) {
  const client = await pool.connect()
  
  try {
    await client.query(`
      INSERT INTO sessions (id, created_at, updated_at, page_count, ip_address, user_agent)
      VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET
        updated_at = CURRENT_TIMESTAMP,
        page_count = $2
    `, [sessionId, pageCount, ipAddress, userAgent])
  } finally {
    client.release()
  }
}

export async function updateSession(sessionId: string) {
  const client = await pool.connect()
  
  try {
    await client.query(`
      UPDATE sessions 
      SET updated_at = CURRENT_TIMESTAMP, page_count = page_count + 1
      WHERE id = $1
    `, [sessionId])
  } finally {
    client.release()
  }
}

export async function getDailyStats() {
  const client = await pool.connect()
  
  try {
    const result = await client.query(`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as page_views,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_views
      WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days'
      GROUP BY DATE(timestamp)
      ORDER BY date DESC
    `)
    
    return result.rows
  } finally {
    client.release()
  }
}

export async function getCountryStats() {
  const client = await pool.connect()
  
  try {
    const result = await client.query(`
      SELECT 
        country,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_views
      WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days' AND country IS NOT NULL
      GROUP BY country
      ORDER BY visits DESC
      LIMIT 20
    `)
    
    return result.rows
  } finally {
    client.release()
  }
}

export async function getTopPages() {
  const client = await pool.connect()
  
  try {
    const result = await client.query(`
      SELECT 
        path,
        COUNT(*) as views,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_views
      WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days'
      GROUP BY path
      ORDER BY views DESC
      LIMIT 20
    `)
    
    return result.rows
  } finally {
    client.release()
  }
}

export async function getBrowserStats() {
  const client = await pool.connect()
  
  try {
    const result = await client.query(`
      SELECT 
        browser,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_views
      WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days' AND browser IS NOT NULL
      GROUP BY browser
      ORDER BY visits DESC
      LIMIT 10
    `)
    
    return result.rows
  } finally {
    client.release()
  }
}

export async function getDeviceStats() {
  const client = await pool.connect()
  
  try {
    const result = await client.query(`
      SELECT 
        device_type,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_views
      WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days' AND device_type IS NOT NULL
      GROUP BY device_type
      ORDER BY visits DESC
    `)
    
    return result.rows
  } finally {
    client.release()
  }
}

export async function getReferrerStats() {
  const client = await pool.connect()
  
  try {
    const result = await client.query(`
      SELECT 
        CASE 
          WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
          WHEN referrer LIKE '%google.%' THEN 'Google'
          WHEN referrer LIKE '%bing.%' THEN 'Bing'
          WHEN referrer LIKE '%facebook.%' THEN 'Facebook'
          WHEN referrer LIKE '%twitter.%' OR referrer LIKE '%t.co%' THEN 'Twitter'
          WHEN referrer LIKE '%linkedin.%' THEN 'LinkedIn'
          ELSE 'Other'
        END as source,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_views
      WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days'
      GROUP BY source
      ORDER BY visits DESC
    `)
    
    return result.rows
  } finally {
    client.release()
  }
}

export default pool