"use client"

import { useState } from "react"
import { HistorialCrediticioModal } from "./historial-crediticio-modal"

interface HistorialCrediticioButtonProps {
  clienteId: string
  clienteData?: any
}

export function HistorialCrediticioButton({ clienteId, clienteData }: HistorialCrediticioButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button onClick={handleOpenModal} className="text-[#6419e6] hover:text-[#5315c1] font-medium text-sm underline">
        Ver detalle
      </button>
      <HistorialCrediticioModal isOpen={isModalOpen} onClose={handleCloseModal} data={clienteData} />
    </>
  )
}
