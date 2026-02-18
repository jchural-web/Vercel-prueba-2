"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DualDocenteWrapper } from "@/components/dual-docente-wrapper"

export default function DualDocentePage() {
  const router = useRouter()
  const [selectedDocente, setSelectedDocente] = useState<"ana" | "carlos">("ana")

  const docentesData = {
    ana: {
      nombre: "Ana Martinez",
      pais: "colombia",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      curso: "Fundamentos de Base de Datos",
      horario: "Martes, Jueves 19:00-21:00 hora Perú",
      alumnado: "32 estudiantes",
      asignador: "María López",
      puntajeCurso: "4.0",
    },
    carlos: {
      nombre: "Carlos Rodriguez",
      pais: "peru",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      curso: "Introduccion a la Programacion",
      horario: "Martes, Jueves 19:00-21:00 hora Perú",
      alumnado: "32 estudiantes",
      asignador: "Ana García",
      puntajeCurso: "4.4",
    },
  }

  const currentDocente = docentesData[selectedDocente]

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <div className="flex items-center gap-3 ml-4">
              <div className="w-8 h-8 rounded-full overflow-hidden flex">
                {currentDocente.pais === "colombia" ? (
                  <>
                    <div className="w-full flex flex-col">
                      <div className="h-1/2 bg-yellow-400"></div>
                      <div className="h-1/4 bg-blue-600"></div>
                      <div className="h-1/4 bg-red-600"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-1/3 bg-red-600"></div>
                    <div className="w-1/3 bg-white"></div>
                    <div className="w-1/3 bg-red-600"></div>
                  </>
                )}
              </div>
              <span className="text-xl font-semibold text-gray-800">{currentDocente.nombre}</span>
            </div>
          </div>

          {/* Dropdown para seleccionar docente */}
          <div className="relative group">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-700 border-gray-300 bg-transparent"
            >
              Cambiar Docente
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
              {(["ana", "carlos"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedDocente(key)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-purple-50 ${
                    selectedDocente === key ? "bg-purple-100 border-r-4 border-purple-600" : ""
                  }`}
                >
                  <div className="w-5 h-5 rounded-full overflow-hidden flex flex-shrink-0">
                    {docentesData[key].pais === "colombia" ? (
                      <>
                        <div className="w-full flex flex-col">
                          <div className="h-1/2 bg-yellow-400"></div>
                          <div className="h-1/4 bg-blue-600"></div>
                          <div className="h-1/4 bg-red-600"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/3 bg-red-600"></div>
                        <div className="w-1/3 bg-white"></div>
                        <div className="w-1/3 bg-red-600"></div>
                      </>
                    )}
                  </div>
                  <span className="text-sm font-medium">{docentesData[key].nombre}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Información del Docente */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Información</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Centro de Costo</p>
              <p className="text-sm font-medium text-gray-800">{currentDocente.centroCosto}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Curso</p>
              <p className="text-sm font-medium text-gray-800">{currentDocente.curso}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Horario</p>
              <p className="text-sm font-medium text-gray-800">{currentDocente.horario}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Alumnado</p>
              <p className="text-sm font-medium text-gray-800">{currentDocente.alumnado}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Asignado Por</p>
              <p className="text-sm font-medium text-gray-800">{currentDocente.asignador}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Puntaje del Curso</p>
              <p className="text-sm font-medium text-gray-800">{currentDocente.puntajeCurso}</p>
            </div>
          </div>
        </div>

        {/* Placeholder para contenido futuro */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-600">Selecciona un docente para ver más detalles</p>
        </div>
      </div>
    </div>
  )
}
