"use client"

import type { ReactNode } from "react"
import { InstantTooltip } from "./instant-tooltip"
import { Phone, MessageSquare, Info } from "lucide-react"

interface SeguimientoItemProps {
  id: string
  title: string
  hasTooltip?: boolean
  tooltipContent?: ReactNode
  onClick?: (id: string) => void
  onLlamadaClick?: (id: string) => void
  onWhatsAppClick?: (id: string) => void
  isHighlighted?: boolean
}

export function SeguimientoItem({
  id,
  title,
  hasTooltip = false,
  tooltipContent,
  onClick,
  onLlamadaClick,
  onWhatsAppClick,
  isHighlighted = false,
}: SeguimientoItemProps) {
  return (
    <div
      className={`p-4 mb-2 rounded-md border ${isHighlighted ? "border-red-200 bg-red-50" : "border-blue-200 bg-blue-50"}`}
      onClick={() => onClick && onClick(id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className={`mr-2 ${isHighlighted ? "text-red-500" : "text-blue-500"}`}>
            {isHighlighted ? "📄" : "📋"}
          </span>

          {hasTooltip ? (
            <InstantTooltip content={tooltipContent} position="right" width="450px">
              <div className="flex items-center">
                <span>{title}</span>
                <Info className="h-4 w-4 ml-2 text-red-500" />
              </div>
            </InstantTooltip>
          ) : (
            <span>{title}</span>
          )}
        </div>

        {(onLlamadaClick || onWhatsAppClick) && (
          <div className="flex space-x-2">
            {onLlamadaClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onLlamadaClick(id)
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
              >
                <Phone className="h-4 w-4 mr-1" />
                Seguimiento por llamada
              </button>
            )}

            {onWhatsAppClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onWhatsAppClick(id)
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Seguimiento por WhatsApp
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
