"use client"

import { GitFork } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ApiRoutesList } from "@/components/api-routes-list"
import { RecentRequests } from "@/components/recent-requests"
import { StatsCards } from "@/components/stats-cards"
import { useEffect, useState } from "react"
import axios from "axios"

interface Data {
  total_users: {
    total_user: number
  },
  routes : {
    total_routes : number,
    increase : number
  },
  active_user : {
    total_active_user: number
  },
  requests : {
    this_month: number,
    prev_month: number
  }
}


export default function DashboardPage() {
  const[stats, setStats] = useState<Data>()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await axios.get(`http://localhost:4000/api/v1/requestLog/allData`,{withCredentials: true})
        console.log(res)
        setStats(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    console.log("Hello from the Dashboard page!")
  }
  , [])

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            {/* <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="routes">API Routes</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList> */}
            <TabsContent value="overview" className="space-y-4">
              {stats ? <StatsCards param={stats} /> : <p>Loading...</p>}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent API Requests</CardTitle>
                    <CardDescription>There were 1,120 requests in the last 24 hours.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentRequests />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>API Routes</CardTitle>
                    <CardDescription>You have 12 active API routes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiRoutesList />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <GitFork className="mr-2 h-4 w-4" />
                      Create New Route
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="routes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Routes</CardTitle>
                  <CardDescription>Manage your dynamic API routes and endpoints.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>API routes content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>View detailed analytics for your API usage.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analytics content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure your API router settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Settings content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
  )
}

