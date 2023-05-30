"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import { chatbotInterfaceSchema } from "@/schema/chatbotInterface"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { HexColorPicker } from "react-colorful"
import { useForm } from "react-hook-form"
import useSWR, { mutate } from "swr"

import { FormValues, FormValuesWithID } from "@/types/chatbotInterface"
import { ApiError } from "@/types/error"
import axiosInstance from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import ChatbotUI from "./chatbotUI"

const ChatbotInterfaceForm = ({ data }: any) => {
  const { register, handleSubmit, formState, watch, setValue } =
    useForm<FormValues>({
      defaultValues: data?.[0] || {},
      resolver: yupResolver(chatbotInterfaceSchema),
    })
  const [isLoading, setIsLoading] = React.useState(false)

  const { errors } = formState

  const params = useParams() as { chatbotId: string }

  const watchAllFields = watch()

  const onsubmit = async (formData: FormValues) => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.put(
        `/chatbot-settings/interface/${params.chatbotId}`,
        formData
      )
      console.log(response)
      mutate("/chatbot-settings/interface")
      setIsLoading(false)
      console.log("data submitted", formData)
    } catch (error) {
      setIsLoading(false)
      const serverError = error as ApiError
    }
  }

  return (
    <div className="grid w-full grid-cols-2">
      <form onSubmit={handleSubmit(onsubmit)} noValidate>
        <div className="flex flex-col gap-10 mt-8">
          <div className="grid w-full gap-2">
            <Label htmlFor="message">Initial messages</Label>
            <Textarea id="message" {...register("welcomeMessage")} />
            {errors.welcomeMessage?.message && (
              <Label variant="error">
                {errors.welcomeMessage.message.toString()}
              </Label>
            )}
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="message">Suggested Messages</Label>
            <Textarea id="message" {...register("suggestionMessage")} />
            {errors.suggestionMessage?.message && (
              <Label variant="error">
                {errors.suggestionMessage.message.toString()}
              </Label>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="display-name">Display Name</Label>
            <Input
              type="text"
              id="display-name"
              className="w-full"
              disabled={isLoading}
              {...register("displayName")}
            />
            {errors.displayName?.message && (
              <Label variant="error">
                {errors.displayName.message.toString()}
              </Label>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="chatBackgroundColor">Color Picker:</label>
                <HexColorPicker
                  color={watch("chatBackgroundColor", "")}
                  onChange={(newColor) =>
                    setValue("chatBackgroundColor", newColor)
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="color">Select Chatbot message Color:</label>
                <Input
                  type="text"
                  id="color"
                  disabled={isLoading}
                  {...register("chatBackgroundColor")}
                />
              </div>
            </div>
            {errors.chatBackgroundColor?.message && (
              <Label variant="error">
                {errors.chatBackgroundColor.message.toString()}
              </Label>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="colorPicker">Color Picker:</label>
                <HexColorPicker
                  color={watch("chatBotColorMessage", "")}
                  onChange={(newColor) =>
                    setValue("chatBotColorMessage", newColor)
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="color">Select Chatbot message Color:</label>
                <Input
                  type="text"
                  id="color"
                  disabled={isLoading}
                  {...register("chatBotColorMessage")}
                />
              </div>
            </div>
            {errors.chatBotColorMessage?.message && (
              <Label variant="error">
                {errors.chatBotColorMessage.message.toString()}
              </Label>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="chatBubbleColor">Color Picker:</label>
                <HexColorPicker
                  color={watch("chatBubbleColor", "")}
                  onChange={(newColor) => setValue("chatBubbleColor", newColor)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="color">Select Chatbot bubble Color:</label>
                <Input
                  type="text"
                  id="color"
                  disabled={isLoading}
                  {...register("chatBubbleColor")}
                />
              </div>
            </div>
            {errors.chatBubbleColor?.message && (
              <Label variant="error">
                {errors.chatBubbleColor.message.toString()}
              </Label>
            )}
          </div>
          <div>
            <Label htmlFor="chatBubbleAlignment">
              Align chat bubble button
            </Label>
            <Select disabled={isLoading} {...register("chatBubbleAlignment")}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Position</SelectLabel>
                  <SelectItem value="LEFT">Left</SelectItem>
                  <SelectItem value="RIGHT">Right</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.chatBubbleAlignment?.message && (
              <Label variant="error">
                {errors.chatBubbleAlignment.message.toString()}
              </Label>
            )}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
      <div className="justify-self-center">
        <ChatbotUI watchAllFields={watchAllFields} />
      </div>
    </div>
  )
}

export default ChatbotInterfaceForm
