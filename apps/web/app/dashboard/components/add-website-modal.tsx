"use client"

import * as React from "react"
import { websiteSchema } from "@/schema/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

import { IWebsite, WebsiteValues } from "@/types/auth"
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

interface UserAuthFormProps {
  onClose: () => void
}

export function AddWebsiteModal({ onClose }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WebsiteValues>({
    resolver: yupResolver(websiteSchema),
  })
  async function onSubmit(value: WebsiteValues) {
    setIsLoading(true)
    try {
      const res = await axiosInstance.post<IWebsite>("/v1/website/", value)
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
        <DialogTitle>Add Website</DialogTitle>
        <DialogDescription>
          Add a website with name and website URL.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn("grid gap-6")}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Website Name</Label>
              <Input
                id="name"
                placeholder="Acme Inc."
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                {...register("name")}
              />
              {errors.name?.message && (
                <Label htmlFor="email" variant="error">
                  {errors.name.message.toString()}
                </Label>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Website URL</Label>
              <Input
                id="url"
                placeholder="Acme.xyz"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
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
