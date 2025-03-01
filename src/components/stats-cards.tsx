
"use client"

import { ArrowDown, ArrowUp, BarChart3, Clock, Globe, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,231</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <ArrowUp className="mr-1 h-4 w-4" />
            <span>12% increase</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 new routes this week</p>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <ArrowUp className="mr-1 h-4 w-4" />
            <span>3 new endpoints</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124ms</div>
          <p className="text-xs text-muted-foreground">-18ms from last week</p>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <ArrowDown className="mr-1 h-4 w-4" />
            <span>12.7% faster</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">573</div>
          <p className="text-xs text-muted-foreground">+201 from last month</p>
          <div className="mt-4 flex items-center text-sm text-red-600">
            <ArrowDown className="mr-1 h-4 w-4" />
            <span>2% decrease today</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

