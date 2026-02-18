"use client"

import { usePathname } from "next/navigation"

export function OkrsKpisInfoBar() {
  const pathname = usePathname()

  // Solo mostrar en las páginas de configuración de OKRs/KPIs
  if (!pathname.startsWith("/gestion-desempeno/configuracion/okrs-kpis")) {
    return null
  }

  // Retornar un div vacío en lugar de la cabecera
  return null
}
