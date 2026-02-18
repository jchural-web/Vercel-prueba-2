"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, BookOpen, Search, MessageSquare, CalendarDays, X, PlayCircle, AlertCircle, CheckCircle, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Plus, Star } from "lucide-react"
import { AgendaContainer, AgendaContentContainer, AgendaTableContainer } from "@/components/agenda-container"

export default function AgendaDocentesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("todos-docentes")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Pagination state for each tab
  const [todosCurrentPage, setTodosCurrentPage] = useState(1)
  const [todosItemsPerPage, setTodosItemsPerPage] = useState(5)
  const [alertaCurrentPage, setAlertaCurrentPage] = useState(1)
  const [alertaItemsPerPage, setAlertaItemsPerPage] = useState(5)
  const [mensajesCurrentPage, setMensajesCurrentPage] = useState(1)
  const [mensajesItemsPerPage, setMensajesItemsPerPage] = useState(5)

  const tabs = [
    {
      id: "todos-docentes",
      label: "Todos los Docentes",
      count: 10,
      icon: Users,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "alerta-ocurrencias",
      label: "Alerta de Ocurrencias",
      count: 1,
      icon: AlertCircle,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "mensajes-recibidos",
      label: "Mensajes Recibidos",
      count: 2,
      icon: MessageSquare,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "actividades-generales",
      label: "Flujos Generales",
      count: 2,
      icon: CheckCircle,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "recordatorio-notas",
      label: "Flujo de ejecución de Curso",
      count: 0,
      icon: FileText,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
  ]

  const docentes = [
    {
      id: "1",
      nombre: "Carlos Rodriguez",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      curso: "Introduccion a la Programacion",
      horario: "Martes, Jueves 19:00-21:00 hora Perú",
      alumnado: "32 estudiantes",
      ultimaComunicacion: "2024-11-15",
      ultimaComunicacionMedio: "whatsapp",
      ultimaComunicacionTipo: "Recibida",
      proximaComunicacion: "2024-11-20",
      estado: "Activo",
      asignador: "Ana García",
      actividad: "Llamada de seguimiento",
      pais: "peru",
      puntajeCurso: "4.4"
    },
    {
      id: "2",
      nombre: "Ana Martinez",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      curso: "Introduccion a la Programacion",
      horario: "Martes, Jueves 19:00-21:00 hora Perú",
      alumnado: "32 estudiantes",
      ultimaComunicacion: "2024-10-25",
      ultimaComunicacionMedio: "email",
      ultimaComunicacionTipo: "Enviada",
      proximaComunicacion: "2024-10-28",
      estado: "Activo",
      asignador: "María López",
      actividad: "Llamada de seguimiento",
      pais: "peru",
      puntajeCurso: "4.0"
    },
    {
      id: "3",
      nombre: "Luis García",
      centroCosto: "PI RCM ONLINE 2025 II AREQUIPA",
      curso: "Desarrollo Web Frontend",
      horario: "Lunes, Miércoles 18:00-20:00 hora Perú",
      alumnado: "28 estudiantes",
      ultimaComunicacion: "2024-11-18",
      ultimaComunicacionMedio: "llamada",
      ultimaComunicacionTipo: "Recibida",
      proximaComunicacion: "2024-11-22",
      estado: "Activo",
      asignador: "Ana García",
      actividad: "Envío de material",
      pais: "peru",
      puntajeCurso: "4.8"
    },
    {
      id: "4",
      nombre: "María Fernández",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      curso: "Diseño UX/UI",
      horario: "Martes, Jueves 20:00-22:00 hora Perú",
      alumnado: "25 estudiantes",
      ultimaComunicacion: "2024-11-10",
      ultimaComunicacionMedio: "whatsapp",
      ultimaComunicacionTipo: "Enviada",
      proximaComunicacion: "2024-11-15",
      estado: "Activo",
      asignador: "Pedro Sánchez",
      actividad: "Confirmación de sesión",
      pais: "colombia",
      puntajeCurso: "3.9"
    },
    {
      id: "5",
      nombre: "Jorge Pérez",
      centroCosto: "PI RCM ONLINE 2025 I CUSCO",
      curso: "Python Avanzado",
      horario: "Sábados 09:00-13:00 hora Perú",
      alumnado: "30 estudiantes",
      ultimaComunicacion: "2024-11-12",
      ultimaComunicacionMedio: "email",
      ultimaComunicacionTipo: "Recibida",
      proximaComunicacion: "2024-11-19",
      estado: "Activo",
      asignador: "María López",
      actividad: "Llamada de seguimiento",
      pais: "peru",
      puntajeCurso: "4.5"
    },
    {
      id: "6",
      nombre: "Carmen Ruiz",
      centroCosto: "PI RCM ONLINE 2025 II TRUJILLO",
      curso: "Machine Learning",
      horario: "Lunes, Miércoles 19:00-21:00 hora Perú",
      alumnado: "22 estudiantes",
      ultimaComunicacion: "2024-11-14",
      ultimaComunicacionMedio: "llamada",
      ultimaComunicacionTipo: "Enviada",
      proximaComunicacion: "2024-11-21",
      estado: "Activo",
      asignador: "Ana García",
      actividad: "Subida de notas",
      pais: "colombia",
      puntajeCurso: "4.7"
    },
    {
      id: "7",
      nombre: "Roberto Díaz",
      centroCosto: "PI RCM ONLINE 2025 II AREQUIPA",
      curso: "Arquitectura de Software",
      horario: "Martes, Jueves 18:00-20:00 hora Perú",
      alumnado: "20 estudiantes",
      ultimaComunicacion: "2024-11-08",
      ultimaComunicacionMedio: "whatsapp",
      ultimaComunicacionTipo: "Recibida",
      proximaComunicacion: "2024-11-15",
      estado: "Activo",
      asignador: "Pedro Sánchez",
      actividad: "Envío de material",
      pais: "peru",
      puntajeCurso: "4.2"
    },
    {
      id: "8",
      nombre: "Patricia López",
      centroCosto: "PI RCM ONLINE 2025 I PIURA",
      curso: "DevOps y CI/CD",
      horario: "Viernes 19:00-22:00 hora Perú",
      alumnado: "18 estudiantes",
      ultimaComunicacion: "2024-11-16",
      ultimaComunicacionMedio: "email",
      ultimaComunicacionTipo: "Enviada",
      proximaComunicacion: "2024-11-23",
      estado: "Activo",
      asignador: "María López",
      actividad: "Confirmación de sesión",
      pais: "colombia",
      puntajeCurso: "4.1"
    },
    {
      id: "9",
      nombre: "Fernando Castro",
      centroCosto: "PI RCM ONLINE 2025 II AREQUIPA",
      curso: "Seguridad Informática",
      horario: "Lunes, Miércoles 20:00-22:00 hora Perú",
      alumnado: "24 estudiantes",
      ultimaComunicacion: "2024-11-11",
      ultimaComunicacionMedio: "llamada",
      ultimaComunicacionTipo: "Recibida",
      proximaComunicacion: "2024-11-18",
      estado: "Activo",
      asignador: "Ana García",
      actividad: "Llamada de seguimiento",
      pais: "peru",
      puntajeCurso: "4.6"
    },
    {
      id: "10",
      nombre: "Elena Vargas",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      curso: "Data Analytics",
      horario: "Sábados 14:00-18:00 hora Perú",
      alumnado: "26 estudiantes",
      ultimaComunicacion: "2024-11-13",
      ultimaComunicacionMedio: "whatsapp",
      ultimaComunicacionTipo: "Enviada",
      proximaComunicacion: "2024-11-20",
      estado: "Activo",
      asignador: "Pedro Sánchez",
      actividad: "Subida de notas",
      pais: "colombia",
      puntajeCurso: "4.3"
    },
  ]

  return (
    <div className="flex-1 w-full overflow-auto bg-[#f8faff]">

      {/* Nav Tabs Container */}
      <AgendaContainer className="pt-6 md:pt-8 pb-0" withTopPadding={false} withBottomPadding={false}>
        <div className="flex justify-center">
          <div className="flex gap-4 py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all hover:shadow-md min-w-[140px] ${
                    isActive ? "bg-blue-600 text-white shadow-lg" : tab.color
                  }`}
                >
                  <div className="mb-2"><Icon className="h-5 w-5" /></div>
                  <span className="text-xs font-medium text-center">{tab.label} ({tab.count})</span>
                </button>
              )
            })}
          </div>
        </div>
      </AgendaContainer>

      {/* Main Content */}
      <AgendaContentContainer className="" withTopPadding={false}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mt-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
                {activeTab === "todos-docentes" ? "Todos los Docentes" :
                 activeTab === "alerta-ocurrencias" ? "Alerta de Ocurrencias" : 
                 activeTab === "mensajes-recibidos" ? "Mensajes Recibidos" :
                 activeTab === "actividades-generales" ? "Flujos Generales" :
                 activeTab === "recordatorio-notas" ? "Flujos de Ejecución de Cursos" :
                 "Todos los Docentes"}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar contacto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-auto"
                />
              </div>
              <Button variant="default" size="sm">
                Buscar
              </Button>
              {activeTab === "actividades-generales" && (
                <div></div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Todos los Docentes Tab Content */}
            {activeTab === "todos-docentes" && (
              <AgendaTableContainer>
                <table className="w-full agenda-table border border-gray-200">
                  <thead>
                    <tr style={{ backgroundColor: "#e3f2fd" }}>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Docente
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Información del Curso
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Última Comunicación
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Asignado Por
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {docentes.slice((todosCurrentPage - 1) * todosItemsPerPage, todosCurrentPage * todosItemsPerPage)
                      .filter(docente => docente.id !== "2") // Filtrar Ana Martinez como fila principal
                      .map((docente) => (
                      <tr key={docente.id} className="hover:bg-[#e3f2fd]/70">
                        {/* Docente Column */}
                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            {/* Primer Docente */}
                            <div className="flex items-center gap-2">
                              {/* Country Flag */}
                              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex">
                                {docente.pais === "peru" ? (
                                  <>
                                    <div className="w-1/3 bg-red-600"></div>
                                    <div className="w-1/3 bg-white"></div>
                                    <div className="w-1/3 bg-red-600"></div>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-full flex flex-col">
                                      <div className="h-1/2 bg-yellow-400"></div>
                                      <div className="h-1/4 bg-blue-600"></div>
                                      <div className="h-1/4 bg-red-600"></div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <span className="text-sm font-medium">{docente.nombre}</span>
                            </div>
                            
                            {/* Segundo Docente - solo para Carlos Rodriguez (id="1") */}
                            {docente.id === "1" && (
                              <div className="flex items-center gap-2">
                                {/* Country Flag - Peru */}
                                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex">
                                  <div className="w-1/3 bg-red-600"></div>
                                  <div className="w-1/3 bg-white"></div>
                                  <div className="w-1/3 bg-red-600"></div>
                                </div>
                                <span className="text-sm font-medium">Ana Martinez</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Información del Curso Column */}
                        <td className="px-6 py-5">
                          <div className="font-medium text-sm mb-2" style={{ color: "#9333ea" }}>
                            {docente.centroCosto}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">{docente.curso}</div>
                          <div className="text-sm text-gray-600">{docente.horario}</div>
                        </td>

                        {/* Última Comunicación Column */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 mb-2">
                            {docente.ultimaComunicacionMedio === "whatsapp" && (
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs shrink-0 flex items-center gap-1">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Whatsapp
                              </Badge>
                            )}
                            {docente.ultimaComunicacionMedio === "email" && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs shrink-0 flex items-center gap-1">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Correo
                              </Badge>
                            )}
                            {docente.ultimaComunicacionMedio === "llamada" && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200 text-xs shrink-0 flex items-center gap-1">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Llamada
                              </Badge>
                            )}
                            <Badge className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              docente.ultimaComunicacionTipo === "Recibida"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "bg-orange-100 text-orange-700 border border-orange-200"
                            }`}>
                              {docente.ultimaComunicacionTipo}
                            </Badge>
                          </div>
                          <div className="text-sm font-medium">
                            {(() => {
                              const [year, month, day] = docente.ultimaComunicacion.split("-")
                              return `${day}/${month}/${year}`
                            })()}
                          </div>
                        </td>

                        {/* Asignado Por Column */}
                        <td className="px-6 py-5">
                          <div className="text-center mb-3">
                            <span className="text-sm font-medium text-purple-600 block">{docente.asignador}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="xs"
                            className="rounded-full h-7 px-3 w-full bg-green-500 text-white hover:bg-green-600"
                            onClick={() => {
                              if (docente.id === "2") {
                                router.push(`/planificacion-operaciones/gestion-docente/agenda/dual`)
                              } else {
                                router.push(`/planificacion-operaciones/gestion-docente/agenda/${docente.id}`)
                              }
                            }}
                          >
                            <PlayCircle className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Ejecutar</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination */}
                <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-white rounded-b-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-gray-600">Página</span>
                    <div className="w-10 h-7 border border-gray-200 rounded flex items-center justify-center bg-white">
                      <input 
                        type="text" 
                        value={todosCurrentPage} 
                        onChange={(e) => {
                          const page = parseInt(e.target.value) || 1
                          const maxPage = Math.ceil(docentes.length / todosItemsPerPage)
                          setTodosCurrentPage(Math.min(Math.max(1, page), maxPage))
                        }}
                        className="w-full h-full text-center text-[14px]" 
                      />
                    </div>
                    <span className="text-[14px] text-gray-600">de {Math.ceil(docentes.length / todosItemsPerPage)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select 
                        value={todosItemsPerPage}
                        onChange={(e) => {
                          setTodosItemsPerPage(Number(e.target.value))
                          setTodosCurrentPage(1)
                        }}
                        className="h-7 pl-2 pr-6 border border-gray-200 rounded appearance-none bg-white text-[14px]"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="h-2.5 w-2.5" />
                      </div>
                    </div>
                    <span className="text-[14px] text-gray-600">items por página</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setTodosCurrentPage(1)}
                      disabled={todosCurrentPage === 1}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50"
                    >
                      <ChevronsLeft className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => setTodosCurrentPage(p => Math.max(1, p - 1))}
                      disabled={todosCurrentPage === 1}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[14px] text-gray-600 mx-2">
                      {(todosCurrentPage - 1) * todosItemsPerPage + 1} - {Math.min(todosCurrentPage * todosItemsPerPage, docentes.length)} de {docentes.length} items
                    </span>
                    <button 
                      onClick={() => setTodosCurrentPage(p => Math.min(Math.ceil(docentes.length / todosItemsPerPage), p + 1))}
                      disabled={todosCurrentPage >= Math.ceil(docentes.length / todosItemsPerPage)}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => setTodosCurrentPage(Math.ceil(docentes.length / todosItemsPerPage))}
                      disabled={todosCurrentPage >= Math.ceil(docentes.length / todosItemsPerPage)}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50"
                    >
                      <ChevronsRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </AgendaTableContainer>
            )}

            {/* Alerta de Ocurrencias Tab Content */}
            {activeTab === "alerta-ocurrencias" && (
              <AgendaTableContainer>
                <table className="w-full agenda-table border border-gray-200">
                  <thead>
                    <tr style={{ backgroundColor: "#e3f2fd" }}>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Docente
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Información del Curso
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Ocurrencia
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Última Comunicación
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Asignado Por
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-[#e3f2fd]/70">
                      {/* Docente Column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {/* Country Flag - Peru */}
                          <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex">
                            <div className="w-1/3 bg-red-600"></div>
                            <div className="w-1/3 bg-white"></div>
                            <div className="w-1/3 bg-red-600"></div>
                          </div>
                          <span className="text-sm font-medium">Carlos Rodriguez</span>
                        </div>
                      </td>
                      
                      {/* Información del Curso Column */}
                      <td className="px-6 py-5">
                        <div className="font-medium text-sm mb-2" style={{ color: "#9333ea" }}>
                          PI RCM ONLINE 2025 III LIMA
                        </div>
                        <div className="text-sm text-gray-600 mb-1">Introduccion a la Programacion</div>
                        <div className="text-sm text-gray-600">Martes, Jueves 19:00-21:00 hora Perú</div>
                      </td>
                      
                      {/* Ocurrencia Column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs mb-2">
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs shrink-0">
                            Actividad
                          </Badge>
                          <span className="text-gray-600">Confirmación de Sesión</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs shrink-0">
                            Ocurrencia
                          </Badge>
                          <span className="text-gray-600">Rechazó sesión</span>
                        </div>
                      </td>

                      {/* Última Comunicación Column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs shrink-0 flex items-center gap-1">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Whatsapp
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold">
                            Recibida
                          </Badge>
                        </div>
                        <div className="text-sm font-medium">2024-11-15</div>
                      </td>

                      {/* Asignado Por Column with Ejecutar button */}
                      <td className="px-6 py-5">
                        <div className="text-center mb-3">
                          <span className="text-sm font-medium text-purple-600 block">Ana García</span>
                        </div>
                        <Button
                          variant="outline"
                          size="xs"
                          className="rounded-full h-7 px-3 w-full bg-green-500 text-white hover:bg-green-600"
                          onClick={() => router.push("/planificacion-operaciones/gestion-docente/agenda/1")}
                        >
                          <PlayCircle className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">Ejecutar</span>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                {/* Pagination */}
                <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-white rounded-b-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-gray-600">Página</span>
                    <div className="w-10 h-7 border border-gray-200 rounded flex items-center justify-center bg-white">
                      <input type="text" value={alertaCurrentPage} readOnly className="w-full h-full text-center text-[14px]" />
                    </div>
                    <span className="text-[14px] text-gray-600">de 1</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select 
                        value={alertaItemsPerPage}
                        onChange={(e) => {
                          setAlertaItemsPerPage(Number(e.target.value))
                          setAlertaCurrentPage(1)
                        }}
                        className="h-7 pl-2 pr-6 border border-gray-200 rounded appearance-none bg-white text-[14px]"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="h-2.5 w-2.5" />
                      </div>
                    </div>
                    <span className="text-[14px] text-gray-600">items por página</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50">
                      <ChevronsLeft className="h-3.5 w-3.5" />
                    </button>
                    <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50">
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[14px] text-gray-600 mx-2">1 - 1 de 1 items</span>
                    <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50">
                      <ChevronsRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </AgendaTableContainer>
            )}

            {/* Mensajes Recibidos Tab Content */}
            {activeTab === "mensajes-recibidos" && (
              <AgendaTableContainer>
                <table className="w-full agenda-table border border-gray-200">
                  <thead>
                    <tr style={{ backgroundColor: "#e3f2fd" }}>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Docente
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Información del Curso
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Última Comunicación
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Asignado Por
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {docentes.slice(0, 2).map((docente) => (
                      <tr key={docente.id} className="hover:bg-[#e3f2fd]/70">
                        {/* Docente Column */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            {/* Country Flag */}
                            <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex">
                              {docente.pais === "peru" ? (
                                <>
                                  <div className="w-1/3 bg-red-600"></div>
                                  <div className="w-1/3 bg-white"></div>
                                  <div className="w-1/3 bg-red-600"></div>
                                </>
                              ) : (
                                <>
                                  <div className="w-full flex flex-col">
                                    <div className="h-1/2 bg-yellow-400"></div>
                                    <div className="h-1/4 bg-blue-600"></div>
                                    <div className="h-1/4 bg-red-600"></div>
                                  </div>
                                </>
                              )}
                            </div>
                            <span className="text-sm font-medium">{docente.nombre}</span>
                          </div>
                        </td>
                        
                        {/* Información del Curso Column */}
                        <td className="px-6 py-5">
                          <div className="font-medium text-sm mb-2" style={{ color: "#9333ea" }}>
                            {docente.centroCosto}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">{docente.curso}</div>
                          <div className="text-sm text-gray-600">{docente.horario}</div>
                        </td>
                        
                        {/* Última Comunicación Column */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs shrink-0 flex items-center gap-1">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              Whatsapp
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold">
                              {docente.ultimaComunicacionTipo}
                            </Badge>
                          </div>
                          <div className="text-sm font-medium">{docente.ultimaComunicacion}</div>
                        </td>

                        {/* Asignado Por Column with Ejecutar button */}
                        <td className="px-6 py-5">
                          <div className="text-center mb-3">
                            <span className="text-sm font-medium text-purple-600 block">{docente.asignador}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="xs"
                            className="rounded-full h-7 px-3 bg-green-500 text-white hover:bg-green-600"
                            onClick={() => router.push(`/planificacion-operaciones/gestion-docente/agenda/${docente.id}`)}
                          >
                            <PlayCircle className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Ejecutar</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination */}
                <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-white rounded-b-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-gray-600">Página</span>
                    <div className="w-10 h-7 border border-gray-200 rounded flex items-center justify-center bg-white">
                      <input type="text" value={mensajesCurrentPage} readOnly className="w-full h-full text-center text-[14px]" />
                    </div>
                    <span className="text-[14px] text-gray-600">de 1</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select 
                        value={mensajesItemsPerPage}
                        onChange={(e) => {
                          setMensajesItemsPerPage(Number(e.target.value))
                          setMensajesCurrentPage(1)
                        }}
                        className="h-7 pl-2 pr-6 border border-gray-200 rounded appearance-none bg-white text-[14px]"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="h-2.5 w-2.5" />
                      </div>
                    </div>
                    <span className="text-[14px] text-gray-600">items por página</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50">
                      <ChevronsLeft className="h-3.5 w-3.5" />
                    </button>
                    <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50">
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[14px] text-gray-600 mx-2">1 - 2 de 2 items</span>
                    <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50">
                      <ChevronsRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </AgendaTableContainer>
            )}

            {/* Actividades Generales Tab Content */}
            {activeTab === "actividades-generales" && (
              <AgendaTableContainer>
                <table className="w-full agenda-table border border-gray-200">
                  <thead>
                    <tr style={{ backgroundColor: "#e3f2fd" }}>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Docente
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Actividad General
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Última Comunicación
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Asignado Por
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {docentes.slice(0, 2).map((docente, index) => (
                      <tr key={docente.id} className="hover:bg-[#e3f2fd]/70">
                        {/* Docente Column */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            {/* Country Flag */}
                            <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex">
                              {docente.pais === "peru" ? (
                                <>
                                  <div className="w-1/3 bg-red-600"></div>
                                  <div className="w-1/3 bg-white"></div>
                                  <div className="w-1/3 bg-red-600"></div>
                                </>
                              ) : (
                                <>
                                  <div className="w-full flex flex-col">
                                    <div className="h-1/2 bg-yellow-400"></div>
                                    <div className="h-1/4 bg-blue-600"></div>
                                    <div className="h-1/4 bg-red-600"></div>
                                  </div>
                                </>
                              )}
                            </div>
                            <span className="text-sm font-medium">{docente.nombre}</span>
                          </div>
                        </td>

                        {/* Actividad General Column */}
                        <td className="px-6 py-5">
                          <div className="text-sm font-medium">
                            {index === 0 ? "Certificación PMI" : "Revisión de Material PMI"}
                          </div>
                        </td>

                        {/* Última Comunicación Column */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs shrink-0 flex items-center gap-1">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              Whatsapp
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold">
                              {docente.ultimaComunicacionTipo}
                            </Badge>
                          </div>
                          <div className="text-sm font-medium">{docente.ultimaComunicacion}</div>
                        </td>

                        {/* Asignado Por Column */}
                        <td className="px-6 py-5">
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-medium text-purple-600 mb-3">{docente.asignador}</span>
                            <Button
                              variant="outline"
                              size="xs"
                              className="rounded-full h-7 px-3 bg-green-500 text-white hover:bg-green-600"
                              onClick={() => router.push(`/planificacion-operaciones/gestion-docente/agenda-general/${docente.id}`)}
                            >
                              <PlayCircle className="h-3.5 w-3.5 mr-1" />
                              <span className="text-xs">Ejecutar</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AgendaTableContainer>
            )}
          </div>
        </div>
      </AgendaContentContainer>
    </div>
  )
}
