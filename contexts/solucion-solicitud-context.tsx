"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SolucionSolicitudContextType {
  isModalOpen: boolean
  openModal: (solicitudId?: string) => void
  closeModal: () => void
  currentSolicitudId: string | null
  handleSolucionSubmit: (comentario: string, archivo?: File) => void
}

const SolucionSolicitudContext = createContext<SolucionSolicitudContextType | undefined>(undefined)

export function SolucionSolicitudProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSolicitudId, setCurrentSolicitudId] = useState<string | null>(null)

  const openModal = (solicitudId?: string) => {
    if (solicitudId) {
      setCurrentSolicitudId(solicitudId)
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentSolicitudId(null)
  }

  const handleSolucionSubmit = (comentario: string, archivo?: File) => {
    console.log("Solución enviada:", {
      solicitudId: currentSolicitudId,
      comentario,
      archivo,
    })
    // Aquí iría la lógica para guardar la solución en el backend
    closeModal()
  }

  return (
    <SolucionSolicitudContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        currentSolicitudId,
        handleSolucionSubmit,
      }}
    >
      {children}
    </SolucionSolicitudContext.Provider>
  )
}

export function useSolucionSolicitud() {
  const context = useContext(SolucionSolicitudContext)
  if (context === undefined) {
    throw new Error("useSolucionSolicitud debe ser usado dentro de un SolucionSolicitudProvider")
  }
  return context
}
