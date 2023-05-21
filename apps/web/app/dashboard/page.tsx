"use client"

import React from "react"
import { Grid, List, Plus, PlusIcon } from "lucide-react"
import useSWR from "swr"

import { IChatbot } from "@/types/chatbot"
import { fetcher } from "@/lib/axios"
import useUser from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ChatbotCard from "./components/chatbotCard"

const Page = () => {
  const { loginStatus } = useUser()
  const { data, error, isLoading } = useSWR<IChatbot[]>(
    loginStatus === "login" && "/chatbot",
    fetcher
  )

  return (
    <div className="flex flex-col items-stretch gap-6">
      <div className="flex w-full items-center space-x-2 ">
        <Input type="search" placeholder="Search..." className="w-full" />
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="grid">
              <Grid />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List />
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button type="button" className="whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" /> Add chatbot
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {data?.map((chatbot) => {
          return <ChatbotCard chatbot={chatbot} />
        })}
      </div>
    </div>
  )
}

export default Page
