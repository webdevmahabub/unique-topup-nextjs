"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Initial product data (in a real app, this would come from an API/database)
const initialProductData = {
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
}

export default function AdminProducts() {
  const router = useRouter()
  const [products, setProducts] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddPackage, setShowAddPackage] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [showEditPackage, setShowEditPackage] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)

  // Form states
  const [newProduct, setNewProduct] = useState({
    id: "",
    title: "",
    category: "free-fire",
    image: "/placeholder.svg?height=150&width=200",
    description: "",
    packages: [],
  })

  const [newPackage, setNewPackage] = useState({
    id: Date.now(),
    name: "",
    price: 0,
    formattedPrice: "",
  })

  useEffect(() => {
    // Check if user is logged in and is admin
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")

    if (!isLoggedIn || userData.role !== "admin") {
      router.push("/login")
      return
    }

    // Load products from localStorage or use initial data
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      setProducts(initialProductData)
      localStorage.setItem("products", JSON.stringify(initialProductData))
    }

    setIsLoading(false)
  }, [router])

  // Handle product selection
  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setShowAddPackage(false)
    setShowEditProduct(false)
    setShowEditPackage(false)
    setSelectedPackage(null)
  }

  // Handle adding a new product
  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.id || !newProduct.title || !newProduct.description) {
      alert("Please fill in all required fields")
      return
    }

    // Create slug-friendly ID if not provided
    const productId = newProduct.id.toLowerCase().replace(/\s+/g, "-")

    // Check if product ID already exists
    if (products[productId]) {
      alert("A product with this ID already exists")
      return
    }

    // Add new product
    const updatedProducts = {
      ...products,
      [productId]: {
        ...newProduct,
        id: productId,
        packages: [],
      },
    }

    // Update state and localStorage
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))

    // Reset form and close modal
    setNewProduct({
      id: "",
      title: "",
      category: "free-fire",
      image: "/placeholder.svg?height=150&width=200",
      description: "",
      packages: [],
    })
    setShowAddProduct(false)
  }

  // Handle updating a product
  const handleUpdateProduct = () => {
    if (!selectedProduct) return

    // Validate form
    if (!selectedProduct.title || !selectedProduct.description) {
      alert("Please fill in all required fields")
      return
    }

    // Update product
    const updatedProducts = {
      ...products,
      [selectedProduct.id]: selectedProduct,
    }

    // Update state and localStorage
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))

    // Close modal
    setShowEditProduct(false)
  }

  // Handle deleting a product
  const handleDeleteProduct = (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    // Create a copy of products without the deleted one
    const { [productId]: deletedProduct, ...remainingProducts } = products

    // Update state and localStorage
    setProducts(remainingProducts)
    localStorage.setItem("products", JSON.stringify(remainingProducts))

    // Reset selected product if it was deleted
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null)
    }
  }

  // Handle adding a package to a product
  const handleAddPackage = () => {
    if (!selectedProduct) return

    // Validate form
    if (!newPackage.name || newPackage.price <= 0) {
      alert("Please fill in all required fields with valid values")
      return
    }

    // Format price
    const formattedPrice = `Tk ${newPackage.price}`

    // Create new package
    const packageToAdd = {
      ...newPackage,
      id: Date.now(), // Ensure unique ID
      formattedPrice,
    }

    // Add package to selected product
    const updatedProduct = {
      ...selectedProduct,
      packages: [...selectedProduct.packages, packageToAdd],
    }

    // Update products
    const updatedProducts = {
      ...products,
      [selectedProduct.id]: updatedProduct,
    }

    // Update state and localStorage
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
    setSelectedProduct(updatedProduct)

    // Reset form and close modal
    setNewPackage({
      id: Date.now(),
      name: "",
      price: 0,
      formattedPrice: "",
    })
    setShowAddPackage(false)
  }

  // Handle updating a package
  const handleUpdatePackage = () => {
    if (!selectedProduct || !selectedPackage) return

    // Validate form
    if (!selectedPackage.name || selectedPackage.price <= 0) {
      alert("Please fill in all required fields with valid values")
      return
    }

    // Format price
    const formattedPrice = `Tk ${selectedPackage.price}`

    // Update package
    const updatedPackage = {
      ...selectedPackage,
      formattedPrice,
    }

    // Update packages in selected product
    const updatedPackages = selectedProduct.packages.map((pkg) => (pkg.id === updatedPackage.id ? updatedPackage : pkg))

    // Update product
    const updatedProduct = {
      ...selectedProduct,
      packages: updatedPackages,
    }

    // Update products
    const updatedProducts = {
      ...products,
      [selectedProduct.id]: updatedProduct,
    }

    // Update state and localStorage
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
    setSelectedProduct(updatedProduct)

    // Reset and close modal
    setSelectedPackage(null)
    setShowEditPackage(false)
  }

  // Handle deleting a package
  const handleDeletePackage = (packageId) => {
    if (!selectedProduct) return
    if (!confirm("Are you sure you want to delete this package?")) return

    // Filter out the deleted package
    const updatedPackages = selectedProduct.packages.filter((pkg) => pkg.id !== packageId)

    // Update product
    const updatedProduct = {
      ...selectedProduct,
      packages: updatedPackages,
    }

    // Update products
    const updatedProducts = {
      ...products,
      [selectedProduct.id]: updatedProduct,
    }

    // Update state and localStorage
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
    setSelectedProduct(updatedProduct)

    // Reset selected package if it was deleted
    if (selectedPackage && selectedPackage.id === packageId) {
      setSelectedPackage(null)
      setShowEditPackage(false)
    }
  }

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link href="/admin">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar - Product List */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Products</h2>
            <Button size="sm" onClick={() => setShowAddProduct(true)}>
              Add New
            </Button>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {Object.values(products).length === 0 ? (
              <p className="text-gray-500 text-center py-4">No products found</p>
            ) : (
              Object.values(products).map((product) => (
                <div
                  key={product.id}
                  className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                    selectedProduct?.id === product.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelectProduct(product)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden mr-2">
                      <Image src={product.image || "/placeholder.svg"} alt={product.title} width={32} height={32} />
                    </div>
                    <span className="text-sm truncate">{product.title}</span>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteProduct(product.id)
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content - Product Details */}
        <div className="md:col-span-3">
          {selectedProduct ? (
            <div className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedProduct.title}</h2>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setShowEditProduct(true)}>
                    Edit Product
                  </Button>
                  <Button size="sm" onClick={() => setShowAddPackage(true)}>
                    Add Package
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">{selectedProduct.description}</p>
                <p className="text-sm text-gray-500 mt-1">Category: {selectedProduct.category}</p>
                <p className="text-sm text-gray-500">ID: {selectedProduct.id}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Packages</h3>
                {selectedProduct.packages.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No packages found</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProduct.packages.map((pkg) => (
                      <div key={pkg.id} className="border rounded p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{pkg.name}</p>
                            <p className="text-blue-600">{pkg.formattedPrice}</p>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              className="text-blue-500 hover:text-blue-700 text-sm"
                              onClick={() => {
                                setSelectedPackage(pkg)
                                setShowEditPackage(true)
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 text-sm"
                              onClick={() => handleDeletePackage(pkg.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-4 text-center py-10">
              <p className="text-gray-500">Select a product to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowAddProduct(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-id">Product ID</Label>
                  <Input
                    id="product-id"
                    value={newProduct.id}
                    onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                    placeholder="e.g., free-fire-diamonds"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be used in URLs. Use lowercase letters, numbers, and hyphens only.
                  </p>
                </div>

                <div>
                  <Label htmlFor="product-title">Product Title</Label>
                  <Input
                    id="product-title"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    placeholder="e.g., Free Fire Diamonds"
                  />
                </div>

                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <select
                    id="product-category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="free-fire">Free Fire</option>
                    <option value="pubg">PUBG</option>
                    <option value="subscription">Subscription</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="product-description">Description</Label>
                  <textarea
                    id="product-description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Enter product description"
                    className="w-full p-2 border rounded h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="product-image">Image URL</Label>
                  <Input
                    id="product-image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="/path/to/image.jpg"
                  />
                </div>

                <Button className="w-full" onClick={handleAddProduct}>
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProduct && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowEditProduct(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-product-id">Product ID</Label>
                  <Input id="edit-product-id" value={selectedProduct.id} disabled />
                  <p className="text-xs text-gray-500 mt-1">Product ID cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="edit-product-title">Product Title</Label>
                  <Input
                    id="edit-product-title"
                    value={selectedProduct.title}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-product-category">Category</Label>
                  <select
                    id="edit-product-category"
                    value={selectedProduct.category}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="free-fire">Free Fire</option>
                    <option value="pubg">PUBG</option>
                    <option value="subscription">Subscription</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="edit-product-description">Description</Label>
                  <textarea
                    id="edit-product-description"
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                    className="w-full p-2 border rounded h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-product-image">Image URL</Label>
                  <Input
                    id="edit-product-image"
                    value={selectedProduct.image}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
                  />
                </div>

                <Button className="w-full" onClick={handleUpdateProduct}>
                  Update Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Package Modal */}
      {showAddPackage && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowAddPackage(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add Package to {selectedProduct.title}</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="package-name">Package Name</Label>
                  <Input
                    id="package-name"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                    placeholder="e.g., 100 Diamonds"
                  />
                </div>

                <div>
                  <Label htmlFor="package-price">Price (Tk)</Label>
                  <Input
                    id="package-price"
                    type="number"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: Number.parseInt(e.target.value) || 0 })}
                    placeholder="e.g., 100"
                  />
                </div>

                <Button className="w-full" onClick={handleAddPackage}>
                  Add Package
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {showEditPackage && selectedProduct && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => {
                setShowEditPackage(false)
                setSelectedPackage(null)
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Package</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-package-name">Package Name</Label>
                  <Input
                    id="edit-package-name"
                    value={selectedPackage.name}
                    onChange={(e) => setSelectedPackage({ ...selectedPackage, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-package-price">Price (Tk)</Label>
                  <Input
                    id="edit-package-price"
                    type="number"
                    value={selectedPackage.price}
                    onChange={(e) =>
                      setSelectedPackage({ ...selectedPackage, price: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <Button className="w-full" onClick={handleUpdatePackage}>
                  Update Package
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
