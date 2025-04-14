import Image from "next/image"

const orders = [
  {
    id: 1,
    user: "Sakib1768",
    game: "Gcods - Tier 5",
    time: "2023-04-14 11:23 PM",
    status: "Completed",
  },
  {
    id: 2,
    user: "Rhubarb20",
    game: "Gcods - Tier 5",
    time: "2023-04-14 11:22 PM",
    status: "Completed",
  },
  {
    id: 3,
    user: "Sakib1768",
    game: "Gcods - Tier 5",
    time: "2023-04-14 11:21 PM",
    status: "Completed",
  },
  {
    id: 4,
    user: "Rhubarb20",
    game: "PUBG Diamond ID - Tier 5",
    time: "2023-04-14 11:20 PM",
    status: "Completed",
  },
  {
    id: 5,
    user: "Rhubarb20",
    game: "PUBG Diamond ID - Tier 5",
    time: "2023-04-14 11:19 PM",
    status: "Completed",
  },
]

export default function LatestOrders() {
  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between bg-white p-2 rounded border">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
              <Image src="/placeholder.svg?height=32&width=32" alt="User" width={32} height={32} />
            </div>
            <div>
              <p className="text-sm font-medium">{order.user}</p>
              <p className="text-xs text-gray-500">{order.game}</p>
              <p className="text-xs text-gray-500">{order.time}</p>
            </div>
          </div>
          <div>
            <span
              className={`text-xs px-2 py-1 rounded ${
                order.status === "Completed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
