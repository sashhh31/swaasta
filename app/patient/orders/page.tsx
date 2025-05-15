"use client"

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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pill, ShoppingBag, Truck } from "lucide-react"

export default function PatientOrdersPage() {
  const orders = [
    {
      id: "ORD-1001",
      pharmacy: "MedPharm Central",
      date: "May 10, 2025",
      items: [
        { name: "Amoxicillin 500mg", quantity: 30, price: 25.99 },
        { name: "Ibuprofen 200mg", quantity: 20, price: 12.5 },
      ],
      deliveryFee: 5.0,
      estimatedDelivery: "May 12, 2025",
      totalPrice: 43.49,
      status: "Delivered",
    },
    {
      id: "ORD-1002",
      pharmacy: "QuickMeds Pharmacy",
      date: "May 8, 2025",
      items: [
        { name: "Lisinopril 10mg", quantity: 30, price: 15.99 },
        { name: "Atorvastatin 20mg", quantity: 30, price: 22.5 },
      ],
      deliveryFee: 0.0,
      estimatedDelivery: "May 10, 2025",
      totalPrice: 38.49,
      status: "In Transit",
    },
    {
      id: "ORD-1003",
      pharmacy: "HealthPlus Pharmacy",
      date: "May 5, 2025",
      items: [
        { name: "Metformin 500mg", quantity: 60, price: 18.99 },
        { name: "Glipizide 5mg", quantity: 30, price: 24.5 },
      ],
      deliveryFee: 4.5,
      estimatedDelivery: "May 7, 2025",
      totalPrice: 47.99,
      status: "Delivered",
    },
    {
      id: "ORD-1004",
      pharmacy: "MedPharm Central",
      date: "May 1, 2025",
      items: [
        { name: "Sertraline 50mg", quantity: 30, price: 32.99 },
        { name: "Alprazolam 0.5mg", quantity: 15, price: 28.5 },
      ],
      deliveryFee: 5.0,
      estimatedDelivery: "May 3, 2025",
      totalPrice: 66.49,
      status: "Delivered",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Orders</h2>
        <p className="text-muted-foreground">Track and manage your medication orders</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "In Transit").length}</div>
            <p className="text-xs text-muted-foreground">Currently being delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "Delivered").length}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${orders.reduce((total, order) => total + order.totalPrice, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="in-transit">In Transit</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>View all your medication orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Pharmacy</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.pharmacy}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            order.status === "In Transit"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>
                                Order {order.id} from {order.pharmacy}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                              <div>
                                <h3 className="text-sm font-medium mb-2">Ordered Medications:</h3>
                                <div className="rounded-md border p-3 space-y-3">
                                  {order.items.map((item, index) => (
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
                                  <p className="text-sm font-medium">Order Date:</p>
                                  <p className="text-sm">{order.date}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Delivery Fee:</p>
                                  <p className="text-sm">${order.deliveryFee.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Estimated Delivery:</p>
                                  <p className="text-sm">{order.estimatedDelivery}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Status:</p>
                                  <Badge
                                    variant="outline"
                                    className={
                                      order.status === "In Transit"
                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                        : "bg-green-50 text-green-700 border-green-200"
                                    }
                                  >
                                    {order.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="border-t pt-4">
                                <div className="flex justify-between">
                                  <p className="font-medium">Total:</p>
                                  <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              {order.status === "In Transit" && <Button variant="outline">Track Order</Button>}
                              <Button>{order.status === "Delivered" ? "Reorder" : "Contact Pharmacy"}</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="in-transit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>In Transit Orders</CardTitle>
              <CardDescription>Track your orders that are currently being delivered</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Pharmacy</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Estimated Delivery</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders
                    .filter((order) => order.status === "In Transit")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.pharmacy}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items.length} items</TableCell>
                        <TableCell>{order.estimatedDelivery}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="default">
                              Track Order
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
        <TabsContent value="delivered" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
              <CardDescription>View your successfully delivered orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Pharmacy</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders
                    .filter((order) => order.status === "Delivered")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.pharmacy}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items.length} items</TableCell>
                        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="default">
                              Reorder
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
    </div>
  )
}
