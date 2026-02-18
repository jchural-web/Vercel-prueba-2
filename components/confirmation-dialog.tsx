"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  message: string
  title?: string
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "Confirmación",
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Cerrar el diálogo al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        {/* Encabezado */}
        <div className="bg-orange-500 text-white px-4 py-3 flex justify-between items-center">
          <h3 className="font-medium">{title}</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <p className="text-gray-700 mb-6">{message}</p>

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
