"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"

interface InstantTooltipProps {
  content: ReactNode
  children: ReactNode
  position?: "top" | "right" | "bottom" | "left"
  width?: string
}

export function InstantTooltip({ content, children, position = "right", width = "400px" }: InstantTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      switch (position) {
        case "top":
          top = rect.top + window.scrollY - 10
          left = rect.left + window.scrollX + rect.width / 2
          break
        case "right":
          top = rect.top + window.scrollY + rect.height / 2
          left = rect.right + window.scrollX + 10
          break
        case "bottom":
          top = rect.bottom + window.scrollY + 10
          left = rect.left + window.scrollX + rect.width / 2
          break
        case "left":
          top = rect.top + window.scrollY + rect.height / 2
          left = rect.left + window.scrollX - 10
          break
      }

      setTooltipPosition({ top, left })
      setIsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  // Adjust position after tooltip is rendered to ensure it stays in viewport
  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let adjustedTop = tooltipPosition.top
      let adjustedLeft = tooltipPosition.left

      // Adjust horizontal position if needed
      if (position === "right" && tooltipRect.right > viewportWidth) {
        adjustedLeft = viewportWidth - tooltipRect.width - 10
      } else if (position === "left" && tooltipRect.left < 0) {
        adjustedLeft = 10
      } else if ((position === "top" || position === "bottom") && tooltipRect.right > viewportWidth) {
        adjustedLeft = tooltipPosition.left - (tooltipRect.right - viewportWidth) - 10
      } else if ((position === "top" || position === "bottom") && tooltipRect.left < 0) {
        adjustedLeft = 10
      }

      // Adjust vertical position if needed
      if (position === "bottom" && tooltipRect.bottom > viewportHeight) {
        adjustedTop = viewportHeight - tooltipRect.height - 10
      } else if (position === "top" && tooltipRect.top < 0) {
        adjustedTop = 10
      } else if ((position === "left" || position === "right") && tooltipRect.bottom > viewportHeight) {
        adjustedTop = tooltipPosition.top - (tooltipRect.bottom - viewportHeight) - 10
      } else if ((position === "left" || position === "right") && tooltipRect.top < 0) {
        adjustedTop = 10
      }

      if (adjustedTop !== tooltipPosition.top || adjustedLeft !== tooltipPosition.left) {
        setTooltipPosition({ top: adjustedTop, left: adjustedLeft })
      }
    }
  }, [isVisible, position, tooltipPosition])

  return (
    <div
      ref={triggerRef}
      className="inline-flex items-center cursor-help"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-sm text-gray-800"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            width,
            maxWidth: "90vw",
            maxHeight: "80vh",
            overflowY: "auto",
            transform:
              position === "top"
                ? "translateY(-100%) translateX(-50%)"
                : position === "right"
                  ? "translateY(-50%)"
                  : position === "bottom"
                    ? "translateX(-50%)"
                    : position === "left"
                      ? "translateX(-100%) translateY(-50%)"
                      : "none",
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}
