"use client"

import { ReactNode } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, FileText, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const Links = [
  {
    path: "/dashboard/settings/bot-config",
    name: "Bot Config",
    icon: Bot,
  },
  {
    path: "/dashboard/settings/billing",
    name: "Billing",
    icon: FileText,
  },
  {
    path: "/dashboard/settings/profile",
    name: "Profile",
    icon: User,
  },
]

const ContentLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <>
      <div className="flex items-start ">
        <div className="px-4 py-2">
          <div className="space-y-1">
            {Links.map((link) => (
              <Link href={link.path}>
                <Button
                  variant={pathname === link.path ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <Separator orientation="vertical" className="h-[calc(100vh-66px)]" />
        <div className="grow p-6">{children}</div>
      </div>
    </>
  )
}
export default ContentLayout
