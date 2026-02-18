"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, CheckCircle, ChevronDown, FileText, AlignLeft, ToggleLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CreacionActividadesPage() {
  const router = useRouter()
  const [isDatosBasicosOpen, setIsDatosBasicosOpen] = useState(true)
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(true)
  const [isActividadesOpen, setIsActividadesOpen] = useState(true)

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: "",
    categoria: "general",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    router.push("/planificacion-operaciones/gestion-docente/creacion-actividades")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[30px] font-semibold text-gray-900">Nueva Actividad</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setIsDatosBasicosOpen(!isDatosBasicosOpen)}
              className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-[#6419e6] font-medium"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-[#6419e6] font-semibold">Datos Básicos</span>
              </div>
              <motion.div animate={{ rotate: isDatosBasicosOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isDatosBasicosOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                      {/* Nombre del Flujo */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-[35%] flex items-center gap-2">
                          <div className="bg-purple-100 p-1.5 rounded-full flex-shrink-0">
                            <FileText className="h-4 w-4 text-purple-500" />
                          </div>
                          <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                            Nombre de la Actividad <span className="text-red-500">*</span>
                          </Label>
                        </div>
                        <div className="flex-1">
                          <Input
                            id="nombre"
                            placeholder="ej: Confirmación de Sesión"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            required
                            className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]"
                          />
                        </div>
                      </div>

                      {/* Estado al lado derecho */}
                      <div className="flex items-center gap-4 w-[35%]">
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="bg-green-100 p-1.5 rounded-full flex-shrink-0">
                            <ToggleLeft className="h-4 w-4 text-green-500" />
                          </div>
                          <Label htmlFor="estado" className="text-sm font-medium text-gray-700">
                            Estado
                          </Label>
                        </div>
                        <div className="flex-1">
                          <Select
                            value={formData.estado}
                            onValueChange={(value) => setFormData({ ...formData, estado: value })}
                          >
                            <SelectTrigger className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7]">
                              <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="activo">Activo</SelectItem>
                              <SelectItem value="inactivo">Inactivo</SelectItem>
                              <SelectItem value="borrador">Borrador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex items-start gap-4">
                      <div className="w-[22%] flex items-center gap-2 pt-2">
                        <div className="bg-blue-100 p-1.5 rounded-full flex-shrink-0">
                          <AlignLeft className="h-4 w-4 text-blue-500" />
                        </div>
                        <Label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                          Descripción
                        </Label>
                      </div>
                      <div className="flex-1">
                        <Textarea
                          id="descripcion"
                          placeholder="ej: Asegurar que docente confirme asistencia 24h antes"
                          value={formData.descripcion}
                          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                          className="border-gray-300 focus:border-[#7b3ff7] focus:ring-[#7b3ff7] min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setIsCategoriaOpen(!isCategoriaOpen)}
              className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-[#6419e6] font-medium"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-[#6419e6] font-semibold">Categoría de la Actividad</span>
              </div>
              <motion.div animate={{ rotate: isCategoriaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isCategoriaOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6">
                    <RadioGroup
                      value={formData.categoria}
                      onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                      className="space-y-4"
                    >
                      {/* GENERAL */}
                      <div
                        className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                          formData.categoria === "general"
                            ? "border-[#6419e6] bg-blue-50/30"
                            : "border-gray-200 hover:border-[#7b3ff7]"
                        }`}
                      >
                        <RadioGroupItem value="general" id="general" className="mt-0.5" />
                        <div className="flex-1">
                          <Label htmlFor="general" className="text-sm font-semibold text-gray-900 cursor-pointer">
                            GENERAL
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            Flujo personalizable según necesidad. Requiere configurar disparador de inicio.
                          </p>
                          {formData.categoria === "general" && (
                            <button
                              type="button"
                              onClick={() =>
                                router.push(
                                  "/planificacion-operaciones/gestion-docente/configuracion-flujos/crear/configurar-inicio",
                                )
                              }
                              className="mt-3 px-4 py-2 text-sm font-medium text-white bg-[#6419e6] rounded-lg hover:bg-[#5315c4] transition-colors"
                            >
                              → Configurar Inicio de Flujo
                            </button>
                          )}
                        </div>
                      </div>

                      {/* EJECUCIÓN DE CURSO */}
                      <div
                        className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                          formData.categoria === "ejecucion-curso"
                            ? "border-[#6419e6] bg-blue-50/30"
                            : "border-gray-200 hover:border-[#7b3ff7]"
                        }`}
                      >
                        <RadioGroupItem value="ejecucion-curso" id="ejecucion-curso" className="mt-0.5" />
                        <div className="flex-1">
                          <Label
                            htmlFor="ejecucion-curso"
                            className="text-sm font-semibold text-gray-900 cursor-pointer"
                          >
                            EJECUCIÓN DE CURSO
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            Flujo basado en cronograma de sesiones. Basado en cronograma de sesiones.
                          </p>
                          {formData.categoria === "ejecucion-curso" && (
                            <button
                              type="button"
                              onClick={() =>
                                router.push(
                                  "/planificacion-operaciones/gestion-docente/configuracion-flujos/crear/nueva-actividad",
                                )
                              }
                              className="mt-3 px-4 py-2 text-sm font-medium text-white bg-[#6419e6] rounded-lg hover:bg-[#5315c4] transition-colors"
                            >
                              → Configurar Inicio de Flujo
                            </button>
                          )}
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setIsActividadesOpen(!isActividadesOpen)}
              className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-[#6419e6] font-medium"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-[#6419e6] font-semibold">Flujo de la Actividad</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  className="bg-[#7b3ff7] hover:bg-[#6b35e7] text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push("/planificacion-operaciones/gestion-docente/creacion-actividades/crear/agregar-paso")
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Subactividad
                </Button>
                <motion.div animate={{ rotate: isActividadesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {isActividadesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 bg-white flex justify-center">
                    {/* Flow Diagram - PNG Image */}
                    <img 
                      src="/images/flujo-actividades-diagram.png" 
                      alt="Diagrama de flujo de actividades"
                      className="max-w-full h-auto"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action Buttons at Bottom */}
          <div className="flex justify-center gap-3 mt-6 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#7b3ff7] hover:bg-[#6b35e7] text-white">
              Guardar Actividad
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
