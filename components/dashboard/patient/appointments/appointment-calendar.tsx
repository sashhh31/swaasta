"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Pill, Stethoscope, TestTube } from "lucide-react"

interface AppointmentCalendarProps {
  status: "upcoming" | "past" | "cancelled"
  onAppointmentSelect: (appointmentId: string) => void
}

export function AppointmentCalendar({ status, onAppointmentSelect }: AppointmentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock appointment data
  const allAppointments = [
    {
      id: "apt-1",
      provider: {
        id: "doc-1",
        name: "Dr. Sarah Smith",
        specialty: "Cardiologist",
        type: "doctor",
      },
      date: "2025-05-10",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "confirmed",
    },
    {
      id: "apt-2",
      provider: {
        id: "doc-2",
        name: "Dr. Michael Chen",
        specialty: "Dermatologist",
        type: "doctor",
      },
      date: "2025-05-15",
      time: "2:30 PM",
      type: "In-person",
      status: "confirmed",
    },
    {
      id: "apt-3",
      provider: {
        id: "lab-1",
        name: "LifeCare Laboratory",
        specialty: "Diagnostic Lab",
        type: "laboratory",
      },
      date: "2025-05-22",
      time: "11:15 AM",
      type: "In-person",
      status: "pending",
    },
    {
      id: "apt-4",
      provider: {
        id: "doc-3",
        name: "Dr. Jessica Williams",
        specialty: "Neurologist",
        type: "doctor",
      },
      date: "2025-04-05",
      time: "9:30 AM",
      type: "Video Consultation",
      status: "completed",
    },
    {
      id: "apt-5",
      provider: {
        id: "pharm-1",
        name: "MedPharm Pharmacy",
        specialty: "Retail Pharmacy",
        type: "pharmacy",
      },
      date: "2025-04-10",
      time: "3:00 PM",
      type: "In-person",
      status: "completed",
    },
    {
      id: "apt-6",
      provider: {
        id: "doc-4",
        name: "Dr. Robert Wilson",
        specialty: "Orthopedist",
        type: "doctor",
      },
      date: "2025-04-15",
      time: "1:00 PM",
      type: "In-person",
      status: "cancelled",
    },
  ]

  // Filter appointments based on status
  const filteredAppointments = allAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const matchesStatus =
      (status === "upcoming" &&
        (appointment.status === "confirmed" || appointment.status === "pending") &&
        appointmentDate >= today) ||
      (status === "past" && appointment.status === "completed") ||
      (status === "cancelled" && appointment.status === "cancelled")

    return matchesStatus
  })

  // Get appointments for the selected date
  const selectedDateStr = date ? date.toISOString().split("T")[0] : ""
  const appointmentsForSelectedDate = filteredAppointments.filter((appointment) => appointment.date === selectedDateStr)

  // Function to highlight dates with appointments
  const isDayWithAppointment = (day: Date) => {
    const dayStr = day.toISOString().split("T")[0]
    return filteredAppointments.some((appointment) => appointment.date === dayStr)
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2">
          <div className="p-4 border-r">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto"
              modifiers={{
                appointment: (date) => isDayWithAppointment(date),
              }}
              modifiersStyles={{
                appointment: {
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                },
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-4">
              {date
                ? date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Select a date"}
            </h3>

            {appointmentsForSelectedDate.length === 0 ? (
              <p className="text-sm text-muted-foreground">No appointments scheduled for this date.</p>
            ) : (
              <div className="space-y-4">
                {appointmentsForSelectedDate.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => onAppointmentSelect(appointment.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{appointment.provider.name}</div>
                        <div className="text-sm text-muted-foreground">{appointment.provider.specialty}</div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 ${
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
                      </Badge>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="text-sm">{appointment.time}</div>
                      <div className="text-sm">{appointment.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
