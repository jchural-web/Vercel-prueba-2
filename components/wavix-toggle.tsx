"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

export function WavixToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // No mostrar este componente ya que ahora está en la barra superior
  return null
}
