"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductPage() {
  const params = useParams()
  const productId = params.product

  const [product, setProduct] = useState(null)
  const [playerId, setPlayerId] = useState("")
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, check if user is logged in
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)
    }

    checkLoginStatus()

    // Get product data from localStorage or fallback to default
    const loadProductData = () => {
      const storedProducts = localStorage.getItem("products")
      let productData = {}

      if (storedProducts) {
        productData = JSON.parse(storedProducts)
      } else {
        // Fallback to default product data
        const defaultProductData = {
          "free-fire-gcodes": {
            id: "free-fire-gcodes",
            title: "FREE FIRE (IDCODE)",
            category: "free-fire",
            image: "/placeholder.svg?height=150&width=200",
            description: "Top up your Free Fire account with diamonds and other items.",
            packages: [
              { id: 1, name: "25 DIAMOND 💎", price: 25, formattedPrice: "Tk 25" },
              { id: 2, name: "50 DIAMOND 💎", price: 40, formattedPrice: "Tk 40" },
              { id: 3, name: "115 DIAMOND 💎", price: 79, formattedPrice: "Tk 79" },
              { id: 4, name: "240 DIAMOND 💎", price: 158, formattedPrice: "Tk 158" },
              { id: 5, name: "610 DIAMOND 💎", price: 394, formattedPrice: "Tk 394" },
              { id: 6, name: "1240 DIAMOND 💎", price: 795, formattedPrice: "Tk 795" },
              { id: 7, name: "2530 DIAMOND 💎", price: 1575, formattedPrice: "Tk 1575" },
              { id: 8, name: "WEEKLY", price: 160, formattedPrice: "Tk 160" },
              { id: 9, name: "MONTHLY", price: 790, formattedPrice: "Tk 790" },
              { id: 10, name: "LEVEL UP PASS", price: 161, formattedPrice: "Tk 161" },
              { id: 11, name: "WEEKLY LITE", price: 40, formattedPrice: "Tk 40" },
            ],
          },
          "airdrop-gcodes": {
            id: "airdrop-gcodes",
            title: "AIRDRIP (GCODS)",
            category: "free-fire",
            image: "/placeholder.svg?height=150&width=200",
            description: "Top up your Free Fire account with Airdrip items.",
            packages: [
              { id: 1, name: "Airdrip Basic", price: 50, formattedPrice: "Tk 50" },
              { id: 2, name: "Airdrip Premium", price: 100, formattedPrice: "Tk 100" },
              { id: 3, name: "Airdrip Elite", price: 200, formattedPrice: "Tk 200" },
            ],
          },
          "weekly-lite-gcodes": {
            id: "weekly-lite-gcodes",
            title: "WEEKLY LITE (GCODS)",
            category: "free-fire",
            image: "/placeholder.svg?height=150&width=200",
            description: "Get weekly lite packages for Free Fire.",
            packages: [
              { id: 1, name: "Weekly Lite Basic", price: 40, formattedPrice: "Tk 40" },
              { id: 2, name: "Weekly Lite Plus", price: 80, formattedPrice: "Tk 80" },
            ],
          },
          "evo-access-gcodes": {
            id: "evo-access-gcodes",
            title: "EVO ACCESS (GCODS)",
            category: "free-fire",
            image: "/placeholder.svg?height=150&width=200",
            description: "Get EVO access for Free Fire.",
            packages: [
              { id: 1, name: "EVO Access Basic", price: 100, formattedPrice: "Tk 100" },
              { id: 2, name: "EVO Access Premium", price: 200, formattedPrice: "Tk 200" },
            ],
          },
          "ff-indonesia-server": {
            id: "ff-indonesia-server",
            title: "FF INDONESIA SERVER",
            category: "free-fire",
            image: "/placeholder.svg?height=150&width=200",
            description: "Top up your Free Fire Indonesia server account.",
            packages: [
              { id: 1, name: "100 Diamonds", price: 70, formattedPrice: "Tk 70" },
              { id: 2, name: "310 Diamonds", price: 210, formattedPrice: "Tk 210" },
              { id: 3, name: "520 Diamonds", price: 350, formattedPrice: "Tk 350" },
            ],
          },
          "pubg-gcodes": {
            id: "pubg-gcodes",
            title: "PUBG MOBILE (GCODES)",
            category: "pubg",
            image: "/placeholder.svg?height=150&width=200",
            description: "Top up your PUBG Mobile account with UC and other items.",
            packages: [
              { id: 1, name: "60 UC", price: 85, formattedPrice: "Tk 85" },
              { id: 2, name: "325 UC", price: 410, formattedPrice: "Tk 410" },
              { id: 3, name: "660 UC", price: 820, formattedPrice: "Tk 820" },
              { id: 4, name: "1800 UC", price: 2050, formattedPrice: "Tk 2050" },
            ],
          },
          "netflix-subscription": {
            id: "netflix-subscription",
            title: "NETFLIX SUBSCRIPTION",
            category: "subscription",
            image: "/placeholder.svg?height=150&width=200",
            description: "Get Netflix subscription at the best prices.",
            packages: [
              { id: 1, name: "1 Month Basic", price: 250, formattedPrice: "Tk 250" },
              { id: 2, name: "1 Month Standard", price: 450, formattedPrice: "Tk 450" },
              { id: 3, name: "1 Month Premium", price: 650, formattedPrice: "Tk 650" },
            ],
          },
          "prime-video": {
            id: "prime-video",
            title: "PRIME VIDEO",
            category: "subscription",
            image: "/placeholder.svg?height=150&width=200",
            description: "Get Amazon Prime Video subscription at the best prices.",
            packages: [
              { id: 1, name: "1 Month", price: 200, formattedPrice: "Tk 200" },
              { id: 2, name: "3 Months", price: 550, formattedPrice: "Tk 550" },
              { id: 3, name: "1 Year", price: 1800, formattedPrice: "Tk 1800" },
            ],
          },
          "netflix-prime-video": {
            id: "netflix-prime-video",
            title: "NETFLIX + PRIME VIDEO",
            category: "subscription",
            image: "/placeholder.svg?height=150&width=200",
            description: "Get Netflix and Prime Video bundle at discounted prices.",
            packages: [
              { id: 1, name: "1 Month Basic", price: 400, formattedPrice: "Tk 400" },
              { id: 2, name: "1 Month Standard", price: 600, formattedPrice: "Tk 600" },
              { id: 3, name: "3 Months Standard", price: 1500, formattedPrice: "Tk 1500" },
            ],
          },
          "youtube-premium": {
            id: "youtube-premium",
            title: "YOUTUBE PREMIUM",
            category: "subscription",
            image: "/placeholder.svg?height=150&width=200",
            description: "Get YouTube Premium subscription at the best prices.",
            packages: [
              { id: 1, name: "1 Month", price: 180, formattedPrice: "Tk 180" },
              { id: 2, name: "3 Months", price: 480, formattedPrice: "Tk 480" },
              { id: 3, name: "1 Year", price: 1600, formattedPrice: "Tk 1600" },
            ],
          },
        }
        productData = defaultProductData
        localStorage.setItem("products", JSON.stringify(defaultProductData))
      }

      if (productData[productId]) {
        setProduct(productData[productId])
      } else {
        // Fallback to first product if not found
        const firstProduct = Object.values(productData)[0]
        setProduct(firstProduct)
      }

      setIsLoading(false)
    }

    loadProductData()
  }, [productId])

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!playerId) {
      alert("Please enter your Player ID")
      return
    }

    if (!selectedPackage) {
      alert("Please select a package")
      return
    }

    // If not logged in, redirect to login
    if (!isLoggedIn) {
      // In a real app, save order details to localStorage and redirect
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          productId,
          productTitle: product.title,
          playerId,
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          price: selectedPackage.price,
          paymentMethod,
        }),
      )

      // Redirect to login
      window.location.href = "/login"
      return
    }

    // Process order
    const orderData = {
      productId,
      productTitle: product.title,
      playerId,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      price: selectedPackage.price,
      paymentMethod,
      status: "pending",
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      userId: JSON.parse(localStorage.getItem("userData") || "{}").id,
    }

    // In a real app, send to API
    // For demo, save to localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    orders.push(orderData)
    localStorage.setItem("orders", JSON.stringify(orders))

    alert("Order placed successfully! Order ID: " + orderData.orderId)

    // Redirect to user dashboard
    window.location.href = "/dashboard"
  }

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>
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
                key={pkg.id}
                className={`border rounded p-4 text-center cursor-pointer transition-all ${
                  selectedPackage?.id === pkg.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
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
                <span>Player ID Code ভুল দিলে Diamond না পেলে Unique Topup কর্তৃপক্ষ দায়ী নয় ।</span>
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
