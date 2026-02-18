interface DateLabelProps {
  label: string
  date: string
  variant?: "blue" | "yellow" | "green"
}

export function DateLabel({ label, date, variant = "blue" }: DateLabelProps) {
  // Determinar el color basado en el label: F.S debe ser verde, F.C azul
  const actualVariant = label === "F.S" ? "green" : variant

  const variantStyles = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block px-2 py-1 ${variantStyles[actualVariant]} rounded-full text-xs font-medium`}>
        {label}:
      </span>
      <span className="text-sm text-blue-600">{date}</span>
    </div>
  )
}
