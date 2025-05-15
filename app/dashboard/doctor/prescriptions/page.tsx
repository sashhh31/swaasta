"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DoctorPrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [activePrescription, setActivePrescription] = useState<any>(null)

  // Mock prescriptions data
  const prescriptions = [
    {
      id: "PRES-1001",
      patient: "John Doe",
      date: "May 12, 2025",
      status: "Active",
      medications: [
        { name: "Amoxicillin 500mg", dosage: "1 tablet", frequency: "Three times daily", duration: "7 days" },
        { name: "Ibuprofen 200mg", dosage: "1 tablet", frequency: "As needed", duration: "5 days" },
      ],
      notes: "Take with food. Avoid alcohol.",
    },
    {
      id: "PRES-1002",
      patient: "Sarah Johnson",
      date: "May 11, 2025",
      status: "Completed",
      medications: [
        { name: "Lisinopril 10mg", dosage: "1 tablet", frequency: "Once daily", duration: "30 days" },
        { name: "Atorvastatin 20mg", dosage: "1 tablet", frequency: "Once daily", duration: "30 days" },
      ],
      notes: "Take Lisinopril in the morning. Take Atorvastatin at bedtime.",
    },
    {
      id: "PRES-1003",
      patient: "Michael Brown",
      date: "May 10, 2025",
      status: "Active",
      medications: [
        { name: "Albuterol Inhaler", dosage: "2 puffs", frequency: "Every 4-6 hours", duration: "30 days" },
        { name: "Fluticasone Nasal Spray", dosage: "2 sprays", frequency: "Once daily", duration: "30 days" },
      ],
      notes: "Use inhaler before exercise. Shake well before use.",
    },
  ]

  const handleCreatePrescription = () => {
    // In a real app, this would create a new prescription
    setShowCreateDialog(false)
  }

  const handleViewPrescription = (prescription: any) => {
    setActivePrescription(prescription)
    setShowViewDialog(true)
  }

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    return (
      prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Prescriptions</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Prescription
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prescription List</CardTitle>
          <CardDescription>Manage and view all patient prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prescription ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.id}</TableCell>
                  <TableCell>{prescription.patient}</TableCell>
                  <TableCell>{prescription.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={prescription.status === "Active" ? "default" : "secondary"}
                    >
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewPrescription(prescription)}
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Prescription Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Prescription</DialogTitle>
            <DialogDescription>
              Enter the prescription details for your patient
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient">Patient Name</Label>
                <Input id="patient" placeholder="Enter patient name" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>

            <div>
              <Label>Medications</Label>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="medication">Medication Name</Label>
                    <Input id="medication" placeholder="e.g., Amoxicillin 500mg" />
                  </div>
                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input id="dosage" placeholder="e.g., 1 tablet" />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input id="frequency" placeholder="e.g., Three times daily" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g., 7 days" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Add Another Medication
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional instructions or notes"
                className="h-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePrescription}>Create Prescription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Prescription Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
            <DialogDescription>
              Prescription for {activePrescription?.patient}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prescription ID</Label>
                <p className="text-sm text-muted-foreground">{activePrescription?.id}</p>
              </div>
              <div>
                <Label>Date</Label>
                <p className="text-sm text-muted-foreground">{activePrescription?.date}</p>
              </div>
              <div>
                <Label>Patient</Label>
                <p className="text-sm text-muted-foreground">{activePrescription?.patient}</p>
              </div>
              <div>
                <Label>Status</Label>
                <Badge
                  variant={activePrescription?.status === "Active" ? "default" : "secondary"}
                >
                  {activePrescription?.status}
                </Badge>
              </div>
            </div>

            <div>
              <Label>Medications</Label>
              <div className="space-y-4 mt-2">
                {activePrescription?.medications.map((medication: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="font-medium">{medication.name}</div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Dosage:</span> {medication.dosage}
                      </div>
                      <div>
                        <span className="font-medium">Frequency:</span> {medication.frequency}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> {medication.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Additional Notes</Label>
              <p className="text-sm text-muted-foreground mt-1">{activePrescription?.notes}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            <Button variant="default">Print Prescription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
