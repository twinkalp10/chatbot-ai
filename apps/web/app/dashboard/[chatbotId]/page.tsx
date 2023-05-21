"use client"

import React from "react"
import { useParams, usePathname } from "next/navigation"

const Chatbot = () => {
  const pathname = useParams()
  return <div>{pathname.chatbotId}</div>
}

export default Chatbot
