"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

interface StartSubActivityConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  activityName?: string
  subActivityNumber?: number
  subActivityFullName?: string
}

export function StartSubActivityConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  activityName = "Sub-actividad",
  subActivityNumber = 1,
  subActivityFullName,
}: StartSubActivityConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Confirmar Inicio de Sub-actividad
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            {subActivityFullName ? (
              <>
                ¿Deseas iniciar la <span className="font-semibold">{subActivityFullName}</span>?
              </>
            ) : (
              <>
                ¿Deseas iniciar la <span className="font-semibold">Sub-actividad {subActivityNumber}</span> de{" "}
                <span className="font-semibold">{activityName}</span>?
              </>
            )}
          </p>

          <p className="text-sm text-gray-600">Esta acción registrará el inicio de la sub-actividad.</p>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="px-6 bg-transparent">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="px-6 bg-green-600 text-white hover:bg-green-700"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
