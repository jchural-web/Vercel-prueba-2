export interface OpportunityData {
  id: string
  docente: string
  tipoOportunidad: "asignado-curso" | "general"
  curso: string
  flujo: string
}

export interface OpportunityCard {
  id: string
  title: string
  description: string
  category: string
  status: "ACTIVO" | "INACTIVO"
}
