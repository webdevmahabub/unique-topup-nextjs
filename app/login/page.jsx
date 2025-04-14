"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
// Mock users for demo
const mockUsers = [
  {
    id: 1,
    email: "user@example.com",
    password: "password",
    name: "John Doe",
    role: "user",
    profilePic: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    profilePic: "/placeholder.svg?height=80&width=80",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // Check credentials against mock users
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      // Set login state
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userData", JSON.stringify(user))

      // Check for pending order
      const pendingOrder = localStorage.getItem("pendingOrder")

      if (pendingOrder) {
        // Add user ID to order and save
        const orderData = JSON.parse(pendingOrder)
        orderData.userId = user.id
        orderData.status = "pending"
        orderData.orderId = `ORD-${Date.now()}`
        orderData.date = new Date().toISOString()

        // Save to orders
        const orders = JSON.parse(localStorage.getItem("orders") || "[]")
        orders.push(orderData)
        localStorage.setItem("orders", JSON.stringify(orders))

        // Clear pending order
        localStorage.removeItem("pendingOrder")

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        // Redirect based on role
        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      }
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="flex items-center gap-1">
          <span className="text-xl">&larr;</span>
          Back to Home
        </Button>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center">
            <Image src="/logo.png" alt="Unique Topup A" width={150} height={40} className="h-10 w-auto" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials below to login</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg border">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked)} />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Demo Accounts:</p>
            <p>User: user@example.com / password</p>
            <p>Admin: admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
