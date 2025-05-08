import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { RoleHeader } from "@/components/layout/role-header"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })


interface DashboardLayoutProps {
  children: ReactNode
  params: {
    role?: string
  }
}

export const metadata: Metadata = {
  title: "Swaasta | Modern Healthcare Platform",
  description: "Connect with doctors, pharmacies, and labs in one place",
    generator: 'v0.dev'
}

export default function RootLayout({ children, params }: DashboardLayoutProps) {

  const role = (params.role as "admin" | "doctor" | "pharmacy" | "laboratory" | "patient") || "patient"

  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="flex min-h-screen flex-col">
        <RoleHeader role={role} userName={userData.name} userAvatar={userData.avatar} />
        <div className="flex flex-1">
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>        
      </ThemeProvider>
      </body>
    </html>
  )
}
