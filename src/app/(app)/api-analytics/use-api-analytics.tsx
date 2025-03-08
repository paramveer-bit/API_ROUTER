"use client"

import { useState, useEffect, useCallback } from "react"

interface ApiAnalyticsData {
  totalRequests: number
  requestsChange: number
  avgResponseTime: number
  responseTimeChange: number
  errorRate: number
  errorRateChange: number
  activeUsers: number
  activeUsersChange: number
  usageData: Array<{
    timestamp: string
    requests: number
  }>
  endpointData: Array<{
    endpoint: string
    requests: number
  }>
  responseTimeData: Array<{
    endpoint: string
    responseTime: number
  }>
  statusCodeData: Array<{
    statusCode: string
    count: number
  }>
  routeAnalysisData: Array<{
    timestamp: string
    requests: number
    responseTime: number
    errors: number
  }>
  routeMetrics: {
    avgResponseTime: number
    successRate: number
    cacheHitRate: number
  }
  userAnalysisData: Array<{
    category: string
    newUsers: number
    returningUsers: number
  }>
  geoDistributionData: Array<{
    region: string
    value: number
  }>
  availableRoutes: string[]
  realtimeActivity: Array<{
    method: string
    route: string
    statusCode: number
    responseTime: number
    ip: string
    timestamp: string
  }>
}

export function useApiAnalytics(timeRange: "24h" | "7d" | "30d" | "90d", selectedRoute: string) {
  const [data, setData] = useState<ApiAnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/analytics?timeRange=${timeRange}&route=${selectedRoute}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics data: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    } finally {
      setIsLoading(false)
    }
  }, [timeRange, selectedRoute])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}

