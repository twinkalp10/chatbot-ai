"use client"

import React from "react"

import ChatbotsData from "./components/allChatbotsData"

const Page = () => {
  return (
    <div className="flex flex-col items-stretch gap-6">
      <ChatbotsData />
    </div>
  )
}

export default Page
