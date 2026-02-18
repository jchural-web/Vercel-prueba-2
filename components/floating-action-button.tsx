"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare } from "lucide-react"

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-4">
      {isOpen && (
        <>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
            onClick={() => {}}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
            onClick={() => {}}
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg mb-2"
            onClick={() => {}}
          >
            <Phone className="h-5 w-5" />
          </Button>
        </>
      )}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#004fff] hover:bg-blue-700 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        )}
      </Button>
    </div>
  )
}
