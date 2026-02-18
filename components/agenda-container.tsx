import type React from "react"

interface AgendaContainerProps {
  children: React.ReactNode
  className?: string
  withMaxWidth?: boolean
  withTopPadding?: boolean
  withBottomPadding?: boolean
}

export function AgendaContainer({
  children,
  className = "",
  withMaxWidth = true,
  withTopPadding = true,
  withBottomPadding = true,
}: AgendaContainerProps) {
  return (
    <div
      className={`agenda-container ${className} ${
        withMaxWidth ? "max-w-7xl mx-auto" : ""
      } ${withTopPadding ? "pt-12" : ""} ${withBottomPadding ? "pb-12" : ""}`}
    >
      {children}
    </div>
  )
}

export function AgendaContentContainer({
  children,
  className = "",
  withTopPadding = true,
}: {
  children: React.ReactNode
  className?: string
  withTopPadding?: boolean
}) {
  return <div className={`agenda-content-container ${className} ${withTopPadding ? "pt-8" : ""}`}>{children}</div>
}

export function AgendaTableContainer({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`agenda-table-container ${className}`}>{children}</div>
}
