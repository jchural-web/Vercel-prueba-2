"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/lib/types"

interface UserListProps {
  users: User[]
  onSelectUser: (user: User) => void
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

export default function UserList({ users, onSelectUser }: UserListProps) {
  const activeUsers = users.filter((user) => user.status === "active")
  const pendingUsers = users.filter((user) => user.status === "pending")

  return (
    <Tabs defaultValue="active" className="flex-1 flex flex-col">
      <TabsList className="grid grid-cols-2 mx-2 mt-2">
        <TabsTrigger value="active" className="text-xs">
          Activos
          {activeUsers.length > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {activeUsers.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="pending" className="text-xs">
          Pendientes
          {pendingUsers.length > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {pendingUsers.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="flex-1 mt-0">
        <UserListContent users={activeUsers} onSelectUser={onSelectUser} />
      </TabsContent>
      <TabsContent value="pending" className="flex-1 mt-0">
        <UserListContent users={pendingUsers} onSelectUser={onSelectUser} />
      </TabsContent>
    </Tabs>
  )
}

function UserListContent({ users, onSelectUser }: UserListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-2">
        {users.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No hay conversaciones</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="p-2 rounded-md hover:bg-muted cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <div className="flex items-start space-x-2">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    {user.source === "whatsapp" ? (
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-blue-500 text-white">{getInitials(user.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      user.status === "active"
                        ? "bg-green-500"
                        : user.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.lastMessageTime}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user.lastMessage}</p>
                    {user.unread > 0 && (
                      <Badge variant="destructive" className="ml-1 text-xs">
                        {user.unread}
                      </Badge>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs mt-1 ${
                      user.source === "whatsapp"
                        ? "bg-green-500 hover:bg-green-500 text-white border-green-500"
                        : "bg-blue-500 hover:bg-blue-500 text-white border-blue-500"
                    }`}
                  >
                    {user.source === "whatsapp" ? "WhatsApp" : "Portal web"}
                  </Badge>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}
