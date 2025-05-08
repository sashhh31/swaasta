"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Filter, Search, Video } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null)

  // Mock data for consultations
  const consultations = [
    {
      id: "1",
      patient: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 5, 2025",
      time: "10:00 AM",
      duration: "30 minutes",
      status: "scheduled",
      reason: "Follow-up on medication",
    },
    {
      id: "2",
      patient: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 5, 2025",
      time: "11:30 AM",
      duration: "30 minutes",
      status: "scheduled",
      reason: "Skin rash consultation",
    },
    {
      id: "3",
      patient: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 6, 2025",
      time: "9:00 AM",
      duration: "30 minutes",
      status: "scheduled",
      reason: "Headache and dizziness",
    },
    {
      id: "4",
      patient: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 30, 2025",
      time: "2:00 PM",
      duration: "30 minutes",
      status: "completed",
      reason: "Annual checkup",
    },
    {
      id: "5",
      patient: {
        name: "Robert Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 28, 2025",
      time: "3:30 PM",
      duration: "30 minutes",
      status: "completed",
      reason: "Back pain follow-up",
    },
    {
      id: "6",
      patient: {
        name: "Lisa Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 25, 2025",
      time: "10:30 AM",
      duration: "30 minutes",
      status: "cancelled",
      reason: "Flu symptoms",
    },
  ]

  // Filter consultations based on search query
  const filteredConsultations = consultations.filter((consultation) => {
    if (searchQuery === "") return true
    return (
      consultation.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.reason.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleStartConsultation = (id: string) => {
    setSelectedConsultation(id)
    setShowVideoDialog(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Video Consultations</h2>
        <p className="text-muted-foreground">Manage your video consultations with patients</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by patient name or reason..."
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
              <Button size="sm" className="flex items-center gap-1">
                <Calendar className="h-4 w-4 mr-1" />
                Schedule
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Consultations</CardTitle>
              <CardDescription>Video consultations scheduled with patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations
                    .filter((consultation) => consultation.status === "scheduled")
                    .map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={consultation.patient.avatar || "/placeholder.svg"}
                                alt={consultation.patient.name}
                              />
                              <AvatarFallback>{consultation.patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{consultation.patient.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{consultation.date}</div>
                          <div className="text-sm text-muted-foreground">{consultation.time}</div>
                        </TableCell>
                        <TableCell>{consultation.duration}</TableCell>
                        <TableCell>{consultation.reason}</TableCell>
                        <TableCell>
                          <Badge>Scheduled</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="default" size="sm" onClick={() => handleStartConsultation(consultation.id)}>
                            <Video className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Consultations</CardTitle>
              <CardDescription>Past video consultations with patients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations
                    .filter((consultation) => consultation.status === "completed")
                    .map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={consultation.patient.avatar || "/placeholder.svg"}
                                alt={consultation.patient.name}
                              />
                              <AvatarFallback>{consultation.patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{consultation.patient.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{consultation.date}</div>
                          <div className="text-sm text-muted-foreground">{consultation.time}</div>
                        </TableCell>
                        <TableCell>{consultation.duration}</TableCell>
                        <TableCell>{consultation.reason}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Completed</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            View Summary
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Consultations</CardTitle>
              <CardDescription>Video consultations that were cancelled</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations
                    .filter((consultation) => consultation.status === "cancelled")
                    .map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={consultation.patient.avatar || "/placeholder.svg"}
                                alt={consultation.patient.name}
                              />
                              <AvatarFallback>{consultation.patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{consultation.patient.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{consultation.date}</div>
                          <div className="text-sm text-muted-foreground">{consultation.time}</div>
                        </TableCell>
                        <TableCell>{consultation.duration}</TableCell>
                        <TableCell>{consultation.reason}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Cancelled</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Video Consultation Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Video Consultation</DialogTitle>
            <DialogDescription>
              {selectedConsultation &&
                `Consultation with ${consultations.find((c) => c.id === selectedConsultation)?.patient.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <Video className="h-12 w-12 text-white opacity-50" />
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Video className="h-6 w-6" />
              </Button>
              <Button variant="destructive" size="icon" className="rounded-full h-12 w-12">
                <span className="sr-only">End Call</span>
                <span className="h-6 w-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M22 9.5c0 6.5-5 7.5-5 7.5h-5L2 22V9.5C2 6 5 3 9.5 3h5C19 3 22 6 22 9.5Z" />
                  </svg>
                </span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <span className="sr-only">Mute</span>
                <span className="h-6 w-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVideoDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
