"use client"

import React from "react"
import { RefreshCcw, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Page = () => {
  return (
    <div className="flex h-screen w-full flex-col justify-between overflow-auto p-3">
      <div className="flex flex-col space-y-5">
        <div className="self-end">
          <RefreshCcw />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-200  px-4 py-2 text-black">
              <p className="text-sm ">Hello, how can I assist you today?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-lg bg-blue-500 px-4 py-2 text-white">
              <p className="text-sm">I have a question about your products.</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-200  px-4 py-2 text-black">
              <p className="text-sm">Sure, I&apos;d be happy to help!</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-lg bg-blue-500 px-4 py-2 text-white">
              <p className="text-sm">Thank you for your assistance.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex w-full items-center space-x-2 p-2">
        <Input
          type="text"
          placeholder="Type your message..."
          className="w-full appearance-none border-none border-transparent focus:outline-none focus:ring-0"
        />
        <button type="submit" className="absolute right-4">
          <Send className="rotate-45" />
        </button>
      </div>
    </div>
  )
}

export default Page
