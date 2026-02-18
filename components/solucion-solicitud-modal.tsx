"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload } from "lucide-react"
import { useSolucionSolicitud } from "../contexts/solucion-solicitud-context"

export default function SolucionSolicitudModal() {
  const { isModalOpen, closeModal, handleSolucionSubmit } = useSolucionSolicitud()
  const [comentario, setComentario] = useState("")
  const [archivo, setArchivo] = useState<File | null>(null)
  const [nombreArchivo, setNombreArchivo] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isModalOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSolucionSubmit(comentario, archivo || undefined)
    setComentario("")
    setArchivo(null)
    setNombreArchivo("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setArchivo(file)
      setNombreArchivo(file.name)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#ff6b00]">
          <h2 className="text-lg font-semibold text-white">Gestión de Solicitud</h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-gray-100 focus:outline-none"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-1">
              Comentario de Solución:
            </label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adjuntar archivo:</label>
            <div className="flex items-center">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <button
                type="button"
                onClick={handleFileClick}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Upload size={16} className="inline-block mr-2" />
                Seleccionar archivo
              </button>
              {nombreArchivo && (
                <span className="ml-2 text-sm text-gray-600 truncate max-w-[200px]">{nombreArchivo}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#007bff]"
            >
              Guardar solución
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
