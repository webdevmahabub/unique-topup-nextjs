"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePic: "",
  })

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get user data
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    setUser(userData)

    // Set form data
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      profilePic: userData.profilePic || "/placeholder.svg?height=80&width=80",
    })

    setIsLoading(false)
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()

    // Update user data
    const updatedUser = {
      ...user,
      name: formData.name,
      profilePic: formData.profilePic,
    }

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUser))

    // Update users array if exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, name: formData.name, profilePic: formData.profilePic } : u,
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Update state
    setUser(updatedUser)

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    })
  }

  const handleUpdateEmail = (e) => {
    e.preventDefault()

    // Check if email is valid
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please enter a valid email",
        variant: "destructive",
      })
      return
    }

    // Update user data
    const updatedUser = {
      ...user,
      email: formData.email,
    }

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUser))

    // Update users array if exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, email: formData.email } : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Update state
    setUser(updatedUser)

    toast({
      title: "Email Updated",
      description: "Your email has been updated successfully",
    })
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()

    // Validate passwords
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      })
      return
    }

    if (formData.currentPassword !== user.password) {
      toast({
        title: "Error",
        description: "Current password is incorrect",
        variant: "destructive",
      })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    // Update user data
    const updatedUser = {
      ...user,
      password: formData.newPassword,
    }

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUser))

    // Update users array if exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, password: formData.newPassword } : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Update state
    setUser(updatedUser)

    // Reset password fields
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully",
    })
  }

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-3">
              <Image
                src={user?.profilePic || "/placeholder.svg?height=80&width=80"}
                alt="User Avatar"
                width={80}
                height={80}
              />
            </div>
            <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
            <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
          </div>

          <nav className="space-y-2">
            <Link href="/dashboard" className="block py-2 px-3 hover:bg-gray-50 rounded">
              Dashboard
            </Link>
            <Link href="/dashboard/orders" className="block py-2 px-3 hover:bg-gray-50 rounded">
              My Orders
            </Link>
            <Link href="/dashboard/profile" className="block py-2 px-3 bg-blue-50 text-blue-700 rounded font-medium">
              Profile Settings
            </Link>
            {user?.role === "admin" && (
              <Link href="/admin" className="block py-2 px-3 hover:bg-gray-50 rounded">
                Admin Panel
              </Link>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn")
                localStorage.removeItem("userData")
                router.push("/")
                toast({
                  title: "Logged Out",
                  description: "You have been successfully logged out",
                })
              }}
              className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-red-600"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              <form onSubmit={handleUpdateProfile}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="profilePic">Profile Picture URL</Label>
                    <Input
                      id="profilePic"
                      name="profilePic"
                      value={formData.profilePic}
                      onChange={handleChange}
                      placeholder="https://example.com/avatar.jpg"
                    />
                    <p className="text-xs text-gray-500">Enter a URL for your profile picture</p>
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>

            {/* Email Settings */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Email Settings</h2>
              <form onSubmit={handleUpdateEmail}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Update Email
                  </Button>
                </div>
              </form>
            </div>

            {/* Password Settings */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <form onSubmit={handleUpdatePassword}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
