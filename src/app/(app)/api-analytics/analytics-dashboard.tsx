"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ApiUsageChart from "./(charts)/api-usage-chart"
import EndpointBreakdown from "./(charts)/endpoint-breakdown"
import ResponseTimeChart from "./response-time-chart"
import StatusCodesChart from "./status-codes-chart"
import RouteAnalysisChart from "./route-analysis-chart"
import UserAnalysisChart from "./user-analysis-chart"
import GeographicDistribution from "./geographic-distribution"
import { useApiAnalytics } from "./use-api-analytics"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import axios from "axios"
import Overview from "@/components/usage-overview"

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d">("7d")
  const [selectedRoute, setSelectedRoute] = useState<string>("/api/users")
  const { data, isLoading, error, refetch } = useApiAnalytics(timeRange, selectedRoute)
  
  const [routes,setRoutes] = useState<any[]>([])
  useEffect(()=>{
    const fetching = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/request/getall`, {withCredentials: true})
        console.log(res.data.data)
        setRoutes(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetching()
  }
  ,[])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">Error loading analytics data. Please try again later.</div>
        </CardContent>
      </Card>
    )
  }

  console.log(data)
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">API Usage Overview</h2>
        {/* ------------------------------ Time Range Selector and Refresh Butoon --------------------------------------- */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </div>

      <Overview timeRange={timeRange} />
      {/* Route-specific analysis section */}
      <Card>
        {/* Route Selector */}
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Route-Specific Analysis</CardTitle>
              <CardDescription>Detailed metrics for a specific API route</CardDescription>
            </div>
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Select API route" />
              </SelectTrigger>
              <SelectContent>
                {data?.availableRoutes.map((route) => (
                  <SelectItem key={route} value={route}>
                    {route}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[400px]">
            <RouteAnalysisChart data={data?.routeAnalysisData || []} route={selectedRoute} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-muted/40 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg. Response Time</h3>
              <p className="text-2xl font-semibold">{data?.routeMetrics.avgResponseTime} ms</p>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Success Rate</h3>
              <p className="text-2xl font-semibold">{data?.routeMetrics.successRate}%</p>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Cache Hit Rate</h3>
              <p className="text-2xl font-semibold">{data?.routeMetrics.cacheHitRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="usage">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="usage">API Usage</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="response-time">Response Time</TabsTrigger>
          <TabsTrigger value="status-codes">Status Codes</TabsTrigger>
          <TabsTrigger value="user-analysis">User Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Requests Over Time</CardTitle>
              <CardDescription>Number of API requests over the selected time period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ApiUsageChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Breakdown</CardTitle>
              <CardDescription>Distribution of requests across different API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <EndpointBreakdown timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="response-time" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>Average response time by endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponseTimeChart data={data?.responseTimeData || []} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="status-codes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Codes</CardTitle>
              <CardDescription>Distribution of HTTP status codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <StatusCodesChart data={data?.statusCodeData || []} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="user-analysis" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Analysis</CardTitle>
              <CardDescription>User behavior and demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">User Behavior</h3>
                  <div className="h-[300px]">
                    <UserAnalysisChart data={data?.userAnalysisData || []} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Geographic Distribution</h3>
                  <div className="h-[300px]">
                    <GeographicDistribution data={data?.geoDistributionData || []} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Real-time monitoring section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Real-time Monitoring</CardTitle>
              <CardDescription>Live API activity in the last 5 minutes</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.realtimeActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      activity.statusCode >= 200 && activity.statusCode < 300
                        ? "bg-green-500"
                        : activity.statusCode >= 300 && activity.statusCode < 400
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <div>
                    <div className="font-medium">
                      {activity.method} {activity.route}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.ip} • {activity.responseTime}ms • {new Date(activity.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium">{activity.statusCode}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

