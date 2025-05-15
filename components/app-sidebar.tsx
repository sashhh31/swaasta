"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  ChevronLeft,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  Pill,
  ShoppingCart,
  TestTube,
  User,
  Video,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const { isOpen, setIsOpen, userRole, setUserRole } = useSidebar()
  const pathname = usePathname()

  // For demo purposes - toggle between different roles
  const handleRoleChange = (role: "doctor" | "pharmacy" | "laboratory" | "patient") => {
    setUserRole(role)
  }

  return (
    <>
      {/* Mobile sidebar trigger */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 bg-background border-r transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:relative md:z-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              {userRole === "doctor" && <ClipboardList className="h-6 w-6 text-primary" />}
              {userRole === "pharmacy" && <Pill className="h-6 w-6 text-primary" />}
              {userRole === "laboratory" && <TestTube className="h-6 w-6 text-primary" />}
              {userRole === "patient" && <User className="h-6 w-6 text-primary" />}
              <span className="font-semibold">
                {userRole === "doctor" && "MedAdmin Doctor"}
                {userRole === "pharmacy" && "MedAdmin Pharmacy"}
                {userRole === "laboratory" && "MedAdmin Laboratory"}
                {userRole === "patient" && "MedAdmin Patient"}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-auto py-4 px-3">
            {/* Doctor Navigation */}
            {userRole === "doctor" && (
              <nav className="space-y-1">
                <Link
                  href="/dashboard/doctor"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/dashboard/doctor"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/doctor/appointments"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/dashboard/doctor/appointments"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  Appointments
                </Link>
                <Link
                  href="/dashboard/doctor/video-calls"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/doctor/video-calls"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Video className="h-4 w-4" />
                  Video Calls
                </Link>
                <Link
                  href="/dashboard/doctor/prescriptions"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/doctor/prescriptions"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <FileText className="h-4 w-4" />
                  Prescriptions
                </Link>
              </nav>
            )}

            {/* Pharmacy Navigation */}
            {userRole === "pharmacy" && (
              <nav className="space-y-1">
                <Link
                  href="/pharmacy/dashboard"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/pharmacy/dashboard"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/pharmacy/products"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/dashboard/pharmacy/products"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Pill className="h-4 w-4" />
                  Products
                </Link>
                <Link
                  href="/dashboard/pharmacy/quotations"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/dashboard/pharmacy/quotations"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <FileText className="h-4 w-4" />
                  Quotations
                </Link>
                <Link
                  href="/dashboard/pharmacy/orders"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/dashboard/pharmacy/orders"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                </Link>
              </nav>
            )}

            {/* Laboratory Navigation */}
            {userRole === "laboratory" && (
              <nav className="space-y-1">
                <Link
                  href="/laboratory/dashboard"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/laboratory/dashboard"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/laboratory/quotations"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/laboratory/quotations"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <FileText className="h-4 w-4" />
                  Quotations
                </Link>
                <Link
                  href="/dashboard/laboratory/tests"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/laboratory/tests"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <TestTube className="h-4 w-4" />
                  Tests
                </Link>
              </nav>
            )}

            {/* Patient Navigation */}
            {userRole === "patient" && (
              <nav className="space-y-1">
                <Link
                  href="/patient/dashboard"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/patient/dashboard"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/patient/appointments"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/dashboard/patient/appointments"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  Appointments
                </Link>
                <Link
                  href="/dashboard/patient/quotations"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/dashboard/patient/quotations"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <FileText className="h-4 w-4" />
                  Quotations
                </Link>
                <Link
                  href="/dashboard/patient/orders"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === "/dashboard/patient/orders"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                </Link>
              </nav>
            )}
          </div>

          {/* Footer with user profile */}
          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-start gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>
                      {userRole === "doctor" && "DR"}
                      {userRole === "pharmacy" && "PH"}
                      {userRole === "laboratory" && "LB"}
                      {userRole === "patient" && "PT"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">
                      {userRole === "doctor" && "Dr. Smith"}
                      {userRole === "pharmacy" && "MedPharm"}
                      {userRole === "laboratory" && "MedLab"}
                      {userRole === "patient" && "John Doe"}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleChange("doctor")}>Switch to Doctor</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange("pharmacy")}>Switch to Pharmacy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange("laboratory")}>Switch to Laboratory</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange("patient")}>Switch to Patient</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}
