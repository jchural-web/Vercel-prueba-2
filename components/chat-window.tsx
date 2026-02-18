"use client"
import type React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, CheckCircle, FileText, Calendar } from "lucide-react"
import type { User as UserType, Message } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface ChatWindowProps {
  user: UserType
  messages: Message[]
  newMessage: string
  setNewMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
}

export default function ChatWindow({ user, messages, newMessage, setNewMessage, handleSendMessage }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"chat" | "crm">("chat")

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Custom tabs */}
      <div className="flex border-b mx-2 mt-2">
        <button
          className={cn(
            "flex-1 py-2 text-xs font-medium text-center border-b-2",
            activeTab === "chat" ? "border-primary text-primary" : "border-transparent text-muted-foreground",
          )}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
        <button
          className={cn(
            "flex-1 py-2 text-xs font-medium text-center border-b-2",
            activeTab === "crm" ? "border-primary text-primary" : "border-transparent text-muted-foreground",
          )}
          onClick={() => setActiveTab("crm")}
        >
          Ficha CRM
        </button>
      </div>

      {/* Chat content */}
      {activeTab === "chat" && (
        <>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.isUser ? "justify-start" : "justify-end")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.isUser ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground",
                    )}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 text-right mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-background sticky bottom-0 z-10">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </>
      )}

      {/* CRM content with improved styling */}
      {activeTab === "crm" && (
        <div className="p-4 bg-slate-50">
          {/* Client header with icon */}
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#6419e6] rounded-full p-1.5">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-[#6419e6]">{user.name}</h2>
          </div>

          {/* Course information with icon */}
          <div className="flex gap-2 mb-2">
            <FileText className="h-5 w-5 text-[#6419e6] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">CURSO OFICIAL AWS CERTIFIED SOLUTIONS ARCHITECT - ASSOCIATE</p>
          </div>

          {/* Modality information with icon */}
          <div className="flex gap-2 mb-4">
            <Calendar className="h-5 w-5 text-[#6419e6] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">TI AWS ARCHITECT ASSOCIATE ONLINE 2024 II LIMA</p>
          </div>

          {/* Location with flag and phase badge side by side */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
              <div className="w-5 h-5 mr-2 rounded-full overflow-hidden flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
                  <path fill="#F0F0F0" d="M0 0h512v512H0z" />
                  <path fill="#D80027" d="M0 0h170.7v512H0z" />
                  <path fill="#D80027" d="M341.3 0H512v512H341.3z" />
                </svg>
              </div>
              <p className="text-sm text-slate-700">Perú - Arequipa</p>
            </div>

            <div className="bg-[#6419e6] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Fase Actual: IP</span>
            </div>
          </div>

          {/* Action button */}
          <Button
            onClick={() => router.push(`/gestion-comercial/agenda/contacto-entrante/${user.id}`)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Ir a ficha
          </Button>
        </div>
      )}
    </div>
  )
}
