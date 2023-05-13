import { ReactNode } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { File, Globe, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}

const OverviewLayout = ({ children }: { children: ReactNode }) => {
  return <div className="p-4">{children}</div>
}
export default OverviewLayout
