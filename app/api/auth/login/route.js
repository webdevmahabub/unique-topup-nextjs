import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"
import { generateToken, setTokenCookie } from "@/lib/auth"

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB()

    const { email, password } = await request.json()

    // Find user
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Generate token
    const token = generateToken(user._id)

    // Set token in cookie - now awaited
    await setTokenCookie(token)

    // Return success response
    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
