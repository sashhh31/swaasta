"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Download, MapPin, Pill, Stethoscope, TestTube, Video, X } from "lucide-react"

interface AppointmentListProps {
  status: "upcoming" | "past" | "cancelled"
  onAppointmentSelect: (appointmentId: string) => void
  searchQuery: string
}

export function AppointmentList({ status, onAppointmentSelect, searchQuery }: AppointmentListProps) {
  // Mock appointment data
  const allAppointments = [
    {
      id: "apt-1",
      provider: {
        id: "doc-1",
        name: "Dr. Sarah Smith",
        specialty: "Cardiologist",
        type: "doctor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 10, 2025",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "confirmed",
      location: "Online",
      notes: "Annual heart checkup",
    },
    {
      id: "apt-2",
      provider: {
        id: "doc-2",
        name: "Dr. Michael Chen",
        specialty: "Dermatologist",
        type: "doctor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 15, 2025",
      time: "2:30 PM",
      type: "In-person",
      status: "confirmed",
      location: "123 Medical Ave, New York, NY",
      notes: "Skin condition follow-up",
    },
    {
      id: "apt-3",
      provider: {
        id: "lab-1",
        name: "LifeCare Laboratory",
        specialty: "Diagnostic Lab",
        type: "laboratory",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 22, 2025",
      time: "11:15 AM",
      type: "In-person",
      status: "pending",
      location: "321 Science Dr, New York, NY",
      notes: "Blood work",
    },
    {
      id: "apt-4",
      provider: {
        id: "doc-3",
        name: "Dr. Jessica Williams",
        specialty: "Neurologist",
        type: "doctor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 5, 2025",
      time: "9:30 AM",
      type: "Video Consultation",
      status: "completed",
      location: "Online",
      notes: "Headache consultation",
    },
    {
      id: "apt-5",
      provider: {
        id: "pharm-1",
        name: "MedPharm Pharmacy",
        specialty: "Retail Pharmacy",
        type: "pharmacy",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 10, 2025",
      time: "3:00 PM",
      type: "In-person",
      status: "completed",
      location: "789 Wellness Blvd, New York, NY",
      notes: "Medication consultation",
    },
    {
      id: "apt-6",
      provider: {
        id: "doc-4",
        name: "Dr. Robert Wilson",
        specialty: "Orthopedist",
        type: "doctor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 15, 2025",
      time: "1:00 PM",
      type: "In-person",
      status: "cancelled",
      location: "456 Health St, New York, NY",
      notes: "Knee pain evaluation",
    },
  ]

  // Filter appointments based on status and search query
  const filteredAppointments = allAppointments.filter((appointment) => {
    const matchesStatus =
      (status === "upcoming" &&
        (appointment.status === "confirmed" || appointment.status === "pending") &&
        new Date(appointment.date) >= new Date()) ||
      (status === "past" && appointment.status === "completed") ||
      (status === "cancelled" && appointment.status === "cancelled")

    const matchesSearch =
      searchQuery === "" ||
      appointment.provider.name.toLowerCase().includes(searchQuery) ||
      appointment.provider.specialty.toLowerCase().includes(searchQuery) ||
      appointment.notes.toLowerCase().includes(searchQuery)

    return matchesStatus && matchesSearch
  })

  if (filteredAppointments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            {status === "upcoming" ? (
              <Calendar className="h-6 w-6 text-primary" />
            ) : status === "past" ? (
              <Clock className="h-6 w-6 text-primary" />
            ) : (
              <X className="h-6 w-6 text-primary" />
            )}
          </div>
          <h3 className="text-lg font-medium mb-2">No {status} appointments</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {status === "upcoming"
              ? "You don't have any upcoming appointments scheduled."
              : status === "past"
                ? "You don't have any past appointments."
                : "You don't have any cancelled appointments."}
          </p>
          {status === "upcoming" && (
            <Button asChild>
              <a href="/dashboard/patient/find-services">Book an Appointment</a>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {filteredAppointments.map((appointment) => (
        <Card
          key={appointment.id}
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => onAppointmentSelect(appointment.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={appointment.provider.avatar || "/placeholder.svg"} alt={appointment.provider.name} />
                <AvatarFallback>
                  {appointment.provider.type === "doctor"
                    ? "DR"
                    : appointment.provider.type === "pharmacy"
                      ? "PH"
                      : "LB"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h3 className="font-medium">{appointment.provider.name}</h3>
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 w-fit ${
                      appointment.provider.type === "doctor"
                        ? "text-blue-600 dark:text-blue-400"
                        : appointment.provider.type === "pharmacy"
                          ? "text-green-600 dark:text-green-400"
                          : "text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {appointment.provider.type === "doctor" ? (
                      <Stethoscope className="h-3 w-3" />
                    ) : appointment.provider.type === "pharmacy" ? (
                      <Pill className="h-3 w-3" />
                    ) : (
                      <TestTube className="h-3 w-3" />
                    )}
                    <span className="capitalize">{appointment.provider.type}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{appointment.provider.specialty}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    {appointment.type === "Video Consultation" ? (
                      <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    )}
                    <span>{appointment.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={
                    appointment.status === "confirmed"
                      ? "default"
                      : appointment.status === "pending"
                        ? "secondary"
                        : appointment.status === "completed"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {appointment.status === "confirmed"
                    ? "Confirmed"
                    : appointment.status === "pending"
                      ? "Pending"
                      : appointment.status === "completed"
                        ? "Completed"
                        : "Cancelled"}
                </Badge>
                {appointment.type === "Video Consultation" && appointment.status === "confirmed" && (
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Join
                  </Button>
                )}
                {appointment.status === "confirmed" && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
