"use client"

import { ReactNode } from "react"

import { Separator } from "@/components/ui/separator"

import ChatInterface from "./components/chatInterface"

const ContentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex justify-start">
        <div className="grow p-6">
          <ChatInterface />
        </div>
        <Separator orientation="vertical" className="h-[calc(100vh-66px)]" />
        <div className="grow p-6 flex justify-center">{children}</div>
      </div>
    </>
  )
}
export default ContentLayout
