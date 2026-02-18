"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface NuevoTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (ticketData: any) => void
}

export function NuevoTicketModal({ isOpen, onClose, onSubmit }: NuevoTicketModalProps) {
  const [formData, setFormData] = useState({
    tipo: "",
    asunto: "",
    descripcion: "",
    prioridad: "",
  })

  const [createForThirdParty, setCreateForThirdParty] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState("")

  const personas = [
    "María González - Administración",
    "Carlos Rodríguez - Sistemas",
    "Ana Martínez - Recursos Humanos",
    "Luis Fernández - Contabilidad",
    "Patricia Silva - Marketing",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ticketData = {
      ...formData,
      createForThirdParty,
      selectedPerson: createForThirdParty ? selectedPerson : null,
    }
    onSubmit(ticketData)
    setFormData({
      tipo: "",
      asunto: "",
      descripcion: "",
      prioridad: "",
    })
    setCreateForThirdParty(false)
    setSelectedPerson("")
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePersonChange = (value: string) => {
    setSelectedPerson(value)
  }

  const handleThirdPartyToggle = (checked: boolean) => {
    setCreateForThirdParty(checked)
    if (!checked) {
      setSelectedPerson("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Ticket</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Soporte Técnico">Soporte Técnico</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Acceso y Permisos">Acceso y Permisos</SelectItem>
                  <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="Consulta General">Consulta General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prioridad">Prioridad</Label>
              <Select value={formData.prioridad} onValueChange={(value) => handleChange("prioridad", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="asunto">Asunto</Label>
            <Input
              id="asunto"
              value={formData.asunto}
              onChange={(e) => handleChange("asunto", e.target.value)}
              placeholder="Breve descripción del problema o solicitud"
              required
            />
          </div>

          {/* New third-party section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="thirdParty"
                checked={createForThirdParty}
                onChange={(e) => handleThirdPartyToggle(e.target.checked)}
                className="h-4 w-4 text-[#7b3ff7] focus:ring-[#7b3ff7] border-gray-300 rounded"
              />
              <Label htmlFor="thirdParty" className="text-sm font-medium">
                Crear ticket para tercera persona
              </Label>
            </div>

            {createForThirdParty && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="persona">Seleccionar Persona</Label>
                <Select value={selectedPerson} onValueChange={handlePersonChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar persona" />
                  </SelectTrigger>
                  <SelectContent>
                    {personas.map((persona, index) => (
                      <SelectItem key={index} value={persona}>
                        {persona}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción Detallada</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              placeholder="Describe detalladamente el problema, solicitud o consulta..."
              rows={4}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#7b3ff7] hover:bg-[#6b35e7]">
              Crear Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
