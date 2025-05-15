"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  FileText,
  Home,
  Map,
  MessageSquare,
  Settings,
  ShoppingBag,
  Stethoscope,
  User,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()

  // This would be determined by the user's role in a real app
  const userRole = "patient" // patient, doctor, pharmacy, laboratory, admin

  const patientMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/patient",
      icon: Home,
    },
    {
      title: "Find Services",
      href: "/dashboard/patient/find-services",
      icon: Map,
    },
    {
      title: "Appointments",
      href: "/dashboard/dashboard/patient/appointments",
      icon: Calendar,
    },
    {
      title: "Medical Records",
      href: "/dashboard/patient/records",
      icon: FileText,
    },
    {
      title: "Medications",
      href: "/dashboard/patient/medications",
      icon: ShoppingBag,
    },
    {
      title: "Messages",
      href: "/dashboard/patient/messages",
      icon: MessageSquare,
    },
  ]

  const doctorMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/doctor",
      icon: Home,
    },
    {
      title: "Appointments",
      href: "/dashboard/dashboard/doctor/appointments",
      icon: Calendar,
    },
    {
      title: "Patients",
      href: "/dashboard/doctor/patients",
      icon: Users,
    },
    {
      title: "Consultations",
      href: "/dashboard/doctor/consultations",
      icon: Stethoscope,
    },
    {
      title: "Messages",
      href: "/dashboard/doctor/messages",
      icon: MessageSquare,
    },
  ]

  const pharmacyMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/pharmacy",
      icon: Home,
    },
    {
      title: "Inventory",
      href: "/dashboard/pharmacy/inventory",
      icon: ShoppingBag,
    },
    {
      title: "Orders",
      href: "/dashboard/pharmacy/order",
      icon: FileText,
    },
    {
      title: "Customers",
      href: "/dashboard/pharmacy/customers",
      icon: Users,
    },
    {
      title: "Messages",
      href: "/dashboard/pharmacy/messages",
      icon: MessageSquare,
    },
  ]

  const laboratoryMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/laboratory",
      icon: Home,
    },
    {
      title: "Test Appointments",
      href: "/dashboard/laboratory/appointments",
      icon: Calendar,
    },
    {
      title: "Reports",
      href: "/dashboard/laboratory/reports",
      icon: FileText,
    },
    {
      title: "Inventory",
      href: "/dashboard/laboratory/inventory",
      icon: ShoppingBag,
    },
    {
      title: "Messages",
      href: "/dashboard/laboratory/messages",
      icon: MessageSquare,
    },
  ]

  const adminMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: Home,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Approvals",
      href: "/dashboard/admin/approvals",
      icon: FileText,
    },
    {
      title: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ]

  // Select menu items based on user role
  let menuItems
  let roleLabel

  switch (userRole) {
    case "doctor":
      menuItems = doctorMenuItems
      roleLabel = "Doctor Dashboard"
      break
    case "pharmacy":
      menuItems = pharmacyMenuItems
      roleLabel = "Pharmacy Dashboard"
      break
    case "laboratory":
      menuItems = laboratoryMenuItems
      roleLabel = "Laboratory Dashboard"
      break
    case "admin":
      menuItems = adminMenuItems
      roleLabel = "Admin Dashboard"
      break
    default:
      menuItems = patientMenuItems
      roleLabel = "Patient Dashboard"
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="font-semibold">{roleLabel}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
