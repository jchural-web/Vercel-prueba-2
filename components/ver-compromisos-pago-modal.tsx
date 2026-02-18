"use client"

import { X } from "lucide-react"

interface Compromiso {
  id: number
  fechaRegistro: string
  fechaCompromiso: string
  monto: number
  cumplio: boolean
}

interface VerCompromisosPagoModalProps {
  isOpen: boolean
  onClose: () => void
  compromisos: Compromiso[]
  cuotaId?: string
}

export function VerCompromisosPagoModal({ isOpen, onClose, compromisos, cuotaId }: VerCompromisosPagoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
        {/* Encabezado */}
        <div className="bg-orange-500 text-white px-4 py-3 flex justify-between items-center">
          <h3 className="font-medium text-lg">Compromisos de pago - Cuota {cuotaId}</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-blue-600 bg-blue-50 w-[10%]">N°</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-blue-600 bg-blue-50 w-[25%]">
                    Fecha de registro
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-blue-600 bg-blue-50 w-[25%]">
                    Fecha de compromiso
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-blue-600 bg-blue-50 w-[20%]">Monto</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-blue-600 bg-blue-50 w-[20%]">
                    Cumplió con el compromiso
                  </th>
                </tr>
              </thead>
              <tbody>
                {compromisos.map((compromiso, index) => (
                  <tr
                    key={compromiso.id}
                    className={index % 2 === 0 ? "border-b border-gray-100" : "border-b border-gray-100 bg-gray-50"}
                  >
                    <td className="py-3 px-4 text-sm text-gray-600">{compromiso.id}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                        {compromiso.fechaRegistro}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                        {compromiso.fechaCompromiso}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{compromiso.monto.toFixed(2)} PEN</td>
                    <td className="py-3 px-4 text-sm font-medium text-red-600">{compromiso.cumplio ? "SÍ" : "NO"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botón de cerrar */}
        <div className="px-4 py-3 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
