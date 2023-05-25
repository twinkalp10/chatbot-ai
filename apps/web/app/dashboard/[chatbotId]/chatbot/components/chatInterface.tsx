"use client"

import React from "react"

import ChatbotInterfaceForm from "./chatbotInterfaceForm"

const ChatInterface = () => {
  return (
    <div>
      <div className="mb-4">
        <h2>Chat Interface</h2>
        <p>applies when embedded on a website</p>
        <ChatbotInterfaceForm />
      </div>
    </div>
  )
}

export default ChatInterface
