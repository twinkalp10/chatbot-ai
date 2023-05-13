"use client"

import React, { useState } from "react"

import ChatbotInput from "./component/ChatbotInput"
import Table from "./component/Table"

const page = () => {
  const [showFirstComponent, setShowFirstComponent] = useState(true)
  return (
    <div>
      {showFirstComponent ? (
        <ChatbotInput onSubmit={() => setShowFirstComponent(false)} />
      ) : (
        <Table />
      )}
    </div>
  )
}

export default page
