import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, MessageSquare, Truck, X } from "lucide-react"

export function PharmacyOrders() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "May 5, 2025",
      items: 3,
      total: 45.99,
      status: "pending",
      delivery: "Pickup",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      date: "May 5, 2025",
      items: 2,
      total: 32.5,
      status: "processing",
      delivery: "Home Delivery",
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      date: "May 4, 2025",
      items: 1,
      total: 18.25,
      status: "ready",
      delivery: "Pickup",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "May 4, 2025",
      items: 4,
      total: 67.75,
      status: "delivered",
      delivery: "Home Delivery",
    },
    {
      id: "ORD-005",
      customer: "Robert Wilson",
      date: "May 3, 2025",
      items: 2,
      total: 29.99,
      status: "cancelled",
      delivery: "Pickup",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Orders</h3>
        <Button asChild>
          <a href="/dashboard/pharmacy/order">View All Orders</a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                {order.status === "pending" && <Badge variant="outline">Pending</Badge>}
                {order.status === "processing" && <Badge variant="secondary">Processing</Badge>}
                {order.status === "ready" && <Badge>Ready</Badge>}
                {order.status === "delivered" && <Badge variant="default">Delivered</Badge>}
                {order.status === "cancelled" && <Badge variant="destructive">Cancelled</Badge>}
              </TableCell>
              <TableCell>{order.delivery}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {(order.status === "pending" || order.status === "processing") && (
                    <>
                      <Button variant="outline" size="icon">
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </>
                  )}
                  {order.status === "ready" && order.delivery === "Home Delivery" && (
                    <Button variant="outline" size="icon">
                      <Truck className="h-4 w-4" />
                      <span className="sr-only">Deliver</span>
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Message</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
