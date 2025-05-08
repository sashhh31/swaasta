import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Lock, Pill, Stethoscope, TestTube, Trash, User } from "lucide-react"

export function AdminUsers() {
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "patient",
      status: "active",
      joinedDate: "May 1, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Dr. Sarah Smith",
      email: "sarah.smith@example.com",
      role: "doctor",
      status: "active",
      joinedDate: "April 28, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "MedPharm Pharmacy",
      email: "info@medpharm.com",
      role: "pharmacy",
      status: "active",
      joinedDate: "April 25, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "LifeCare Laboratory",
      email: "contact@lifecarelab.com",
      role: "laboratory",
      status: "active",
      joinedDate: "April 22, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "patient",
      status: "suspended",
      joinedDate: "April 20, 2025",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Users</h3>
        <Button asChild>
          <a href="/dashboard/admin/users">View All Users</a>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{user.name}</div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {user.role === "patient" && <User className="h-4 w-4" />}
                  {user.role === "doctor" && <Stethoscope className="h-4 w-4" />}
                  {user.role === "pharmacy" && <Pill className="h-4 w-4" />}
                  {user.role === "laboratory" && <TestTube className="h-4 w-4" />}
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "destructive"}>
                  {user.status === "active" ? "Active" : "Suspended"}
                </Badge>
              </TableCell>
              <TableCell>{user.joinedDate}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Lock className="h-4 w-4" />
                    <span className="sr-only">Permissions</span>
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
