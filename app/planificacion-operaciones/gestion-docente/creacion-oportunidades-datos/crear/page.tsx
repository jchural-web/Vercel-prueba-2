"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle, ChevronDown, Users, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Lista de docentes disponibles
const docentesDisponibles = [
  { id: "1", nombre: "Carlos Rodriguez", centro: "Centro Lima" },
  { id: "2", nombre: "María García", centro: "Centro Arequipa" },
  { id: "3", nombre: "Juan Pérez", centro: "Centro Cusco" },
  { id: "4", nombre: "Ana López", centro: "Centro Lima" },
  { id: "5", nombre: "Pedro Martínez", centro: "Centro Trujillo" },
]

// Vinculación de cursos con docentes
const cursosDocentes: { [key: string]: string } = {
  "1": "1", // Fundamentos de Base de Datos -> Carlos Rodriguez
  "2": "2", // Diseño UX/UI -> María García
  "3": "3", // Python Avanzado -> Juan Pérez
  "4": "4", // Introducción a la Programación -> Ana López
  "5": "5", // Introducción a AWS -> Pedro Martínez
}

export default function CrearOportunidadPage() {
  const router = useRouter()
  const [isTipoOpen, setIsTipoOpen] = useState(true)
  const [searchDocente, setSearchDocente] = useState("")
  const [isDocenteDropdownOpen, setIsDocenteDropdownOpen] = useState(false)
  const [searchCurso, setSearchCurso] = useState("")
  const [isSearchFlujo, setIsSearchFlujo] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nuevoDocente, setNuevoDocente] = useState({
    tipoDocumento: "dni",
    nombres: "",
    apellidos: "",
    documento: "",
    pais: "",
    ciudad: "",
    correo: "",
    celular: "",
    fechaNacimiento: "",
  })

  // Lista de cursos disponibles
  const cursosDisponibles = [
    { id: "1", nombre: "Fundamentos de Base de Datos" },
    { id: "2", nombre: "Diseño UX/UI" },
    { id: "3", nombre: "Python Avanzado" },
    { id: "4", nombre: "Introducción a la Programación" },
    { id: "5", nombre: "Introducción a AWS" },
  ]

  // Lista de centros de costo disponibles
  const centrosCostoDisponibles = [
    { id: "1", nombre: "Programa Internacional de Gerencia de Proyectos" },
    { id: "2", nombre: "Curso en Integración de proyectos con BIM Collaborate Pro" },
    { id: "3", nombre: "Curso en MS Project para la gestión de proyectos BIM" },
    { id: "4", nombre: "Curso MS Project para la gestión de proyectos BIM" },
  ]

  // Lista de flujos disponibles
  const flujosDisponibles = [
    { id: "1", nombre: "Seguimiento de actividades Generales" },
    { id: "2", nombre: "Seguimiento de Docencia por Cronograma" },
    { id: "3", nombre: "Postulación a Docencia de Curso" },
  ]

  const [formData, setFormData] = useState({
    tipoOportunidad: "asignado-curso",
    centroCosto: "",
    docente: "",
    curso: "",
    flujo: "",
    fecha: "",
    hora: "",
  })

  const filteredDocentes = docentesDisponibles.filter(
    (docente) =>
      docente.nombre.toLowerCase().includes(searchDocente.toLowerCase()) ||
      docente.centro.toLowerCase().includes(searchDocente.toLowerCase())
  )

  const filteredCursos = cursosDisponibles.filter((curso) =>
    curso.nombre.toLowerCase().includes(searchCurso.toLowerCase())
  )

  const filteredFlujos = flujosDisponibles.filter((flujo) => {
    const searchLower = isSearchFlujo.toLowerCase()
    if (formData.tipoOportunidad === "asignado-curso") {
      // Solo mostrar "Seguimiento de Docencia por Cronograma"
      return flujo.nombre.toLowerCase().includes("cronograma") && flujo.nombre.toLowerCase().includes(searchLower)
    } else {
      // Mostrar "Seguimiento de actividades Generales" y "Postulación a Docencia de Curso"
      return (flujo.nombre.toLowerCase().includes("generales") || flujo.nombre.toLowerCase().includes("postulación")) && flujo.nombre.toLowerCase().includes(searchLower)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí iría la lógica para guardar la oportunidad
    router.push("/planificacion-operaciones/gestion-docente/creacion-oportunidades-datos")
  }

  const handleFlujoChange = (flujoId: string) => {
    setFormData((prev) => ({
      ...prev,
      flujo: flujoId,
      fecha: "",
      hora: "",
    }))
  }

  const handleCrearDocente = () => {
    setIsModalOpen(true)
  }

  const handleGuardarDocente = () => {
    console.log("Docente guardado:", nuevoDocente)
    // Aquí iría la lógica para guardar el nuevo docente
    setIsModalOpen(false)
    setNuevoDocente({
      tipoDocumento: "dni",
      nombres: "",
      apellidos: "",
      documento: "",
      pais: "",
      ciudad: "",
      correo: "",
      celular: "",
      fechaNacimiento: "",
    })
  }

  const handleCancelarModal = () => {
    setIsModalOpen(false)
    setNuevoDocente({
      tipoDocumento: "dni",
      nombres: "",
      apellidos: "",
      documento: "",
      pais: "",
      ciudad: "",
      correo: "",
      celular: "",
      fechaNacimiento: "",
    })
  }

  const handleCancel = () => {
    router.push("/planificacion-operaciones/gestion-docente/creacion-oportunidades-datos")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[30px] font-semibold text-gray-900">Nueva Oportunidad</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Oportunidad Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setIsTipoOpen(!isTipoOpen)}
              className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-[#6419e6] font-medium"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-[#6419e6] font-semibold">Tipo de Oportunidad</span>
              </div>
              <motion.div animate={{ rotate: isTipoOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isTipoOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-6">
                    {/* Tipo de Oportunidad Radio Options */}
                    <RadioGroup
                      value={formData.tipoOportunidad}
                      onValueChange={(value) => {
                        // Reset form data cuando cambia el tipo de oportunidad
                        setFormData({ tipoOportunidad: value, centroCosto: "", docente: "", curso: "", flujo: "" })
                        setSearchCurso("")
                        setSearchDocente("")
                        setIsSearchFlujo("")
                      }}
                      className="space-y-4"
                    >
                      {/* Asignado al Curso */}
                      <div
                        className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                          formData.tipoOportunidad === "asignado-curso"
                            ? "border-[#6419e6] bg-blue-50/30"
                            : "border-gray-200 hover:border-[#7b3ff7]"
                        }`}
                      >
                        <RadioGroupItem value="asignado-curso" id="asignado-curso" className="mt-0.5" />
                        <div className="flex-1">
                          <Label
                            htmlFor="asignado-curso"
                            className="text-sm font-semibold text-gray-900 cursor-pointer"
                          >
                            Asignado al Curso
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            Oportunidad vinculada a un curso específico del docente.
                          </p>
                        </div>
                      </div>

                      {/* General */}
                      <div
                        className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                          formData.tipoOportunidad === "general"
                            ? "border-[#6419e6] bg-blue-50/30"
                            : "border-gray-200 hover:border-[#7b3ff7]"
                        }`}
                      >
                        <RadioGroupItem value="general" id="general" className="mt-0.5" />
                        <div className="flex-1">
                          <Label htmlFor="general" className="text-sm font-medium text-gray-700 cursor-pointer">
                            General
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            Oportunidad general no vinculada a ningún curso específico.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>

                    {/* Docente Selection - Only for General */}
                    {formData.tipoOportunidad === "general" && (
                      <div className="border-t pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-[25%] flex items-center gap-2">
                            <div className="bg-purple-100 p-1.5 rounded-full flex-shrink-0">
                              <Users className="h-4 w-4 text-purple-500" />
                            </div>
                            <Label htmlFor="docente" className="text-sm font-medium text-gray-700">
                              Docente <span className="text-red-500">*</span>
                            </Label>
                          </div>
                          <div className="flex-1 flex items-center gap-3">
                            <div className="flex-1">
                              <Select
                                value={formData.docente}
                                onValueChange={(value) => {
                                  setFormData({ ...formData, docente: value })
                                  setIsDocenteDropdownOpen(false)
                                  setSearchDocente("")
                                }}
                              >
                                <SelectTrigger
                                  className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                                  onClick={() => setIsDocenteDropdownOpen(!isDocenteDropdownOpen)}
                                >
                                  <SelectValue placeholder="Seleccionar docente" />
                                </SelectTrigger>
                                <SelectContent>
                                  <div className="p-2">
                                    <Input
                                      placeholder="Buscar docente..."
                                      value={searchDocente}
                                      onChange={(e) => setSearchDocente(e.target.value)}
                                      className="mb-2 h-8 text-sm"
                                    />
                                  </div>
                                  {filteredDocentes.length > 0 ? (
                                    filteredDocentes.map((docente) => (
                                      <SelectItem key={docente.id} value={docente.id}>
                                        <span>{docente.nombre}</span>
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <div className="p-2 text-sm text-gray-500">No se encontraron docentes</div>
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              type="button"
                              onClick={handleCrearDocente}
                              className="bg-[#7b3ff7] hover:bg-[#6b35e7] text-white shrink-0"
                            >
                              Crear Docente
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Centro de Costo Selection - Only for Asignado al Curso */}
                    {formData.tipoOportunidad === "asignado-curso" && (
                      <div className="border-t pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-[25%] flex items-center gap-2">
                            <div className="bg-purple-100 p-1.5 rounded-full flex-shrink-0">
                              <Users className="h-4 w-4 text-purple-500" />
                            </div>
                            <Label htmlFor="centroCosto" className="text-sm font-medium text-gray-700">
                              Seleccionar Centro de Costo <span className="text-red-500">*</span>
                            </Label>
                          </div>
                          <div className="flex-1">
                            <Select
                              value={formData.centroCosto}
                              onValueChange={(value) => {
                                setFormData({ ...formData, centroCosto: value })
                              }}
                            >
                              <SelectTrigger
                                className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                              >
                                <SelectValue placeholder="Seleccionar Centro de Costo" />
                              </SelectTrigger>
                              <SelectContent>
                                {centrosCostoDisponibles.length > 0 ? (
                                  centrosCostoDisponibles.map((centro) => (
                                    <SelectItem key={centro.id} value={centro.id}>
                                      <span>{centro.nombre}</span>
                                    </SelectItem>
                                  ))
                                ) : (
                                  <div className="p-2 text-sm text-gray-500">No se encontraron centros de costo</div>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Curso Selection */}
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-[25%] flex items-center gap-2">
                          <div className="bg-purple-100 p-1.5 rounded-full flex-shrink-0">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <Label htmlFor="curso" className="text-sm font-medium text-gray-700">
                            Selecciona el curso {formData.tipoOportunidad === "asignado-curso" && <span className="text-red-500">*</span>}
                            {formData.tipoOportunidad === "general" && <span className="text-gray-500"> (opcional)</span>}
                          </Label>
                        </div>
                        <div className="flex-1">
                          <Select
                            value={formData.curso}
                            onValueChange={(value) => {
                              const newData = { ...formData, curso: value }
                              // Si es "Asignado al curso", automáticamente asignar el docente vinculado
                              if (formData.tipoOportunidad === "asignado-curso") {
                                newData.docente = cursosDocentes[value] || ""
                              }
                              setFormData(newData)
                              setSearchCurso("")
                            }}
                          >
                            <SelectTrigger
                              className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                            >
                              <SelectValue placeholder="Seleccionar curso" />
                            </SelectTrigger>
                            <SelectContent>
                              <div className="p-2">
                                <Input
                                  placeholder="Buscar curso..."
                                  value={searchCurso}
                                  onChange={(e) => setSearchCurso(e.target.value)}
                                  className="mb-2 h-8 text-sm"
                                />
                              </div>
                              {filteredCursos.length > 0 ? (
                                filteredCursos.map((curso) => (
                                  <SelectItem key={curso.id} value={curso.id}>
                                    <span>{curso.nombre}</span>
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-sm text-gray-500">No se encontraron cursos</div>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Flujo Selection */}
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-[25%] flex items-center gap-2">
                          <div className="bg-purple-100 p-1.5 rounded-full flex-shrink-0">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <Label htmlFor="flujo" className="text-sm font-medium text-gray-700">
                            Asignar flujo <span className="text-red-500">*</span>
                          </Label>
                        </div>
                        <div className="flex-1">
                          <Select
                            value={formData.flujo}
                            onValueChange={(value) => {
                              handleFlujoChange(value)
                              setIsSearchFlujo("")
                            }}
                          >
                            <SelectTrigger
                              className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                            >
                              <SelectValue placeholder="Seleccionar flujo" />
                            </SelectTrigger>
                            <SelectContent>
                              <div className="p-2">
                                <Input
                                  placeholder="Buscar flujo..."
                                  value={isSearchFlujo}
                                  onChange={(e) => setIsSearchFlujo(e.target.value)}
                                  className="mb-2 h-8 text-sm"
                                />
                              </div>
                              {filteredFlujos.length > 0 ? (
                                filteredFlujos.map((flujo) => (
                                  <SelectItem key={flujo.id} value={flujo.id}>
                                    <span>{flujo.nombre}</span>
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-sm text-gray-500">No se encontraron flujos</div>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Selecciona Fecha y Hora - Only for General */}
                    {formData.tipoOportunidad === "general" && (
                      <div className="border-t pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-[25%] flex items-center gap-2">
                            <div className="bg-purple-100 p-1.5 rounded-full flex-shrink-0">
                              <CheckCircle className="h-4 w-4 text-purple-500" />
                            </div>
                            <Label className="text-sm font-medium text-gray-700">
                              Inicio del flujo <span className="text-red-500">*</span>
                            </Label>
                          </div>
                          <div className="flex-1 flex gap-4">
                            <div className="flex-1">
                              <Input
                                type="date"
                                value={formData.fecha}
                                onChange={(e) =>
                                  setFormData({ ...formData, fecha: e.target.value })
                                }
                                className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                              />
                            </div>
                            <div className="flex-1">
                              <Input
                                type="time"
                                value={formData.hora}
                                onChange={(e) =>
                                  setFormData({ ...formData, hora: e.target.value })
                                }
                                className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Docente Display - Only for Asignado al Curso */}
                    {formData.tipoOportunidad === "asignado-curso" && (
                      <div className="border-t pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-[25%] flex items-center gap-2">
                            <div className="bg-purple-100 p-1.5 rounded-full flex-shrink-0">
                              <Users className="h-4 w-4 text-purple-500" />
                            </div>
                            <Label htmlFor="docente" className="text-sm font-medium text-gray-700">
                              Docente
                            </Label>
                          </div>
                          <div className="flex-1">
                            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                              {formData.docente ? (
                                docentesDisponibles.find((d) => d.id === formData.docente)?.nombre || "Docente no encontrado"
                              ) : (
                                <span className="text-gray-400">No hay docente vinculado</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Buttons Section - Centered at the bottom */}
          <div className="flex justify-center gap-4 mt-8 pt-8 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#7b3ff7] hover:bg-[#6b35e7] text-white"
            >
              Guardar Oportunidad
            </Button>
          </div>
        </form>

        {/* Modal Crear Docente */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-900">Crear Nuevo Docente</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Row 1: Nombres y Apellidos */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombres" className="text-sm font-medium text-gray-700 mb-2 block">
                    Nombres <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nombres"
                    placeholder="Ingrese los nombres"
                    value={nuevoDocente.nombres}
                    onChange={(e) => setNuevoDocente({ ...nuevoDocente, nombres: e.target.value })}
                    className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                  />
                </div>
                <div>
                  <Label htmlFor="apellidos" className="text-sm font-medium text-gray-700 mb-2 block">
                    Apellidos <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="apellidos"
                    placeholder="Ingrese los apellidos"
                    value={nuevoDocente.apellidos}
                    onChange={(e) => setNuevoDocente({ ...nuevoDocente, apellidos: e.target.value })}
                    className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                  />
                </div>
              </div>

              {/* Row 2: Documento */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Documento de Identidad <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Select value={nuevoDocente.tipoDocumento} onValueChange={(value) => setNuevoDocente({ ...nuevoDocente, tipoDocumento: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]">
                      <SelectValue placeholder="Tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dni">DNI</SelectItem>
                      <SelectItem value="cedula">Cedula de Identidad</SelectItem>
                      <SelectItem value="ine">INE</SelectItem>
                      <SelectItem value="pasaporte">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Ingrese el número de documento"
                    value={nuevoDocente.documento}
                    onChange={(e) => setNuevoDocente({ ...nuevoDocente, documento: e.target.value })}
                    className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                  />
                </div>
              </div>

              {/* Row 3: País y Ciudad */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pais" className="text-sm font-medium text-gray-700 mb-2 block">
                    País <span className="text-red-500">*</span>
                  </Label>
                  <Select value={nuevoDocente.pais} onValueChange={(value) => setNuevoDocente({ ...nuevoDocente, pais: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]">
                      <SelectValue placeholder="Seleccionar país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="peru">Perú</SelectItem>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
                      <SelectItem value="mexico">México</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ciudad" className="text-sm font-medium text-gray-700 mb-2 block">
                    Ciudad <span className="text-red-500">*</span>
                  </Label>
                  <Select value={nuevoDocente.ciudad} onValueChange={(value) => setNuevoDocente({ ...nuevoDocente, ciudad: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]">
                      <SelectValue placeholder="Seleccionar ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lima">Lima</SelectItem>
                      <SelectItem value="arequipa">Arequipa</SelectItem>
                      <SelectItem value="cusco">Cusco</SelectItem>
                      <SelectItem value="trujillo">Trujillo</SelectItem>
                      <SelectItem value="cajamarca">Cajamarca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Correo, Celular y Fecha de Nacimiento */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="correo" className="text-sm font-medium text-gray-700 mb-2 block">
                    Correo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={nuevoDocente.correo}
                    onChange={(e) => setNuevoDocente({ ...nuevoDocente, correo: e.target.value })}
                    className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                  />
                </div>
                <div>
                  <Label htmlFor="celular" className="text-sm font-medium text-gray-700 mb-2 block">
                    Número de Celular <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="celular"
                    type="tel"
                    placeholder="+51 999 999 999"
                    value={nuevoDocente.celular}
                    onChange={(e) => setNuevoDocente({ ...nuevoDocente, celular: e.target.value })}
                    className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                  />
                </div>
                <div>
                  <Label htmlFor="fechaNacimiento" className="text-sm font-medium text-gray-700 mb-2 block">
                    Fecha de Nacimiento <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={nuevoDocente.fechaNacimiento}
                    onChange={(e) => setNuevoDocente({ ...nuevoDocente, fechaNacimiento: e.target.value })}
                    className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleCancelarModal}>
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleGuardarDocente}
                className="bg-[#7b3ff7] hover:bg-[#6b35e7] text-white"
              >
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
