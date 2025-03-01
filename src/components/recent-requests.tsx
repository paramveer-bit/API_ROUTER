"use client"

import { useState } from "react"
import { Check, Clock, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function RecentRequests() {
  const [requests] = useState([
    {
      id: 1,
      endpoint: "/api/users",
      method: "GET",
      status: 200,
      time: "2 minutes ago",
      duration: "89ms",
    },
    {
      id: 2,
      endpoint: "/api/products",
      method: "GET",
      status: 200,
      time: "5 minutes ago",
      duration: "124ms",
    },
    {
      id: 3,
      endpoint: "/api/users/5",
      method: "GET",
      status: 200,
      time: "10 minutes ago",
      duration: "76ms",
    },
    {
      id: 4,
      endpoint: "/api/auth/login",
      method: "POST",
      status: 200,
      time: "15 minutes ago",
      duration: "210ms",
    },
    {
      id: 5,
      endpoint: "/api/products/12",
      method: "GET",
      status: 404,
      time: "20 minutes ago",
      duration: "45ms",
    },
    {
      id: 6,
      endpoint: "/api/users",
      method: "POST",
      status: 201,
      time: "25 minutes ago",
      duration: "189ms",
    },
    {
      id: 7,
      endpoint: "/api/webhooks/stripe",
      method: "POST",
      status: 500,
      time: "30 minutes ago",
      duration: "320ms",
    },
    {
      id: 8,
      endpoint: "/api/users/2",
      method: "PUT",
      status: 200,
      time: "35 minutes ago",
      duration: "156ms",
    },
    {
      id: 9,
      endpoint: "/api/users/3",
      method: "DELETE",
      status: 200,
      time: "40 minutes ago",
      duration: "98ms",
    },
    {
      id: 10,
      endpoint: "/api/products/search",
      method: "GET",
      status: 200,
      time: "45 minutes ago",
      duration: "145ms",
    },
  ])

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {requests.map((request) => (
          <div key={request.id} className="flex items-center justify-between rounded-md border p-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Badge
                  variant={request.method === "GET" ? "default" : request.method === "POST" ? "secondary" : "outline"}
                >
                  {request.method}
                </Badge>
                <span className="font-medium">{request.endpoint}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{request.time}</span>
                <span>•</span>
                <span>{request.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  request.status >= 200 && request.status < 300
                    ? "default"
                    : request.status >= 400 && request.status < 500
                      ? "outline"
                      : "destructive"
                }
              >
                {request.status}
                {request.status >= 200 && request.status < 300 ? (
                  <Check className="ml-1 h-3 w-3" />
                ) : (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

