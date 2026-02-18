"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { X, ChevronDown, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portal } from "./portal"

interface NuevoMensajeModalProps {
  isOpen: boolean
  onClose: () => void
  defaultRecipient?: string
}

export function NuevoMensajeModal({ isOpen, onClose, defaultRecipient }: NuevoMensajeModalProps) {
  const [to, setTo] = useState(defaultRecipient || "")
  const [ccValue, setCcValue] = useState("")
  const [subject, setSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  useEffect(() => {
    if (defaultRecipient) {
      setTo(defaultRecipient)
    }
  }, [defaultRecipient])

  const emailTemplates = [
    "Respuesta - Solicitud de información adicional",
    "Respuesta - Confirmación de recepción",
    "Respuesta - Propuesta de reunión",
    "Respuesta - Aclaración de dudas",
    "Respuesta - Seguimiento de inscripción",
    "Respuesta - Información complementaria",
    "Respuesta - Agradecimiento por contacto",
    "Respuesta - Derivación a otro departamento",
    "Respuesta - Solicitud de documentos",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles((prev) => [...prev, ...filesArray])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template)
    setIsTemplateDropdownOpen(false)

    // Simular contenido de plantilla según la selección
    let templateContent = ""
    switch (template) {
      case "Respuesta - Solicitud de información adicional":
        templateContent = `Estimado/a,\n\nGracias por su mensaje. Para poder atender mejor su solicitud, necesitaríamos que nos proporcione la siguiente información adicional:\n\n- Detalles específicos de su consulta\n- Información de contacto actualizada\n- Documentación relevante\n\nQuedamos atentos a su respuesta.\n\nSaludos cordiales,\nEquipo de Atención al Cliente`
        break
      case "Respuesta - Confirmación de recepción":
        templateContent = `Estimado/a,\n\nHemos recibido su mensaje y estamos trabajando en darle respuesta lo antes posible. Nos pondremos en contacto con usted en un plazo máximo de 24 horas.\n\nGracias por su paciencia.\n\nSaludos cordiales,\nEquipo de Atención al Cliente`
        break
      default:
        templateContent = `Estimado/a,\n\nGracias por su mensaje. Estamos procesando su solicitud y nos pondremos en contacto con usted a la brevedad.\n\nSaludos cordiales,\nEquipo de Atención al Cliente`
    }

    setMessageContent(templateContent)
  }

  const handleSendMessage = () => {
    // Aquí iría la lógica para enviar el mensaje
    alert("Mensaje enviado con éxito")
    onClose()
    // Reset form
    setTo("")
    setCcValue("")
    setSubject("")
    setMessageContent("")
    setSelectedTemplate("")
    setSelectedFiles([])
  }

  if (!isOpen) return null

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-3.5 border-b">
            <h2 className="text-md font-semibold text-[#6419e6]">Nuevo mensaje</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-grow">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="font-medium text-[#6419e6] text-sm">Nuevo mensaje</h3>

                <div className="relative">
                  <button
                    className="flex items-center text-sm border rounded-md px-2.5 py-1.5 bg-white hover:bg-gray-50"
                    onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                  >
                    <span>{selectedTemplate || "Seleccionar plantilla"}</span>
                    <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                  </button>

                  {isTemplateDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-76 bg-white border rounded-md shadow-lg z-10 max-h-52 overflow-auto">
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

              {/* Campo Para */}
              <div className="mb-2">
                <label htmlFor="to" className="block text-xs font-medium text-gray-700 mb-1">
                  Para:
                </label>
                <input
                  type="text"
                  id="to"
                  className="w-full border rounded-md p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6419e6]"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Destinatario del mensaje"
                />
              </div>

              {/* Campo CC */}
              <div className="mb-2">
                <label htmlFor="cc" className="block text-xs font-medium text-gray-700 mb-1">
                  CC:
                </label>
                <input
                  type="text"
                  id="cc"
                  className="w-full border rounded-md p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6419e6]"
                  value={ccValue}
                  onChange={(e) => setCcValue(e.target.value)}
                  placeholder="Añadir destinatarios en copia"
                />
              </div>

              {/* Campo Asunto */}
              <div className="mb-2">
                <label htmlFor="subject" className="block text-xs font-medium text-gray-700 mb-1">
                  Asunto:
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full border rounded-md p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6419e6]"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Asunto del mensaje"
                />
              </div>

              {/* Selector de archivos */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Adjuntos:</label>
                <div className="flex items-center">
                  <label className="cursor-pointer border rounded-md px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 flex items-center">
                    <Paperclip className="h-3.5 w-3.5 mr-1.5" />
                    Seleccionar archivos
                    <input type="file" multiple className="hidden" onChange={handleFileChange} />
                  </label>
                  <span className="text-xs text-gray-500 ml-2">o arrastre archivos aquí</span>
                </div>

                {/* Lista de archivos seleccionados */}
                {selectedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center text-xs bg-gray-50 p-1 rounded">
                        <Paperclip className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="truncate max-w-xs">{file.name}</span>
                        <span className="text-gray-500 ml-1">({(file.size / 1024).toFixed(1)} KB)</span>
                        <button className="ml-auto text-red-500 hover:text-red-700" onClick={() => removeFile(index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Barra de herramientas de formato */}
              <div className="border rounded-md p-1 mb-2 flex items-center bg-gray-50">
                {/* Grupo 1: B / U abc */}
                <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
                <button className="p-1 hover:bg-gray-200 rounded italic">/</button>
                <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
                <button className="p-1 hover:bg-gray-200 rounded line-through">abc</button>

                {/* Separador */}
                <div className="h-6 border-l mx-2"></div>

                {/* Grupo 2: x₂ x² */}
                <button className="p-1 hover:bg-gray-200 rounded">
                  x<sub>2</sub>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  x<sup>2</sup>
                </button>

                {/* Separador */}
                <div className="h-6 border-l mx-2"></div>

                {/* Grupo 3: Alineación */}
                <button className="p-1 hover:bg-gray-200 rounded">≡</button>
                <button className="p-1 hover:bg-gray-200 rounded">≡</button>
                <button className="p-1 hover:bg-gray-200 rounded">≡</button>

                {/* Separador */}
                <div className="h-6 border-l mx-2"></div>

                {/* Grupo 4: Desplegables */}
                <select className="text-sm border rounded p-1 bg-white mx-1">
                  <option>Format</option>
                  <option>Paragraph</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                  <option>Heading 3</option>
                </select>

                <select className="text-sm border rounded p-1 bg-white mx-1">
                  <option>Select font size</option>
                  <option>10px</option>
                  <option>12px</option>
                  <option>14px</option>
                  <option>16px</option>
                  <option>18px</option>
                </select>

                <select className="text-sm border rounded p-1 bg-white mx-1">
                  <option>Select font family</option>
                  <option>Arial</option>
                  <option>Helvetica</option>
                  <option>Times New Roman</option>
                  <option>Courier New</option>
                </select>
              </div>

              <textarea
                className="w-full border rounded-md p-2.5 min-h-[170px] focus:outline-none focus:ring-1 focus:ring-[#6419e6] focus:border-transparent text-sm"
                placeholder="Escriba su mensaje aquí..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>
          </div>

          <div className="p-3.5 border-t flex justify-end">
            <div className="flex gap-3.5">
              <Button variant="outline" onClick={onClose} className="h-8 text-sm px-3.5">
                Cancelar
              </Button>
              <Button
                className="bg-[#6419e6] hover:bg-[#5314c5] h-8 text-sm px-3.5"
                onClick={handleSendMessage}
                disabled={!to.trim() || !subject.trim() || !messageContent.trim()}
              >
                Enviar mensaje
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
