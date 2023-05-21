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

import AddChatbotButton from "./components/addChatbotButton"
import ChatbotCard from "./components/chatbotCard"
import ChatbotsData from "./components/chatbotsData"

const Page = () => {
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
        <AddChatbotButton />
      </div>
      <ChatbotsData />
    </div>
  )
}

export default Page
