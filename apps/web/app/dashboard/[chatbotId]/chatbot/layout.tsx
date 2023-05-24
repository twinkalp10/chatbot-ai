"use client"

import { ReactNode } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { File, Globe, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const ContentLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <>
      <div className="flex justify-start">
        <div className="grow p-6">Hello</div>
        <Separator orientation="vertical" className="h-[calc(100vh-66px)]" />
        <div className="grow p-6 flex justify-center">{children}</div>
      </div>
    </>
  )
}
export default ContentLayout
