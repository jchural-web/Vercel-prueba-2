"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Calendar, Clock } from "lucide-react"
import { createPortal } from "react-dom"

// Add this style to the component
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

interface DateTimePickerProps {
  id: string
  value: string
  onChange: (value: string) => void
}

export function DateTimePicker({ id, value, onChange }: DateTimePickerProps) {
  const [date, setDate] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM")
  const [showTimePicker, setShowTimePicker] = useState(false)
  const timeInputRef = useRef<HTMLInputElement>(null)

  // Parse initial value into date and time components
  useEffect(() => {
    if (value) {
      try {
        const dateObj = new Date(value)
        if (!isNaN(dateObj.getTime())) {
          setDate(dateObj.toISOString().split("T")[0])

          let hour = dateObj.getHours()
          const isPM = hour >= 12
          hour = hour % 12 || 12 // Convert to 12-hour format

          setHours(hour.toString())
          setMinutes(dateObj.getMinutes().toString().padStart(2, "0"))
          setAmpm(isPM ? "PM" : "AM")
        }
      } catch (e) {
        console.error("Error parsing date:", e)
      }
    }
  }, [value])

  // Format time for display
  const formattedTime = hours && minutes ? `${hours}:${minutes} ${ampm}` : ""

  // Combine date and time when any component changes
  const updateCombinedValue = (dateVal: string, hoursVal: string, minutesVal: string, ampmVal: "AM" | "PM") => {
    if (dateVal && hoursVal && minutesVal) {
      try {
        const hour = Number.parseInt(hoursVal, 10)
        const minute = Number.parseInt(minutesVal, 10)

        // Convert to 24-hour format for Date object
        let hour24 = hour
        if (ampmVal === "PM" && hour !== 12) hour24 = hour + 12
        if (ampmVal === "AM" && hour === 12) hour24 = 0

        const dateObj = new Date(dateVal)
        dateObj.setHours(hour24, minute)
        onChange(dateObj.toISOString())
      } catch (e) {
        console.error("Error updating combined value:", e)
      }
    }
  }

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDate(newDate)
    updateCombinedValue(newDate, hours, minutes, ampm)
  }

  // Handle time picker changes
  const handleHourChange = (newHour: string) => {
    setHours(newHour)
    updateCombinedValue(date, newHour, minutes, ampm)
  }

  const handleMinuteChange = (newMinute: string) => {
    setMinutes(newMinute)
    updateCombinedValue(date, hours, newMinute, ampm)
  }

  const handleAmPmChange = (newAmPm: "AM" | "PM") => {
    setAmpm(newAmPm)
    updateCombinedValue(date, hours, minutes, newAmPm)
  }

  // Handle time input click
  const handleTimeInputClick = () => {
    setShowTimePicker(!showTimePicker)
  }

  // Close time picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".time-picker-container") && !target.closest(".time-input")) {
        setShowTimePicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Generate hour options (1-12)
  const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

  // Generate minute options (00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"))

  return (
    <>
      <style jsx>{scrollbarStyles}</style>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Calendar className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="date"
            id={`${id}-date`}
            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Clock className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            id={`${id}-time`}
            ref={timeInputRef}
            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm time-input"
            value={formattedTime}
            placeholder="--:-- --"
            readOnly
            onClick={handleTimeInputClick}
          />

          {showTimePicker &&
            typeof window !== "undefined" &&
            createPortal(
              <div
                className="fixed z-50 bg-white border rounded-md shadow-lg time-picker-container"
                style={{
                  position: "fixed",
                  top: timeInputRef.current ? timeInputRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
                  left: timeInputRef.current ? timeInputRef.current.getBoundingClientRect().left + window.scrollX : 0,
                  width: "220px",
                  fontSize: "0.75rem",
                }}
              >
                <div className="p-1">
                  <div className="flex text-center mb-1">
                    <div className="flex-1 text-xs font-medium text-gray-500">Hora</div>
                    <div className="flex-1 text-xs font-medium text-gray-500">Minuto</div>
                    <div className="flex-1 text-xs font-medium text-gray-500">AM/PM</div>
                  </div>

                  <div className="flex">
                    {/* Hour selector */}
                    <div className="flex-1 border-r">
                      <div className="h-24 overflow-y-auto custom-scrollbar">
                        {hourOptions.map((hour) => (
                          <div
                            key={hour}
                            className={`py-0.5 px-1 text-center cursor-pointer hover:bg-blue-100 text-xs ${
                              hours === hour ? "bg-blue-500 text-white" : ""
                            }`}
                            onClick={() => handleHourChange(hour)}
                          >
                            {hour}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Minute selector */}
                    <div className="flex-1 border-r">
                      <div className="h-24 overflow-y-auto custom-scrollbar">
                        {minuteOptions.map((minute, index) => (
                          <div
                            key={index}
                            className={`py-0.5 px-1 text-center cursor-pointer hover:bg-blue-100 text-xs ${
                              minutes === minute ? "bg-blue-500 text-white" : ""
                            }`}
                            onClick={() => handleMinuteChange(minute)}
                          >
                            {minute}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AM/PM selector */}
                    <div className="flex-1">
                      <div
                        className={`py-1 text-center cursor-pointer hover:bg-blue-100 text-xs ${
                          ampm === "AM" ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => handleAmPmChange("AM")}
                      >
                        AM
                      </div>
                      <div
                        className={`py-1 text-center cursor-pointer hover:bg-blue-100 text-xs ${
                          ampm === "PM" ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => handleAmPmChange("PM")}
                      >
                        PM
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full mt-1 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                    onClick={() => setShowTimePicker(false)}
                  >
                    Aceptar
                  </button>
                </div>
              </div>,
              document.body,
            )}
        </div>
      </div>
    </>
  )
}
