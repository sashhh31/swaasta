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
import { FileText, Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PharmacyOrdersPage() {
  const [activeOrder, setActiveOrder] = useState<any>(null)
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false)

  const orders = [
    {
      id: "ORD-1001",
      patient: "John Doe",
      doctor: "Dr. Smith",
      date: "May 12, 2025",
      status: "Processing",
      items: [
        { name: "Amoxicillin 500mg", quantity: 30, price: 25.99, received: true },
        { name: "Ibuprofen 200mg", quantity: 20, price: 12.5, received: false },
      ],
      totalAmount: 38.49,
      deliveryAddress: "123 Main St, City, State 12345",
      estimatedDelivery: "May 14, 2025",
    },
    {
      id: "ORD-1002",
      patient: "Sarah Johnson",
      doctor: "Dr. Wilson",
      date: "May 12, 2025",
      status: "Delivered",
      items: [
        { name: "Lisinopril 10mg", quantity: 30, price: 28.99, received: true },
        { name: "Atorvastatin 20mg", quantity: 30, price: 15.99, received: true },
      ],
      totalAmount: 44.98,
      deliveryAddress: "456 Oak Ave, City, State 12345",
      estimatedDelivery: "May 13, 2025",
    },
    {
      id: "ORD-1003",
      patient: "Michael Brown",
      doctor: "Dr. Davis",
      date: "May 11, 2025",
      status: "Pending",
      items: [
        { name: "Albuterol Inhaler", quantity: 1, price: 45.99, received: false },
        { name: "Fluticasone Nasal Spray", quantity: 1, price: 32.99, received: false },
      ],
      totalAmount: 78.98,
      deliveryAddress: "789 Pine Rd, City, State 12345",
      estimatedDelivery: "May 15, 2025",
    },
  ]

  const handleViewOrder = (order: any) => {
    setActiveOrder(order)
    setShowOrderDialog(true)
  }

  const handleNewOrder = () => {
    setShowNewOrderDialog(true)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
        <p className="text-muted-foreground">Manage and track pharmacy orders</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search orders..." className="w-full pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
          <Button onClick={handleNewOrder}>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Manage all pharmacy orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.patient}</TableCell>
                      <TableCell>{order.doctor}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            order.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : order.status === "Processing"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewOrder(order)}>
                            <FileText className="mr-1 h-3 w-3" />
                            View Details
                          </Button>
                          {order.status !== "Delivered" && (
                            <Button size="sm" variant="default">
                              Update Status
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
        </TabsContent>
      </Tabs>

      {/* View Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{activeOrder?.id} for {activeOrder?.patient}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Patient</p>
                <p className="text-sm">{activeOrder?.patient}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Doctor</p>
                <p className="text-sm">{activeOrder?.doctor}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Order Date</p>
                <p className="text-sm">{activeOrder?.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge
                  variant="outline"
                  className={
                    activeOrder?.status === "Pending"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                      : activeOrder?.status === "Processing"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-green-50 text-green-700 border-green-200"
                  }
                >
                  {activeOrder?.status}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Order Items</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeOrder?.items.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.received
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }
                          >
                            {item.received ? "Received" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Delivery Address</p>
                <p className="text-sm">{activeOrder?.deliveryAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-sm">{activeOrder?.estimatedDelivery}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <p className="font-medium">Total Amount</p>
                <p className="font-medium">${activeOrder?.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOrderDialog(false)}>
              Close
            </Button>
            {activeOrder?.status !== "Delivered" && (
              <Button>Update Order Status</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Order Dialog */}
      <Dialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>Add a new order to the system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient">Patient Name</Label>
                <Input id="patient" placeholder="Enter patient name" />
              </div>
              <div>
                <Label htmlFor="doctor">Doctor Name</Label>
                <Input id="doctor" placeholder="Enter doctor name" />
              </div>
            </div>

            <div>
              <Label>Order Items</Label>
              <div className="rounded-md border p-4 space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input id="item-name" placeholder="Enter item name" />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="Qty" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="₹0.00" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Item
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="delivery-address">Delivery Address</Label>
                <Textarea id="delivery-address" placeholder="Enter delivery address" />
              </div>
              <div>
                <Label htmlFor="estimated-delivery">Estimated Delivery</Label>
                <Input id="estimated-delivery" type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewOrderDialog(false)}>
              Cancel
            </Button>
            <Button>Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
