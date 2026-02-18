"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Update the interface to include criticality
interface TabItem {
  label: string
  path: string
  count: number
  disabled?: boolean
  criticality?: "high" | "medium" | "low"
}

export function AgendaTabs() {
  const pathname = usePathname()

  // Update the tabs array to include criticality information
  const tabs: TabItem[] = [
    {
      label: "Contacto Entrante",
      path: "/gestion-comercial/agenda/contacto-entrante",
      count: 1,
      disabled: false,
      criticality: "high", // Alta Criticidad / Uso Frecuente
    },
    {
      label: "Prog. Automáticas",
      path: "/gestion-comercial/agenda/prog-automaticas",
      count: 8,
      disabled: true,
      criticality: "low", // Baja Criticidad / Bajo Uso
    },
    {
      label: "Prog. Manuales",
      path: "/gestion-comercial/agenda/prog-manuales",
      count: 5,
      disabled: false,
      criticality: "high", // Alta Criticidad / Uso Frecuente
    },
    {
      label: "No Prog. 1 Solicitud",
      path: "/gestion-comercial/agenda/no-prog-1",
      count: 12,
      disabled: true,
      criticality: "medium", // Default
    },
    {
      label: "No Prog. +1 Solicitudes",
      path: "/gestion-comercial/agenda/no-prog-n",
      count: 7,
      disabled: true,
      criticality: "low", // Baja Criticidad / Bajo Uso
    },
    {
      label: "Altas y Medias",
      path: "/gestion-comercial/agenda/no-prog-altas-medias",
      count: 9,
      disabled: false,
      criticality: "high", // Alta Criticidad / Uso Frecuente
    },
    {
      label: "Vencidas [IP,IC,PF]",
      path: "/gestion-comercial/agenda/vendidas-ipic-pf",
      count: 4,
      disabled: false,
      criticality: "medium", // Uso Moderado / Seguimiento Medio
    },
    {
      label: "Vencidas [IS,M]",
      path: "/gestion-comercial/agenda/vencidas-is-m",
      count: 2,
      disabled: false,
      criticality: "medium", // Uso Moderado / Seguimiento Medio
    },
    {
      label: "Realizadas",
      path: "/gestion-comercial/agenda/realizadas",
      count: 8,
      disabled: true,
      criticality: "medium", // Uso Moderado / Seguimiento Medio
    },
    {
      label: "Pre-Lanzamiento",
      path: "/gestion-comercial/agenda/estadisticas",
      count: 6,
      disabled: false,
      criticality: "low", // Baja Criticidad / Bajo Uso
    },
    {
      label: "RN2-B",
      path: "/gestion-comercial/agenda/configuracion",
      count: 3,
      disabled: true,
      criticality: "low", // Baja Criticidad / Bajo Uso
    },
    {
      label: "RN2-A",
      path: "/gestion-comercial/agenda/rn2-a",
      count: 0,
      disabled: true,
      criticality: "low", // Baja Criticidad / Bajo Uso
    },
    {
      label: "Venta Cruzada",
      path: "/gestion-comercial/agenda/venta-cruzada",
      count: 0,
      disabled: true,
      criticality: "low", // Baja Criticidad / Bajo Uso
    },
  ]

  // Update the renderTab function to apply different colors based on criticality
  const renderTab = (tab: TabItem) => {
    const isActive = pathname === tab.path
    // Mostrar 0 para pestañas deshabilitadas
    const displayCount = tab.disabled ? 0 : tab.count

    // Define color schemes based on criticality
    let colorScheme = {
      bg: "bg-primary/10",
      activeBg: "bg-[#6419e6]",
      text: "text-primary",
      activeText: "text-white",
      countBg: "bg-white",
      countText: isActive ? "text-[#6419e6]" : "text-primary",
    }

    // Apply color schemes based on criticality for enabled tabs
    if (!tab.disabled) {
      if (tab.criticality === "high") {
        // Red for high criticality
        colorScheme = {
          bg: "bg-blue-100",
          activeBg: "bg-blue-600",
          text: "text-blue-600",
          activeText: "text-white",
          countBg: "bg-white",
          countText: isActive ? "text-blue-600" : "text-blue-600",
        }
      } else if (tab.criticality === "medium") {
        // Yellow for medium criticality
        colorScheme = {
          bg: "bg-green-100",
          activeBg: "bg-green-600",
          text: "text-green-600",
          activeText: "text-white",
          countBg: "bg-white",
          countText: isActive ? "text-green-600" : "text-green-600",
        }
      } else if (tab.criticality === "low") {
        // Green for low criticality (changed from blue)
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

    if (tab.disabled) {
      return (
        <div
          key={tab.path}
          className="rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors bg-gray-100 text-gray-400 cursor-not-allowed"
        >
          <span>{tab.label}</span>
          <span className="rounded-full px-2 py-0.5 text-xs font-bold bg-gray-200 text-gray-500">{displayCount}</span>
        </div>
      )
    } else {
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
  }

  // Update the return statement to add more spacing between tabs
  return <div className="flex flex-wrap gap-4">{tabs.map(renderTab)}</div>
}
