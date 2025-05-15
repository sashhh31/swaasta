"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, FileText, Video } from "lucide-react"

export default function DoctorAppointmentsPage() {
  const [activeAppointment, setActiveAppointment] = useState<any>(null)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showDoneDialog, setShowDoneDialog] = useState(false)

  const inPersonAppointments = [
    {
      id: "AP-1001",
      patient: "John Doe",
      date: "May 12, 2025",
      time: "10:00 AM",
      type: "In-person",
      status: "Confirmed",
      reason: "Follow-up",
    },
    {
      id: "AP-1003",
      patient: "Michael Brown",
      date: "May 12, 2025",
      time: "2:00 PM",
      type: "In-person",
      status: "Confirmed",
      reason: "New Patient",
    },
    {
      id: "AP-1005",
      patient: "Robert Wilson",
      date: "May 13, 2025",
      time: "1:00 PM",
      type: "In-person",
      status: "Confirmed",
      reason: "Routine Checkup",
    },
  ]

  const videoAppointments = [
    {
      id: "AP-1002",
      patient: "Sarah Johnson",
      date: "May 12, 2025",
      time: "11:30 AM",
      type: "Video Call",
      status: "Confirmed",
      reason: "Consultation",
    },
    {
      id: "AP-1004",
      patient: "Emily Davis",
      date: "May 13, 2025",
      time: "9:30 AM",
      type: "Video Call",
      status: "Confirmed",
      reason: "Follow-up",
    },
  ]

  const handleCancel = (appointment: any) => {
    setActiveAppointment(appointment)
    setShowCancelDialog(true)
  }

  const handleDone = (appointment: any) => {
    setActiveAppointment(appointment)
    setShowDoneDialog(true)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <p className="text-muted-foreground">Manage your upcoming appointments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 in-person, 2 video calls</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10:00 AM</div>
            <p className="text-xs text-muted-foreground">John Doe - Follow-up</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Consultations</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next: 11:30 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due by end of day</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="in-person">In-Person</TabsTrigger>
          <TabsTrigger value="video">Video Calls</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Upcoming Appointments</CardTitle>
              <CardDescription>
                You have {inPersonAppointments.length + videoAppointments.length} upcoming appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...inPersonAppointments, ...videoAppointments]
                    .sort(
                      (a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime(),
                    )
                    .map((appointment) => (
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
                        <TableCell>{appointment.reason}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {appointment.type === "Video Call" ? (
                              <>
                                <Button size="sm" variant="default">
                                  Join Call
                                </Button>
                                <Button size="sm" variant="secondary" onClick={() => handleDone(appointment)}>
                                  Done
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleCancel(appointment)}>
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button size="sm" variant="default">
                                  View Details
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleCancel(appointment)}>
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="in-person" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>In-Person Appointments</CardTitle>
              <CardDescription>You have {inPersonAppointments.length} in-person appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inPersonAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.patient}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.reason}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="default">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleCancel(appointment)}>
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
        </TabsContent>
        <TabsContent value="video" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Call Appointments</CardTitle>
              <CardDescription>You have {videoAppointments.length} video call appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videoAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.patient}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.reason}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="default">
                            Join Call
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => handleDone(appointment)}>
                            Done
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleCancel(appointment)}>
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
        </TabsContent>
      </Tabs>

      {/* Cancel Appointment Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This will process a refund for the patient.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Patient</Label>
                <div className="font-medium">{activeAppointment?.patient}</div>
              </div>
              <div>
                <Label>Appointment ID</Label>
                <div className="font-medium">{activeAppointment?.id}</div>
              </div>
              <div>
                <Label>Date</Label>
                <div className="font-medium">{activeAppointment?.date}</div>
              </div>
              <div>
                <Label>Time</Label>
                <div className="font-medium">{activeAppointment?.time}</div>
              </div>
            </div>
            <div>
              <Label htmlFor="cancel-reason">Reason for cancellation</Label>
              <Textarea id="cancel-reason" placeholder="Please provide a reason for cancellation" />
            </div>
            <div>
              <Label>Refund Details</Label>
              <div className="rounded-md bg-muted p-3 text-sm">
                <p>The patient will be refunded the full appointment fee of $75.00.</p>
                <p className="mt-1 text-muted-foreground">Refunds typically process within 3-5 business days.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Back
            </Button>
            <Button variant="destructive" onClick={() => setShowCancelDialog(false)}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Done Appointment Dialog */}
      <Dialog open={showDoneDialog} onOpenChange={setShowDoneDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Appointment</DialogTitle>
            <DialogDescription>Enter patient information and upload prescription if needed.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="patient-email">Patient Email</Label>
              <Input
                id="patient-email"
                placeholder="patient@example.com"
                defaultValue={`${activeAppointment?.patient.toLowerCase().replace(" ", ".")}@example.com`}
              />
            </div>
            <div>
              <Label htmlFor="patient-notes">Patient Notes</Label>
              <Textarea id="patient-notes" placeholder="Enter notes from the appointment" />
            </div>
            <div>
              <Label htmlFor="prescription">Upload Prescription (PDF/Image)</Label>
              <Input id="prescription" type="file" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="send-pharmacy" className="rounded border-gray-300" />
              <Label htmlFor="send-pharmacy" className="text-sm font-normal">
                Send to pharmacy
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="send-lab" className="rounded border-gray-300" />
              <Label htmlFor="send-lab" className="text-sm font-normal">
                Send to laboratory
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDoneDialog(false)}>
              Skip
            </Button>
            <Button onClick={() => setShowDoneDialog(false)}>Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
