// This file initializes the mock database with sample data
// It's used for development purposes only

export function initMockDatabase() {
    // Check if we're in the browser
    if (typeof window === "undefined") {
      return
    }
  
    // Check if we already have data
    const hasUsers = localStorage.getItem("users")
    const hasProducts = localStorage.getItem("products")
    const hasOrders = localStorage.getItem("orders")
  
    // If we already have data, don't initialize
    if (hasUsers && hasProducts && hasOrders) {
      return
    }
  
    // Sample users
    const users = [
      {
        _id: "1",
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        password: "$2a$10$ij4H1VXFSfYE8MCw.WZ37.P8fS1Q8YhcbWAV.LD5d3V6jbCJGTNse", // admin123
        role: "admin",
        profilePic: "/placeholder.svg?height=80&width=80",
        createdAt: new Date(),
      },
      {
        _id: "2",
        id: "2",
        name: "Regular User",
        email: "user@example.com",
        password: "$2a$10$8KvT5VcW4Jnw0vRCfM/Y3.LPYvFzWq7lCOT9GF9Ijf4MK4Vmv/3oe", // password
        role: "user",
        profilePic: "/placeholder.svg?height=80&width=80",
        createdAt: new Date(),
      },
    ]
  
    // Sample products
    const products = [
      {
        _id: "free-fire-gcodes",
        id: "free-fire-gcodes",
        title: "FREE FIRE (IDCODE)",
        category: "free-fire",
        image: "/placeholder.svg?height=150&width=200",
        description: "Top up your Free Fire account with diamonds and other items.",
        packages: [
          { _id: "1", id: "1", name: "25 DIAMOND 💎", price: 25, formattedPrice: "Tk 25" },
          { _id: "2", id: "2", name: "50 DIAMOND 💎", price: 40, formattedPrice: "Tk 40" },
          { _id: "3", id: "3", name: "115 DIAMOND 💎", price: 79, formattedPrice: "Tk 79" },
          { _id: "4", id: "4", name: "240 DIAMOND 💎", price: 158, formattedPrice: "Tk 158" },
          { _id: "5", id: "5", name: "610 DIAMOND 💎", price: 394, formattedPrice: "Tk 394" },
        ],
      },
      {
        _id: "pubg-gcodes",
        id: "pubg-gcodes",
        title: "PUBG MOBILE (GCODES)",
        category: "pubg",
        image: "/placeholder.svg?height=150&width=200",
        description: "Top up your PUBG Mobile account with UC and other items.",
        packages: [
          { _id: "6", id: "6", name: "60 UC", price: 85, formattedPrice: "Tk 85" },
          { _id: "7", id: "7", name: "325 UC", price: 410, formattedPrice: "Tk 410" },
          { _id: "8", id: "8", name: "660 UC", price: 820, formattedPrice: "Tk 820" },
        ],
      },
    ]
  
    // Sample orders
    const orders = [
      {
        _id: "ord1",
        orderId: "ORD-1234567890",
        userId: "2",
        productId: "free-fire-gcodes",
        productTitle: "FREE FIRE (IDCODE)",
        playerId: "PLAYER123456",
        packageId: "1",
        packageName: "25 DIAMOND 💎",
        price: 25,
        paymentMethod: "wallet",
        status: "completed",
        date: new Date(Date.now() - 86400000), // 1 day ago
      },
      {
        _id: "ord2",
        orderId: "ORD-0987654321",
        userId: "2",
        productId: "pubg-gcodes",
        productTitle: "PUBG MOBILE (GCODES)",
        playerId: "PLAYER654321",
        packageId: "6",
        packageName: "60 UC",
        price: 85,
        paymentMethod: "instant",
        status: "pending",
        date: new Date(),
      },
    ]
  
    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("products", JSON.stringify(products))
    localStorage.setItem("orders", JSON.stringify(orders))
  
    console.log("Mock database initialized with sample data")
  }
  