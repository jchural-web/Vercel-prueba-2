"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portal } from "./portal"

interface EmailTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: string) => void
}

export function EmailTemplateModal({ isOpen, onClose, onSelectTemplate }: EmailTemplateModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")

  if (!isOpen) return null

  const emailTemplates = [
    "Carta de Presentación",
    "Confirmación de participación",
    "Correo Confirmación de Participación",
    "Correo de Propuesta de Pago",
    "Correo Información de Carrera Técnica",
    "Correo Información de la Carrera",
    "Correo Información del Curso Completo",
    "Correo Información del Programa - CETPRO",
    "Propuesta Personalizada de Pagos + Link 1° Clase",
  ]

  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template)
    setIsDropdownOpen(false)
  }

  const handleGenerateEmail = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate)
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-[#6419e6]">Generar mensaje - Seleccione plantilla</h2>
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
                  {emailTemplates.map((template, index) => (
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
          </div>

          <div className="p-4 border-t flex justify-end">
            <div className="flex space-x-2">
              <Button variant="destructive" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                variant="default"
                onClick={handleGenerateEmail}
                disabled={!selectedTemplate}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Generar Correo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
