interface NombreYFechaParaChatsProps {
  nombre: string
  fechaUltimoMensaje: string
}

export function NombreYFechaParaChats({ nombre, fechaUltimoMensaje }: NombreYFechaParaChatsProps) {
  return (
    <div className="flex flex-col">
      <div className="font-medium text-base">{nombre}</div>
      <div className="text-xs opacity-90">Fecha de último mensaje: {fechaUltimoMensaje}</div>
    </div>
  )
}
