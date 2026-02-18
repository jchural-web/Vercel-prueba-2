"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Edit, Workflow, FileText } from "lucide-react"
import { AgendaContentContainer } from "@/components/agenda-container"
import { OpportunityCard } from "@/types/opportunity" // Import OpportunityCard

interface OpportunityData {
  id: string
  docente: string
  pais: "peru" | "colombia" | "argentina"
  tipoOportunidad: "asignado-curso" | "general"
  curso: string
  flujo: string
}

export default function CreacionOportunidadesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const opportunityData: OpportunityData[] = [
    {
      id: "1",
      docente: "Carlos Rodriguez",
      pais: "peru",
      tipoOportunidad: "asignado-curso",
      curso: "Fundamentos de Base de Datos",
      flujo: "Seguimiento de actividades Generales",
    },
    {
      id: "2",
      docente: "María García",
      pais: "colombia",
      tipoOportunidad: "general",
      curso: "Diseño UX/UI",
      flujo: "Seguimiento de Docencia por Cronograma",
    },
    {
      id: "3",
      docente: "Juan Pérez",
      pais: "argentina",
      tipoOportunidad: "general",
      curso: "Python Avanzado",
      flujo: "Postulación a Docencia de Curso",
    },
  ]

  const filteredOpportunities = opportunityData.filter(
    (opportunity) =>
      opportunity.docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.flujo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryIcon = (tipoOportunidad: string) => {
    switch (tipoOportunidad) {
      case "asignado-curso":
        return "Asignado al Curso"
      case "general":
        return "General"
      default:
        return "Sin definir"
    }
  }

  const getCountryFlag = (pais: string) => {
    switch (pais) {
      case "peru":
        return (
          <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex">
            <div className="w-1/3 bg-red-600"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-red-600"></div>
          </div>
        )
      case "colombia":
        return (
          <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex flex-col">
            <div className="h-1/2 bg-yellow-400"></div>
            <div className="h-1/4 bg-blue-600"></div>
            <div className="h-1/4 bg-red-600"></div>
          </div>
        )
      case "argentina":
        return (
          <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex flex-col">
            <div className="h-1/3 bg-sky-400"></div>
            <div className="h-1/3 bg-white"></div>
            <div className="h-1/3 bg-sky-400"></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AgendaContentContainer withTopPadding={false}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mt-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-[30px] font-bold text-gray-900">Creación de Oportunidades</h1>

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
              onClick={() => router.push("/planificacion-operaciones/gestion-docente/creacion-oportunidades-datos/crear")}
            >
              <Plus className="h-4 w-4" />
              Crear Oportunidad
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-8 bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-[#e3f2fd] border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Docente</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tipo de Oportunidad</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Curso</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Flujo Asignado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities.map((opportunity) => (
              <tr key={opportunity.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 bg-white">
                  <div className="flex items-center gap-2">
                    {getCountryFlag(opportunity.pais)}
                    <span className="font-medium text-gray-900">{opportunity.docente}</span>
                  </div>
                </td>
                <td className="px-6 py-4 bg-white">
                  <Badge
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      opportunity.tipoOportunidad === "asignado-curso"
                        ? "bg-blue-100 text-blue-600 border border-blue-200"
                        : "bg-purple-100 text-purple-600 border border-purple-200"
                    }`}
                  >
                    {getCategoryIcon(opportunity.tipoOportunidad)}
                  </Badge>
                </td>
                <td className="px-6 py-4 bg-white">
                  <span className="text-sm text-gray-700">{opportunity.curso}</span>
                </td>
                <td className="px-6 py-4 bg-white">
                  <p className="text-sm text-gray-600">{opportunity.flujo}</p>
                </td>
                <td className="px-6 py-4 bg-white">
                  <Button size="sm" className="gap-2 bg-[#6419e6] hover:bg-[#5215b8] text-white">
                    <Edit className="h-3.5 w-3.5" />
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-[#e3f2fd] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Workflow className="h-8 w-8 text-[#6419e6]" />
          </div>
          <p className="text-gray-500">No se encontraron oportunidades que coincidan con tu búsqueda</p>
        </div>
      )}
      </div>
    </AgendaContentContainer>
  )
}
