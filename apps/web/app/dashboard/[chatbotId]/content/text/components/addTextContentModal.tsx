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
import { toast } from "@/components/ui/use-toast"

type TextContentModalProps = {
  onClose: () => void
}

const AddTextContentModal = ({ onClose }: TextContentModalProps) => {
  const param = useParams()
  const [isLoading, setIsLoading] = React.useState(false)
  const { register, handleSubmit, formState, reset } =
    useForm<chatbotTextValues>({
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
      if (response.data.success) {
        console.log("form submitted", textData)
        setIsLoading(false)
        mutate("/chatbot-data/text", (oldData) => [...oldData, response.data])
        onClose()
        reset()
      } else {
        toast({
          title: "Unable to add Text",
        })
      }
    } catch (error) {
      const serverError = error as ApiError
      setIsLoading(false)
    }
  }

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Text</DialogTitle>
          <DialogDescription>
            Please add some description related to the title
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full gap-5">
            <Input
              type="text"
              placeholder="title"
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
                Add Text
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </div>
  )
}

export default AddTextContentModal
