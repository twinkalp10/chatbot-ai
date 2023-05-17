"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const examples: { name: string; href: string; label?: string }[] = [
  {
    name: "Overview",
    href: "/dashboard/overview",
  },
  {
    name: "Content",
    href: "/dashboard/content/files",
  },
  {
    name: "Chatbot",
    href: "/dashboard/chatbot",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

function MainNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname()

  return (
    <ScrollArea>
      <div className={cn("flex items-center", className)} {...props}>
        {examples.map((example) => (
          <Link
            href={example.href}
            key={example.href}
            className={cn(
              "flex items-center px-4",
              pathname === example.href
                ? "font-bold text-primary"
                : "font-medium text-muted-foreground"
            )}
          >
            {example.name}{" "}
            {example.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline">
                {example.label}
              </span>
            )}
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  )
}

export { MainNav }
