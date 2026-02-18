"use client"

import type React from "react"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  StarOff,
  Paperclip,
  Mail,
  MailOpen,
  FolderOpen,
  ChevronDown,
  AlertCircle,
  Trash2,
  Edit,
  X,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export interface Email {
  id: string
  from: {
    name: string
    email: string
  }
  to: {
    name: string
    email: string
  }[]
  subject: string
  body: string
  date: Date
  read: boolean
  starred: boolean
  hasAttachments: boolean
  labels?: string[]
}

interface EmailListProps {
  emails: Email[]
  folder: string
}

export function EmailList({ emails, folder }: EmailListProps) {
  const router = useRouter()
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [starredEmails, setStarredEmails] = useState<string[]>(
    emails.filter((email) => email.starred).map((email) => email.id),
  )
  const [showActionToolbar, setShowActionToolbar] = useState(false)

  const toggleSelect = (id: string) => {
    const newSelection = selectedEmails.includes(id)
      ? selectedEmails.filter((emailId) => emailId !== id)
      : [...selectedEmails, id]
    setSelectedEmails(newSelection)
    setShowActionToolbar(newSelection.length > 0)
  }

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setStarredEmails((prev) => (prev.includes(id) ? prev.filter((emailId) => emailId !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([])
      setShowActionToolbar(false)
    } else {
      setSelectedEmails(emails.map((email) => email.id))
      setShowActionToolbar(true)
    }
  }

  const markAsRead = () => {
    console.log("Marcar como leído:", selectedEmails)
    // Aquí iría la lógica para marcar como leído
    // Por ahora, simulamos el cambio para demostración
    alert(`Marcando ${selectedEmails.length} correo(s) como leído`)
  }

  const markAsUnread = () => {
    console.log("Marcar como no leído:", selectedEmails)
    // Aquí iría la lógica para marcar como no leído
    // Por ahora, simulamos el cambio para demostración
    alert(`Marcando ${selectedEmails.length} correo(s) como no leído`)
  }

  const deleteEmails = () => {
    console.log("Eliminar correos:", selectedEmails)
    // Aquí iría la lógica para eliminar
    // Por ahora, simulamos el cambio para demostración
    alert(`Eliminando ${selectedEmails.length} correo(s)`)
    setSelectedEmails([])
    setShowActionToolbar(false)
  }

  const moveToFolder = (targetFolder: string) => {
    console.log("Mover a carpeta:", targetFolder, selectedEmails)
    // Aquí iría la lógica para mover a carpeta
    // Por ahora, simulamos el cambio para demostración
    alert(`Moviendo ${selectedEmails.length} correo(s) a la carpeta ${targetFolder}`)
    setSelectedEmails([])
    setShowActionToolbar(false)
  }

  const openEmail = (id: string) => {
    router.push(`/correos/${folder}/${id}`)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        {showActionToolbar ? (
          <div className="flex items-center justify-between p-3 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedEmails.length === emails.length && emails.length > 0}
                onCheckedChange={selectAll}
                className="mr-2"
              />
              <span className="text-sm font-medium text-blue-700">
                {selectedEmails.length} seleccionado{selectedEmails.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  markAsRead()
                }}
                className="text-xs flex items-center gap-1"
              >
                <Mail className="h-3 w-3" />
                Marcar leído
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  markAsUnread()
                }}
                className="text-xs flex items-center gap-1"
              >
                <MailOpen className="h-3 w-3" />
                Marcar no leído
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                    <FolderOpen className="h-3 w-3" />
                    Mover a
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem onClick={() => moveToFolder("spam")}>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Spam
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => moveToFolder("papelera")}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Papelera
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => moveToFolder("borradores")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Borradores
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteEmails()
                }}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Eliminar
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedEmails([])
                  setShowActionToolbar(false)
                }}
                className="text-xs"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-gray-50">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedEmails.length === emails.length && emails.length > 0}
                onCheckedChange={selectAll}
              />
              <span className="text-sm text-gray-600 font-medium">
                {emails.length} correo{emails.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Selecciona correos para realizar acciones</span>
            </div>
          </div>
        )}
      </div>

      <div className="divide-y divide-gray-100 overflow-auto flex-1">
        {emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <p className="text-lg font-medium">No hay correos en esta carpeta</p>
            <p className="text-sm">Los correos que recibas aparecerán aquí</p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className={`flex items-start p-4 hover:bg-gray-50 transition-colors ${!email.read ? "bg-[#e6f0ff]" : ""}`}
            >
              {/* Área de selección y estrella - separada del Link */}
              <div className="flex items-center mr-4">
                <div
                  className="mr-2"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <Checkbox
                    checked={selectedEmails.includes(email.id)}
                    onCheckedChange={() => toggleSelect(email.id)}
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleStar(email.id, e)
                  }}
                  className="text-gray-400 hover:text-amber-400"
                >
                  {starredEmails.includes(email.id) ? (
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ) : (
                    <StarOff className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Contenido del correo - clickeable para abrir el correo */}
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openEmail(email.id)}>
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium truncate ${!email.read ? "font-semibold" : ""}`}>
                    {email.from.name}
                  </p>
                  <p className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {formatDistanceToNow(email.date, { addSuffix: true, locale: es })}
                  </p>
                </div>

                <p className={`text-sm truncate mt-1 ${!email.read ? "font-semibold" : ""}`}>{email.subject}</p>

                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-500 truncate flex-1">{email.body.substring(0, 120)}...</p>

                  <div className="flex items-center ml-2">
                    {email.hasAttachments && <Paperclip className="h-4 w-4 text-gray-400 ml-1" />}

                    {email.labels &&
                      email.labels.map((label) => (
                        <Badge key={label} variant="outline" className="ml-1 text-xs">
                          {label}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
