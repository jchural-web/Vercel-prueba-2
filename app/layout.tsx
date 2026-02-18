import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"
import { ComentarioActividadButton } from "@/components/comentario-actividad-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Integra CRM - Plataforma de Gestión",
  description: "Plataforma interna de gestión para BSG Institute",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TopBar />
          <div className="grid min-h-[calc(100vh-4rem)] w-full lg:grid-cols-[auto_1fr]">
            <AppSidebar />
            <div className="flex flex-col overflow-auto w-full">
              <main className="flex-1 app-container bg-[#f8faff]">{children}</main>
            </div>
          </div>
        </ThemeProvider>
        <ComentarioActividadButton />
      </body>
    </html>
  )
}
