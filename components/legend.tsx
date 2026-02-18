interface LegendProps {
  className?: string
  items: {
    label: string
    description: string
    variant: "blue" | "green" | "yellow" | "red" | "purple"
  }[]
}

const variantStyles = {
  blue: "bg-blue-500 text-white border-blue-500",
  green: "bg-green-500 text-white border-green-500",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-500",
  red: "bg-red-50 text-red-700 border-red-500",
  purple: "bg-purple-50 text-purple-700 border-purple-500",
}

export function Legend({ items, className = "" }: LegendProps) {
  return (
    <div
      className={`w-full flex flex-wrap items-center gap-4 px-3 py-2 bg-[#e3f2fd] border-b border-[#b6e0fe] ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              item.label === "F.S" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }`}
          >
            {item.label}
          </span>
          <span className="text-sm text-gray-700">{item.description}</span>
        </div>
      ))}
    </div>
  )
}
