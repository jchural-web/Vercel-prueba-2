"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { FileText, Minus, Move, Check } from "lucide-react"
import { usePathname } from "next/navigation"

export function ComentarioActividadAtencionClienteButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [comentario, setComentario] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showButton, setShowButton] = useState(false)
  const [activeTab, setActiveTab] = useState("pagos")
  const [categoriaPagos, setCategoriaPagos] = useState("")
  const [categoriaAcademico, setCategoriaAcademico] = useState("")
  const notepadRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartPosRef = useRef({ x: 0, y: 0 })
  const pathname = usePathname()

  // Opciones para los desplegables
  const opcionesPagos = [
    "Se comprometió a pagar",
    "Se comprometió a pagar y no responde",
    "Se comprometió a pagar y no paga / Asume nuevo compromiso",
    "Se comprometió a pagar y no paga / No asume nuevo compromiso",
    "Confirma que realizó pago envió el voucher",
    "Confirma que realizó pago va a enviar el voucher",
    "No tiene accesos a medio de pago",
    "Tiene problemas para pagar por el sitio web",
    "Tiene problemas personales que no le permiten hacer el pago",
    "Solicita retiro con devolución",
    "Solicita retiro sin devolución",
    "Solicita modificación de cronograma de pagos",
    "Indica que pagará su empresa (cliente corporativo)",
    "Indica que no pagará",
    "Otros",
  ]

  const opcionesAcademico = [
    "Solicita reprogramación de evaluaciones",
    "Confirma asistencia a webinar",
    "Solicita cambio de modalidad",
    "Solicita cambio de centro de costos",
    "Solicita reserva de matrícula",
    "Solicita constancia de matrícula",
    "Todas las autoevaluaciones finalizadas",
    "Entrega de proyecto final pendiente",
    "Proyecto final pendiente de calificación",
    "No puede asistir Recupera en clase virtual",
    "No puede asistir recupera en clase presencial",
    "Confirmación de recepción de certificado BSGI",
    "Curso presencial pendiente",
    "Solicita cambio de versión",
    "Curso asincrónico pendiente",
    "Otros",
  ]

  // Check if we're on a contact detail page - ONLY show on specific contact detail pages
  // This ensures the button only appears after clicking "Ejecutar" and not on the main agenda screen
  const isContactDetailPage =
    pathname?.includes("/atencion-cliente/gestion/agenda/contacto-entrante/") &&
    pathname?.split("/").length > 5 &&
    !pathname?.endsWith("/contacto-entrante") &&
    !pathname?.endsWith("/agenda")

  // Initialize position on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({ x: window.innerWidth - 400, y: 100 })
    }
  }, [])

  // Add a new useEffect to set the button visibility based on the current page
  useEffect(() => {
    // Check if we're on a contact detail page
    if (isContactDetailPage) {
      // Make sure the button is visible when on a contact detail page
      setShowButton(true)
    } else {
      setShowButton(false)
    }

    // This effect should run whenever the pathname changes
  }, [pathname, isContactDetailPage])

  // Add and remove event listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current && notepadRef.current) {
        const newX = e.clientX - dragStartPosRef.current.x
        const newY = e.clientY - dragStartPosRef.current.y

        // Keep the notepad within the viewport
        const maxX = window.innerWidth - notepadRef.current.offsetWidth
        const maxY = window.innerHeight - notepadRef.current.offsetHeight

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        })
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isOpen])

  // If button shouldn't be shown, return null
  if (!showButton) {
    return null
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (notepadRef.current) {
      isDraggingRef.current = true
      dragStartPosRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      }

      // Prevent text selection during drag
      e.preventDefault()
    }
  }

  const handleSave = () => {
    // Aquí iría la lógica para guardar el comentario
    console.log({
      tipo: activeTab,
      categoria: activeTab === "pagos" ? categoriaPagos : categoriaAcademico,
      comentario,
    })

    // Cerrar después de guardar
    setIsOpen(false)

    // Resetear los campos
    setComentario("")
    setCategoriaPagos("")
    setCategoriaAcademico("")
  }

  return (
    <>
      <button
        onClick={toggleOpen}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white shadow-lg transition-all hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
        aria-label="Comentario Actividad"
      >
        <FileText className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          ref={notepadRef}
          className="fixed z-50 w-[400px] rounded-lg shadow-xl flex flex-col"
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
          }}
        >
          <div
            className="flex items-center justify-between rounded-t-lg bg-orange-400 px-4 py-3 cursor-move"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center">
              <Move className="h-4 w-4 text-white mr-2" />
              <h3 className="text-lg font-medium text-white">Comentario Actividad</h3>
            </div>
            <button onClick={toggleOpen} className="text-white hover:text-gray-200" aria-label="Cerrar">
              <Minus className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-yellow-50 p-4 flex-grow flex flex-col">
            {/* Tabs para Pagos y Académico */}
            <div className="flex mb-4">
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-t-lg ${
                  activeTab === "pagos"
                    ? "bg-green-100 text-green-700 border-b-2 border-green-500"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("pagos")}
              >
                Pagos
              </button>
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-t-lg ${
                  activeTab === "academico"
                    ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("academico")}
              >
                Académico
              </button>
            </div>

            {/* Contenido de la pestaña Pagos */}
            {activeTab === "pagos" && (
              <div className="mb-4">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={categoriaPagos}
                    onChange={(e) => setCategoriaPagos(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Seleccione</option>
                    {opcionesPagos.map((opcion, index) => (
                      <option key={`pago-${index}`} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Contenido de la pestaña Académico */}
            {activeTab === "academico" && (
              <div className="mb-4">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={categoriaAcademico}
                    onChange={(e) => setCategoriaAcademico(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Seleccione</option>
                    {opcionesAcademico.map((opcion, index) => (
                      <option key={`academico-${index}`} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Campo de comentario común para ambas pestañas */}
            <div className="mb-4 flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Ingrese un comentario"
                className="w-full h-32 resize-none rounded border border-gray-300 p-3 focus:border-orange-400 focus:outline-none"
                maxLength={500}
              ></textarea>
              <div className="mt-1 text-right">
                <span className="text-xs text-gray-500">{comentario.length}/500</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={toggleOpen}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cerrar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
              >
                <Check className="h-4 w-4 mr-1" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
