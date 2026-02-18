"use client"

import { FileText } from "lucide-react"
import { useState } from "react"
import { ReporteIncidenciaModal } from "./reporte-incidencia-modal"

export default function ReporteIncidenciaButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300 ease-in-out z-40 cursor-pointer"
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        <FileText style={{ width: "20px", height: "20px", color: "white" }} />
        <span style={{ color: "white", fontWeight: "500" }}>Reporte de incidencia</span>
      </div>

      <ReporteIncidenciaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
