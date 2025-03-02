"use client"

import { ArrowDown, ArrowUp, BarChart3, Clock, Globe, Users,Loader,Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export function StatsCards({param}: {param: Data}) {
  const isIncrease = param.requests.this_month > param.requests.prev_month;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* ---------------------------------- Total Requests ------------------------------------------ */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold ml-2">{param.requests.this_month}</div>
          <div className="mt-8 flex items-center text-sm">
            {isIncrease?<ArrowUp className="mr-1 h-4 w-4 text-green-600" />:<ArrowDown className="mr-1 h-4 w-4 text-red-500" />}
            <p className={`text-sm ${(isIncrease)?"text-green-600":"text-red-600 "}`}>
              {/* {param.requests.this_month>param.requests.prev_month?"text-green-600":"text-red-600 "} */}
              {(param.requests.this_month-param.requests.prev_month)/(param.requests.prev_month==0?1:param.requests.this_month)*100}% from last month
            </p>
          </div>
        </CardContent>
      </Card>
      {/* ---------------------------------- Active Routes ------------------------------------------- */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold ml-2">{param.routes.total_routes}</div>
          <div className="mt-8 flex items-center text-sm">
            {param.routes.increase>0?<ArrowUp className="mr-1 h-4 w-4 text-green-600" />:""}
            <p className={`text-sm ${param.routes.increase>0?"text-green-600":""}`}  >+{param.routes.increase} new routes this week</p>
            </div>
        </CardContent>
      </Card>
      {/* ---------------------------------- Users ------------------------------------------- */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl ml-2 font-bold">{param.total_users.total_user}</div>
          <div className="mt-8 flex items-center text-sm text-green-600">
            <p className="text-sm text-muted-foreground">{param.active_user.total_active_user} active users</p>
          </div>
        </CardContent>
      </Card>
      {/* <Card>
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
      </Card> */}
    </div>
  )
}

