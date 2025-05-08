import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, Eye, Pill, Stethoscope, TestTube, X } from "lucide-react"

export function AdminApprovals() {
  const approvals = [
    {
      id: "1",
      name: "Dr. John Smith",
      email: "john.smith@example.com",
      type: "doctor",
      specialty: "Cardiologist",
      submittedDate: "May 3, 2025",
      documents: 3,
    },
    {
      id: "2",
      name: "MedPharm Pharmacy",
      email: "info@medpharm.com",
      type: "pharmacy",
      specialty: "Retail Pharmacy",
      submittedDate: "May 2, 2025",
      documents: 4,
    },
    {
      id: "3",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      type: "doctor",
      specialty: "Dermatologist",
      submittedDate: "May 2, 2025",
      documents: 3,
    },
    {
      id: "4",
      name: "LifeCare Laboratory",
      email: "contact@lifecarelab.com",
      type: "laboratory",
      specialty: "Diagnostic Lab",
      submittedDate: "May 1, 2025",
      documents: 5,
    },
    {
      id: "5",
      name: "Dr. Michael Chen",
      email: "michael.chen@example.com",
      type: "doctor",
      specialty: "Neurologist",
      submittedDate: "April 30, 2025",
      documents: 3,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Pending Approvals</h3>
        <Button asChild>
          <a href="/dashboard/admin/approvals">View All Approvals</a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.map((approval) => (
            <TableRow key={approval.id}>
              <TableCell className="font-medium">{approval.name}</TableCell>
              <TableCell>{approval.email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {approval.type === "doctor" && <Stethoscope className="h-4 w-4" />}
                  {approval.type === "pharmacy" && <Pill className="h-4 w-4" />}
                  {approval.type === "laboratory" && <TestTube className="h-4 w-4" />}
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
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="outline" size="icon" className="text-green-500">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-500">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Reject</span>
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
