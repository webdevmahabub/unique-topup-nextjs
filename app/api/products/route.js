import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Product from "@/models/Product"
import { isAdmin } from "@/lib/auth"

// Get all products
export async function GET() {
  try {
    await connectDB()

    const products = await Product.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Create a new product (admin only)
export async function POST(request) {
  try {
    await connectDB()

    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    const data = await request.json()

    const product = await Product.create(data)

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
