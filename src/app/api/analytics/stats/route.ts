import { NextResponse } from 'next/server'
import { 
  getDailyStats, 
  getCountryStats, 
  getTopPages, 
  getBrowserStats, 
  getDeviceStats, 
  getReferrerStats 
} from '@/lib/database'

export async function GET() {
  try {
    const dailyStats = getDailyStats.all()
    const countryStats = getCountryStats.all()
    const topPages = getTopPages.all()
    const browserStats = getBrowserStats.all()
    const deviceStats = getDeviceStats.all()
    const referrerStats = getReferrerStats.all()

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