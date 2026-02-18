"use client"

import type React from "react"

import { useState } from "react"
import { Portal } from "./portal"
import { X } from "lucide-react"
import { Button } from "./ui/button"

interface RegistroSolicitudModalProps {
  isOpen: boolean
  onClose: () => void
  programaActual?: string
}

export function RegistroSolicitudModal({
  isOpen,
  onClose,
  programaActual = "Curso Oficial de Preparación para el Examen Project Management Professional (PMP)®",
}: RegistroSolicitudModalProps) {
  const [formData, setFormData] = useState({
    tipoSolicitud: "",
    categoria: "",
    problema: "",
    origen: "",
    descripcionSolucion: "",
    curso: "",
    detalleSolicitud: "",
    archivoSolicitud: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, archivoSolicitud: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos de solicitud enviados:", formData)
    // Aquí iría la lógica para enviar los datos
    onClose()
  }

  if (!isOpen) return null

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-md shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#FF6B00] text-white px-6 py-3 flex justify-between items-center flex-shrink-0">
            <h2 className="text-xl font-medium">Registro Solicitud</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form - con scroll si es necesario */}
          <div className="overflow-y-auto p-5">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {/* Tipo de Solicitud y Categoría en la misma línea */}
                <div>
                  <label htmlFor="tipoSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Solicitud
                  </label>
                  <select
                    id="tipoSolicitud"
                    name="tipoSolicitud"
                    value={formData.tipoSolicitud}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="solicitud">Solicitud</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="queja">Queja</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="academica">Académica</option>
                    <option value="administrativa">Administrativa</option>
                    <option value="financiera">Financiera</option>
                    <option value="tecnica">Técnica</option>
                  </select>
                </div>

                {/* Problema y Origen en la misma línea */}
                <div>
                  <label htmlFor="problema" className="block text-sm font-medium text-gray-700 mb-1">
                    Problema
                  </label>
                  <select
                    id="problema"
                    name="problema"
                    value={formData.problema}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="acceso">Problemas de acceso</option>
                    <option value="contenido">Contenido del curso</option>
                    <option value="certificado">Certificado</option>
                    <option value="pago">Pagos</option>
                    <option value="plataforma">Plataforma</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="origen" className="block text-sm font-medium text-gray-700 mb-1">
                    Origen:
                  </label>
                  <select
                    id="origen"
                    name="origen"
                    value={formData.origen}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="llamada">Llamada</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="portal">Portal Web</option>
                  </select>
                </div>

                {/* Descripción de la Solución */}
                <div className="col-span-2">
                  <label htmlFor="descripcionSolucion" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción de la Solución
                  </label>
                  <textarea
                    id="descripcionSolucion"
                    name="descripcionSolucion"
                    value={formData.descripcionSolucion}
                    onChange={handleInputChange}
                    placeholder="Seleccione un problema"
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 h-20"
                  ></textarea>
                </div>

                {/* Programa y Curso en la misma línea */}
                <div>
                  <label htmlFor="programa" className="block text-sm font-medium text-gray-700 mb-1">
                    Programa
                  </label>
                  <input
                    type="text"
                    id="programa"
                    name="programa"
                    value={programaActual}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 bg-gray-50 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="curso" className="block text-sm font-medium text-gray-700 mb-1">
                    Curso
                  </label>
                  <select
                    id="curso"
                    name="curso"
                    value={formData.curso}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="curso1">Módulo 1: Introducción a la Gestión de Proyectos</option>
                    <option value="curso2">Módulo 2: Procesos de Iniciación</option>
                    <option value="curso3">Módulo 3: Procesos de Planificación</option>
                    <option value="curso4">Módulo 4: Procesos de Ejecución</option>
                  </select>
                </div>

                {/* Detalle Solicitud */}
                <div className="col-span-2">
                  <label htmlFor="detalleSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                    Detalle Solicitud
                  </label>
                  <textarea
                    id="detalleSolicitud"
                    name="detalleSolicitud"
                    value={formData.detalleSolicitud}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 h-24"
                  ></textarea>
                </div>

                {/* Archivo Solicitud */}
                <div className="col-span-2">
                  <label htmlFor="archivoSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                    Archivo Solicitud
                  </label>
                  <div className="flex items-center">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-l-md border border-gray-300 text-sm">
                      Seleccione
                      <input
                        type="file"
                        id="archivoSolicitud"
                        name="archivoSolicitud"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <div className="flex-1 border border-l-0 border-gray-300 rounded-r-md px-3 py-1.5 text-gray-500 text-sm truncate">
                      {formData.archivoSolicitud
                        ? formData.archivoSolicitud.name
                        : "Suelta archivos aquí para seleccionar"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-5">
                <Button type="submit" className="bg-[#007bff] hover:bg-[#0069d9] text-white px-6 py-1.5">
                  Aceptar
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="border-[#007bff] text-[#007bff] hover:bg-[#007bff]/10 px-6 py-1.5"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Portal>
  )
}
