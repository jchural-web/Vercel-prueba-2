"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portal } from "./portal"

interface WhatsAppTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: string) => void
}

export function WhatsAppTemplateModal({ isOpen, onClose, onSelectTemplate }: WhatsAppTemplateModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedTemplateText, setSelectedTemplateText] = useState("")

  const whatsappTemplates = [
    "Corte de Llamada",
    "Día 1 sin Contacto",
    "Día 3 sin Contacto",
    "Retomar Conversación",
    "Validación Envío de Información",
    "Validación Revisión de Información",
  ]

  const templateTexts: Record<string, string> = {
    "Corte de Llamada":
      "Estimado Joseph, se cortó la comunicación, por favor quedo atento a que me comentes tus consultas por este medio, o que me puedas indicar el horario en el cual me puedo comunicar contigo para poder explicarte el alcance de nuestro programa.",
    "Día 1 sin Contacto":
      "Hola Joseph, te saluda Asesor 12 de BSG INSTITUTE, solicitaste información sobre nuestro Curso. Estoy a tu disposición para cualquier consulta.",
    "Día 3 sin Contacto":
      "Hola Joseph, soy Asesor 12 de BSG INSTITUTE, he intentado comunicarme nuevamente contigo, sigo atento a tus consultas.",
    "Retomar Conversación":
      "Hola Joseph, disculpa que no te pude atender, para poder continuar con la comunicación y poder resolver todas tus dudas.",
    "Validación Envío de Información":
      "Hola Joseph, te saluda Asesor 12 de BSG INSTITUTE, nos comunicamos hace un momento para verificar si recibiste la información.",
    "Validación Revisión de Información":
      "Hola Joseph, soy Asesor 12 de BSG INSTITUTE, ¿Pudo revisar la información enviada?",
  }

  useEffect(() => {
    if (selectedTemplate) {
      setSelectedTemplateText(templateTexts[selectedTemplate] || "")
    } else {
      setSelectedTemplateText("")
    }
  }, [selectedTemplate])

  if (!isOpen) return null

  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template)
    setIsDropdownOpen(false)
  }

  const handleApplyTemplate = () => {
    if (selectedTemplateText) {
      onSelectTemplate(selectedTemplateText)
      onClose()
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-[#6419e6]">Plantillas para WhatsApp</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="relative">
              <div
                className="w-full border rounded-md p-2 text-sm flex justify-between items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-gray-700">{selectedTemplate || "Seleccione una plantilla..."}</span>
                <span className="text-gray-400">▼</span>
              </div>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {whatsappTemplates.map((template, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      {template}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedTemplateText && (
              <div className="mt-4 border rounded-md p-3 bg-gray-50 text-sm text-gray-700 h-32 overflow-y-auto">
                {selectedTemplateText}
              </div>
            )}
          </div>

          <div className="p-4 border-t flex justify-end">
            <div className="flex space-x-2">
              <Button variant="destructive" onClick={onClose}>
                Cerrar
              </Button>
              <Button
                variant="default"
                onClick={handleApplyTemplate}
                disabled={!selectedTemplateText}
                className="bg-[#00bc3a] hover:bg-[#00a832]"
              >
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
