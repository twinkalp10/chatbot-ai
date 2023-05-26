"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import { chatbotInterfaceSchema } from "@/schema/chatbotInterface"
import { yupResolver } from "@hookform/resolvers/yup"
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
  const { register, handleSubmit, formState, watch } = useForm<FormValues>({
    defaultValues: data?.[0] || {},
    resolver: yupResolver(chatbotInterfaceSchema),
  })

  const { errors } = formState

  const params = useParams() as { chatbotId: string }

  const onsubmit = async (formData: FormValues) => {
    try {
      const response = await axiosInstance.put(
        `/chatbot-settings/interface/${params.chatbotId}`,
        formData
      )
      mutate("/chatbot-settings/interface")
      console.log("data submitted", formData)
    } catch (error) {
      const serverError = error as ApiError
    }
  }

  const watchAllFields = watch()

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
              {...register("displayName")}
            />
            {errors.displayName?.message && (
              <Label variant="error">
                {errors.displayName.message.toString()}
              </Label>
            )}
          </div>
          <div>
            <Label htmlFor="chatBackgroundColor">
              Select chatbot background color
            </Label>
            <Input
              type="color"
              id="chatBackgroundColor"
              {...register("chatBackgroundColor")}
            />

            <p>Chatbot background color: {} </p>
            {errors.chatBackgroundColor?.message && (
              <Label variant="error">
                {errors.chatBackgroundColor.message.toString()}
              </Label>
            )}
          </div>
          <div>
            <Label htmlFor="userColorMessage">Select user message color</Label>
            <Input
              type="color"
              id="userColorMessage"
              {...register("userColorMessage")}
            />

            <p>User message color: {} </p>
            {errors.userColorMessage?.message && (
              <Label variant="error">
                {errors.userColorMessage.message.toString()}
              </Label>
            )}
          </div>
          <div>
            <Label htmlFor="chatBotColorMessage">
              Select chatbot message color
            </Label>
            <Input
              type="color"
              id="chatBotColorMessage"
              {...register("chatBotColorMessage")}
            />

            <p>Chatbot message color: {} </p>
            {errors.chatBotColorMessage?.message && (
              <Label variant="error">
                {errors.chatBotColorMessage.message.toString()}
              </Label>
            )}
          </div>
          <div>
            <Label htmlFor="chatBubbleColor">Select chatbot bubble color</Label>
            <Input
              type="color"
              id="chatBubbleColor"
              {...register("chatBubbleColor")}
            />
            <p>Chatbot bubble color: {} </p>
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
            <Select {...register("chatBubbleAlignment")}>
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
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
      <div className="justify-self-center">
        <ChatbotUI watchAllFields={watchAllFields} />
      </div>
    </div>
  )
}

export default ChatbotInterfaceForm
