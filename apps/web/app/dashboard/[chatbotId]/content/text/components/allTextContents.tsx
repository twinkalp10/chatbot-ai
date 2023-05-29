import React from "react"
import useSWR from "swr"

import { chatbotTextValues } from "@/types/chatbotText"
import { fetcher } from "@/lib/axios"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import LoadingChatbotsData from "@/app/dashboard/components/loadingChatbotsData"

import TextContentOperations from "./textContentOperations"

export interface IAllTextContents {
  data: chatbotTextValues[] | undefined
}

const AllTextContents = () => {
  const { data, error, isLoading } = useSWR("/chatbot-data/text", fetcher)
  const dummyArray = Array.from({ length: 12 })
  if (error) {
    return <div>Error fetching data...</div>
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {dummyArray.map(() => (
          <LoadingChatbotsData />
        ))}
      </div>
    )
  }

  return <TextList data={data} />
}

export default AllTextContents

export const TextList = ({ data }: IAllTextContents) => {
  return (
    <div className="flex flex-col gap-3">
      {data?.map((item, index) => (
        <div>
          <Card className="hover:border-white cursor-pointer relative">
            <TextContentOperations data={item} />
            <CardHeader className="flex flex-col items-start justify-between space-y-0">
              <div key={index}>
                <CardTitle className="text-2xl font-bold ">
                  {item.title}{" "}
                </CardTitle>
                <p className="text-sm font-normal text-slate-400">
                  {item.text}{" "}
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  )
}