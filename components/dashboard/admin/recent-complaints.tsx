import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function RecentComplaints() {
  // Mock data for recent complaints
  const complaints = [
    {
      id: "1",
      user: "Sarah Johnson",
      type: "Service Issue",
      description: "Doctor was late for video consultation",
      submittedDate: "May 4, 2025",
      priority: "high",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      user: "Michael Brown",
      type: "Billing Issue",
      description: "Charged incorrectly for medication",
      submittedDate: "May 3, 2025",
      priority: "medium",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      user: "Emily Davis",
      type: "Technical Issue",
      description: "Unable to upload test results",
      submittedDate: "May 2, 2025",
      priority: "medium",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={complaint.avatar || "/placeholder.svg"} alt={complaint.user} />
              <AvatarFallback>{complaint.user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{complaint.user}</span>
                <Badge variant={complaint.priority === "high" ? "destructive" : "outline"} className="capitalize">
                  {complaint.priority}
                </Badge>
              </div>
              <div className="text-sm">{complaint.type}</div>
              <div className="text-xs text-muted-foreground">{complaint.submittedDate}</div>
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
        View All Complaints
      </Button>
    </div>
  )
}
