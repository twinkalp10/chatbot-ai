"use client"

import { ReactNode } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MessageCircle } from "lucide-react"

import ChatbotSwitcher from "./components/chatbotSwitcher"
import { MainNav } from "./components/main-nav"
import { UserNav } from "./components/user-nav"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = useParams()
  return (
    <div>
      <div className="flex flex-col">
        <div className="border-b">
          <div
            className={
              pathname
                ? "h-26 flex items-stretch px-4 py-2"
                : "flex h-16 items-center px-4 py-2"
            }
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />

              <p className="font-bold leading-tight tracking-tighter">
                Chatbot AI
              </p>
            </Link>
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
