"use client"

import { useState } from "react"
import { X, Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

interface CallVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onCorrect: () => void
  onIncorrect: (error: string) => void
  doctoName?: string
  date?: string
}

export function CallVerificationModal({
  isOpen,
  onClose,
  onCorrect,
  onIncorrect,
  doctoName = "Carlos Rodriguez",
  date = "24/04/2025",
}: CallVerificationModalProps) {
  const [showErrorField, setShowErrorField] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
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

  const handleClose = () => {
    setShowErrorField(false)
    setErrorText("")
    setIsPlaying(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col overflow-hidden">
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
              <h2 className="text-md font-semibold text-[#6419e6]">Verificar Grabación de Llamada</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              
            </button>
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto">
          {/* Información de la llamada */}
          <div className="p-3.5 border-b flex-shrink-0">
            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span className="font-medium text-gray-700 text-sm">Docente:</span>
              <div className="text-sm">{doctoName}</div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-2 items-center mt-2">
              <span className="font-medium text-gray-700 text-sm">Fecha:</span>
              <div className="text-sm">{date}</div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-2 items-center mt-2">
              <span className="font-medium text-gray-700 text-sm">Asunto:</span>
              <div className="text-sm">Confirmación de participación en clase</div>
            </div>
          </div>

          {/* Reproductor de audio */}
          {!showErrorField && (
            <>
              <div className={`p-6 flex flex-col items-center justify-center gap-4 ${showErrorField ? "max-h-40" : ""} bg-white`}>
                <div className="w-16 h-16 rounded-full bg-[#6419e6] flex items-center justify-center text-white">
                  <Volume2 className="h-8 w-8" />
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">Grabación de llamada</p>
                  <p className="text-xs text-gray-500">Duración: 2:34</p>
                </div>

                {/* Controles de audio */}
                <div className="w-full max-w-xs">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex-shrink-0 p-2 bg-[#6419e6] text-white rounded-full hover:bg-[#5315c4] transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5 ml-0.5" />
                      )}
                    </button>
                    
                    <div className="flex-grow">
                      <div className="w-full h-1 bg-gray-300 rounded-full">
                        <div className="h-full w-1/3 bg-[#6419e6] rounded-full"></div>
                      </div>
                    </div>
                    
                    <span className="text-xs text-gray-600 flex-shrink-0">1:24</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-2">
                  {isPlaying ? "Reproduciendo..." : "Presiona play para escuchar"}
                </p>
              </div>

              {/* Descripción del contenido de la llamada */}
              <div className="px-3.5 py-3 border-t bg-blue-50">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Contenido:</span> Se solicita confirmación de participación en clase del {date}. El docente {doctoName} confirma su participación.
                </p>
              </div>
            </>
          )}

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
