import React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"

import { AddWebsiteModal } from "./addChatbotModal"

const AddChatbotButton = () => {
  const [showAddWebsiteDialog, setShowAddWebsiteDialog] = React.useState(false)

  return (
    <div>
      <Dialog
        open={showAddWebsiteDialog}
        onOpenChange={setShowAddWebsiteDialog}
      >
        <Button
          type="button"
          className="whitespace-nowrap"
          onClick={() => setShowAddWebsiteDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add chatbot
        </Button>
        <AddWebsiteModal onClose={() => setShowAddWebsiteDialog(false)} />
      </Dialog>
    </div>
  )
}

export default AddChatbotButton
