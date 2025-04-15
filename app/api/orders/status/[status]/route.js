import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Order from "@/models/Order"
import { isAdmin } from "@/lib/auth"

// Get orders by status (admin only)
export async function GET(request, { params }) {
  try {
    await connectDB()

    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    // Validate status
    const validStatuses = ["pending", "processing", "completed", "cancelled"]
    if (!validStatuses.includes(params.status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 })
    }

    const orders = await Order.find({ status: params.status }).sort({ date: -1 })

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
    })
  } catch (error) {
    console.error("Get orders by status error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
