"use client"

import type { ReactNode } from "react"

interface BotonDeTablaProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  color?: "green" | "blue" | "orange" | "purple" | "red" | "gray"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export default function BotonDeTabla({
  children,
  onClick,
  className = "",
  color = "blue",
  disabled = false,
  type = "button",
}: BotonDeTablaProps) {
  const colorClasses = {
    green: "bg-green-500 hover:bg-green-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center px-3 py-1.5 rounded-md text-white text-xs font-medium ${colorClasses[color]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  )
}
