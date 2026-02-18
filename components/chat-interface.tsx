"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { X, MessageSquare, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { usePathname } from "next/navigation"
import UserList from "./user-list"
import ChatWindow from "./chat-window"
import NotificationPopup from "./notification-popup"
import type { User as UserType, Message } from "@/lib/types"

// Función para obtener las iniciales de un nombre
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) // Limitar a 2 caracteres
}

// Sample data
const users: UserType[] = [
  {
    id: "1",
    name: "María García",
    avatar: "/thoughtful-man-glasses.png",
    source: "whatsapp",
    status: "active",
    lastMessage: "Necesito información sobre el programa LEAN SSSB",
    lastMessageTime: "10:30 AM",
    unread: 2,
    course: "CURSO OFICIAL AWS CERTIFIED SOLUTIONS ARCHITECT - ASSOCIATE",
    modality: "TI AWS ARCHITECT ASSOCIATE ONLINE 2024 II LIMA",
    location: "Perú - Arequipa",
    phase: "IP",
  },
  {
    id: "2",
    name: "Juan Pérez",
    avatar: "/short-haired-woman.png",
    source: "website",
    status: "active",
    lastMessage: "¿Cuándo inicia el próximo curso?",
    lastMessageTime: "11:45 AM",
    unread: 0,
    course: "CURSO OFICIAL AWS CERTIFIED SOLUTIONS ARCHITECT - ASSOCIATE",
    modality: "TI AWS ARCHITECT ASSOCIATE ONLINE 2024 II LIMA",
    location: "Perú - Lima",
    phase: "BNC",
  },
  {
    id: "3",
    name: "Ana Rodríguez",
    avatar: "/young-man-contemplative.png",
    source: "whatsapp",
    status: "pending",
    lastMessage: "Gracias por la información",
    lastMessageTime: "Yesterday",
    unread: 0,
    course: "LEAN SSSB ONLINE 2024 II LIMA",
    modality: "LEAN SSSB ONLINE 2024 II LIMA",
    location: "Perú - Cusco",
    phase: "IS",
  },
  {
    id: "4",
    name: "Carlos López",
    avatar: "/professional-woman-diverse.png",
    source: "website",
    status: "closed",
    lastMessage: "Ya realicé mi inscripción, muchas gracias",
    lastMessageTime: "Yesterday",
    unread: 0,
    course: "CURSO OFICIAL AWS CERTIFIED SOLUTIONS ARCHITECT - ASSOCIATE",
    modality: "TI AWS ARCHITECT ASSOCIATE ONLINE 2024 II LIMA",
    location: "Perú - Trujillo",
    phase: "PF",
  },
]

// Sample messages for a conversation
const sampleMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      userId: "1",
      content: "Hola, necesito información sobre el programa LEAN SSSB",
      timestamp: "10:25 AM",
      isUser: true,
    },
    {
      id: "m2",
      userId: "agent",
      content:
        "Hola María, con gusto te ayudo. El programa LEAN SSSB es un curso especializado en metodologías de mejora continua. ¿Tienes alguna duda específica?",
      timestamp: "10:27 AM",
      isUser: false,
    },
    {
      id: "m3",
      userId: "1",
      content: "¿Cuál es el costo y la duración del programa?",
      timestamp: "10:30 AM",
      isUser: true,
    },
  ],
  "2": [
    {
      id: "m1",
      userId: "2",
      content: "Hola, ¿cuándo inicia el próximo curso?",
      timestamp: "11:45 AM",
      isUser: true,
    },
  ],
}

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [notificationData, setNotificationData] = useState<{ user: UserType; message: string } | null>(null)
  const [unreadCount, setUnreadCount] = useState(2) // Initial unread count
  const { toast } = useToast()
  const pathname = usePathname()

  // Verificar si estamos en la página de contacto entrante y en la pestaña speech
  const isContactoEntrantePage = pathname?.includes("/gestion-comercial/agenda/contacto-entrante/")

  // Function to play notification sound
  const playNotificationSound = () => {
    try {
      // Check if we're in a browser environment
      if (typeof window !== "undefined") {
        // Create audio context instead of using Audio element
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContext) {
          // Use a simple beep sound generated programmatically
          const audioContext = new AudioContext()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          oscillator.type = "sine"
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.2)
          console.log("Notification sound played successfully")
        } else {
          console.log("AudioContext not supported in this browser")
        }
      }
    } catch (error) {
      console.error("Error playing notification sound:", error)
      // Silent fail - don't break the app if sound fails
    }
  }

  // Simulate receiving a new message
  const simulateNewMessage = () => {
    // Create a random user from the list
    const randomUserIndex = Math.floor(Math.random() * users.length)
    const user = users[randomUserIndex]

    // Create a new message
    const newMessages = [
      "Hola, ¿pueden ayudarme con información sobre los programas?",
      "Necesito saber los requisitos para inscribirme",
      "¿Cuál es el costo del programa LEAN?",
      "¿Tienen disponibilidad para una consulta?",
      "Gracias por su atención",
    ]
    const randomMessageIndex = Math.floor(Math.random() * newMessages.length)
    const messageContent = newMessages[randomMessageIndex]

    const newMsg: Message = {
      id: `m${Date.now()}`,
      userId: user.id,
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    // Update messages
    setMessages((prev) => ({
      ...prev,
      [user.id]: [...(prev[user.id] || []), newMsg],
    }))

    // Update user's last message
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          lastMessage: messageContent,
          lastMessageTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          unread: u.unread + 1,
          status: "active", // Move to active if it wasn't
        }
      }
      return u
    })

    // Show notification
    setNotificationData({
      user,
      message: messageContent,
    })
    setShowNotification(true)

    // Increase unread count
    setUnreadCount((prev) => prev + 1)

    // Play sound
    playNotificationSound()

    // Show toast notification
    toast({
      title: `Nuevo mensaje de ${user.name}`,
      description: messageContent,
      duration: 5000,
    })

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }

  // Configurar la simulación automática cada 30 segundos
  useEffect(() => {
    // Crear un intervalo para simular mensajes nuevos cada 4 minutos
    const messageInterval = setInterval(() => {
      simulateNewMessage()
    }, 240000) // 240000 ms = 4 minutos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(messageInterval)
  }, []) // El array vacío asegura que este efecto solo se ejecute una vez al montar el componente

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSelectedUser(null)
    }
  }

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user)
    // Reset unread count for this user
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, unread: 0 }
      }
      return u
    })
  }

  const handleBackToList = () => {
    setSelectedUser(null)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedUser) return

    const newMsg: Message = {
      id: `m${Date.now()}`,
      userId: "agent",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: false,
    }

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
    }))
    setNewMessage("")
  }

  const handleNotificationClick = () => {
    if (notificationData) {
      setIsOpen(true)
      handleUserSelect(notificationData.user)
      setShowNotification(false)
    }
  }

  // Determinar la posición del botón de chat basado en la ruta
  // Obtener la pestaña activa del pathname
  const getActiveTab = () => {
    if (!pathname) return ""

    // Extraer la pestaña de la URL
    if (pathname.includes("/editar-datos")) return "editar-datos"
    if (pathname.includes("/competidores")) return "competidores"
    if (pathname.includes("/cronograma")) return "cronograma"
    if (pathname.includes("/resumen")) return "resumen"
    if (pathname.includes("/informacion")) return "informacion"
    if (pathname.includes("/documentos")) return "documentos"
    if (pathname.includes("/preguntas")) return "preguntas"
    if (pathname.includes("/documentos-legales")) return "documentos-legales"

    // Intentar obtener la pestaña del hash si existe
    const hash = typeof window !== "undefined" ? window.location.hash : ""
    if (hash.startsWith("#")) {
      const tabFromHash = hash.substring(1)
      if (tabFromHash) return tabFromHash
    }

    return ""
  }

  // Determinar la posición del botón de chat basado en la pestaña activa
  const activeTab = getActiveTab()
  const isInSpeechTab = activeTab === "" || activeTab === "speech" // Si no hay tab específica o es speech
  const chatButtonPosition = isContactoEntrantePage ? (isInSpeechTab ? "bottom-24" : "bottom-4") : "bottom-4"

  // Determinar si estamos en la pestaña Speech para ajustar la posición de la notificación
  const isSpeechTabActive = isContactoEntrantePage && isInSpeechTab

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end">
      {/* Notification popup */}
      {showNotification && notificationData && (
        <div className={isSpeechTabActive ? "relative top-[-80px]" : ""}>
          <NotificationPopup
            user={notificationData.user}
            message={notificationData.message}
            onClose={() => setShowNotification(false)}
            onClick={handleNotificationClick}
          />
        </div>
      )}

      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-[350px] md:w-[400px] h-[500px] flex flex-col overflow-hidden border border-gray-200">
          {/* Fixed Chat Header */}
          <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center sticky top-0 z-10">
            {selectedUser ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground"
                  onClick={handleBackToList}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                  {selectedUser.source === "whatsapp" ? (
                    <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  ) : (
                    <AvatarFallback className="bg-blue-500 text-white">{getInitials(selectedUser.name)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{selectedUser.name}</p>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      selectedUser.source === "whatsapp"
                        ? "bg-green-500 hover:bg-green-500 text-white border-green-500"
                        : "bg-blue-500 hover:bg-blue-500 text-white border-blue-500"
                    }`}
                  >
                    {selectedUser.source === "whatsapp" ? "WhatsApp" : "Portal web"}
                  </Badge>
                </div>
              </div>
            ) : (
              <h3 className="font-semibold">Conversaciones</h3>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground" onClick={toggleChat}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {selectedUser ? (
              <ChatWindow
                user={selectedUser}
                messages={messages[selectedUser.id] || []}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
              />
            ) : (
              <UserList users={users} onSelectUser={handleUserSelect} />
            )}
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className={`fixed ${chatButtonPosition} right-6 rounded-full h-14 w-14 shadow-lg flex items-center justify-center relative z-[100]`}
          aria-label="Chat"
        >
          <MessageSquare className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      )}
    </div>
  )
}
