"use client"
import { X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/lib/types"

interface NotificationPopupProps {
  user: User
  message: string
  onClose: () => void
  onClick: () => void
}

// Función para obtener las iniciales de un nombre
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) // Limitar a 2 caracteres
}

export default function NotificationPopup({ user, message, onClose, onClick }: NotificationPopupProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-3 mb-4 w-[300px] cursor-pointer border border-gray-200 animate-in fade-in slide-in-from-bottom-5 duration-300"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-2">
          <Avatar className="h-10 w-10">
            {user.source === "whatsapp" ? (
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-blue-500 text-white">{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="flex items-center">
              <p className="font-medium text-sm">{user.name}</p>
              <Badge
                variant="outline"
                className={`ml-2 text-xs ${
                  user.source === "whatsapp"
                    ? "bg-green-500 hover:bg-green-500 text-white border-green-500"
                    : "bg-blue-500 hover:bg-blue-500 text-white border-blue-500"
                }`}
              >
                {user.source === "whatsapp" ? "WhatsApp" : "Portal web"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
