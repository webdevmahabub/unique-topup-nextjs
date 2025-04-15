import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import User from "@/models/User"
import connectDB from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-for-development"

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30d",
  })
}

// Set token in cookies - now async
export const setTokenCookie = async (token) => {
  const cookieStore = cookies()
  await cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  })
}

// Get current user from token
export const getCurrentUser = async () => {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    // Connect to MongoDB
    await connectDB()

    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return null
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
    }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

// Clear token cookie - now async
export const clearTokenCookie = async () => {
  const cookieStore = cookies()
  await cookieStore.delete("token")
}

// Check if user is authenticated
export const isAuthenticated = async () => {
  const user = await getCurrentUser()
  return !!user
}

// Check if user is admin
export const isAdmin = async () => {
  const user = await getCurrentUser()
  return user?.role === "admin"
}
