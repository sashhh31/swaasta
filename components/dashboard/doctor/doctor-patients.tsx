import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, MessageSquare } from "lucide-react"

export function DoctorPatients() {
  const patients = [
    {
      id: "1",
      name: "John Doe",
      age: 45,
      lastVisit: "May 1, 2025",
      condition: "Hypertension",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      age: 32,
      lastVisit: "April 28, 2025",
      condition: "Diabetes Type 2",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Michael Brown",
      age: 28,
      lastVisit: "April 25, 2025",
      condition: "Asthma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Emily Davis",
      age: 52,
      lastVisit: "April 22, 2025",
      condition: "Arthritis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Robert Wilson",
      age: 39,
      lastVisit: "April 20, 2025",
      condition: "Anxiety",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Patients</h3>
        <Button asChild>
          <a href="/dashboard/doctor/patients">View All Patients</a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                    <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{patient.name}</div>
                </div>
              </TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.lastVisit}</TableCell>
              <TableCell>{patient.condition}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View Records</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Message</span>
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
