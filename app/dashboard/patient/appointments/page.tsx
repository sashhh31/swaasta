"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  Filter,
  Plus,
  Search,
  LayoutGrid,
  X,
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Bell,
  Calendar,
  FileText,
  Video,
  MapPin,
  AlertCircle,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// --- Mock/Placeholder Components for Appointments ---
interface Appointment {
  id: string
  patientName: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: "upcoming" | "past" | "cancelled"
  reason?: string
  notes?: string
  type?: "in-person" | "video" | "phone"
  location?: string
  duration?: string
}

const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    patientName: "Alice Wonderland",
    doctorName: "Dr. Emily Carter",
    specialty: "Cardiology",
    date: "2025-05-15",
    time: "10:00 AM",
    status: "upcoming",
    reason: "Annual Checkup, feeling slight chest discomfort.",
    type: "in-person",
    location: "Mercy Hospital, Room 305",
    duration: "45 min",
  },
  {
    id: "apt2",
    patientName: "Bob The Builder",
    doctorName: "Dr. John Smith",
    specialty: "Pediatrics",
    date: "2025-05-20",
    time: "02:30 PM",
    status: "upcoming",
    reason: "Vaccination for child.",
    type: "in-person",
    location: "Children's Clinic, Floor 2",
    duration: "30 min",
  },
  {
    id: "apt3",
    patientName: "Charlie Brown",
    doctorName: "Dr. Lisa Ray",
    specialty: "Dermatology",
    date: "2025-04-10",
    time: "09:00 AM",
    status: "past",
    reason: "Skin rash",
    notes: "Prescribed new cream. Follow up if no improvement in 2 weeks.",
    type: "video",
    duration: "20 min",
  },
  {
    id: "apt4",
    patientName: "Diana Prince",
    doctorName: "Dr. Emily Carter",
    specialty: "Cardiology",
    date: "2025-04-25",
    time: "11:30 AM",
    status: "cancelled",
    reason: "Rescheduled to a later date due to work conflict.",
    type: "phone",
    duration: "15 min",
  },
  {
    id: "apt5",
    patientName: "Edward Scissorhands",
    doctorName: "Dr. Fix It",
    specialty: "Orthopedics",
    date: "2025-05-18",
    time: "03:00 PM",
    status: "upcoming",
    reason: "Follow-up on hand injury assessment.",
    type: "in-person",
    location: "Ortho Center, Suite 12",
    duration: "40 min",
  },
  {
    id: "apt6",
    patientName: "Alice Wonderland",
    doctorName: "Dr. John Smith",
    specialty: "Pediatrics",
    date: "2025-03-01",
    time: "01:00 PM",
    status: "past",
    reason: "Childs Fever",
    notes: "Cleared for school activities. Viral infection, resolved.",
    type: "in-person",
    location: "Children's Clinic, Floor 2",
    duration: "30 min",
  },
  {
    id: "apt7",
    patientName: "Charlie Brown",
    doctorName: "Dr. Emily Carter",
    specialty: "Cardiology",
    date: "2025-05-28",
    time: "09:30 AM",
    status: "upcoming",
    reason: "ECG Test requested by primary physician.",
    type: "in-person",
    location: "Cardio Institute, Room 210",
    duration: "60 min",
  },
]

// Helper function to get status colors
const getStatusConfig = (status: string) => {
  switch (status) {
    case "upcoming":
      return {
        variant: "default",
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500",
        borderColor: "border-emerald-500",
      }
    case "past":
      return {
        variant: "secondary",
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        color: "text-violet-500",
        bgColor: "bg-violet-500",
        borderColor: "border-violet-500",
      }
    case "cancelled":
      return {
        variant: "destructive",
        icon: <XCircle className="w-3 h-3 mr-1" />,
        color: "text-rose-500",
        bgColor: "bg-rose-500",
        borderColor: "border-rose-500",
      }
    default:
      return {
        variant: "outline",
        icon: null,
        color: "text-muted-foreground",
        bgColor: "bg-muted",
        borderColor: "border-muted",
      }
  }
}

// Helper function to get appointment type icon
const getAppointmentTypeIcon = (type?: string) => {
  switch (type) {
    case "video":
      return <Video className="w-4 h-4 text-cyan-500" />
    case "phone":
      return <Bell className="w-4 h-4 text-purple-500" />
    case "in-person":
    default:
      return <MapPin className="w-4 h-4 text-emerald-500" />
  }
}

// Empty state component
const EmptyState = ({ type, query = "" }: { type: string; query?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="bg-primary/10 rounded-full p-6 mb-4">
      {type === "search" ? (
        <Search className="w-10 h-10 text-primary" />
      ) : (
        <Calendar className="w-10 h-10 text-primary" />
      )}
    </div>
    <h3 className="text-xl font-medium mb-2">
      {type === "search" ? `No results found${query ? ` for "${query}"` : ""}` : "No appointments yet"}
    </h3>
    <p className="text-muted-foreground max-w-sm">
      {type === "search"
        ? "Try adjusting your search or filters to find what you're looking for."
        : "Your appointments will appear here once they are scheduled."}
    </p>
    {type !== "search" && (
      <Button className="mt-6" size="lg">
        <Plus className="mr-2 h-4 w-4" /> Schedule New Appointment
      </Button>
    )}
  </div>
)

interface AppointmentListProps {
  status: "upcoming" | "past" | "cancelled"
  onAppointmentSelect: (appointmentId: string) => void
  searchQuery: string
  activeFilters?: Record<string, any>
}

const AppointmentList = ({ status, onAppointmentSelect, searchQuery, activeFilters = {} }: AppointmentListProps) => {
  const filteredAppointments = useMemo(
    () =>
      mockAppointments.filter(
        (apt) =>
          apt.status === status &&
          (searchQuery === "" ||
            apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (apt.reason && apt.reason.toLowerCase().includes(searchQuery.toLowerCase()))),
      ),
    [status, searchQuery, activeFilters],
  )

  if (filteredAppointments.length === 0) {
    return <EmptyState type={searchQuery ? "search" : "empty"} query={searchQuery} />
  }

  return (
    <div className="space-y-4">
      {status === "upcoming" && filteredAppointments.length > 0 && (
        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-sm text-primary">Your next appointment</h4>
            <p className="text-sm text-primary/80">
              {filteredAppointments[0].doctorName} •{" "}
              {new Date(filteredAppointments[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
              at {filteredAppointments[0].time}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.map((apt) => {
          const statusConfig = getStatusConfig(apt.status)
          return (
            <Card
              key={apt.id}
              className="hover:shadow-md dark:hover:shadow-primary/10 transition-all cursor-pointer border-muted/50 hover:border-primary/30 overflow-hidden"
              onClick={() => onAppointmentSelect(apt.id)}
            >
              <div className={`h-1 w-full ${statusConfig.bgColor}`}></div>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`hidden sm:flex h-12 w-12 rounded-full ${apt.status === "upcoming" ? "bg-primary/10" : apt.status === "past" ? "bg-violet-500/10" : "bg-rose-500/10"} items-center justify-center flex-shrink-0`}
                  >
                    {getAppointmentTypeIcon(apt.type)}
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-medium text-base">{apt.doctorName}</h3>
                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                      </div>

                      <Badge
                        variant={statusConfig.variant as any}
                        className="capitalize text-xs w-fit flex items-center h-5"
                      >
                        {statusConfig.icon} {apt.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarDays className="w-3 h-3 mr-1 flex-shrink-0" />
                        {new Date(apt.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                        {apt.time} • {apt.duration}
                      </div>
                      {apt.location && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          {apt.location}
                        </div>
                      )}
                    </div>

                    {apt.reason && status !== "past" && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                        <span className="font-medium">Reason:</span> {apt.reason}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 px-4 pb-4 flex justify-end">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  {apt.status === "upcoming" ? "View Details" : apt.status === "past" ? "View Summary" : "Reschedule"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

interface AppointmentCalendarProps {
  status: "upcoming" | "past" | "cancelled"
  onAppointmentSelect: (appointmentId: string) => void
  searchQuery: string
}

const AppointmentCalendar = ({ status, onAppointmentSelect, searchQuery }: AppointmentCalendarProps) => {
  const filteredAppointments = useMemo(
    () =>
      mockAppointments.filter(
        (apt) =>
          apt.status === status &&
          (searchQuery === "" ||
            apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.specialty.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    [status, searchQuery],
  )

  // Group appointments by date
  const appointmentsByDate = useMemo(() => {
    const grouped: Record<string, Appointment[]> = {}
    filteredAppointments.forEach((apt) => {
      const date = apt.date
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(apt)
    })
    return grouped
  }, [filteredAppointments])

  // Get date keys and sort them
  const sortedDates = Object.keys(appointmentsByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  if (filteredAppointments.length === 0) {
    return <EmptyState type={searchQuery ? "search" : "empty"} query={searchQuery} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{status.charAt(0).toUpperCase() + status.slice(1)} Appointments</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">May 2025</span>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {sortedDates.map((date) => {
        return (
          <div key={date} className="space-y-2">
            <div className="sticky top-0 bg-background/95 dark:bg-background/95 backdrop-blur-sm z-10 py-2">
              <h3 className="font-medium">
                {new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </h3>
              <Separator className="mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointmentsByDate[date].map((apt) => {
                const statusConfig = getStatusConfig(apt.status)
                return (
                  <Card
                    key={apt.id}
                    className="hover:shadow-md transition-all cursor-pointer border-muted/50 hover:border-primary/30"
                    onClick={() => onAppointmentSelect(apt.id)}
                  >
                    <div className={`h-1 w-full ${statusConfig.bgColor}`}></div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{apt.time}</span>
                        <Badge variant={statusConfig.variant as any} className="capitalize text-xs">
                          {apt.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs flex items-center gap-1 h-5 font-normal">
                          {getAppointmentTypeIcon(apt.type)}
                          <span className="capitalize">{apt.type}</span>
                        </Badge>
                        <span className="text-sm">•</span>
                        <span className="text-sm">{apt.duration}</span>
                      </div>
                      <p className="font-medium">
                        {apt.doctorName} • {apt.specialty}
                      </p>
                      {apt.location && (
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {apt.location}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0 px-4 pb-4 flex justify-end">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface AppointmentDetailProps {
  appointmentId: string
  onClose: () => void
}

const AppointmentDetail = ({ appointmentId, onClose }: AppointmentDetailProps) => {
  const apt = mockAppointments.find((a) => a.id === appointmentId)

  if (!apt)
    return (
      <Card className="h-full shadow-xl border rounded-lg flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Not Found</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="py-6 flex-grow">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p>Appointment details could not be loaded.</p>
          </div>
        </CardContent>
      </Card>
    )

  const statusConfig = getStatusConfig(apt.status)

  return (
    <Card className="h-full shadow-xl border rounded-lg flex flex-col">
      <div className={`h-1.5 w-full ${statusConfig.bgColor}`}></div>
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant={statusConfig.variant as any} className="capitalize text-xs mb-2">
              {apt.status}
            </Badge>
            <CardTitle className="text-xl mb-1">Appointment Details</CardTitle>
            <CardDescription>
              {apt.status === "upcoming"
                ? "Your upcoming appointment information"
                : apt.status === "past"
                  ? "Details from your past visit"
                  : "This appointment was cancelled"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <ScrollArea className="flex-grow">
        <CardContent className="p-4 space-y-6">
          {/* Doctor Information */}
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {apt.doctorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{apt.doctorName}</h3>
              <p className="text-sm text-muted-foreground">{apt.specialty}</p>
              {apt.status === "upcoming" && (
                <Button variant="link" className="p-0 h-auto text-xs text-primary mt-1">
                  View Provider Profile
                </Button>
              )}
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h4 className="text-sm font-medium mb-3">Appointment Information</h4>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span className="font-medium">Date & Time</span>
                </div>
                <p>
                  {new Date(apt.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
                <p>
                  {apt.time} ({apt.duration})
                </p>
              </div>

              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  {getAppointmentTypeIcon(apt.type)}
                  <span className="font-medium">Appointment Type</span>
                </div>
                <p className="capitalize">{apt.type}</p>
                {apt.location && <p className="text-sm mt-1">{apt.location}</p>}
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          {apt.reason && (
            <div>
              <h4 className="text-sm font-medium mb-2">Reason for Visit</h4>
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm whitespace-pre-wrap">{apt.reason}</p>
              </div>
            </div>
          )}

          {/* Doctor's Notes (for past appointments) */}
          {apt.notes && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Doctor's Notes
              </h4>
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm whitespace-pre-wrap">{apt.notes}</p>
              </div>
            </div>
          )}

          {/* Supporting info for upcoming */}
          {apt.status === "upcoming" && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Before Your Visit</h4>
              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-md p-3 text-sm">
                <p className="font-medium text-primary mb-1">Preparation Instructions</p>
                <ul className="list-disc pl-5 text-primary/80 space-y-1">
                  <li>Please arrive 15 minutes before your appointment time</li>
                  <li>Bring a list of current medications</li>
                  <li>Bring your insurance card and ID</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>

      <CardFooter className="border-t p-4">
        {apt.status === "upcoming" && (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              Reschedule
            </Button>
            <Button variant="destructive" className="flex-1">
              Cancel
            </Button>
          </div>
        )}
        {apt.status === "past" && (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button variant="default" className="flex-1">
              Book Follow-up
            </Button>
            <Button variant="outline" className="flex-1">
              Download Records
            </Button>
          </div>
        )}
        {apt.status === "cancelled" && (
          <Button variant="default" className="w-full">
            Book New Appointment
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

const AppointmentFilters = ({ onClose, onApply }: { onClose: () => void; onApply: () => void }) => {
  const specialties = Array.from(new Set(mockAppointments.map((apt) => apt.specialty)))
  const appointmentTypes = ["in-person", "video", "phone"]

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pt-2 pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Filter Appointments</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">Refine your appointment list</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pb-3">
        <div>
          <label htmlFor="dateRange" className="block text-xs font-medium mb-1.5">
            Date Range
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input type="date" id="dateStart" className="pl-9 text-sm h-9" />
            </div>
            <span className="text-muted-foreground">to</span>
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input type="date" id="dateEnd" className="pl-9 text-sm h-9" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="doctor" className="block text-xs font-medium mb-1.5">
            Healthcare Provider
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input type="text" id="doctor" placeholder="Search by name" className="pl-9 text-sm h-9" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5">Specialty</label>
          <div className="grid grid-cols-2 gap-2">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center">
                <input
                  type="checkbox"
                  id={`specialty-${specialty}`}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5">Appointment Type</label>
          <div className="flex flex-wrap gap-2">
            {appointmentTypes.map((type) => (
              <Badge key={type} variant="outline" className="py-1.5 px-3 cursor-pointer hover:bg-muted">
                {getAppointmentTypeIcon(type)}
                <span className="ml-1.5 capitalize">{type}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pb-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Clear All
        </Button>
        <Button size="sm" onClick={onApply}>
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function AppointmentsPage() {
  const [view, setView] = useState<"list" | "calendar">("list")
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming")
  const [isMobileView, setIsMobileView] = useState(false)
  const [activeFilters, setActiveFilters] = useState({})

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024)
    }
    checkMobileView()
    window.addEventListener("resize", checkMobileView)
    return () => window.removeEventListener("resize", checkMobileView)
  }, [])

  const handleAppointmentSelect = (appointmentId: string) => {
    setSelectedAppointment(appointmentId)
    if (isMobileView) {
      document.body.style.overflow = "hidden"
    }
  }

  const handleCloseDetail = () => {
    setSelectedAppointment(null)
    if (isMobileView) {
      document.body.style.overflow = ""
    }
  }

  const toggleFilters = () => setShowFilters(!showFilters)

  const applyFilters = () => {
    // Mock filter application
    setShowFilters(false)
    // Notify user that filters have been applied
  }

  const appointmentCounts = useMemo(() => {
    const counts = {
      upcoming: 0,
      past: 0,
      cancelled: 0,
    }

    mockAppointments.forEach((apt) => {
      counts[apt.status]++
    })

    return counts
  }, [])

  return (
    <div className="space-y-6 w-full bg-gradient-to-b from-background to-background/95">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Appointments</h2>
        <p className="text-muted-foreground">View and manage your medical appointments</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1 space-y-4">
          <Card className="border-muted/50">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search appointments..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  <Button size="sm" className="flex items-center gap-1 bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    Schedule
                  </Button>
                  <div className="bg-muted rounded-md p-0.5 flex items-center">
                    <Button
                      variant={view === "list" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-sm h-8 px-3"
                      onClick={() => setView("list")}
                    >
                      <LayoutGrid className="h-3.5 w-3.5 mr-1.5" /> List
                    </Button>
                    <Button
                      variant={view === "calendar" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-sm h-8 px-3"
                      onClick={() => setView("calendar")}
                    >
                      <CalendarIcon className="h-3.5 w-3.5 mr-1.5" /> Calendar
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            {showFilters && (
              <div className="px-4 pb-3">
                <AppointmentFilters onClose={() => setShowFilters(false)} onApply={applyFilters} />
              </div>
            )}
          </Card>

          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="upcoming" className="relative data-[state=active]:bg-transparent">
                Upcoming
                {appointmentCounts.upcoming > 0 && (
                  <span className="ml-1.5 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                    {appointmentCounts.upcoming}
                  </span>
                )}
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
              </TabsTrigger>
              <TabsTrigger value="past" className="relative data-[state=active]:bg-transparent">
                Past
                {appointmentCounts.past > 0 && (
                  <span className="ml-1.5 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                    {appointmentCounts.past}
                  </span>
                )}
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="relative data-[state=active]:bg-transparent">
                Cancelled
                {appointmentCounts.cancelled > 0 && (
                  <span className="ml-1.5 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                    {appointmentCounts.cancelled}
                  </span>
                )}
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-4">
              {view === "list" ? (
                <AppointmentList
                  status="upcoming"
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                  activeFilters={activeFilters}
                />
              ) : (
                <AppointmentCalendar
                  status="upcoming"
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                />
              )}
            </TabsContent>
            <TabsContent value="past" className="mt-4">
              {view === "list" ? (
                <AppointmentList
                  status="past"
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                  activeFilters={activeFilters}
                />
              ) : (
                <AppointmentCalendar
                  status="past"
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                />
              )}
            </TabsContent>
            <TabsContent value="cancelled" className="mt-4">
              {view === "list" ? (
                <AppointmentList
                  status="cancelled"
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                  activeFilters={activeFilters}
                />
              ) : (
                <AppointmentCalendar
                  status="cancelled"
                  onAppointmentSelect={handleAppointmentSelect}
                  searchQuery={searchQuery}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {selectedAppointment && (
          <div className="w-full md:w-1/3">
            <AppointmentDetail appointmentId={selectedAppointment} onClose={handleCloseDetail} />
          </div>
        )}
      </div>

      {/* Mobile Detail View */}
      {selectedAppointment && isMobileView && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 lg:hidden overflow-auto">
          <AppointmentDetail appointmentId={selectedAppointment} onClose={handleCloseDetail} />
        </div>
      )}
    </div>
  )
}
