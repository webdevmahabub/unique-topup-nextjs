import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"
import { getCurrentUser } from "@/lib/auth"
import bcrypt from "bcryptjs"

// Update user password
export async function PUT(request) {
  try {
    await connectDB()

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    // Get user with password
    const userWithPassword = await User.findById(user.id).select("+password")

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, userWithPassword.password)

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Current password is incorrect" }, { status: 400 })
    }

    // Update password
    userWithPassword.password = newPassword
    await userWithPassword.save()

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error) {
    console.error("Update password error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
