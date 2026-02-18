"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  MessageSquare,
  Mail,
  Phone,
  MessageCircle,
  Bell,
  Clock,
  Calendar,
  FileText,
  Users,
  Trash2,
  X,
  Lightbulb,
  Info,
  Bot,
  Plus,
  AlertTriangle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ConfigurarInicioFlujoPage() {
  const router = useRouter()
  const [isInfoBasicaExpanded, setIsInfoBasicaExpanded] = useState(true)
  const [isDisparadorExpanded, setIsDisparadorExpanded] = useState(true)
  const [contactosExpanded, setContactosExpanded] = useState(true)
  const [tipoActividad, setTipoActividad] = useState("automatica")
  const [canales, setCanales] = useState<string>("email")
  const [tipoDisparador, setTipoDisparador] = useState("primera-actividad")
  const [tiempoOcurrencia, setTiempoOcurrencia] = useState("6")
  const [unidadTiempo, setUnidadTiempo] = useState("horas")
  const [fechaFija, setFechaFija] = useState("")
  const [horaFija, setHoraFija] = useState("")
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [esFinActividad, setEsFinActividad] = useState(true)
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isPanelOpen])

  const [ocurrenciaNombre, setOcurrenciaNombre] = useState("")
  const [ocurrenciaDescripcion, setOcurrenciaDescripcion] = useState("")
  const [ocurrenciaTipo, setOcurrenciaTipo] = useState("positivo")
  const [siguienteActividad, setSiguienteActividad] = useState("act4")
  const [tipoMarcado, setTipoMarcado] = useState("manual")

  const [isIAConfigExpanded, setIsIAConfigExpanded] = useState(false)
  const [iaPrompt, setIaPrompt] = useState(
    "Detecta mensajes donde el docente confirma explícitamente su asistencia a la sesión. Busca palabras como: sí, confirmo, estaré, asistiré, ok, de acuerdo, nos vemos, ahí estaré.",
  )
  const [iaUmbral, setIaUmbral] = useState("alta") // Default to alta for automatic marking
  const [ejemplosEntrenamiento, setEjemplosEntrenamiento] = useState([
    { mensaje: "Sí, estaré ahí", clasificacion: "Confirmó" },
    { mensaje: "Ok, nos vemos mañana", clasificacion: "Confirmó" },
    { mensaje: "Confirmado ✓", clasificacion: "Confirmó" },
    { mensaje: "Asistiré sin falta", clasificacion: "Confirmó" },
    { mensaje: "De acuerdo, ahí estaré", clasificacion: "Confirmó" },
  ])

  const eliminarEjemplo = (index: number) => {
    setEjemplosEntrenamiento(ejemplosEntrenamiento.filter((_, i) => i !== index))
  }

  const contactos = [
    { id: 1, fecha: "2025-01-15 10:30", comentario: "Primera llamada de contacto", tipo: "P" },
    { id: 2, fecha: "2025-01-16 14:00", comentario: "Llamada de seguimiento realizada", tipo: "R" },
    { id: 3, fecha: "2025-01-17 09:15", comentario: "Confirmación de asistencia", tipo: "R" },
  ]

  const renderFechaHoraCompleto = (contacto: (typeof contactos)[0]) => {
    return <span className="text-sm text-gray-700">{contacto.fecha}</span>
  }

  const renderComentario = (comentario: string, fecha: string, contacto: (typeof contactos)[0]) => {
    return <span className="text-sm text-gray-700">{comentario}</span>
  }

  const toggleCanal = (canal: string) => {
    setCanales(canales === canal ? "" : canal)
  }

  return (
    <div className={`min-h-screen bg-gray-50 p-6 ${isPanelOpen ? "overflow-hidden h-screen" : ""}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Agregar Subactividad </h1>

        {/* Card with info */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Volver button header */}
          <div className="bg-[#e3f2fd] px-4 py-2">
            <Button
              variant="ghost"
              onClick={() => router.push("/planificacion-operaciones/gestion-docente/creacion-actividades/crear")}
              className="flex items-center gap-1 text-[#004fff] hover:bg-[#cce3fd] p-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver</span>
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#00a884]">Nueva Subactividad</h2>

              <div className="flex items-center gap-2 text-gray-700">
                <span>
                  Esta nueva Subactividad se agregara al flujo general de la Actividadd
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* INFORMACIÓN BÁSICA Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6"
        >
          <button
            type="button"
            onClick={() => setIsInfoBasicaExpanded(!isInfoBasicaExpanded)}
            className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-[#6419e6] font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="text-[#6419e6] font-semibold">Información Básica</span>
            </div>
            <motion.div animate={{ rotate: isInfoBasicaExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isInfoBasicaExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-6">
                  {/* Nombre de la Actividad */}
                  

                  {/* Tipo de Actividad */}
                  <div className="flex items-start gap-4">
                    <Label className="w-[22%] flex items-center gap-2 text-gray-700 pt-2">
                      <div className="bg-purple-100 p-1.5 rounded-full">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      </div>
                      Tipo de Subactividad
                    </Label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tipoActividad"
                          checked={tipoActividad === "automatica"}
                          onChange={() => setTipoActividad("automatica")}
                          className="w-4 h-4 text-[#004fff] border-gray-300 focus:ring-[#004fff]"
                        />
                        <span className="text-gray-700">Automática</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tipoActividad"
                          checked={tipoActividad === "manual"}
                          onChange={() => setTipoActividad("manual")}
                          className="w-4 h-4 text-[#004fff] border-gray-300 focus:ring-[#004fff]"
                        />
                        <span className="text-gray-700">Manual</span>
                      </label>
                    </div>
                  </div>

                  {/* Subactividad */}
                  <div className="flex items-start gap-4">
                    <Label className="w-[22%] flex items-center gap-2 text-gray-700 pt-2">
                      <div className="bg-purple-100 p-1.5 rounded-full">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      </div>
                      Subactividad <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex flex-wrap items-center gap-3">
                      {/* WhatsApp - Only for Automática */}
                      {tipoActividad === "automatica" && (
                        <label
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                            canales === "whatsapp"
                              ? "border-[#004fff] bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="canales"
                            value="whatsapp"
                            checked={canales === "whatsapp"}
                            onChange={() => toggleCanal("whatsapp")}
                            className="w-4 h-4 text-[#004fff] cursor-pointer"
                          />
                          <MessageSquare className="h-4 w-4 text-[#25D366]" />
                          <span className="text-sm text-gray-700">WhatsApp</span>
                        </label>
                      )}

                      {/* Email - Only for Automática */}
                      {tipoActividad === "automatica" && (
                        <label
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                            canales === "email"
                              ? "border-[#004fff] bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="canales"
                            value="email"
                            checked={canales === "email"}
                            onChange={() => toggleCanal("email")}
                            className="w-4 h-4 text-[#004fff] cursor-pointer"
                          />
                          <Mail className="h-4 w-4 text-[#00BCD4]" />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>
                      )}

                      {/* Llamada IVR - Only for Automática */}
                      {tipoActividad === "automatica" && (
                        <label
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                            canales === "llamada"
                              ? "border-[#004fff] bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="canales"
                            value="llamada"
                            checked={canales === "llamada"}
                            onChange={() => toggleCanal("llamada")}
                            className="w-4 h-4 text-[#004fff] cursor-pointer"
                          />
                          <Phone className="h-4 w-4 text-[#FFC107]" />
                          <span className="text-sm text-gray-700">Llamada IVR</span>
                        </label>
                      )}

                      {/* Comunicación del Asesor - Only for Manual */}
                      {tipoActividad === "manual" && (
                        <label
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                            canales === "comunicacion_asesor"
                              ? "border-[#004fff] bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="canales"
                            value="comunicacion_asesor"
                            checked={canales === "comunicacion_asesor"}
                            onChange={() => toggleCanal("comunicacion_asesor")}
                            className="w-4 h-4 text-[#004fff] cursor-pointer"
                          />
                          <Users className="h-4 w-4 text-[#9C27B0]" />
                          <span className="text-sm text-gray-700">Comunicación del Asesor</span>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Plantilla de Mensaje - Only for Automática */}
                  {tipoActividad === "automatica" && (
                    <div className="flex items-start gap-4">
                      <Label className="w-[22%] flex items-center gap-2 text-gray-700 pt-2">
                        <div className="bg-purple-100 p-1.5 rounded-full">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                        </div>
                        Plantilla de Mensaje
                      </Label>
                      <div className="flex-1 space-y-2">
                        <Select defaultValue="sin-plantilla">
                          <SelectTrigger className="w-48 border-gray-200 focus:border-[#004fff] focus:ring-[#004fff]">
                            <SelectValue placeholder="Seleccionar plantilla" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sin-plantilla">-- Sin plantilla --</SelectItem>
                            <SelectItem value="recordatorio">Recordatorio de clase</SelectItem>
                            <SelectItem value="confirmacion">Confirmación de asistencia</SelectItem>
                            <SelectItem value="notas">Subir notas</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-purple-600">
                          Puedes usar plantillas disponibles para los canales seleccionados
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* DISPARADOR DE LA ACTIVIDAD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6"
        >
          <button
            type="button"
            onClick={() => setIsDisparadorExpanded(!isDisparadorExpanded)}
            className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] text-[#6419e6] font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                <Clock className="h-4 w-4" />
              </div>
              <span className="text-[#6419e6] font-semibold">Disparador de la Subactividad</span>
            </div>
            <motion.div animate={{ rotate: isDisparadorExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isDisparadorExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-6">
                  {/* Texto descriptivo */}
                  <p className="text-gray-700">
                    Selecciona la hora en que se ejecutara el siguiente paso
                  </p>

                  {/* Configuración de tiempo y ocurrencia */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={tiempoOcurrencia}
                        onChange={(e) => setTiempoOcurrencia(e.target.value)}
                        className="w-24 border-gray-200 focus:border-[#004fff] focus:ring-[#004fff]"
                      />
                      <Select value={unidadTiempo} onValueChange={setUnidadTiempo}>
                        <SelectTrigger className="w-32 border-gray-200 focus:border-[#004fff] focus:ring-[#004fff]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutos">Minutos</SelectItem>
                          <SelectItem value="horas">Horas</SelectItem>
                          <SelectItem value="dias">Días</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Select defaultValue="">
                      <SelectTrigger className="w-full border-gray-200 focus:border-[#004fff] focus:ring-[#004fff]">
                        <SelectValue placeholder="-- Seleccionar paso anterior --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completada">Actividad completada</SelectItem>
                        <SelectItem value="no-respuesta">Sin respuesta</SelectItem>
                        <SelectItem value="error">Error en ejecución</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Checkbox para fin de actividad */}
                  <div className="flex items-center gap-2 pt-3">
                    <Checkbox
                      id="fin-actividad"
                      checked={esFinActividad}
                      onCheckedChange={(checked) => setEsFinActividad(checked as boolean)}
                    />
                    <Label htmlFor="fin-actividad" className="text-sm text-gray-700 cursor-pointer">
                      Este es el fin de la actividad
                    </Label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Summary Section - Only show if not end of activity */}
        {!esFinActividad && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden mt-6"
          >
            <button
              onClick={() => setContactosExpanded(!contactosExpanded)}
              className="w-full flex items-center justify-between p-4 bg-[#e3f2fd] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
                  <Users className="h-4 w-4" />
                </div>
                <span className="text-[#6419e6] font-semibold">Lista de Ocurrencias</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPanelOpen(true)
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-[#6419e6] rounded-lg hover:bg-[#5315c4] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Agregar ocurrencia
                </span>
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
                  className={`transform transition-transform text-[#6419e6] ${contactosExpanded ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>

            {contactosExpanded && (
              <div>
                <div className="flex flex-wrap items-center gap-4 px-3 py-2 bg-[#e3f2fd] border-b border-[#b6e0fe]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600 border border-green-200">
                      POS
                    </span>
                    <span className="text-[14px] text-gray-700 font-medium">Positivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200">
                      NEG
                    </span>
                    <span className="text-[14px] text-gray-700 font-medium">Negativo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      NEU
                    </span>
                    <span className="text-[14px] text-gray-700 font-medium">Neutral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      M
                    </span>
                    <span className="text-[14px] text-gray-700 font-medium">Manual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-600 border border-orange-200">
                      A
                    </span>
                    <span className="text-[14px] text-gray-700 font-medium">Automático</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                      MARM
                    </span>
                    <span className="text-[14px] text-gray-700 font-medium">
                      Marcado Automático con Reconfirmación Manual
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-3 py-3 text-left font-medium text-gray-500 text-[14px]">Nombre</th>
                        <th className="px-3 py-3 text-left font-medium text-gray-500 text-[14px]">Tipo</th>
                        <th className="px-3 py-3 text-left font-medium text-gray-500 text-[14px]">Marcado</th>
                        <th className="px-3 py-3 text-left font-medium text-gray-500 text-[14px]">Siguiente Actividad</th>
                        <th className="px-3 py-3 text-left font-medium text-gray-500 text-[14px]">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Row 1: Confirmó asistencia */}
                      <tr className="hover:bg-gray-50">
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                            <span className="text-[14px] text-gray-700 font-medium">Confirmó asistencia</span>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            POS
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            MARM
                          </span>
                        </td>
                        <td className="px-3 py-4 text-[14px] text-gray-700">ACT 4: Email Instrucciones</td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                              Editar
                            </button>
                            <button className="px-3 py-1.5 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors">
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Row 2: Rechazó sesión */}
                      <tr className="hover:bg-gray-50">
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                            <span className="text-[14px] text-gray-700 font-medium">Rechazó sesión</span>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            NEG
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            MARM
                          </span>
                        </td>
                        <td className="px-3 py-4 text-[14px] text-gray-700">ACT 3: Notificar Coordinadora</td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                              Editar
                            </button>
                            <button className="px-3 py-1.5 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors">
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Row 3: No respondió */}
                      <tr className="hover:bg-gray-50">
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                            <span className="text-[14px] text-gray-700 font-medium">No respondió (6h)</span>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            NEU
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            A
                          </span>
                        </td>
                        <td className="px-3 py-4 text-[14px] text-gray-700">ACT 2: Primera Llamada IVR</td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                              Editar
                            </button>
                            <button className="px-3 py-1.5 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors">
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Pagination Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-3 py-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Página</span>
                    <input
                      type="text"
                      value="1"
                      className="w-12 px-2 py-1 text-sm text-center border border-gray-300 rounded"
                      readOnly
                    />
                    <span className="text-sm text-gray-600">de 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="px-3 py-1.5 text-sm border border-gray-300 rounded">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                    <span className="text-sm text-gray-600">items por página</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">«</button>
                    <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">‹</button>
                    <span className="px-3 py-1 text-sm text-gray-600">1 - 3 de 3 items</span>
                    <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">›</button>
                    <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">»</button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {isPanelOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsPanelOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[70%] bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Panel Header */}
            <div className="bg-[#7c3aed] px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Nueva Ocurrencia</h2>
                <p className="text-sm text-white/80">
                  Formulario detallado para crear una nueva ocurrencia con todos sus parámetros
                </p>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Información Básica */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Básica</h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700">
                      Nombre de la Ocurrencia <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="ej: Confirmó asistencia"
                      className="mt-1 border-gray-200"
                      value={ocurrenciaNombre}
                      onChange={(e) => setOcurrenciaNombre(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700">Descripción (opcional)</Label>
                    <textarea
                      placeholder="Descripción adicional de esta ocurrencia"
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#004fff] focus:border-transparent"
                      value={ocurrenciaDescripcion}
                      onChange={(e) => setOcurrenciaDescripcion(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Tipo de Ocurrencia */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tipo de Ocurrencia</h3>

                <div className="space-y-3">
                  {/* POSITIVO */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      ocurrenciaTipo === "positivo"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setOcurrenciaTipo("positivo")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ocurrenciaTipo"
                        checked={ocurrenciaTipo === "positivo"}
                        onChange={() => setOcurrenciaTipo("positivo")}
                        className="w-4 h-4 text-green-500"
                      />
                      <span className="w-4 h-4 rounded-full bg-green-500"></span>
                      <div>
                        <span className="font-medium text-green-600">POSITIVO</span>
                        <p className="text-sm text-gray-500">Resultado exitoso que avanza el proceso</p>
                      </div>
                    </div>
                  </div>

                  {/* NEGATIVO */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      ocurrenciaTipo === "negativo"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setOcurrenciaTipo("negativo")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ocurrenciaTipo"
                        checked={ocurrenciaTipo === "negativo"}
                        onChange={() => setOcurrenciaTipo("negativo")}
                        className="w-4 h-4 text-red-500"
                      />
                      <span className="w-4 h-4 rounded-full bg-red-500"></span>
                      <div>
                        <span className="font-medium text-red-600">NEGATIVO</span>
                        <p className="text-sm text-gray-500">Resultado que requiere atención o escalamiento</p>
                      </div>
                    </div>
                  </div>

                  {/* NEUTRAL */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      ocurrenciaTipo === "neutral"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setOcurrenciaTipo("neutral")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ocurrenciaTipo"
                        checked={ocurrenciaTipo === "neutral"}
                        onChange={() => setOcurrenciaTipo("neutral")}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                      <div>
                        <span className="font-medium text-gray-700">NEUTRAL</span>
                        <p className="text-sm text-gray-500">Resultado informativo o que requiere seguimiento</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Siguiente Actividad */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Siguiente Actividad</h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700">
                      ¿Qué se ejecuta después? <span className="text-red-500">*</span>
                    </Label>
                    <Select value={siguienteActividad} onValueChange={setSiguienteActividad}>
                      <SelectTrigger className="mt-1 border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="act2">ACT 2: Primera Llamada IVR</SelectItem>
                        <SelectItem value="act3">ACT 3: Notificar Coordinadora</SelectItem>
                        <SelectItem value="act4">ACT 4: Email Instrucciones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <span className="text-sm text-gray-700">Si se marca esta ocurrencia, se ejecutará:</span>
                      <p className="font-medium text-gray-800">
                        {siguienteActividad === "act2" && "ACT 2: Primera Llamada IVR"}
                        {siguienteActividad === "act3" && "ACT 3: Notificar Coordinadora"}
                        {siguienteActividad === "act4" && "ACT 4: Email Instrucciones"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tipo de Marcado */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tipo de Marcado</h3>

                <div className="space-y-3">
                  {/* Manual */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      tipoMarcado === "manual"
                        ? "border-[#004fff] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setTipoMarcado("manual")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="tipoMarcado"
                        checked={tipoMarcado === "manual"}
                        onChange={() => setTipoMarcado("manual")}
                        className="w-4 h-4 text-[#004fff]"
                      />
                      <div>
                        <span className="font-medium text-gray-800">Manual</span>
                        <p className="text-sm text-gray-500">Solo la asesora puede marcar esta ocurrencia</p>
                      </div>
                    </div>
                  </div>

                  {/* Automático */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      tipoMarcado === "automatico"
                        ? "border-[#004fff] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setTipoMarcado("automatico")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="tipoMarcado"
                        checked={tipoMarcado === "automatico"}
                        onChange={() => setTipoMarcado("automatico")}
                        className="w-4 h-4 text-[#004fff]"
                      />
                      <div>
                        <span className="font-medium text-gray-800">Automático</span>
                        <p className="text-sm text-gray-500">
                          {"IA/Sistema marca automáticamente (confianza ≥ 80%)"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MARM */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      tipoMarcado === "marm" ? "border-[#004fff] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setTipoMarcado("marm")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="tipoMarcado"
                        checked={tipoMarcado === "marm"}
                        onChange={() => setTipoMarcado("marm")}
                        className="w-4 h-4 text-[#004fff]"
                      />
                      <div>
                        <span className="font-medium text-gray-800">MARM</span>
                        <p className="text-sm text-gray-500">Marcado Automático con Reconfirmación Manual</p>
                      </div>
                    </div>
                  </div>

                  {/* MARM Warning */}
                  {tipoMarcado === "marm" && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                      <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-sm">
                          <span className="font-medium text-yellow-800">
                            <AlertTriangle className="h-4 w-4 inline mr-1" />
                            MARM seleccionado:
                          </span>{" "}
                          <span className="text-yellow-700">
                            La IA sugerirá esta ocurrencia cuando detecte el patrón, pero requerirá que la asesora
                            apruebe manualmente antes de marcarla cuando la confianza sea media (60-79%) o baja ({"<"}
                            60%).
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Configuración IA - Solo si es Automático o MARM */}
              {(tipoMarcado === "automatico" || tipoMarcado === "marm") && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Configuración IA{" "}
                      <span className="text-sm font-normal text-gray-500">(solo si es Automático o MARM)</span>
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsIAConfigExpanded(!isIAConfigExpanded)}
                    className="w-full px-4 py-3 text-white bg-[#6419e6] rounded-lg hover:bg-[#5315c4] transition-colors flex items-center justify-center gap-2"
                  >
                    <Bot className="h-5 w-5" />
                    Configurar Detección IA
                  </button>
                  <p className="text-sm text-gray-500 text-center mt-2">(Prompt, ejemplos de entrenamiento, etc.)</p>

                  {/* Expanded IA Config */}
                  {isIAConfigExpanded && (
                    <div className="mt-6 space-y-6 pt-6 border-t border-gray-200">
                      {/* Prompt de Contexto */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Prompt de Contexto para la IA</h4>
                        <Label className="text-sm text-gray-600">
                          Instrucciones para detectar esta ocurrencia
                        </Label>
                        <textarea
                          value={iaPrompt}
                          onChange={(e) => setIaPrompt(e.target.value)}
                          className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#004fff] focus:border-transparent"
                        />
                      </div>

                      {/* Nivel de Confianza */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Nivel de Confianza para Marcado Automático
                        </h4>
                        <Label className="text-sm text-gray-600">Umbral Mínimo</Label>
                        <Select value={iaUmbral} onValueChange={setIaUmbral}>
                          <SelectTrigger className="mt-2 border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baja">{"BAJA (< 60%) - Solo sugiere, no marca"}</SelectItem>
                            <SelectItem value="media">MEDIA (60-79%) - Requiere aprobación</SelectItem>
                            <SelectItem value="alta">{"ALTA (≥ 80%) - Marca automáticamente"}</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                          <Info className="h-4 w-4 text-green-600 mt-0.5" />
                          <p className="text-sm text-green-700">
                            <span className="font-medium">Configuración actual:</span> La IA marcará
                            automáticamente cuando tenga 80% o más de confianza. Mensajes con menor confianza
                            requerirán revisión manual.
                          </p>
                        </div>
                      </div>

                      {/* Ejemplos de Entrenamiento */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Ejemplos de Entrenamiento (10-15 recomendado)
                        </h4>

                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-2 font-medium">Mensaje de Ejemplo</th>
                              <th className="pb-2 font-medium">Clasificación</th>
                              <th className="pb-2 font-medium w-10"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {ejemplosEntrenamiento.map((ejemplo, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="py-3 text-sm text-blue-600">{ejemplo.mensaje}</td>
                                <td className="py-3">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    {ejemplo.clasificacion}
                                  </span>
                                </td>
                                <td className="py-3">
                                  <button
                                    onClick={() => eliminarEjemplo(index)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <button className="mt-4 w-full px-4 py-2 text-white bg-[#6419e6] rounded-lg hover:bg-[#5315c4] transition-colors flex items-center justify-center gap-2">
                          <Plus className="h-4 w-4" />
                          Agregar Ejemplo
                        </button>
                      </div>

                      {/* Mejores Prácticas */}
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-800 flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4" />
                              Mejores Prácticas
                            </h4>
                            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                              <li className="flex items-start gap-1">
                                <span>•</span>
                                <span className="text-blue-600">Incluye ejemplos variados y realistas</span>
                              </li>
                              <li className="flex items-start gap-1">
                                <span>•</span>
                                <span>Agrega casos ambiguos para mejorar la precisión</span>
                              </li>
                              <li className="flex items-start gap-1">
                                <span>•</span>
                                <span className="text-blue-600">Mínimo 10 ejemplos, idealmente 15-20</span>
                              </li>
                              <li className="flex items-start gap-1">
                                <span>•</span>
                                <span className="text-blue-600">
                                  Revisa periódicamente los casos marcados para afinar
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* IA Config Buttons */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <Button
                          variant="outline"
                          onClick={() => setIsIAConfigExpanded(false)}
                          className="border-gray-300"
                        >
                          Cancelar
                        </Button>
                        <Button className="bg-[#6419e6] hover:bg-[#5315c4] text-white">Guardar</Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Campos Adicionales */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Campos Adicionales (opcional)</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Campos que la asesora debe completar al marcar esta ocurrencia
                </p>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox className="data-[state=checked]:bg-[#004fff] data-[state=checked]:border-[#004fff]" />
                    <span className="text-gray-700">Comentario / Nota</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox className="data-[state=checked]:bg-[#004fff] data-[state=checked]:border-[#004fff]" />
                    <span className="text-gray-700">Fecha/Hora</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Action Buttons - Outside of AnimatePresence */}
      <div className="flex justify-center gap-3 pt-6 border-t mt-8">
        <Button 
          variant="outline" 
          onClick={() => router.push("/planificacion-operaciones/gestion-docente/creacion-actividades/crear")} 
          className="border-gray-300"
        >
          Cancelar
        </Button>
        <Button 
          onClick={() => router.push("/planificacion-operaciones/gestion-docente/creacion-actividades/crear")} 
          className="bg-[#6419e6] hover:bg-[#5315c4] text-white"
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
