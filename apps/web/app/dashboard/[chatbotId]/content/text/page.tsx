"use client"

import React from "react"

import AddTextContentButton from "./components/addTextContentButton"
import AllTextContents from "./components/allTextContents"

const Page = () => {
  return (
    <div className="grid gap-6">
      <div className="justify-self-end">
        <AddTextContentButton />
      </div>
      <div>
        <AllTextContents />
      </div>
    </div>
  )
}

export default Page
