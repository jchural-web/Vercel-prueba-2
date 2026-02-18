"use client"

import { Button } from "@/components/ui/button"

export function MensajesRecibidosTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full agenda-table">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Actividad</th>
              <th className="px-6 py-3">Centro de Costo</th>
              <th className="px-6 py-3">Contacto</th>
              <th className="px-6 py-3 text-right">Fecha de Seguimiento</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Fila 1 */}
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-1 h-12 bg-green-500 rounded-full mr-4"></div>
                  <div>Llamada de seguimiento</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      Regular
                    </span>
                    <span>Carlos Mendoza</span>
                  </div>
                  <div className="text-sm text-purple-600 font-medium">LEAN SSSB ONLINE 2024 II LIMA</div>
                  <div className="text-xs text-gray-500">Subestado: Pago atrasado</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Correos
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="text-sm text-gray-900">17/04/2025</div>
                <div className="text-xs text-gray-500">2:30 PM</div>
                <Button variant="default" size="sm" className="mt-2 bg-green-500 hover:bg-green-600">
                  Ejecutar
                </Button>
              </td>
            </tr>

            {/* Fila 2 */}
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-1 h-12 bg-yellow-500 rounded-full mr-4"></div>
                  <div>Llamada de seguimiento</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      Regular
                    </span>
                    <span>Ana María Gutiérrez</span>
                  </div>
                  <div className="text-sm text-purple-600 font-medium">D SIG ONLINE 2025 II LIMA</div>
                  <div className="text-xs text-gray-500">Subestado: Pago atrasado</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Portal Web
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="text-sm text-gray-900">17/04/2025</div>
                <div className="text-xs text-gray-500">11:45 AM</div>
                <Button variant="default" size="sm" className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                  Ejecutar
                </Button>
              </td>
            </tr>

            {/* Fila 3 */}
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-1 h-12 bg-red-500 rounded-full mr-4"></div>
                  <div>Llamada de seguimiento</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      Regular
                    </span>
                    <span>Roberto Sánchez</span>
                  </div>
                  <div className="text-sm text-purple-600 font-medium">LEAN SSSB AONLINE 2025 I BOGOTÁ</div>
                  <div className="text-xs text-gray-500">Subestado: Pago atrasado</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  WhatsApp
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="text-sm text-gray-900">16/04/2025</div>
                <div className="text-xs text-gray-500">6:20 PM</div>
                <Button variant="default" size="sm" className="mt-2 bg-red-500 hover:bg-red-600">
                  Ejecutar
                </Button>
              </td>
            </tr>

            {/* Fila 4 */}
            <tr>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-1 h-12 bg-green-500 rounded-full mr-4"></div>
                  <div>Llamada de seguimiento</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      Regular
                    </span>
                    <span>Patricia Flores</span>
                  </div>
                  <div className="text-sm text-purple-600 font-medium">D SIG ONLINE 2025 II LIMA</div>
                  <div className="text-xs text-gray-500">Subestado: Pago atrasado</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Seguimiento de WhatsApp
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="text-sm text-gray-900">15/04/2025</div>
                <div className="text-xs text-gray-500">9:00 AM</div>
                <Button variant="default" size="sm" className="mt-2 bg-green-500 hover:bg-green-600">
                  Ejecutar
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button variant="outline" size="sm">
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Página <span className="font-medium">1</span> de <span className="font-medium">3</span> |
              <span className="mx-1">1 - 10 de 22 items</span>
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <Button variant="outline" size="sm" className="rounded-l-md">
                &laquo;
              </Button>
              <Button variant="outline" size="sm">
                &lsaquo;
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                &rsaquo;
              </Button>
              <Button variant="outline" size="sm" className="rounded-r-md">
                &raquo;
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
