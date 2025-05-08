import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pill, Stethoscope, TestTube } from "lucide-react"

export function RecentApprovals() {
  // Mock data for recent approvals
  const approvals = [
    {
      id: "1",
      name: "Dr. John Smith",
      type: "doctor",
      specialty: "Cardiologist",
      submittedDate: "May 3, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "MedPharm Pharmacy",
      type: "pharmacy",
      specialty: "Retail Pharmacy",
      submittedDate: "May 2, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "LifeCare Laboratory",
      type: "laboratory",
      specialty: "Diagnostic Lab",
      submittedDate: "May 1, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-4">
      {approvals.map((approval) => (
        <div key={approval.id} className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={approval.avatar || "/placeholder.svg"} alt={approval.name} />
              <AvatarFallback>
                {approval.type === "doctor" ? "DR" : approval.type === "pharmacy" ? "PH" : "LB"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{approval.name}</span>
                <Badge variant="outline" className="flex items-center gap-1">
                  {approval.type === "doctor" ? (
                    <Stethoscope className="h-3 w-3" />
                  ) : approval.type === "pharmacy" ? (
                    <Pill className="h-3 w-3" />
                  ) : (
                    <TestTube className="h-3 w-3" />
                  )}
                  <span className="capitalize">{approval.type}</span>
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <span>{approval.specialty}</span>
                <span className="mx-2">•</span>
                <span>{approval.submittedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              View
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Approvals
      </Button>
    </div>
  )
}
