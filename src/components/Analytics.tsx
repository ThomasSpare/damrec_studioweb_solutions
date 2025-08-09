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
        
        if (data.success && data.sessionId) {
          localStorage.setItem('analytics_session', data.sessionId)
        }
      } catch (error) {
        console.error('Analytics tracking failed:', error)
      }
    }

    trackPageView()
  }, [path])

  return null
}