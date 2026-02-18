import { Card, CardContent } from "@/components/ui/card"
import { Info, Phone } from "lucide-react"
import { WavixToggle } from "./wavix-toggle"

export function AgendaInfoBar() {
  return (
    <div className="px-6 md:px-8">
      {/* Add a container div with max-width to match the table */}
      <div className="max-w-[calc(100%-2rem)] mx-auto">
        {/* Wavix Toggle - Centered and purple */}
        <div className="flex justify-center mb-4 mt-2">
          <WavixToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 md:py-8">
          <Card className="shadow-md">
            <CardContent className="p-6">
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
                  <Phone className="h-5 w-5 text-purple-600" />
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold">21</span>
                  <div className="flex items-center mt-2">
                    <span className="text-green-600 text-sm">+15.2%</span>
                    <span className="text-gray-500 text-xs ml-1">respecto al mes anterior</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
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
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm flex items-center">
                    ITs Generados
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold">1</span>
                  <div className="flex items-center mt-2">
                    <span className="text-green-600 text-sm">+5.0%</span>
                    <span className="text-gray-500 text-xs ml-1">respecto al mes anterior</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm flex items-center">
                    IPs Generados
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold">0</span>
                  <div className="flex items-center mt-2">
                    <span className="text-green-600 text-sm">+0.0%</span>
                    <span className="text-gray-500 text-xs ml-1">respecto al mes anterior</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
