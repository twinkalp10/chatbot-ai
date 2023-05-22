"use client"

import { ReactNode } from "react"
import { Metadata } from "next"
import { useParams } from "next/navigation"

import ChatbotSwitcher from "./components/chatbotSwitcher"
import { MainNav } from "./components/main-nav"
import { UserNav } from "./components/user-nav"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = useParams()
  console.log(pathname)
  return (
    <div>
      <div className="flex flex-col">
        <div className="border-b">
          <div
            className={
              pathname
                ? "flex h-26 items-stretch px-4 py-2"
                : "flex h-16 items-center px-4 py-2"
            }
          >
            <div className="flex flex-col gap-3">
              <ChatbotSwitcher />
              <MainNav className="mx-2" />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
export default DashboardLayout
