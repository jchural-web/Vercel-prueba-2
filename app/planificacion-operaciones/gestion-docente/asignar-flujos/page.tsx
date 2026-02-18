"use client"

import type React from "react"

import { useState, Suspense } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  GitBranch,
  Lightbulb,
  Search,
  Filter,
  Plus,
  X,
} from "lucide-react"

interface Flujo {
  id: number
  nombre: string
  descripcion: string
  categoria: "Ejecución de Curso" | "General"
  actividades: number
  estado: "ACTIVO" | "INACTIVO"
  asignado: boolean
}

interface Docente {
  id: number
  nombre: string
  programa: string
  cursos: number
  sesionesTotales: number
  flujos: Flujo[]
}

const allAvailableFlujos: Omit<Flujo, "asignado">[] = [
  {
    id: 1,
    nombre: "Confirmación de Sesión",
    descripcion: "Asegurar confirmación 24h antes",
    categoria: "Ejecución de Curso",
    actividades: 6,
    estado: "ACTIVO",
  },
  {
    id: 2,
    nombre: "Recordatorio Subida Notas",
    descripcion: "Recordar subir notas post-sesión",
    categoria: "Ejecución de Curso",
    actividades: 4,
    estado: "ACTIVO",
  },
  {
    id: 3,
    nombre: "Reporte Semanal",
    descripcion: "Envío cada lunes 9am",
    categoria: "General",
    actividades: 2,
    estado: "INACTIVO",
  },
  {
    id: 4,
    nombre: "Envío Material Didáctico",
    descripcion: "7 días antes sesión inicial",
    categoria: "Ejecución de Curso",
    actividades: 3,
    estado: "ACTIVO",
  },
  {
    id: 5,
    nombre: "Encuesta de Satisfacción",
    descripcion: "Enviar encuesta post-curso",
    categoria: "General",
    actividades: 2,
    estado: "ACTIVO",
  },
  {
    id: 6,
    nombre: "Recordatorio de Asistencia",
    descripcion: "Notificar 2h antes de sesión",
    categoria: "Ejecución de Curso",
    actividades: 3,
    estado: "ACTIVO",
  },
]

function AsignarFlujosContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedDocentes, setExpandedDocentes] = useState<number[]>([1])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null)
  const [selectedFlujosToAdd, setSelectedFlujosToAdd] = useState<number[]>([])

  const [docentes, setDocentes] = useState<Docente[]>([
    {
      id: 1,
      nombre: "Juan Pérez",
      programa: "Gestión de Proyectos",
      cursos: 3,
      sesionesTotales: 24,
      flujos: [
        {
          id: 1,
          nombre: "Confirmación de Sesión",
          descripcion: "Asegurar confirmación 24h antes",
          categoria: "Ejecución de Curso",
          actividades: 6,
          estado: "ACTIVO",
          asignado: true,
        },
        {
          id: 2,
          nombre: "Recordatorio Subida Notas",
          descripcion: "Recordar subir notas post-sesión",
          categoria: "Ejecución de Curso",
          actividades: 4,
          estado: "ACTIVO",
          asignado: true,
        },
        {
          id: 3,
          nombre: "Reporte Semanal",
          descripcion: "Envío cada lunes 9am",
          categoria: "General",
          actividades: 2,
          estado: "INACTIVO",
          asignado: false,
        },
        {
          id: 4,
          nombre: "Envío Material Didáctico",
          descripcion: "7 días antes sesión inicial",
          categoria: "Ejecución de Curso",
          actividades: 3,
          estado: "ACTIVO",
          asignado: true,
        },
      ],
    },
    {
      id: 2,
      nombre: "María García",
      programa: "Marketing Digital",
      cursos: 2,
      sesionesTotales: 16,
      flujos: [
        {
          id: 1,
          nombre: "Confirmación de Sesión",
          descripcion: "Asegurar confirmación 24h antes",
          categoria: "Ejecución de Curso",
          actividades: 6,
          estado: "ACTIVO",
          asignado: true,
        },
        {
          id: 2,
          nombre: "Recordatorio Subida Notas",
          descripcion: "Recordar subir notas post-sesión",
          categoria: "Ejecución de Curso",
          actividades: 4,
          estado: "ACTIVO",
          asignado: false,
        },
      ],
    },
    {
      id: 3,
      nombre: "Carlos López",
      programa: "Finanzas Corporativas",
      cursos: 4,
      sesionesTotales: 32,
      flujos: [
        {
          id: 1,
          nombre: "Confirmación de Sesión",
          descripcion: "Asegurar confirmación 24h antes",
          categoria: "Ejecución de Curso",
          actividades: 6,
          estado: "ACTIVO",
          asignado: true,
        },
      ],
    },
  ])

  const toggleDocente = (docenteId: number) => {
    setExpandedDocentes((prev) =>
      prev.includes(docenteId) ? prev.filter((id) => id !== docenteId) : [...prev, docenteId],
    )
  }

  const toggleFlujoAsignado = (docenteId: number, flujoId: number) => {
    setDocentes((prev) =>
      prev.map((docente) => {
        if (docente.id === docenteId) {
          return {
            ...docente,
            flujos: docente.flujos.map((flujo) => {
              if (flujo.id === flujoId) {
                return { ...flujo, asignado: !flujo.asignado }
              }
              return flujo
            }),
          }
        }
        return docente
      }),
    )
  }

  const openAddModal = (docente: Docente, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedDocente(docente)
    setSelectedFlujosToAdd([])
    setIsModalOpen(true)
  }

  const getUnassignedFlujos = (docente: Docente) => {
    const assignedIds = docente.flujos.map((f) => f.id)
    return allAvailableFlujos.filter((f) => !assignedIds.includes(f.id))
  }

  const handleAddFlujos = () => {
    if (!selectedDocente) return

    const flujosToAdd = allAvailableFlujos
      .filter((f) => selectedFlujosToAdd.includes(f.id))
      .map((f) => ({ ...f, asignado: true }))

    setDocentes((prev) =>
      prev.map((docente) => {
        if (docente.id === selectedDocente.id) {
          return {
            ...docente,
            flujos: [...docente.flujos, ...flujosToAdd],
          }
        }
        return docente
      }),
    )

    setIsModalOpen(false)
    setSelectedDocente(null)
    setSelectedFlujosToAdd([])
  }

  const toggleFlujoSelection = (flujoId: number) => {
    setSelectedFlujosToAdd((prev) =>
      prev.includes(flujoId) ? prev.filter((id) => id !== flujoId) : [...prev, flujoId],
    )
  }

  const filteredDocentes = docentes.filter(
    (docente) =>
      docente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.programa.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#2c3e50]">Asignar Flujos a Docentes</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar docente por nombre o programa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6419e6] focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </button>
            <button className="px-4 py-2 bg-[#6419e6] text-white rounded-lg hover:bg-[#5315c4] transition-colors font-medium">
              Buscar
            </button>
          </div>
        </div>

        {/* Docentes List */}
        <div className="space-y-4">
          {filteredDocentes.map((docente) => (
            <div key={docente.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Docente Header */}
              <button
                onClick={() => toggleDocente(docente.id)}
                className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-left hover:bg-[#d4e9fa] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#6419e6] text-white p-2 rounded-full">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[#6419e6] font-semibold text-lg">Docente: {docente.nombre}</h3>
                    <p className="text-gray-600 text-sm">
                      Programa: {docente.programa} • {docente.cursos} cursos • {docente.sesionesTotales} sesiones
                      totales
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => openAddModal(docente, e)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#6419e6] text-white rounded-lg hover:bg-[#5315c4] transition-colors font-medium text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-[#6419e6] transition-transform ${expandedDocentes.includes(docente.id) ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>

              {/* Flujos Table */}
              {expandedDocentes.includes(docente.id) && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#f0f8ff]">
                          <th className="px-4 py-3 text-left font-medium text-gray-500 w-10">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-[#6419e6] focus:ring-[#6419e6]"
                              checked={docente.flujos.every((f) => f.asignado)}
                              onChange={() => {
                                const allAssigned = docente.flujos.every((f) => f.asignado)
                                setDocentes((prev) =>
                                  prev.map((d) => {
                                    if (d.id === docente.id) {
                                      return {
                                        ...d,
                                        flujos: d.flujos.map((f) => ({ ...f, asignado: !allAssigned })),
                                      }
                                    }
                                    return d
                                  }),
                                )
                              }}
                            />
                          </th>
                          <th className="px-4 py-3 text-left font-medium text-gray-500">Flujo</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-500">Categoría</th>
                          <th className="px-4 py-3 text-center font-medium text-gray-500">Actividades</th>
                          <th className="px-4 py-3 text-center font-medium text-gray-500">Estado</th>
                          <th className="px-4 py-3 text-center font-medium text-gray-500">Asignado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {docente.flujos.map((flujo, index) => (
                          <tr
                            key={flujo.id}
                            className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
                          >
                            <td className="px-4 py-3 border-b">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-[#6419e6] focus:ring-[#6419e6]"
                                checked={flujo.asignado}
                                onChange={() => toggleFlujoAsignado(docente.id, flujo.id)}
                              />
                            </td>
                            <td className="px-4 py-3 border-b">
                              <div>
                                <span className="font-medium text-gray-900">{flujo.nombre}</span>
                                <p className="text-gray-500 text-xs mt-0.5">{flujo.descripcion}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 border-b">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                                  flujo.categoria === "Ejecución de Curso"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-gray-50 text-gray-700 border-gray-200"
                                }`}
                              >
                                {flujo.categoria}
                              </span>
                            </td>
                            <td className="px-4 py-3 border-b text-center">
                              <span className="font-medium text-gray-700">{flujo.actividades}</span>
                            </td>
                            <td className="px-4 py-3 border-b text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                  flujo.estado === "ACTIVO" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                              >
                                {flujo.estado}
                              </span>
                            </td>
                            <td className="px-4 py-3 border-b text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                  flujo.asignado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                              >
                                {flujo.asignado ? "✓ SÍ" : "✗ NO"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Note */}
                  <div className="mx-4 my-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      <span className="font-medium">Nota:</span> Los flujos de categoría "GENERAL" son flujos
                      personalizables según necesidad. Los de "EJECUCIÓN DE CURSO" se aplican según su referencia
                      temporal (Inicial/Intermedia/Final/Todas).
                    </p>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Página</span>
                      <div className="w-12 h-8 border border-gray-200 rounded flex items-center justify-center bg-white">
                        <input type="text" defaultValue="1" className="w-full h-full text-center text-sm" readOnly />
                      </div>
                      <span className="text-sm text-gray-600">de 1</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <select className="h-8 pl-3 pr-8 border border-gray-200 rounded appearance-none bg-white text-sm">
                          <option>10</option>
                          <option>20</option>
                          <option>50</option>
                        </select>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="h-3 w-3" />
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">items por página</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
                        <ChevronsLeft className="h-4 w-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-600 mx-2">
                        1 - {docente.flujos.length} de {docente.flujos.length} items
                      </span>
                      <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
                        <ChevronsRight className="h-4 w-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 ml-2">
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedDocente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#7c3aed] px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Agregar Flujos</h2>
                <p className="text-white/80 text-sm">Docente: {selectedDocente.nombre}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {getUnassignedFlujos(selectedDocente).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <GitBranch className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No hay flujos disponibles para agregar.</p>
                  <p className="text-sm">Todos los flujos ya están asignados a este docente.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getUnassignedFlujos(selectedDocente).map((flujo) => (
                    <div
                      key={flujo.id}
                      onClick={() => toggleFlujoSelection(flujo.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedFlujosToAdd.includes(flujo.id)
                          ? "border-[#6419e6] bg-[#f3e8ff]"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedFlujosToAdd.includes(flujo.id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleFlujoSelection(flujo.id)}
                          className="h-4 w-4 mt-1 rounded border-gray-300 text-[#6419e6] focus:ring-[#6419e6]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{flujo.nombre}</h4>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                flujo.estado === "ACTIVO" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}
                            >
                              {flujo.estado}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mt-1">{flujo.descripcion}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                                flujo.categoria === "Ejecución de Curso"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                              }`}
                            >
                              {flujo.categoria}
                            </span>
                            <span className="text-xs text-gray-500">{flujo.actividades} actividades</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddFlujos}
                disabled={selectedFlujosToAdd.length === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFlujosToAdd.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#6419e6] text-white hover:bg-[#5315c4]"
                }`}
              >
                Agregar {selectedFlujosToAdd.length > 0 && `(${selectedFlujosToAdd.length})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AsignarFlujosPage() {
  return (
    <Suspense fallback={null}>
      <AsignarFlujosContent />
    </Suspense>
  )
}
