"use client"

import type React from "react"
import { Play } from "lucide-react"
import { useComentario } from "@/contexts/comentario-context"

type ExecuteButtonProps = {
  color: "red" | "green" | "yellow"
  text?: string
  onClick?: () => void
  className?: string
}

export const ExecuteButton: React.FC<ExecuteButtonProps> = ({ color, text = "Ejecutar", onClick, className = "" }) => {
  const { setShowComentarioButton } = useComentario()

  // Mapeo de colores a clases de Tailwind
  const colorClasses = {
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  }

  const handleClick = () => {
    // Mostrar el botón de comentarios cuando se ejecuta
    setShowComentarioButton(true)

    // Llamar al onClick original si existe
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-white ${colorClasses[color]} ${className}`}
    >
      <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white">
        <Play size={10} fill="white" className="ml-0.5" />
      </div>
      <span className="text-xs font-medium">{text}</span>
    </button>
  )
}
