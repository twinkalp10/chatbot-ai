"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { chatbotSchema } from "@/schema/chatbot"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2, Recycle, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { mutate } from "swr"

import { ChatbotValues, IChatbot } from "@/types/chatbot"
import { ApiError } from "@/types/error"
import axiosInstance from "@/lib/axios"
import { cn } from "@/lib/utils"
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

import { IChatbotCard } from "./chatbotCard"

interface IChatbotOperations extends IChatbotCard {}

export function ChatbotOperations({ chatbot }: IChatbotOperations) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatbotValues>({
    resolver: yupResolver(chatbotSchema),
    defaultValues: {
      name: chatbot.name,
      url: chatbot.url,
    },
  })
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [showEditAlert, setShowEditAlert] = React.useState<boolean>(false)
  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false)

  async function deleteChatbot(chatbotId: string) {
    try {
      const response = await axiosInstance.delete<{ data: IChatbot }>(
        `/chatbot/${chatbotId}`
      )
      mutate("/chatbot", (oldData) => [...oldData, response.data.data])
      console.log(response.data, "deleted chatbot is: ", chatbotId)
    } catch (error) {
      const serverError = error as ApiError
    }
    return true
  }

  async function editChatbot(formData: ChatbotValues) {
    setIsEditLoading(true)
    try {
      const response = await axiosInstance.put<{ data: IChatbot }>(
        `/chatbot/${chatbot.id}`,
        formData
      )
      mutate("/chatbot", (oldData) => [...oldData, response.data.data])
      setIsEditLoading(false)
      setShowEditAlert(false)
      router.refresh()
    } catch (error) {
      const serverError = error as ApiError
    }
  }

  return (
    <div className="absolute right-0">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md  transition-colors hover:bg-muted">
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
              Change a website name and URL to edit chatbot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(editChatbot)}>
            <div className={cn("grid gap-6")}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Website Name</Label>
                  <Input
                    id="name"
                    placeholder="Chatbot AI"
                    disabled={isEditLoading}
                    {...register("name")}
                  />
                  {errors.name?.message && (
                    <Label htmlFor="name" variant="error">
                      {errors.name.message.toString()}
                    </Label>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="url"
                    placeholder="https://chatbot-ai.com"
                    disabled={isEditLoading}
                    {...register("url")}
                  />
                  {errors.url?.message && (
                    <Label htmlFor="email" variant="error">
                      {errors.url.message.toString()}
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
                Add new chatbot
              </Button>
            </DialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this chatbot?
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

                const deleted = await deleteChatbot(chatbot.id)

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
