"use client"

import { Bell, Search, RefreshCw, Key, User, LogOut } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function AgendaTopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-[#7b3ff7] text-white px-6 w-full">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-xl">Integra CRM</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="hidden md:flex relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
          <Input
            type="search"
            placeholder="Buscar en agenda..."
            className="w-full bg-[#8f5af8] border-none pl-8 shadow-none text-white placeholder:text-white/70 focus-visible:ring-1 focus-visible:ring-white/30"
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-[#8f5af8]">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notificaciones</span>
        </Button>
        <Button variant="ghost" className="text-white hover:bg-[#8f5af8] gap-2">
          <span>Actualizar</span>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-[#8f5af8] px-2">
              <Avatar className="h-8 w-8 border border-white/30">
                <AvatarImage
                  src="/images/design-mode/Avatar%20mujer.svg"
                  alt="Yesica Palomino"
                />
                <AvatarFallback>YP</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline whitespace-nowrap">Yesica Palomino</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">Yesica Palomino</p>
                <p className="text-xs text-muted-foreground">yesica.palomino@bsginstitute.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Key className="mr-2 h-4 w-4" />
              <span>Cambiar clave</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Mi avatar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
