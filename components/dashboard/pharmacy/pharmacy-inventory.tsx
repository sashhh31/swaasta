import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PharmacyInventory() {
  const inventory = [
    {
      id: "1",
      name: "Lisinopril",
      category: "Prescription",
      stock: 120,
      price: 15.99,
      status: "in-stock",
    },
    {
      id: "2",
      name: "Metformin",
      category: "Prescription",
      stock: 85,
      price: 12.5,
      status: "in-stock",
    },
    {
      id: "3",
      name: "Atorvastatin",
      category: "Prescription",
      stock: 10,
      price: 22.75,
      status: "low-stock",
    },
    {
      id: "4",
      name: "Amoxicillin",
      category: "Prescription",
      stock: 0,
      price: 18.25,
      status: "out-of-stock",
    },
    {
      id: "5",
      name: "Ibuprofen",
      category: "OTC",
      stock: 200,
      price: 8.99,
      status: "in-stock",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Inventory Management</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Input placeholder="Search medications..." className="w-[250px]" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.stock} units</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                {item.status === "in-stock" && <Badge>In Stock</Badge>}
                {item.status === "low-stock" && <Badge variant="secondary">Low Stock</Badge>}
                {item.status === "out-of-stock" && <Badge variant="destructive">Out of Stock</Badge>}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
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
