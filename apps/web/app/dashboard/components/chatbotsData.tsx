import React from "react"
import useSWR from "swr"

import { IChatbot } from "@/types/chatbot"
import { fetcher } from "@/lib/axios"
import useUser from "@/hooks/useUser"

import ChatbotCard from "./chatbotCard"
import LoadingChatbotsData from "./loadingChatbotsData"

const ChatbotsData = () => {
  const { loginStatus } = useUser()
  const { data, error, isLoading } = useSWR<IChatbot[]>(
    loginStatus === "login" && "/chatbot",
    fetcher
  )
  if (isLoading)
    return (
      <div className="grid grid-cols-5 gap-4">
        {data?.map(() => {
          return <LoadingChatbotsData />
        })}
      </div>
    )
  return (
    <div className="grid grid-cols-5 gap-4">
      {data?.map((chatbot, index) => {
        return <ChatbotCard chatbot={chatbot} key={index} />
      })}
    </div>
  )
}

export default ChatbotsData
