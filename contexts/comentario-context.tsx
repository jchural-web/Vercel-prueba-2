"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { usePathname } from "next/navigation"

type ComentarioContextType = {
  showComentarioButton: boolean
  setShowComentarioButton: (show: boolean) => void
}

// Crear el contexto con un valor por defecto
export const ComentarioContext = createContext<ComentarioContextType | undefined>(undefined)

export function ComentarioProvider({ children }: { children: ReactNode }) {
  const [showComentarioButton, setShowComentarioButton] = useState(false)
  const pathname = usePathname()

  // Initialize the button visibility based on the current path
  useEffect(() => {
    // Check if we're on a contact detail page
    const isContactDetailPage =
      pathname?.includes("/gestion-comercial/agenda/contacto-entrante/") &&
      pathname?.split("/").length > 4 &&
      !pathname?.endsWith("/contacto-entrante") &&
      !pathname?.endsWith("/agenda")

    // Set the button visibility based on the current page
    if (isContactDetailPage) {
      setShowComentarioButton(true)
    }
  }, [pathname])

  return (
    <ComentarioContext.Provider value={{ showComentarioButton, setShowComentarioButton }}>
      {children}
    </ComentarioContext.Provider>
  )
}

export function useComentario() {
  const context = useContext(ComentarioContext)
  if (context === undefined) {
    // En lugar de lanzar un error, devolvemos un valor por defecto
    return { showComentarioButton: false, setShowComentarioButton: () => {} }
  }
  return context
}
