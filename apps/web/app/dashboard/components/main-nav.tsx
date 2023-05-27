"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const examples: { name: string; href: string; label?: string }[] = [
  {
    name: "Chatbot",
    href: "/chatbot",
  },
  {
    name: "Content",
    href: "/content/text",
  },
  {
    name: "Embeddings",
    href: "/embeddings",
  },
  {
    name: "Settings",
    href: "/settings",
  },
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

function MainNav({ className, ...props }: ExamplesNavProps) {
  const params = useParams()
  const pathname = usePathname()
  return (
    <ScrollArea>
      <div className={cn("flex items-center", className)} {...props}>
        {examples.map((example) => {
          const href = `/dashboard/${params.chatbotId}${example.href}`
          return (
            <Link
              href={href}
              key={href}
              className={cn(
                "flex items-center px-4",
                pathname === href
                  ? "text-primary font-bold"
                  : "text-muted-foreground font-medium"
              )}
            >
              {example.name}{" "}
            </Link>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  )
}

export { MainNav }
