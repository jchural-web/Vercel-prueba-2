"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Edit, Copy, FileText, Activity } from "lucide-react"
import { AgendaContentContainer } from "@/components/agenda-container"

interface ActivityCard {
  id: string
  title: string
  description: string
  category: string
  status: "ACTIVO" | "INACTIVO"
}

export default function CreacionActividadesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const activityCards: ActivityCard[] = [
    {
      id: "1",
      title: "Confirmación de Sesión",
      description: "Asegurar que docente confirme asistencia 24h antes",
      category: "Ejecución de Curso",
      status: "ACTIVO",
    },
    {
      id: "2",
      title: "Recordatorio Subida de notas",
      description: "Recordar al docente subir notas después de sesión",
      category: "Ejecución de Curso",
      status: "ACTIVO",
    },
    {
      id: "3",
      title: "Reporte Semanal",
      description: "Envío de reporte semanal cada lunes",
      category: "General",
      status: "INACTIVO",
    },
    {
      id: "4",
      title: "Envio Material didáctico",
      description: "Enviar material antes de sesión inicial",
      category: "Ejecución de Curso",
      status: "ACTIVO",
    },
  ]

  const filteredActivities = activityCards.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Ejecución de Curso":
        return FileText
      case "General":
        return FileText
      default:
        return Activity
    }
  }

  return (
    <AgendaContentContainer withTopPadding={false}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mt-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-[30px] font-bold text-gray-900">Creación de Actividades </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent hover:opacity-80">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>

            <Button
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => router.push("/planificacion-operaciones/gestion-docente/creacion-actividades/crear")}
            >
              <Plus className="h-4 w-4" />
              Crear Actividad
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-8 bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-[#e3f2fd] border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Título</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity) => (
              <tr key={activity.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 bg-white">
                  <span className="font-medium text-gray-900">{activity.title}</span>
                </td>
                <td className="px-6 py-4 bg-white">
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </td>
                <td className="px-6 py-4 bg-white">
                  <span className="text-sm text-gray-700">{activity.category}</span>
                </td>
                <td className="px-6 py-4 bg-white">
                  <Badge
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      activity.status === "ACTIVO"
                        ? "bg-green-100 text-green-600 border border-green-200"
                        : "bg-red-100 text-red-600 border border-red-200"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 bg-white">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-[#6419e6] text-[#6419e6] hover:bg-[#6419e6]/10 bg-transparent"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Duplicar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-[#e3f2fd] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="h-8 w-8 text-[#6419e6]" />
          </div>
          <p className="text-gray-500">No se encontraron actividades que coincidan con tu búsqueda</p>
        </div>
      )}
    </AgendaContentContainer>
  )
}
