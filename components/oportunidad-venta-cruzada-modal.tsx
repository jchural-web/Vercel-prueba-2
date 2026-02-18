"use client"

import { useState, useEffect } from "react"
import { X, Save, AlertCircle, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OportunidadVentaCruzadaModalProps {
  isOpen: boolean
  onClose: () => void
  oportunidad: {
    programa: string
  }
}

export function OportunidadVentaCruzadaModal({ isOpen, onClose, oportunidad }: OportunidadVentaCruzadaModalProps) {
  const [comentario, setComentario] = useState("")
  const [horaContacto, setHoraContacto] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Establecer la hora actual cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      const now = new Date()
      const formattedDate = now.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      const formattedTime = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setHoraContacto(`${formattedDate} ${formattedTime}`)

      // Reset states when opening modal
      setSubmitSuccess(false)
      setSubmitError("")
      setComentario("")
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setSubmitError("")

      // Preparar los datos para enviar
      const formData = {
        programa: oportunidad.programa,
        horaContacto,
        comentario,
        centroCosto: "TI AWS ARCHITECT ASSOCIATE ONLINE 2024 II LIMA",
        asignadoActividades: "Asesor 12",
        tipoDato: "venta cruzada",
        origen: "llamada telefonica",
        faseOportunidad: "IT",
        referidoPor: "Alvarez prueba",
      }

      // Simular una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simular éxito
      console.log("Datos enviados:", formData)
      setSubmitSuccess(true)

      // Cerrar el modal después de un breve retraso
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      console.error("Error al enviar datos:", error)
      setSubmitError("Ocurrió un error al guardar la oportunidad. Por favor, inténtelo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#f0ebff]">
          <div className="flex items-center gap-3">
            <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#6419e6]">
              Oportunidad de Venta Cruzada - {oportunidad.programa}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-3 mb-4">
                <div className="bg-green-500 text-white p-1 rounded-full">
                  <Check className="h-5 w-5" />
                </div>
                <p className="font-medium">¡La oportunidad se ha guardado correctamente!</p>
              </div>
              <p className="text-gray-600">El modal se cerrará automáticamente...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna 1: Datos del Alumno */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#6419e6] font-medium mb-3 border-b pb-2">Datos del Alumno</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hora Contacto</label>
                      <input
                        type="text"
                        value={horaContacto}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                      />
                      <p className="text-xs text-gray-500 mt-1">Fecha y hora en que se registró el contacto</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Comentario de la Actividad</label>
                      <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6419e6] focus:border-transparent"
                        placeholder="Ingrese sus comentarios sobre esta oportunidad..."
                        disabled={isSubmitting}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna 2: Datos de la Oportunidad */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#6419e6] font-medium mb-3 border-b pb-2">Datos de la Oportunidad</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-500">Programa:</div>
                      <div className="text-sm">{oportunidad.programa}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-500">Centro de Costo:</div>
                      <div className="text-sm">TI AWS ARCHITECT ASSOCIATE ONLINE 2024 II LIMA</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-500">Asignado Actividades:</div>
                      <div className="text-sm">Asesor 12</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-500">Tipo de Dato:</div>
                      <div className="text-sm">venta cruzada</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-500">Origen:</div>
                      <div className="text-sm">llamada telefonica</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-500">Fase de Oportunidad:</div>
                      <div className="text-sm">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          IT
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-500">Referido por:</div>
                      <div className="text-sm">Alvarez prueba</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {submitError && <div className="mt-4 bg-red-100 text-red-800 p-3 rounded-md">{submitError}</div>}
        </div>

        {/* Pie del modal */}
        <div className="flex justify-end items-center p-4 border-t border-gray-200 bg-gray-50 gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            className="bg-[#6419e6] hover:bg-[#5315c1]"
            onClick={handleSubmit}
            disabled={isSubmitting || submitSuccess}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar solo oportunidad
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
