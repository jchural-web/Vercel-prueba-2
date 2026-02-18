"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { EmailTemplateModal } from "@/components/email-template-modal"
import { EmailEditorModal } from "@/components/email-editor-modal"

interface EmailModalContextType {
  openTemplateModal: (recipientEmail: string) => void
}

const EmailModalContext = createContext<EmailModalContextType | undefined>(undefined)

export function EmailModalProvider({ children }: { children: ReactNode }) {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [isEmailEditorOpen, setIsEmailEditorOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")

  const openTemplateModal = (email: string) => {
    setRecipientEmail(email)
    setIsTemplateModalOpen(true)
  }

  const handleTemplateSelected = (template: string) => {
    setSelectedTemplate(template)
    setIsTemplateModalOpen(false)
    setIsEmailEditorOpen(true)
  }

  const handleCloseEmailEditor = () => {
    setIsEmailEditorOpen(false)
    setSelectedTemplate("")
  }

  return (
    <EmailModalContext.Provider value={{ openTemplateModal }}>
      {children}
      <EmailTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleTemplateSelected}
      />
      <EmailEditorModal
        isOpen={isEmailEditorOpen}
        onClose={handleCloseEmailEditor}
        templateName={selectedTemplate}
        recipientEmail={recipientEmail}
      />
    </EmailModalContext.Provider>
  )
}

export function useEmailModal() {
  const context = useContext(EmailModalContext)
  if (context === undefined) {
    throw new Error("useEmailModal must be used within an EmailModalProvider")
  }
  return context
}
