import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"
import { WavixToggle } from "./wavix-toggle"

export function AgendaAtencionClienteInfoBar() {
  return (
    <div className="px-6 md:px-8">
      {/* Add a container div with max-width to match the table */}
      <div className="max-w-[calc(100%-2rem)] mx-auto">
        {/* Wavix Toggle - Centered and purple */}
        <div className="flex justify-center mb-4 mt-2">
          <WavixToggle />
        </div>

        {/* Información de métricas - Replicando exactamente el estilo de Agenda Comercial */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 md:py-8">
          <Card className="shadow-sm p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm flex items-center">
                  Actividades Totales
                  <div className="relative group">
                    <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                    <div className="absolute z-10 w-72 p-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none left-0 top-6">
                      Considera: Actividades con Llamada Real Asociada + Actividades Reportadas como Respuestas
                      Telefonicas sin Llamada Real Asociada + Actividades Reportadas por Otro Medio
                    </div>
                  </div>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-bold">21</span>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm">+15.2%</span>
                  <span className="text-gray-500 text-xs ml-1">respecto al mes anterior</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm flex items-center">
                  Actividades Ejecutadas
                  <div className="relative group">
                    <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                    <div className="absolute z-10 w-72 p-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none left-0 top-6">
                      Considera: Actividades con Llamada Real Asociada + Actividades Reportadas como Respuestas
                      Telefonicas sin Llamada Real Asociada + Actividades Reportadas por Otro Medio
                    </div>
                  </div>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-bold">5</span>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm">+8.3%</span>
                  <span className="text-gray-500 text-xs ml-1">respecto al mes anterior</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm flex items-center">
                  Compromisos de pago
                  <div className="relative group">
                    <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                    <div className="absolute z-10 w-72 p-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none left-0 top-6">
                      Considera: Actividades con Llamada Real Asociada + Actividades Reportadas como Respuestas
                      Telefonicas sin Llamada Real Asociada + Actividades Reportadas por Otro Medio
                    </div>
                  </div>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500"
                >
                  <path d="M16.5 9.4c.4-.9 1.5-1.4 2.5-1.3.9.1 1.6.7 1.9 1.5-.3.6-1 1.1-1.7 1.2-.8.1-1.5-.4-1.9-1.2z"></path>
                  <path d="M7.5 9.4c-.4-.9-1.5-1.4-2.5-1.3-.9.1-1.6.7-1.9 1.5.3.6 1 1.1 1.7 1.2.8.1 1.5-.4 1.9-1.2z"></path>
                  <path d="M2 15.5V16c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-.5a8 8 0 0 0-2-5.8c-1.3-1.7-3-2.7-5-2.7-1.9 0-3.6 1-5 2.7a8 8 0 0 0-2 5.8z"></path>
                </svg>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-bold">8</span>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm">+12.5%</span>
                  <span className="text-gray-500 text-xs ml-1">respecto al mes anterior</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm p-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm flex items-center">
                  Monto recaudado
                  <div className="relative group">
                    <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                    <div className="absolute z-10 w-72 p-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none right-0 top-6 transform translate-x-[-90%]">
                      Considera: Actividades con Llamada Real Asociada + Actividades Reportadas como Respuestas
                      Telefonicas sin Llamada Real Asociada + Actividades Reportadas por Otro Medio
                    </div>
                  </div>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7"></path>
                </svg>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-bold">S/ 15,420</span>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm">+18.7%</span>
                  <span className="text-gray-500 text-xs ml-1">respecto al mes anterior</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
