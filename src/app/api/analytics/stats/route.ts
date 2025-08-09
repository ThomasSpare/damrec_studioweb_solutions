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

export async function GET() {
  try {
    // Initialize database on first request
    await initializeDatabase()
    
    const dailyStats = await getDailyStats()
    const countryStats = await getCountryStats()
    const topPages = await getTopPages()
    const browserStats = await getBrowserStats()
    const deviceStats = await getDeviceStats()
    const referrerStats = await getReferrerStats()

    // Calculate totals
    const totalPageViews = dailyStats.reduce((sum: number, day: any) => sum + day.page_views, 0)
    const totalUniqueVisitors = Math.max(...dailyStats.map((day: any) => day.unique_visitors))

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