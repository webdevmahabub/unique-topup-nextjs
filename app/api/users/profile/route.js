import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"
import { getCurrentUser } from "@/lib/auth"

// Get current user profile
export async function GET() {
  try {
    await connectDB()

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Update user profile
export async function PUT(request) {
  try {
    await connectDB()

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 })
    }

    const { name, email, profilePic } = await request.json()

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { name, email, profilePic },
      { new: true, runValidators: true },
    ).select("-password")

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic,
      },
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
