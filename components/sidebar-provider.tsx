"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

type SidebarContextType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  userRole: "doctor" | "pharmacy" | "laboratory" | "patient"
  setUserRole: React.Dispatch<React.SetStateAction<"doctor" | "pharmacy" | "laboratory" | "patient">>
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [userRole, setUserRole] = React.useState<"doctor" | "pharmacy" | "laboratory" | "patient">("doctor")
  const pathname = usePathname()

  // Auto-detect role based on URL path
  React.useEffect(() => {
    if (pathname.includes("/doctor")) {
      setUserRole("doctor")
    } else if (pathname.includes("/pharmacy")) {
      setUserRole("pharmacy")
    } else if (pathname.includes("/laboratory")) {
      setUserRole("laboratory")
    } else if (pathname.includes("/patient")) {
      setUserRole("patient")
    }
  }, [pathname])

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, userRole, setUserRole }}>{children}</SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
