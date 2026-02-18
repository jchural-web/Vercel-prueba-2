"use client"

import { useState } from "react"
import { SeguimientoItem } from "./seguimiento-item"
import { SeguimientoModal } from "./seguimiento-modal"

export function SeguimientoLista() {
  const [modalOpen, setModalOpen] = useState(false)
  const [tipoSeguimiento, setTipoSeguimiento] = useState<"llamada" | "whatsapp">("llamada")
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const handleLlamadaClick = (id: string) => {
    setSelectedItemId(id)
    setTipoSeguimiento("llamada")
    setModalOpen(true)
  }

  const handleWhatsAppClick = (id: string) => {
    setSelectedItemId(id)
    setTipoSeguimiento("whatsapp")
    setModalOpen(true)
  }

  const tooltipContentPagoGrabacion = (
    <div className="space-y-3">
      <h4 className="font-medium text-purple-600">Instrucciones según modalidad</h4>

      <div>
        <p className="font-medium">Si es online (Perú y Colombia):</p>
        <ul className="list-disc pl-5 space-y-2 mt-1">
          <li>
            Indicarle que se le devolverá la llamada para realizar el contrato de voz.{" "}
            <span className="italic text-gray-600">(absolver todas las dudas antes de devolver la llamada)</span>
          </li>
          <li>
            Solicitar la creación de accesos virtuales y explicar que en un plazo no mayor a 24 horas el coordinador
            académico asignado se pondrá en contacto con el cliente para que pueda iniciar su capacitación. (Solo online
            asincrónico)
          </li>
        </ul>
      </div>

      <div>
        <p className="font-medium">Si es presencial:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Enviar correo Invitación a primera sesión de clases (solo para presencial y online sincrónico).</li>
        </ul>
      </div>

      <div>
        <p className="font-medium">Si es online (Extranjero):</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Explicarle la documentación que necesita llenar y confirmar cuando la estará remitiendo escaneada.</li>
        </ul>
      </div>
    </div>
  )

  return (
    <div className="space-y-2">
      <SeguimientoItem
        id="confirmaInicio"
        title="Confirma inicio de participación, se pacta fecha de contrato de voz (PF)"
        onLlamadaClick={handleLlamadaClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      <SeguimientoItem
        id="confirmaPagoGrabacion"
        title="Confirma pago, se pacta fecha de grabación de contrato de voz (IS)"
        hasTooltip={true}
        tooltipContent={tooltipContentPagoGrabacion}
        onLlamadaClick={handleLlamadaClick}
        onWhatsAppClick={handleWhatsAppClick}
        isHighlighted={true}
      />

      <SeguimientoItem
        id="confirmaPagoEntrega"
        title="Confirma pago, se pacta fecha de envío o entrega de contrato firmado (IS)"
        onLlamadaClick={handleLlamadaClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      <SeguimientoItem
        id="noTieneProblema"
        title="No tiene ningún problema para concretar su participación y va a enviar la ficha de matrícula (PF)"
        onLlamadaClick={handleLlamadaClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      <SeguimientoItem
        id="estaInteresado"
        title="Está realmente interesado en el programa pero aún no pudo resolver los problemas para concretar su participación (IP)"
        onLlamadaClick={handleLlamadaClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      <SeguimientoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tipoSeguimiento={tipoSeguimiento}
        itemId={selectedItemId || undefined}
      />
    </div>
  )
}
