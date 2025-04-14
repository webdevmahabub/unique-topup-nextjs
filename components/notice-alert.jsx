"use client"

import { useState } from "react"

export default function NoticeAlert() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gray-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">
              <span className="font-bold">Notice:</span> আমাদের ওয়েবসাইটে নিবন্ধন ২৪ ঘণ্টা সক্রিয় করতে পারবেন, যার ৩০ সেকেন্ড
              অপেক্ষা-সময়ে তেজিভাবে দেখা হয়।
            </p>
          </div>
          <button onClick={() => setIsVisible(false)} className="text-gray-600 hover:text-gray-800">
            <span className="text-xl">&times;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
