"use client"

import { ReactNode } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { File, Globe, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const ContentLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const param = useParams()
  return (
    <>
      <div className="flex items-start gap-6">
        <div className="px-4 py-2">
          <div className="space-y-1">
            {/* <Link href={`/dashboard/${param.chatbotId}/content/files`}>
              <Button
                variant={
                  pathname === `/dashboard/${param.chatbotId}/content/files`
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
                className="w-full justify-start"
              >
                <File className="mr-2 h-4 w-4" />
                Files
              </Button>
            </Link> */}
            <Link href={`/dashboard/${param.chatbotId}/content/text`}>
              <Button
                variant={
                  pathname === `/dashboard/${param.chatbotId}/content/text`
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
                className="w-full justify-start"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Text
              </Button>
            </Link>
            {/* <Link href={`/dashboard/${param.chatbotId}/content/website`}>
              <Button
                variant={
                  pathname === `/dashboard/${param.chatbotId}/content/website`
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
                className="w-full justify-start"
              >
                <Globe className="mr-2 h-4 w-4" />
                Website
              </Button>
            </Link> */}
          </div>
        </div>
        <Separator orientation="vertical" className="h-[calc(100vh)]" />
        <div>{children}</div>
      </div>
    </>
  )
}
export default ContentLayout
