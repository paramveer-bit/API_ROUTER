import Link from "next/link"
import {
  ArrowUpRight,
  BarChart3,
  Database,
  GitBranch,
  GitFork,
  Globe,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
} from "lucide-react"
import Navbar from "@/components/Navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiRoutesList } from "@/components/api-routes-list"
import { RecentRequests } from "@/components/recent-requests"
import { StatsCards } from "@/components/stats-cards"
import Header from "@/components/Header"

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="routes">API Routes</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <StatsCards />
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

