import Image from "next/image"
import Link from "next/link"

export default function GameSection({ title, games }) {
  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {games.map((game) => (
          <Link key={game.id} href="#" className="block border rounded overflow-hidden hover:shadow-sm">
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
  )
}
