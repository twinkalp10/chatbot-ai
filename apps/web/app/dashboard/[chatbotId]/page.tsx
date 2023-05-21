import React from "react"

export function getStaticParams() {}

const Chatbot = ({ params }: any) => {
  const { chatbotId } = params
  return <div>{chatbotId}</div>
}

export default Chatbot
