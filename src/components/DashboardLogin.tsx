'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'

interface DashboardLoginProps {
  onLogin: () => void
}

export default function DashboardLogin({ onLogin }: DashboardLoginProps) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        onLogin()
      } else {
        setError('Invalid password')
      }
    } catch (error) {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center text-white relative overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30 z-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255, 255, 255, 0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-90 bg-gradient-to-br from-brand-deep/60 via-brand-primary/50 to-brand-accent/40 z-20"></div>
      
      <div className="relative z-30 max-w-md w-full mx-auto px-8">
        <div className="bg-brand-primary/20 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-brand-accent/20">
          <div className="text-center mb-8">
            <div className="service-icon mx-auto mb-4">
              <Lock size={24} />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-brand-light to-white bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-brand-light/80">Enter password to access analytics</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter dashboard password"
                className="w-full px-4 py-3 bg-brand-deep/50 border border-brand-accent/30 rounded-xl text-white placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent backdrop-blur-sm"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 px-4 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}