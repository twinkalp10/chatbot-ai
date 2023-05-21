"use client"

import * as React from "react"
import { websiteSchema } from "@/schema/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

import { ChatbotValues, IChatbot } from "@/types/chatbot"
import { ApiError } from "@/types/error"
import axiosInstance from "@/lib/axios"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WebsiteModalProps {
  onClose: () => void
}

export function AddWebsiteModal({ onClose }: WebsiteModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatbotValues>({
    resolver: yupResolver(websiteSchema),
  })
  async function onSubmit(value: ChatbotValues) {
    setIsLoading(true)
    try {
      const res = await axiosInstance.post<IChatbot>("/v1/chatbot/", value)
      console.log(res)
      onClose()
      setIsLoading(false)
    } catch (error) {
      const serverError = error as ApiError
      setIsLoading(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Chatbot</DialogTitle>
        <DialogDescription>
          Add a website name and URL to create chatbot.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn("grid gap-6")}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Website Name</Label>
              <Input
                id="name"
                placeholder="Chatbot AI"
                disabled={isLoading}
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
                id="website"
                placeholder="https://chatbot-ai.com"
                disabled={isLoading}
                {...register("website")}
              />
              {errors.website?.message && (
                <Label htmlFor="email" variant="error">
                  {errors.website.message.toString()}
                </Label>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="whitespace-nowrap">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add new chatbot
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
