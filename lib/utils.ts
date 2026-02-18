import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea una hora en formato de 24 horas a formato AM/PM
 * @param time Hora en formato "HH:MM" (24 horas)
 * @returns Hora en formato "h:MM AM/PM"
 */
export function formatTimeToAMPM(time: string): string {
  if (!time) return ""

  const [hours, minutes] = time.split(":").map(Number)

  if (isNaN(hours) || isNaN(minutes)) return time

  const period = hours >= 12 ? "PM" : "AM"
  const formattedHours = hours % 12 || 12 // Convierte 0 a 12 para el mediodía/medianoche

  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`
}

/**
 * Formatea una fecha y hora completa a formato AM/PM
 * @param dateTimeString Fecha y hora en formato ISO o similar
 * @returns Fecha y hora con el tiempo en formato AM/PM
 */
export function formatDateTimeToAMPM(dateTimeString: string): string {
  if (!dateTimeString) return ""

  try {
    const date = new Date(dateTimeString)
    if (isNaN(date.getTime())) return dateTimeString

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12

    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()

    return `${day}/${month}/${year} ${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`
  } catch (error) {
    return dateTimeString
  }
}
