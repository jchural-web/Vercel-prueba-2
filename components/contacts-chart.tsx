"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Redes Sociales", value: 540 },
  { name: "Página Web", value: 320 },
  { name: "Referidos", value: 210 },
  { name: "Eventos", value: 175 },
]

// Paleta de colores más vibrante
const COLORS = [
  "hsl(262, 80%, 55%)", // Morado principal vibrante
  "hsl(210, 100%, 55%)", // Azul brillante
  "hsl(142, 71%, 45%)", // Verde vibrante
  "hsl(35, 100%, 60%)", // Naranja brillante
]

export function ContactsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelStyle={{ fontSize: "11px", fill: "#fff", fontWeight: "bold" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} contactos`, undefined]}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
