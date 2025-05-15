"use client"

import { useState } from "react"
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
import { Pill, TestTube } from "lucide-react"

export default function PatientQuotationsPage() {
  const [activeQuotation, setActiveQuotation] = useState<any>(null)
  const [showQuotationDialog, setShowQuotationDialog] = useState(false)

  const pharmacyQuotations = [
    {
      id: "PQ-1001",
      pharmacy: "MedPharm Central",
      date: "May 12, 2025",
      items: [
        { name: "Amoxicillin 500mg", quantity: 30, price: 25.99 },
        { name: "Ibuprofen 200mg", quantity: 20, price: 12.5 },
      ],
      deliveryFee: 5.0,
      estimatedDelivery: "May 14, 2025",
      totalPrice: 43.49,
      status: "Pending",
    },
    {
      id: "PQ-1002",
      pharmacy: "QuickMeds Pharmacy",
      date: "May 12, 2025",
      items: [
        { name: "Amoxicillin 500mg", quantity: 30, price: 28.99 },
        { name: "Ibuprofen 200mg", quantity: 20, price: 10.99 },
      ],
      deliveryFee: 0.0,
      estimatedDelivery: "May 15, 2025",
      totalPrice: 39.98,
      status: "Pending",
    },
    {
      id: "PQ-1003",
      pharmacy: "HealthPlus Pharmacy",
      date: "May 11, 2025",
      items: [
        { name: "Amoxicillin 500mg", quantity: 30, price: 24.5 },
        { name: "Ibuprofen 200mg", quantity: 20, price: 13.99 },
      ],
      deliveryFee: 4.5,
      estimatedDelivery: "May 13, 2025",
      totalPrice: 42.99,
      status: "Pending",
    },
  ]

  const labQuotations = [
    {
      id: "LQ-1001",
      laboratory: "MedLab Diagnostics",
      date: "May 12, 2025",
      tests: [
        { name: "Complete Blood Count (CBC)", price: 45.0 },
        { name: "Lipid Panel", price: 65.0 },
      ],
      availableDate: "May 15, 2025",
      availableTime: "9:00 AM",
      location: "Laboratory (Main Branch)",
      totalPrice: 110.0,
      status: "Pending",
    },
    {
      id: "LQ-1002",
      laboratory: "QuickTest Labs",
      date: "May 12, 2025",
      tests: [
        { name: "Complete Blood Count (CBC)", price: 50.0 },
        { name: "Lipid Panel", price: 60.0 },
      ],
      availableDate: "May 14, 2025",
      availableTime: "2:00 PM",
      location: "Home Visit",
      totalPrice: 130.0, // Includes home visit fee
      status: "Pending",
    },
    {
      id: "LQ-1003",
      laboratory: "PrecisionDiagnostics",
      date: "May 11, 2025",
      tests: [
        { name: "Complete Blood Count (CBC)", price: 48.0 },
        { name: "Lipid Panel", price: 62.0 },
      ],
      availableDate: "May 16, 2025",
      availableTime: "10:30 AM",
      location: "Laboratory (Main Branch)",
      totalPrice: 110.0,
      status: "Pending",
    },
  ]

  const handleViewQuotation = (quotation: any, type: "pharmacy" | "lab") => {
    setActiveQuotation({ ...quotation, type })
    setShowQuotationDialog(true)
  }

  const handleAcceptQuotation = () => {
    setShowQuotationDialog(false)
    // In a real app, this would update the database
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Quotations</h2>
        <p className="text-muted-foreground">Review and accept quotations from pharmacies and laboratories</p>
      </div>

      <Tabs defaultValue="pharmacy">
        <TabsList>
          <TabsTrigger value="pharmacy">Pharmacy Quotations</TabsTrigger>
          <TabsTrigger value="laboratory">Laboratory Quotations</TabsTrigger>
        </TabsList>
        <TabsContent value="pharmacy" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Quotations</CardTitle>
              <CardDescription>You have {pharmacyQuotations.length} pharmacy quotations to review</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pharmacy</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pharmacyQuotations.map((quotation) => (
                    <TableRow key={quotation.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-primary" />
                          {quotation.pharmacy}
                        </div>
                      </TableCell>
                      <TableCell>{quotation.date}</TableCell>
                      <TableCell>{quotation.items.length} items</TableCell>
                      <TableCell>{quotation.estimatedDelivery}</TableCell>
                      <TableCell>${quotation.totalPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewQuotation(quotation, "pharmacy")}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleViewQuotation(quotation, "pharmacy")}
                          >
                            Accept
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
        <TabsContent value="laboratory" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Quotations</CardTitle>
              <CardDescription>You have {labQuotations.length} laboratory quotations to review</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Laboratory</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Tests</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labQuotations.map((quotation) => (
                    <TableRow key={quotation.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <TestTube className="h-4 w-4 text-primary" />
                          {quotation.laboratory}
                        </div>
                      </TableCell>
                      <TableCell>{quotation.date}</TableCell>
                      <TableCell>{quotation.tests.length} tests</TableCell>
                      <TableCell>{quotation.availableDate}</TableCell>
                      <TableCell>${quotation.totalPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewQuotation(quotation, "lab")}>
                            View Details
                          </Button>
                          <Button size="sm" variant="default" onClick={() => handleViewQuotation(quotation, "lab")}>
                            Accept
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

      {/* Quotation Details Dialog */}
      <Dialog open={showQuotationDialog} onOpenChange={setShowQuotationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {activeQuotation?.type === "pharmacy" ? "Pharmacy Quotation Details" : "Laboratory Quotation Details"}
            </DialogTitle>
            <DialogDescription>
              {activeQuotation?.type === "pharmacy"
                ? `Quotation from ${activeQuotation?.pharmacy}`
                : `Quotation from ${activeQuotation?.laboratory}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {activeQuotation?.type === "pharmacy" ? (
              <>
                <div>
                  <h3 className="text-sm font-medium mb-2">Prescribed Medications:</h3>
                  <div className="rounded-md border p-3 space-y-3">
                    {activeQuotation?.items.map((item: any, index: number) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Delivery Fee:</p>
                    <p className="text-sm">${activeQuotation?.deliveryFee.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Delivery:</p>
                    <p className="text-sm">{activeQuotation?.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Total:</p>
                    <p className="font-medium">${activeQuotation?.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                {activeQuotation?.notes && (
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p className="font-medium">Notes:</p>
                    <p>{activeQuotation.notes}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-medium mb-2">Requested Tests:</h3>
                  <div className="rounded-md border p-3 space-y-3">
                    {activeQuotation?.tests.map((test: any, index: number) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium">{test.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${test.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Available Date:</p>
                    <p className="text-sm">{activeQuotation?.availableDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Available Time:</p>
                    <p className="text-sm">{activeQuotation?.availableTime}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Location:</p>
                  <p className="text-sm">{activeQuotation?.location}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Total:</p>
                    <p className="font-medium">${activeQuotation?.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                {activeQuotation?.notes && (
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p className="font-medium">Notes:</p>
                    <p>{activeQuotation.notes}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQuotationDialog(false)}>
              Close
            </Button>
            <Button onClick={handleAcceptQuotation}>Accept Quotation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
