"use client"

import { useState, useEffect, useCallback } from "react"

interface UserProfile {
  id: string
  name: string
  email: string
  joinedAt: string
}

interface ActivityData {
  timestamp: string
  requests: number
  responseTime: number
  errors: number
}

interface EndpointData {
  endpoint: string
  requests: number
  avgResponseTime: number
}

interface DeviceData {
  name: string
  value: number
}

interface SessionData {
  id: string
  startTime: string
  endTime: string | null
  duration: number | null
  ipAddress: string
  location: string
  device: string
  browser: string
  requestCount: number
}

interface RecentRequest {
  method: string
  endpoint: string
  statusCode: number
  responseTime: number
  timestamp: string
}

interface AnomalyDetection {
  hasAnomaly: boolean
  message: string
}

interface UserAnalyticsData {
  userProfile: UserProfile
  totalRequests: number
  requestsChange: number
  avgResponseTime: number
  responseTimeChange: number
  errorRate: number
  errorRateChange: number
  activeSessions: number
  sessionsChange: number
  activityData: ActivityData[]
  endpointData: EndpointData[]
  deviceData: DeviceData[]
  browserData: DeviceData[]
  sessionData: SessionData[]
  recentRequests: RecentRequest[]
  anomalyDetection: AnomalyDetection
}

export function useUserAnalytics(userCode: string, timeRange: "24h" | "7d" | "30d" | "90d") {
  const [data, setData] = useState<UserAnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!userCode) {
      setData(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/user-analytics?userCode=${userCode}&timeRange=${timeRange}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch user analytics data: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    } finally {
      setIsLoading(false)
    }
  }, [userCode, timeRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}

