export interface User {
  id: string
  name: string
  avatar?: string
  source: "whatsapp" | "website"
  status: "active" | "pending" | "closed"
  lastMessage: string
  lastMessageTime: string
  unread: number
  course?: string
  modality?: string
  location?: string
  phase?: string
}

export interface Message {
  id: string
  userId: string
  content: string
  timestamp: string
  isUser: boolean
}
