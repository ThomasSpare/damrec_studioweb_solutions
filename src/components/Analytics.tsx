'use client'

import { useEffect } from 'react'

interface AnalyticsProps {
  path?: string
}

export default function Analytics({ path }: AnalyticsProps) {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = localStorage.getItem('analytics_session') || 'new'
        const screenResolution = `${window.screen.width}x${window.screen.height}`
        
        console.log('📊 Analytics: Tracking page view', {
          path: path || window.location.pathname,
          sessionId: sessionId === 'new' ? 'NEW SESSION' : 'EXISTING'
        })
        
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: path || window.location.pathname,
            referrer: document.referrer,
            sessionId,
            screenResolution,
          }),
        })
        
        const data = await response.json()
        
        console.log('📊 Analytics: Response', data)
        
        if (data.success && data.sessionId) {
          localStorage.setItem('analytics_session', data.sessionId)
          console.log('📊 Analytics: Session saved', data.sessionId)
        }
      } catch (error) {
        console.error('📊 Analytics tracking failed:', error)
      }
    }

    trackPageView()
  }, [path])

  return null
}