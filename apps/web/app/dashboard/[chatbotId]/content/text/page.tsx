"use client"

import React from "react"

import AddTextContentButton from "./components/addTextContentButton"

const Page = () => {
  return (
    <div className="grid gap-2">
      <div>
        <AddTextContentButton />
      </div>
      <div>List</div>
    </div>
  )
}

export default Page
