"use client"

import { useState } from "react"
import { Phone, MessageSquare, Mail, X, UserX, ChevronLeft, Info } from "lucide-react"
import { InstantTooltip } from "./instant-tooltip"
import { DateTimePicker } from "./date-time-picker"

interface ReporteIncidenciaAtencionClienteModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReporteIncidenciaAtencionClienteModal({ isOpen, onClose }: ReporteIncidenciaAtencionClienteModalProps) {
  const [activeOption, setActiveOption] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showSeguimiento, setShowSeguimiento] = useState(false)
  const [tipoSeguimiento, setTipoSeguimiento] = useState<"llamada" | "whatsapp" | "email">("llamada")

  // Estados para el seguimiento
  const [comentario, setComentario] = useState("")
  const [fechaSiguiente, setFechaSiguiente] = useState("")
  const [opcionLlamada, setOpcionLlamada] = useState("")
  const [calidadLlamada, setCalidadLlamada] = useState("")
  const [estadoSolicitud, setEstadoSolicitud] = useState("")
  const [fechaEnvio, setFechaEnvio] = useState("")
  const [fechaRespuesta, setFechaRespuesta] = useState("")

  if (!isOpen) return null

  // Function to handle option selection
  const handleOptionSelect = (option: string) => {
    setActiveOption(option)
    setSelectedItem(null)
    setShowSeguimiento(false)
  }

  // Function to go back to main options
  const handleBackToOptions = () => {
    setActiveOption(null)
    setSelectedItem(null)
    setShowSeguimiento(false)
  }

  // Function to handle item selection
  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId === selectedItem ? null : itemId)

    // Automatically go to seguimiento when an item is selected
    if (itemId !== selectedItem) {
      setShowSeguimiento(true)
    } else {
      setShowSeguimiento(false)
    }
  }

  // Content for tooltips
  const tooltipRespuestaTelefono = (
    <div className="space-y-4 text-sm">
      <p className="font-medium">Registre la respuesta telefónica del cliente para dar seguimiento a su solicitud.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Registre los detalles importantes de la conversación</li>
        <li>Documente cualquier acuerdo o compromiso establecido</li>
        <li>Programe la siguiente actividad de seguimiento si es necesario</li>
      </ul>
    </div>
  )

  const tooltipRespuestaWhatsapp = (
    <div className="space-y-4 text-sm">
      <p className="font-medium">Registre la respuesta por WhatsApp del cliente para dar seguimiento a su solicitud.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Documente los mensajes importantes recibidos</li>
        <li>Registre cualquier archivo o documento compartido</li>
        <li>Programe la siguiente actividad de seguimiento si es necesario</li>
      </ul>
    </div>
  )

  const tooltipRespuestaEmail = (
    <div className="space-y-4 text-sm">
      <p className="font-medium">
        Registre la respuesta por correo electrónico del cliente para dar seguimiento a su solicitud.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Documente el contenido relevante del correo</li>
        <li>Registre cualquier archivo adjunto importante</li>
        <li>Programe la siguiente actividad de seguimiento si es necesario</li>
      </ul>
    </div>
  )

  const tooltipSinContacto = (
    <div className="space-y-4 text-sm">
      <p className="font-medium">Registre los intentos de contacto fallidos con el cliente.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Documente los canales utilizados para intentar contactar al cliente</li>
        <li>Registre la fecha y hora de los intentos</li>
        <li>Programe un nuevo intento de contacto</li>
      </ul>
    </div>
  )

  // Options data for Atención al Cliente
  const options = [
    {
      id: "respuestaTelefono",
      title: "Respuesta por teléfono",
      icon: Phone,
      color: "bg-[#6419e6]",
      bgColor: "bg-purple-200",
      textColor: "text-purple-800",
      items: [
        {
          id: "ejecutadaAgendoSeguimiento",
          text: "Ejecutada, se agendó próximo seguimiento",
          showTooltip: true,
          tooltipContent: tooltipRespuestaTelefono,
        },
        {
          id: "alumnoCompletoClases",
          text: "Alumno completo las clases del programa y pago el total de cuotas del programa",
          showTooltip: true,
          tooltipContent: tooltipRespuestaTelefono,
        },
        {
          id: "validoEntregaBeneficios",
          text: "Se validó entrega de beneficios, culminado anteriormente",
          showTooltip: true,
          tooltipContent: tooltipRespuestaTelefono,
        },
        {
          id: "realizoGrabacionVoz",
          text: "Se realizó la grabación de voz",
          showTooltip: true,
          tooltipContent: tooltipRespuestaTelefono,
        },
        {
          id: "alumnoNoRequiereContacto",
          text: "Alumno ya no requiere contacto",
          showTooltip: true,
          tooltipContent: tooltipRespuestaTelefono,
        },
        {
          id: "llamadaEntrante",
          text: "Llamada Entrante",
          showTooltip: true,
          tooltipContent: tooltipRespuestaTelefono,
        },
      ],
    },
    {
      id: "respuestaWhatsapp",
      title: "Respuesta por WhatsApp",
      icon: MessageSquare,
      color: "bg-green-500",
      bgColor: "bg-green-200",
      textColor: "text-green-800",
      items: [
        {
          id: "ejecutadaAgendoSeguimientoWA",
          text: "Ejecutada, se agendó próximo seguimiento",
          showTooltip: true,
          tooltipContent: tooltipRespuestaWhatsapp,
        },
        {
          id: "alumnoCompletoClasesWA",
          text: "Alumno completo las clases del programa y pago el total de cuotas del programa",
          showTooltip: true,
          tooltipContent: tooltipRespuestaWhatsapp,
        },
        {
          id: "validoEntregaBeneficiosWA",
          text: "Se validó entrega de beneficios, culminado anteriormente",
          showTooltip: true,
          tooltipContent: tooltipRespuestaWhatsapp,
        },
      ],
    },
    {
      id: "respuestaEmail",
      title: "Respuesta correo electrónico",
      icon: Mail,
      color: "bg-blue-500",
      bgColor: "bg-blue-200",
      textColor: "text-blue-800",
      items: [
        {
          id: "ejecutadaAgendoSeguimientoEmail",
          text: "Ejecutada, se agendó próximo seguimiento",
          showTooltip: true,
          tooltipContent: tooltipRespuestaEmail,
        },
        {
          id: "alumnoCompletoClasesEmail",
          text: "Alumno completo las clases del programa y pago el total de cuotas del programa",
          showTooltip: true,
          tooltipContent: tooltipRespuestaEmail,
        },
        {
          id: "validoEntregaBeneficiosEmail",
          text: "Se validó entrega de beneficios, culminado anteriormente",
          showTooltip: true,
          tooltipContent: tooltipRespuestaEmail,
        },
      ],
    },
    {
      id: "sinContacto",
      title: "No se tuvo contacto con el cliente",
      icon: UserX,
      color: "bg-red-500",
      bgColor: "bg-red-200",
      textColor: "text-red-800",
      items: [
        {
          id: "noRespondeBuzon",
          text: "No responde llamada y se va a buzón de voz",
          showTooltip: true,
          tooltipContent: tooltipSinContacto,
        },
        {
          id: "contestaCorta",
          text: "Contesta y corta",
          showTooltip: true,
          tooltipContent: tooltipSinContacto,
        },
        {
          id: "telefonoApagado",
          text: "Teléfono apagado o suspendido",
          showTooltip: true,
          tooltipContent: tooltipSinContacto,
        },
        {
          id: "cortaDuranteTimbrado",
          text: "Corta la llamada durante timbrado",
          showTooltip: true,
          tooltipContent: tooltipSinContacto,
        },
        {
          id: "noEntraLlamada",
          text: "No entra la llamada",
          showTooltip: true,
          tooltipContent: tooltipSinContacto,
        },
        {
          id: "ocupadoNoAtiende",
          text: "Contesta, esta ocupado y no puede atender en este momento",
          showTooltip: true,
          tooltipContent: tooltipSinContacto,
        },
        {
          id: "numeroNoPertenece",
          text: "Número ya no le pertenece, no existe",
          showTooltip: true,
          tooltipContent: tooltipSinContacto,
        },
        {
          id: "terceroContesta",
          text: "Familiar o un tercero contesta",
          showTooltip: true,
          tooltipContent: tooltipSinContacto,
        },
      ],
    },
  ]

  // Get the current option
  const currentOption = options.find((opt) => opt.id === activeOption)

  // Get items based on the current selection
  const getItems = () => {
    if (!currentOption) return []
    return currentOption.items
  }

  const items = getItems()

  // Opciones para el formulario de seguimiento
  const opcionesLlamada = [
    "Llamada satisfactoria",
    "Problemas de conexión",
    "Cliente solicitó llamar más tarde",
    "Se cortó la llamada",
    "Llamada transferida a otro departamento",
  ]

  const opcionesCalidad = ["0 - Muy mala", "1 - Mala", "2 - Normal", "3 - Buena", "4 - Muy buena", "5 - Excelente"]

  const opcionesEstadoSolicitud = ["Pendiente", "En proceso", "Resuelto", "Requiere escalamiento"]

  // Function to handle going back from seguimiento
  const handleBackFromSeguimiento = () => {
    setShowSeguimiento(false)
  }

  // Renderizar el contenido del seguimiento
  const renderSeguimientoContent = () => {
    // Get the title based on the selected option type
    const getTitle = () => {
      switch (activeOption) {
        case "respuestaTelefono":
          return "Respuesta por teléfono"
        case "respuestaWhatsapp":
          return "Respuesta por WhatsApp"
        case "respuestaEmail":
          return "Respuesta correo electrónico"
        case "sinContacto":
          return "No se tuvo contacto con el cliente"
        default:
          return ""
      }
    }

    // Get the selected item text
    const getSelectedItemText = () => {
      if (!currentOption) return ""
      const selectedItemObj = currentOption.items.find((item) => item.id === selectedItem)
      return selectedItemObj ? selectedItemObj.text : ""
    }

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center mb-4">
          <button onClick={handleBackFromSeguimiento} className="mr-2 p-1 rounded-full hover:bg-gray-200">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold text-[#6419e6]">{getTitle()}</h3>
        </div>

        {/* Display the selected option text centered */}
        <div className="text-center mb-4">
          <p className="text-sm font-medium">{getSelectedItemText()}</p>
        </div>

        {/* Date/time picker for scheduling - Reducido a la mitad y centrado */}
        <div className="space-y-1 flex flex-col items-center">
          <label htmlFor="fechaSiguiente" className="block text-sm font-medium text-gray-700">
            Fecha siguiente actividad
          </label>
          <div className="w-1/2">
            <DateTimePicker id="fechaSiguiente" value={fechaSiguiente} onChange={setFechaSiguiente} />
          </div>
        </div>

        {/* Botón de programar actividad - Reducido a la mitad y centrado */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Programar Actividad
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-[700px] max-w-[90vw] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-lg font-semibold text-green-600">REPORTE DE INCIDENCIA</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto">
          {/* Si estamos mostrando el seguimiento, renderizamos su contenido */}
          {showSeguimiento ? (
            renderSeguimientoContent()
          ) : (
            <div className="p-4">
              {/* Mostrar opciones principales solo si no hay ninguna seleccionada */}
              {!activeOption && (
                <div className="grid grid-cols-2 gap-4">
                  {options.map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${option.bgColor} hover:bg-opacity-80 ${option.textColor} h-[120px]`}
                      >
                        <Icon className={`h-6 w-6 ${option.textColor} mb-2`} />
                        <span className="text-sm font-medium text-center">{option.title}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Si hay una opción seleccionada, mostrar cabecera y subniveles */}
              {activeOption && currentOption && (
                <>
                  {/* Cabecera de la opción seleccionada */}
                  <div className={`flex items-center p-3 mb-4 rounded-lg ${currentOption.color} text-white`}>
                    <button
                      onClick={handleBackToOptions}
                      className="mr-2 p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <currentOption.icon className="h-5 w-5 mr-2" />
                    <span className="font-medium">{currentOption.title}</span>
                  </div>

                  {/* Lista de items */}
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div
                          className={`flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                            selectedItem === item.id ? "bg-blue-50 border-blue-300" : ""
                          }`}
                          onClick={() => handleItemSelect(item.id)}
                        >
                          <input
                            type="radio"
                            checked={selectedItem === item.id}
                            onChange={() => {}}
                            className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0"
                          />
                          <span className="text-sm">{item.text}</span>
                          {item.showTooltip && (
                            <InstantTooltip content={item.tooltipContent}>
                              <Info className="h-4 w-4 text-blue-500 ml-1 flex-shrink-0" />
                            </InstantTooltip>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
