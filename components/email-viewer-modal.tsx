"use client"

import { useState, useEffect } from "react"
import type React from "react"

import { X, Reply, ChevronDown, ChevronRight, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portal } from "./portal"
import { formatTimeToAMPM } from "@/lib/utils"

interface EmailMessage {
  id: string
  sender: {
    name: string
    email: string
    avatar?: string
  }
  recipient: {
    name: string
    email: string
  }
  subject: string
  content: string
  date: string
  isRead: boolean
}

interface EmailThread {
  id: string
  subject: string
  messages: EmailMessage[]
}

interface EmailViewerModalProps {
  isOpen: boolean
  onClose: () => void
  emailData: any
}

export function EmailViewerModal({ isOpen, onClose, emailData }: EmailViewerModalProps) {
  const [initialExpandedState, setInitialExpandedState] = useState<Record<string, boolean>>({})
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [ccValue, setCcValue] = useState("")
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [expandedMessages, setExpandedMessages] = useState<Record<string, boolean>>({})
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [expandedMessagesState, setExpandedMessagesState] = useState(initialExpandedState)

  useEffect(() => {
    if (!isOpen || !emailData) return

    const newState: Record<string, boolean> = {}
    const messages = [
      { id: "msg-1" },
      { id: "msg-2" },
      { id: "msg-3" },
      { id: "msg-4" },
    ]
    messages.forEach((msg, index) => {
      newState[msg.id] = index === messages.length - 1
    })
    setInitialExpandedState(newState)
    setExpandedMessagesState(newState)
  }, [isOpen, emailData])

  const toggleMessageExpansion = (messageId: string) => {
    setExpandedMessagesState((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles((prev) => [...prev, ...filesArray])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

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

  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template)
    setIsTemplateDropdownOpen(false)

    // Simular contenido de plantilla según la selección
    let templateContent = ""
    switch (template) {
      case "Respuesta - Solicitud de información adicional":
        templateContent = `Estimado Joseph,\n\nGracias por su mensaje. Para poder atender mejor su solicitud sobre el curso AWS, necesitaríamos que nos proporcione la siguiente información adicional:\n\n- Nivel de conocimientos previos\n- Disponibilidad horaria\n- Objetivos específicos de aprendizaje\n\nQuedamos atentos a su respuesta.\n\nSaludos cordiales,\nEquipo de Atención al Cliente`
        break
      case "Respuesta - Confirmación de recepción":
        templateContent = `Estimado Joseph,\n\nHemos recibido su mensaje y estamos trabajando en darle respuesta lo antes posible. Nos pondremos en contacto con usted en un plazo máximo de 24 horas.\n\nGracias por su paciencia.\n\nSaludos cordiales,\nEquipo de Atención al Cliente`
        break
      default:
        templateContent = `Estimado Joseph,\n\nGracias por su mensaje. Estamos procesando su solicitud y nos pondremos en contacto con usted a la brevedad.\n\nSaludos cordiales,\nEquipo de Atención al Cliente`
    }

    setReplyContent(templateContent)
  }

  const handleSendReply = () => {
    // Aquí iría la lógica para enviar el correo
    alert("Respuesta enviada con éxito")
    setIsReplying(false)
    setReplyContent("")
    setSelectedTemplate("")
    setCcValue("")
    setSelectedFiles([])
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

  // Función para truncar el contenido a 3 líneas
  const truncateContent = (content: string) => {
    // Dividir por <br/> y tomar solo las primeras 3 líneas
    const lines = content.split("<br/>")
    const firstThreeLines = lines.slice(0, 3).join("<br/>")

    // Si hay más de 3 líneas, añadir puntos suspensivos
    if (lines.length > 3) {
      return firstThreeLines + "..."
    }

    return firstThreeLines
  }

  // Función para formatear fechas y horas en formato AM/PM
  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return ""

    // Si ya tiene formato AM/PM, devolverlo tal cual
    if (dateTimeString.includes("AM") || dateTimeString.includes("PM")) {
      return dateTimeString
    }

    // Si tiene formato de fecha y hora separados por |
    if (dateTimeString.includes("|")) {
      const [date, time] = dateTimeString.split("|").map((part) => part.trim())
      return `${date} | ${formatTimeToAMPM(time)}`
    }

    // Si es solo hora
    if (dateTimeString.includes(":") && !dateTimeString.includes("/")) {
      return formatTimeToAMPM(dateTimeString)
    }

    return dateTimeString
  }

  // Early return if modal is not open or emailData is null
  if (!isOpen || !emailData) return null

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-3.5 border-b">
            <h2 className="text-md font-semibold text-[#6419e6]">{emailData.subject}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Información del correo */}
          <div className="p-3.5 border-b">
            <div className="grid grid-cols-[95px_1fr] gap-2 items-center">
              <span className="font-medium text-gray-700 text-sm">Remitente:</span>
              <div className="text-sm">{emailData.sender}</div>
            </div>

            <div className="grid grid-cols-[95px_1fr] gap-2 items-center mt-2">
              <span className="font-medium text-gray-700 text-sm">Destinatario:</span>
              <div className="text-sm">{emailData.recipient}</div>
            </div>

            <div className="grid grid-cols-[95px_1fr] gap-2 items-center mt-2">
              <span className="font-medium text-gray-700 text-sm">Asunto:</span>
              <div className="text-sm">{emailData.subject}</div>
            </div>
          </div>

          <div className="overflow-y-auto flex-grow">
            {/* Check if emailData is a conversation thread or a single email */}
            {emailData.messages ? (
              // Render conversation thread (multiple messages)
              <div className="divide-y">
                {emailData.messages.map((message: any) => (
                  <div 
                    key={message.id} 
                    className={`p-4 ${message.isOutgoing ? "bg-blue-50" : "bg-white"}`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3 ${getAvatarColor(message.sender)}`}
                        style={{ aspectRatio: "1/1" }}
                      >
                        {getInitials(message.sender)}
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="text-gray-500 text-xs">{message.date}</span>
                        </div>
                        {message.isOutgoing && (
                          <div className="text-xs text-gray-500 mb-1">Enviado</div>
                        )}

                        {/* Contenido del mensaje */}
                        <div className="text-sm">
                          <div dangerouslySetInnerHTML={{ __html: message.content }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Render single email (fallback for backward compatibility)
              <div className="divide-y">
                <div className="p-4 bg-white">
                  <div className="flex items-start">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3 ${getAvatarColor(emailData.sender)}`}
                      style={{ aspectRatio: "1/1" }}
                    >
                      {getInitials(emailData.sender)}
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{emailData.sender}</span>
                        <span className="text-gray-500 text-xs">{emailData.date || new Date().toLocaleString()}</span>
                      </div>

                      {/* Contenido del mensaje */}
                      <div className="text-sm">
                        <div dangerouslySetInnerHTML={{ __html: emailData.content }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección de respuesta */}
            {isReplying && (
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="font-medium text-[#6419e6] text-sm">Responder mensaje</h3>

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

                {/* Barra de herramientas de formato exactamente igual a la imagen */}
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
                  placeholder="Escriba su respuesta aquí..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />

                <div className="flex justify-end mt-2.5 space-x-2.5">
                  <Button variant="outline" onClick={() => setIsReplying(false)} className="h-8 text-sm px-3.5">
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#6419e6] hover:bg-[#5314c5] h-8 text-sm px-3.5"
                    onClick={handleSendReply}
                    disabled={!replyContent.trim()}
                  >
                    Enviar respuesta
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="p-3.5 border-t flex justify-end">
            {!isReplying && (
              <div className="flex gap-3.5">
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700 flex items-center h-8 text-sm px-3.5"
                  onClick={() => setIsReplying(true)}
                >
                  <Reply className="mr-1.5 h-3.5 w-3.5" />
                  Responder mensaje
                </Button>
                <Button variant="destructive" onClick={onClose} className="h-8 text-sm px-3.5">
                  Cerrar
                </Button>
              </div>
            )}
            {isReplying && (
              <Button variant="destructive" onClick={onClose} className="h-8 text-sm px-3.5">
                Cerrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </Portal>
  )
}
