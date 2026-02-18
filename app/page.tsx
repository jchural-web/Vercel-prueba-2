"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Users, DollarSign, TrendingUp, FileText } from "lucide-react"
import { SalesChart } from "@/components/sales-chart"
import { ContactsChart } from "@/components/contacts-chart"
import { DataReceivedChart } from "@/components/data-received-chart"
// Importar el componente de Parámetros Generales al inicio del archivo
import { ParametrosGeneralesContent } from "@/components/parametros-generales-content"
import { useSearchParams } from "next/navigation"

// Modificar la función Home para incluir la lógica de mostrar el contenido de Parámetros Generales
export default function Home() {
  // Usar searchParams para detectar si debemos mostrar el contenido de Parámetros Generales
  const searchParams = useSearchParams()
  const showParametrosGenerales = searchParams.get("view") === "parametros-generales"

  // Si showParametrosGenerales es true, mostrar el contenido de Parámetros Generales
  if (showParametrosGenerales) {
    return <ParametrosGeneralesContent />
  }

  // Si no, mostrar el dashboard normal
  return (
    <div className="flex-1 space-y-4 px-12 py-6 bg-[#f8faff]">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="mes" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dia">Día</TabsTrigger>
              <TabsTrigger value="semana">Semana</TabsTrigger>
              <TabsTrigger value="mes">Mes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card border-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ventas del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold metric-value">S/. 45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="metric-change-positive flex items-center">
                +20.1% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card border-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Personas Contactadas</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold metric-value">1,245</div>
            <p className="text-xs text-muted-foreground">
              <span className="metric-change-positive flex items-center">
                +10.5% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card border-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Número de Ventas</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold metric-value">349</div>
            <p className="text-xs text-muted-foreground">
              <span className="metric-change-positive flex items-center">
                +12.3% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card border-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Datos Recibidos</CardTitle>
            <FileText className="h-4 w-4 text-[hsl(35,100%,60%)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold metric-value">2,573</div>
            <p className="text-xs text-muted-foreground">
              <span className="metric-change-positive flex items-center">
                +18.7% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>{" "}
              respecto al mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 dashboard-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-800">Ventas Mensuales</CardTitle>
            <CardDescription className="text-gray-500">Comparativa de ventas de los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="pl-6 pb-6 pt-2">
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="col-span-3 dashboard-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-800">Contactos por Fuente</CardTitle>
            <CardDescription className="text-gray-500">Distribución de contactos según su origen</CardDescription>
          </CardHeader>
          <CardContent className="pb-6 pt-2">
            <ContactsChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3 dashboard-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-800">Datos Recibidos</CardTitle>
            <CardDescription className="text-gray-500">
              Evolución de datos recibidos en los últimos 30 días
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6 pt-2">
            <DataReceivedChart />
          </CardContent>
        </Card>
        <Card className="col-span-4 dashboard-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-800">Rendimiento por Programa</CardTitle>
            <CardDescription className="text-gray-500">Ventas por programa educativo</CardDescription>
          </CardHeader>
          <CardContent className="pb-6 pt-2">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Maestría en Gestión Pública</span>
                    <span className="text-sm font-medium text-gray-700">78%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Diplomado en Gestión de Proyectos</span>
                    <span className="text-sm font-medium text-gray-700">65%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-secondary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Curso de Contrataciones del Estado</span>
                    <span className="text-sm font-medium text-gray-700">52%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{ width: "52%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Especialización en Finanzas</span>
                    <span className="text-sm font-medium text-gray-700">45%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-[hsl(35,100%,60%)] h-2.5 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Otros programas</span>
                    <span className="text-sm font-medium text-gray-700">38%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full opacity-70" style={{ width: "38%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
