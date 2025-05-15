"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { FileText, Search } from "lucide-react"

export default function LaboratoryQuotationsPage() {
  const [activeQuotation, setActiveQuotation] = useState<any>(null)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)
  const [showReferralDialog, setShowReferralDialog] = useState(false)

  const quotations = [
    {
      id: "QT-2001",
      patient: "John Doe",
      doctor: "Dr. Smith",
      date: "May 12, 2025",
      status: "Pending",
      tests: [
        { name: "Complete Blood Count (CBC)", type: "Blood" },
        { name: "Lipid Panel", type: "Blood" },
      ],
    },
    {
      id: "QT-2002",
      patient: "Sarah Johnson",
      doctor: "Dr. Smith",
      date: "May 12, 2025",
      status: "Pending",
      tests: [
        { name: "Thyroid Function Test", type: "Blood" },
        { name: "Vitamin D Level", type: "Blood" },
      ],
    },
    {
      id: "QT-2003",
      patient: "Michael Brown",
      doctor: "Dr. Smith",
      date: "May 11, 2025",
      status: "Pending",
      tests: [
        { name: "Chest X-Ray", type: "Imaging" },
        { name: "Pulmonary Function Test", type: "Respiratory" },
      ],
    },
    {
      id: "QT-2004",
      patient: "Emily Davis",
      doctor: "Dr. Smith",
      date: "May 10, 2025",
      status: "Quoted",
      tests: [
        { name: "Glucose Tolerance Test", type: "Blood" },
        { name: "HbA1c", type: "Blood" },
      ],
    },
    {
      id: "QT-2005",
      patient: "Robert Wilson",
      doctor: "Dr. Smith",
      date: "May 9, 2025",
      status: "Accepted",
      tests: [
        { name: "MRI - Brain", type: "Imaging" },
        { name: "EEG", type: "Neurological" },
      ],
    },
  ]

  const handleViewReferral = (quotation: any) => {
    setActiveQuotation(quotation)
    setShowReferralDialog(true)
  }

  const handleQuote = (quotation: any) => {
    setActiveQuotation(quotation)
    setShowQuoteDialog(true)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Test Quotation Requests</h2>
        <p className="text-muted-foreground">Manage laboratory test quotation requests from doctors</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search quotations..." className="w-full pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Quotation Requests</CardTitle>
          <CardDescription>
            You have {quotations.filter((q) => q.status === "Pending").length} pending test quotation requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell className="font-medium">{quotation.id}</TableCell>
                  <TableCell>{quotation.patient}</TableCell>
                  <TableCell>{quotation.doctor}</TableCell>
                  <TableCell>{quotation.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        quotation.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : quotation.status === "Quoted"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-green-50 text-green-700 border-green-200"
                      }
                    >
                      {quotation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewReferral(quotation)}>
                        <FileText className="mr-1 h-3 w-3" />
                        View Referral
                      </Button>
                      {quotation.status === "Pending" && (
                        <>
                          <Button size="sm" variant="default" onClick={() => handleQuote(quotation)}>
                            Quote
                          </Button>
                          <Button size="sm" variant="ghost">
                            Ignore
                          </Button>
                        </>
                      )}
                      {quotation.status === "Quoted" && (
                        <Button size="sm" variant="secondary">
                          Edit Quote
                        </Button>
                      )}
                      {quotation.status === "Accepted" && (
                        <Button size="sm" variant="secondary">
                          View Order
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Referral Dialog */}
      <Dialog open={showReferralDialog} onOpenChange={setShowReferralDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Test Referral Details</DialogTitle>
            <DialogDescription>
              Test referral for {activeQuotation?.patient} from {activeQuotation?.doctor}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="rounded-md border p-4">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{activeQuotation?.doctor}</h3>
                  <p className="text-sm text-muted-foreground">Medical License #: 12345678</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Referral #{activeQuotation?.id}</p>
                  <p className="text-sm text-muted-foreground">{activeQuotation?.date}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium">Patient: {activeQuotation?.patient}</p>
                <p className="text-sm text-muted-foreground">DOB: 01/15/1980</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Requested Tests:</p>
                <ul className="space-y-2">
                  {activeQuotation?.tests.map((test: any, index: number) => (
                    <li key={index} className="text-sm border-b pb-2">
                      <div className="font-medium">{test.name}</div>
                      <div className="text-muted-foreground">Type: {test.type}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm">
                  Clinical Information: Patient presenting with fatigue and weight changes. Please evaluate thyroid
                  function.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReferralDialog(false)}>
              Close
            </Button>
            {activeQuotation?.status === "Pending" && (
              <Button
                onClick={() => {
                  setShowReferralDialog(false)
                  handleQuote(activeQuotation)
                }}
              >
                Create Quote
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Test Quotation</DialogTitle>
            <DialogDescription>
              Provide pricing and scheduling information for {activeQuotation?.patient}'s tests
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Requested Tests</Label>
              <div className="rounded-md border p-3 space-y-3">
                {activeQuotation?.tests.map((test: any, index: number) => (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <p className="text-sm font-medium">{test.name}</p>
                      <p className="text-xs text-muted-foreground">Type: {test.type}</p>
                    </div>
                    <div>
                      <Label htmlFor={`price-${index}`} className="text-xs">
                        Price
                      </Label>
                      <Input id={`price-${index}`} placeholder="₹0.00" className="h-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="available-date">Available Date</Label>
                <Input id="available-date" type="date" />
              </div>
              <div>
                <Label htmlFor="available-time">Available Time</Label>
                <Input id="available-time" type="time" />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Test Location</Label>
              <select
                id="location"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="lab">Laboratory (Main Branch)</option>
                <option value="home">Home Visit</option>
                <option value="clinic">Clinic Collection</option>
              </select>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any additional information for the patient" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQuoteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowQuoteDialog(false)}>Send Quotation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
