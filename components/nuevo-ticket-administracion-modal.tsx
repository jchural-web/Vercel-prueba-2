"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface NuevoTicketAdministracionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function NuevoTicketAdministracionModal({ isOpen, onClose, onSubmit }: NuevoTicketAdministracionModalProps) {
  const [formData, setFormData] = useState({
    tipo: "",
    prioridad: "",
    asunto: "",
    descripcion: "",
    crearParaTercero: false,
    personaSeleccionada: "",
  })

  const tiposTicket = [
    "Soporte Técnico",
    "Hardware",
    "Software",
    "Acceso y Permisos",
    "Mantenimiento",
    "Consulta General",
  ]

  const prioridades = [
    { value: "baja", label: "Baja" },
    { value: "media", label: "Media" },
    { value: "alta", label: "Alta" },
  ]

  const personasDisponibles = [
    "María González - Ventas",
    "Juan Pérez - Desarrollo",
    "Ana García - TI",
    "Carlos Mendoza - TI",
    "Laura Martín - Marketing",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      tipo: "",
      prioridad: "",
      asunto: "",
      descripcion: "",
      crearParaTercero: false,
      personaSeleccionada: "",
    })
    onClose()
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      crearParaTercero: checked,
      personaSeleccionada: checked ? formData.personaSeleccionada : "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Crear Nuevo Ticket</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Ticket</label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposTicket.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Prioridad</label>
              <Select
                value={formData.prioridad}
                onValueChange={(value) => setFormData({ ...formData, prioridad: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  {prioridades.map((prioridad) => (
                    <SelectItem key={prioridad.value} value={prioridad.value}>
                      {prioridad.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Asunto</label>
            <Input
              placeholder="Breve descripción del problema o solicitud"
              value={formData.asunto}
              onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
              required
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Checkbox
                id="crearParaTercero"
                checked={formData.crearParaTercero}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="crearParaTercero" className="text-sm font-medium">
                Crear ticket para tercera persona
              </label>
            </div>

            {formData.crearParaTercero && (
              <div className="mb-4">
                <Select
                  value={formData.personaSeleccionada}
                  onValueChange={(value) => setFormData({ ...formData, personaSeleccionada: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar persona" />
                  </SelectTrigger>
                  <SelectContent>
                    {personasDisponibles.map((persona) => (
                      <SelectItem key={persona} value={persona}>
                        {persona}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descripción Detallada</label>
            <Textarea
              placeholder="Describe detalladamente el problema, solicitud o consulta..."
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-[#7b3ff7] hover:bg-[#6b35e7]">
              Crear Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
