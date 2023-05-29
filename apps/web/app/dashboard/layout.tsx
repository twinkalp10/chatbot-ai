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
  const params = useParams()
  return (
    <div>
      <div className="bg-background sticky left-0 top-0 flex w-full flex-col z-50">
        <div className="border-b">
          <div className="flex items-stretch p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex gap-4">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <MessageCircle className="h-6 w-6" />

                  <p className="font-bold leading-tight tracking-tighter">
                    Chatbot AI
                  </p>
                </Link>
                <ChatbotSwitcher />
              </div>
              <div>
                <UserNav />
              </div>
            </div>
          </div>
          {params?.chatbotId && (
            <div>
              <MainNav className="m-2" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
export default DashboardLayout
