import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, FileText, Home, MapPin } from "lucide-react"

export function LabAppointments() {
  const appointments = [
    {
      id: "1",
      date: "May 5, 2025",
      time: "9:00 AM",
      patient: "John Doe",
      test: "Blood Test",
      location: "In-lab",
      status: "confirmed",
    },
    {
      id: "2",
      date: "May 5, 2025",
      time: "10:30 AM",
      patient: "Sarah Johnson",
      test: "Blood Sample",
      location: "Home Visit",
      status: "confirmed",
    },
    {
      id: "3",
      date: "May 5, 2025",
      time: "2:00 PM",
      patient: "Michael Brown",
      test: "X-Ray",
      location: "In-lab",
      status: "confirmed",
    },
    {
      id: "4",
      date: "May 6, 2025",
      time: "11:00 AM",
      patient: "Emily Davis",
      test: "MRI Scan",
      location: "In-lab",
      status: "pending",
    },
    {
      id: "5",
      date: "May 6, 2025",
      time: "3:30 PM",
      patient: "Robert Wilson",
      test: "Urine Sample",
      location: "Home Visit",
      status: "confirmed",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Upcoming Appointments</h3>
        <Button asChild>
          <a href="/dashboard/laboratory/appointments/schedule">Schedule New</a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Location</TableHead>
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
              <TableCell>{appointment.test}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {appointment.location === "Home Visit" ? (
                    <Home className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{appointment.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                  {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {appointment.status === "pending" && (
                    <Button variant="outline" size="icon">
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Confirm</span>
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
