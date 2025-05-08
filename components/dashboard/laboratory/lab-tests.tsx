import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  TestTube, 
  FileText, 
  Download,
  Mail,
  MessageSquare,
  Upload,
  Check,
  AlertTriangle
} from "lucide-react"

export function LabTests() {
  const tests = [
    {
      id: "1",
      date: "May 4, 2025",
      patient: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      testType: "Blood Test",
      parameters: ["CBC", "Lipid Panel", "Glucose"],
      status: "completed",
      technician: "Mary Johnson",
      results: "Normal",
      priority: "routine"
    },
    {
      id: "2",
      date: "May 3, 2025",
      patient: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      testType: "Urine Analysis",
      parameters: ["Color", "pH", "Protein", "Glucose"],
      status: "completed",
      technician: "Robert Chen",
      results: "Abnormal",
      priority: "urgent"
    },
    {
      id: "3",
      date: "May 3, 2025",
      patient: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      testType: "X-Ray",
      parameters: ["Chest X-Ray"],
      status: "in_progress",
      technician: "James Wilson",
      results: null,
      priority: "routine"
    },
    {
      id: "4",
      date: "May 2, 2025",
      patient: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      testType: "MRI Scan",
      parameters: ["Brain MRI"],
      status: "in_progress",
      technician: "Lisa Garcia",
      results: null,
      priority: "urgent"
    },
    {
      id: "5",
      date: "May 2, 2025",
      patient: {
        name: "Robert Wilson",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      testType: "CT Scan",
      parameters: ["Abdomen CT"],
      status: "pending",
      technician: null,
      results: null,
      priority: "routine"
    },
    {
      id: "6",
      date: "May 1, 2025",
      patient: {
        name: "Jennifer Martinez",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      testType: "Blood Culture",
      parameters: ["Bacterial Culture"],
      status: "completed",
      technician: "Mary Johnson",
      results: "Positive",
      priority: "urgent"
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Laboratory Tests</h3>
        <div className="flex gap-2">
          <Button variant="outline">
            Filter
          </Button>
          <Button asChild>
            <a href="/dashboard/laboratory/tests">View All Tests</a>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Test Type</TableHead>
            <TableHead>Parameters</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{test.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={test.patient.avatar} alt={test.patient.name} />
                    <AvatarFallback>{test.patient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{test.patient.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <TestTube className="h-4 w-4 text-muted-foreground" />
                  <span>{test.testType}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {test.parameters.map((param, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {param}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    test.status === "completed" 
                      ? "default" 
                      : test.status === "in_progress" 
                        ? "secondary" 
                        : "outline"
                  }
                >
                  {test.status === "completed" 
                    ? "Completed" 
                    : test.status === "in_progress" 
                      ? "In Progress" 
                      : "Pending"
                  }
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {test.priority === "urgent" && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  <span className={test.priority === "urgent" ? "text-destructive font-medium" : ""}>
                    {test.priority === "urgent" ? "Urgent" : "Routine"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {test.status === "pending" && (
                    <Button variant="outline" size="icon">
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Start Test</span>
                    </Button>
                  )}
                  {test.status === "in_progress" && (
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload Results</span>
                    </Button>
                  )}
                  {test.status === "completed" && (
                    <>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download Results</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email Results</span>
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="icon">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Test Result Details Modal would go here in a real implementation */}
      
    </div>
  )
} 