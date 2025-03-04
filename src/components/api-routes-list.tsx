"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { useEffect, useState } from "react"


interface ApiRoute {
  id: string,
  ownerId: string,
  requestUrl: string,
  forwardUrl: string,
  createdAt: string,
  updatedAt: string,
  caching: boolean,
  cacheTime: number,
  rateLimiting: boolean,
  defaultRate: number,
  bannedUser: string[]
}

export function ApiRoutesList() {
  const [apiRoutes, setApiRoutes] = useState<ApiRoute[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/request/getall`,{withCredentials: true})
        console.log(res.data.data)
        setApiRoutes(res.data.data)
      } catch (error) {
        
      }
    }
    fetchData()
  }, [] )

  useEffect(() => {
    console.log(apiRoutes)
  },[apiRoutes])

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {apiRoutes.map((route) => (
          <div key={route.id} className="flex items-center justify-between rounded-md border p-2">
            <div className="flex flex-col">
              <span className="font-medium">{route.requestUrl}</span>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={route.caching ? "default" : "destructive"}>
                  Caching
                </Badge>
                <Badge variant={route.rateLimiting ? "default" : "destructive"}>Rate Limiting</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

