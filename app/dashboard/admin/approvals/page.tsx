"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Eye, Filter, Pill, Search, Stethoscope, TestTube, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState<string | null>(null)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  // Mock data for approvals
  const approvals = [
    {
      id: "1",
      name: "Dr. John Smith",
      email: "john.smith@example.com",
      type: "doctor",
      specialty: "Cardiologist",
      submittedDate: "May 3, 2025",
      documents: 3,
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "MedPharm Pharmacy",
      email: "info@medpharm.com",
      type: "pharmacy",
      specialty: "Retail Pharmacy",
      submittedDate: "May 2, 2025",
      documents: 4,
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      type: "doctor",
      specialty: "Dermatologist",
      submittedDate: "May 2, 2025",
      documents: 3,
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "LifeCare Laboratory",
      email: "contact@lifecarelab.com",
      type: "laboratory",
      specialty: "Diagnostic Lab",
      submittedDate: "May 1, 2025",
      documents: 5,
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Dr. Michael Chen",
      email: "michael.chen@example.com",
      type: "doctor",
      specialty: "Neurologist",
      submittedDate: "April 30, 2025",
      documents: 3,
      status: "approved",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "QuickMeds Pharmacy",
      email: "info@quickmeds.com",
      type: "pharmacy",
      specialty: "Online Pharmacy",
      submittedDate: "April 28, 2025",
      documents: 4,
      status: "rejected",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter approvals based on search query
  const filteredApprovals = approvals.filter((approval) => {
    if (searchQuery === "") return true
    return (
      approval.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleViewApproval = (id: string) => {
    setSelectedApproval(id)
  }

  const handleApprove = () => {
    // In a real app, this would send an API request to approve the provider
    setShowApprovalDialog(false)
    setSelectedApproval(null)
  }

  const handleReject = () => {
    // In a real app, this would send an API request to reject the provider
    setShowRejectDialog(false)
    setSelectedApproval(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Service Provider Approvals</h2>
        <p className="text-muted-foreground">Review and manage service provider applications</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, email, or specialty..."
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
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Review and verify service provider applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApprovals
                    .filter((approval) => approval.status === "pending")
                    .map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={approval.avatar || "/placeholder.svg"} alt={approval.name} />
                              <AvatarFallback>
                                {approval.type === "doctor" ? "DR" : approval.type === "pharmacy" ? "PH" : "LB"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{approval.name}</div>
                              <div className="text-sm text-muted-foreground">{approval.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {approval.type === "doctor" ? (
                              <Stethoscope className="h-4 w-4" />
                            ) : approval.type === "pharmacy" ? (
                              <Pill className="h-4 w-4" />
                            ) : (
                              <TestTube className="h-4 w-4" />
                            )}
                            <Badge variant="outline" className="capitalize">
                              {approval.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{approval.specialty}</TableCell>
                        <TableCell>{approval.submittedDate}</TableCell>
                        <TableCell>{approval.documents} files</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewApproval(approval.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-500"
                              onClick={() => {
                                setSelectedApproval(approval.id)
                                setShowApprovalDialog(true)
                              }}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500"
                              onClick={() => {
                                setSelectedApproval(approval.id)
                                setShowRejectDialog(true)
                              }}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
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
        <TabsContent value="approved" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Providers</CardTitle>
              <CardDescription>Service providers that have been approved</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Approved Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApprovals
                    .filter((approval) => approval.status === "approved")
                    .map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={approval.avatar || "/placeholder.svg"} alt={approval.name} />
                              <AvatarFallback>
                                {approval.type === "doctor" ? "DR" : approval.type === "pharmacy" ? "PH" : "LB"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{approval.name}</div>
                              <div className="text-sm text-muted-foreground">{approval.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {approval.type === "doctor" ? (
                              <Stethoscope className="h-4 w-4" />
                            ) : approval.type === "pharmacy" ? (
                              <Pill className="h-4 w-4" />
                            ) : (
                              <TestTube className="h-4 w-4" />
                            )}
                            <Badge variant="outline" className="capitalize">
                              {approval.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{approval.specialty}</TableCell>
                        <TableCell>{approval.submittedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleViewApproval(approval.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Applications</CardTitle>
              <CardDescription>Service provider applications that have been rejected</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Rejected Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApprovals
                    .filter((approval) => approval.status === "rejected")
                    .map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={approval.avatar || "/placeholder.svg"} alt={approval.name} />
                              <AvatarFallback>
                                {approval.type === "doctor" ? "DR" : approval.type === "pharmacy" ? "PH" : "LB"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{approval.name}</div>
                              <div className="text-sm text-muted-foreground">{approval.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {approval.type === "doctor" ? (
                              <Stethoscope className="h-4 w-4" />
                            ) : approval.type === "pharmacy" ? (
                              <Pill className="h-4 w-4" />
                            ) : (
                              <TestTube className="h-4 w-4" />
                            )}
                            <Badge variant="outline" className="capitalize">
                              {approval.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{approval.specialty}</TableCell>
                        <TableCell>{approval.submittedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleViewApproval(approval.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
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

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Service Provider</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this service provider? This will grant them access to the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this application? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="rejection-reason" className="block text-sm font-medium mb-2">
              Reason for rejection
            </label>
            <textarea
              id="rejection-reason"
              className="w-full min-h-[100px] p-2 border rounded-md"
              placeholder="Please provide a reason for rejection..."
            ></textarea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
