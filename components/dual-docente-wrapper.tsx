"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DualDocenteWrapperProps {
  children: React.ReactNode
}

export function DualDocenteWrapper({ children }: DualDocenteWrapperProps) {
  const [selectedDocente, setSelectedDocente] = useState<"ana" | "carlos">("ana")
  const router = useRouter()

  const docentes = [
    { id: "ana", nombre: "Ana Martinez", pais: "colombia" },
    { id: "carlos", nombre: "Carlos Rodríguez", pais: "peru" },
  ]

  const currentDocente = docentes.find((d) => d.id === selectedDocente)

  return (
    <div className="w-full">
      {/* Header con selector de docente */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {/* Bandera del docente actual */}
          <div className="w-6 h-6 rounded-full overflow-hidden flex">
            {currentDocente?.pais === "colombia" ? (
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
          <span className="text-lg font-semibold text-gray-800">{currentDocente?.nombre}</span>
        </div>

        {/* Dropdown para cambiar docente */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-700 border-gray-300 bg-transparent"
            >
              Cambiar Docente
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {docentes.map((docente) => (
              <DropdownMenuItem
                key={docente.id}
                onClick={() => setSelectedDocente(docente.id as "ana" | "carlos")}
                className={selectedDocente === docente.id ? "bg-purple-50" : ""}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex flex-shrink-0">
                    {docente.pais === "colombia" ? (
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
                  <span className="text-sm">{docente.nombre}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Contenido dinámico basado en el docente seleccionado */}
      <div key={selectedDocente}>{children}</div>
    </div>
  )
}
