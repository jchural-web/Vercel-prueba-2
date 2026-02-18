"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = Array.from({ length: 30 }, (_, i) => ({
  name: i + 1,
  cantidad: Math.floor(Math.random() * 50) + 50,
}))

export function DataReceivedChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(210, 100%, 55%)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(210, 100%, 55%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "12px" }} />
        <YAxis axisLine={false} tickLine={false} style={{ fontSize: "12px" }} width={40} domain={[0, "dataMax + 10"]} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
        <Tooltip
          formatter={(value) => [`${value} datos`, undefined]}
          labelFormatter={(label) => `Día ${label}`}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        />
        <Area
          type="monotone"
          dataKey="cantidad"
          stroke="hsl(210, 100%, 55%)"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorData)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
