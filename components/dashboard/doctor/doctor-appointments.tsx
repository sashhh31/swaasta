"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Video } from "lucide-react"

export function DoctorAppointments() {
  const appointments = [
    {
      id: "AP-1001",
      patient: "John Doe",
      date: "May 12, 2025",
      time: "10:00 AM",
      type: "In-person",
      status: "Confirmed",
    },
    {
      id: "AP-1002",
      patient: "Sarah Johnson",
      date: "May 12, 2025",
      time: "11:30 AM",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: "AP-1003",
      patient: "Michael Brown",
      date: "May 12, 2025",
      time: "2:00 PM",
      type: "In-person",
      status: "Confirmed",
    },
    {
      id: "AP-1004",
      patient: "Emily Davis",
      date: "May 13, 2025",
      time: "9:30 AM",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: "AP-1005",
      patient: "Robert Wilson",
      date: "May 13, 2025",
      time: "1:00 PM",
      type: "In-person",
      status: "Confirmed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>You have {appointments.length} upcoming appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patient}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Badge variant={appointment.type === "Video Call" ? "outline" : "secondary"}>
                    {appointment.type === "Video Call" && <Video className="mr-1 h-3 w-3" />}
                    {appointment.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {appointment.type === "Video Call" ? (
                      <Button size="sm" variant="default">
                        Join Call
                      </Button>
                    ) : (
                      <Button size="sm" variant="default">
                        View Details
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
