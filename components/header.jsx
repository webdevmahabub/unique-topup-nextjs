"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

export default function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (loggedIn) {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}")
      setUser(userData)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    setUser(null)
    router.push("/")
  }

  return (
    <header className="bg-white py-2 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Unique Topup A" width={100} height={30} className="h-8 w-auto" />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex">
              <Input type="search" placeholder="Search" className="rounded-r-none border-r-0" />
              <Button className="rounded-l-none bg-blue-500 hover:bg-blue-600" size="sm">
                Search
              </Button>
            </div>
          </div>

          {/* Auth Buttons or User Menu */}
          <div className="flex items-center space-x-2">
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      <Image
                        src={user.profilePic || "/placeholder.svg?height=32&width=32"}
                        alt={user.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push(user.role === "admin" ? "/admin" : "/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/orders")}>My Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                    Profile Settings
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem onClick={() => router.push("/admin")}>Admin Panel</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/register">
                  <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
