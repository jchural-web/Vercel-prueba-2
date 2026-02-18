"use client"

import { useState } from "react"
import { X, Calendar } from "lucide-react"

interface AgregarCompromisoPagoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (fecha: string, monto: number) => void
  cuotaId?: string
}

export function AgregarCompromisoPagoModal({ isOpen, onClose, onSave, cuotaId }: AgregarCompromisoPagoModalProps) {
  const [fecha, setFecha] = useState("")
  const [monto, setMonto] = useState<string>("0")

  if (!isOpen) return null

  const handleSave = () => {
    onSave(fecha, Number.parseFloat(monto))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm overflow-hidden">
        {/* Encabezado */}
        <div className="bg-orange-500 text-white px-4 py-3 flex justify-between items-center">
          <h3 className="font-medium text-lg">Agregar compromiso de pago</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <p className="text-gray-600 mb-4">Complete todos los campos para agregar el compromiso de pago</p>

          <div className="space-y-4">
            {/* Campo de fecha (solo fecha, sin hora) */}
            <div>
              <label htmlFor="fecha-compromiso" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="date"
                  id="fecha-compromiso"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">día/mes/año</p>
            </div>

            {/* Campo de monto */}
            <div>
              <label htmlFor="monto-compromiso" className="block text-sm font-medium text-gray-700 mb-1">
                Monto:
              </label>
              <input
                type="number"
                id="monto-compromiso"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
