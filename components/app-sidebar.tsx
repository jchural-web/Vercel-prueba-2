"use client"

import { useState, useEffect } from "react"
import { Home, ChevronDown, ChevronRight, BookOpen, Folder } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [planificacionOperacionesExpanded, setPlanificacionOperacionesExpanded] = useState(false)
  const [gestionDocenteExpanded, setGestionDocenteExpanded] = useState(false)

  // Guardar el estado del menú en localStorage
  useEffect(() => {
    // Cargar el estado inicial desde localStorage
    const savedCollapsed = localStorage.getItem("sidebarCollapsed")
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === "true")
    }

    const savedHidden = localStorage.getItem("sidebarHidden")
    if (savedHidden) {
      setHidden(savedHidden === "true")
    }

    // Contraer automáticamente el menú cuando se navega desde el inicio a otra sección
    const isHomePage = pathname === "/"
    const wasHomePage = localStorage.getItem("wasHomePage") === "true"

    if (wasHomePage && !isHomePage) {
      setCollapsed(true)
      localStorage.setItem("sidebarCollapsed", "true")
    }

    // Guardar el estado actual para la próxima navegación
    localStorage.setItem("wasHomePage", String(isHomePage))

    // Expandir automáticamente el menú de Planificación y Operaciones cuando estamos en esa sección
    if (pathname.startsWith("/planificacion-operaciones")) {
      setPlanificacionOperacionesExpanded(true)
    }

    // Expandir automáticamente el menú de Gestión Docente cuando estamos en esa sección
    if (pathname.startsWith("/planificacion-operaciones/gestion-docente")) {
      setPlanificacionOperacionesExpanded(true)
      setGestionDocenteExpanded(true)
    }

    // Escuchar el evento personalizado para toggle desde el TopBar
    const handleToggleSidebar = () => {
      if (window.innerWidth < 1024) {
        setHidden(!hidden)
        localStorage.setItem("sidebarHidden", String(!hidden))
      } else {
        setCollapsed(!collapsed)
        localStorage.setItem("sidebarCollapsed", String(!collapsed))
      }
    }

    document.addEventListener("toggle-sidebar", handleToggleSidebar)

    return () => {
      document.removeEventListener("toggle-sidebar", handleToggleSidebar)
    }
  }, [pathname, collapsed, hidden])

  const toggleSidebar = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    localStorage.setItem("sidebarCollapsed", String(newCollapsed))
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const isPathActive = (prefix: string) => {
    return pathname.startsWith(prefix)
  }

  if (hidden && typeof window !== "undefined" && window.innerWidth < 1024) {
    return null
  }

  return (
    <div
      className={cn(
        "border-r border-gray-200 bg-white text-gray-700 transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[280px]",
        "lg:block",
        hidden ? "hidden" : "block",
        "sticky top-0 h-screen overflow-y-auto",
      )}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className={cn("grid items-start px-4 text-sm font-medium", collapsed && "px-2")}>
            {/* Inicio */}
            <Link
              href="/"
              className={`flex w-full items-center ${collapsed ? "justify-center" : "gap-3"} rounded-lg px-3 py-2 transition-all group ${
                isActive("/") ? "bg-[#e6f0ff] text-[#1a56db]" : "text-gray-700 hover:bg-gray-100"
              }`}
              title="Inicio"
            >
              <Home className="h-4 w-4" />
              {!collapsed && <span>Inicio</span>}
            </Link>

            {!collapsed && (
              <div className="mt-6">
                <h4 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">MÓDULOS</h4>
              </div>
            )}
            {collapsed && <div className="my-6 border-t border-gray-200"></div>}

            <div className="grid gap-1">
              {/* Planificación y Operaciones */}
              <div>
                <button
                  onClick={() => setPlanificacionOperacionesExpanded(!planificacionOperacionesExpanded)}
                  className={`flex w-full items-center ${collapsed ? "justify-center" : "justify-between"} rounded-lg px-3 py-2 transition-all group ${
                    isPathActive("/planificacion-operaciones") ? "bg-[#e6f0ff] text-[#1a56db]" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title="Planificación y Operaciones"
                >
                  <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                    <BookOpen className="h-4 w-4" />
                    {!collapsed && <span>Planificación y Operaciones</span>}
                  </div>
                  {!collapsed &&
                    (planificacionOperacionesExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
                </button>

                {planificacionOperacionesExpanded && !collapsed && (
                  <div className="ml-4 mt-1 grid gap-1 border-l border-gray-200 pl-2">
                    {/* Gestión Docente */}
                    <div>
                      <button
                        onClick={() => setGestionDocenteExpanded(!gestionDocenteExpanded)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 transition-all group ${
                          isPathActive("/planificacion-operaciones/gestion-docente") ? "bg-[#e6f0ff] text-[#1a56db]" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Folder className="h-4 w-4 text-[#1a56db]" />
                          <span>Gestión Docente</span>
                        </div>
                        {gestionDocenteExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>

                      {gestionDocenteExpanded && (
                        <div className="ml-4 mt-1 grid gap-1 pl-2">
                          <Link
                            href="/planificacion-operaciones/gestion-docente/agenda"
                            className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all group ${
                              pathname.includes("/gestion-docente/agenda")
                                ? "bg-[#e6f0ff] text-[#1a56db]"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span>Agenda</span>
                            </div>
                          </Link>
                          <Link
                            href="/planificacion-operaciones/gestion-docente/asignar-flujos"
                            className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all group ${
                              pathname.includes("/asignar-flujos")
                                ? "bg-[#e6f0ff] text-[#1a56db]"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span>Asignar Flujos</span>
                            </div>
                          </Link>
                          <Link
                            href="/planificacion-operaciones/gestion-docente/configuracion-flujos"
                            className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all group ${
                              pathname.includes("/configuracion-flujos")
                                ? "bg-[#e6f0ff] text-[#1a56db]"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span>Configuración de Flujos</span>
                            </div>
                          </Link>
                          <Link
                            href="/planificacion-operaciones/gestion-docente/creacion-actividades"
                            className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all group ${
                              pathname.includes("/creacion-actividades")
                                ? "bg-[#e6f0ff] text-[#1a56db]"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span>Creación de Actividades</span>
                            </div>
                          </Link>
                          <Link
                            href="/planificacion-operaciones/gestion-docente/creacion-oportunidades-datos"
                            className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all group ${
                              pathname.includes("/creacion-oportunidades-datos")
                                ? "bg-[#e6f0ff] text-[#1a56db]"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span>Creación de Oportunidades</span>
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
