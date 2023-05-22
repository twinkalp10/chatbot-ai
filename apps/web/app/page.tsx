"use client"

import { useState } from "react"
import Link from "next/link"
import { faqData } from "@/content/faq"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

import { SiteFooter } from "./component/footer"

let tabs = [
  { path: "/how-it-works", label: "How it works" },
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
]

export default function IndexPage() {
  let [activeTab, setActiveTab] = useState(tabs[0].path)

  return (
    <div className="">
      <nav className="m-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex">
          <Link href="/" className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />

            <p className="font-bold leading-tight tracking-tighter">
              Chatbot AI
            </p>
          </Link>
        </div>
        <div className="flex space-x-1 rounded-full border px-3 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => setActiveTab(tab.path)}
              className={`${
                activeTab === tab.path ? "" : "hover:text-white/60"
              } text-primary relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.path && (
                <motion.span
                  layoutId="bubble"
                  className="bg-primary absolute inset-0 z-10 mix-blend-difference"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
        <div>
          <Button variant="link">
            Login <ArrowRight className="h-3 w-5" />
          </Button>
          <Button>Signup</Button>
        </div>
      </nav>
      <section className="container m-auto grid max-w-7xl items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex flex-col items-center gap-2">
          <h1 className="w-full text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Welcome to Chatbot AI
            <br />
            Your Intelligent Website Assistant
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-center text-lg sm:text-xl">
            Introducing ChatbotAI, the next generation chatbot feature designed
            to revolutionize the way visitors interact with your website. With
            ChatbotAI, you can provide instant and personalized responses to
            user queries, utilizing the power of the ChatGPT API to deliver
            intelligent and contextually relevant information about your
            website.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="m-auto w-full max-w-3xl"
        >
          {faqData.map(({ question, answer, id }) => (
            <AccordionItem value={`item-${id}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <SiteFooter className="border-t" />
    </div>
  )
}
