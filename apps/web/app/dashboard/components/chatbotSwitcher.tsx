"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Avatar from "boring-avatars"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import useSWR from "swr"

import { IChatbot } from "@/types/chatbot"
import { fetcher } from "@/lib/axios"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { AddWebsiteModal } from "./addChatbotModal"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ChatbotSwitcherProps extends PopoverTriggerProps {}

export default function ChatbotSwitcher({ className }: ChatbotSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showAddWebsiteDialog, setShowAddWebsiteDialog] = React.useState(false)

  const { loginStatus } = useUser()
  const { data, error, isLoading } = useSWR<IChatbot[]>(
    loginStatus === "login" && "/chatbot",
    fetcher
  )
  const router = useRouter()

  const pathname = useParams() as { chatbotId?: string }

  const selectedChatbot = data?.find((chatbot) => {
    return chatbot.id === pathname?.chatbotId
  })

  return (
    <Dialog open={showAddWebsiteDialog} onOpenChange={setShowAddWebsiteDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        {selectedChatbot ? (
          <>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a chatbot"
                className={cn("w-[200px] justify-between", className)}
              >
                <Avatar
                  size={25}
                  name={selectedChatbot.name}
                  variant="marble"
                />
                <span className="pl-1"> {selectedChatbot.name}</span>
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList
                  className="overflow-y-auto scrollbar-hide"
                  style={{ maxHeight: "100vh" }}
                >
                  <CommandInput placeholder="Search chatbot..." />
                  <CommandEmpty>No chatbot found.</CommandEmpty>
                  <CommandGroup heading={`All Chatbots`}>
                    {data?.map((chatbot, i) => (
                      <CommandItem
                        key={chatbot.id}
                        onSelect={() => {
                          setOpen(false)
                          router.push(`/dashboard/${chatbot.id}`)
                        }}
                        className="text-sm"
                      >
                        <Avatar
                          size={25}
                          name={`${chatbot.id}`}
                          variant="marble"
                        />
                        <span className="sr-only">{i}</span>{" "}
                        <span className="pl-1">{chatbot.name}</span>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedChatbot.id === chatbot.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <DialogTrigger asChild>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false)
                          setShowAddWebsiteDialog(true)
                        }}
                      >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add Chatbot
                      </CommandItem>
                    </DialogTrigger>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </>
        ) : (
          <>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a chatbot"
                className={cn("w-[200px] justify-between", className)}
              >
                <Avatar size={25} name="No chatbot selected" variant="marble" />
                <span className="pl-1"></span>
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList
                  className="overflow-y-auto scrollbar-hide"
                  style={{ maxHeight: "100vh" }}
                >
                  <CommandInput placeholder="Search chatbot..." />
                  <CommandEmpty>No chatbot found.</CommandEmpty>
                  <CommandGroup heading={`All Chatbots`}></CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <DialogTrigger asChild>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false)
                          setShowAddWebsiteDialog(true)
                        }}
                      >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add Chatbot
                      </CommandItem>
                    </DialogTrigger>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </>
        )}
      </Popover>

      <AddWebsiteModal onClose={() => setShowAddWebsiteDialog(false)} />
    </Dialog>
  )
}
