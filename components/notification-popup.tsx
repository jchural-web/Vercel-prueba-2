"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/lib/types"

// Función para obtener las iniciales de un nombre
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) // Limitar a 2 caracteres
}

interface NotificationPopupProps {
  user: User
  message: string
  onClose: () => void
  onClick: () => void
}

export default function NotificationPopup({ user, message, onClose, onClick }: NotificationPopupProps) {
  return (
    <div className="mb-4 bg-white rounded-lg shadow-md p-3 w-[300px] border border-gray-200 animate-in slide-in-from-top-5">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            {user.source === "whatsapp" ? (
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-blue-500 text-white">{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <Badge
              variant="outline"
              className={`text-xs ${
                user.source === "whatsapp"
                  ? "bg-green-500 hover:bg-green-500 text-white border-green-500"
                  : "bg-blue-500 hover:bg-blue-500 text-white border-blue-500"
              }`}
            >
              {user.source === "whatsapp" ? "WhatsApp" : "Portal web"}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm truncate mb-2">{message}</p>
      <Button variant="secondary" size="sm" className="w-full" onClick={onClick}>
        Responder
      </Button>
    </div>
  )
}
