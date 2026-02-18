"use client"

import * as React from "react"
import { useState } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-[#32cd32] text-white hover:bg-[#32cd32]/90",
        orange: "bg-[#F59E0B] text-white hover:bg-[#D97706]",
        execute: "bg-purple-100 text-purple-600 hover:bg-purple-200 border-none rounded-full flex items-center gap-1",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface ChangeRequestModalProps {
  isOpen: boolean
  onClose: () => void
  type: "centro-costo" | "version" | "estado" | "sub-estado"
  currentValue: string
}

const ChangeRequestModal = ({ isOpen, onClose, type, currentValue }: ChangeRequestModalProps) => {
  const [selectedValue, setSelectedValue] = useState("")
  const [comment, setComment] = useState("")

  if (!isOpen) return null

  const getTitle = () => {
    switch (type) {
      case "centro-costo":
        return "Solicitar Cambio Centro Costo"
      case "version":
        return "Solicitar Cambio de Versión"
      case "estado":
        return "Solicitar Cambio Estado"
      case "sub-estado":
        return "Solicitar Cambio Sub Estado"
      default:
        return "Solicitar Cambio"
    }
  }

  const getDropdownLabel = () => {
    switch (type) {
      case "centro-costo":
        return "Nuevo Centro de Costo"
      case "version":
        return "Nueva Versión"
      case "estado":
        return "Nuevo Estado"
      case "sub-estado":
        return "Nuevo Sub Estado"
      default:
        return "Nuevo Valor"
    }
  }

  const getOptions = () => {
    switch (type) {
      case "centro-costo":
        return ["CDMEXICO", "CDPERU", "CDCOLOMBIA", "CDCHILE"]
      case "version":
        return ["Gerencial", "Ejecutiva", "Premium", "Básica"]
      case "estado":
        return ["Certificado", "En Proceso", "Pendiente", "Cancelado"]
      case "sub-estado":
        return ["aprobado BSGI CD", "pendiente BSGI CD", "rechazado BSGI CD"]
      default:
        return []
    }
  }

  const handleAccept = () => {
    // Aquí iría la lógica para procesar la solicitud
    console.log("Solicitud de cambio:", { type, selectedValue, comment })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-w-[90vw]">
        {/* Header */}
        <div className="bg-orange-500 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">{getTitle()}</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{getDropdownLabel()}</label>
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Seleccione una opción</option>
              {getOptions().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Comentario</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Ingrese su comentario..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  changeRequestType?: "centro-costo" | "version" | "estado" | "sub-estado"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, changeRequestType, ...props }, ref) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState<"centro-costo" | "version" | "estado" | "sub-estado">("centro-costo")

    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const textContent = e.currentTarget.textContent || ""

      // Agregar console.log para identificar el botón
      console.log("Botón clickeado:", textContent)
      console.log("Elemento:", e.currentTarget)
      console.log("Contexto padre:", e.currentTarget.parentElement?.textContent)

      // Detectar si es un botón "Solicitar Cambio" y determinar el tipo basado en el contexto
      if (textContent.includes("Solicitar Cambio") || textContent === "Solicitar Cambio") {
        console.log("Detectado botón Solicitar Cambio")
        e.preventDefault()

        // Buscar en el DOM el contexto para determinar el tipo de cambio
        const parentElement =
          e.currentTarget.closest("[data-change-type]") ||
          e.currentTarget.closest(".client-info") ||
          e.currentTarget.parentElement

        let detectedType: "centro-costo" | "version" | "estado" | "sub-estado" = "centro-costo"

        if (parentElement) {
          const contextText = parentElement.textContent || ""
          console.log("Texto del contexto:", contextText)

          if (contextText.includes("CDMEXICO") || contextText.includes("Centro")) {
            detectedType = "centro-costo"
          } else if (contextText.includes("Versión") || contextText.includes("Gerencial")) {
            detectedType = "version"
          } else if (contextText.includes("Estado") && contextText.includes("Certificado")) {
            detectedType = "estado"
          } else if (contextText.includes("sub-estado") || contextText.includes("aprobado BSGI")) {
            detectedType = "sub-estado"
          }
        }

        console.log("Tipo detectado:", detectedType)
        setModalType(detectedType)
        setModalOpen(true)
      } else if (changeRequestType) {
        e.preventDefault()
        setModalType(changeRequestType)
        setModalOpen(true)
      } else if (props.onClick) {
        props.onClick(e)
      }
    }

    // Añadir el icono de reproducción para la variante "execute"
    const content =
      variant === "execute" ? (
        <>
          <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-white ml-0.5"></div>
          </div>
          {children}
        </>
      ) : (
        children
      )

    return (
      <>
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} onClick={handleClick}>
          {content}
        </Comp>

        {modalOpen && (
          <ChangeRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={modalType} currentValue="" />
        )}
      </>
    )
  },
)
Button.displayName = "Button"

const switchVariants = cva(
  "peer inline-flex h-[18px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        default: "",
        sm: "h-[14px] w-[30px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const Switch = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof switchVariants>
>(({ className, size, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        switchVariants({ size, className }),
        "after:bg-background after:absolute after:top-[2px] after:left-[2px] after:h-[14px] after:w-[14px] after:rounded-full after:border after:border-gray-300 after:shadow-md after:transition-all data-[state=checked]:after:translate-x-[20px]",
      )}
    ></button>
  )
})
Switch.displayName = "Switch"

export { Button, buttonVariants, Switch }
