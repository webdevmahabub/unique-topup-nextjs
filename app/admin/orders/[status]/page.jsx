"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function OrdersByStatusPage() {
  const router = useRouter()
  const params = useParams()
  const status = params.status

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/status/${status}`)

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login")
            return
          }
          throw new Error(`Failed to fetch ${status} orders`)
        }

        const data = await response.json()
        setOrders(data.data)
      } catch (error) {
        setError(error.message)
        toast.error("Error", {
          description: error.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (status) {
      fetchOrders()
    }
  }, [router, status])

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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      // Remove from list if status changed
      if (newStatus !== status) {
        setOrders(orders.filter((order) => order.orderId !== orderId))
      } else {
        // Update local state
        setOrders(orders.map((order) => (order.orderId === orderId ? { ...order, status: newStatus } : order)))
      }

      toast.success("Order Updated", {
        description: `Order ${orderId} has been marked as ${newStatus}`,
      })
    } catch (error) {
      toast.error("Error", {
        description: error.message,
      })
    }
  }

  const getStatusTitle = () => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{getStatusTitle()} Orders</h1>
        <div className="space-x-2">
          <Link href="/admin/orders">
            <Button variant="outline">All Orders</Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        {orders.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No {status} orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
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
                    <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>

                    <div className="mt-2 space-x-2">
                      {status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => updateOrderStatus(order.orderId, "processing")}
                          >
                            Mark Processing
                          </Button>
                          <Button
                            size="sm"
                            className="text-xs bg-green-600 hover:bg-green-700"
                            onClick={() => updateOrderStatus(order.orderId, "completed")}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => updateOrderStatus(order.orderId, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}

                      {status === "processing" && (
                        <>
                          <Button
                            size="sm"
                            className="text-xs bg-green-600 hover:bg-green-700"
                            onClick={() => updateOrderStatus(order.orderId, "completed")}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => updateOrderStatus(order.orderId, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}

                      {status === "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => updateOrderStatus(order.orderId, "processing")}
                        >
                          Mark Processing
                        </Button>
                      )}

                      {status === "cancelled" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => updateOrderStatus(order.orderId, "pending")}
                        >
                          Reopen
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
