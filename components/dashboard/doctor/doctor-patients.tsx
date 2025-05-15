"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"

export function DoctorPatients() {
  const patients = [
    {
      id: "PT-1001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      lastVisit: "May 2, 2025",
      condition: "Hypertension",
    },
    {
      id: "PT-1002",
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      lastVisit: "April 28, 2025",
      condition: "Diabetes Type 2",
    },
    {
      id: "PT-1003",
      name: "Michael Brown",
      age: 28,
      gender: "Male",
      lastVisit: "April 25, 2025",
      condition: "Asthma",
    },
    {
      id: "PT-1004",
      name: "Emily Davis",
      age: 52,
      gender: "Female",
      lastVisit: "April 20, 2025",
      condition: "Arthritis",
    },
    {
      id: "PT-1005",
      name: "Robert Wilson",
      age: 39,
      gender: "Male",
      lastVisit: "April 15, 2025",
      condition: "Anxiety",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
        <CardDescription>You have {patients.length} recent patients</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
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
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={patient.name} />
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{patient.name}</div>
                  </div>
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="mr-1 h-3 w-3" />
                      Records
                    </Button>
                    <Button size="sm" variant="default">
                      Schedule
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
