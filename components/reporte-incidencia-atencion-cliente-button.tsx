"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { ReporteIncidenciaAtencionClienteModal } from "./reporte-incidencia-atencion-cliente-modal"

interface ReporteIncidenciaAtencionClienteButtonProps {
  onButtonClick?: () => void
}

export function ReporteIncidenciaAtencionClienteButton({ onButtonClick }: ReporteIncidenciaAtencionClienteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick()
    }
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleButtonClick}
          className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-md shadow-lg transition-colors"
        >
          <FileText className="mr-2 h-5 w-5" />
          <span>Reporte de incidencia</span>
        </button>
      </div>
      <ReporteIncidenciaAtencionClienteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
