import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'analytics.db')
const db = new Database(dbPath)

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
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
    is_unique_visitor BOOLEAN DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
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

// Prepared statements for better performance
export const insertPageView = db.prepare(`
  INSERT INTO page_views (
    path, referrer, user_agent, ip_address, country, city,
    device_type, browser, os, screen_resolution, session_id, is_unique_visitor
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

export const insertSession = db.prepare(`
  INSERT OR REPLACE INTO sessions (id, created_at, updated_at, page_count, ip_address, user_agent)
  VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, ?)
`)

export const updateSession = db.prepare(`
  UPDATE sessions 
  SET updated_at = CURRENT_TIMESTAMP, page_count = page_count + 1
  WHERE id = ?
`)

export const getPageViews = db.prepare(`
  SELECT * FROM page_views 
  WHERE timestamp >= datetime('now', '-30 days')
  ORDER BY timestamp DESC
`)

export const getDailyStats = db.prepare(`
  SELECT 
    DATE(timestamp) as date,
    COUNT(*) as page_views,
    COUNT(DISTINCT session_id) as unique_visitors
  FROM page_views
  WHERE timestamp >= datetime('now', '-30 days')
  GROUP BY DATE(timestamp)
  ORDER BY date DESC
`)

export const getCountryStats = db.prepare(`
  SELECT 
    country,
    COUNT(*) as visits,
    COUNT(DISTINCT session_id) as unique_visitors
  FROM page_views
  WHERE timestamp >= datetime('now', '-30 days') AND country IS NOT NULL
  GROUP BY country
  ORDER BY visits DESC
  LIMIT 20
`)

export const getTopPages = db.prepare(`
  SELECT 
    path,
    COUNT(*) as views,
    COUNT(DISTINCT session_id) as unique_visitors
  FROM page_views
  WHERE timestamp >= datetime('now', '-30 days')
  GROUP BY path
  ORDER BY views DESC
  LIMIT 20
`)

export const getBrowserStats = db.prepare(`
  SELECT 
    browser,
    COUNT(*) as visits,
    COUNT(DISTINCT session_id) as unique_visitors
  FROM page_views
  WHERE timestamp >= datetime('now', '-30 days') AND browser IS NOT NULL
  GROUP BY browser
  ORDER BY visits DESC
  LIMIT 10
`)

export const getDeviceStats = db.prepare(`
  SELECT 
    device_type,
    COUNT(*) as visits,
    COUNT(DISTINCT session_id) as unique_visitors
  FROM page_views
  WHERE timestamp >= datetime('now', '-30 days') AND device_type IS NOT NULL
  GROUP BY device_type
  ORDER BY visits DESC
`)

export const getReferrerStats = db.prepare(`
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
  WHERE timestamp >= datetime('now', '-30 days')
  GROUP BY source
  ORDER BY visits DESC
`)

export default db