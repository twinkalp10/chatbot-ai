import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Page = () => {
  return (
    <div className="max-w-2xl">
      <div className="flex flex-col items-start gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Add Website</h2>
          <p className="text-muted-foreground text-sm">Add Website URL.</p>
        </div>
        <div className="flex w-full max-w-2xl items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit" className="whitespace-nowrap">
            Fetch more links
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
