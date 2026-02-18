"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Minimize2, Maximize2, Phone, Settings, Clock } from "lucide-react"

interface WavixDialerProps {
  onClose: () => void
}

export function WavixDialer({ onClose }: WavixDialerProps) {
  const [position, setPosition] = useState({ x: window.innerWidth - 350, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [phoneNumber, setPhoneNumber] = useState("")
  const dialerRef = useRef<HTMLDivElement>(null)

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dialerRef.current) {
      const rect = dialerRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleDigitClick = (digit: string) => {
    setPhoneNumber((prev) => prev + digit)
  }

  return (
    <div
      ref={dialerRef}
      className="fixed z-50 bg-white rounded shadow-lg border border-gray-300 w-[280px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Window header */}
      <div
        className="bg-gray-200 px-2 py-1 flex items-center justify-between rounded-t cursor-grab"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-1 text-gray-700" />
          <span className="text-xs text-gray-700">Wavix softphone</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 hover:text-gray-800">
            <Minimize2 className="h-3 w-3" />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Maximize2 className="h-3 w-3" />
          </button>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* URL bar */}
      <div className="bg-gray-100 px-2 py-1 flex items-center text-xs border-b border-gray-300">
        <span className="text-gray-600">api.wavix.com/webrtc/v1...</span>
        <div className="ml-auto">
          <div className="w-4 h-3">
            <div className="bg-green-500 w-1 h-1 rounded-full inline-block"></div>
            <div className="bg-green-500 w-1 h-2 rounded-full inline-block"></div>
            <div className="bg-green-500 w-1 h-3 rounded-full inline-block"></div>
          </div>
        </div>
      </div>

      {/* Phone dialer */}
      <div className="p-4">
        {/* Input field */}
        <div className="mb-4">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter number"
            className="w-full border-b border-gray-300 pb-1 focus:outline-none focus:border-gray-500 text-center"
          />
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { num: "1", letters: "" },
            { num: "2", letters: "ABC" },
            { num: "3", letters: "DEF" },
            { num: "4", letters: "GHI" },
            { num: "5", letters: "JKL" },
            { num: "6", letters: "MNO" },
            { num: "7", letters: "PQRS" },
            { num: "8", letters: "TUV" },
            { num: "9", letters: "WXYZ" },
            { num: "*", letters: "" },
            { num: "0", letters: "space" },
            { num: "#", letters: "" },
          ].map((key, index) => (
            <button
              key={index}
              onClick={() => handleDigitClick(key.num)}
              className="bg-gray-100 hover:bg-gray-200 rounded-full w-14 h-14 flex flex-col items-center justify-center mx-auto"
            >
              <span className="text-xl font-medium text-gray-800">{key.num}</span>
              {key.letters && <span className="text-[10px] text-gray-500">{key.letters}</span>}
            </button>
          ))}
        </div>

        {/* Call button */}
        <div className="flex justify-center mb-2">
          <button className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center">
            <Phone className="h-6 w-6" />
          </button>
        </div>

        {/* Bottom icons */}
        <div className="flex justify-between px-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Settings className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Phone className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Clock className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
