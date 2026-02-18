"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WhatsAppVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onCorrect: () => void
  onIncorrect: (error: string) => void
  doctoName?: string
  date?: string
  hideResponse?: boolean
}

export function WhatsAppVerificationModal({
  isOpen,
  onClose,
  onCorrect,
  onIncorrect,
  doctoName = "Carlos Rodriguez",
  date = "24/04/2025",
  hideResponse = false,
}: WhatsAppVerificationModalProps) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
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
            <DialogTitle className="text-[#00bc3a]">Verificar Conversación WhatsApp</DialogTitle>
          </div>
        </DialogHeader>

        {/* Chat Container */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#00bc3a] text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00bc3a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="font-medium text-sm">{doctoName}</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-64 overflow-y-auto p-3 bg-[#f2eae4] flex flex-col gap-3">
            {/* Automatic Message */}
            <div className="max-w-[80%] ml-auto">
              <div className="bg-[#d4f1ff] p-3 rounded-lg shadow-sm text-gray-800">
                <p className="text-xs">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#2979FF] text-white border border-[#90CAF9] mr-1">
                    Automático
                  </span>
                </p>
                <p className="text-sm mt-2">
                  Buenos dias docente {doctoName} queria solicitarle que me confirme su participación en la clase de
                  mañana {date}
                </p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-xs text-gray-600">10:16 AM</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#2979FF]"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                    <polyline points="20 12 9 23 4 18"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Response Message */}
            {!hideResponse && (
              <div className="max-w-[80%]">
                <div className="bg-[#dcffde] p-3 rounded-lg shadow-sm text-gray-800">
                  <p className="text-xs">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#00bc3a] text-white border border-[#A5D6A7] mr-1">
                      Respuesta
                    </span>
                  </p>
                  <p className="text-sm mt-2">Si confirmo</p>
                  <div className="flex justify-start items-center gap-1 mt-1">
                    <span className="text-xs text-gray-600">10:20 AM</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Field Section */}
        {showErrorField && (
          <div className="mt-4 space-y-3">
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
                  <span className="text-sm text-gray-700">No respondió</span>
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

            <Button
              onClick={handleAccept}
              disabled={!errorText.trim() || !ocurrenciaReal}
              className="w-full bg-[#6419e6] text-white hover:bg-[#5315c4] disabled:opacity-50"
            >
              Aceptar
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        {!showErrorField && (
          <div className="mt-6 flex gap-3">
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
