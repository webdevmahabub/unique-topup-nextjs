"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get user data
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    setUser(userData)

    // Get orders
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const userOrders = allOrders.filter((order) => order.userId === userData.id)
    setOrders(userOrders)

    setIsLoading(false)
  }, [router])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData")
    router.push("/")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    })
  }

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-3">
              <Image
                src={user?.profilePic || "/placeholder.svg?height=80&width=80"}
                alt="User Avatar"
                width={80}
                height={80}
              />
            </div>
            <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
            <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
          </div>

          <nav className="space-y-2">
            <Link href="/dashboard" className="block py-2 px-3 bg-blue-50 text-blue-700 rounded font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/orders" className="block py-2 px-3 hover:bg-gray-50 rounded">
              My Orders
            </Link>
            <Link href="/dashboard/profile" className="block py-2 px-3 hover:bg-gray-50 rounded">
              Profile Settings
            </Link>
            {user?.role === "admin" && (
              <Link href="/admin" className="block py-2 px-3 hover:bg-gray-50 rounded">
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-red-600"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
              <p className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</p>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-sm font-medium text-gray-500">Completed Orders</h3>
              <p className="text-2xl font-bold">{orders.filter((o) => o.status === "completed").length}</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No orders found</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.orderId} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{order.packageName}</p>
                          <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
                          <p className="text-sm text-gray-500">Player ID: {order.playerId}</p>
                          <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{`Tk ${order.price}`}</p>
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getStatusColor(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {orders.filter((o) => o.status === "pending").length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No pending orders</p>
                ) : (
                  orders
                    .filter((o) => o.status === "pending")
                    .map((order) => (
                      <div key={order.orderId} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{order.packageName}</p>
                            <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
                            <p className="text-sm text-gray-500">Player ID: {order.playerId}</p>
                            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{`Tk ${order.price}`}</p>
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getStatusColor(order.status)}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </TabsContent>

              <TabsContent value="processing" className="space-y-4">
                {orders.filter((o) => o.status === "processing").length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No processing orders</p>
                ) : (
                  orders
                    .filter((o) => o.status === "processing")
                    .map((order) => (
                      <div key={order.orderId} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{order.packageName}</p>
                            <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
                            <p className="text-sm text-gray-500">Player ID: {order.playerId}</p>
                            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{`Tk ${order.price}`}</p>
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getStatusColor(order.status)}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {orders.filter((o) => o.status === "completed").length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No completed orders</p>
                ) : (
                  orders
                    .filter((o) => o.status === "completed")
                    .map((order) => (
                      <div key={order.orderId} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{order.packageName}</p>
                            <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
                            <p className="text-sm text-gray-500">Player ID: {order.playerId}</p>
                            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{`Tk ${order.price}`}</p>
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getStatusColor(order.status)}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
