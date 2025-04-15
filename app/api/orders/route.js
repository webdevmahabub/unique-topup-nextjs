import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Order from "@/models/Order"
import { getCurrentUser } from "@/lib/auth"

// Get all orders (admin) or user orders
export async function GET() {
  try {
    await connectDB()

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    let orders

    // If admin, get all orders
    if (user.role === "admin") {
      orders = await Order.find({}).sort({ date: -1 })
    } else {
      // If regular user, get only their orders
      orders = await Order.find({ userId: user.id }).sort({ date: -1 })
    }

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
    })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Create a new order
export async function POST(request) {
  try {
    await connectDB()

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    const data = await request.json()

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}`

    const order = await Order.create({
      ...data,
      orderId,
      userId: user.id,
    })

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
