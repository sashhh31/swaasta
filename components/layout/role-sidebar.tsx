"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  CheckSquare,
  ClipboardList,
  FileText,
  Home,
  MessageSquare,
  Package,
  Pill,
  Settings,
  ShoppingBag,
  Star,
  Stethoscope,
  TestTube,
  Upload,
  User,
  Users,
  Video,
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

interface RoleSidebarProps {
  role: "admin" | "doctor" | "pharmacy" | "laboratory" | "patient"
}

export function RoleSidebar({ role }: RoleSidebarProps) {
  const pathname = usePathname()
  const [roleLabel, setRoleLabel] = useState("")

  useEffect(() => {
    // Set the role label based on the role
    switch (role) {
      case "admin":
        setRoleLabel("Admin Dashboard")
        break
      case "doctor":
        setRoleLabel("Doctor Dashboard")
        break
      case "pharmacy":
        setRoleLabel("Pharmacy Dashboard")
        break
      case "laboratory":
        setRoleLabel("Laboratory Dashboard")
        break
      case "patient":
        setRoleLabel("Patient Dashboard")
        break
      default:
        setRoleLabel("Dashboard")
    }
  }, [role])

  // Define menu items based on role
  const getMenuItems = () => {
    switch (role) {
      case "admin":
        return [
          {
            title: "Dashboard",
            href: "/dashboard/admin",
            icon: Home,
          },
          {
            title: "Approvals",
            href: "/dashboard/admin/approvals",
            icon: CheckSquare,
          },
          {
            title: "Appointments",
            href: "/dashboard/admin/appointments",
            icon: Calendar,
          },
          {
            title: "Complaints & Chat",
            href: "/dashboard/admin/complaints",
            icon: MessageSquare,
          },
          {
            title: "Analytics & Reports",
            href: "/dashboard/admin/analytics",
            icon: BarChart3,
          },
        ]
      case "doctor":
        return [
          {
            title: "Dashboard",
            href: "/dashboard/doctor",
            icon: Home,
          },
          {
            title: "My Appointments",
            href: "/dashboard/doctor/appointments",
            icon: Calendar,
          },
          {
            title: "Video Consultations",
            href: "/dashboard/doctor/consultations",
            icon: Video,
          },
          {
            title: "Patients",
            href: "/dashboard/doctor/patients",
            icon: Users,
          },
          {
            title: "Reviews",
            href: "/dashboard/doctor/reviews",
            icon: Star,
          },
          {
            title: "Profile & Certification",
            href: "/dashboard/doctor/profile",
            icon: User,
          },
        ]
      case "pharmacy":
        return [
          {
            title: "Dashboard",
            href: "/dashboard/pharmacy",
            icon: Home,
          },
          {
            title: "Orders",
            href: "/dashboard/pharmacy/orders",
            icon: ShoppingBag,
          },
          {
            title: "Inventory Management",
            href: "/dashboard/pharmacy/inventory",
            icon: Package,
          },
          {
            title: "Reviews",
            href: "/dashboard/pharmacy/reviews",
            icon: Star,
          },
          {
            title: "Profile & Certification",
            href: "/dashboard/pharmacy/profile",
            icon: User,
          },
        ]
      case "laboratory":
        return [
          {
            title: "Dashboard",
            href: "/dashboard/laboratory",
            icon: Home,
          },
          {
            title: "Appointments",
            href: "/dashboard/laboratory/appointments",
            icon: Calendar,
          },
          {
            title: "Test Uploads",
            href: "/dashboard/laboratory/uploads",
            icon: Upload,
          },
          {
            title: "Inventory",
            href: "/dashboard/laboratory/inventory",
            icon: Package,
          },
          {
            title: "Reviews",
            href: "/dashboard/laboratory/reviews",
            icon: Star,
          },
          {
            title: "Profile & Certification",
            href: "/dashboard/laboratory/profile",
            icon: User,
          },
        ]
      case "patient":
      default:
        return [
          {
            title: "Dashboard",
            href: "/dashboard/patient",
            icon: Home,
          },
          {
            title: "Find Services",
            href: "/dashboard/patient/find-services",
            icon: Stethoscope,
          },
          {
            title: "Appointments",
            href: "/dashboard/patient/appointments",
            icon: Calendar,
          },
          {
            title: "Medical Records",
            href: "/dashboard/patient/medical-records",
            icon: FileText,
          },
          {
            title: "Medications",
            href: "/dashboard/patient/medications",
            icon: Pill,
          },
          {
            title: "Messages",
            href: "/dashboard/patient/messages",
            icon: MessageSquare,
          },
        ]
    }
  }

  const menuItems = getMenuItems()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          {role === "admin" && <ClipboardList className="h-5 w-5" />}
          {role === "doctor" && <Stethoscope className="h-5 w-5" />}
          {role === "pharmacy" && <Pill className="h-5 w-5" />}
          {role === "laboratory" && <TestTube className="h-5 w-5" />}
          {role === "patient" && <User className="h-5 w-5" />}
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
              <Link href={`/dashboard/${role}/settings`}>
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
