"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Search, 
  Calendar, 
  FileText, 
  Pill, 
  User, 
  Send, 
  Paperclip,
  Image,
  Clock,
  CheckCircle,
  Stethoscope
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedConversation, setSelectedConversation] = useState<string | null>("chat-1")
  const [newMessage, setNewMessage] = useState("")

  // Mock contact and message data
  const conversations = [
    {
      id: "chat-1",
      contact: {
        id: "dr-smith",
        name: "Dr. Sarah Smith",
        role: "Cardiologist",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      unread: 2,
      lastMessage: {
        content: "Your prescription for Lisinopril has been renewed. You can pick it up at your pharmacy tomorrow.",
        timestamp: "10:30 AM",
        isRead: false,
      },
    },
    {
      id: "chat-2",
      contact: {
        id: "medlab",
        name: "MedLab Services",
        role: "Laboratory",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
      },
      unread: 1,
      lastMessage: {
        content: "Your test results are ready. You can view them in your medical records.",
        timestamp: "Yesterday",
        isRead: false,
      },
    },
    {
      id: "chat-3",
      contact: {
        id: "dr-chen",
        name: "Dr. Michael Chen",
        role: "Neurologist",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
      },
      unread: 0,
      lastMessage: {
        content: "How are you feeling after the new medication? Any side effects?",
        timestamp: "May 1",
        isRead: true,
      },
    },
    {
      id: "chat-4",
      contact: {
        id: "pharmacy",
        name: "MedPharm Pharmacy",
        role: "Pharmacy",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      unread: 0,
      lastMessage: {
        content: "Your prescription is ready for pickup at your convenience.",
        timestamp: "Apr 28",
        isRead: true,
      },
    },
  ]

  // Mock message history for selected conversation
  const messageHistory = {
    "chat-1": [
      {
        id: "msg-1",
        content: "Hello John, I'm reviewing your recent lab results. Your blood pressure is still higher than we'd like.",
        sender: "contact",
        timestamp: "Yesterday, 2:30 PM",
      },
      {
        id: "msg-2",
        content: "Should I increase my medication dosage?",
        sender: "user",
        timestamp: "Yesterday, 2:45 PM",
      },
      {
        id: "msg-3",
        content: "Yes, I'd like to increase your Lisinopril to 20mg once daily. I've sent the new prescription to your pharmacy.",
        sender: "contact",
        timestamp: "Yesterday, 3:00 PM",
      },
      {
        id: "msg-4",
        content: "Thanks Dr. Smith. When should I come in for a follow-up?",
        sender: "user",
        timestamp: "Yesterday, 3:15 PM",
      },
      {
        id: "msg-5",
        content: "Let's schedule a follow-up in two weeks. We'll check your blood pressure again and see how you're doing on the new dosage.",
        sender: "contact",
        timestamp: "10:30 AM",
      },
      {
        id: "msg-6",
        content: "Your prescription for Lisinopril has been renewed. You can pick it up at your pharmacy tomorrow.",
        sender: "contact",
        timestamp: "10:35 AM",
      },
    ],
    "chat-2": [
      {
        id: "msg-1",
        content: "Your blood work has been processed and the results are now available.",
        sender: "contact",
        timestamp: "Yesterday, 9:00 AM",
      },
      {
        id: "msg-2",
        content: "Your test results are ready. You can view them in your medical records.",
        sender: "contact",
        timestamp: "Yesterday, 9:05 AM",
      },
    ],
    "chat-3": [
      {
        id: "msg-1",
        content: "I've prescribed a new medication to help with your migraines. Please start with one tablet daily.",
        sender: "contact",
        timestamp: "Apr 29, 1:45 PM",
      },
      {
        id: "msg-2",
        content: "Thank you Dr. Chen. Are there any side effects I should watch for?",
        sender: "user",
        timestamp: "Apr 29, 2:00 PM",
      },
      {
        id: "msg-3",
        content: "Some patients experience drowsiness or nausea. If you notice severe side effects, stop taking it and contact me immediately.",
        sender: "contact",
        timestamp: "Apr 29, 2:30 PM",
      },
      {
        id: "msg-4",
        content: "How are you feeling after the new medication? Any side effects?",
        sender: "contact",
        timestamp: "May 1, 10:15 AM",
      },
    ],
    "chat-4": [
      {
        id: "msg-1",
        content: "Your prescription from Dr. Smith has been received and filled.",
        sender: "contact",
        timestamp: "Apr 28, 11:30 AM",
      },
      {
        id: "msg-2",
        content: "Your prescription is ready for pickup at your convenience.",
        sender: "contact",
        timestamp: "Apr 28, 11:35 AM",
      },
    ],
  }

  const filteredConversations = conversations.filter(conversation =>
    conversation.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedConversationData = conversations.find(c => c.id === selectedConversation)
  const selectedMessages = selectedConversation ? messageHistory[selectedConversation as keyof typeof messageHistory] : []

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return
    
    // In a real app, this would send the message to the backend
    // For now, we'll just clear the input
    setNewMessage("")
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Communicate with your healthcare providers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-4">
                <TabsList className="w-full">
                  <TabsTrigger value="inbox" className="flex-1">Inbox</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                  <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
                </TabsList>
              </div>
              
              <ScrollArea className="h-[calc(100vh-300px)]">
                <TabsContent value="inbox" className="m-0">
                  <div className="divide-y">
                    {filteredConversations.length > 0 ? (
                      filteredConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`flex cursor-pointer items-start p-4 hover:bg-muted/50 ${
                            selectedConversation === conversation.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedConversation(conversation.id)}
                        >
                          <div className="relative mr-4">
                            <Avatar>
                              <AvatarImage 
                                src={conversation.contact.avatar} 
                                alt={conversation.contact.name} 
                              />
                              <AvatarFallback>
                                {conversation.contact.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.contact.status === "online" && (
                              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{conversation.contact.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {conversation.lastMessage.timestamp}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {conversation.contact.role}
                            </div>
                            <div className="line-clamp-1 text-sm">
                              {conversation.lastMessage.content}
                            </div>
                          </div>
                          {conversation.unread > 0 && (
                            <Badge className="ml-2 mt-1">{conversation.unread}</Badge>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
                        <h3 className="font-medium mb-1">No conversations found</h3>
                        <p className="text-sm text-muted-foreground">
                          {searchQuery ? `No results for "${searchQuery}"` : "Your inbox is empty"}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="unread" className="m-0">
                  <div className="divide-y">
                    {filteredConversations.filter(c => c.unread > 0).length > 0 ? (
                      filteredConversations
                        .filter(c => c.unread > 0)
                        .map((conversation) => (
                          <div
                            key={conversation.id}
                            className={`flex cursor-pointer items-start p-4 hover:bg-muted/50 ${
                              selectedConversation === conversation.id ? "bg-muted" : ""
                            }`}
                            onClick={() => setSelectedConversation(conversation.id)}
                          >
                            <div className="relative mr-4">
                              <Avatar>
                                <AvatarImage 
                                  src={conversation.contact.avatar} 
                                  alt={conversation.contact.name} 
                                />
                                <AvatarFallback>
                                  {conversation.contact.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              {conversation.contact.status === "online" && (
                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{conversation.contact.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {conversation.lastMessage.timestamp}
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {conversation.contact.role}
                              </div>
                              <div className="line-clamp-1 text-sm font-medium">
                                {conversation.lastMessage.content}
                              </div>
                            </div>
                            <Badge className="ml-2 mt-1">{conversation.unread}</Badge>
                          </div>
                        ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <CheckCircle className="h-10 w-10 text-muted-foreground mb-3" />
                        <h3 className="font-medium mb-1">No unread messages</h3>
                        <p className="text-sm text-muted-foreground">
                          You're all caught up!
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="archived" className="m-0">
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="font-medium mb-1">No archived messages</h3>
                    <p className="text-sm text-muted-foreground">
                      Messages you archive will appear here
                    </p>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          {selectedConversationData ? (
            <>
              <CardHeader className="border-b px-4 py-3 flex flex-row items-center">
                <div className="flex items-center flex-1">
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarImage 
                      src={selectedConversationData.contact.avatar} 
                      alt={selectedConversationData.contact.name}
                    />
                    <AvatarFallback>
                      {selectedConversationData.contact.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedConversationData.contact.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {selectedConversationData.contact.status === "online" ? (
                        <>
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                          Online
                        </>
                      ) : (
                        <>Offline</>
                      )}
                      <span className="mx-1.5">•</span>
                      <span>{selectedConversationData.contact.role}</span>
                    </div>
                  </div>
                </div>
                <div>
                  {selectedConversationData.contact.role === "Cardiologist" || 
                   selectedConversationData.contact.role === "Neurologist" ? (
                    <Button size="sm" variant="outline" className="ml-2">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      Book Appointment
                    </Button>
                  ) : null}
                </div>
              </CardHeader>
              
              <ScrollArea className="h-[calc(100vh-400px)]">
                <CardContent className="p-4 space-y-4">
                  {selectedMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "contact" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                          <AvatarImage 
                            src={selectedConversationData.contact.avatar} 
                            alt={selectedConversationData.contact.name}
                          />
                          <AvatarFallback>
                            {selectedConversationData.contact.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`text-xs mt-1 ${
                          message.sender === "user" 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        }`}>
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </ScrollArea>
              
              <CardContent className="p-3 border-t">
                <div className="flex items-end gap-2">
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9 flex-shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9 flex-shrink-0">
                    <Image className="h-4 w-4" />
                  </Button>
                  <div className="relative flex-1">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="pr-10"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                  </div>
                  <Button 
                    className="rounded-full h-9 w-9 flex-shrink-0" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Your Messages</h3>
              <p className="text-center text-muted-foreground mb-6 max-w-md">
                Select a conversation from the list to view your messages.
                You can communicate with your healthcare providers securely.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/patient/find-services">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Find Providers
                  </Link>
                </Button>
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
} 