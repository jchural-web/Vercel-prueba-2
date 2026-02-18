"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Mail, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ClientDetailViewProps {
  clientData: {
    name: string
    course: string
    program: string
    location: string
    currentPhase: string
    profileStatus: {
      text: string
      type: "excellent" | "good" | "regular" | "poor"
    }
    contactInfo: {
      mobile1: string
      mobile2: string
      phone1: string
      phone2: string
      email1: string
      email2: string
      dataCategory: string
    }
  }
  onBack: () => void
}

export function ClientDetailView({ clientData, onBack }: ClientDetailViewProps) {
  const [activeTab, setActiveTab] = useState("speech")

  // Mapeo de colores para el estado del perfil
  const profileStatusColors = {
    excellent: "bg-green-600",
    good: "bg-blue-600",
    regular: "bg-yellow-600",
    poor: "bg-red-600",
  }

  return (
    <div className="flex flex-col w-full">
      {/* Botón para volver */}
      <div className="mb-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
          <span>← Volver</span>
        </Button>
      </div>

      {/* Cabecera del cliente */}
      <div className="mb-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-blue-700">{clientData.name}</h2>
              <p className="text-gray-600 text-sm">{clientData.course}</p>
              <p className="text-gray-600 text-sm">{clientData.program}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <img src="/placeholder.svg?height=20&width=20" alt="Bandera" className="h-5 w-5" />
                <span className="text-gray-600">{clientData.location}</span>
              </div>
              <div className="mt-1">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Fase Actual: {clientData.currentPhase}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de estado del perfil */}
      <div
        className={`w-full p-3 mb-4 text-white text-center font-medium ${profileStatusColors[clientData.profileStatus.type]}`}
      >
        {clientData.profileStatus.text}
      </div>

      {/* Pestañas de navegación */}
      <Tabs defaultValue="speech" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap gap-2 mb-4">
          <TabsTrigger value="speech" className="rounded-lg px-3 py-2 text-sm font-medium">
            Speech
          </TabsTrigger>
          <TabsTrigger value="editPersonalData" className="rounded-lg px-3 py-2 text-sm font-medium">
            Editar Datos Personales
          </TabsTrigger>
          <TabsTrigger value="competitors" className="rounded-lg px-3 py-2 text-sm font-medium">
            Competidores
          </TabsTrigger>
          <TabsTrigger value="paymentSchedule" className="rounded-lg px-3 py-2 text-sm font-medium">
            Cronograma de Pagos
          </TabsTrigger>
          <TabsTrigger value="programSummary" className="rounded-lg px-3 py-2 text-sm font-medium">
            Resumen Programas
          </TabsTrigger>
          <TabsTrigger value="programInfo" className="rounded-lg px-3 py-2 text-sm font-medium">
            Información del Programa
          </TabsTrigger>
          <TabsTrigger value="programDocs" className="rounded-lg px-3 py-2 text-sm font-medium">
            Documentos del Programa
          </TabsTrigger>
          <TabsTrigger value="faq" className="rounded-lg px-3 py-2 text-sm font-medium">
            Preguntas Frecuentes
          </TabsTrigger>
          <TabsTrigger value="legalDocs" className="rounded-lg px-3 py-2 text-sm font-medium">
            Documentos Legales
          </TabsTrigger>
        </TabsList>

        {/* Contenido de la pestaña Speech */}
        <TabsContent value="speech" className="mt-2">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-green-600 mb-4">FASE 1: VALIDACION DE LA SOLICITUD DE INFORMACIÓN</h3>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Encabezado con título */}
              <div className="p-4 bg-white">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <Info className="h-5 w-5" />
                  INFORMACIÓN DEL CLIENTE
                </div>
              </div>

              {/* Línea divisoria */}
              <div className="h-[2px] bg-gray-300 w-full"></div>

              {/* Contenido del formulario */}
              <div className="p-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label className="text-sm font-medium">Celular 1</label>
                    <div className="flex gap-1">
                      <Input value={clientData.contactInfo.mobile1} readOnly className="bg-gray-100" />
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 text-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <input type="checkbox" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label className="text-sm font-medium">Celular 2</label>
                    <div className="flex gap-1">
                      <Input value={clientData.contactInfo.mobile2} readOnly className="bg-gray-100" />
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 text-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <input type="checkbox" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label className="text-sm font-medium">Teléfono 1</label>
                    <div className="flex gap-1">
                      <Input value={clientData.contactInfo.phone1} readOnly className="bg-gray-100" />
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label className="text-sm font-medium">Teléfono 2</label>
                    <div className="flex gap-1">
                      <Input value={clientData.contactInfo.phone2} readOnly className="bg-gray-100" />
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label className="text-sm font-medium">Email 1</label>
                    <div className="flex gap-1">
                      <Input value={clientData.contactInfo.email1} readOnly className="bg-gray-100" />
                      <Button variant="outline" size="icon" className="h-10 w-10 text-blue-500">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label className="text-sm font-medium">Email 2</label>
                    <div className="flex gap-1">
                      <Input value={clientData.contactInfo.email2} readOnly className="bg-gray-100" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label className="text-sm font-medium">Categoría de Dato</label>
                    <div className="flex gap-1">
                      <Input value={clientData.contactInfo.dataCategory} readOnly className="bg-gray-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Ir al reporte de Incidencia de Llamada
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Contenido de otras pestañas (vacío por ahora) */}
        <TabsContent value="editPersonalData">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">Contenido de Editar Datos Personales (pendiente)</p>
          </div>
        </TabsContent>

        <TabsContent value="competitors">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">Contenido de Competidores (pendiente)</p>
          </div>
        </TabsContent>

        <TabsContent value="paymentSchedule">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">Contenido de Cronograma de Pagos (pendiente)</p>
          </div>
        </TabsContent>

        <TabsContent value="programSummary">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">Contenido de Resumen Programas (pendiente)</p>
          </div>
        </TabsContent>

        <TabsContent value="programInfo">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">Contenido de Información del Programa (pendiente)</p>
          </div>
        </TabsContent>

        <TabsContent value="programDocs">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">Contenido de Documentos del Programa (pendiente)</p>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">Contenido de Preguntas Frecuentes (pendiente)</p>
          </div>
        </TabsContent>

        <TabsContent value="legalDocs">
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">Contenido de Documentos Legales (pendiente)</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
