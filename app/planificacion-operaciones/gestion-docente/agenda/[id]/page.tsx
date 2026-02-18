"use client"

import React from "react"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  User,
  Mail,
  MessageCircle,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Send,
  GraduationCap,
  Phone,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  X,
  GitBranch,
  Plus,
  Check,
  FileText,
  BookOpen,
  ClipboardList,
  Info,
  MessageSquare,
  Play,
  Bot,
  CheckCircle2,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AudioPlayerModal } from "@/components/audio-player-modal"
import { EmailViewerModal } from "@/components/email-viewer-modal"
import { WhatsAppTemplateModal } from "@/components/whatsapp-template-modal"
import { WhatsAppVerificationModal } from "@/components/whatsapp-verification-modal"
import { EmailVerificationModal } from "@/components/email-verification-modal"
import { CallVerificationModal } from "@/components/call-verification-modal"
import { StartSubActivityConfirmModal } from "@/components/start-sub-activity-confirm-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AgendaContainer } from "@/components/agenda-container"

interface EmailItem {
  id: number
  date: string
  time: string
  status: string
  subject: string
  centroCosto?: string // Added field
  sender: string
  recipient: string
  content: string
  isRead: boolean
  hideFromList?: boolean
}

interface EmailThread {
  subject: string
  sender: string
  recipient: string
  messages: Array<{
    id: string
    sender: string
    content: string
    date: string
    isOutgoing: boolean
  }>
}

export default function DocenteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("informacion")
  const [contactSummaryExpanded, setContactSummaryExpanded] = useState(true)
  const [cursosExpanded, setCursosExpanded] = useState(false) // Renamed correosExpanded to cursosExpanded
  const [isArbolOcurrenciasOpen, setIsArbolOcurrenciasOpen] = useState(false)
  const [isMarcarOcurrenciaOpen, setIsMarcarOcurrenciaOpen] = useState(false)
  const [selectedArbolCard, setSelectedArbolCard] = useState<{
    nombre: string
    color: string
    icon: React.ReactNode
  } | null>(null)
  const [selectedOcurrenciaOption, setSelectedOcurrenciaOption] = useState<{
    titulo: string
    tipo: string
    descripcion: string
  } | null>(null)
  const [selectedOcurrencia, setSelectedOcurrencia] = useState<{
    actividad: string
    tipo: string
    descripcion: string
  } | null>(null)
  const [expandedActividades, setExpandedActividades] = useState<number[]>([])
  const [comentarioOcurrencia, setComentarioOcurrencia] = useState("")
  const [fechaSiguienteContacto, setFechaSiguienteContacto] = useState("")
  const [medioComunicacion, setMedioComunicacion] = useState<string | null>(null)
  const [isValidarFlujoOpen, setIsValidarFlujoOpen] = useState(false)
  const [isAgregarActividadesOpen, setIsAgregarActividadesOpen] = useState(false)
  const [validarFlujoSeleccionadas, setValidarFlujoSeleccionadas] = useState<string[]>([
    "Confirmación de sesión",
    "Recordatorio Subida de notas",
    "Envio Material didáctico",
    "Reporte Semanal",
  ])
  const [agregarActividadesSeleccionadas, setAgregarActividadesSeleccionadas] = useState<string[]>([])
  const [expandedAgregarActividad, setExpandedAgregarActividad] = useState<string | null>(null)
  const [actividadSemanasSeleccionadas, setActividadSemanasSeleccionadas] = useState<Record<string, string[]>>({})
  const [organizarPorSesion, setOrganizarPorSesion] = useState(true)
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [selectedDocente, setSelectedDocente] = useState<"carlos" | "ana">("carlos")
  
  // Estado para gestionar los estados únicos de cada subactividad por sesión y actividad
  const [subactivityStates, setSubactivityStates] = useState<Record<string, {
    estado: "por_ejecutar" | "ejecutada"
    iniciarDisabled: boolean
    validarDisabled: boolean
    comentario?: string
    canal?: "whatsapp" | "llamada" | "correo"
    etiquetaAdicional?: {
      texto: string
      color: "blue" | "green" | "red" | "gray"
    }
    colorPorEjecutar?: "blue" | "gray"
  }>>({
    // Formato clave: "sesionNum-actividadNombre-subactividadNum"
    // Ejemplo: "1-Confirmación de sesión-1"
    "1-Confirmación de sesión-1": {
      estado: "ejecutada",
      iniciarDisabled: true,
      validarDisabled: true,
      validadoPorHumano: true,
      comentario: "El docente no respondió la comunicación",
      etiquetaAdicional: { texto: "no respondió", color: "yellow" }
    },
    "1-Confirmación de sesión-2": { 
      estado: "ejecutada", 
      iniciarDisabled: true,
      validarDisabled: false,
      comentario: "Docente confirmó asistencia",
      etiquetaAdicional: { texto: "Confirmó", color: "green" }
    },
    "1-Confirmación de sesión-3": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "1-Confirmación de sesión-4": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "1-Recordatorio Subida de notas-1": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: true, validadoPorHumano: true, comentario: "El docente no respondió la comunicación", etiquetaAdicional: { texto: "No respondió", color: "yellow" } },
    "1-Recordatorio Subida de notas-2": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: false, validadoPorHumano: true, comentario: "El docente no respondió la comunicación", etiquetaAdicional: { texto: "No respondió", color: "yellow" } },
    "1-Recordatorio Subida de notas-3": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: true, validadoPorHumano: true, comentario: "El docente no respondió la comunicación", etiquetaAdicional: { texto: "No respondió", color: "yellow" } },
    "1-Recordatorio Subida de notas-4": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "1-Envio Material didáctico-1": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: false, comentario: "Docente confirmó asistencia", etiquetaAdicional: { texto: "Confirmó", color: "green" } },
    "1-Envio Material didáctico-2": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "1-Envio Material didáctico-3": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "1-Envio Material didáctico-4": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "2-Confirmación de sesión-1": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: true, validadoPorHumano: false, desvalidado: true, comentario: "El docente no respondió la comunicación", etiquetaAdicional: { texto: "No respondió", color: "yellow" }, etiquetaDesvalidada: { texto: "Confirmó", color: "green" } },
    "2-Confirmación de sesión-2": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: true, validadoPorHumano: true, comentario: "El docente no respondió la comunicación", etiquetaAdicional: { texto: "No respondió", color: "yellow" } },
    "2-Confirmación de sesión-3": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: false, validadoPorHumano: false, comentario: "Confirmación recibida correctamente", etiquetaAdicional: { texto: "Confirmó", color: "green" } },
    "2-Confirmación de sesión-4": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "2-Recordatorio Subida de notas-1": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: true, validadoPorHumano: false, desvalidado: true, comentario: "El docente no respondió la comunicación", etiquetaAdicional: { texto: "No respondió", color: "yellow" }, etiquetaDesvalidada: { texto: "Confirmó", color: "green" } },
    "2-Recordatorio Subida de notas-2": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: true, validadoPorHumano: true, comentario: "El docente no respondió la comunicación", etiquetaAdicional: { texto: "No respondió", color: "yellow" } },
    "2-Recordatorio Subida de notas-3": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: true, validadoPorHumano: true, comentario: "El docente no respondió la comunicación", etiquetaAdicional: { texto: "No respondió", color: "yellow" } },
    "2-Recordatorio Subida de notas-4": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "2-Envio Material didáctico-1": { estado: "ejecutada", iniciarDisabled: true, validarDisabled: false, desvalidado: true, comentario: "Docente rechazo la sesión", etiquetaAdicional: { texto: "Rechazo", color: "red" } },
    "2-Envio Material didáctico-2": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "2-Envio Material didáctico-3": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "2-Envio Material didáctico-4": { estado: "por_ejecutar", iniciarDisabled: true, validarDisabled: true },
    "3-Confirmación de sesión-1": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Confirmación de sesión-2": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Confirmación de sesión-3": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Confirmación de sesión-4": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Recordatorio Subida de notas-1": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Recordatorio Subida de notas-2": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Recordatorio Subida de notas-3": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Recordatorio Subida de notas-4": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Envio Material didáctico-1": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Envio Material didáctico-2": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Envio Material didáctico-3": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
    "3-Envio Material didáctico-4": { estado: "por_ejecutar", iniciarDisabled: false, validarDisabled: true, colorPorEjecutar: "blue" },
  })
  const [audioModal, setAudioModal] = useState<{
    isOpen: boolean
    audioUrl: string
    callInfo: any
  }>({
    isOpen: false,
    audioUrl: "",
    callInfo: null,
  })

  const [isEmailViewerOpen, setIsEmailViewerOpen] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<any>(null)
  const [isContactSummaryOpen, setIsContactSummaryOpen] = useState(true)
  const [sesionFilter, setSesionFilter] = useState<"todas" | "ejecutadas" | "por_ejecutar">("todas")
  const [emailUnreadCount, setEmailUnreadCount] = useState(1)
  const [emailData, setEmailData] = useState<EmailItem[]>([
    {
      id: 1,
      date: "2024-11-20",
      time: "10:30",
      status: "Recibido",
      subject: "Confirmación de horarios",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      sender: "Ana García",
      recipient: "carlos.rodriguez@gmail.com",
      content: `<p>Estimado Carlos,</p><p>Le escribo para confirmar los horarios del curso...</p>`,
      isRead: false,
    },
    {
      id: 2,
      date: "2024-11-17",
      time: "09:00",
      status: "Recibido",
      subject: "Actualización de materiales",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      sender: "coordinacion@bsginstitute.com",
      recipient: "carlos.rodriguez@gmail.com",
      content: `<p>Estimado Carlos,</p><p>Necesitamos que actualices los materiales del curso lo antes posible. Varios estudiantes han reportado que el contenido está desactualizado.</p><p>Quedamos atentos.</p><p>Saludos,</p><p>Equipo de Coordinación</p>`,
      isRead: true,
    },
    {
      id: 3,
      date: "2024-11-18",
      time: "14:15",
      status: "Enviado",
      subject: "Actualización de materiales",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      sender: "carlos.rodriguez@gmail.com",
      recipient: "coordinacion@bsginstitute.com",
      content: `<p>Estimado equipo,</p><p>Les informo que he actualizado los materiales del curso. Todos los contenidos han sido revisados y están disponibles en la plataforma.</p><p>Saludos,</p><p>Carlos</p>`,
      isRead: true,
      hideFromList: true,
    },
  ])

  const [isCalendarioOpen, setIsCalendarioOpen] = useState(true)
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date(2025, 0, 1)) // January 2025
  const [isDetallesCursoOpen, setIsDetallesCursoOpen] = useState(true)
  const [isCursosModalOpen, setIsCursosModalOpen] = useState(false)

  // Flujo tab state
  const [flujoGlobalState, setFlujoGlobalState] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: true,
  })
  const [flujoCursosSelection, setFlujoCursosSelection] = useState<Record<number, string[]>>({
    1: [],
    2: [],
    3: [],
    4: [],
  })
  const [openCursosDropdown, setOpenCursosDropdown] = useState<number | null>(null)
  const [isSelectCursosModalOpen, setIsSelectCursosModalOpen] = useState(false)
  const [currentFlujoForCursos, setCurrentFlujoForCursos] = useState<number | null>(null)
  const [tempCursosSelection, setTempCursosSelection] = useState<string[]>([])
  const [isAddFlujoModalOpen, setIsAddFlujoModalOpen] = useState(false)
  const [selectedFlujosToAdd, setSelectedFlujosToAdd] = useState<number[]>([])
  
  // Resolver modal state
  const [isResolverModalOpen, setIsResolverModalOpen] = useState(false)
  const [resolverEstado, setResolverEstado] = useState<string>("confirmo")
  const [resolverCanal, setResolverCanal] = useState<string>("whatsapp")
  const [resolverComentario, setResolverComentario] = useState<string>("")
  const [currentResolvingActivity, setCurrentResolvingActivity] = useState<{
    actividad: string
    sesion: number
  } | null>(null)

  // WhatsApp Verification modal state
  const [isWhatsAppVerificationOpen, setIsWhatsAppVerificationOpen] = useState(false)
  const [whatsAppVerificationBlocked, setWhatsAppVerificationBlocked] = useState(false)
  const [whatsAppVerificationError, setWhatsAppVerificationError] = useState<string | null>(null)
  const [whatsAppVerificationSource, setWhatsAppVerificationSource] = useState<string | null>(null)

  // Email Verification modal state
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false)
  const [emailVerificationBlocked, setEmailVerificationBlocked] = useState(false)
  const [emailVerificationError, setEmailVerificationError] = useState<string | null>(null)
  const [emailVerificationSource, setEmailVerificationSource] = useState<string | null>(null)

  // Call Verification modal state
  const [isCallVerificationOpen, setIsCallVerificationOpen] = useState(false)
  const [callVerificationBlocked, setCallVerificationBlocked] = useState(false)
  const [callVerificationError, setCallVerificationError] = useState<string | null>(null)

  // Start Sub-activity confirmation modal state
  const [isStartSubActivityModalOpen, setIsStartSubActivityModalOpen] = useState(false)
  const [selectedSubActivityToStart, setSelectedSubActivityToStart] = useState<{ activity: string; subactivity: number; fullName?: string; sesionNum?: number } | null>(null)
  
  // Track next sub-activity to execute for each activity/session combination
  const [nextSubActivityByActivity, setNextSubActivityByActivity] = useState<Record<string, number>>({
    "3-Confirmación de sesión": 2,
    "3-Recordatorio Subida de notas": 2,
    "3-Envio Material didáctico": 2,
  })

  // Course sessions data
  const sesionesDelCurso = [
    { id: "sesion-1", nombre: "Sesión 1", fecha: "24/04/2025" },
    { id: "sesion-2", nombre: "Sesión 2", fecha: "31/04/2025" },
    { id: "sesion-3", nombre: "Sesión 3", fecha: "07/05/2025" },
    { id: "sesion-4", nombre: "Sesión 4", fecha: "14/05/2025" },
    { id: "sesion-5", nombre: "Sesión 5", fecha: "21/05/2025" },
  ]

  // Handler functions for Árbol de Ocurrencias modal
  const handleSelectArbolCard = (nombre: string, color: string, icon: React.ReactNode) => {
    setSelectedArbolCard({ nombre, color, icon })
  }

  const handleBackToArbolGrid = () => {
    setSelectedArbolCard(null)
    setSelectedOcurrenciaOption(null)
  }

  const handleSelectOcurrenciaOption = (titulo: string, tipo: string, descripcion: string) => {
    setSelectedOcurrenciaOption({ titulo, tipo, descripcion })
  }

  const handleBackToOcurrenciaOptions = () => {
    setSelectedOcurrenciaOption(null)
  }

  const handleSubmitOcurrencia = () => {
    // Handle the occurrence submission
    console.log("[v0] Submitting occurrence:", {
      actividad: selectedArbolCard?.nombre,
      ocurrencia: selectedOcurrenciaOption,
      comentario: comentarioOcurrencia,
      fechaSiguienteContacto,
      medioComunicacion
    })
    
    // Close modal and reset state
    setIsArbolOcurrenciasOpen(false)
    setSelectedArbolCard(null)
    setSelectedOcurrenciaOption(null)
    setComentarioOcurrencia("")
    setFechaSiguienteContacto("")
    setMedioComunicacion(null)
  }

  const cursosDisponibles = [
    { id: "curso1", nombre: "Introduccion a la Programacion" },
    { id: "curso2", nombre: "Fundamentos de Base de Datos" },
    { id: "curso3", nombre: "Desarrollo Web Frontend" },
  ]

  // All available flujos (for the modal)
  const allAvailableFlujos = [
    { id: 1, nombre: "Confirmacion de Sesion", descripcion: "Asegurar confirmacion 24h antes", categoria: "Ejecucion de Curso", actividades: 6, estado: "En ejecución" },
    { id: 2, nombre: "Recordatorio Subida Notas", descripcion: "Recordar subir notas post-sesion", categoria: "Ejecucion de Curso", actividades: 4, estado: "En ejecución" },
    { id: 3, nombre: "Reporte Semanal", descripcion: "Envio cada lunes 9am", categoria: "General", actividades: 2, estado: "INACTIVO" },
    { id: 4, nombre: "Envio Material Didactico", descripcion: "7 dias antes sesion inicial", categoria: "Ejecucion de Curso", actividades: 3, estado: "En ejecución" },
    { id: 5, nombre: "Encuesta de Satisfaccion", descripcion: "Enviar encuesta post-curso", categoria: "General", actividades: 2, estado: "En ejecución" },
    { id: 6, nombre: "Recordatorio de Asistencia", descripcion: "Notificar 2h antes de sesion", categoria: "Ejecucion de Curso", actividades: 3, estado: "En ejecución" },
  ]

  // Flujos already assigned to this docente (ids 1-4 are assigned)
  const assignedFlujoIds = [1, 2, 3, 4]

  const getUnassignedFlujos = () => {
    return allAvailableFlujos.filter((f) => !assignedFlujoIds.includes(f.id))
  }

  const toggleFlujoSelectionModal = (flujoId: number) => {
    setSelectedFlujosToAdd(prev =>
      prev.includes(flujoId) ? prev.filter(id => id !== flujoId) : [...prev, flujoId]
    )
  }

  const handleAddFlujos = () => {
    // In a real app, this would add the flujos to the docente
    setIsAddFlujoModalOpen(false)
    setSelectedFlujosToAdd([])
  }

  const toggleFlujoGlobal = (flujoId: number) => {
    setFlujoGlobalState(prev => ({
      ...prev,
      [flujoId]: !prev[flujoId]
    }))
    // Reset curso selection when switching to global
    if (!flujoGlobalState[flujoId]) {
      setFlujoCursosSelection(prev => ({
        ...prev,
        [flujoId]: []
      }))
    }
  }

  const toggleCursoSelection = (flujoId: number, cursoId: string) => {
    setFlujoCursosSelection(prev => ({
      ...prev,
      [flujoId]: prev[flujoId].includes(cursoId)
        ? prev[flujoId].filter(id => id !== cursoId)
        : [...prev[flujoId], cursoId]
    }))
  }

  // Courses data for the modal
  const cursosCentroCosto = [
    { id: 1, nombre: "Introduccion a la Programacion", horario: "Martes, Jueves 19:00-21:00", estudiantes: 32, estado: "En ejecución" },
    { id: 2, nombre: "Fundamentos de Base de Datos", horario: "Lunes, Miercoles 18:00-20:00", estudiantes: 28, estado: "En ejecución" },
    { id: 3, nombre: "Desarrollo Web Frontend", horario: "Sabados 09:00-13:00", estudiantes: 25, estado: "En ejecución" },
  ]

// Sample class dates for the docente with course info - Only Tuesdays and Thursdays
  const classDatesWithInfo = [
    // January 2025 - Introduccion a la Programacion (Martes y Jueves only)
    { date: new Date(2025, 0, 7), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 0, 9), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    { date: new Date(2025, 0, 14), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 0, 16), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    { date: new Date(2025, 0, 21), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 0, 23), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    { date: new Date(2025, 0, 28), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 0, 30), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    // February 2025 - Martes y Jueves only
    { date: new Date(2025, 1, 4), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 1, 6), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    { date: new Date(2025, 1, 11), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 1, 13), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    { date: new Date(2025, 1, 18), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 1, 20), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    { date: new Date(2025, 1, 25), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 1, 27), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    // March 2025 - Martes y Jueves only
    { date: new Date(2025, 2, 4), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 2, 6), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
    { date: new Date(2025, 2, 11), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Martes
    { date: new Date(2025, 2, 13), curso: "Introduccion a la Programacion", horario: "19:00-21:00" }, // Jueves
  ]

  const getClassInfo = (date: Date) => {
    return classDatesWithInfo.find(
      (classItem) =>
        classItem.date.getDate() === date.getDate() &&
        classItem.date.getMonth() === date.getMonth() &&
        classItem.date.getFullYear() === date.getFullYear(),
    )
  }

  const isClassDate = (date: Date) => {
    return getClassInfo(date) !== undefined
  }

  const formatDateForTooltip = (date: Date) => {
    const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    return { daysInMonth, startingDay }
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const handlePrevMonth = () => {
    setCurrentCalendarMonth(new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentCalendarMonth(new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() + 1, 1))
  }

  const [selectedInboxEmail, setSelectedInboxEmail] = useState<number | null>(null)
  const [inboxEmails, setInboxEmails] = useState([
    {
      id: 1,
      subject: "Confirmación de horarios",
      sender: "Ana García",
      senderEmail: "ana.garcia@bsginstitute.com",
      date: "2024-11-20",
      time: "10:30",
      isRead: true,
      content: `<p>Estimado Carlos,</p>
      <p>Le escribo para confirmar los horarios del curso PI RCM ONLINE 2025 III LIMA:</p>
      <ul>
        <li>Martes y Jueves de 19:00 a 21:00</li>
        <li>Grupo 201</li>
      </ul>
      <p>Por favor confirme su disponibilidad.</p>
      <p>Saludos cordiales,</p>
      <p>Ana García<br/>Coordinación Académica</p>`,
    },
    {
      id: 2,
      subject: "Actualización de materiales",
      sender: "Coordinación Académica",
      senderEmail: "coordinacion@bsginstitute.com",
      date: "2024-11-18",
      time: "14:15",
      isRead: false,
      content: `<p>Estimado Docente,</p>
      <p>Le informamos que se han actualizado los materiales del curso en la plataforma virtual.</p>
      <p>Los nuevos recursos incluyen:</p>
      <ul>
        <li>Presentaciones actualizadas del módulo 3</li>
        <li>Casos de estudio adicionales</li>
        <li>Material de apoyo para estudiantes</li>
      </ul>
      <p>Por favor revise y confirme que tiene acceso a todos los materiales.</p>
      <p>Atentamente,<br/>Coordinación Académica<br/>BSG Institute</p>`,
    },
  ])

  const tabs = [
    {
      id: "informacion",
      label: "Información",
      icon: User,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "correo-electronico",
      label: "Correo Electrónico",
      icon: Mail,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "calendario",
      label: "Calendario",
      icon: Calendar,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
  ]

  // Docentes data with different information
  const docentesData = {
    carlos: {
      id: params.id as string,
      name: "Carlos Rodriguez",
      status: "En ejecución",
      course: "PI RCM ONLINE 2025 III LIMA",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      curso: "Introducción a la Programación",
      schedule: "Martes 27 de Enero 19:00-21:00 hora Peru",
      estudiantes: 32,
      asignadoPor: "Ana Garcia",
      ubicacion: "Perú - Lima",
      email: "carlos.rodriguez@gmail.com",
      phone: "+51 986 240 746",
      plataforma: "carlos.rodriguez@institucional.bsginstitute.com",
      evaluacion: [
        { año: "2025", puntaje: 4.5, estudiantes: 320 },
        { año: "2024", puntaje: 4.1, estudiantes: 135 },
      ],
    },
    ana: {
      id: params.id as string,
      name: "Ana Martinez",
      status: "En ejecución",
      course: "PI RCM ONLINE 2025 III LIMA",
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      curso: "Introducción a la Programación",
      schedule: "Martes 27 de Enero 19:00-21:00 hora Peru",
      estudiantes: 32,
      asignadoPor: "Ana Garcia",
      ubicacion: "Perú - Lima",
      email: "ana.martinez@gmail.com",
      phone: "+34 91 234 5678",
      plataforma: "ana.martinez@institucional.bsginstitute.com",
      evaluacion: [
        { año: "2025", puntaje: 4.8, estudiantes: 280 },
        { año: "2024", puntaje: 4.6, estudiantes: 150 },
      ],
    },
  }

  const docenteData = docentesData[selectedDocente]

  const clientData = {
    name: "Jorge Armando Lopez Pulido",
    location: "Peru - Lima",
    additionalEnrollments: 2,
    hasVoiceAgreement: true,
  }

const contactos = [
  {
  id: 1,
  curso: "Introduccion a la Programacion",
  ocurrencia: "Confirmación de sesión",
  fechaProgramada: "24/04/2025",
  fechaRealizada: "24/04/2025",
  horaProgramada: "04:06 PM",
  horaRealizada: "04:30 PM",
  tipoContacto: "Whatsapp",
  duracionTotal: "",
  duracionConversacion: "",
  faseInicial: "IP",
  faseDespues: "",
  estado: "FIN_FLUJO",
  comentario: "Confirmo la asistencia a Clases",
  ocurrenciaNombre: "Aceptó invitación - Docente acepta dictar el curso",
  fecha: "",
  },
  {
  id: 2,
  curso: "Fundamentos de Base de Datos",
  ocurrencia: "Recordatorio Subida de notas",
  fechaProgramada: "23/04/2025",
  fechaRealizada: "24/04/2025",
  horaProgramada: "11:00 AM",
  horaRealizada: "11:12:48 PM",
  tipoContacto: "Correo",
  duracionTotal: "",
  duracionConversacion: "",
  faseInicial: "IP",
  faseDespues: "IP",
  estado: "REPROGRAMADO AUT.",
  comentario: "Indico que subira las notas mañana a las 16:00 horas (Horario Perú)",
  ocurrenciaNombre: "Confirmó subida de notas",
  fecha: "",
  },
  {
  id: 3,
  curso: "Desarrollo Web Frontend",
  ocurrencia: "Envio Material didáctico",
  fechaProgramada: "15/04/2025",
  fechaRealizada: "24/04/2025",
  horaProgramada: "10:30 AM",
  horaRealizada: "11:15 AM",
  tipoContacto: "Llamada",
  duracionTotal: "25 s",
  duracionConversacion: "0:07 s",
  faseInicial: "IP",
  faseDespues: "IP",
  estado: "REPROGRAMADO MAN.",
  comentario: "El docente no contesto la llamada",
  ocurrenciaNombre: "No respondio",
  fecha: "",
  },
  ]

  const [cursosData] = useState([
    {
      id: 1,
      centroCosto: "PI RCM ONLINE 2025 III LIMA",
      estado: "En ejecución",
      totalCursos: 3,
      totalAlumnos: 85,
      puntajePromedio: 4.5,
      cursos: [
        { id: 1, nombre: "Introduccion a la Programacion", horario: "Martes, Jueves 19:00-21:00", alumnos: 32, puntaje: 4.5, estado: "Culminado" },
        { id: 2, nombre: "Fundamentos de Base de Datos", horario: "Lunes, Miercoles 18:00-20:00", alumnos: 28, puntaje: 4.3, estado: "En ejecución" },
        { id: 3, nombre: "Desarrollo Web Frontend", horario: "Sabados 09:00-13:00", alumnos: 25, puntaje: 4.7, estado: "En ejecución" },
      ]
    },
    {
      id: 2,
      centroCosto: "PI RCM ONLINE 2024 II LIMA",
      estado: "Culminado",
      totalCursos: 2,
      totalAlumnos: 53,
      puntajePromedio: 4.3,
      cursos: [
        { id: 1, nombre: "Gestion de Proyectos", horario: "Lunes, Miercoles 18:00-20:00", alumnos: 28, puntaje: 4.3, estado: "Culminado" },
        { id: 2, nombre: "Analisis de Datos", horario: "Viernes 17:00-20:00", alumnos: 25, puntaje: 4.3, estado: "Culminado" },
      ]
    },
    {
      id: 3,
      centroCosto: "PI RCM ONLINE 2024 I CDMEXICO",
      estado: "Culminado",
      totalCursos: 2,
      totalAlumnos: 60,
      puntajePromedio: 4.7,
      cursos: [
        { id: 1, nombre: "Inteligencia Artificial Basica", horario: "Martes, Jueves 17:00-19:00", alumnos: 35, puntaje: 4.7, estado: "Culminado" },
        { id: 2, nombre: "Machine Learning", horario: "Sabados 10:00-14:00", alumnos: 25, puntaje: 4.7, estado: "Culminado" },
      ]
    },
    {
      id: 4,
      centroCosto: "PI RCM ONLINE 2023 IV BOGOTA",
      estado: "Culminado",
      totalCursos: 1,
      totalAlumnos: 22,
      puntajePromedio: 4.1,
      cursos: [
        { id: 1, nombre: "Seguridad Informatica", horario: "Viernes 19:00-22:00", alumnos: 22, puntaje: 4.1, estado: "Culminado" },
      ]
    },
    {
      id: 5,
      centroCosto: "PI RCM ONLINE 2023 III LIMA",
      estado: "Culminado",
      totalCursos: 1,
      totalAlumnos: 18,
      puntajePromedio: 4.6,
      cursos: [
        { id: 1, nombre: "Cloud Computing", horario: "Sabado 09:00-13:00", alumnos: 18, puntaje: 4.6, estado: "Culminado" },
      ]
    },
  ])

  const [expandedCentros, setExpandedCentros] = useState<number[]>([])

  const toggleCentroExpanded = (id: number) => {
    setExpandedCentros(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleTCClick = (contacto: any) => {
    setAudioModal({
      isOpen: true,
      audioUrl: "/audio/sample-call-recording.mp3",
      callInfo: {
        fecha: contacto.fechaRealizada,
        hora: contacto.horaRealizada,
        duracion: contacto.duracionConversacion,
        contacto: "Cliente - Llamada de seguimiento",
      },
    })
  }

  const closeAudioModal = () => {
    setAudioModal({
      isOpen: false,
      audioUrl: "",
      callInfo: null,
    })
  }

  const handleViewEmail = (email: EmailItem) => {
    setSelectedEmail({
      sender: email.sender,
      recipient: email.recipient,
      subject: email.subject,
      content: email.content,
      date: `${email.date} ${email.time}`,
    })

    if (!email.isRead) {
      const updatedEmails = emailData.map((item) => (item.id === email.id ? { ...item, isRead: true } : item))
      setEmailData(updatedEmails)
      setEmailUnreadCount((prev) => Math.max(0, prev - 1))
    }

    setIsEmailViewerOpen(true)
  }

  // CHANGE: Add handler to view email from table
  const handleViewEmailFromTable = (email: EmailItem) => {
    // Create a conversation thread combining sent and received emails with the same subject
    const relatedEmails = emailData.filter(e => e.subject === email.subject)
    
    // Sort by date and time to create a proper conversation thread
    const sortedEmails = relatedEmails.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })

    const emailThread: EmailThread = {
      subject: email.subject,
      sender: email.sender,
      recipient: email.recipient,
      messages: sortedEmails.map((e) => ({
        id: `msg-${e.id}`,
        sender: e.sender,
        content: e.content,
        date: `${e.date} ${e.time}`,
        isOutgoing: e.status === "Enviado",
      })),
    }

    setSelectedEmail(emailThread)

    // Mark as read when viewed
    if (!email.isRead) {
      const updatedEmails = emailData.map((item) => (item.id === email.id ? { ...item, isRead: true } : item))
      setEmailData(updatedEmails)
      setEmailUnreadCount((prev) => Math.max(0, prev - 1))
    }

    setIsEmailViewerOpen(true)
  }

  const handleInboxEmailClick = (emailId: number) => {
    setSelectedInboxEmail(emailId)
    // Mark as read
    setInboxEmails((prev) => prev.map((e) => (e.id === emailId ? { ...e, isRead: true } : e)))
  }

  const baseTagClass = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"

  // States for email and phone inputs
  const [email, setEmail] = useState(docenteData.email)
  const [phone, setPhone] = useState(docenteData.phone)
  const [whatsappMessageInput, setWhatsappMessageInput] = useState("")
  const [isWhatsAppTemplateModalOpen, setIsWhatsAppTemplateModalOpen] = useState(false)

  // Update email and phone when selected docente changes
  React.useEffect(() => {
    setEmail(docenteData.email)
    setPhone(docenteData.phone)
  }, [selectedDocente])

  const handleWhatsappMessageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWhatsappMessageInput(e.target.value)
  }

  const handleSelectWhatsAppTemplate = (templateText: string) => {
    setWhatsappMessageInput(templateText)
  }

  const renderEstado = (estado: string) => {
    if (estado === "EJECUTADO") {
      return (
        <span className={`${baseTagClass} bg-green-100 text-green-800 border-green-200`}>
          <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Ejecutado
        </span>
      )
    } else if (estado === "FIN_FLUJO" || estado === "REPROGRAMADO AUT.") {
      return (
        <span className={`${baseTagClass} bg-purple-100 text-purple-800 border-purple-200`}>
          <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Fin del flujo
        </span>
      )
    } else if (estado === "REPROGRAMADO MAN.") {
      return (
        <span className={`${baseTagClass} bg-purple-100 text-purple-800 border-purple-200`}>
          <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Cambio a flujo: HA 
        </span>
      )
    } else {
      return (
        null
      )
    }
  }

  const renderDuracionBasica = (total: string, contactoId: number, contacto: any) => {
    if (contactoId === 1 || !total) {
      return null
    }

    return null
  }

  const renderFaseTag = (faseInicial: string, faseFinal: string) => {
    if (!faseInicial || !faseFinal) return null

    return (
      <span className={`${baseTagClass} bg-red-100 text-red-800 border-red-200 whitespace-nowrap flex-shrink-0`}>
        <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        <span>
          {faseInicial} → {faseFinal}
        </span>
      </span>
    )
  }

  const renderEtiquetasAdicionales = (tipoContacto: string, contactoId: number, duracionTotal: string) => {
    const renderWhatsapp = () => (
      <span className={`${baseTagClass} bg-green-100 text-green-700 border-green-200`}>
        <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span>Whatsapp</span>
      </span>
    )

    const renderCorreo = () => (
      <span className={`${baseTagClass} bg-blue-100 text-blue-700 border-blue-200`}>
        <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span>Correo</span>
      </span>
    )

    const renderLlamada = () => (
      <span className={`${baseTagClass} bg-green-100 text-green-700 border-green-200`}>
        <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span>Llamada</span>
      </span>
    )

    const renderTiempoTotal = () => (
      <span className={`${baseTagClass} bg-yellow-100 text-yellow-700 border-yellow-200`}>
        <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>T.T {duracionTotal}</span>
      </span>
    )

    return (
      <div className="flex flex-wrap gap-2">
        {tipoContacto === "Whatsapp" && renderWhatsapp()}
        {tipoContacto === "Correo" && renderCorreo()}
        {tipoContacto === "Llamada" && renderLlamada()}
        {duracionTotal && renderTiempoTotal()}
      </div>
    )
  }

  const renderFechaHoraCompleto = (contacto: any) => {
    // Get sessions for this activity
    const sesiones = contacto.sesiones || [
      { numero: 1, fecha: "24/04/2025" },
      { numero: 2, fecha: "31/04/2025" },
      { numero: 3, fecha: "07/05/2025" },
    ]

    return (
      <div className="space-y-2">
        {/* Activity title */}
        <div className="font-medium text-gray-800 text-[14px]">
          {contacto.ocurrencia || "Confirmación de sesión"}
          {sesiones.some((s: { numero: number }) => s.numero === 2) ? null : (
            (contacto.ocurrencia?.includes("Envio Material") || contacto.ocurrencia?.includes("Envío Material")) ? (
              <span className="text-gray-600 font-normal"> (Ana Martinez)</span>
            ) : (
              <span className="text-gray-600 font-normal"> (Carlos Rodriguez)</span>
            )
          )}
        </div>
        {/* Session sub-items */}
        <div className="flex flex-col pl-2 border-l-2 border-gray-200">
          {sesiones.map((sesion: { numero: number; fecha: string }, index: number) => (
            <div 
              key={sesion.numero} 
              className={`text-[13px] text-gray-600 py-2 ${index < sesiones.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              Sesión {sesion.numero} - {sesion.fecha} / 19:00 horario Perú
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderComentario = (comentario: string, fecha: string, contacto: any) => {
    return (
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="text-gray-700 text-[14px] flex-1 min-w-0">{comentario}</div>
        </div>

        {/* Ocurrencia name below comment */}
        {contacto.ocurrenciaNombre && (
          <div className="text-gray-500 text-[13px] italic">{contacto.ocurrenciaNombre}</div>
        )}

        {fecha && fecha !== "Sin Comentario" && <div className="text-gray-500 text-[14px]">{fecha}</div>}
        {fecha === "Sin Comentario" && <div className="text-red-500 text-[14px]">Sin Comentario</div>}

        <div className="flex flex-wrap gap-3">
          {contacto.estado && renderEstado(contacto.estado)}
          {contacto.duracionConversacion && renderDuracionBasica(contacto.duracionConversacion, contacto.id, contacto)}
        </div>
      </div>
    )
  }

  return (
    <AgendaContainer withTopPadding={false}>
      <div className="max-w-[1200px] mx-auto">
      <div className="bg-gray-50 py-4">
      {/* Stats Cards */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
          <Card className="shadow-sm p-6">
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm mb-2">Última Comunicación</span>
              <span className="text-2xl font-bold">15-11-2024</span>
            </div>
          </Card>

          <Card className="shadow-sm p-6">
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm mb-2">Próxima Comunicación </span>
              <span className="text-2xl font-bold">20-11-2024</span>
            </div>
          </Card>

          <Card className="shadow-sm p-6">
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm mb-2">Sesiones Ejecutadas del Curso</span>
              <span className="text-2xl font-bold">2</span>
            </div>
          </Card>

          <Card className="shadow-sm p-6">
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm mb-2">Puntaje del Curso</span>
              <span className="text-2xl font-bold text-purple-600">4.4</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div>
        <div className="relative mb-4">
          <div className="flex justify-center">
            <div className="flex gap-3 pb-2 w-full max-w-4xl">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-xl transition-all shadow-sm ${
                      isActive ? "bg-blue-600 text-white" : tab.color
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {activeTab === "informacion" && (
          <>
            <div className="mt-6 mb-6">
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  {/* Blue header bar with back button and origin */}
                  <div className="bg-[#e3f2fd] py-2 flex flex-wrap justify-between items-center border-b border-[#cce3fd]">
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/planificacion-operaciones/gestion-docente/agenda")}
                      className="flex items-center gap-1 text-[#004fff] hover:bg-[#cce3fd] p-1.5"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Volver</span>
                    </Button>
                  </div>

                  {/* Main content */}
                  <div className="p-8 bg-white">
                    {/* Grid layout for client info and side badges */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                      {/* Left column - Client information */}
                      <div className="min-w-0">
                        <div className="w-full">
                          <div className="flex flex-col gap-8">
                            <div className="w-full">
                              <div className="flex flex-col gap-1 mb-4">
                                <div className="flex items-center gap-2 group">
                                  <div className="relative w-fit">
                                    <select
                                      value={selectedDocente}
                                      onChange={(e) => setSelectedDocente(e.target.value as "carlos" | "ana")}
                                      className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg bg-white text-lg font-bold text-[#004fff] cursor-pointer hover:border-[#6419e6] hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#6419e6] focus:ring-offset-1 whitespace-nowrap"
                                    >
                                      <option value="carlos">Carlos Rodriguez</option>
                                      <option value="ana">Ana Martinez</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-[#004fff] pointer-events-none group-hover:text-[#6419e6] transition-colors" />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                {/* Curso section */}
                                <div className="flex items-center gap-2 text-gray-700">
                                  <BookOpen className="h-4 w-4 text-purple-600" />
                                  <p className="text-sm">Curso: {docenteData.curso}</p>
                                </div>
                                
                                {/* Schedule section */}
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Clock className="h-4 w-4 text-blue-600" />
                                  <p className="text-sm">Horario Proxima Clase: {docenteData.schedule}</p>
                                </div>

                                {/* Student count */}
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Users className="h-4 w-4 text-green-600" />
                                  <p className="text-sm">
                                    Cantidad de estudiantes: {docenteData.estudiantes} estudiantes
                                  </p>
                                </div>

                                {/* Phone section */}
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Phone className="h-4 w-4 text-green-600" />
                                  <span className="text-sm">Celular: {phone}</span>
                                  <Button className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-xs">
                                    <Phone className="h-3.5 w-3.5 mr-1" />
                                    Llamar
                                  </Button>
                                </div>

                                {/* Email section */}
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Mail className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm">Correo: {docenteData.email}</span>
                                  <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3 text-xs">
                                    <Mail className="h-3.5 w-3.5 mr-1" />
                                    Enviar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right column - Additional information badges */}
                      <div className="flex flex-col items-end justify-start gap-2 self-start py-4 flex-shrink-0 min-w-[300px]">
                        {/* Assigned person wrapper - left aligned internally */}
                        <div className="flex flex-col items-start gap-1">
                          {/* Assigned person label */}
                          <span className="text-xs text-gray-500">Asignado a</span>
                          {/* Assigned person */}
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                            <div className="bg-indigo-100 p-1 rounded-full">
                              <User className="h-3.5 w-3.5 text-indigo-600" />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">{docenteData.asignadoPor}</span>
                          </div>
                          {/* Peru-Lima location badge */}
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200 mt-1">
                            <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex">
                              <div className="w-1/3 bg-red-600"></div>
                              <div className="w-1/3 bg-white"></div>
                              <div className="w-1/3 bg-red-600"></div>
                            </div>
                            <span className="text-gray-600 text-sm font-medium">{docenteData.ubicacion}</span>
                          </div>
                        </div>
                      </div>
                    </div>


  {/* Two information boxes: Platform info and Historical stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 mt-8">
                      {/* Box 1: Platform Access Information */}
                      <div className="border border-gray-200 rounded-lg p-5 bg-purple-50 shadow-sm w-full">
                        <div className="flex items-center gap-2 mb-4">
                          <GraduationCap className="h-5 w-5 text-purple-600" />
                          <h3 className="font-semibold text-gray-800 text-sm">Plataforma BSG Institute</h3>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div>
                            <p className="text-xs text-purple-700">
                              Usuario:{" "}
                              <span className="font-semibold text-gray-800">
                                {docenteData.plataforma}
                              </span>
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-purple-700">
                              Contrasena:{" "}
                              <span className="font-semibold text-gray-800">
                                Docente2022BSGinfo
                              </span>
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-purple-700">
                              Activo desde:{" "}
                              <span className="font-semibold text-gray-800">Agosto 2022</span>
                            </p>
                          </div>
                        </div>

                        <Button className="bg-purple-600 hover:bg-purple-700 text-white h-8 px-4 text-xs">
                          <GraduationCap className="h-3.5 w-3.5 mr-2" />
                          Ingresar al Aula Virtual
                        </Button>
                      </div>

{/* Box 2: Historical Statistics - Combined */}
                  <div className="border border-gray-200 rounded-lg p-5 bg-blue-50 shadow-sm w-full">
                    <div className="flex items-center gap-2 mb-4">
                      <ClipboardList className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-800 text-sm">Encuestas del Curso</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-medium text-gray-600">Fecha Programa</th>
                            <th className="text-left py-2 font-medium text-gray-600">Tipo de Encuesta</th>
                            <th className="text-center py-2 font-medium text-gray-600">Puntaje</th>
                            <th className="text-center py-2 font-medium text-gray-600">Total de Estudiantes</th>
                            <th className="text-center py-2 font-medium text-gray-600">Total de Respuestas</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold text-gray-800">24/04/2025</td>
                            <td className="py-2 font-semibold text-gray-800">Inicial</td>
                            <td className="py-2 text-center text-purple-600 font-semibold">4.2</td>
                            <td className="py-2 text-center text-gray-700">32</td>
                            <td className="py-2 text-center text-gray-700">28</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold text-gray-800">01/05/2025</td>
                            <td className="py-2 font-semibold text-gray-800">Intermedia</td>
                            <td className="py-2 text-center text-purple-600 font-semibold">4.5</td>
                            <td className="py-2 text-center text-gray-700">32</td>
                            <td className="py-2 text-center text-gray-700">30</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold text-gray-800">15/05/2025</td>
                            <td className="py-2 font-semibold text-gray-800">Final</td>
                            <td className="py-2 text-center text-purple-600 font-semibold">4.7</td>
                            <td className="py-2 text-center text-gray-700">32</td>
                            <td className="py-2 text-center text-gray-700">31</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Summary Section */}
            <div className="mb-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setIsContactSummaryOpen(!isContactSummaryOpen)}
                  className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-[#6419e6] font-medium hover:underline"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <span className="text-base text-[#6419e6] font-semibold">Resumen de contactos con el docente</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      size="sm"
                      className="bg-[#6419e6] hover:bg-[#5315c4] text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsAgregarActividadesOpen(true)
                      }}
                    >
                      Agregar Actividades
                    </Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transform transition-transform text-[#6419e6] ${isContactSummaryOpen ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>

                {isContactSummaryOpen && (
                  <div className="relative">
                    {/* Filter dropdown - only show when organizing by session */}
                    {organizarPorSesion && (
                      <div className="px-3 py-3 border-b border-gray-200 flex items-center gap-2">
                        <button
                          onClick={() => setSesionFilter("todas")}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            sesionFilter === "todas"
                              ? "bg-blue-600 text-white"
                              : "bg-blue-100 text-blue-500 hover:bg-blue-200"
                          }`}
                        >
                          Ver todas
                        </button>
                        <button
                          onClick={() => setSesionFilter("ejecutadas")}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            sesionFilter === "ejecutadas"
                              ? "bg-blue-600 text-white"
                              : "bg-blue-100 text-blue-500 hover:bg-blue-200"
                          }`}
                        >
                          Ejecutadas
                        </button>
                        <button
                          onClick={() => setSesionFilter("por_ejecutar")}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            sesionFilter === "por_ejecutar"
                              ? "bg-blue-600 text-white"
                              : "bg-blue-100 text-blue-500 hover:bg-blue-200"
                          }`}
                        >
                          Por ejecutar
                        </button>
                      </div>
                    )}
                    
                    <div className="overflow-x-auto">
                      <table className="w-full table-fixed">
                        <thead>
                          <tr className="bg-[#e3f2fd]">
                            <th className="px-3 py-3 text-left font-medium text-gray-600 w-[88%] text-[14px]" colSpan={2}>
                              <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2">
                                  <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                  </svg>
                                  <span className="text-sm text-gray-700">Realizado por Asesor</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Bot className="w-5 h-5 text-gray-600" />
                                  <span className="text-sm text-gray-700">Realizado por IA</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="w-5 h-5 text-green-600" />
                                  <span className="text-sm text-gray-700">Correcto</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-5 h-5 text-red-600" />
                                  <span className="text-sm text-gray-700">Incorrecto</span>
                                </div>
                              </div>
                            </th>
                            <th className="px-3 py-2 text-center font-medium text-gray-600 w-24 text-[14px]">
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {!organizarPorSesion ? (
                            // Vista por Actividad (actual)
                            <>
                              {contactos.map((contacto) => {
                            const actividadNombre = contacto.ocurrencia || "Confirmación de sesión"
                            const esConfirmacionSesion = actividadNombre === "Confirmación de sesión"
                            const esRecordatorioSubida = actividadNombre === "Recordatorio Subida de notas"
                            const esEnvioMaterial = actividadNombre.includes("Envio Material") || actividadNombre.includes("Envío Material")
                            
                            // Get number for activity
                            const getActivityNumber = () => {
                              if (esConfirmacionSesion) return "1."
                              if (esRecordatorioSubida) return "2."
                              if (esEnvioMaterial) return "3."
                              return ""
                            }
                            const actividadNumero = getActivityNumber()
                            const sesiones = contacto.sesiones || [
                              { numero: 1, fecha: "24/04/2025", estado: "confirmado" },
                              { numero: 2, fecha: "31/04/2025", estado: "confirmado" },
                              { numero: 3, fecha: "07/05/2025", estado: "pendiente" },
                            ]
                            
                            // Get last executed subactivity for activity view
                            const getLastExecutedActivitySubactivity = (sesionNum: number, activityName?: string) => {
                              const whatsappStyle = getWhatsappStyle(sesionNum, activityName)
                              const correoStyle = getCorreoStyle(sesionNum, activityName)
                              const llamadaStyle = getLlamadaStyle(sesionNum, activityName)
                              
                              const isGreen = (style: string) => style.includes("green")
                              
                              // Check in reverse order to find the last executed (highest number)
                              if (isGreen(llamadaStyle)) {
                                return { name: "Subactividad 3 - Llamada", time: "17:00" }
                              }
                              if (isGreen(correoStyle)) {
                                return { name: "Subactividad 2 - Correo", time: "13:00" }
                              }
                              if (isGreen(whatsappStyle)) {
                                return { name: "Subactividad 1 - Whatsapp", time: "07:00" }
                              }
                              return null
                            }
                            
                            // Custom styles for Whatsapp
                            const getWhatsappStyle = (sesionNum: number, activityName?: string) => {
                              if (sesionNum === 3) {
                                // Sub 1 siempre está ejecutada (verde) en Sesión 3
                                return "bg-green-100 text-green-600 border-green-200"
                              }
                              if (esEnvioMaterial && (sesionNum === 2 || sesionNum === 3)) {
                                return "bg-green-100 text-green-600 border-green-200"
                              }
                              return "bg-green-100 text-green-600 border-green-200"
                            }
                            
                            // Custom styles for Llamada (Sub 2)
                            const getLlamadaStyle = (sesionNum: number, activityName?: string) => {
                              // Para Sesión 3, usar lógica de flujo secuencial
                              if (sesionNum === 3) {
                                const nextSub = activityName ? nextSubActivityByActivity[`${sesionNum}-${activityName}`] : 2
                                if (nextSub === 3) {
                                  return "bg-blue-100 text-blue-600 border-blue-200" // En ejecución
                                } else if (nextSub > 3) {
                                  return "bg-green-100 text-green-600 border-green-200" // Completada
                                } else {
                                  return "bg-gray-100 text-gray-400 border-gray-200" // Por ejecutar
                                }
                              }
                              // Para otras sesiones
                              if (esRecordatorioSubida && sesionNum === 3) {
                                return "bg-blue-100 text-blue-600 border-blue-200"
                              }
                              if (esEnvioMaterial) {
                                if (sesionNum === 2) return "bg-green-100 text-green-600 border-green-200"
                                if (sesionNum === 3) return "bg-blue-100 text-blue-600 border-blue-200"
                              }
                              return "bg-green-100 text-green-600 border-green-200"
                            }
                            
                            // Custom styles for Correo (Sub 3)
                            const getCorreoStyle = (sesionNum: number, activityName?: string) => {
                              // Para Sesión 3, usar lógica de flujo secuencial
                              if (sesionNum === 3) {
                                const nextSub = activityName ? nextSubActivityByActivity[`${sesionNum}-${activityName}`] : 2
                                if (nextSub === 4) {
                                  return "bg-blue-100 text-blue-600 border-blue-200" // En ejecución
                                } else if (nextSub > 4) {
                                  return "bg-green-100 text-green-600 border-green-200" // Completada
                                } else {
                                  return "bg-gray-100 text-gray-400 border-gray-200" // Por ejecutar
                                }
                              }
                              // Para otras sesiones
                              if (esConfirmacionSesion) {
                                if (sesionNum === 1) return "bg-gray-100 text-gray-400 border-gray-200"
                                if (sesionNum === 2) return "bg-gray-100 text-gray-400 border-gray-200"
                              }
                              if (esRecordatorioSubida) {
                                if (sesionNum === 1 || sesionNum === 2) return "bg-green-100 text-green-600 border-green-200"
                                if (sesionNum === 3) return "bg-gray-100 text-gray-400 border-gray-200"
                              }
                              if (esEnvioMaterial) {
                                if (sesionNum === 1 || sesionNum === 2) return "bg-green-100 text-green-600 border-green-200"
                                if (sesionNum === 3) return "bg-gray-100 text-gray-400 border-gray-200"
                              }
                              return "bg-blue-100 text-blue-600 border-blue-200"
                            }
                            
                            // Custom styles for Asesor
                            const getAsesorStyle = (sesionNum: number, activityName?: string) => {
                              if (sesionNum === 3 && activityName) {
                                // Verificar si Sub 4 está en ejecución
                                const nextSub = nextSubActivityByActivity[`${sesionNum}-${activityName}`]
                                if (nextSub === 5) {
                                  // Sub 4 está en ejecución (azul)
                                  return "bg-blue-100 text-blue-600 border-blue-200"
                                } else if (nextSub > 4) {
                                  // Sub 4 se ejecutó (verde)
                                  return "bg-green-100 text-green-600 border-green-200"
                                } else {
                                  // Sub 4 aún no se ejecuta (gris)
                                  return "bg-gray-100 text-gray-400 border-gray-200"
                                }
                              }
                              if (esRecordatorioSubida && (sesionNum === 1 || sesionNum === 2)) {
                                return "bg-green-100 text-green-600 border-green-200"
                              }
                              if (esEnvioMaterial && (sesionNum === 1 || sesionNum === 2)) {
                                return "bg-green-100 text-green-600 border-green-200"
                              }
                              return "bg-gray-100 text-gray-400 border-gray-200"
                            }
                            
                            // Custom styles for En ejecución
                            const getEnEjecucionStyle = (sesionNum: number) => {
                              if (esEnvioMaterial && sesionNum === 3) {
                                return "bg-blue-100 text-blue-600 border-blue-200"
                              }
                              return "bg-green-100 text-green-600 border-green-200"
                            }
                            
                            // Custom styles for No respondió
                            const getNoRespondioStyle = (sesionNum: number) => {
                              if (esConfirmacionSesion && sesionNum === 3) {
                                return "bg-blue-100 text-blue-600 border-blue-200"
                              }
                              if (esRecordatorioSubida && sesionNum === 3) {
                                return "bg-blue-100 text-blue-600 border-blue-200"
                              }
                              if (esEnvioMaterial && sesionNum === 3) {
                                return "bg-gray-100 text-gray-400 border-gray-200"
                              }
                              return "bg-green-100 text-green-600 border-green-200"
                            }
                            
                            // Custom styles and text for Respondió/Confirmó/Rechazó
                            const getRespondioData = (sesionNum: number) => {
                              if (esConfirmacionSesion) {
                                if (sesionNum === 3) {
                                  return { text: "Respondió", style: "bg-gray-100 text-gray-400 border-gray-200" }
                                }
                                return { text: "Confirmó", style: "bg-green-100 text-green-600 border-green-200" }
                              }
                              if (esRecordatorioSubida) {
                                if (sesionNum === 1) {
                                  return { text: "Respondió", style: "bg-gray-100 text-gray-400 border-gray-200" }
                                }
                                if (sesionNum === 2) {
                                  return { text: "Rechazó", style: "bg-red-100 text-red-600 border-red-200" }
                                }
                                if (sesionNum === 3) {
                                  return { text: "Respondió", style: "bg-gray-100 text-gray-400 border-gray-200" }
                                }
                              }
                              if (esEnvioMaterial && sesionNum === 3) {
                                return { text: "Respondió", style: "bg-gray-100 text-gray-400 border-gray-200" }
                              }
                              return { text: "Confirmó", style: "bg-green-100 text-green-600 border-green-200" }
                            }
                            
                            // Custom styles for Interaccion manual
                            const getInteraccionManualStyle = (sesionNum: number) => {
                              if (esRecordatorioSubida && (sesionNum === 1 || sesionNum === 2)) {
                                return "bg-orange-100 text-orange-600 border-orange-200"
                              }
                              return "bg-gray-100 text-gray-400 border-gray-200"
                            }

                            // Helper function to determine if badge is "Realizado" or "Por realizar"
                            const getEstadoBadgeStatus = (badgeStyle: string): "Realizado" | "Por realizar" => {
                              if (badgeStyle.includes("bg-green-100") || badgeStyle.includes("bg-blue-100")) {
                                return "Realizado"
                              }
                              return "Por realizar"
                            }

                            // Function to determine if badge should show tooltip
                            const shouldShowTooltip = (activityNumber: number, currentStyle: string, whatsappStyle: string, llamadaStyle: string, correoStyle: string): boolean => {
                              // If current badge is green or blue, always show tooltip
                              if (currentStyle.includes("bg-green-100") || currentStyle.includes("bg-blue-100")) {
                                return true
                              }

                              // If current badge is gray, check the sequence of previous badges
                              if (currentStyle.includes("bg-gray-100")) {
                                // Check if there's any blue badge in the sequence before this gray one
                                if (activityNumber === 1) {
                                  // Actividad 1 is first, no badges before it, check if any channel has blue
                                  return whatsappStyle.includes("bg-blue-100") || 
                                         llamadaStyle.includes("bg-blue-100") || 
                                         correoStyle.includes("bg-blue-100")
                                } else if (activityNumber === 2) {
                                  // Check if Actividad 1 (whatsapp) is blue or if llamada/correo are blue
                                  return whatsappStyle.includes("bg-blue-100") ||
                                         llamadaStyle.includes("bg-blue-100") ||
                                         correoStyle.includes("bg-blue-100")
                                } else if (activityNumber === 3) {
                                  // Check if any previous activity has blue
                                  return whatsappStyle.includes("bg-blue-100") ||
                                         llamadaStyle.includes("bg-blue-100") ||
                                         correoStyle.includes("bg-blue-100")
                                }
                              }

                              return false
                            }

                            // Get tooltip content for each activity
                            const getTooltipContent = (activityNumber: number, sesionNum: number) => {
                              const whatsappStyle = getWhatsappStyle(sesionNum, actividadNombre)
                              const llamadaStyle = getLlamadaStyle(sesionNum, actividadNombre)
                              const correoStyle = getCorreoStyle(sesionNum, actividadNombre)

                              if (activityNumber === 1) {
                                return (
                                  <div className="text-xs space-y-1">
                                    <div className="flex justify-between gap-4">
                                      <span className="font-medium">Whatsapp:</span>
                                      <span>Realizado 07:00</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                      <span className="font-medium">Correo:</span>
                                      <span>Realizado 07:00</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                      <span className="font-medium">Llamada:</span>
                                      <span>Realizado 07:00</span>
                                    </div>
                                  </div>
                                )
                              } else if (activityNumber === 2) {
                                const llamadaStatus = getEstadoBadgeStatus(llamadaStyle)
                                return (
                                  <div className="text-xs space-y-1">
                                    <div className="flex justify-between gap-4">
                                      <span className="font-medium">Llamada:</span>
                                      <span>{llamadaStatus === "Realizado" ? "Realizado 13:00" : llamadaStatus}</span>
                                    </div>
                                  </div>
                                )
                              } else if (activityNumber === 3) {
                                const correoStatus = getEstadoBadgeStatus(correoStyle)
                                return (
                                  <div className="text-xs space-y-1">
                                    <div className="flex justify-between gap-4">
                                      <span className="font-medium">Correo:</span>
                                      <span>{correoStatus === "Realizado" ? "Realizado 17:00" : correoStatus}</span>
                                    </div>
                                  </div>
                                )
                              }
                              return null
                            }
                            
                            // Get unique comment for each row
                            const getComentarioUnico = (actividad: string, sesionNum: number) => {
                                    const comentarios: Record<string, string[]> = {
                                      "Confirmación de sesión": [
                                        "Docente confirmó asistencia",
                                        "Confirmación recibida correctamente",
                                        "Sin respuesta del docente"
                                      ],
                                      "Recordatorio Subida de notas": [
                                        "Subira las notas a la 19:00 horas",
                                        "Docente rechazó la solicitud",
                                        "Esperando carga de notas"
                                      ],
                                      "Envio Material didáctico": [
                                        "Material enviado exitosamente",
                                        "Confirmó recepción del material",
                                        "Sin confirmación de lectura"
                                      ]
                                    }
                              return comentarios[actividad]?.[sesionNum - 1] || "Actividad en proceso"
                            }
                            
                            // Get estado badge data
                            const getEstadoBadge = (actividad: string, sesionNum: number) => {
                                    if (actividad === "Confirmación de sesión") {
                                      if (sesionNum === 1 || sesionNum === 2) return { text: "Confirmó", style: "bg-green-100 text-green-600 border-green-200", canal: "Llamada", canalStyle: "bg-green-100 text-green-600 border-green-200" }
                                                  return { text: "No respondió", style: "bg-yellow-100 text-yellow-600 border-yellow-200" }
                                    }
                                    if (actividad === "Recordatorio Subida de notas") {
                                      if (sesionNum === 1) return { text: "Confirmó manual", style: "bg-green-100 text-green-600 border-green-200", canal: "Llamada", canalStyle: "bg-green-100 text-green-600 border-green-200" }
                                      if (sesionNum === 2) return { text: "No confirmó manual", style: "bg-red-100 text-red-600 border-red-200", canal: "Correo", canalStyle: "bg-green-100 text-green-600 border-green-200" }
                                                  return { text: "No respondió", style: "bg-yellow-100 text-yellow-600 border-yellow-200" }
                                    }
                                    if (actividad === "Envio Material didáctico") {
                                                  if (sesionNum === 1 || sesionNum === 2) return { text: "No respondió manual", style: "bg-yellow-100 text-yellow-600 border-yellow-200", canal: "Whatsapp", canalStyle: "bg-green-100 text-green-600 border-green-200" }
                                                  return { text: "No respondió", style: "bg-yellow-100 text-yellow-600 border-yellow-200" }
                                    }
                              return { text: "En ejecución", style: "bg-green-100 text-green-600 border-green-200" }
                            }
                            
                            return (
                              <React.Fragment key={contacto.id}>
                                {/* Activity title row */}
                                <tr className="bg-gray-50 border-t border-gray-300">
                                  <td className="px-3 py-2">
                                    {/* Empty cell for Actividad */}
                                  </td>
                                  <td className="px-3 py-2">
                                    {/* Estado column - restored with content from first session */}
                                    {sesiones.length > 0 && (() => {
                                      const firstSesion = sesiones[0]
                                      const estadoBadge = getEstadoBadge(actividadNombre, firstSesion.numero)
                                      return (
                                        <div className="flex flex-col">
                                          <span className="text-gray-500 mb-1 text-xs">
                                            {getComentarioUnico(actividadNombre, firstSesion.numero)}
                                          </span>
                                          <div className="flex items-center gap-1">
                                            <span className={`px-2 py-0.5 text-[11px] rounded-full border w-fit ${estadoBadge.style}`}>
                                              {estadoBadge.text}
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    })()}
                                  </td>
                                  <td className="px-3 py-2">
                                    {/* Validación column - empty for now */}
                                  </td>
                                </tr>
                                {/* Session rows */}
                                {sesiones.map((sesion: { numero: number; fecha: string; estado: string }, index: number) => {
                                    // Calculate date one day before session
                                    const getFechaProgramada = (fechaSesion: string) => {
                                      const parts = fechaSesion.split("/")
                                      const date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
                                      date.setDate(date.getDate() - 1)
                                      return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`
                                    }
                                    
                                  const estadoBadge = getEstadoBadge(actividadNombre, sesion.numero)
                                  const isResolved = estadoBadge.text === "Confirmó" || estadoBadge.text === "No respondió manual" || sesion.numero === 3
                                  
                                  return (
                                    <tr 
                                      key={`${contacto.id}-${sesion.numero}`} 
                                      className={`hover:bg-gray-50 ${index < sesiones.length - 1 ? 'border-b border-gray-200' : ''}`}
                                    >
                                    <td className="px-3 py-2 pl-6">
                                      {/* Empty cell for Actividad */}
                                    </td>
                                    <td className="px-3 py-2">
                                      <div className="flex flex-col">
                                        <span className="text-gray-500 mb-1 text-xs">
                                          {getComentarioUnico(actividadNombre, sesion.numero)}
                                        </span>
                                        <div className="flex items-center gap-1">
                                          <span className={`px-2 py-0.5 text-[11px] rounded-full border w-fit ${estadoBadge.style}`}>
                                            {estadoBadge.text}
                                          </span>
                                          {estadoBadge.canal && (
                                            <div className="flex items-center gap-1">
                                              <span className={`px-2 py-0.5 text-[11px] rounded-full border ${estadoBadge.canalStyle || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                {estadoBadge.canal}
                                              </span>
                                              {estadoBadge.canal === "Llamada" && 
                                               ((actividadNombre === "Confirmación de sesión" && (sesion.numero === 1 || sesion.numero === 2)) ||
                                                (actividadNombre === "Recordatorio Subida de notas" && sesion.numero === 1)) && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation()
                                                    setAudioModal({
                                                      isOpen: true,
                                                      audioUrl: "/audio/llamada-grabada.mp3",
                                                      callInfo: {
                                                        actividad: actividadNombre,
                                                        sesion: `Sesión ${sesion.numero} - ${sesion.fecha} / 19:00 horario Perú`,
                                                        fecha: sesion.fecha
                                                      }
                                                    })
                                                  }}
                                                  className="p-1 bg-[#6419e6] hover:bg-[#5315c4] rounded-full transition-colors"
                                                  title="Reproducir llamada grabada"
                                                >
                                                  <Play className="h-3 w-3 text-white fill-white" />
                                                </button>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-3 py-2">
                                      <Button
                                        size="sm"
                                        className={`text-[12px] h-7 px-3 bg-[#6419e6] text-white ${isResolved ? "opacity-40 cursor-not-allowed" : "hover:bg-[#5315c4]"}`}
                                        disabled={isResolved}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          if (!isResolved) {
                                            setCurrentResolvingActivity({
                                              actividad: actividadNombre,
                                              sesion: sesion.numero
                                            })
                                            setResolverEstado("confirmo")
                                            setResolverCanal("whatsapp")
                                            setResolverComentario("")
                                            setIsResolverModalOpen(true)
                                          }
                                        }}
                                                  >
                                                    Verificar
                                                  </Button>
                                                </td>
                                              </tr>
                                            )
                                          })}
                              </React.Fragment>
                            )
                          })}
                            </>
                          ) : (
                            // Vista por Sesión
                            <>
                              {[1, 2, 3].filter((sesionNum) => {
                                // Filter sessions based on selected filter
                                if (sesionFilter === "todas") return true
                                if (sesionFilter === "ejecutadas") return sesionNum === 1 || sesionNum === 2
                                if (sesionFilter === "por_ejecutar") return sesionNum === 3
                                return true
                              }).map((sesionNum) => {
                                const fechaSesion = sesionNum === 1 ? "24/04/2025" : sesionNum === 2 ? "31/04/2025" : "07/05/2025"
                                const fechaEjecucion = sesionNum === 1 ? "23/04/2025" : sesionNum === 2 ? "30/04/2025" : "06/05/2025"
                                const actividades = [
                                  { nombre: "Confirmación de sesión", index: 0 },
                                  { nombre: "Recordatorio Subida de notas", index: 1 },
                                  { nombre: "Envio Material didáctico", index: 2 }
                                ]
                                
                                return (
                                  <React.Fragment key={`sesion-${sesionNum}`}>
                                    {/* Sesión Header Row */}
                                    <tr className="bg-gray-50 border-t border-gray-300">
                                      <td colSpan={3} className="px-3 py-2">
                                        <span className={`font-medium text-[14px] ${
                                          sesionNum === 1 || sesionNum === 2 ? "text-green-600" : "text-blue-600"
                                        }`}>
                                          Sesión {sesionNum} - {fechaSesion} / 19:00 horario Perú
                                        </span>
                                      </td>
                                    </tr>
                                    
                                    {actividades.map((actividad) => {
                                      const esConfirmacionSesion = actividad.nombre === "Confirmación de sesión"
                                      const esRecordatorioSubida = actividad.nombre === "Recordatorio Subida de notas"
                                      const esEnvioMaterial = actividad.nombre === "Envio Material didáctico"
                                      
                                      // Get badge styles for this activity and session
                                      const getWhatsappStyleSesion = () => {
                                        return "bg-green-100 text-green-600 border-green-200"
                                      }
                                      
                                      const getLlamadaStyleSesion = () => {
                                        if (esConfirmacionSesion && sesionNum === 3) {
                                          return "bg-blue-100 text-blue-600 border-blue-200"
                                        }
                                        if (esRecordatorioSubida && sesionNum === 3) {
                                          return "bg-blue-100 text-blue-600 border-blue-200"
                                        }
                                        if (esEnvioMaterial) {
                                          if (sesionNum === 1) return "bg-gray-100 text-gray-400 border-gray-200"
                                          if (sesionNum === 2) return "bg-green-100 text-green-600 border-green-200"
                                          if (sesionNum === 3) return "bg-blue-100 text-blue-600 border-blue-200"
                                        }
                                        return "bg-green-100 text-green-600 border-green-200"
                                      }
                                      
                                      const getCorreoStyleSesion = () => {
                                        if (esConfirmacionSesion) {
                                          if (sesionNum === 1) return "bg-gray-100 text-gray-400 border-gray-200"
                                          if (sesionNum === 2) return "bg-gray-100 text-gray-400 border-gray-200"
                                        }
                                        if (esRecordatorioSubida) {
                                          if (sesionNum === 1 || sesionNum === 2) return "bg-green-100 text-green-600 border-green-200"
                                          if (sesionNum === 3) return "bg-gray-100 text-gray-400 border-gray-200"
                                        }
                                        if (esEnvioMaterial) {
                                          if (sesionNum === 1 || sesionNum === 2) return "bg-green-100 text-green-600 border-green-200"
                                          if (sesionNum === 3) return "bg-gray-100 text-gray-400 border-gray-200"
                                        }
                                        return "bg-blue-100 text-blue-600 border-blue-200"
                                      }
                                      
                                      const getLastExecutedSubactivity = () => {
                                        // Hardcoded values based on session and activity type
                                        if (sesionNum === 1) {
                                          if (esConfirmacionSesion) return { name: "1.2 Envio de correo", time: "13:00" }
                                          if (esRecordatorioSubida) return { name: "2.3 Llamada IVR", time: "17:00" }
                                          if (esEnvioMaterial) return { name: "3.1 Envio de Whatsapp", time: "07:00" }
                                        }
                                        if (sesionNum === 2) {
                                          if (esConfirmacionSesion) return { name: "1.3 Llamada IVR", time: "17:00" }
                                          if (esRecordatorioSubida) return { name: "2.3 Llamada IVR", time: "17:00" }
                                          if (esEnvioMaterial) return { name: "3.1 Envio de Whatsapp", time: "07:00" }
                                        }
                                        if (sesionNum === 3) {
                                          if (esConfirmacionSesion) return { name: "1.1 Envio de Whatsapp", time: "07:00" }
                                          if (esRecordatorioSubida) return { name: "2.1 Envio de Whatsapp", time: "07:00" }
                                          if (esEnvioMaterial) return { name: "3.1 Envio de Whatsapp", time: "07:00" }
                                        }
                                        return null
                                      }
                                      
                                      const getEstadoText = () => {
                                        if (esConfirmacionSesion) {
                                          if (sesionNum === 1) return { text: "Docente confirmó asistencia", badges: [{ text: "Confirmó", style: "bg-green-100 text-green-600 border-green-200" }] }
                                          if (sesionNum === 2) return { text: "Confirmación recibida correctamente", badges: [{ text: "Confirmó", style: "bg-green-100 text-green-600 border-green-200" }] }
                                          if (sesionNum === 3) return { text: "Subactividad programada para iniciar", badges: [{ text: "Por ejecutar", style: "bg-blue-100 text-blue-600 border-blue-200" }] }
                                        }
                                        if (esRecordatorioSubida) {
                                          if (sesionNum === 1) {
                                            // Obtener dinámicamente el estado de Subactividad 4 - Asesor
                                            const sub4State = subactivityStates[`${sesionNum}-Recordatorio Subida de notas-4`]
                                            if (sub4State?.comentario && sub4State?.etiquetaAdicional) {
                                              const etiquetaTexto = sub4State.etiquetaAdicional.texto
                                              const canal = sub4State.canal ? ` - ${sub4State.canal.charAt(0).toUpperCase() + sub4State.canal.slice(1)}` : ""
                                              return { 
                                                text: sub4State.comentario, 
                                                badges: [{ text: `${etiquetaTexto}${canal}`, style: 
                                                  sub4State.etiquetaAdicional.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                  sub4State.etiquetaAdicional.color === "red" ? "bg-red-100 text-red-600 border-red-200" :
                                                  sub4State.etiquetaAdicional.color === "yellow" ? "bg-yellow-100 text-yellow-600 border-yellow-200" :
                                                  sub4State.etiquetaAdicional.color === "blue" ? "bg-blue-100 text-blue-600 border-blue-200" :
                                                  "bg-gray-100 text-gray-600 border-gray-200"
                                                }] 
                                              }
                                            }
                                            return { 
                                              text: "El docente no respondió la comunicación", 
                                              badges: [{ text: "No respondio", style: "bg-yellow-100 text-yellow-600 border-yellow-200" }] 
                                            }
                                          }
                                          if (sesionNum === 2) {
                                            // Obtener dinámicamente el estado de Subactividad 4 - Asesor
                                            const sub4State = subactivityStates[`${sesionNum}-Recordatorio Subida de notas-4`]
                                            if (sub4State?.comentario && sub4State?.etiquetaAdicional) {
                                              const etiquetaTexto = sub4State.etiquetaAdicional.texto
                                              const canal = sub4State.canal ? ` - ${sub4State.canal.charAt(0).toUpperCase() + sub4State.canal.slice(1)}` : ""
                                              return { 
                                                text: sub4State.comentario, 
                                                badges: [{ text: `${etiquetaTexto}${canal}`, style: 
                                                  sub4State.etiquetaAdicional.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                  sub4State.etiquetaAdicional.color === "red" ? "bg-red-100 text-red-600 border-red-200" :
                                                  sub4State.etiquetaAdicional.color === "yellow" ? "bg-yellow-100 text-yellow-600 border-yellow-200" :
                                                  sub4State.etiquetaAdicional.color === "blue" ? "bg-blue-100 text-blue-600 border-blue-200" :
                                                  "bg-gray-100 text-gray-600 border-gray-200"
                                                }] 
                                              }
                                            }
                                            return { 
                                              text: "El docente no respondió la comunicación", 
                                              badges: [{ text: "No respondio", style: "bg-yellow-100 text-yellow-600 border-yellow-200" }] 
                                            }
                                          }
                                          if (sesionNum === 3) return { text: "Subactividad programada para iniciar", badges: [{ text: "Por ejecutar", style: "bg-blue-100 text-blue-600 border-blue-200" }] }
                                        }
                                        if (esEnvioMaterial) {
                                          if (sesionNum === 1) {
                                            // Obtener dinámicamente el estado de Subactividad 1
                                            const sub1State = subactivityStates[`${sesionNum}-Envio Material didáctico-1`]
                                            if (sub1State?.comentario && sub1State?.etiquetaAdicional) {
                                              const etiquetaTexto = sub1State.etiquetaAdicional.texto
                                              const canal = sub1State.canal ? ` - ${sub1State.canal.charAt(0).toUpperCase() + sub1State.canal.slice(1)}` : ""
                                              return { 
                                                text: sub1State.comentario, 
                                                badges: [{ text: `${etiquetaTexto}${canal}`, style: 
                                                  sub1State.etiquetaAdicional.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                  sub1State.etiquetaAdicional.color === "red" ? "bg-red-100 text-red-600 border-red-200" :
                                                  sub1State.etiquetaAdicional.color === "blue" ? "bg-blue-100 text-blue-600 border-blue-200" :
                                                  "bg-gray-100 text-gray-600 border-gray-200"
                                                }] 
                                              }
                                            }
                                            return { text: "", badges: [] }
                                          }
                                          if (sesionNum === 2) {
                                            // Obtener dinámicamente el estado de Subactividad 1
                                            const sub1State = subactivityStates[`${sesionNum}-Envio Material didáctico-1`]
                                            if (sub1State?.comentario && sub1State?.etiquetaAdicional) {
                                              const etiquetaTexto = sub1State.etiquetaAdicional.texto
                                              const canal = sub1State.canal ? ` - ${sub1State.canal.charAt(0).toUpperCase() + sub1State.canal.slice(1)}` : ""
                                              return { 
                                                text: sub1State.comentario, 
                                                badges: [{ text: `${etiquetaTexto}${canal}`, style: 
                                                  sub1State.etiquetaAdicional.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                  sub1State.etiquetaAdicional.color === "red" ? "bg-red-100 text-red-600 border-red-200" :
                                                  sub1State.etiquetaAdicional.color === "blue" ? "bg-blue-100 text-blue-600 border-blue-200" :
                                                  "bg-gray-100 text-gray-600 border-gray-200"
                                                }] 
                                              }
                                            }
                                            return { text: "", badges: [] }
                                          }
                                          if (sesionNum === 3) return { text: "Subactividad programada para iniciar", badges: [{ text: "Por ejecutar", style: "bg-blue-100 text-blue-600 border-blue-200" }] }
                                        }
                                        return { text: "", badges: [] }
                                      }
                                      
                                      const estadoInfo = getEstadoText()
                                      const isResolved = sesionNum !== 3
                                      
                                      return (
                                        <>
                                          <tr key={`sesion-${sesionNum}-${actividad.nombre}`} className="hover:bg-gray-50 border-b border-gray-200">
                                            <td className="px-3 py-2 pl-6">
                                              <div className="flex items-center gap-2">
                                                <button
                                                  onClick={() => {
                                                    const rowKey = `${sesionNum}-${actividad.nombre}`
                                                    setExpandedRows(prev => ({
                                                      ...prev,
                                                      [rowKey]: !prev[rowKey]
                                                    }))
                                                  }}
                                                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                >
                                                  <ChevronDown 
                                                    className={`h-4 w-4 transition-transform ${expandedRows[`${sesionNum}-${actividad.nombre}`] ? 'rotate-180' : ''}`}
                                                  />
                                                </button>
                                                <div className="flex flex-col">
                                                  <span className="text-gray-600 text-sm">
                                                    {actividad.index + 1}. {actividad.nombre}
                                                  </span>
                                                  <span className="text-[12px] text-blue-600 font-normal">
                                                    {sesionNum === 2 ? "" : (esEnvioMaterial && sesionNum === 1 ? "(Ana Martinez)" : "(Carlos Rodriguez)")}
                                                  </span>
                                                </div>
                                              </div>
                                            </td>
                            <td className="px-3 py-3">
                              
                            </td>
                                          </tr>
                                          {expandedRows[`${sesionNum}-${actividad.nombre}`] && (
                                            <>
                                              <tr className="bg-gray-50 border-b border-gray-200">
                                                <td className="px-3 py-3 pl-20">
                                                  <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                      <span className="text-sm text-gray-700">
                                                        {`${actividad.index + 1}.1 Envio de Whatsapp`}
                                                      </span>
                                                      <span className="text-xs text-gray-500">
                                                        {sesionNum === 1 ? "24/04/2025" : sesionNum === 2 ? "30/04/2025" : "06/05/2025"} - 07:00
                                                      </span>
                                                    </div>
                                                    <div className="w-px h-5 bg-gray-300 flex-shrink-0"></div>
                                                    {(() => {
                                                      const stateKey = `${sesionNum}-${actividad.nombre}-1`
                                                      const subState = subactivityStates[stateKey]
                                                      return (
                                                        <div className="flex items-center gap-2">
                                                          {subState?.estado !== "ejecutada" && (
                                                          <Button
                                                            size="icon"
                                                            className={`h-6 w-6 rounded-full p-0 bg-green-600 text-white hover:bg-green-700 flex-shrink-0 ${
                                                              subState?.iniciarDisabled ? "opacity-40 cursor-not-allowed" : ""
                                                            }`}
                                                            disabled={subState?.iniciarDisabled ?? true}
                                                            onClick={(e) => {
                                                              e.stopPropagation()
                                                              if (!subState?.iniciarDisabled) {
                                                                setSelectedSubActivityToStart({
                                                                  activity: actividad.nombre,
                                                                  subactivity: 1,
                                                                  fullName: "Subactividad 1 - Whatsapp - 07:00",
                                                                  sesionNum: sesionNum
                                                                })
                                                                setIsStartSubActivityModalOpen(true)
                                                              }
                                                            }}
                                                          >
                                                            <Play className="h-3 w-3 text-white fill-white" />
                                                          </Button>
                                                          )}
                                                          <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${
                                                            subState?.estado === "ejecutada"
                                                              ? "bg-green-100 text-green-600 border-green-200"
                                                              : subState?.colorPorEjecutar === "blue"
                                                              ? "bg-blue-50 text-blue-600 border-blue-200"
                                                              : "bg-gray-100 text-gray-600 border-gray-200"
                                                          }`}>
                                                            {subState?.estado === "ejecutada" ? (
                                                              <div className="flex items-center gap-1">
                                                                Ejecutada
                                                                <Bot className="h-3 w-3" />
                                                              </div>
                                                            ) : (
                                                              "Por ejecutar"
                                                            )}
                                                          </Badge>
                                                        </div>
                                                      )
                                                    })()}
                                                  </div>
                                                </td>
                                                <td className="px-3 py-3">
                                                  {(() => {
                                                    const stateKey = `${sesionNum}-${actividad.nombre}-1`
                                                    const subState = subactivityStates[stateKey]
                                                    return (
                                                        <div className="flex flex-col gap-2 h-full">
                                                        {subState?.comentario && (
                                                          <div className="text-sm text-gray-600">{subState.comentario}</div>
                                                        )}
                                                        <div className="flex flex-wrap gap-2">
                                                          {stateKey === "2-Envio Material didáctico-1" ? (
                                                            <div className="flex items-center gap-1">
                                                              <Badge className="text-[11px] px-2 py-0.5 w-fit flex items-center gap-1 bg-red-100 text-red-600 border border-red-200">
                                                                Rechazo
                                                                <Bot className="h-3 w-3" />
                                                              </Badge>
                                                              {subState?.validarDisabled && <Check className="h-5 w-5 text-green-500 flex-shrink-0" />}
                                                            </div>
                                                          ) : subState?.desvalidado ? (
                                                            <>
                                                              <div className="flex items-center gap-1">
                                                                <Badge variant="outline" className={`text-[11px] px-2 py-0.5 w-fit flex items-center gap-1 line-through opacity-50 ${
                                                                  subState.etiquetaDesvalidada?.color === "red" ? "bg-red-50 text-red-600 border-red-200" :
                                                                  subState.etiquetaDesvalidada?.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                                  "bg-gray-100 text-gray-600 border-gray-200"
                                                                }`}>
                                                                  {subState.etiquetaDesvalidada?.texto}
                                                                  <Bot className="h-3 w-3" />
                                                                </Badge>
                                                                <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                                                              </div>
                                                              <div className="w-px h-5 bg-gray-300 flex-shrink-0"></div>
                                                              <Badge className="text-[11px] px-2 py-0.5 w-fit flex items-center gap-1 bg-yellow-100 text-yellow-600 border border-yellow-200">
                                                                {sesionNum === 2 && stateKey.includes("-1") ? (
                                                                  <>
                                                                    No respondió
                                                                    <User className="h-3 w-3" />
                                                                  </>
                                                                ) : (
                                                                  <>
                                                                    <CheckCircle2 className="h-3 w-3" />
                                                                    No respondió
                                                                  </>
                                                                )}
                                                              </Badge>
                                                            </>
                                                          ) : (
                                                            <>
                                                              {subState?.etiquetaAdicional && (
                                                                <div className="flex items-center gap-1">
                                                                  <Badge variant="outline" className={`text-[11px] px-2 py-0.5 w-fit flex items-center gap-1 ${
                                                                    subState.etiquetaAdicional.color === "blue" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                                                    subState.etiquetaAdicional.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                                    subState.etiquetaAdicional.color === "red" ? "bg-red-50 text-red-600 border-red-200" :
                                                                    subState.etiquetaAdicional.color === "yellow" ? "bg-yellow-100 text-yellow-600 border-yellow-200" :
                                                                    "bg-gray-100 text-gray-600 border-gray-200"
                                                                  }`}>
                                                                    {subState.etiquetaAdicional.texto} {subState.canal && `- ${subState.canal.charAt(0).toUpperCase() + subState.canal.slice(1)}`}
                                                                    {sesionNum === 2 && stateKey.includes("-1") ? (
                                                                      <User className="h-3 w-3" />
                                                                    ) : (
                                                                      <Bot className="h-3 w-3" />
                                                                    )}
                                                                  </Badge>
                                                                  {subState?.validarDisabled && <Check className="h-5 w-5 text-green-500 flex-shrink-0" />}
                                                                </div>
                                                              )}

                                                            </>
                                                          )}
                                                        </div>
                                                      </div>
                                                    )
                                                  })()}
                                                </td>
                                                <td className="px-3 py-3 text-center">
                                                  {(() => {
                                                    const stateKey = `${sesionNum}-${actividad.nombre}-1`
                                                    const subState = subactivityStates[stateKey]
                                                    return (
                                                      <Button
                                                        size="sm"
                                                        className={`text-[12px] h-7 px-2 bg-[#6419e6] text-white ${
                                                          subState?.validarDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[#5315c4]"
                                                        }`}
                                                        disabled={subState?.validarDisabled ?? true}
                                                        onClick={(e) => {
                                                          e.stopPropagation()
                                                          if (!subState?.validarDisabled) {
                                                            if (sesionNum === 1 && actividad.nombre === "Envio Material didáctico") {
                                                              setWhatsAppVerificationSource(`1-Envio Material didáctico-1`)
                                                            } else if (sesionNum === 2 && actividad.nombre === "Envio Material didáctico") {
                                                              setWhatsAppVerificationSource(`2-Envio Material didáctico-1`)
                                                            }
                                                            setIsWhatsAppVerificationOpen(true)
                                                          }
                                                        }}
                                                      >
                                                        Validar
                                                      </Button>
                                                    )
                                                  })()}
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 border-b border-gray-200">
                                                <td className="px-3 py-3 pl-20">
                                                  <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                      <span className="text-sm text-gray-700">
                                                        {`${actividad.index + 1}.2 Envio de correo`}
                                                      </span>
                                                      <span className="text-xs text-gray-500">
                                                        {sesionNum === 1 ? "24/04/2025" : sesionNum === 2 ? "30/04/2025" : "06/05/2025"} - 13:00
                                                      </span>
                                                    </div>
                                                    <div className="w-px h-5 bg-gray-300 flex-shrink-0"></div>
                                                    {(() => {
                                                      const stateKey = `${sesionNum}-${actividad.nombre}-2`
                                                      const subState = subactivityStates[stateKey]
                                                      return (
                                                        <div className="flex items-center gap-2">
                                                          {subState?.estado !== "ejecutada" && (
                                                          <Button
                                                            size="icon"
                                                            className={`h-6 w-6 rounded-full p-0 bg-green-600 text-white hover:bg-green-700 flex-shrink-0 ${
                                                              subState?.iniciarDisabled ? "opacity-40 cursor-not-allowed" : ""
                                                            }`}
                                                            disabled={subState?.iniciarDisabled ?? true}
                                                            onClick={(e) => {
                                                              e.stopPropagation()
                                                              if (!subState?.iniciarDisabled) {
                                                                setSelectedSubActivityToStart({
                                                                  activity: actividad.nombre,
                                                                  subactivity: 2,
                                                                  fullName: "Subactividad 2 - Correo - 13:00",
                                                                  sesionNum: sesionNum
                                                                })
                                                                setIsStartSubActivityModalOpen(true)
                                                              }
                                                            }}
                                                          >
                                                            <Play className="h-3 w-3 text-white fill-white" />
                                                          </Button>
                                                          )}
                                                          <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${
                                                            subState?.estado === "ejecutada"
                                                              ? "bg-green-100 text-green-600 border-green-200"
                                                              : subState?.colorPorEjecutar === "blue"
                                                              ? "bg-blue-50 text-blue-600 border-blue-200"
                                                              : "bg-gray-100 text-gray-600 border-gray-200"
                                                          }`}>
                                                            {subState?.estado === "ejecutada" ? (
                                                              <div className="flex items-center gap-1">
                                                                Ejecutada
                                                                <User className="h-3 w-3" />
                                                              </div>
                                                            ) : (
                                                              "Por ejecutar"
                                                            )}
                                                          </Badge>
                                                        </div>
                                                      )
                                                    })()}
                                                  </div>
                                                </td>
                                                <td className="px-3 py-3">
                                                  {(() => {
                                                    const stateKey = `${sesionNum}-${actividad.nombre}-2`
                                                    const subState = subactivityStates[stateKey]
                                                    return (
                                                      <div className="flex flex-col gap-2 h-full">
                                                        {subState?.comentario && (
                                                          <div className="text-sm text-gray-600">{subState.comentario}</div>
                                                        )}
                                                        <div className="flex flex-wrap gap-2">
                                                          {subState?.etiquetaAdicional && (
                                                            <div className="flex items-center gap-1">
                                                              <Badge variant="outline" className={`text-[11px] px-2 py-0.5 w-fit flex items-center gap-1 ${
                                                                subState.etiquetaAdicional.color === "blue" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                                                subState.etiquetaAdicional.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                                subState.etiquetaAdicional.color === "red" ? "bg-red-50 text-red-600 border-red-200" :
                                                                subState.etiquetaAdicional.color === "yellow" ? "bg-yellow-100 text-yellow-600 border-yellow-200" :
                                                                "bg-gray-100 text-gray-600 border-gray-200"
                                                              }`}>
                                                                {subState.etiquetaAdicional.texto} {subState.canal && `- ${subState.canal.charAt(0).toUpperCase() + subState.canal.slice(1)}`}
                                                                <Bot className="h-3 w-3" />
                                                              </Badge>
                                                              {subState?.validarDisabled && <Check className="h-5 w-5 text-green-500 flex-shrink-0" />}
                                                            </div>
                                                          )}

                                                        </div>
                                                      </div>
                                                    )
                                                  })()}
                                                </td>
                                                <td className="px-3 py-3 text-center">
                                                  {(() => {
                                                    const stateKey = `${sesionNum}-${actividad.nombre}-2`
                                                    const subState = subactivityStates[stateKey]
                                                    return (
                                                      <Button
                                                        size="sm"
                                                        className={`text-[12px] h-7 px-2 bg-[#6419e6] text-white ${
                                                          subState?.validarDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[#5315c4]"
                                                        }`}
                                                        disabled={subState?.validarDisabled ?? true}
                                                        onClick={(e) => {
                                                          e.stopPropagation()
                                                          if (!subState?.validarDisabled) {
                                                            setEmailVerificationSource(stateKey)
                                                            setIsEmailVerificationOpen(true)
                                                          }
                                                        }}
                                                      >
                                                        Validar
                                                      </Button>
                                                    )
                                                  })()}
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 border-b border-gray-200">
                                                <td className="px-3 py-3 pl-20">
                                                  <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                      <span className="text-sm text-gray-700">
                                                        {`${actividad.index + 1}.3 Llamada IVR`}
                                                      </span>
                                                      <span className="text-xs text-gray-500">
                                                        {sesionNum === 1 ? "24/04/2025" : sesionNum === 2 ? "30/04/2025" : "06/05/2025"} - 17:00
                                                      </span>
                                                    </div>
                                                    <div className="w-px h-5 bg-gray-300 flex-shrink-0"></div>
                                                    {(() => {
                                                      const stateKey = `${sesionNum}-${actividad.nombre}-3`
                                                      const subState = subactivityStates[stateKey]
                                                      return (
                                                        <div className="flex items-center gap-2">
                                                          {subState?.estado !== "ejecutada" && (
                                                          <Button
                                                            size="icon"
                                                            className={`h-6 w-6 rounded-full p-0 bg-green-600 text-white hover:bg-green-700 flex-shrink-0 ${
                                                              subState?.iniciarDisabled ? "opacity-40 cursor-not-allowed" : ""
                                                            }`}
                                                            disabled={subState?.iniciarDisabled ?? true}
                                                            onClick={(e) => {
                                                              e.stopPropagation()
                                                              if (!subState?.iniciarDisabled) {
                                                                setSelectedSubActivityToStart({
                                                                  activity: actividad.nombre,
                                                                  subactivity: 3,
                                                                  fullName: "Subactividad 3 - Llamada - 17:00",
                                                                  sesionNum: sesionNum
                                                                })
                                                                setIsStartSubActivityModalOpen(true)
                                                              }
                                                            }}
                                                          >
                                                            <Play className="h-3 w-3 text-white fill-white" />
                                                          </Button>
                                                          )}
                                                          <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${
                                                            subState?.estado === "ejecutada"
                                                              ? "bg-green-100 text-green-600 border-green-200"
                                                              : subState?.colorPorEjecutar === "blue"
                                                              ? "bg-blue-50 text-blue-600 border-blue-200"
                                                              : "bg-gray-100 text-gray-600 border-gray-200"
                                                          }`}>
                                                            {subState?.estado === "ejecutada" ? (
                                                              <div className="flex items-center gap-1">
                                                                Ejecutada
                                                                <User className="h-3 w-3" />
                                                              </div>
                                                            ) : (
                                                              "Por ejecutar"
                                                            )}
                                                          </Badge>
                                                        </div>
                                                      )
                                                    })()}
                                                  </div>
                                                </td>
                                                <td className="px-3 py-3">
                                                  {(() => {
                                                    const stateKey = `${sesionNum}-${actividad.nombre}-3`
                                                    const subState = subactivityStates[stateKey]
                                                    return (
                                                      <div className="flex flex-col gap-2 h-full">
                                                        {subState?.comentario && (
                                                          <div className="text-sm text-gray-600">{subState.comentario}</div>
                                                        )}
                                                        <div className="flex flex-wrap gap-2">
                                                          {subState?.etiquetaAdicional && (
                                                            <div className="flex items-center gap-1">
                                                              <Badge variant="outline" className={`text-[11px] px-2 py-0.5 w-fit flex items-center gap-1 ${
                                                                subState.etiquetaAdicional.color === "blue" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                                                subState.etiquetaAdicional.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                                subState.etiquetaAdicional.color === "red" ? "bg-red-50 text-red-600 border-red-200" :
                                                                subState.etiquetaAdicional.color === "yellow" ? "bg-yellow-100 text-yellow-600 border-yellow-200" :
                                                                "bg-gray-100 text-gray-600 border-gray-200"
                                                              }`}>
                                                                {subState.etiquetaAdicional.texto} {subState.canal && `- ${subState.canal.charAt(0).toUpperCase() + subState.canal.slice(1)}`}
                                                                <Bot className="h-3 w-3" />
                                                              </Badge>
                                                              {subState?.validarDisabled && <Check className="h-5 w-5 text-green-500 flex-shrink-0" />}
                                                            </div>
                                                          )}

                                                        </div>
                                                      </div>
                                                    )
                                                  })()}
                                                </td>
                                                <td className="px-3 py-3 text-center">
                                                  {(() => {
                                                    const stateKey = `${sesionNum}-${actividad.nombre}-3`
                                                    const subState = subactivityStates[stateKey]
                                                    return (
                                                      <Button
                                                        size="sm"
                                                        className={`text-[12px] h-7 px-2 bg-[#6419e6] text-white ${
                                                          subState?.validarDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[#5315c4]"
                                                        }`}
                                                        disabled={subState?.validarDisabled ?? true}
                                                        onClick={(e) => {
                                                          e.stopPropagation()
                                                          if (!subState?.validarDisabled) {
                                                            if (sesionNum === 2 && actividad.nombre === "Envio Material didáctico") {
                                                              setWhatsAppVerificationSource(`2-Envio Material didáctico-1`)
                                                              setIsWhatsAppVerificationOpen(true)
                                                            } else {
                                                              setIsCallVerificationOpen(true)
                                                            }
                                                          }
                                                        }}
                                                      >
                                                        Validar
                                                      </Button>
                                                    )
                                                  })()}
                                                </td>
                                              </tr>
                                              <tr className="bg-gray-50 border-b border-gray-200">
                                                <td className="px-3 py-3 pl-20">
                                                  <div className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-700">
                                                      {`${actividad.index + 1}.4 Comunicacion del Asesor`}
                                                    </span>
                                                    <div className="w-px h-5 bg-gray-300 flex-shrink-0"></div>
                                                    {(() => {
                                                      const stateKey = `${sesionNum}-${actividad.nombre}-4`
                                                      const subState = subactivityStates[stateKey]
                                                      return (
                                                        <div className="flex items-center gap-2">
                                                          {subState?.estado !== "ejecutada" && (
                                                          <Button
                                                            size="icon"
                                                            className={`h-6 w-6 rounded-full p-0 bg-green-600 text-white hover:bg-green-700 flex-shrink-0 ${
                                                              subState?.iniciarDisabled ? "opacity-40 cursor-not-allowed" : ""
                                                            }`}
                                                            disabled={subState?.iniciarDisabled ?? true}
                                                            onClick={(e) => {
                                                              e.stopPropagation()
                                                              if (!subState?.iniciarDisabled) {
                                                                setCurrentResolvingActivity({
                                                                  actividad: actividad.nombre,
                                                                  sesion: sesionNum
                                                                })
                                                                setIsResolverModalOpen(true)
                                                              }
                                                            }}
                                                          >
                                                            <Play className="h-3 w-3 text-white fill-white" />
                                                          </Button>
                                                          )}
                                                          <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${
                                                            subState?.estado === "ejecutada"
                                                              ? "bg-green-100 text-green-600 border-green-200"
                                                              : "bg-gray-100 text-gray-600 border-gray-200"
                                                          }`}>
                                                            {subState?.estado === "ejecutada" ? (
                                                              <div className="flex items-center gap-1">
                                                                Ejecutada
                                                                <Bot className="h-3 w-3" />
                                                              </div>
                                                            ) : (
                                                              "Por ejecutar"
                                                            )}
                                                          </Badge>
                                                        </div>
                                                      )
                                                    })()}
                                                  </div>
                                                </td>
                                                <td className="px-3 py-3">
                                                  {(() => {
                                                    const stateKey = `${sesionNum}-${actividad.nombre}-4`
                                                    const subState = subactivityStates[stateKey]
                                                    return (
                                                      <div className="flex flex-col gap-2 h-full">
                                                        {subState?.comentario && (
                                                          <div className="text-sm text-gray-600">{subState.comentario}</div>
                                                        )}
                                                        <div className="flex flex-wrap gap-2">
                                                          {subState?.etiquetaAdicional && (
                                                            <div className="flex items-center gap-1">
                                                              <Badge variant="outline" className={`text-[11px] px-2 py-0.5 w-fit flex items-center gap-1 ${
                                                                subState.etiquetaAdicional.color === "blue" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                                                subState.etiquetaAdicional.color === "green" ? "bg-green-100 text-green-600 border-green-200" :
                                                                subState.etiquetaAdicional.color === "red" ? "bg-red-50 text-red-600 border-red-200" :
                                                                subState.etiquetaAdicional.color === "yellow" ? "bg-yellow-100 text-yellow-600 border-yellow-200" :
                                                                "bg-gray-100 text-gray-600 border-gray-200"
                                                              }`}>
                                                                {subState.etiquetaAdicional.texto} {subState.canal === "whatsapp" ? "- Envio de Whatsapp" : subState.canal === "correo" ? "- Envio de correo" : subState.canal === "llamada" ? "- Llamada IVR" : ""}
                                                                <User className="h-3 w-3" />
                                                              </Badge>
                                                              {subState?.validarDisabled && <Check className="h-5 w-5 text-green-500 flex-shrink-0" />}
                                                            </div>
                                                          )}

                                                        </div>
                                                      </div>
                                                    )
                                                  })()}
                                                </td>
                                              </tr>
                                            </>
                                          )}
                                        </>
                                      )
                                    })}
                                  </React.Fragment>
                                )
                              })}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between p-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] text-gray-600">Página</span>
                        <div className="w-10 h-7 border border-gray-200 rounded flex items-center justify-center bg-white">
                          <input
                            type="text"
                            defaultValue="1"
                            className="w-full h-full text-center text-[14px]"
                            onChange={(e) => {}}
                          />
                        </div>
                        <span className="text-[14px] text-gray-600">de 3</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <select className="h-7 pl-2 pr-6 border border-gray-200 rounded appearance-none bg-white text-[14px]">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                          </select>
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>
                        <span className="text-[14px] text-gray-600">items por página</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="11 17 6 12 11 7"></polyline>
                            <polyline points="18 17 13 12 18 7"></polyline>
                          </svg>
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        <span className="text-[14px] text-gray-600 mx-2">1 - 5 de 23 items</span>
                        <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="13 17 18 12 13 7"></polyline>
                            <polyline points="6 17 11 12 6 7"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* CHANGE: Replace two-panel email layout with collapsible table format */}
        {activeTab === "correo-electronico" && (
          <div className="mt-6 mb-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              
            </div>
          </>
        )}

        {/* CHANGE: Replace two-panel email layout with collapsible table format */}
        {activeTab === "correo-electronico" && (
          <div className="mt-6 mb-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full flex items-center justify-between p-4 bg-[#e3f2fd]">
                <div className="flex items-center gap-2">
                  <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-[#6419e6] font-semibold">Correos</span>

                  {/* Unread notification badge */}
                  {emailUnreadCount > 0 && (
                    <div className="flex items-center">
                      <div className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-1">
                        {emailUnreadCount}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f0f8ff]">
                        <th className="px-4 py-2 text-left font-medium text-[#6419e6]">Asunto</th>
                        <th className="px-4 py-2 text-left font-medium text-[#6419e6]">Fecha y Hora</th>
                        <th className="px-4 py-2 text-left font-medium text-[#6419e6]">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emailData.filter(email => !email.hideFromList).map((email) => (
                        <tr
                          key={email.id}
                          className={email.id % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-50"}
                        >
                          <td className="px-4 py-3 border-b">
                            <span className={`text-[#6419e6] font-medium ${!email.isRead ? "font-bold" : ""}`}>{email.subject}</span>
                          </td>
                          <td className="px-4 py-3 border-b">
                            <div className="flex flex-col">
                              <span className={`text-[#6419e6] ${!email.isRead ? "font-bold" : ""}`}>
                                {email.date} | {email.time}
                              </span>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium w-fit mt-1 border ${
                                    email.status === "Enviado"
                                      ? "bg-blue-100 text-blue-800 border-blue-300"
                                      : "bg-green-100 text-green-800 border-green-300"
                                  }`}
                                >
                                  {email.status}
                                </span>
                                {!email.isRead && email.status === "Recibido" && (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium w-fit mt-1 border bg-red-100 text-red-800 border-red-300 animate-pulse">
                                    Nuevo
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 border-b">
                            <div className="flex gap-2">
                              <button
                                className="flex items-center justify-center px-4 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md border border-blue-300 transition-colors"
                                title="Ver correo"
                                onClick={() => handleViewEmailFromTable(email)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                <span>Ver</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Página</span>
                    <div className="w-12 h-8 border border-gray-200 rounded flex items-center justify-center bg-white">
                      <input type="text" defaultValue="1" className="w-full h-full text-center text-sm" readOnly />
                    </div>
                    <span className="text-sm text-gray-600">de 1</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <select className="h-8 pl-3 pr-8 border border-gray-200 rounded appearance-none bg-white text-sm">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                      </select>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">items por página</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200">
                      <ChevronsLeft className="h-4 w-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-600 mx-2">
                      1 - {emailData.length} de {emailData.length} items
                    </span>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200">
                      <ChevronsRight className="h-4 w-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 ml-2">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "whatsapp" && (
          <div className="mt-6 mb-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Static header - same style as email section */}
              <div className="w-full flex items-center justify-between p-4 bg-[#e3f2fd]">
                <div className="flex items-center gap-2">
                  <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <span className="text-base text-[#6419e6] font-semibold">WhatsApp</span>
                </div>
              </div>

              {/* WhatsApp chat content - always visible */}
              <div className="p-4 flex justify-center">
                <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm max-w-[50%] w-full">
                  {/* Chat header */}
                  <div className="bg-[#00bc3a] text-white p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-white rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#00bc3a"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <span className="font-medium text-sm">Carlos Rodriguez</span>
                    </div>
                    <button className="p-1 hover:bg-[#0e6b5e] rounded-full">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Messages area */}
                  <div
                    className="h-[24rem] overflow-y-auto p-2"
                    style={{
                      backgroundColor: "#f2eae4",
                    }}
                  >
                    {/* Message 1 */}
                    <div className="max-w-[80%] ml-auto mb-3">
                      <div className="bg-[#d4f1ff] p-2 rounded-lg shadow-sm text-gray-800">
                        <p className="text-xs">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#2979FF] text-white border border-[#90CAF9] mr-1">
                            Automático
                          </span>
                          <span className="font-medium">Hola Carlos, te saluda de BSG INSTITUTE</span> Te hemos enviado
                          un correo electrónico con la información del{" "}
                          <span className="font-medium">Programa Internacional en Gerencia de Proyectos</span> que nos
                          solicitaste vía Llamada Telefonica. Estoy a tu disposición para poder resolver todas tus dudas
                          o consultas. Coméntame en que horario podría llamarte por teléfono.
                        </p>
                        <div className="flex justify-end items-center gap-1 mt-1">
                          <span className="text-xs text-gray-600">2024/04/24 10:16 AM</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#2979FF]"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                            <polyline points="20 12 9 23 4 18"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message 2 */}
                    <div className="max-w-[80%] ml-auto mb-3">
                      <div className="bg-[#dcffde] p-2 rounded-lg shadow-sm text-gray-800">
                        <p className="text-xs">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#00bc3a] text-white border border-[#A5D6A7] mr-1">
                            Manual
                          </span>
                          <span className="font-medium">Paola Lozano</span>
                          <br />
                          <span className="font-medium">Hola Carlos, te saluda Paola Lozano de BSG INSTITUTE</span> Te
                          hemos enviado un correo electrónico con la información del{" "}
                          <span className="font-medium">Programa Internacional en Gerencia de Proyectos</span> que nos
                          solicitaste vía Llamada Telefonica. Estoy a tu disposición para poder resolver todas tus dudas
                          o consultas. Coméntame en que horario podría llamarte por teléfono.
                        </p>
                        <div className="flex justify-end items-center gap-1 mt-1">
                          <span className="text-xs text-gray-600">2024/05/30 04:06 PM</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#00bc3a]"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                            <polyline points="20 12 9 23 4 18"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message input area */}
                  <div className="flex border-t border-gray-200 bg-white p-2">
                    {/* Vertical icon column */}
                    <div className="flex flex-col gap-2 mr-2">
                      {/* Templates button */}
                      <div className="group relative">
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-[#00bc3a] rounded-md border border-gray-300 shadow-sm transition-colors"
                          onClick={() => setIsWhatsAppTemplateModalOpen(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </button>
                        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          Plantillas
                        </div>
                      </div>

                      {/* Add document button */}
                      <div className="group relative">
                        <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-[#00bc3a] rounded-md border border-gray-300 shadow-sm transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                        </button>
                        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          Agregar documento
                        </div>
                      </div>

                      {/* Add image button */}
                      <div className="group relative">
                        <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-[#00bc3a] rounded-md border border-gray-300 shadow-sm transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                        </button>
                        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          Agregar imagen
                        </div>
                      </div>
                    </div>

                    {/* Text area and buttons */}
                    <div className="flex-1 flex items-center">
                      <textarea
                        placeholder="Escribe un mensaje..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#128C7E] resize-none"
                        style={{ height: "100%", minHeight: "60px" }}
                        value={whatsappMessageInput}
                        onChange={handleWhatsappMessageInputChange}
                      ></textarea>

                      {/* Send and clear buttons */}
                      <div className="flex flex-col ml-2 gap-2">
                        <button className="w-8 h-8 flex items-center justify-center bg-[#00bc3a] hover:bg-[#00C853] text-white rounded-md border border-[#00C853] shadow-sm transition-colors">
                          <Send className="h-4 w-4" />
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md border border-gray-300 shadow-sm transition-colors"
                          onClick={() => setWhatsappMessageInput("")}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "calendario" && (
          <div className="mt-6 mb-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header with legend */}
              <button
                onClick={() => setIsCalendarioOpen(!isCalendarioOpen)}
                className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-[#6419e6] font-medium hover:underline"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                      <Calendar className="h-4 w-4" />
                    </div>
<span className="text-base text-[#6419e6] font-semibold">Cronograma de clases del docente</span>
                  </div>
                  {/* Legend */}
                  <div className="flex items-center gap-2 ml-4">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700">Día de clase</span>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-[#6419e6] transition-transform duration-200 ${
                    isCalendarioOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Collapsible content */}
              {isCalendarioOpen && (
<div className="p-6">
  {/* Month selector */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="text-lg font-semibold text-gray-800 min-w-[150px] text-center">
                      {monthNames[currentCalendarMonth.getMonth()]} {currentCalendarMonth.getFullYear()}
                    </span>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="w-full">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-2">
                      {(() => {
                        const { daysInMonth, startingDay } = getDaysInMonth(currentCalendarMonth)
                        const days = []

                        // Empty cells for days before the month starts
                        for (let i = 0; i < startingDay; i++) {
                          days.push(<div key={`empty-${i}`} className="h-12"></div>)
                        }

                        // Days of the month
                        for (let day = 1; day <= daysInMonth; day++) {
                          const date = new Date(
                            currentCalendarMonth.getFullYear(),
                            currentCalendarMonth.getMonth(),
                            day,
                          )
                          const classInfo = getClassInfo(date)
                          const isClass = classInfo !== undefined
                          const isSaturday = date.getDay() === 6

                          if (isClass && classInfo) {
                            days.push(
                              <TooltipProvider key={day} delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      className="h-12 flex items-center justify-center text-sm rounded-full bg-green-500 text-white font-semibold cursor-pointer hover:bg-green-600 transition-colors"
                                    >
                                      {day}
                                    </div>
                                  </TooltipTrigger>
<TooltipContent side="top" className="bg-white border border-gray-200 shadow-lg p-3 max-w-xs">
                                            <div className="space-y-1">
                                              <p className="text-xs text-gray-600">Horario: {classInfo.horario} (hora Peru)</p>
                                            </div>
                                          </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )
                          } else {
                            days.push(
                              <div
                                key={day}
                                className={`h-12 flex items-center justify-center text-sm rounded-full ${
                                  isSaturday ? "text-red-500" : ""
                                }`}
                              >
                                {day}
                              </div>,
                            )
                          }
                        }

                        return days
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "flujo" && (
          <div className="mt-6 mb-6">
            <Card className="border-0 shadow-md overflow-hidden">
              {/* Header */}
              <div className="bg-[#e3f2fd] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#6419e6] text-white p-2 rounded-full">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#6419e6]">Docente: Carlos Rodriguez</h3>
                    <p className="text-sm text-gray-600">Programa: Gestion de Proyectos - 3 cursos - 24 sesiones totales</p>
                  </div>
                </div>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => setIsAddFlujoModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>

              {/* Table */}
              <div className="overflow-visible relative z-20">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Flujo</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Categoria</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-600">Estado</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-600">Global</th>
                      {Object.values(flujoGlobalState).some(v => !v) && (
                        <th className="px-4 py-3 text-center font-medium text-gray-600">Cursos</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-800">Confirmacion de Sesion</p>
                          <p className="text-xs text-gray-500">Asegurar confirmacion 24h antes</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                          Ejecucion de Curso
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          En ejecución
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={flujoGlobalState[1]}
                          onChange={() => toggleFlujoGlobal(1)}
                          className="rounded border-gray-300 text-[#6419e6] h-5 w-5 cursor-pointer" 
                        />
                      </td>
                      {Object.values(flujoGlobalState).some(v => !v) && (
                        <td className="px-4 py-3">
                          {!flujoGlobalState[1] ? (
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => {
                                  setCurrentFlujoForCursos(1)
                                  setTempCursosSelection([...flujoCursosSelection[1]])
                                  setIsSelectCursosModalOpen(true)
                                }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  flujoCursosSelection[1].length > 0
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                    : "bg-[#6419e6] text-white hover:bg-[#5215b8]"
                                }`}
                              >
                                {flujoCursosSelection[1].length > 0 ? "Editar" : "Seleccionar cursos"}
                              </button>
                              {flujoCursosSelection[1].length > 0 && (
                                <div className="flex flex-col gap-1">
                                  {flujoCursosSelection[1].map(cursoId => {
                                    const curso = cursosDisponibles.find(c => c.id === cursoId)
                                    return curso ? (
                                      <span key={cursoId} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        {curso.nombre}
                                      </span>
                                    ) : null
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      )}
                    </tr>
                    {/* Row 2 */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-800">Recordatorio Subida Notas</p>
                          <p className="text-xs text-gray-500">Recordar subir notas post-sesion</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                          Ejecucion de Curso
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          En ejecución
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={flujoGlobalState[2]}
                          onChange={() => toggleFlujoGlobal(2)}
                          className="rounded border-gray-300 text-[#6419e6] h-5 w-5 cursor-pointer" 
                        />
                      </td>
                      {Object.values(flujoGlobalState).some(v => !v) && (
                        <td className="px-4 py-3 text-center">
                          {!flujoGlobalState[2] ? (
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => {
                                  setCurrentFlujoForCursos(2)
                                  setTempCursosSelection([...flujoCursosSelection[2]])
                                  setIsSelectCursosModalOpen(true)
                                }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  flujoCursosSelection[2].length > 0
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                    : "bg-[#6419e6] text-white hover:bg-[#5215b8]"
                                }`}
                              >
                                {flujoCursosSelection[2].length > 0 ? "Editar" : "Seleccionar cursos"}
                              </button>
                              {flujoCursosSelection[2].length > 0 && (
                                <div className="flex flex-col gap-1">
                                  {flujoCursosSelection[2].map(cursoId => {
                                    const curso = cursosDisponibles.find(c => c.id === cursoId)
                                    return curso ? (
                                      <span key={cursoId} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        {curso.nombre}
                                      </span>
                                    ) : null
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      )}
                    </tr>
                    {/* Row 3 */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-800">Reporte Semanal</p>
                          <p className="text-xs text-gray-500">Envio cada lunes 9am</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          General
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                          INACTIVO
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input 
                          type="checkbox" 
                          checked={flujoGlobalState[3]} 
                          onChange={() => toggleFlujoGlobal(3)}
                          className="rounded border-gray-300 text-[#6419e6] h-5 w-5 cursor-pointer" 
                        />
                      </td>
                      {Object.values(flujoGlobalState).some(v => !v) && (
                        <td className="px-4 py-3">
                          {!flujoGlobalState[3] ? (
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => {
                                  setCurrentFlujoForCursos(3)
                                  setTempCursosSelection([...flujoCursosSelection[3]])
                                  setIsSelectCursosModalOpen(true)
                                }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  flujoCursosSelection[3].length > 0
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                    : "bg-[#6419e6] text-white hover:bg-[#5215b8]"
                                }`}
                              >
                                {flujoCursosSelection[3].length > 0 ? "Editar" : "Seleccionar cursos"}
                              </button>
                              {flujoCursosSelection[3].length > 0 && (
                                <div className="flex flex-col gap-1">
                                  {flujoCursosSelection[3].map(cursoId => {
                                    const curso = cursosDisponibles.find(c => c.id === cursoId)
                                    return curso ? (
                                      <span key={cursoId} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        {curso.nombre}
                                      </span>
                                    ) : null
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      )}
                    </tr>
                    {/* Row 4 */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-800">Envio Material Didactico</p>
                          <p className="text-xs text-gray-500">7 dias antes sesion inicial</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                          Ejecucion de Curso
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          En ejecución
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={flujoGlobalState[4]}
                          onChange={() => toggleFlujoGlobal(4)}
                          className="rounded border-gray-300 text-[#6419e6] h-5 w-5 cursor-pointer" 
                        />
                      </td>
                      {Object.values(flujoGlobalState).some(v => !v) && (
                        <td className="px-4 py-3">
                          {!flujoGlobalState[4] ? (
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => {
                                  setCurrentFlujoForCursos(4)
                                  setTempCursosSelection([...flujoCursosSelection[4]])
                                  setIsSelectCursosModalOpen(true)
                                }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  flujoCursosSelection[4].length > 0
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                    : "bg-[#6419e6] text-white hover:bg-[#5215b8]"
                                }`}
                              >
                                {flujoCursosSelection[4].length > 0 ? "Editar" : "Seleccionar cursos"}
                              </button>
                              {flujoCursosSelection[4].length > 0 && (
                                <div className="flex flex-col gap-1">
                                  {flujoCursosSelection[4].map(cursoId => {
                                    const curso = cursosDisponibles.find(c => c.id === cursoId)
                                    return curso ? (
                                      <span key={cursoId} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        {curso.nombre}
                                      </span>
                                    ) : null
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Note */}
              <div className="p-4 bg-yellow-50 border-t border-yellow-100 relative z-10">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500 text-lg">&#128161;</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Nota:</span> Los flujos de categoria "GENERAL" son flujos personalizables segun necesidad. Los de "EJECUCION DE CURSO" se aplican segun su referencia temporal (Inicial/Intermedia/Final/Todas).
                  </p>
                </div>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Pagina</span>
                  <Input
                    type="number"
                    defaultValue={1}
                    className="w-12 h-8 text-center text-sm"
                    min={1}
                  />
                  <span className="text-sm text-gray-600">de 1</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">10</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">items por pagina</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" disabled>
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" disabled>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-600 mx-2">1 - 4 de 4 items</span>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" disabled>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" disabled>
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

{/* Modal para Seleccionar Cursos */}
          {isSelectCursosModalOpen && currentFlujoForCursos !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" onClick={() => setIsSelectCursosModalOpen(false)} />
              
              {/* Modal Content */}
              <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#6419e6] to-[#8b5cf6]">
                  <h3 className="text-lg font-semibold text-white">Seleccionar Cursos</h3>
                  <button
                    onClick={() => setIsSelectCursosModalOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 max-h-[400px] overflow-y-auto">
                  <p className="text-sm text-gray-600 mb-4">Seleccione los cursos a los que desea aplicar este flujo:</p>
                  <div className="flex flex-col gap-2">
                    {cursosDisponibles.map(curso => (
                      <label 
                        key={curso.id} 
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          tempCursosSelection.includes(curso.id)
                            ? "bg-purple-50 border-purple-300"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={tempCursosSelection.includes(curso.id)}
                          onChange={() => {
                            if (tempCursosSelection.includes(curso.id)) {
                              setTempCursosSelection(tempCursosSelection.filter(id => id !== curso.id))
                            } else {
                              setTempCursosSelection([...tempCursosSelection, curso.id])
                            }
                          }}
                          className="rounded border-gray-300 text-[#6419e6] h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">{curso.nombre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                  <button
                    onClick={() => setIsSelectCursosModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setFlujoCursosSelection(prev => ({
                        ...prev,
                        [currentFlujoForCursos]: tempCursosSelection
                      }))
                      setIsSelectCursosModalOpen(false)
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#6419e6] rounded-lg hover:bg-[#5215b8]"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Agregar Flujos */}
          {isAddFlujoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsAddFlujoModalOpen(false)} />
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-[#7c3aed] px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Agregar Flujos</h2>
                  <p className="text-white/80 text-sm">Docente: Carlos Rodriguez</p>
                </div>
                <button
                  onClick={() => setIsAddFlujoModalOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {getUnassignedFlujos().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <GitBranch className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No hay flujos disponibles para agregar.</p>
                    <p className="text-sm">Todos los flujos ya estan asignados a este docente.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getUnassignedFlujos().map((flujo) => (
                      <div
                        key={flujo.id}
                        onClick={() => toggleFlujoSelectionModal(flujo.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedFlujosToAdd.includes(flujo.id)
                            ? "border-[#6419e6] bg-[#f3e8ff]"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedFlujosToAdd.includes(flujo.id)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => toggleFlujoSelectionModal(flujo.id)}
                            className="h-4 w-4 mt-1 rounded border-gray-300 text-[#6419e6] focus:ring-[#6419e6]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{flujo.nombre}</h4>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  flujo.estado === "En ejecución" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                              >
                                {flujo.estado}
                              </span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">{flujo.descripcion}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                                  flujo.categoria === "Ejecucion de Curso"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-gray-50 text-gray-700 border-gray-200"
                                }`}
                              >
                                {flujo.categoria}
                              </span>
                              <span className="text-xs text-gray-500">{flujo.actividades} actividades</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsAddFlujoModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddFlujos}
                  disabled={selectedFlujosToAdd.length === 0}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFlujosToAdd.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#6419e6] text-white hover:bg-[#5315c4]"
                  }`}
                >
                  Agregar {selectedFlujosToAdd.length > 0 && `(${selectedFlujosToAdd.length})`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AudioPlayerModal
        isOpen={audioModal.isOpen}
        onClose={closeAudioModal}
        audioUrl={audioModal.audioUrl}
        callInfo={audioModal.callInfo}
      />

      <EmailViewerModal
        isOpen={isEmailViewerOpen}
        onClose={() => setIsEmailViewerOpen(false)}
        emailData={selectedEmail}
      />

      <WhatsAppTemplateModal
        isOpen={isWhatsAppTemplateModalOpen}
        onClose={() => setIsWhatsAppTemplateModalOpen(false)}
        onSelectTemplate={handleSelectWhatsAppTemplate}
      />

      <WhatsAppVerificationModal
        isOpen={isWhatsAppVerificationOpen}
        onClose={() => {
          setIsWhatsAppVerificationOpen(false)
          setWhatsAppVerificationSource(null)
        }}
        onCorrect={() => {
          // Si viene desde Envio Material Sesión 1 Subactividad 1
          if (whatsAppVerificationSource === "1-Envio Material didáctico-1") {
            setSubactivityStates(prev => ({
              ...prev,
              "1-Envio Material didáctico-1": {
                ...prev["1-Envio Material didáctico-1"],
                validarDisabled: true
              }
            }))
            setIsWhatsAppVerificationOpen(false)
            setWhatsAppVerificationSource(null)
          }
          setWhatsAppVerificationBlocked(true)
        }}
        onIncorrect={(error) => {
          // Si viene desde Envio Material Sesión 2 Subactividad 1
          if (whatsAppVerificationSource === "2-Envio Material didáctico-1") {
            // Actualizar Subactividad 1 a "no respondio" con el comentario
            setSubactivityStates(prev => ({
              ...prev,
              "2-Envio Material didáctico-1": {
                ...prev["2-Envio Material didáctico-1"],
                estado: "ejecutada",
                comentario: error,
                etiquetaAdicional: { texto: "No respondió", color: "yellow" },
                iniciarDisabled: true,
                validarDisabled: true
              },
              // Activar botones de iniciar para Sub 2, 3, 4
              "2-Envio Material didáctico-2": {
                ...prev["2-Envio Material didáctico-2"],
                estado: "por_ejecutar",
                iniciarDisabled: false,
                validarDisabled: true,
                colorPorEjecutar: "blue"
              },
              "2-Envio Material didáctico-3": {
                ...prev["2-Envio Material didáctico-3"],
                estado: "por_ejecutar",
                iniciarDisabled: false,
                validarDisabled: true,
                colorPorEjecutar: "blue"
              },
              "2-Envio Material didáctico-4": {
                ...prev["2-Envio Material didáctico-4"],
                estado: "por_ejecutar",
                iniciarDisabled: false,
                validarDisabled: true,
                colorPorEjecutar: "blue"
              }
            }))
            setIsWhatsAppVerificationOpen(false)
            setWhatsAppVerificationSource(null)
          } else {
            // Comportamiento normal para otros casos
            setWhatsAppVerificationError(error)
            setWhatsAppVerificationBlocked(true)
          }
        }}
        doctoName="Carlos Rodriguez"
        date="24/04/2025"
        hideResponse={whatsAppVerificationSource === "2-Envio Material didáctico-1"}
      />

      <EmailVerificationModal
        isOpen={isEmailVerificationOpen}
        onClose={() => setIsEmailVerificationOpen(false)}
        onCorrect={() => {
          if (emailVerificationSource) {
            setSubactivityStates(prev => ({
              ...prev,
              [emailVerificationSource]: {
                ...prev[emailVerificationSource],
                validarDisabled: true
              }
            }))
            setIsEmailVerificationOpen(false)
            setEmailVerificationSource(null)
          } else {
            setEmailVerificationBlocked(true)
          }
        }}
        onIncorrect={(error) => {
          setEmailVerificationError(error)
          setEmailVerificationBlocked(true)
        }}
        doctoName="Carlos Rodriguez"
        date="24/04/2025"
      />

      <CallVerificationModal
        isOpen={isCallVerificationOpen}
        onClose={() => setIsCallVerificationOpen(false)}
        onCorrect={() => setCallVerificationBlocked(true)}
        onIncorrect={(error) => {
          setCallVerificationError(error)
          setCallVerificationBlocked(true)
        }}
        doctoName="Carlos Rodriguez"
        date="24/04/2025"
      />

      <StartSubActivityConfirmModal
        isOpen={isStartSubActivityModalOpen}
        onClose={() => setIsStartSubActivityModalOpen(false)}
        onConfirm={() => {
          if (selectedSubActivityToStart) {
            const { activity, subactivity, sesionNum } = selectedSubActivityToStart
            const stateKey = `${sesionNum}-${activity}-${subactivity}`
            
            // Actualizar el estado de la subactividad a "ejecutada"
            setSubactivityStates(prev => ({
              ...prev,
              [stateKey]: {
                ...prev[stateKey],
                estado: "ejecutada",
                iniciarDisabled: true
              }
            }))
            
            // Si es Sesión 3, avanzar al siguiente paso
            if (sesionNum === 3 && subactivity < 4) {
              const nextSub = subactivity + 1
              const nextStateKey = `${sesionNum}-${activity}-${nextSub}`
              
              setNextSubActivityByActivity(prev => ({
                ...prev,
                [`${sesionNum}-${activity}`]: nextSub
              }))
              
              // Activar la siguiente subactividad
              setSubactivityStates(prev => ({
                ...prev,
                [nextStateKey]: {
                  ...prev[nextStateKey],
                  iniciarDisabled: false,
                  validarDisabled: true
                }
              }))
            }
          }
        }}
        activityName={selectedSubActivityToStart?.activity}
        subActivityNumber={selectedSubActivityToStart?.subactivity}
        subActivityFullName={selectedSubActivityToStart?.fullName}
      />

      {/* Resolver Modal */}
      <Dialog open={isResolverModalOpen} onOpenChange={setIsResolverModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-600">RESOLVER INTERACCIÓN MANUAL</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Estado Options */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Estado de la Interacción</Label>
              <RadioGroup value={resolverEstado} onValueChange={setResolverEstado}>
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="confirmo" id="confirmo" />
                  <Label htmlFor="confirmo" className="flex-1 cursor-pointer text-sm">
                    <span className="font-medium">Confirmó</span>
                    <span className="text-gray-500"> - El docente aceptó la solicitud</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="no-confirmo" id="no-confirmo" />
                  <Label htmlFor="no-confirmo" className="flex-1 cursor-pointer text-sm">
                    <span className="font-medium">No confirmó</span>
                    <span className="text-gray-500"> - El docente rechazó la solicitud</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="no-respondio" id="no-respondio" />
                  <Label htmlFor="no-respondio" className="flex-1 cursor-pointer text-sm">
                    <span className="font-medium">No respondió</span>
                    <span className="text-gray-500"> - No se pudo contactar con el docente</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Canal de Comunicación */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Medio de Comunicación</Label>
              <RadioGroup value={resolverCanal} onValueChange={setResolverCanal} className="flex flex-row gap-3">
                <div className="flex-1 flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp" className="cursor-pointer flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span className="font-medium">WhatsApp</span>
                  </Label>
                </div>
                <div className="flex-1 flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="llamada" id="llamada" />
                  <Label htmlFor="llamada" className="cursor-pointer flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Llamada</span>
                  </Label>
                </div>
                <div className="flex-1 flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="correo" id="correo" />
                  <Label htmlFor="correo" className="cursor-pointer flex items-center gap-2">
                    <Mail className="w-4 h-4 text-red-600" />
                    <span className="font-medium">Correo</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Comentario */}
            <div className="space-y-3">
              <Label htmlFor="comentario" className="text-base font-semibold">
                Ingrese un comentario
              </Label>
              <Textarea
                id="comentario"
                value={resolverComentario}
                onChange={(e) => setResolverComentario(e.target.value)}
                placeholder="Escriba un comentario sobre la interacción..."
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Aceptar Button */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsResolverModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  if (currentResolvingActivity) {
                    // Crear la clave única para acceder al estado de la subactividad 4
                    const stateKey = `${currentResolvingActivity.sesion}-${currentResolvingActivity.actividad}-4`
                    
                    // Determinar el color y texto de la etiqueta según el estado
                    let etiquetaColor: "blue" | "green" | "red" | "yellow" = "green"
                    let etiquetaTexto = "Confirmo"
                    
                    if (resolverEstado === "confirmo") {
                      etiquetaColor = "green"
                      etiquetaTexto = "Confirmo"
                    } else if (resolverEstado === "no-confirmo") {
                      etiquetaColor = "red"
                      etiquetaTexto = "No confirmo"
                    } else if (resolverEstado === "no-respondio") {
                      etiquetaColor = "yellow"
                      etiquetaTexto = "No respondio"
                    }
                    
                    // Actualizar el estado de la subactividad
                    setSubactivityStates(prev => ({
                      ...prev,
                      [stateKey]: {
                        ...prev[stateKey],
                        estado: "ejecutada",
                        iniciarDisabled: true,
                        comentario: resolverComentario,
                        canal: resolverCanal as "whatsapp" | "llamada" | "correo",
                        etiquetaAdicional: {
                          texto: etiquetaTexto,
                          color: etiquetaColor
                        }
                      }
                    }))
                  }
                  
                  // Cerrar el modal y limpiar los estados
                  setIsResolverModalOpen(false)
                  setResolverEstado("confirmo")
                  setResolverCanal("whatsapp")
                  setResolverComentario("")
                  setCurrentResolvingActivity(null)
                }}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Courses Modal */}
      {isCursosModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cursos del Docente</h3>
                <p className="text-sm text-purple-600">{docenteData.centroCosto}</p>
              </div>
              <button
                onClick={() => setIsCursosModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Curso</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Horario</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Estudiantes</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {cursosCentroCosto.map((curso) => (
                    <tr key={curso.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <p className="text-sm font-medium text-gray-900">{curso.nombre}</p>
                      </td>
                      <td className="py-3 px-2">
                        <p className="text-sm text-gray-600">{curso.horario}</p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <p className="text-sm text-gray-700">{curso.estudiantes}</p>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {curso.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setIsCursosModalOpen(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        
      </div>

      {/* Árbol de Ocurrencias Modal */}
      <Dialog open={isArbolOcurrenciasOpen} onOpenChange={(open) => {
        setIsArbolOcurrenciasOpen(open)
        if (!open) {
          setSelectedArbolCard(null)
          setSelectedOcurrenciaOption(null)
        }
      }}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-hidden p-0 [&>button]:hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-green-600">ÁRBOL DE OCURRENCIAS</h2>
            <button 
              onClick={() => {
                setIsArbolOcurrenciasOpen(false)
                setSelectedArbolCard(null)
                setSelectedOcurrenciaOption(null)
              }}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          {!selectedArbolCard ? (
            /* Grid of colored cards */
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Confirmación de Sesión - Green */}
                <button
                  onClick={() => handleSelectArbolCard("Confirmación de Sesión", "green", <Check className="h-5 w-5" />)}
                  className="flex flex-col items-center justify-center p-6 rounded-lg bg-green-200 hover:bg-green-300 text-green-800 h-[120px] transition-all"
                >
                  <Check className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium text-center">Confirmación de Sesión</span>
                </button>

                {/* Recordatorio Subida Notas - Pink/Red */}
                <button
                  onClick={() => handleSelectArbolCard("Recordatorio Subida Notas", "red", <ClipboardList className="h-5 w-5" />)}
                  className="flex flex-col items-center justify-center p-6 rounded-lg bg-red-200 hover:bg-red-300 text-red-800 h-[120px] transition-all"
                >
                  <ClipboardList className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium text-center">Recordatorio Subida Notas</span>
                </button>

                {/* Envío Material Didáctico - Light Blue */}
                <button
                  onClick={() => handleSelectArbolCard("Envío Material Didáctico", "blue", <BookOpen className="h-5 w-5" />)}
                  className="flex flex-col items-center justify-center p-6 rounded-lg bg-blue-200 hover:bg-blue-300 text-blue-800 h-[120px] transition-all"
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium text-center">Envío Material Didáctico</span>
                </button>

                {/* Reporte Semanal - Yellow */}
                <button
                  onClick={() => handleSelectArbolCard("Reporte Semanal", "yellow", <FileText className="h-5 w-5" />)}
                  className="flex flex-col items-center justify-center p-6 rounded-lg bg-yellow-200 hover:bg-yellow-300 text-yellow-800 h-[120px] transition-all"
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium text-center">Reporte Semanal</span>
                </button>
              </div>
            </div>
          ) : !selectedOcurrenciaOption ? (
            /* Detail view with occurrence options - State 2 */
            <div className="p-4">
              {/* Colored header bar with back button - with margins and rounded */}
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-4 ${
                selectedArbolCard.color === "green" ? "bg-green-500" :
                selectedArbolCard.color === "red" ? "bg-red-400" :
                selectedArbolCard.color === "blue" ? "bg-blue-500" :
                "bg-yellow-500"
              }`}>
                <button 
                  onClick={handleBackToArbolGrid}
                  className="text-white hover:bg-white/20 p-1 rounded"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2 text-white">
                  {selectedArbolCard.icon}
                  <span className="font-medium">{selectedArbolCard.nombre}</span>
                </div>
              </div>

              {/* Occurrence options list */}
              <div className="space-y-3">
                {/* Option 1 - Aceptó invitación (Positivo) */}
                <div 
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelectOcurrenciaOption("Aceptó invitación", "Positivo", "Docente acepta dictar el curso")}
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" readOnly />
                    <span className="text-sm text-gray-700 flex-1">
                      Aceptó invitación - Docente acepta dictar el curso
                    </span>
                    <Info className="h-4 w-4 text-blue-500" />
                  </div>
                </div>

                {/* Option 2 - Rechazó (Negativo) */}
                <div 
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelectOcurrenciaOption("Rechazó", "Negativo", "No puede dictar")}
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" readOnly />
                    <span className="text-sm text-gray-700 flex-1">
                      Rechazó - No puede dictar
                    </span>
                    <Info className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Form view - State 3 */
            <div className="p-4">
              {/* Back button and title */}
              <div className="flex items-center gap-3 mb-2">
                <button 
                  onClick={handleBackToOcurrenciaOptions}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-medium text-purple-700">{selectedOcurrenciaOption.titulo}</h3>
              </div>
              
              {/* Comment textarea */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">Ingrese un comentario</label>
                <Textarea
                  placeholder="Ingrese un comentario"
                  value={comentarioOcurrencia}
                  onChange={(e) => setComentarioOcurrencia(e.target.value)}
                  className="min-h-[80px] resize-none"
                  maxLength={500}
                />
                <div className="text-right text-xs text-gray-400 mt-1">{comentarioOcurrencia.length}/500</div>
              </div>

              {/* Row 1: Fecha siguiente actividad & Medio de comunicación */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Fecha siguiente actividad</label>
                  <div className="flex gap-2">
                    <Input type="date" className="flex-1" />
                    <Input type="time" className="w-24" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Medio de la comunicación</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMedioComunicacion(medioComunicacion === "Whatsapp" ? null : "Whatsapp")}
                      className={`flex-1 px-3 py-2 text-xs rounded-md border transition-colors flex items-center justify-center gap-1.5 ${
                        medioComunicacion === "Whatsapp"
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Whatsapp
                    </button>
                    <button
                      type="button"
                      onClick={() => setMedioComunicacion(medioComunicacion === "Llamada" ? null : "Llamada")}
                      className={`flex-1 px-3 py-2 text-xs rounded-md border transition-colors flex items-center justify-center gap-1.5 ${
                        medioComunicacion === "Llamada"
                          ? "bg-blue-100 border-blue-500 text-blue-700"
                          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Llamada
                    </button>
                    <button
                      type="button"
                      onClick={() => setMedioComunicacion(medioComunicacion === "Correo" ? null : "Correo")}
                      className={`flex-1 px-3 py-2 text-xs rounded-md border transition-colors flex items-center justify-center gap-1.5 ${
                        medioComunicacion === "Correo"
                          ? "bg-purple-100 border-purple-500 text-purple-700"
                          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Correo
                    </button>
                  </div>
                </div>
              </div>
              {/* Submit button */}
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={handleSubmitOcurrencia}
              >
                Aceptar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Marcar Ocurrencia Modal */}
      <Dialog open={isMarcarOcurrenciaOpen} onOpenChange={setIsMarcarOcurrenciaOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden [&>button]:hidden">
          {/* Purple Header */}
          <div className="bg-[#7c3aed] px-6 py-4 flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg">
              Marcar Ocurrencia: {selectedOcurrencia?.tipo === "Positivo" ? "Aceptó invitación" : "Rechazó"}
            </h2>
            <button 
              onClick={() => setIsMarcarOcurrenciaOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex gap-2">
                <span className="font-medium text-sm">Actividad:</span>
                <span className="text-sm">{selectedOcurrencia?.actividad}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Tipo:</span>
                <Badge className={`text-xs ${selectedOcurrencia?.tipo === "Positivo" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {selectedOcurrencia?.tipo}
                </Badge>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-sm">Descripción:</span>
                <span className="text-sm">{selectedOcurrencia?.descripcion}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Comentario</label>
              <Textarea
                placeholder="Ingresa un comentario sobre esta ocurrencia..."
                value={comentarioOcurrencia}
                onChange={(e) => setComentarioOcurrencia(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Fecha de Siguiente Contacto (Opcional)
              </label>
              <Input
                type="datetime-local"
                value={fechaSiguienteContacto}
                onChange={(e) => setFechaSiguienteContacto(e.target.value)}
              />
            </div>

            <p className="text-sm text-gray-600">
              La siguiente actividad es manual: <strong>Entrega de Materiales & Contrato</strong>. Puedes programar una fecha para el siguiente contacto.
            </p>

            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-sm font-medium text-[#7c3aed]">Acciones al marcar:</p>
              <p className="text-sm text-[#7c3aed] mt-1">{">"} Continuar a siguiente actividad en secuencia</p>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsMarcarOcurrenciaOpen(false)}>
                Cancelar
              </Button>
              <Button 
                className="bg-[#7c3aed] hover:bg-purple-700"
                onClick={() => {
                  setIsMarcarOcurrenciaOpen(false)
                  setIsArbolOcurrenciasOpen(false)
                  setComentarioOcurrencia("")
                  setFechaSiguienteContacto("")
                }}
              >
                Marcar Ocurrencia
              </Button>
            </div>
          </div>
        </DialogContent>
</Dialog>

      {/* Modal Validar Flujo */}
      <Dialog open={isValidarFlujoOpen} onOpenChange={setIsValidarFlujoOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden [&>button]:hidden">
          <div className="bg-[#6419e6] px-6 py-4 flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg">Resolver</h2>
            <button
              onClick={() => setIsValidarFlujoOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">Selecciona las actividades que deseas mantener activas en el flujo:</p>
            <div className="space-y-3">
              {["Confirmación de sesión", "Recordatorio Subida de notas", "Envio Material didáctico", "Reporte Semanal"].map((actividad) => (
                <label key={actividad} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={validarFlujoSeleccionadas.includes(actividad)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValidarFlujoSeleccionadas([...validarFlujoSeleccionadas, actividad])
                      } else {
                        setValidarFlujoSeleccionadas(validarFlujoSeleccionadas.filter((a) => a !== actividad))
                      }
                    }}
                    className="w-4 h-4 text-[#6419e6] rounded border-gray-300 focus:ring-[#6419e6]"
                  />
                  <span className="text-sm font-medium text-gray-700">{actividad}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsValidarFlujoOpen(false)} className="bg-transparent">
                Cancelar
              </Button>
              <Button
                className="bg-[#6419e6] hover:bg-[#5315c4] text-white"
                onClick={() => {
                  console.log("Actividades validadas:", validarFlujoSeleccionadas)
                  setIsValidarFlujoOpen(false)
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Agregar Actividades */}
      <Dialog open={isAgregarActividadesOpen} onOpenChange={setIsAgregarActividadesOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden [&>button]:hidden">
          <div className="bg-[#6419e6] px-6 py-4 flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg">Agregar Actividades</h2>
            <button
              onClick={() => setIsAgregarActividadesOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">Selecciona las actividades y las sesiones en las que deseas agregarlas:</p>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {["Reporte semanal", "Encuesta de Satisfacción", "Recordatorio Webinar", "Recordatorio Proyecto de Aplicación"].map((actividad) => {
                const isExpanded = expandedAgregarActividad === actividad
                const semanasSeleccionadas = actividadSemanasSeleccionadas[actividad] || []
                const tieneSemanasSeleccionadas = semanasSeleccionadas.length > 0
                
                return (
                  <div key={actividad} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 ${tieneSemanasSeleccionadas ? 'bg-purple-50' : ''}`}
                      onClick={() => setExpandedAgregarActividad(isExpanded ? null : actividad)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={tieneSemanasSeleccionadas}
                          readOnly
                          className="w-4 h-4 text-[#6419e6] rounded border-gray-300 focus:ring-[#6419e6]"
                        />
                        <span className="text-sm font-medium text-gray-700">{actividad}</span>
                        {tieneSemanasSeleccionadas && (
                          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                            {semanasSeleccionadas.length} sesión{semanasSeleccionadas.length > 1 ? 'es' : ''}
                          </span>
                        )}
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {isExpanded && (
                      <div className="border-t border-gray-200 bg-gray-50 p-3 space-y-2">
                        <p className="text-xs text-gray-500 mb-2">Selecciona las sesiones:</p>
{sesionesDelCurso.map((sesion) => (
                            <label
                              key={sesion.id}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-white cursor-pointer border border-transparent hover:border-gray-200"
                            >
                              <input
                                type="checkbox"
                                checked={semanasSeleccionadas.includes(sesion.id)}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  setActividadSemanasSeleccionadas(prev => {
                                    const current = prev[actividad] || []
                                    if (e.target.checked) {
                                      return { ...prev, [actividad]: [...current, sesion.id] }
                                    } else {
                                      return { ...prev, [actividad]: current.filter(s => s !== sesion.id) }
                                    }
                                  })
                                }}
                                className="w-4 h-4 text-[#6419e6] rounded border-gray-300 focus:ring-[#6419e6]"
                              />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">{sesion.nombre}</span>
                                <span className="text-xs text-gray-500">{sesion.fecha}</span>
                              </div>
                            </label>
                          ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => {
                setIsAgregarActividadesOpen(false)
                setExpandedAgregarActividad(null)
                setActividadSemanasSeleccionadas({})
              }} className="bg-transparent">
                Cancelar
              </Button>
              <Button
                className="bg-[#6419e6] hover:bg-[#5315c4] text-white"
                onClick={() => {
                  console.log("Actividades agregadas con semanas:", actividadSemanasSeleccionadas)
                  setIsAgregarActividadesOpen(false)
                  setExpandedAgregarActividad(null)
                  setActividadSemanasSeleccionadas({})
                }}
              >
                Agregar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
      </div>
    </AgendaContainer>
  )
}
