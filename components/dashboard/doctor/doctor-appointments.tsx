import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Video } from "lucide-react"

export function DoctorAppointments() {
  const appointments = [
    {
      id: "1",
      date: "May 5, 2025",
      time: "9:00 AM",
      patient: "John Doe",
      type: "Follow-up",
      format: "In-person",
      status: "confirmed",
    },
    {
      id: "2",
      date: "May 5, 2025",
      time: "10:00 AM",
      patient: "Sarah Johnson",
      type: "Consultation",
      format: "Video",
      status: "confirmed",
    },
    {
      id: "3",
      date: "May 5, 2025",
      time: "11:00 AM",
      patient: "Michael Brown",
      type: "New Patient",
      format: "In-person",
      status: "confirmed",
    },
    {
      id: "4",
      date: "May 6, 2025",
      time: "9:30 AM",
      patient: "Emily Davis",
      type: "Follow-up",
      format: "Video",
      status: "confirmed",
    },
    {
      id: "5",
      date: "May 6, 2025",
      time: "11:30 AM",
      patient: "Robert Wilson",
      type: "Consultation",
      format: "In-person",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Upcoming Appointments</h3>
        <Button asChild>
          <a href="/dashboard/doctor/appointments/manage">Manage Schedule</a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Format</TableHead>
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
              <TableCell>{appointment.patient}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>
                <Badge variant={appointment.format === "Video" ? "outline" : "secondary"}>{appointment.format}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                  {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {appointment.format === "Video" && (
                    <Button variant="outline" size="icon">
                      <Video className="h-4 w-4" />
                      <span className="sr-only">Start Video</span>
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
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
