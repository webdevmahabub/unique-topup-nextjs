import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/use-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Unique Topup - Game TopUp Service",
  description: "TopUp your favorite games with Unique Topup",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
