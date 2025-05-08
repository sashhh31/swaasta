"use client"

import { useState } from "react"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search, Upload } from "lucide-react"

export default function TestUploadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [uploadStep, setUploadStep] = useState(1)
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedTest, setSelectedTest] = useState("")

  // Mock data for test uploads
  const testUploads = [
    {
      id: "1",
      patient: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      testType: "Blood Test",
      uploadDate: "May 4, 2025",
      status: "completed",
      doctor: "Dr. Sarah Smith",
    },
    {
      id: "2",
      patient: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      testType: "Urine Analysis",
      uploadDate: "May 3, 2025",
      status: "completed",
      doctor: "Dr. Michael Chen",
    },
    {
      id: "3",
      patient: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      testType: "X-Ray",
      uploadDate: "May 2, 2025",
      status: "pending",
      doctor: "Dr. Jessica Williams",
    },
    {
      id: "4",
      patient: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      testType: "MRI Scan",
      uploadDate: "May 1, 2025",
      status: "completed",
      doctor: "Dr. Robert Wilson",
    },
    {
      id: "5",
      patient: {
        name: "Robert Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      testType: "CT Scan",
      uploadDate: "April 30, 2025",
      status: "pending",
      doctor: "Dr. Sarah Smith",
    },
  ]

  // Filter test uploads based on search query
  const filteredTestUploads = testUploads.filter((upload) => {
    if (searchQuery === "") return true
    return (
      upload.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.testType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleUploadTest = () => {
    if (uploadStep < 3) {
      setUploadStep(uploadStep + 1)
    } else {
      // Reset form after submission
      setUploadStep(1)
      setSelectedPatient("")
      setSelectedTest("")
    }
  }

  const handleCancelUpload = () => {
    setUploadStep(1)
    setSelectedPatient("")
    setSelectedTest("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Test Uploads</h2>
        <p className="text-muted-foreground">Upload and manage patient test results</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by patient name, test type, or doctor..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <Upload className="h-4 w-4 mr-1" />
                New Upload
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
