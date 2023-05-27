"use client"

import React from "react"
import { useParams } from "next/navigation"
import { chatbotTextDataSchema } from "@/schema/chatbotTextData"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { mutate } from "swr"

import { chatbotTextValues } from "@/types/chatbotText"
import { ApiError } from "@/types/error"
import axiosInstance from "@/lib/axios"
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
import { Textarea } from "@/components/ui/textarea"

type TextContentModalProps = {
  onClose: () => void
}

const AddTextContentModal = ({ onClose }: TextContentModalProps) => {
  const param = useParams()
  const [isLoading, setIsLoading] = React.useState(false)
  const { register, handleSubmit, formState } = useForm<chatbotTextValues>({
    resolver: yupResolver(chatbotTextDataSchema),
  })

  const { errors } = formState

  const onSubmit = async (textData: chatbotTextValues) => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.post("/chatbot-data/text", {
        ...textData,
        chatBotId: param.chatbotId,
      })
      console.log(response)
      console.log("form submitted", textData)
      setIsLoading(false)
      mutate("/chatbot-data/text")
    } catch (error) {
      const serverError = error as ApiError
      setIsLoading(false)
    }
  }

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Chatbot</DialogTitle>
          <DialogDescription>
            Add a website name and URL to create chatbot.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full gap-5">
            <Input
              type="text"
              placeholder="chatbot name"
              {...register("title")}
              disabled={isLoading}
            />
            {errors.title?.message && (
              <Label variant="error">{errors.title.message.toString()}</Label>
            )}
            <Textarea
              placeholder="provide data here..."
              className="min-h-[400px]"
              {...register("text")}
              disabled={isLoading}
            />
            {errors.text?.message && (
              <Label variant="error">{errors.text.message.toString()}</Label>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="whitespace-nowrap">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Retrain chatbot
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </div>
  )
}

export default AddTextContentModal
