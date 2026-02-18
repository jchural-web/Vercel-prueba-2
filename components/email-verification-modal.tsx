"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface EmailVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onCorrect: () => void
  onIncorrect: (error: string) => void
  doctoName?: string
  date?: string
}

export function EmailVerificationModal({
  isOpen,
  onClose,
  onCorrect,
  onIncorrect,
  doctoName = "Carlos Rodriguez",
  date = "24/04/2025",
}: EmailVerificationModalProps) {
  const [showErrorField, setShowErrorField] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [ocurrenciaReal, setOcurrenciaReal] = useState<"no-respondio" | "rechazo" | null>(null)

  const handleGoBack = () => {
    setShowErrorField(false)
    setErrorText("")
    setOcurrenciaReal(null)
  }

  const handleCorrect = () => {
    onCorrect()
    onClose()
  }

  const handleIncorrect = () => {
    if (showErrorField && errorText.trim()) {
      onIncorrect(errorText)
      onClose()
    } else {
      setShowErrorField(true)
    }
  }

  const handleAccept = () => {
    if (errorText.trim()) {
      onIncorrect(errorText)
      onClose()
    }
  }

  // Función para obtener color basado en nombre
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
    ]

    // Usar la suma de los códigos de caracteres para determinar el color
    const charSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return colors[charSum % colors.length]
  }

  // Función para obtener iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="border-b pb-3 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {showErrorField && (
                <button
                  onClick={handleGoBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                  aria-label="Volver atrás"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h2 className="text-md font-semibold text-[#6419e6]">Verificar Conversación de Correo</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              
            </button>
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto">
          {/* Asunto */}
          <div className="p-3.5 border-b flex-shrink-0">
            <div className="grid grid-cols-[95px_1fr] gap-2 items-center">
              <span className="font-medium text-gray-700 text-sm">Asunto:</span>
              <div className="text-sm">Confirmación de participación en clase</div>
            </div>
          </div>

          {/* Mensaje del docente */}
          <div className="p-4 bg-white">
            <div className="flex items-start">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3 ${getAvatarColor(doctoName)}`}
                style={{ aspectRatio: "1/1" }}
              >
                {getInitials(doctoName)}
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{doctoName}</span>
                  <span className="text-gray-500 text-xs">25/04/2023 | 10:20 AM</span>
                </div>

                <div className="text-sm">
                  <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700 mb-2">
                    Manual
                  </div>
                  <p className="mt-1 text-gray-800">Si confirmo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Field Section */}
          {showErrorField && (
            <div className="p-4 space-y-3 border-t bg-gray-50">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especifique el error de la comunicación
                </label>
                <textarea
                  value={errorText}
                  onChange={(e) => setErrorText(e.target.value)}
                  placeholder="Describa el error encontrado..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6419e6]"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ocurrencia real:
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ocurrenciaReal === "no-respondio"}
                      onChange={() => setOcurrenciaReal(ocurrenciaReal === "no-respondio" ? null : "no-respondio")}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-yellow-600">No respondió</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ocurrenciaReal === "rechazo"}
                      onChange={() => setOcurrenciaReal(ocurrenciaReal === "rechazo" ? null : "rechazo")}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Rechazo</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 border-t pt-4 px-4 pb-4 flex-shrink-0">
          {showErrorField ? (
            <Button
              onClick={handleAccept}
              disabled={!errorText.trim() || !ocurrenciaReal}
              className="w-full bg-[#6419e6] text-white hover:bg-[#5315c4] disabled:opacity-50"
            >
              Aceptar
            </Button>
          ) : (
            <>
              <Button
                onClick={handleIncorrect}
                variant="destructive"
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
              >
                Incorrecto
              </Button>
              <Button
                onClick={handleCorrect}
                className="flex-1 bg-green-600 text-white hover:bg-green-700"
              >
                Correcto
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
