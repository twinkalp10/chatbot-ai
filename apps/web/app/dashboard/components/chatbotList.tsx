"use client"

import * as React from "react"
import Avatar from "boring-avatars"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import useSWR from "swr"

import { IChatbot } from "@/types/chatbot"
import { fetcher } from "@/lib/axios"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/useUser"
import { AvatarImage } from "@/components/ui/avatar"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { AddWebsiteModal } from "./add-website-modal"
import ChatbotsData from "./chatbotsData"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ChatbotSwitcherProps extends PopoverTriggerProps {}

export default function ChatbotSwitcher({ className }: ChatbotSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showAddWebsiteDialog, setShowAddWebsiteDialog] = React.useState(false)
  const [selectedChatbot, setSelectedChatbot] = React.useState("")

  const { loginStatus } = useUser()
  const { data, error, isLoading } = useSWR<IChatbot[]>(
    loginStatus === "login" && "/chatbot",
    fetcher
  )

  return (
    <Dialog open={showAddWebsiteDialog} onOpenChange={setShowAddWebsiteDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a chatbot"
            className={cn("w-[200px] justify-between", className)}
          >
            {data && data[0].name}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search chatbot..." />
              <CommandEmpty>No chatbot found.</CommandEmpty>
              <CommandGroup heading={`All Chatbots`}>
                {data?.map((chatbot, i) => (
                  <CommandItem
                    key={chatbot.id}
                    onSelect={() => {
                      setOpen(false)
                      setSelectedChatbot(chatbot.name)
                    }}
                    className="text-sm"
                  >
                    <Avatar size={25} name={`${chatbot.id}`} variant="marble" />
                    <span className="sr-only">{i}</span>{" "}
                    <span className="pl-1">{chatbot.name}</span>
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
      </Popover>
      <AddWebsiteModal onClose={() => setShowAddWebsiteDialog(false)} />
    </Dialog>
  )
}
