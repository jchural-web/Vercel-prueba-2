"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Ene",
    actual: 32500,
    anterior: 28000,
  },
  {
    name: "Feb",
    actual: 30000,
    anterior: 25600,
  },
  {
    name: "Mar",
    actual: 27800,
    anterior: 26400,
  },
  {
    name: "Abr",
    actual: 34200,
    anterior: 29800,
  },
  {
    name: "May",
    actual: 39800,
    anterior: 32500,
  },
  {
    name: "Jun",
    actual: 45200,
    anterior: 37600,
  },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={(value) => `S/. ${value.toLocaleString()}`}
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "12px" }}
          width={80}
          domain={[0, "dataMax + 5000"]}
        />
        <Tooltip
          formatter={(value) => [`S/. ${Number(value).toLocaleString()}`, undefined]}
          labelFormatter={(label) => `Mes: ${label}`}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        />
        <Legend />
        <Bar dataKey="actual" name="Año Actual" fill="hsl(262, 80%, 55%)" radius={[6, 6, 0, 0]} barSize={30} />
        <Bar dataKey="anterior" name="Año Anterior" fill="hsl(210, 100%, 65%)" radius={[6, 6, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}
