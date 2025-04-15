"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.product

  const [product, setProduct] = useState(null)
  const [playerId, setPlayerId] = useState("")
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is logged in
        const userResponse = await fetch("/api/users/profile")
        setIsLoggedIn(userResponse.ok)

        // Get product data
        const productResponse = await fetch(`/api/products/${productId}`)

        if (!productResponse.ok) {
          if (productResponse.status === 404) {
            // Try to get all products and use the first one
            const allProductsResponse = await fetch("/api/products")
            if (allProductsResponse.ok) {
              const allProductsData = await allProductsResponse.json()
              if (allProductsData.data.length > 0) {
                setProduct(allProductsData.data[0])
              } else {
                throw new Error("No products found")
              }
            } else {
              throw new Error("Product not found")
            }
          } else {
            throw new Error("Failed to fetch product")
          }
        } else {
          const productData = await productResponse.json()
          setProduct(productData.data)
        }
      } catch (error) {
        setError(error.message)
        toast.error("Error", {
          description: error.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [productId])

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!playerId) {
      toast.error("Error", {
        description: "Please enter your Player ID",
      })
      return
    }

    if (!selectedPackage) {
      toast.error("Error", {
        description: "Please select a package",
      })
      return
    }

    // If not logged in, redirect to login
    if (!isLoggedIn) {
      // Save order details to localStorage for later
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          productId,
          productTitle: product.title,
          playerId,
          packageId: selectedPackage._id,
          packageName: selectedPackage.name,
          price: selectedPackage.price,
          paymentMethod,
        }),
      )

      // Redirect to login
      router.push("/login")
      return
    }

    try {
      // Create order
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productTitle: product.title,
          playerId,
          packageId: selectedPackage._id,
          packageName: selectedPackage.name,
          price: selectedPackage.price,
          paymentMethod,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const data = await response.json()

      toast.success("Order Placed", {
        description: `Order placed successfully! Order ID: ${data.data.orderId}`,
      })

      // Redirect to user dashboard
      router.push("/dashboard")
    } catch (error) {
      toast.error("Error", {
        description: error.message,
      })
    }
  }

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>
  }

  if (!product) {
    return <div className="container mx-auto py-10 text-center">Product not found</div>
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">{product.title}</h1>

      <div className="max-w-3xl mx-auto">
        {/* Step 1: Account Info */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">1</div>
            <h2 className="text-xl font-semibold">Account Info</h2>
          </div>

          <div className="bg-white p-4 rounded border">
            <label htmlFor="playerId" className="block mb-2">
              Player Id
            </label>
            <Input
              id="playerId"
              type="text"
              placeholder="Enter player id"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Step 2: Select Recharge */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">2</div>
            <h2 className="text-xl font-semibold">Select Recharge</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.packages.map((pkg) => (
              <div
                key={pkg._id}
                className={`border rounded p-4 text-center cursor-pointer transition-all ${
                  selectedPackage?._id === pkg._id ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
                }`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <div className="mb-2">{pkg.name}</div>
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-blue-600 font-semibold">{pkg.formattedPrice}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Select Payment */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">3</div>
            <h2 className="text-xl font-semibold">Select Payment</h2>
          </div>

          <div className="bg-white p-4 rounded border">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div
                className={`border rounded p-4 cursor-pointer ${paymentMethod === "wallet" ? "border-blue-500" : ""}`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <div className="relative h-10 w-full">
                  <Image src="/placeholder.svg?height=40&width=150" alt="Wallet" fill className="object-contain" />
                </div>
                <div className="text-center mt-2 text-sm">Wallet</div>
              </div>

              <div
                className={`border rounded p-4 cursor-pointer ${paymentMethod === "instant" ? "border-blue-500" : ""}`}
                onClick={() => setPaymentMethod("instant")}
              >
                <div className="flex justify-center space-x-2">
                  <div className="relative h-10 w-10">
                    <Image src="/placeholder.svg?height=40&width=40" alt="bKash" fill className="object-contain" />
                  </div>
                  <div className="relative h-10 w-10">
                    <Image src="/placeholder.svg?height=40&width=40" alt="Nagad" fill className="object-contain" />
                  </div>
                  <div className="relative h-10 w-10">
                    <Image src="/placeholder.svg?height=40&width=40" alt="Rocket" fill className="object-contain" />
                  </div>
                </div>
                <div className="text-center mt-2 text-sm">Instant Pay</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Description */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">4</div>
            <h2 className="text-xl font-semibold">Description</h2>
          </div>

          <div className="bg-white p-4 rounded border">
            <p className="mb-4">{product.description}</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">►</span>
                <span>অর্ডার করার আগে অবশ্যই জানাটাকে কনফার্ম করুন। এরপর শুধু সেলেক্ট</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✤</span>
                <span>শুধুমাত্র বাংলাদেশ সার্ভার এর ফ্রি-ফায়ারে টপ আপ করতে পারবেন।</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✤</span>
                <span>Player ID Code ভুল দিলে Diamond না পেলে Unique Topup A কর্তৃপক্ষ দায়ী নয় ।</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✤</span>
                <span>অর্ডার কোড দিয়ে অর্ডার করুন এবং কোনো কারনে টাকাটা না গেলে এক্ট করার জন্য সরিয় ইমেইল পাঠাইতে পারবেন।</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✤</span>
                <span>
                  এডমিনদের ডিরেক্ট সাপোর্টেড ১-২ মিনিটের এর মধ্যেই চলে যাবে। ইনস্টল সাপোর্ট ৩-৫ ঘণ্টা লাগে ৪ দেশি সময় লাগতে পারে।
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {!isLoggedIn && (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
}
