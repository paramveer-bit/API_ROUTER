"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUserAnalytics } from "./use-user-analytics"
import UserActivityChart from "./user-activity-chart"
import UserEndpointsChart from "./user-endpoints-chart"
import UserDevicesChart from "./user-devices-chart"
import UserSessionsTable from "./user-sessions-table"
import { Download, RefreshCw, Search, User } from "lucide-react"

export default function UserAnalyticsDashboard() {
  const [userCode, setUserCode] = useState("")
  const [searchedUserCode, setSearchedUserCode] = useState("")
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d">("7d")

  const { data, isLoading, error, refetch } = useUserAnalytics(searchedUserCode, timeRange)

  const handleSearch = () => {
    if (userCode.trim()) {
      setSearchedUserCode(userCode.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const exportData = () => {
    if (!data) return

    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `user-analytics-${searchedUserCode}-${timeRange}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Analytics</CardTitle>
          <CardDescription>Enter a user code to view detailed analytics for a specific user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter user code"
                className="pl-8"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>

            {searchedUserCode && (
              <>
                <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
                  <SelectTrigger className="w-[180px]">
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

                <Button variant="outline" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {isLoading && searchedUserCode && (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load user analytics. Please try again later.</AlertDescription>
        </Alert>
      )}

      {data && !isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardDescription>User Profile</CardDescription>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{data.userProfile.name}</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-muted px-3 py-1 rounded-full text-sm">ID: {data.userProfile.id}</div>
                    <div className="bg-muted px-3 py-1 rounded-full text-sm">Email: {data.userProfile.email}</div>
                    <div className="bg-muted px-3 py-1 rounded-full text-sm">
                      Joined: {new Date(data.userProfile.joinedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Requests</h3>
                    <p className="text-2xl font-semibold">{data.totalRequests.toLocaleString()}</p>
                    <p className={`text-xs mt-1 ${data.requestsChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {data.requestsChange >= 0 ? "↑" : "↓"} {Math.abs(data.requestsChange)}% from previous period
                    </p>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg. Response Time</h3>
                    <p className="text-2xl font-semibold">{data.avgResponseTime} ms</p>
                    <p className={`text-xs mt-1 ${data.responseTimeChange <= 0 ? "text-green-500" : "text-red-500"}`}>
                      {data.responseTimeChange <= 0 ? "↓" : "↑"} {Math.abs(data.responseTimeChange)}% from previous
                      period
                    </p>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Error Rate</h3>
                    <p className="text-2xl font-semibold">{data.errorRate}%</p>
                    <p className={`text-xs mt-1 ${data.errorRateChange <= 0 ? "text-green-500" : "text-red-500"}`}>
                      {data.errorRateChange <= 0 ? "↓" : "↑"} {Math.abs(data.errorRateChange)}% from previous period
                    </p>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Active Sessions</h3>
                    <p className="text-2xl font-semibold">{data.activeSessions}</p>
                    <p className={`text-xs mt-1 ${data.sessionsChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {data.sessionsChange >= 0 ? "↑" : "↓"} {Math.abs(data.sessionsChange)}% from previous period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>API requests and response times over the selected time period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <UserActivityChart data={data.activityData} />
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  {data.anomalyDetection.hasAnomaly ? (
                    <Alert className="w-full">
                      <AlertTitle>Anomaly Detected</AlertTitle>
                      <AlertDescription>{data.anomalyDetection.message}</AlertDescription>
                    </Alert>
                  ) : (
                    "No unusual activity patterns detected in this time period."
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Endpoint Usage</CardTitle>
                  <CardDescription>Most frequently accessed API endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <UserEndpointsChart data={data.endpointData} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Devices & Browsers</CardTitle>
                  <CardDescription>Distribution of devices and browsers used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Devices</h3>
                      <div className="h-[300px]">
                        <UserDevicesChart data={data.deviceData} type="device" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Browsers</h3>
                      <div className="h-[300px]">
                        <UserDevicesChart data={data.browserData} type="browser" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Recent user sessions and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserSessionsTable data={data.sessionData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Recent API Requests</CardTitle>
              <CardDescription>Last 5 API requests made by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentRequests.map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          request.statusCode >= 200 && request.statusCode < 300
                            ? "bg-green-500"
                            : request.statusCode >= 300 && request.statusCode < 400
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium">
                          {request.method} {request.endpoint}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(request.timestamp).toLocaleString()} • {request.responseTime}ms
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{request.statusCode}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!searchedUserCode && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No User Selected</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Enter a user code above to view detailed analytics for a specific user. You'll be able to see their
                activity, endpoint usage, devices, and sessions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

