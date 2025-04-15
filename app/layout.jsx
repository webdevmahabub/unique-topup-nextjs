import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/sonner"
import { initClientDB } from "@/lib/client-db"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Unique Topup A - Game TopUp Service",
  description: "TopUp your favorite games with Unique Topup A",
}

// Client-side component to initialize the database
function InitDatabase() {
  if (typeof window !== "undefined") {
    // Only run in the browser
    initClientDB()
  }
  return null
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
        <InitDatabase />
      </body>
    </html>
  )
}
