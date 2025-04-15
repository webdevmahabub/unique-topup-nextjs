/**
 * Client-side database implementation using localStorage
 * This is used for development purposes only
 */

// Initialize the database if it doesn't exist
export function initClientDB() {
    if (typeof window === "undefined") return
  
    // Initialize users if not exists
    if (!localStorage.getItem("users")) {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            password: "$2a$10$ij4H1VXFSfYE8MCw.WZ37.P8fS1Q8YhcbWAV.LD5d3V6jbCJGTNse", // admin123
            role: "admin",
            profilePic: "/placeholder.svg?height=80&width=80",
          },
          {
            id: "2",
            name: "Regular User",
            email: "user@example.com",
            password: "$2a$10$8KvT5VcW4Jnw0vRCfM/Y3.LPYvFzWq7lCOT9GF9Ijf4MK4Vmv/3oe", // password
            role: "user",
            profilePic: "/placeholder.svg?height=80&width=80",
          },
        ]),
      )
    }
  
    // Initialize products if not exists
    if (!localStorage.getItem("products")) {
      localStorage.setItem(
        "products",
        JSON.stringify([
          {
            id: "free-fire-gcodes",
            title: "FREE FIRE (IDCODE)",
            category: "free-fire",
            image: "/placeholder.svg?height=150&width=200",
            description: "Top up your Free Fire account with diamonds and other items.",
            packages: [
              { id: "1", name: "25 DIAMOND 💎", price: 25, formattedPrice: "Tk 25" },
              { id: "2", name: "50 DIAMOND 💎", price: 40, formattedPrice: "Tk 40" },
              { id: "3", name: "115 DIAMOND 💎", price: 79, formattedPrice: "Tk 79" },
              { id: "4", name: "240 DIAMOND 💎", price: 158, formattedPrice: "Tk 158" },
              { id: "5", name: "610 DIAMOND 💎", price: 394, formattedPrice: "Tk 394" },
            ],
          },
          {
            id: "pubg-gcodes",
            title: "PUBG MOBILE (GCODES)",
            category: "pubg",
            image: "/placeholder.svg?height=150&width=200",
            description: "Top up your PUBG Mobile account with UC and other items.",
            packages: [
              { id: "6", name: "60 UC", price: 85, formattedPrice: "Tk 85" },
              { id: "7", name: "325 UC", price: 410, formattedPrice: "Tk 410" },
              { id: "8", name: "660 UC", price: 820, formattedPrice: "Tk 820" },
            ],
          },
        ]),
      )
    }
  
    // Initialize orders if not exists
    if (!localStorage.getItem("orders")) {
      localStorage.setItem("orders", JSON.stringify([]))
    }
  }
  
  // Get all users
  export function getUsers() {
    if (typeof window === "undefined") return []
    return JSON.parse(localStorage.getItem("users") || "[]")
  }
  
  // Get user by email
  export function getUserByEmail(email) {
    const users = getUsers()
    return users.find((user) => user.email === email)
  }
  
  // Get user by ID
  export function getUserById(id) {
    const users = getUsers()
    return users.find((user) => user.id === id)
  }
  
  // Add a new user
  export function addUser(user) {
    const users = getUsers()
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    return user
  }
  
  // Update a user
  export function updateUser(id, userData) {
    const users = getUsers()
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...userData }
      localStorage.setItem("users", JSON.stringify(users))
      return users[index]
    }
    return null
  }
  
  // Get all products
  export function getProducts() {
    if (typeof window === "undefined") return []
    return JSON.parse(localStorage.getItem("products") || "[]")
  }
  
  // Get product by ID
  export function getProductById(id) {
    const products = getProducts()
    return products.find((product) => product.id === id)
  }
  
  // Get all orders
  export function getOrders() {
    if (typeof window === "undefined") return []
    return JSON.parse(localStorage.getItem("orders") || "[]")
  }
  
  // Get orders by user ID
  export function getOrdersByUserId(userId) {
    const orders = getOrders()
    return orders.filter((order) => order.userId === userId)
  }
  
  // Add a new order
  export function addOrder(order) {
    const orders = getOrders()
    orders.push(order)
    localStorage.setItem("orders", JSON.stringify(orders))
    return order
  }
  
  // Update an order
  export function updateOrder(orderId, orderData) {
    const orders = getOrders()
    const index = orders.findIndex((order) => order.orderId === orderId)
    if (index !== -1) {
      orders[index] = { ...orders[index], ...orderData }
      localStorage.setItem("orders", JSON.stringify(orders))
      return orders[index]
    }
    return null
  }
  