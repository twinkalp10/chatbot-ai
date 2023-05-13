import { ReactNode } from "react"
import { Metadata } from "next"
import Image from "next/image"
import { Activity, CreditCard, DollarSign, Download, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { MainNav } from "./components/main-nav"
import TeamSwitcher from "./components/team-switcher"
import { UserNav } from "./components/user-nav"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-2" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  )
}
export default DashboardLayout
