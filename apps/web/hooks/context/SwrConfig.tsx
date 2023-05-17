"use client"

import React, { ReactNode } from "react"
import { SWRConfig } from "swr"

export function SWRConfigHOC({ children }: { children: ReactNode }) {
  return <SWRConfig>{children}</SWRConfig>
}
