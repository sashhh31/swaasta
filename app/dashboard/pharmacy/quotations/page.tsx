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

export default function PharmacyQuotationsPage() {
  const [activeQuotation, setActiveQuotation] = useState<any>(null)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false)

  const quotations = [
    {
      id: "QT-1001",
      patient: "John Doe",
      doctor: "Dr. Smith",
      date: "May 12, 2025",
      status: "Pending",
      items: [
        { name: "Amoxicillin 500mg", quantity: 30 },
        { name: "Ibuprofen 200mg", quantity: 20 },
      ],
    },
    {
      id: "QT-1002",
      patient: "Sarah Johnson",
      doctor: "Dr. Smith",
      date: "May 12, 2025",
      status: "Pending",
      items: [
        { name: "Lisinopril 10mg", quantity: 30 },
        { name: "Atorvastatin 20mg", quantity: 30 },
      ],
    },
    {
      id: "QT-1003",
      patient: "Michael Brown",
      doctor: "Dr. Smith",
      date: "May 11, 2025",
      status: "Pending",
      items: [
        { name: "Albuterol Inhaler", quantity: 1 },
        { name: "Fluticasone Nasal Spray", quantity: 1 },
      ],
    },
    {
      id: "QT-1004",
      patient: "Emily Davis",
      doctor: "Dr. Smith",
      date: "May 10, 2025",
      status: "Quoted",
      items: [
        { name: "Metformin 500mg", quantity: 60 },
        { name: "Glipizide 5mg", quantity: 30 },
      ],
    },
    {
      id: "QT-1005",
      patient: "Robert Wilson",
      doctor: "Dr. Smith",
      date: "May 9, 2025",
      status: "Accepted",
      items: [
        { name: "Sertraline 50mg", quantity: 30 },
        { name: "Alprazolam 0.5mg", quantity: 15 },
      ],
    },
  ]

  const handleViewPrescription = (quotation: any) => {
    setActiveQuotation(quotation)
    setShowPrescriptionDialog(true)
  }

  const handleQuote = (quotation: any) => {
    setActiveQuotation(quotation)
    setShowQuoteDialog(true)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quotation Requests</h2>
        <p className="text-muted-foreground">Manage prescription quotation requests from doctors</p>
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
          <CardTitle>Quotation Requests</CardTitle>
          <CardDescription>
            You have {quotations.filter((q) => q.status === "Pending").length} pending quotation requests
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
                      <Button size="sm" variant="outline" onClick={() => handleViewPrescription(quotation)}>
                        <FileText className="mr-1 h-3 w-3" />
                        View Prescription
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

      {/* View Prescription Dialog */}
      <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
            <DialogDescription>
              Prescription for {activeQuotation?.patient} from {activeQuotation?.doctor}
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
                  <p className="text-sm font-medium">Prescription #{activeQuotation?.id}</p>
                  <p className="text-sm text-muted-foreground">{activeQuotation?.date}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium">Patient: {activeQuotation?.patient}</p>
                <p className="text-sm text-muted-foreground">DOB: 01/15/1980</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Prescribed Medications:</p>
                <ul className="space-y-2">
                  {activeQuotation?.items.map((item: any, index: number) => (
                    <li key={index} className="text-sm border-b pb-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-muted-foreground">Quantity: {item.quantity}</div>
                      <div className="text-muted-foreground">Sig: Take as directed</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm">Notes: Take with food. Avoid alcohol.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrescriptionDialog(false)}>
              Close
            </Button>
            {activeQuotation?.status === "Pending" && (
              <Button
                onClick={() => {
                  setShowPrescriptionDialog(false)
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
            <DialogTitle>Create Quotation</DialogTitle>
            <DialogDescription>
              Provide pricing and delivery information for {activeQuotation?.patient}'s prescription
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Prescription Items</Label>
              <div className="rounded-md border p-3 space-y-3">
                {activeQuotation?.items.map((item: any, index: number) => (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
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
                <Label htmlFor="delivery-fee">Delivery Fee</Label>
                <Input id="delivery-fee" placeholder="₹0.00" />
              </div>
              <div>
                <Label htmlFor="estimated-delivery">Estimated Delivery</Label>
                <Input id="estimated-delivery" type="date" />
              </div>
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
