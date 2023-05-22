"use client"

import * as React from "react"
import Router from "next/router"
import { signUpSchema } from "@/schema/auth"
import { setAuthToken } from "@/utils/authToken"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

import { SignupFormValues } from "@/types/auth"
import { ApiError } from "@/types/error"
import axiosInstance from "@/lib/axios"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { fetchUser } = useUser()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signUpSchema),
  })
  async function onSubmit(value: SignupFormValues) {
    setIsLoading(true)
    try {
      const res = await axiosInstance.post<{ token: string; success: boolean }>(
        "/auth/signup",
        value
      )
      const { token } = res.data
      setAuthToken(token)
      fetchUser()
      toast({
        title: "Signed Up successfully!",
      })
      Router.push("/dashboard")
      setIsLoading(false)
    } catch (error) {
      const serverError = error as ApiError
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email?.message && (
              <Label htmlFor="email" variant="error">
                {errors.email.message.toString()}
              </Label>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Password</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password?.message && (
              <Label htmlFor="email" variant="error">
                {errors.password.message.toString()}
              </Label>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="mt-2">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  )
}
