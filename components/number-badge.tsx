"use client"

interface NumberBadgeProps {
  number: number | string
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function NumberBadge({ number, className = "", size = "md" }: NumberBadgeProps) {
  // Determinar el tamaño del badge
  const sizeClasses = {
    sm: "h-5 w-5 text-xs",
    md: "h-6 w-6 text-sm",
    lg: "h-7 w-7 text-base",
  }

  return (
    <div
      className={`bg-[#0a5d36] text-white font-semibold rounded-full flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      {number}
    </div>
  )
}
