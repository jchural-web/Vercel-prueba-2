"use client"

import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portal } from "./portal"

interface EmailEditorModalProps {
  isOpen: boolean
  onClose: () => void
  templateName: string
  recipientEmail: string
}

export function EmailEditorModal({ isOpen, onClose, templateName, recipientEmail }: EmailEditorModalProps) {
  const [emailSubject, setEmailSubject] = useState(`BSG Institute - ${templateName}`)
  const [emailTo, setEmailTo] = useState("")
  const [emailCc, setEmailCc] = useState("")
  const [emailContent, setEmailContent] = useState("")

  // Inicializar el correo del destinatario cuando se abre el modal
  useEffect(() => {
    if (isOpen && recipientEmail) {
      setEmailTo(recipientEmail)
    }
  }, [isOpen, recipientEmail])

  if (!isOpen) return null

  // Generar contenido de correo basado en la plantilla seleccionada
  const generateEmailContent = () => {
    return `
      <p><strong>Estimado(a) Prueba,</strong></p>
      <p>Según lo conversado le envío adjunto la carta de presentación de nuestro programa <strong>"Curso Oficial AWS Certified Solutions Architect - Associate"</strong> junto con la propuesta corporativa para "X" personas.</p>
      <p>Revísela por favor, estamos en contacto.</p>
      <p>Saludos,</p>
      <img src="/images/firma-email.png" alt="Firma" style="max-width: 200px;" />
    `
  }

  // Inicializar el contenido del correo cuando se abre el modal
  if (emailContent === "" && isOpen) {
    setEmailContent(generateEmailContent())
  }

  const handleSendEmail = () => {
    // Aquí iría la lógica para enviar el correo
    console.log("Enviando correo:", { emailTo, emailCc, emailSubject, emailContent })
    onClose()
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-[#6419e6]">Redactar Mensaje</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto flex-grow">
            {/* Asunto del correo */}
            <div>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Asunto"
              />
            </div>

            {/* Destinatario */}
            <div>
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Para:"
              />
            </div>

            {/* CC */}
            <div>
              <input
                type="text"
                value={emailCc}
                onChange={(e) => setEmailCc(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Cc:"
              />
            </div>

            {/* Selector de archivos */}
            <div className="flex items-center space-x-2">
              <button className="border rounded-md px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 flex items-center space-x-1">
                <Upload className="h-4 w-4" />
                <span>Select files...</span>
              </button>
              <span className="text-sm text-gray-500">Drop files here to select</span>
            </div>

            {/* Barra de herramientas del editor */}
            <div className="border rounded-md">
              <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <strong>B</strong>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <i>I</i>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <u>U</u>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">abc</button>
                <span className="mx-1">|</span>
                <button className="p-1 hover:bg-gray-200 rounded">
                  x<sub>2</sub>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  x<sup>2</sup>
                </button>
                <span className="mx-1">|</span>
                <button className="p-1 hover:bg-gray-200 rounded">≡</button>
                <button className="p-1 hover:bg-gray-200 rounded">≡</button>
                <button className="p-1 hover:bg-gray-200 rounded">≡</button>
                <button className="p-1 hover:bg-gray-200 rounded">≡</button>
                <span className="mx-1">|</span>
                <select className="border rounded p-1 text-xs">
                  <option>Format</option>
                </select>
                <select className="border rounded p-1 text-xs">
                  <option>Select font size</option>
                </select>
                <select className="border rounded p-1 text-xs">
                  <option>Select font family</option>
                </select>
              </div>

              {/* Contenido del correo */}
              <div
                className="p-4 min-h-[200px] max-h-[300px] overflow-y-auto"
                contentEditable
                dangerouslySetInnerHTML={{ __html: emailContent }}
                onBlur={(e) => setEmailContent(e.currentTarget.innerHTML)}
              />
            </div>
          </div>

          <div className="p-4 border-t flex justify-end space-x-2">
            <Button variant="destructive" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="default" onClick={handleSendEmail} className="bg-green-600 hover:bg-green-700">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  )
}
