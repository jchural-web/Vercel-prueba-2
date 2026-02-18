"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, AlignJustify, Layers, UserCog, Clock, Eye, FileText, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function EmpleadoSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  // Guardar el estado del menú en localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("empleadoSidebarCollapsed")
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === "true")
    }
  }, [])

  const toggleSidebar = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    localStorage.setItem("empleadoSidebarCollapsed", String(newCollapsed))
  }

  const handleGoBack = () => {
    // Usar replace en lugar de push para evitar que se añada a la historia de navegación
    router.replace("/")
  }

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div
      className={cn(
        "hidden lg:flex flex-col h-screen border-r border-gray-200 bg-white text-gray-700 overflow-hidden transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        {!collapsed && <span className="font-medium text-sm">Empleado Seleccionado</span>}
        <Button
          variant="ghost"
          size="sm"
          className={cn("h-7 w-7 p-0", collapsed && "mx-auto")}
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <nav className={cn("grid items-start px-4 text-sm font-medium", collapsed && "px-2")}>
          {/* Botón de Volver */}
          <Button
            variant="ghost"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 mb-4 transition-all text-gray-700 hover:bg-[#f0ebff] hover:text-[#7b3ff7] group",
              collapsed ? "justify-center" : "justify-start gap-3",
            )}
            onClick={handleGoBack}
            title="Volver"
          >
            <ArrowLeft className="h-4 w-4" />
            {!collapsed && (
              <span className="relative after:absolute after:w-0 after:h-0.5 after:bg-[#7b3ff7] after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 group-hover:after:w-full">
                Volver
              </span>
            )}
          </Button>

          {/* Separador con título */}
          {!collapsed && (
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 mt-2">
              CONFIGURACIÓN POR EMPLEADO
            </div>
          )}
          {collapsed && <div className="my-2 border-t border-gray-200"></div>}

          {/* Elementos de nivel 1 (anteriormente estaban en nivel 2) */}

          {/* Módulos */}
          <Link
            href="/gestion-desempeno/empleado/parametros-generales/modulos"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 transition-all group mb-1",
              collapsed ? "justify-center" : "gap-3",
              isActive("/gestion-desempeno/empleado/parametros-generales/modulos")
                ? "bg-[#f0ebff] text-[#7b3ff7]"
                : "text-gray-700 hover:bg-gray-100",
            )}
            title="Módulos"
          >
            <Layers className="h-4 w-4" />
            {!collapsed && (
              <span className="relative after:absolute after:w-0 after:h-0.5 after:bg-[#7b3ff7] after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 group-hover:after:w-full">
                Módulos
              </span>
            )}
          </Link>

          {/* Roles y Permisos */}
          <Link
            href="/gestion-desempeno/empleado/parametros-generales/roles-permisos"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 transition-all group mb-1",
              collapsed ? "justify-center" : "gap-3",
              isActive("/gestion-desempeno/empleado/parametros-generales/roles-permisos")
                ? "bg-[#f0ebff] text-[#7b3ff7]"
                : "text-gray-700 hover:bg-gray-100",
            )}
            title="Roles y Permisos"
          >
            <UserCog className="h-4 w-4" />
            {!collapsed && (
              <span className="relative after:absolute after:w-0 after:h-0.5 after:bg-[#7b3ff7] after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 group-hover:after:w-full">
                Roles y Permisos
              </span>
            )}
          </Link>

          {/* Frecuencia de Datos */}
          <Link
            href="/gestion-desempeno/empleado/parametros-generales/frecuencia-datos"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 transition-all group mb-1",
              collapsed ? "justify-center" : "gap-3",
              isActive("/gestion-desempeno/empleado/parametros-generales/frecuencia-datos")
                ? "bg-[#f0ebff] text-[#7b3ff7]"
                : "text-gray-700 hover:bg-gray-100",
            )}
            title="Frecuencia de Datos"
          >
            <Clock className="h-4 w-4" />
            {!collapsed && (
              <span className="relative after:absolute after:w-0 after:h-0.5 after:bg-[#7b3ff7] after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 group-hover:after:w-full">
                Frecuencia de Datos
              </span>
            )}
          </Link>

          {/* Datos Sensibles */}
          <Link
            href="/gestion-desempeno/empleado/parametros-generales/datos-sensibles"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 transition-all group mb-1",
              collapsed ? "justify-center" : "gap-3",
              isActive("/gestion-desempeno/empleado/parametros-generales/datos-sensibles")
                ? "bg-[#f0ebff] text-[#7b3ff7]"
                : "text-gray-700 hover:bg-gray-100",
            )}
            title="Datos Sensibles"
          >
            <Eye className="h-4 w-4" />
            {!collapsed && (
              <span className="relative after:absolute after:w-0 after:h-0.5 after:bg-[#7b3ff7] after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 group-hover:after:w-full">
                Datos Sensibles
              </span>
            )}
          </Link>

          {/* Registro de Actividad */}
          <Link
            href="/gestion-desempeno/empleado/parametros-generales/registro-actividad"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 transition-all group mb-1",
              collapsed ? "justify-center" : "gap-3",
              isActive("/gestion-desempeno/empleado/parametros-generales/registro-actividad")
                ? "bg-[#f0ebff] text-[#7b3ff7]"
                : "text-gray-700 hover:bg-gray-100",
            )}
            title="Registro de Actividad"
          >
            <FileText className="h-4 w-4" />
            {!collapsed && (
              <span className="relative after:absolute after:w-0 after:h-0.5 after:bg-[#7b3ff7] after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 group-hover:after:w-full">
                Registro de Actividad
              </span>
            )}
          </Link>

          {/* Widgets */}
          <Link
            href="/gestion-desempeno/empleado/parametros-generales/widgets"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 transition-all group mb-1",
              collapsed ? "justify-center" : "gap-3",
              isActive("/gestion-desempeno/empleado/parametros-generales/widgets")
                ? "bg-[#f0ebff] text-[#7b3ff7]"
                : "text-gray-700 hover:bg-gray-100",
            )}
            title="Widgets"
          >
            <LayoutDashboard className="h-4 w-4" />
            {!collapsed && (
              <span className="relative after:absolute after:w-0 after:h-0.5 after:bg-[#7b3ff7] after:left-0 after:-bottom-0.5 after:transition-all after:duration-300 group-hover:after:w-full">
                Widgets
              </span>
            )}
          </Link>
        </nav>
      </div>
      <div className="p-4">
        {!collapsed ? (
          <div className="rounded-lg bg-gray-100 p-3 text-xs text-gray-700">
            <p className="font-medium">BSG Institute</p>
            <p className="mt-1">Versión 1.0.0</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-xs text-gray-500">v1.0</span>
          </div>
        )}
      </div>
    </div>
  )
}
