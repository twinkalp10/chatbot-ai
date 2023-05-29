import React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"

import AddTextContentModal from "./addTextContentModal"

const AddTextContentButton = () => {
  const [showAddTextContentDialog, setShowAddTextContentDialog] =
    React.useState(false)

  return (
    <div>
      <Dialog
        open={showAddTextContentDialog}
        onOpenChange={setShowAddTextContentDialog}
      >
        <Button
          type="button"
          className="whitespace-nowrap"
          onClick={() => setShowAddTextContentDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add chatbot
        </Button>
        <AddTextContentModal
          onClose={() => setShowAddTextContentDialog(false)}
        />
      </Dialog>
    </div>
  )
}

export default AddTextContentButton
