import type { ReactNode } from "react"
import { RoleSidebar } from "@/components/layout/role-sidebar"
import { RoleHeader } from "@/components/layout/role-header"
import { SidebarProvider } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  params: {
    role?: string
  }
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  // Get the role from the URL or default to "patient"
  const role = (params.role as "admin" | "doctor" | "pharmacy" | "laboratory" | "patient") || "patient"

  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <RoleHeader role={role} userName={userData.name} userAvatar={userData.avatar} />
        <div className="flex flex-1">
          <RoleSidebar role={role} />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
