import React from "react"
import Link from "next/link"
import { File, Globe, Pencil, Plus, Podcast } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const Page = () => {
  return (
    <>Coming soon...</>
    // <div className="min-w-full border border-dashed">
    //   <div className="flex h-[450px] min-w-full items-center justify-center rounded-md ">
    //     <div className="mx-auto flex flex-col items-center justify-center text-center">
    //       <Podcast className="h-10 w-10 text-muted-foreground" />
    //       <h3 className="mt-4 text-lg font-semibold">No files added</h3>
    //       <p className="mb-4 mt-2 text-sm text-muted-foreground">
    //         You have not added any files. Add one below.
    //       </p>
    //       <Dialog>
    //         <DialogTrigger>
    //           <Button size="sm" className="relative">
    //             <Plus className="mr-2 h-4 w-4" />
    //             Add File
    //           </Button>
    //         </DialogTrigger>
    //         <DialogContent>
    //           <DialogHeader>
    //             <DialogTitle>Add File</DialogTitle>
    //             <DialogDescription>
    //               Copy and paste the podcast feed URL to import.
    //             </DialogDescription>
    //           </DialogHeader>
    //           <div className="grid gap-4 py-4">
    //             <div className="grid gap-2">
    //               <Label htmlFor="url">Podcast URL</Label>
    //               <Input id="url" placeholder="https://example.com/feed.xml" />
    //             </div>
    //           </div>
    //           <DialogFooter>
    //             <Button>Import File</Button>
    //           </DialogFooter>
    //         </DialogContent>
    //       </Dialog>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Page
