"use client"

import React, { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useSWR from "swr"

import { ChatbotInterface } from "@/types/chatbotInterface"
import { fetcher } from "@/lib/axios"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const ChatbotInterfaceForm = () => {
  const { register, setValue } = useForm()
  const {
    data: defaultValues,
    error,
    isLoading,
  } = useSWR<ChatbotInterface>("/chatbot-settings", fetcher)

  console.log(defaultValues)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userSelectedColor, setUserSelectedColor] = useState("#F9FAFB")
  const [chatbotSelectedColor, setChatbotSelectedColor] = useState("#000000")
  const [bubbleColor, setBubbleColor] = useState("#EA580C")

  const handleSelectFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file || null)
  }

  const handleUserColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userColor = event.target.value
    setUserSelectedColor(userColor)
  }

  const handleChatbotColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const chatbotColor = event.target.value
    setChatbotSelectedColor(chatbotColor)
  }

  const bubbleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const bubbleColor = event.target.value
    setBubbleColor(bubbleColor)
  }

  return (
    <div>
      <form>
        <div className="flex justify-end">
          <Button>Reset</Button>
        </div>
        <div className="flex flex-col gap-10">
          <div className="grid w-full gap-2">
            <Label htmlFor="message">Initial messages</Label>
            <Textarea
              placeholder="Type your message here."
              id="message"
              value={defaultValues?.welcomeMessage}
              {...register("welcomeMessage")}
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="message">Suggested Messages</Label>
            <Textarea
              placeholder="Type your message here."
              id="message"
              {...register("suggestionMessage")}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="dark-mode" />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="message">Update chatbot profile picture</Label>
            <Input
              type="file"
              placeholder="select file"
              accept="image/*"
              onChange={handleSelectFileChange}
            />
            {selectedFile && <p>selected file: {selectedFile.name} </p>}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="display-name">Display Name</Label>
            <Input
              type="text"
              id="display-name"
              placeholder=""
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="message">Select user message color</Label>
            <Input
              type="color"
              placeholder="select color"
              value={userSelectedColor}
              onChange={handleUserColorChange}
            />
            {userSelectedColor && (
              <p>User message color: {userSelectedColor} </p>
            )}
          </div>
          <div>
            <Label htmlFor="message">Select chatbot message color</Label>
            <Input
              type="color"
              placeholder="select color"
              value={chatbotSelectedColor}
              onChange={handleChatbotColorChange}
            />
            {chatbotSelectedColor && (
              <p>Chatbot message color: {chatbotSelectedColor} </p>
            )}
          </div>
          <div>
            <Label htmlFor="message">Select chatbot bubble color</Label>
            <Input
              type="color"
              placeholder="select color"
              value={bubbleColor}
              onChange={bubbleColorChange}
            />
            {bubbleColor && <p>Chatbot bubble color: {bubbleColor} </p>}
          </div>
          <div>
            <Label htmlFor="message">Align chat bubble button</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="right" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Position</SelectLabel>
                  <SelectItem value="apple">Left</SelectItem>
                  <SelectItem value="banana">Right</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChatbotInterfaceForm
