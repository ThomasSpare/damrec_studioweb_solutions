import { NextRequest, NextResponse } from 'next/server'

// Force this route to be dynamic (not prerendered at build time)
export const dynamic = 'force-dynamic'
import { insertPageView, insertSession, updateSession, initializeDatabase } from '@/lib/database-pg'
import { executeWithFallback, isDatabaseConfigured } from '@/lib/database-fallback'
import { 
  getDeviceType, 
  getBrowser, 
  getOS, 
  getClientIP, 
  getLocationFromIP 
} from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, referrer, sessionId, screenResolution } = body
    
    console.log('📊 Analytics API: Received tracking request', {
      path,
      sessionId: sessionId === 'new' ? 'NEW SESSION' : sessionId,
      hasReferrer: !!referrer
    })
    
    // If database not configured, just return success
    if (!isDatabaseConfigured()) {
      console.log('📊 Analytics API: Database not configured, using fallback')
      return NextResponse.json({ 
        success: true, 
        sessionId: sessionId || 'fallback' 
      })
    }
    
    // Initialize database on first request
    await executeWithFallback(
      () => initializeDatabase(),
      undefined
    )
    
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
      
      // Insert new session with fallback handling
      await executeWithFallback(
        () => insertSession(finalSessionId, 1, ip, userAgent),
        undefined
      )
    } else {
      // Update existing session with fallback handling
      await executeWithFallback(
        () => updateSession(sessionId),
        undefined
      )
    }
    
    // Insert page view with fallback handling
    await executeWithFallback(
      () => insertPageView(
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
      ),
      undefined
    )
    
    console.log('📊 Analytics API: Successfully tracked page view', {
      sessionId: finalSessionId,
      isNewSession,
      path
    })
    
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