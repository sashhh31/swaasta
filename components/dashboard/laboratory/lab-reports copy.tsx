import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, MessageSquare, Upload } from "lucide-react"

export function LabReports() {
  const reports = [
    {
      id: "1",
      date: "May 4, 2025",
      patient: "John Doe",
      test: "Blood Test",
      doctor: "Dr. Sarah Smith",
      status: "completed",
    },
    {
      id: "2",
      date: "May 3, 2025",
      patient: "Sarah Johnson",
      test: "Urine Analysis",
      doctor: "Dr. Michael Chen",
      status: "completed",
    },
    {
      id: "3",
      date: "May 2, 2025",
      patient: "Michael Brown",
      test: "X-Ray",
      doctor: "Dr. Jessica Williams",
      status: "pending",
    },
    {
      id: "4",
      date: "May 1, 2025",
      patient: "Emily Davis",
      test: "MRI Scan",
      doctor: "Dr. Robert Wilson",
      status: "completed",
    },
    {
      id: "5",
      date: "April 30, 2025",
      patient: "Robert Wilson",
      test: "CT Scan",
      doctor: "Dr. Sarah Smith",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Reports</h3>
        <Button asChild>
          <a href="/dashboard/laboratory/reports">View All Reports</a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Referring Doctor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.date}</TableCell>
              <TableCell className="font-medium">{report.patient}</TableCell>
              <TableCell>{report.test}</TableCell>
              <TableCell>{report.doctor}</TableCell>
              <TableCell>
                <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                  {report.status === "completed" ? "Completed" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {report.status === "pending" ? (
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload</span>
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </Button>
                    </>
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
