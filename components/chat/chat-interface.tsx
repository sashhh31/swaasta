"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Smile, Paperclip, Send, Image, FileText, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatMessage {
  id: string
  content: string
  sender: "user" | "recipient"
  timestamp: Date
  attachment?: {
    type: "image" | "document"
    url: string
    name: string
  }
}

interface ChatInterfaceProps {
  recipient: {
    id: string
    name: string
    avatar?: string
    role: string
    status?: "online" | "offline" | "away"
    lastSeen?: Date
  }
}

export function ChatInterface({ recipient }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "recipient",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      id: "2",
      content: "I have a question about my recent prescription.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    },
    {
      id: "3",
      content: "Sure, I can help with that. What's your question?",
      sender: "recipient",
      timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    },
    {
      id: "4",
      content: "Here's the prescription I received last week. I'm confused about the dosage instructions.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      attachment: {
        type: "document",
        url: "/placeholder.pdf",
        name: "Prescription_2023.pdf"
      }
    },
  ])
  
  const [newMessage, setNewMessage] = useState("")
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])
  
  const handleSendMessage = () => {
    if ((!newMessage.trim() && !fileToUpload) || messages.length >= 100) return
    
    const attachment = fileToUpload ? {
      type: fileToUpload.type.startsWith("image/") ? "image" : "document" as "image" | "document",
      url: URL.createObjectURL(fileToUpload),
      name: fileToUpload.name
    } : undefined
    
    const newMessageObj: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: newMessage.trim(),
      sender: "user",
      timestamp: new Date(),
      attachment
    }
    
    setMessages([...messages, newMessageObj])
    setNewMessage("")
    setFileToUpload(null)
    
    // Simulate response after a delay
    if (messages.length < 20) {
      setTimeout(() => {
        const responseMessage: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          content: "Thank you for your message. I'll check this and get back to you shortly.",
          sender: "recipient",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, responseMessage])
      }, 2000)
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }
  
  const getDateString = (date: Date) => {
    if (isToday(date)) {
      return "Today"
    }
    
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday"
    }
    
    return date.toLocaleDateString()
  }
  
  const renderAttachment = (attachment: NonNullable<ChatMessage["attachment"]>) => {
    if (attachment.type === "image") {
      return (
        <div className="mt-2 rounded-md overflow-hidden max-w-[240px]">
          <img src={attachment.url} alt={attachment.name} className="object-cover w-full h-full" />
        </div>
      )
    } else {
      return (
        <div className="mt-2 flex items-center p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          <div className="text-sm truncate">{attachment.name}</div>
        </div>
      )
    }
  }
  
  return (
    <div className="flex flex-col h-[600px] border rounded-md bg-white dark:bg-gray-950 shadow-sm">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={recipient.avatar} alt={recipient.name} />
            <AvatarFallback>
              {recipient.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{recipient.name}</div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <div 
                className={cn(
                  "w-2 h-2 rounded-full mr-1", 
                  recipient.status === "online" 
                    ? "bg-green-500" 
                    : recipient.status === "away" 
                      ? "bg-yellow-500" 
                      : "bg-gray-500"
                )}
              />
              <span>
                {recipient.status === "online" 
                  ? "Online" 
                  : recipient.lastSeen 
                    ? `Last seen ${formatTime(recipient.lastSeen)}` 
                    : "Offline"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            {recipient.role}
          </span>
        </div>
      </div>
      
      {/* Chat messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const prevMessage = index > 0 ? messages[index - 1] : null
            const showDate = !prevMessage || 
              getDateString(message.timestamp) !== getDateString(prevMessage.timestamp)
            
            return (
              <div key={message.id}>
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded-full">
                      {getDateString(message.timestamp)}
                    </span>
                  </div>
                )}
                <div
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "recipient" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={recipient.avatar} alt={recipient.name} />
                      <AvatarFallback>
                        {recipient.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%]", 
                      message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                      "rounded-lg p-3"
                    )}
                  >
                    {message.content && <p>{message.content}</p>}
                    {message.attachment && renderAttachment(message.attachment)}
                    <div 
                      className={cn(
                        "text-xs mt-1", 
                        message.sender === "user" 
                          ? "text-primary-foreground/70" 
                          : "text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
      
      {/* Upload preview */}
      {fileToUpload && (
        <div className="px-4 py-2 border-t">
          <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center">
              {fileToUpload.type.startsWith("image/") ? (
                <Image className="h-5 w-5 mr-2 text-blue-500" />
              ) : (
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
              )}
              <div className="text-sm truncate max-w-[300px]">{fileToUpload.name}</div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={() => setFileToUpload(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Message input */}
      <div className="p-4 border-t flex items-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full mr-2" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5 text-gray-500" />
                <input 
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setFileToUpload(file)
                    e.target.value = ""
                  }}
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Attach file</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full mr-2">
                <Smile className="h-5 w-5 text-gray-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex-1 relative">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full ml-2"
          onClick={handleSendMessage}
          disabled={!newMessage.trim() && !fileToUpload}
        >
          <Send className="h-5 w-5 text-primary" />
        </Button>
      </div>
    </div>
  )
} 