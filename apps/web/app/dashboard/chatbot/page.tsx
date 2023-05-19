"use client"

import React from "react"
import { RefreshCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Page = () => {
  return (
    <div className="w-96 rounded h-[38rem] flex flex-col justify-between overflow-auto border-zinc-200 border p-2">
      <div className="flex space-y-5 flex-col">
        <div className="self-end">
          <RefreshCcwIcon />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-200  text-black py-2 px-4">
              <p className="text-sm ">Hello, how can I assist you today?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-lg bg-blue-500 text-white py-2 px-4">
              <p className="text-sm">I have a question about your products.</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-200  text-black py-2 px-4">
              <p className="text-sm">Sure, I'd be happy to help!</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-lg bg-blue-500 text-white py-2 px-4">
              <p className="text-sm">Thank you for your assistance.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 p-2 border rounded-md">
        <Input
          type="text"
          placeholder="Type your message..."
          className="w-full border-none border-transparent focus:ring-0 focus:outline-none appearance-none"
        />
        <Button type="submit">Send</Button>
      </div>
    </div>
  )
}

export default Page
