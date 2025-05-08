"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Download,
  Edit,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  Pill,
  Stethoscope,
  TestTube,
  Video,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AppointmentDetailProps {
  appointmentId: string
  onClose: () => void
}

export function AppointmentDetail({ appointmentId, onClose }: AppointmentDetailProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false)

  // Mock appointment data
  const appointment = {
    id: appointmentId,
    provider: {
      id:
        appointmentId === "apt-1"
          ? "doc-1"
          : appointmentId === "apt-2"
            ? "doc-2"
            : appointmentId === "apt-3"
              ? "lab-1"
              : appointmentId === "apt-4"
                ? "doc-3"
                : appointmentId === "apt-5"
                  ? "pharm-1"
                  : "doc-4",
      name:
        appointmentId === "apt-1"
          ? "Dr. Sarah Smith"
          : appointmentId === "apt-2"
            ? "Dr. Michael Chen"
            : appointmentId === "apt-3"
              ? "LifeCare Laboratory"
              : appointmentId === "apt-4"
                ? "Dr. Jessica Williams"
                : appointmentId === "apt-5"
                  ? "MedPharm Pharmacy"
                  : "Dr. Robert Wilson",
      specialty:
        appointmentId === "apt-1"
          ? "Cardiologist"
          : appointmentId === "apt-2"
            ? "Dermatologist"
            : appointmentId === "apt-3"
              ? "Diagnostic Lab"
              : appointmentId === "apt-4"
                ? "Neurologist"
                : appointmentId === "apt-5"
                  ? "Retail Pharmacy"
                  : "Orthopedist",
      type:
        appointmentId === "apt-1" || appointmentId === "apt-2" || appointmentId === "apt-4" || appointmentId === "apt-6"
          ? "doctor"
          : appointmentId === "apt-5"
            ? "pharmacy"
            : "laboratory",
      phone: "(555) 123-4567",
      address: "123 Medical Ave, New York, NY",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    date:
      appointmentId === "apt-1"
        ? "May 10, 2025"
        : appointmentId === "apt-2"
          ? "May 15, 2025"
          : appointmentId === "apt-3"
            ? "May 22, 2025"
            : appointmentId === "apt-4"
              ? "April 5, 2025"
              : appointmentId === "apt-5"
                ? "April 10, 2025"
                : "April 15, 2025",
    time:
      appointmentId === "apt-1"
        ? "10:00 AM"
        : appointmentId === "apt-2"
          ? "2:30 PM"
          : appointmentId === "apt-3"
            ? "11:15 AM"
            : appointmentId === "apt-4"
              ? "9:30 AM"
              : appointmentId === "apt-5"
                ? "3:00 PM"
                : "1:00 PM",
    type: appointmentId === "apt-1" || appointmentId === "apt-4" ? "Video Consultation" : "In-person",
    status:
      appointmentId === "apt-1" || appointmentId === "apt-2"
        ? "confirmed"
        : appointmentId === "apt-3"
          ? "pending"
          : appointmentId === "apt-4" || appointmentId === "apt-5"
            ? "completed"
            : "cancelled",
    location:
      appointmentId === "apt-1" || appointmentId === "apt-4"
        ? "Online"
        : appointmentId === "apt-2"
          ? "123 Medical Ave, New York, NY"
          : appointmentId === "apt-3"
            ? "321 Science Dr, New York, NY"
            : appointmentId === "apt-5"
              ? "789 Wellness Blvd, New York, NY"
              : "456 Health St, New York, NY",
    notes:
      appointmentId === "apt-1"
        ? "Annual heart checkup"
        : appointmentId === "apt-2"
          ? "Skin condition follow-up"
          : appointmentId === "apt-3"
            ? "Blood work"
            : appointmentId === "apt-4"
              ? "Headache consultation"
              : appointmentId === "apt-5"
                ? "Medication consultation"
                : "Knee pain evaluation",
    documents: [
      { id: "doc-1", name: "Previous Test Results.pdf", date: "April 2, 2025" },
      { id: "doc-2", name: "Medical History.pdf", date: "April 1, 2025" },
    ],
  }

  const handleCancelAppointment = () => {
    // In a real app, this would send a cancellation request to the server
    setShowCancelDialog(false)
    onClose()
  }

  const handleRescheduleAppointment = () => {
    // In a real app, this would send a reschedule request to the server
    setShowRescheduleDialog(false)
    onClose()
  }

  return (
    <Card className="sticky top-20">
      <CardHeader className="relative pb-2">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-2">
            <AvatarImage src={appointment.provider.avatar || "/placeholder.svg"} alt={appointment.provider.name} />
            <AvatarFallback>
              {appointment.provider.type === "doctor" ? "DR" : appointment.provider.type === "pharmacy" ? "PH" : "LB"}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{appointment.provider.name}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
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
              <span className="capitalize">{appointment.provider.type}</span>
            </Badge>
            <CardDescription>{appointment.provider.specialty}</CardDescription>
          </div>
          <Badge
            className="mt-2"
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
        </div>
      </CardHeader>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-4">
          <TabsContent value="details" className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">Date & Time</div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.date} at {appointment.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{appointment.location}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">Appointment Type</div>
                  <div className="text-sm text-muted-foreground">{appointment.type}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Provider Information</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{appointment.provider.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{appointment.provider.address}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Appointment Notes</h4>
              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Documents</h4>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>

              {appointment.documents.length > 0 ? (
                <div className="space-y-2">
                  {appointment.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.date}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium mb-1">No documents</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    There are no documents attached to this appointment.
                  </p>
                  <Button variant="outline" size="sm">
                    Upload Document
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Add Notes</h4>
                <Textarea placeholder="Add any notes or questions for your appointment..." className="min-h-[100px]" />
                <div className="flex justify-end mt-2">
                  <Button size="sm">Save Notes</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Previous Notes</h4>
                {appointment.status === "completed" ? (
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">Post-Appointment Notes</div>
                      <div className="text-xs text-muted-foreground">{appointment.date}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Follow-up in 3 months. Continue with prescribed medication.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No previous notes available.</p>
                )}
              </div>
            </div>
          </TabsContent>
        </CardContent>

        {(appointment.status === "confirmed" || appointment.status === "pending") && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="w-full" onClick={() => setShowRescheduleDialog(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Reschedule
            </Button>
            <Button variant="destructive" className="w-full ml-2" onClick={() => setShowCancelDialog(true)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </CardFooter>
        )}

        {appointment.status === "confirmed" && appointment.type === "Video Consultation" && (
          <CardFooter className="pt-0">
            <Button className="w-full">
              <Video className="h-4 w-4 mr-2" />
              Join Video Consultation
            </Button>
          </CardFooter>
        )}

        {appointment.status === "completed" && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Summary
            </Button>
            <Button className="w-full ml-2">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Provider
            </Button>
          </CardFooter>
        )}
      </Tabs>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your appointment with {appointment.provider.name} on {appointment.date} at{" "}
              {appointment.time}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cancel-reason">Reason for cancellation</Label>
              <Select>
                <SelectTrigger id="cancel-reason">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schedule-conflict">Schedule conflict</SelectItem>
                  <SelectItem value="feeling-better">Feeling better</SelectItem>
                  <SelectItem value="other-provider">Found another provider</SelectItem>
                  <SelectItem value="other">Other reason</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea placeholder="Additional comments (optional)" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancelAppointment}>
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Select a new date and time for your appointment with {appointment.provider.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select a new date</Label>
              <Calendar
                mode="single"
                className="border rounded-md mt-2"
                disabled={(date) => {
                  // Disable past dates and Sundays
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return date < today || date.getDay() === 0
                }}
              />
            </div>
            <div>
              <Label>Select a new time</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00">9:00 AM</SelectItem>
                  <SelectItem value="9:30">9:30 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="10:30">10:30 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="11:30">11:30 AM</SelectItem>
                  <SelectItem value="1:00">1:00 PM</SelectItem>
                  <SelectItem value="1:30">1:30 PM</SelectItem>
                  <SelectItem value="2:00">2:00 PM</SelectItem>
                  <SelectItem value="2:30">2:30 PM</SelectItem>
                  <SelectItem value="3:00">3:00 PM</SelectItem>
                  <SelectItem value="3:30">3:30 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea placeholder="Reason for rescheduling (optional)" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRescheduleAppointment}>Confirm Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
