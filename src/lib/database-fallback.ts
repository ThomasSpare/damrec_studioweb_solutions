// Fallback analytics when database is not available
export const fallbackAnalytics = {
  summary: {
    totalPageViews: 0,
    totalUniqueVisitors: 0,
    avgDailyViews: 0
  },
  dailyStats: [],
  countryStats: [],
  topPages: [],
  browserStats: [],
  deviceStats: [],
  referrerStats: []
}

export function isDatabaseConfigured(): boolean {
  return !!process.env.DATABASE_URL
}

export async function executeWithFallback<T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    if (!isDatabaseConfigured()) {
      console.warn('Database not configured, using fallback data')
      return fallback
    }
    return await operation()
  } catch (error) {
    console.error('Database operation failed, using fallback:', error)
    return fallback
  }
}