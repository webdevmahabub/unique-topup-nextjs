import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Product from "@/models/Product"
import { isAdmin } from "@/lib/auth"

// Get a single product
export async function GET(request, { params }) {
  try {
    await connectDB()

    const product = await Product.findOne({ id: params.id })

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("Get product error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Update a product (admin only)
export async function PUT(request, { params }) {
  try {
    await connectDB()

    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    const data = await request.json()

    const product = await Product.findOneAndUpdate({ id: params.id }, data, { new: true, runValidators: true })

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Delete a product (admin only)
export async function DELETE(request, { params }) {
  try {
    await connectDB()

    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    const product = await Product.findOneAndDelete({ id: params.id })

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {},
    })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
