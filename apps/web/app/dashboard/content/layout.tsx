"use client"

import { ReactNode } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { File, Globe, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}

const ContentLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <>
      <div className="flex items-start ">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Content source
          </h2>
          <div className="space-y-1">
            <Link href="/dashboard/content/files">
              <Button
                variant={
                  pathname === "/dashboard/content/files"
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
                className="w-full justify-start"
              >
                <File className="mr-2 h-4 w-4" />
                Files
              </Button>
            </Link>
            <Link href="/dashboard/content/text">
              <Button
                variant={
                  pathname === "/dashboard/content/text" ? "secondary" : "ghost"
                }
                size="sm"
                className="w-full justify-start"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Text
              </Button>
            </Link>
            <Link href="/dashboard/content/website">
              <Button
                variant={
                  pathname === "/dashboard/content/website"
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
                className="w-full justify-start"
              >
                <Globe className="mr-2 h-4 w-4" />
                Website
              </Button>
            </Link>
          </div>
        </div>
        <Separator orientation="vertical" className="h-[calc(100vh-66px)]" />
        <div className="grow p-6">{children}</div>
      </div>
    </>
  )
}
export default ContentLayout
