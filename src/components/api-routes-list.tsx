"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ApiRoutesList() {
  const apiRoutes = [
    { id: 1, name: "/api/users", method: "GET", status: "active" },
    { id: 2, name: "/api/users/[id]", method: "GET", status: "active" },
    { id: 3, name: "/api/users", method: "POST", status: "active" },
    { id: 4, name: "/api/users/[id]", method: "PUT", status: "active" },
    { id: 5, name: "/api/users/[id]", method: "DELETE", status: "active" },
    { id: 6, name: "/api/products", method: "GET", status: "active" },
    { id: 7, name: "/api/products/[id]", method: "GET", status: "active" },
    { id: 8, name: "/api/auth/login", method: "POST", status: "active" },
    { id: 9, name: "/api/auth/register", method: "POST", status: "active" },
    { id: 10, name: "/api/webhooks/stripe", method: "POST", status: "active" },
    { id: 11, name: "/api/analytics", method: "GET", status: "inactive" },
    { id: 12, name: "/api/admin/stats", method: "GET", status: "inactive" },
  ]

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {apiRoutes.map((route) => (
          <div key={route.id} className="flex items-center justify-between rounded-md border p-2">
            <div className="flex flex-col">
              <span className="font-medium">{route.name}</span>
              <div className="flex items-center gap-2">
                <Badge variant={route.method === "GET" ? "default" : route.method === "POST" ? "secondary" : "outline"}>
                  {route.method}
                </Badge>
                <Badge variant={route.status === "active" ? "default" : "destructive"}>{route.status}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

