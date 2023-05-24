"use client"

import React from "react"
import { useParams } from "next/navigation"

const Page = () => {
  const params = useParams() as { chatbotId: string }
  return (
    <div className="flex max-w-3xl rounded-xl p-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Embed on website</h2>
        <p className="text-muted-foreground pb-3">
          To add the chatbot any where on your website, add this iframe to your
          html code
        </p>
        <div className="bg-muted text-muted-foreground max-w-2xl overflow-y-auto rounded-xl py-2 pl-6 font-medium">
          <p>{`<iframe`}</p>
          <p>
            {`src="https://chatbot-ai.xyz/chatbot-iframe/${params.chatbotId}"`}
          </p>
          <p>{`width="100%"`}</p>
          <p>{`height="700"`}</p>
          <p>{`frameborder="0"`}</p>
          <p>{`></iframe>`}</p>
        </div>
        <p className="text-muted-foreground pb-3 pt-8">
          To add a chat bubble to the bottom right of your website add this
          script tag to your html
        </p>
        <div className="bg-muted text-muted-foreground max-w-2xl overflow-y-auto rounded-xl py-2 pl-6 font-medium">
          <p>{`<script>`}</p>
          <p>{`window.chatbaseConfig = {`}</p>
          <p>{`chatbotId: "${params.chatbotId}",`}</p>
          <p>{`}`}</p>
          <p>{`</script>`}</p>
          <p>{`<script`}</p>
          <p>{`src="https://www.chatbase.co/embed.min.js"`}</p>
          <p>{`id="${params.chatbotId}"`}</p>
          <p>{`defer>`}</p>
          <p>{`</script>`}</p>
        </div>
      </div>
    </div>
  )
}

export default Page
