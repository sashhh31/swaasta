import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Video } from "lucide-react"

export function PatientAppointments() {
  const appointments = [
    {
      id: "1",
      date: "May 10, 2025",
      time: "10:00 AM",
      doctor: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      type: "Video Consultation",
      status: "confirmed",
    },
    {
      id: "2",
      date: "May 15, 2025",
      time: "2:30 PM",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      type: "In-person",
      status: "confirmed",
    },
    {
      id: "3",
      date: "May 22, 2025",
      time: "11:15 AM",
      doctor: "Dr. Jessica Williams",
      specialty: "Neurologist",
      type: "Video Consultation",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Upcoming Appointments</h3>
        <Button asChild>
          <a href="/dashboard/dashboard/patient/appointments/new">
            <Calendar className="mr-2 h-4 w-4" />
            Book New
          </a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="font-medium">{appointment.date}</div>
                <div className="text-sm text-muted-foreground">{appointment.time}</div>
              </TableCell>
              <TableCell>
                <div>{appointment.doctor}</div>
                <div className="text-sm text-muted-foreground">{appointment.specialty}</div>
              </TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>
                <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                  {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {appointment.type === "Video Consultation" && (
                    <Button variant="outline" size="icon">
                      <Video className="h-4 w-4" />
                      <span className="sr-only">Join Video</span>
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
