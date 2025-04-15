import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Order from "@/models/Order"
import { getCurrentUser, isAdmin } from "@/lib/auth"

// Get a single order
export async function GET(request, { params }) {
  try {
    await connectDB()

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    const order = await Order.findOne({ orderId: params.id })

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    // Check if user is admin or the order belongs to the user
    if (user.role !== "admin" && order.userId.toString() !== user.id) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Get order error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Update order status (admin only)
export async function PUT(request, { params }) {
  try {
    await connectDB()

    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    const { status } = await request.json()

    const order = await Order.findOneAndUpdate({ orderId: params.id }, { status }, { new: true, runValidators: true })

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Update order error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
