import React from "react"
import { useParams, useRouter } from "next/navigation"
import { chatbotTextDataSchema } from "@/schema/chatbotTextData"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2, Recycle, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { mutate } from "swr"

import { chatbotTextValues } from "@/types/chatbotText"
import { ApiError } from "@/types/error"
import axiosInstance from "@/lib/axios"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface ITextContentOperations {
  data: chatbotTextValues
}

const TextContentOperations = ({ data }: ITextContentOperations) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<chatbotTextValues>({
    resolver: yupResolver(chatbotTextDataSchema),
    defaultValues: {
      text: data.text,
      title: data.title,
      chatBotId: data.chatBotId,
      id: data.id,
    },
  })

  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [showEditAlert, setShowEditAlert] = React.useState<boolean>(false)
  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false)

  async function deleteText({
    chatBotId,
    id,
  }: {
    chatBotId: string
    id: string
  }) {
    setIsDeleteLoading(true)
    try {
      const response = await axiosInstance.delete(`/chatbot-data/text/${id}`, {
        data: {
          chatBotId,
        },
      })
      mutate("/chatbot-data/text", (oldData) =>
        oldData.filter((textData: chatbotTextValues) => textData.id !== id)
      )
      setIsDeleteLoading(false)
    } catch (error) {
      setIsDeleteLoading(false)
      const serverError = error as ApiError
    }
    return true
  }

  async function editChatbot(formData: chatbotTextValues) {
    setIsEditLoading(true)
    try {
      const response = await axiosInstance.put(
        `/chatbot-data/text/${data.id}`,
        { ...formData, chatBotId: params.chatbotId }
      )
      console.log(response.data.data)
      mutate("/chatbot-data/text", (oldData) =>
        oldData.map((chatbotData: chatbotTextValues) => {
          if (chatbotData.id === data.id) {
            return response.data.data
          } else {
            return chatbotData
          }
        })
      )
      setIsEditLoading(false)
      setShowEditAlert(false)
    } catch (error) {
      setIsEditLoading(false)
      const serverError = error as ApiError
    }
  }

  React.useEffect(() => {
    reset({
      text: data.text,
      title: data.title,
      chatBotId: data.chatBotId,
      id: data.id,
    })
  }, [data, reset])

  return (
    <div className="absolute right-1 top-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-more-vertical"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer items-center "
            onSelect={() => setShowEditAlert(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showEditAlert} onOpenChange={setShowEditAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              Change a Text title and content to edit chatbot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(editChatbot)}>
            <div className="grid gap-6">
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="title"
                    disabled={isEditLoading}
                    {...register("title")}
                  />
                  {errors.title?.message && (
                    <Label htmlFor="title" variant="error">
                      {errors.title.message.toString()}
                    </Label>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text">text</Label>
                  <Input
                    id="text"
                    placeholder="data..."
                    disabled={isEditLoading}
                    {...register("text")}
                  />
                  {errors.text?.message && (
                    <Label htmlFor="email" variant="error">
                      {errors.text.message.toString()}
                    </Label>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" className="whitespace-nowrap">
                {isEditLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Edit text content
              </Button>
            </DialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this text content?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteText({
                  chatBotId: data.chatBotId,
                  id: data.id,
                })

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Recycle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default TextContentOperations
