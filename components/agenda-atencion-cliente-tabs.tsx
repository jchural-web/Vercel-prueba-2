"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Update the interface to include criticality
interface TabItem {
  label: string
  path: string
  count: number
  disabled?: boolean
  criticality?: "high" | "medium" | "low"
}

export function AgendaAtencionClienteTabs() {
  const pathname = usePathname()
  const [scrollPosition, setScrollPosition] = useState(0)
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  const tabs: TabItem[] = [
    {
      label: "Mensajes Recibidos",
      path: "/atencion-cliente/gestion/agenda/mensajes-recibidos",
      count: 12,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Asignados y Reasignados",
      path: "/atencion-cliente/gestion/agenda/asignados-reasignados",
      count: 8,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Programación Manual",
      path: "/atencion-cliente/gestion/agenda/programacion-manual",
      count: 5,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Clases Online",
      path: "/atencion-cliente/gestion/agenda/clases-online",
      count: 7,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Pagos Atrasados",
      path: "/atencion-cliente/gestion/agenda/pagos-atrasados",
      count: 15,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Pagos Atrasados (Mes Actual-Previo)",
      path: "/atencion-cliente/gestion/agenda/pagos-atrasados-mes",
      count: 9,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Compromisos de Pagos",
      path: "/atencion-cliente/gestion/agenda/compromisos-pagos",
      count: 6,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Pre Reporte CR",
      path: "/atencion-cliente/gestion/agenda/pre-reporte-cr",
      count: 4,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Reportado CR",
      path: "/atencion-cliente/gestion/agenda/reportado-cr",
      count: 3,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Pagos del Día",
      path: "/atencion-cliente/gestion/agenda/pagos-dia",
      count: 11,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Pago al Día",
      path: "/atencion-cliente/gestion/agenda/pago-dia",
      count: 18,
      disabled: false,
      criticality: "low",
    },
    {
      label: "Seguimiento Académico",
      path: "/atencion-cliente/gestion/agenda/seguimiento-academico",
      count: 14,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Beneficios Pendientes",
      path: "/atencion-cliente/gestion/agenda/beneficios-pendientes",
      count: 5,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Culminados",
      path: "/atencion-cliente/gestion/agenda/culminados",
      count: 7,
      disabled: false,
      criticality: "low",
    },
    {
      label: "Certificado",
      path: "/atencion-cliente/gestion/agenda/certificado",
      count: 9,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Reservados Sin Deuda",
      path: "/atencion-cliente/gestion/agenda/reservados-sin-deuda",
      count: 3,
      disabled: false,
      criticality: "low",
    },
    {
      label: "Reservado Con Deuda",
      path: "/atencion-cliente/gestion/agenda/reservado-con-deuda",
      count: 6,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Retirado",
      path: "/atencion-cliente/gestion/agenda/retirado",
      count: 4,
      disabled: false,
      criticality: "low",
    },
    {
      label: "Por Abandonar",
      path: "/atencion-cliente/gestion/agenda/por-abandonar",
      count: 8,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Abandonado",
      path: "/atencion-cliente/gestion/agenda/abandonado",
      count: 5,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "En Evaluación",
      path: "/atencion-cliente/gestion/agenda/en-evaluacion",
      count: 7,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "BICs con Deuda",
      path: "/atencion-cliente/gestion/agenda/bics-con-deuda",
      count: 10,
      disabled: false,
      criticality: "high",
    },
    {
      label: "Contestan y Cortan",
      path: "/atencion-cliente/gestion/agenda/contestan-cortan",
      count: 12,
      disabled: false,
      criticality: "high",
    },
    {
      label: "BICs",
      path: "/atencion-cliente/gestion/agenda/bics",
      count: 8,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Solicitudes",
      path: "/atencion-cliente/gestion/agenda/solicitudes",
      count: 15,
      disabled: false,
      criticality: "medium",
    },
    {
      label: "Sin Contacto",
      path: "/atencion-cliente/gestion/agenda/sin-contacto",
      count: 20,
      disabled: false,
      criticality: "high",
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200 // Adjust as needed
      const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount
      tabsContainerRef.current.scrollLeft = newPosition
      setScrollPosition(newPosition)
    }
  }

  const renderTab = (tab: TabItem) => {
    const isActive = pathname === tab.path
    const displayCount = tab.disabled ? 0 : tab.count

    let colorScheme = {
      bg: "bg-primary/10",
      activeBg: "bg-[#6419e6]",
      text: "text-primary",
      activeText: "text-white",
      countBg: "bg-white",
      countText: isActive ? "text-[#6419e6]" : "text-primary",
    }

    if (!tab.disabled) {
      if (tab.criticality === "high") {
        colorScheme = {
          bg: "bg-blue-100",
          activeBg: "bg-blue-600",
          text: "text-blue-600",
          activeText: "text-white",
          countBg: "bg-white",
          countText: isActive ? "text-blue-600" : "text-blue-600",
        }
      } else if (tab.criticality === "medium") {
        colorScheme = {
          bg: "bg-green-100",
          activeBg: "bg-green-600",
          text: "text-green-600",
          activeText: "text-white",
          countBg: "bg-white",
          countText: isActive ? "text-green-600" : "text-green-600",
        }
      } else if (tab.criticality === "low") {
        colorScheme = {
          bg: "bg-amber-100",
          activeBg: "bg-amber-500",
          text: "text-amber-600",
          activeText: "text-white",
          countBg: "bg-white",
          countText: isActive ? "text-amber-600" : "text-amber-600",
        }
      }
    }

    return (
      <Link
        key={tab.path}
        href={tab.path}
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors",
          isActive
            ? `${colorScheme.activeBg} ${colorScheme.activeText} font-semibold`
            : `${colorScheme.bg} ${colorScheme.text} hover:bg-opacity-80`,
        )}
      >
        <span>{tab.label}</span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-bold",
            `${colorScheme.countBg} ${colorScheme.countText}`,
          )}
        >
          {displayCount}
        </span>
      </Link>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div ref={tabsContainerRef} className="flex items-center overflow-x-auto scrollbar-hide">
        {tabs.map(renderTab)}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
