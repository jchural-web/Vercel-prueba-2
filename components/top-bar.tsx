"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Bell, RefreshCw, Key, User, LogOut, AlignJustify, Phone } from "lucide-react"
import { WavixDialer } from "./wavix-dialer"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function TopBar() {
  const [isWavixEnabled, setIsWavixEnabled] = useState(false)
  const pathname = usePathname()

  // Verificar si estamos en la sección de agenda de planificación-operaciones
  const isInAgenda = pathname?.includes("/planificacion-operaciones")

  // Función para controlar el sidebar desde el botón de hamburguesa
  const toggleSidebar = () => {
    // Acceder directamente a la función del componente AppSidebar
    const event = new CustomEvent("toggle-sidebar")
    document.dispatchEvent(event)
  }

  const toggleWavix = () => {
    setIsWavixEnabled(!isWavixEnabled)
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-[#7b3ff7] text-white px-6 w-full">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-[#8f5af8] mr-2"
        onClick={toggleSidebar}
        aria-label="Menú principal"
      >
        <AlignJustify className="h-5 w-5" />
      </Button>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-xl">Integra CRM</span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" className="text-white hover:bg-[#8f5af8] gap-2">
          <span>Actualizar</span>
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-[#8f5af8]">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notificaciones</span>
        </Button>

        {/* Wavix toggle button - solo se muestra en la sección de agenda */}
        {isInAgenda && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-white hover:bg-[#8f5af8] px-3 py-1"
              onClick={toggleWavix}
            >
              <Phone className="h-4 w-4" />
              <span>Wavix</span>
              <div className="relative inline-flex items-center">
                <div
                  className={`w-10 h-5 rounded-full transition-colors ${isWavixEnabled ? "bg-white" : "bg-purple-800"}`}
                >
                  <div
                    className={`absolute top-[2px] w-4 h-4 rounded-full transition-all ${
                      isWavixEnabled
                        ? "bg-purple-600 translate-x-5 border-white"
                        : "bg-white translate-x-[2px] border-purple-300"
                    } border`}
                  />
                </div>
              </div>
            </Button>
          </div>
        )}

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

      {/* Render the WavixDialer when enabled */}
      {isWavixEnabled && <WavixDialer onClose={() => setIsWavixEnabled(false)} />}
    </header>
  )
}
