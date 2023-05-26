"use client"

import React from "react"
import { useParams } from "next/navigation"
import useSWR from "swr"

import { FormValues } from "@/types/chatbotInterface"
import { fetcher } from "@/lib/axios"

import ChatbotInterfaceForm from "./chatbotInterfaceForm"

const ChatInterface = () => {
  const params = useParams() as { chatbotId: string }

  const { data, error, isLoading } = useSWR<FormValues[]>(
    `/chatbot-settings/interface/${params.chatbotId}`,
    fetcher
  )

  if (error) {
    return <div>Error fetching data...</div>
  }
  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <div className="mb-4">
        <h2>Chat Interface</h2>
        <p>applies when embedded on a website</p>
        <ChatbotInterfaceForm data={data} />
      </div>
    </div>
  )
}

export default ChatInterface
