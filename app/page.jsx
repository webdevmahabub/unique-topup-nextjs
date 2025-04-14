import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NoticeAlert from "@/components/notice-alert"

// Game data
const freeFireGames = [
  { id: "free-fire-gcodes", title: "FREE FIRE (GCODES)", image: "/placeholder.svg?height=150&width=200" },
  { id: "airdrop-gcodes", title: "AIRDRIP (GCODS)", image: "/placeholder.svg?height=150&width=200" },
  { id: "weekly-lite-gcodes", title: "WEEKLY LITE (GCODS)", image: "/placeholder.svg?height=150&width=200" },
  { id: "evo-access-gcodes", title: "EVO ACCESS (GCODS)", image: "/placeholder.svg?height=150&width=200" },
  { id: "ff-indonesia-server", title: "FF INDONESIA SERVER", image: "/placeholder.svg?height=150&width=200" },
]

const subscriptions = [
  { id: "netflix-subscription", title: "NETFLIX SUBSCRIPTION", image: "/placeholder.svg?height=150&width=200" },
  { id: "netflix-prime-video", title: "NETFLIX + PRIME VIDEO", image: "/placeholder.svg?height=150&width=200" },
  { id: "prime-video", title: "PRIME VIDEO", image: "/placeholder.svg?height=150&width=200" },
  { id: "youtube-premium", title: "YOUTUBE PREMIUM", image: "/placeholder.svg?height=150&width=200" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Notice Alert */}
      <NoticeAlert />

      {/* Hero Banner */}
      <div className="container mx-auto px-4 py-4">
        <div className="relative h-[170px] md:h-[550px] rounded overflow-hidden">
          <Image src="/banner.png" alt="Banner" fill className="object-cover" priority />
          <div className="absolute top-4 left-4">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Logo" width={100} height={30} className="h-8 w-auto" />
            </div>
          </div>

          {/* Carousel Controls */}
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
            <span className="text-xl">&lt;</span>
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
            <span className="text-xl">&gt;</span>
          </button>
        </div>
      </div>

      {/* Free Fire Section */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-xl font-bold mb-4">FREE FIRE</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {freeFireGames.map((game) => (
            <Link
              key={game.id}
              href={`/topup/${game.id}`}
              className="block border rounded overflow-hidden hover:shadow-sm"
            >
              <div className="relative h-32 md:h-40">
                <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
              </div>
              <div className="p-2 text-center text-xs">
                <p>{game.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Subscription Section */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-xl font-bold mb-4">SUBSCRIPTION🔥</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subscriptions.map((subscription) => (
            <Link
              key={subscription.id}
              href={`/topup/${subscription.id}`}
              className="block border rounded overflow-hidden hover:shadow-sm"
            >
              <div className="relative h-32 md:h-40">
                <Image
                  src={subscription.image || "/placeholder.svg"}
                  alt={subscription.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 text-center text-xs">
                <p>{subscription.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">SUPPORT</h3>
              <div className="space-y-2">
                <p className="text-sm">9AM - 11PM</p>
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-full p-1">
                    <Image src="/placeholder.svg?height=20&width=20" alt="Telegram" width={20} height={20} />
                  </div>
                  <span className="text-sm">Telegram Helpline</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="bg-white rounded-full p-1">
                    <Image src="/placeholder.svg?height=20&width=20" alt="Telegram" width={20} height={20} />
                  </div>
                  <span className="text-sm">Telegram Group</span>
                </div>
                <Button size="sm" variant="outline" className="text-white border-white hover:bg-blue-700 mt-2">
                  Join Now
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">ABOUT</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#">Terms & Condition</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Refund Info</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
                <li>
                  <Link href="#">About us</Link>
                </li>
                <li>
                  <Link href="#">Reseller Partner Policy</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">STAY CONNECTED</h3>
              <div className="space-y-2">
                <p className="text-sm">Unique Topup SHOP</p>
                <p className="text-sm">Email: uniquetopup@gmail.com</p>
                <div className="flex gap-2 mt-4">
                  <Link href="#" className="bg-white rounded-full p-1">
                    <Image src="/placeholder.svg?height=20&width=20" alt="Facebook" width={20} height={20} />
                  </Link>
                  <Link href="#" className="bg-white rounded-full p-1">
                    <Image src="/placeholder.svg?height=20&width=20" alt="Instagram" width={20} height={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-blue-500 text-center text-sm">
            <p>© Copyright 2023. All Rights Reserved. Developed by Unique Topup</p>
            <div className="flex justify-center gap-2 mt-2">
              <Link href="#" className="bg-white rounded-full p-1">
                <Image src="/placeholder.svg?height=20&width=20" alt="YouTube" width={20} height={20} />
              </Link>
              <Link href="#" className="bg-white rounded-full p-1">
                <Image src="/placeholder.svg?height=20&width=20" alt="Facebook" width={20} height={20} />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Support Button */}
      <div className="fixed bottom-4 right-4">
        <Button className="rounded-full bg-red-500 hover:bg-red-600">Support</Button>
      </div>
    </main>
  )
}
