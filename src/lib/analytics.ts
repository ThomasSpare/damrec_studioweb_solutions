export function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'Mobile'
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'Tablet'
  }
  return 'Desktop'
}

export function getBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  
  if (ua.includes('chrome') && !ua.includes('edg')) return 'Chrome'
  if (ua.includes('firefox')) return 'Firefox'
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari'
  if (ua.includes('edg')) return 'Edge'
  if (ua.includes('opera') || ua.includes('opr')) return 'Opera'
  
  return 'Other'
}

export function getOS(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  
  if (ua.includes('windows')) return 'Windows'
  if (ua.includes('macintosh') || ua.includes('mac os')) return 'macOS'
  if (ua.includes('linux')) return 'Linux'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS'
  
  return 'Other'
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = forwarded?.split(',')[0] || realIP || '127.0.0.1'
  return clientIP.trim()
}

export async function getLocationFromIP(ip: string): Promise<{ country?: string; city?: string }> {
  try {
    // Using ipapi.co for IP geolocation (free tier: 1000 requests/day)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Studio-Analytics/1.0'
      }
    })
    
    if (!response.ok) {
      return {}
    }
    
    const data = await response.json()
    
    return {
      country: data.country_name || undefined,
      city: data.city || undefined
    }
  } catch (error) {
    console.error('Failed to get location from IP:', error)
    return {}
  }
}