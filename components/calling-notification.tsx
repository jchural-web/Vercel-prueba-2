"use client"

import { useState, useEffect } from "react"
import { Phone, X, PhoneCall } from "lucide-react"
import { useRouter } from "next/navigation"
import { ExecuteButton } from "./execute-button"

interface CallingNotificationProps {
  isOpen: boolean
  onClose: () => void
  clientData: {
    name: string
    opportunity: string
    phase: string
    category: string
    probability: string
    id: string
  }
}

export const CallingNotification = ({ isOpen, onClose, clientData }: CallingNotificationProps) => {
  const router = useRouter()
  const [ringing, setRinging] = useState(0)

  // Efecto para la animación de llamada
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      setRinging((prev) => (prev + 1) % 3)
    }, 800)

    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  const handleExecute = () => {
    onClose()
    // Navegar a la página del cliente
    router.push(`/gestion-comercial/agenda/contacto-entrante/${clientData.id}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Encabezado */}
        <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Phone className="h-5 w-5" />
              {/* Animación de ondas de llamada */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute -inset-1 border border-white rounded-full animate-ping ${
                    i === ringing ? "opacity-75" : "opacity-0"
                  }`}
                  style={{
                    animationDuration: "1.5s",
                    animationIterationCount: 1,
                    transform: `scale(${1 + i * 0.2})`,
                  }}
                />
              ))}
            </div>
            <span className="font-medium">Llamada en curso</span>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <div className="mb-4">
            <div className="flex">
              <div className="w-1/3 font-medium text-gray-700">CONTACTO</div>
              <div className="w-2/3 font-medium">{clientData.name}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex mb-1">
              <div className="w-1/3 font-medium text-gray-700">OPORTUNIDAD</div>
              <div className="w-2/3">
                <div className="text-purple-600 font-medium">{clientData.opportunity}</div>
              </div>
            </div>
            <div className="flex pl-[33.33%]">
              <div className="w-full">
                <div className="text-sm">
                  <span className="text-gray-600">Fase: </span>
                  <span>{clientData.phase}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Categoría: </span>
                  <span className="text-blue-600">{clientData.category}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Prob. Actual: </span>
                  <span className="text-green-600">{clientData.probability}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animación de llamada */}
          <div className="flex justify-center my-6">
            <div className="relative flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <PhoneCall className="h-8 w-8 text-green-600" />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping"
                  style={{
                    animationDuration: `${1 + i * 0.5}s`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.6 - i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-700">El sistema está realizando una llamada automática a este contacto</p>
          </div>

          <div className="flex justify-center">
            <ExecuteButton color="green" text="Ejecutar" onClick={handleExecute} className="px-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
