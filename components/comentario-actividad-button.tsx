"use client"

import type React from "react"
import { useState, useContext, useRef, useEffect } from "react"
import { FileText, Minus, Move } from "lucide-react"
import { ComentarioContext } from "@/contexts/comentario-context"
import { usePathname } from "next/navigation"

export function ComentarioActividadButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [comentario, setComentario] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const notepadRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartPosRef = useRef({ x: 0, y: 0 })
  const pathname = usePathname()

  // Intentar obtener el contexto, pero no fallar si no existe
  const context = useContext(ComentarioContext)

  // Check if we're on a contact detail page - ONLY show on specific contact detail pages
  // This ensures the button only appears after clicking "Ejecutar" and not on the main agenda screen
  const isContactDetailPage =
    pathname?.includes("/gestion-comercial/agenda/contacto-entrante/") &&
    pathname?.split("/").length > 4 &&
    !pathname?.endsWith("/contacto-entrante") &&
    !pathname?.endsWith("/agenda")

  // Initialize position on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({ x: window.innerWidth - 350, y: 100 })
    }
  }, [])

  // Add a new useEffect to set the button visibility based on the current page
  useEffect(() => {
    // Check if we're on a contact detail page
    if (isContactDetailPage && context?.setShowComentarioButton) {
      // Make sure the button is visible when on a contact detail page
      context.setShowComentarioButton(true)
    }

    // This effect should run whenever the pathname changes
  }, [pathname, context])

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

  // If context doesn't exist or button shouldn't be shown, or we're not on a contact detail page, return null
  if (!context || !context.showComentarioButton || !isContactDetailPage) {
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
          className="fixed z-50 w-[350px] h-[350px] rounded-lg shadow-xl flex flex-col"
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
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Ingrese un comentario"
              className="w-full h-full resize-none rounded border border-gray-300 p-3 focus:border-orange-400 focus:outline-none flex-grow"
              maxLength={500}
            ></textarea>
            <div className="mt-2">
              <span className="text-sm text-gray-500">{comentario.length}/500</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
