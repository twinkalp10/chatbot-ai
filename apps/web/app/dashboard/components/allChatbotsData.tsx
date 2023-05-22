import React, { useState } from "react"
import { Grid, List } from "lucide-react"
import useSWR from "swr"

import { IChatbot } from "@/types/chatbot"
import { fetcher } from "@/lib/axios"
import useUser from "@/hooks/useUser"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import AddChatbotButton from "./addChatbotButton"
import ChatbotCard from "./chatbotCard"
import LoadingChatbotsData from "./loadingChatbotsData"

const ChatbotsData = () => {
  const dummyArray = Array.from({ length: 12 })
  const { loginStatus } = useUser()
  const { data, error, isLoading } = useSWR<IChatbot[]>(
    loginStatus === "login" && "/chatbot",
    fetcher
  )

  const [selectedTab, setSelectedTab] = useState("grid")
  const [selectedQuery, setSelectedQuery] = useState("")

  const filteredSearch = data?.filter((item) => {
    const searchQuery = selectedQuery.toLowerCase()
    const nameQuery = item.name.toLowerCase()
    const urlQuery = item.url.toLowerCase()
    return nameQuery.includes(searchQuery) || urlQuery.includes(searchQuery)
  })

  if (error) {
    return <div>Error fetching data...</div>
  }
  if (isLoading)
    return (
      <div className="grid grid-cols-5 gap-4">
        {dummyArray.map(() => (
          <LoadingChatbotsData />
        ))}
      </div>
    )
  return (
    <>
      <div className="flex w-full items-center space-x-2 ">
        <Input
          type="search"
          placeholder="Search chatbot..."
          className="w-full"
          value={selectedQuery}
          onChange={(event) => setSelectedQuery(event.target.value)}
        />

        <Tabs defaultValue="grid">
          <TabsList>
            <TabsTrigger value="grid" onClick={() => setSelectedTab("grid")}>
              <Grid />
            </TabsTrigger>
            <TabsTrigger value="list" onClick={() => setSelectedTab("list")}>
              <List />
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <AddChatbotButton />
      </div>
      <div
        className={
          selectedTab === "grid"
            ? "grid grid-cols-5 gap-4"
            : "flex flex-col gap-3"
        }
      >
        {filteredSearch?.map((chatbot, index) => {
          return <ChatbotCard chatbot={chatbot} key={index} />
        })}
      </div>
    </>
  )
}

export default ChatbotsData
