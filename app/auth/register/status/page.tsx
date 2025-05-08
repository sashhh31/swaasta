import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, Clock, FileText, HelpCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function RegistrationStatusPage() {
  // This would come from your backend in a real application
  const status = {
    userType: "pharmacy",
    applicationId: "APP-2023-05678",
    submittedDate: "May 15, 2023",
    currentStatus: "pending", // pending, approved, rejected
    documents: [
      { name: "Pharmacy License", status: "verified" },
      { name: "GST Certificate", status: "pending" },
      { name: "Pharmacist Certificate", status: "rejected", reason: "Document unclear or expired" },
      { name: "Drug License", status: "verified" },
    ],
    notes: "We need a clearer copy of your Pharmacist Certificate. Please upload a new copy.",
  }

  const getStatusIcon = (docStatus) => {
    switch (docStatus) {
      case "verified":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <HelpCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Approved</div>
      case "pending":
        return <div className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">Pending</div>
      case "rejected":
        return <div className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">Rejected</div>
      default:
        return null
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Application Status</h1>
        <p className="text-muted-foreground mt-1">Track the status of your registration application</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Application Details</CardTitle>
            {getStatusBadge(status.currentStatus)}
          </div>
          <CardDescription>Application ID: {status.applicationId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Application Type</div>
              <div className="font-medium capitalize">{status.userType} Registration</div>
            </div>
            <div>
              <div className="text-muted-foreground">Submitted On</div>
              <div className="font-medium">{status.submittedDate}</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Document Verification Status</h3>
            <div className="space-y-2">
              {status.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.status)}
                    <span className="text-sm capitalize">{doc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {status.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Notes from Verification Team</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 flex gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>{status.notes}</div>
                </div>
              </div>
            </>
          )}

          {status.currentStatus === "rejected" && (
            <div className="space-y-2">
              <h3 className="font-medium">Resubmission</h3>
              <p className="text-sm text-muted-foreground">
                Please address the issues mentioned above and resubmit your application.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Resubmit Application</Button>
            </div>
          )}

          {status.currentStatus === "pending" && (
            <div className="space-y-2">
              <h3 className="font-medium">Estimated Processing Time</h3>
              <p className="text-sm text-muted-foreground">
                Applications typically take 2-3 business days to process. You will be notified via email once your
                application has been reviewed.
              </p>
              <div className="flex justify-between">
                <Button variant="outline">Update Documents</Button>
                <Button variant="outline">Contact Support</Button>
              </div>
            </div>
          )}

          {status.currentStatus === "approved" && (
            <div className="space-y-2">
              <h3 className="font-medium">Congratulations!</h3>
              <p className="text-sm text-muted-foreground">
                Your application has been approved. You can now access all features of your account.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Go to Dashboard</Button>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button variant="link" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
