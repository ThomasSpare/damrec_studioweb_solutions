import { NextResponse } from 'next/server'
import { isDatabaseConfigured } from '@/lib/database-fallback'

// Force this route to be dynamic (not prerendered at build time)
export const dynamic = 'force-dynamic'

export async function GET() {
  const dbConfigured = isDatabaseConfigured()
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbConfigured ? 'connected' : 'not_configured',
    environment: process.env.NODE_ENV || 'development'
  })
}