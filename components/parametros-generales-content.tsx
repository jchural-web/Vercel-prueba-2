"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckSquare, Filter, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Definir el tipo para empleados
type Employee = {
  id: number
  name: string
  area: string
  subArea: string
  position: string
  colorClass: string
}

// Colores disponibles para los empleados
const employeeColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-red-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-teal-500",
]

// Opciones para los filtros
const areaOptions = ["TI", "Recursos Humanos", "Ventas", "Marketing", "Finanzas"]
const subAreaOptions = {
  TI: ["Desarrollo", "Soporte Técnico", "Infraestructura", "QA"],
  "Recursos Humanos": ["Reclutamiento", "Capacitación", "Nómina", "Relaciones Laborales"],
  Ventas: ["Ventas Directas", "Telemarketing", "Servicio al Cliente", "Postventa"],
  Marketing: ["Diseño", "Redes Sociales", "Publicidad", "Investigación de Mercado"],
  Finanzas: ["Contabilidad", "Tesorería", "Auditoría", "Presupuesto"],
}

export function ParametrosGeneralesContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showEmployeeConfig, setShowEmployeeConfig] = useState(false)

  const [selectedArea, setSelectedArea] = useState<string>("todos")
  const [selectedSubArea, setSelectedSubArea] = useState<string>("todos")
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false)

  // Lista de empleados
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Juan Antonio Salas",
      area: "TI",
      subArea: "Desarrollo",
      position: "Desarrollador Junior",
      colorClass: "bg-blue-500",
    },
    {
      id: 2,
      name: "María Fernanda L��pez",
      area: "TI",
      subArea: "Soporte Técnico",
      position: "Analista de Soporte",
      colorClass: "bg-purple-500",
    },
    {
      id: 3,
      name: "Carlos Eduardo Ramírez",
      area: "TI",
      subArea: "Infraestructura",
      position: "Especialista en Redes",
      colorClass: "bg-green-500",
    },
    {
      id: 4,
      name: "Ana Lucía Mendoza",
      area: "TI",
      subArea: "Desarrollo",
      position: "Desarrollador Senior",
      colorClass: "bg-red-500",
    },
  ])

  // Datos de ejemplo
  const totalItems = employees.length
  const totalPages = Math.ceil(totalItems / Number.parseInt(itemsPerPage))

  // Abrir el diálogo de creación
  // const handleAddEmployee = () => {
  //   setCurrentEmployee(null)
  //   setDialogMode("create")
  //   setDialogOpen(true)
  // }

  // Seleccionar un empleado para configuración detallada
  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowEmployeeConfig(true)
  }

  // Volver a la lista de empleados
  const handleBackToList = () => {
    setShowEmployeeConfig(false)
    setSelectedEmployee(null)
  }

  // Función para obtener las subáreas disponibles según el área seleccionada
  const getSubAreas = () => {
    if (selectedArea === "todos") return []
    return subAreaOptions[selectedArea as keyof typeof subAreaOptions] || []
  }

  // Función para filtrar empleados según los criterios seleccionados
  const filteredEmployees = employees.filter((employee) => {
    const areaMatch = selectedArea === "todos" || employee.area === selectedArea
    const subAreaMatch = selectedSubArea === "todos" || employee.subArea === selectedSubArea
    return areaMatch && subAreaMatch
  })

  // Función para limpiar los filtros
  const clearFilters = () => {
    setSelectedArea("todos")
    setSelectedSubArea("todos")
  }

  return (
    <div
      className="flex-1 space-y-4 p-4 pt-6 md:p-8 gestion-desempeno-container"
      style={{ backgroundColor: "#f8faff" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Configuración de Parámetros Generales</h2>
      </div>

      <p className="text-gray-600 w-full mb-[60px]">
        Administra los parámetros esenciales del módulo de Gestión del desempeño, ajustando las reglas de operación.
        Personalización de datos y automatización de procesos para garantizar un funcionamiento eficiente y alineado con
        la estrategia empresarial.
      </p>

      {/* Espacio adicional */}
      <div className="h-[20px]"></div>

      {showEmployeeConfig && selectedEmployee ? (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Configuración de empleado no disponible</h3>
            <p className="text-gray-600 mb-4">El módulo de gestión de desempeño ha sido desactivado.</p>
            <Button onClick={handleBackToList}>Volver a la lista</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 mt-5">
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-gray-800">Empleados</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar empleado..."
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-auto"
                />
              </div>
              <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filtrar
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">Filtros</h4>
                      {(selectedArea !== "todos" || selectedSubArea !== "todos") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="h-8 px-2 text-muted-foreground"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Limpiar
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Área:</label>
                      <Select
                        value={selectedArea}
                        onValueChange={(value) => {
                          setSelectedArea(value)
                          setSelectedSubArea("todos")
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todas</SelectItem>
                          {areaOptions.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sub Área:</label>
                      <Select
                        value={selectedSubArea}
                        onValueChange={(value) => {
                          setSelectedSubArea(value)
                        }}
                        disabled={selectedArea === "todos"}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todas</SelectItem>
                          {getSubAreas().map((subArea) => (
                            <SelectItem key={subArea} value={subArea}>
                              {subArea}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => setFilterPopoverOpen(false)} className="w-full mt-2">
                      Aplicar
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-4 mt-5">
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
              <table className="w-full gestion-desempeno-table">
                <thead>
                  <tr style={{ backgroundColor: "#f0ebff" }}>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Área
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Sub Área
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Puesto
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-blue-50/50">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className={`w-1 h-10 ${employee.colorClass} rounded-full mr-3`}></div>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium">{employee.area}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium">{employee.subArea}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium">{employee.position}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20"
                            onClick={() => handleSelectEmployee(employee)}
                          >
                            <CheckSquare className="h-4 w-4 mr-1" />
                            Seleccionar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Componente de paginación */}
              <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 bg-white border-t border-gray-200 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>Página</span>
                  <span className="font-medium">1</span>
                  <span>de 1</span>
                </div>
                <div className="flex items-center gap-1">
                  <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-700 mx-2">Items por página</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700 mx-2">
                    1 - {totalItems} de {totalItems} items
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
