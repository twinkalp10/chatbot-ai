import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import ChatbotSwitcher from "../dashboard/components/chatbotSwitcher"
import { UserNav } from "../dashboard/components/user-nav"
import { SidebarNav } from "./components/sidebar-nav"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings",
  },

  {
    title: "Notifications",
    href: "/settings/notification",
  },
  {
    title: "Billing",
    href: "/settings/billing",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-4 pb-12 md:block">
        <div className="flex flex-col gap-3 sticky w-full top-0 left-0">
          <div className="space-y-0.5 flex justify-between w-full">
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
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
