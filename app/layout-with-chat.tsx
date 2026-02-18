import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ChatInterface from "@/components/chat-interface"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Integra - Plataforma de Gestión",
  description: "Sistema integrado de gestión comercial y académica",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <ChatInterface />
      </body>
    </html>
  )
}
