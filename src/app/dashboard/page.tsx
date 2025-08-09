'use client'

import { useEffect, useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import DashboardLogin from '@/components/DashboardLogin'
import { BarChart3, Users, Eye, TrendingUp } from 'lucide-react'

interface AnalyticsData {
  summary: {
    totalPageViews: number
    totalUniqueVisitors: number
    avgDailyViews: number
  }
  dailyStats: Array<{
    date: string
    page_views: number
    unique_visitors: number
  }>
  countryStats: Array<{
    country: string
    visits: number
    unique_visitors: number
  }>
  topPages: Array<{
    path: string
    views: number
    unique_visitors: number
  }>
  browserStats: Array<{
    browser: string
    visits: number
  }>
  deviceStats: Array<{
    device_type: string
    visits: number
  }>
  referrerStats: Array<{
    source: string
    visits: number
  }>
}

const COLORS = ['#457affff', '#241663', '#EAE7AF', '#160F30', '#8884D8', '#82CA9D']

export default function Dashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics()
    }
  }, [timeRange, isAuthenticated])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/dashboard')
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setAuthLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics/stats')
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center text-white">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <DashboardLogin onLogin={() => setIsAuthenticated(true)} />
  }

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center text-white relative overflow-hidden">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-30 z-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255, 255, 255, 0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="absolute inset-0 opacity-90 bg-gradient-to-br from-brand-deep/60 via-brand-primary/50 to-brand-accent/40 z-20"></div>
        <div className="relative z-30 text-xl">Loading analytics...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center text-white relative overflow-hidden">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-30 z-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255, 255, 255, 0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="absolute inset-0 opacity-90 bg-gradient-to-br from-brand-deep/60 via-brand-primary/50 to-brand-accent/40 z-20"></div>
        <div className="relative z-30 text-xl text-red-400">Failed to load analytics data</div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30 z-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255, 255, 255, 0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-90 bg-gradient-to-br from-brand-deep/60 via-brand-primary/50 to-brand-accent/40 z-20"></div>
      
      <div className="relative z-30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <div className="service-icon mx-auto mb-4">
              <BarChart3 size={24} />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-brand-light to-white bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-brand-light/80 text-lg">Website traffic and visitor insights</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="service-card">
              <div className="flex items-center mb-4">
                <div className="service-icon w-12 h-12 mr-4">
                  <Eye size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-brand-light/80">Total Page Views</h3>
                  <p className="text-3xl font-bold text-brand-light">{data.summary.totalPageViews.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-sm text-brand-light/60">Last 30 days</p>
            </div>
            <div className="service-card">
              <div className="flex items-center mb-4">
                <div className="service-icon w-12 h-12 mr-4">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-brand-light/80">Unique Visitors</h3>
                  <p className="text-3xl font-bold text-brand-light">{data.summary.totalUniqueVisitors.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-sm text-brand-light/60">Last 30 days</p>
            </div>
            <div className="service-card">
              <div className="flex items-center mb-4">
                <div className="service-icon w-12 h-12 mr-4">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-brand-light/80">Avg Daily Views</h3>
                  <p className="text-3xl font-bold text-brand-light">{data.summary.avgDailyViews.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-sm text-brand-light/60">Last 30 days</p>
            </div>
          </div>

          {/* Daily Traffic Chart */}
          <div className="service-card mb-8">
            <h2 className="text-xl font-semibold mb-4 text-brand-light">Daily Traffic</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(234, 231, 175, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  tick={{ fill: '#EAE7AF', fontSize: 12 }}
                />
                <YAxis tick={{ fill: '#EAE7AF', fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => formatDate(value as string)}
                  contentStyle={{ 
                    backgroundColor: '#241663', 
                    border: '1px solid #457affff',
                    borderRadius: '8px',
                    color: '#EAE7AF'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="page_views" 
                  stroke="#457affff" 
                  name="Page Views"
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="unique_visitors" 
                  stroke="#EAE7AF" 
                  name="Unique Visitors"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Top Countries */}
            <div className="service-card">
              <h2 className="text-xl font-semibold mb-4 text-brand-light">Top Countries</h2>
              <div className="space-y-3">
                {data.countryStats.slice(0, 10).map((country, index) => (
                  <div key={country.country} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-brand-light">{country.country}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-brand-light/70">{country.visits} visits</span>
                      <div 
                        className="bg-brand-accent h-2 rounded"
                        style={{ 
                          width: `${(country.visits / data.countryStats[0]?.visits * 100) || 0}px`,
                          minWidth: '4px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
          </div>

            {/* Device Types */}
            <div className="service-card">
              <h2 className="text-xl font-semibold mb-4 text-brand-light">Device Types</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.deviceStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => 
                      `${props.device_type} ${props.percent ? (props.percent * 100).toFixed(0) : 0}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="visits"
                  >
                    {data.deviceStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#241663', 
                      border: '1px solid #457affff',
                      borderRadius: '8px',
                      color: '#EAE7AF'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Top Pages */}
            <div className="service-card">
              <h2 className="text-xl font-semibold mb-4 text-brand-light">Top Pages</h2>
              <div className="space-y-3">
                {data.topPages.slice(0, 8).map((page) => (
                  <div key={page.path} className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate max-w-xs text-brand-light">{page.path}</span>
                    <span className="text-sm text-brand-light/70">{page.views} views</span>
                  </div>
                ))}
              </div>
          </div>

            {/* Traffic Sources */}
            <div className="service-card">
              <h2 className="text-xl font-semibold mb-4 text-brand-light">Traffic Sources</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.referrerStats} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(234, 231, 175, 0.1)" />
                  <XAxis type="number" tick={{ fill: '#EAE7AF', fontSize: 12 }} />
                  <YAxis 
                    dataKey="source" 
                    type="category" 
                    width={80} 
                    tick={{ fill: '#EAE7AF', fontSize: 12 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#241663', 
                      border: '1px solid #457affff',
                      borderRadius: '8px',
                      color: '#EAE7AF'
                    }}
                  />
                  <Bar dataKey="visits" fill="#457affff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  )
}