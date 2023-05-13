import React from "react"
import { File, Globe, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const page = () => {
  return (
    <div className="flex  items-start space-x-4">
      <div className="px-4 py-2">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
          Content source
        </h2>
        <div className="space-y-1">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start"
          >
            <File className="mr-2 h-4 w-4" />
            Files
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Pencil className="mr-2 h-4 w-4" />
            Text
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Globe className="mr-2 h-4 w-4" />
            Website
          </Button>
        </div>
      </div>
      <Separator orientation="vertical" className="h-screen" />
    </div>
  )
}

export default page
