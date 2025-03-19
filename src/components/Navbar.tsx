"use client"
import React, { useEffect } from 'react'
import Link from "next/link"
import {
    BarChart3,
    Globe,
    LayoutDashboard,
    Settings,
    Shield,
    Users,
    LogOut,
  } from "lucide-react"
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'


function Navbar() {
  const pathname = usePathname()
  const [active, setActive] = React.useState("/dashboard");

  const {toast} = useToast()

  useEffect(()=>{
    setActive(pathname.split("/")[1])
  },[pathname])

  const logout = async()=>{
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/signOut",{},{withCredentials: true})
      console.log(res)
    } catch (error) {
      toast({
        title: "Error",
        description: "Error logging out",
        variant: "destructive"
      })
    }
  }

  const hover = "hover:bg-muted hover:text-foreground text-muted-foreground"
  const activeClass = "bg-primary text-primary-foreground"

  return (
    <nav className="grid gap-2 p-4 text-sm h-full">
      <div className="flex flex-col gap-2">
        <Link 
          href="/dashboard" 
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active=="dashboard"?activeClass:hover}`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/api-routes"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active=="api-routes"?activeClass:hover}`}
        >
          <Globe className="h-4 w-4" />
          API Routes
        </Link>
        <Link
          href="/api-analytics"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active=="api-analytics"?activeClass:hover}`}
        >
          <BarChart3 className="h-4 w-4" />
          Analytics
        </Link>
        <Link
          href="/authentication"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active=="authentication"?activeClass:hover}`}
        >
          <Shield className="h-4 w-4" />
          Authentication
        </Link>
        <Link
          href="/team"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active=="team"?activeClass:hover}`}
        >
          <Users className="h-4 w-4" />
          Team
        </Link>
        {/* <Link
          href="#"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active=="settings"?activeClass:hover}`}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link> */}
      </div>

      {/* Logout Button at Bottom */}
      <button
        className="flex gap-2 rounded-lg mt-auto px-3 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={logout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </nav>
  )
}

export default Navbar
