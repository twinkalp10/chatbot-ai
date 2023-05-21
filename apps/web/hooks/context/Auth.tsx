"use client"

import React, { ReactNode, useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import { Loader } from "lucide-react"

import useUser from "../useUser"

export function AuthWrapper({ children }: { children: ReactNode }) {
  const { loginStatus, fetchUser } = useUser()
  const params = usePathname()

  useEffect(() => void fetchUser(), [fetchUser])

  if (params === "/") {
    return <>{children}</>
  }

  if (loginStatus === "logout") {
    if (params.includes("/auth")) {
      return <>{children}</>
    } else {
      redirect("/auth/login")
    }
  }
  if (loginStatus === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    )
  }
  if (loginStatus === "login") {
    if (params.includes("/auth")) {
      redirect("/dashboard")
    } else {
      return <>{children}</>
    }
  }
  return <></>
}
