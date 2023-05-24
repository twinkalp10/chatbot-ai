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
      <div
        className="flex flex-col sticky w-full top-0 left-0"
        style={{ backgroundColor: "rgba(0,0,0,.8)" }}
      >
        <div className="border-b">
          <div className="py-4 flex items-stretch px-4">
            <div className="flex items-center justify-between w-full">
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
              <MainNav className="mx-2 my-2" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
export default DashboardLayout
