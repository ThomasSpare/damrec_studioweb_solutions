import { NextRequest, NextResponse } from 'next/server'
import { insertPageView, insertSession, updateSession, initializeDatabase } from '@/lib/database-pg'
import { 
  getDeviceType, 
  getBrowser, 
  getOS, 
  getClientIP, 
  getLocationFromIP 
} from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    // Initialize database on first request
    await initializeDatabase()
    
    const body = await request.json()
    const { path, referrer, sessionId, screenResolution } = body
    
    const userAgent = request.headers.get('user-agent') || ''
    const ip = getClientIP(request)
    
    // Get device information
    const deviceType = getDeviceType(userAgent)
    const browser = getBrowser(userAgent)
    const os = getOS(userAgent)
    
    // Get location (with error handling for rate limits)
    let location: { country?: string; city?: string } = {}
    if (ip !== '127.0.0.1' && ip !== '::1') {
      try {
        location = await getLocationFromIP(ip)
      } catch (error) {
        console.log('Location lookup failed, continuing without location data')
      }
    }
    
    // Check if this is a new session
    const isNewSession = !sessionId || sessionId === 'new'
    
    let finalSessionId = sessionId
    if (isNewSession) {
      finalSessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
      
      // Insert new session
      await insertSession(finalSessionId, 1, ip, userAgent)
    } else {
      // Update existing session
      await updateSession(sessionId)
    }
    
    // Insert page view
    await insertPageView(
      path,
      referrer || null,
      userAgent,
      ip,
      location.country || null,
      location.city || null,
      deviceType,
      browser,
      os,
      screenResolution || null,
      finalSessionId,
      isNewSession
    )
    
    return NextResponse.json({ 
      success: true, 
      sessionId: finalSessionId 
    })
    
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to track analytics' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Analytics API endpoint' })
}