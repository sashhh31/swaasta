import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ShoppingCart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function PatientMedications() {
  const medications = [
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      refillsLeft: 2,
      supply: 80,
      status: "active",
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      refillsLeft: 1,
      supply: 30,
      status: "active",
    },
    {
      id: "3",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      refillsLeft: 0,
      supply: 10,
      status: "refill-needed",
    },
    {
      id: "4",
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      refillsLeft: 0,
      supply: 5,
      status: "refill-needed",
    },
    {
      id: "5",
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed for pain",
      refillsLeft: 3,
      supply: 90,
      status: "active",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Current Medications</h3>
        <Button asChild>
          <a href="/dashboard/patient/medications/order">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Order Refill
          </a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medication</TableHead>
            <TableHead>Dosage & Frequency</TableHead>
            <TableHead>Supply</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications.map((medication) => (
            <TableRow key={medication.id}>
              <TableCell className="font-medium">{medication.name}</TableCell>
              <TableCell>
                <div>{medication.dosage}</div>
                <div className="text-sm text-muted-foreground">{medication.frequency}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={medication.supply} className="w-[80px]" />
                  <span className="text-sm">{medication.supply}%</span>
                </div>
                <div className="text-sm text-muted-foreground">{medication.refillsLeft} refills left</div>
              </TableCell>
              <TableCell>
                {medication.status === "refill-needed" ? (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Refill Needed
                  </Badge>
                ) : (
                  <Badge>Active</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" disabled={medication.refillsLeft === 0}>
                  Request Refill
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
