import { NextResponse } from 'next/server'
import { 
  getDailyStats, 
  getCountryStats, 
  getTopPages, 
  getBrowserStats, 
  getDeviceStats, 
  getReferrerStats,
  initializeDatabase
} from '@/lib/database-pg'
import { executeWithFallback, fallbackAnalytics, isDatabaseConfigured } from '@/lib/database-fallback'

export async function GET() {
  try {
    // If database not configured, return fallback data
    if (!isDatabaseConfigured()) {
      return NextResponse.json(fallbackAnalytics)
    }
    
    // Initialize database on first request with fallback
    await executeWithFallback(
      () => initializeDatabase(),
      undefined
    )
    
    const dailyStats = await executeWithFallback(
      () => getDailyStats(),
      []
    )
    const countryStats = await executeWithFallback(
      () => getCountryStats(),
      []
    )
    const topPages = await executeWithFallback(
      () => getTopPages(),
      []
    )
    const browserStats = await executeWithFallback(
      () => getBrowserStats(),
      []
    )
    const deviceStats = await executeWithFallback(
      () => getDeviceStats(),
      []
    )
    const referrerStats = await executeWithFallback(
      () => getReferrerStats(),
      []
    )

    // Calculate totals with null safety
    const totalPageViews = dailyStats.reduce((sum: number, day: any) => sum + (day.page_views || 0), 0)
    const totalUniqueVisitors = dailyStats.length > 0 
      ? Math.max(...dailyStats.map((day: any) => day.unique_visitors || 0))
      : 0

    return NextResponse.json({
      summary: {
        totalPageViews,
        totalUniqueVisitors,
        avgDailyViews: Math.round(totalPageViews / Math.max(dailyStats.length, 1))
      },
      dailyStats: dailyStats.reverse(), // Show oldest first for charts
      countryStats,
      topPages,
      browserStats,
      deviceStats,
      referrerStats
    })
  } catch (error) {
    console.error('Failed to get analytics stats:', error)
    return NextResponse.json(
      { error: 'Failed to get analytics stats' },
      { status: 500 }
    )
  }
}