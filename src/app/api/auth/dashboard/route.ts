import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Force this route to be dynamic (not prerendered at build time)
export const dynamic = 'force-dynamic'

const DASHBOARD_PASSWORD_HASH = '$2b$12$TlFMfoiLTEIg7wPBKvEf5u9B8IVHhwIShiLjihztC2F9rq7QQp0La' // zmakqo0202

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }
    
    const isValid = await bcrypt.compare(password, DASHBOARD_PASSWORD_HASH)
    
    if (isValid) {
      const response = NextResponse.json({ success: true })
      
      // Set httpOnly cookie that expires in 24 hours
      response.cookies.set('dashboard_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 // 24 hours
      })
      
      return response
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Dashboard auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('dashboard_auth')
  
  if (authCookie?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }
  
  return NextResponse.json({ authenticated: false })
}