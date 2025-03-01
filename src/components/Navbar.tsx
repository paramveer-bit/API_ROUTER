import React from 'react'
import Link from "next/link"
import {
    BarChart3,
    Globe,
    LayoutDashboard,
    Settings,
    Shield,
    Users,
  } from "lucide-react"


function Navbar() {
  return (
    <nav className="grid gap-2 p-4 text-sm">
      <Link href="#" className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground">
        <LayoutDashboard className="h-4 w-4" />
          Dashboard
      </Link>
      <Link
        href="/api-routes"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Globe className="h-4 w-4" />
        API Routes
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <BarChart3 className="h-4 w-4" />
        Analytics
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Shield className="h-4 w-4" />
        Authentication
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Users className="h-4 w-4" />
        Team
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </nav>
  )
}

export default Navbar