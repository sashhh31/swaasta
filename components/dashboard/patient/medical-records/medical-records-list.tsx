"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, Stethoscope, TestTube, Pill } from "lucide-react"

interface MedicalRecordsListProps {
  onRecordSelect: (recordId: string) => void
  searchQuery: string
}

export function MedicalRecordsList({ onRecordSelect, searchQuery }: MedicalRecordsListProps) {
  // Mock medical records data
  const records = [
    {
      id: "rec-1",
      title: "Annual Physical Examination",
      provider: {
        name: "Dr. Sarah Smith",
        type: "doctor",
        specialty: "Primary Care Physician",
      },
      date: "May 2, 2025",
      category: "examination",
      description: "Routine annual physical examination with blood work and vitals check.",
    },
    {
      id: "rec-2",
      title: "Blood Test Results",
      provider: {
        name: "LifeCare Laboratory",
        type: "laboratory",
        specialty: "Diagnostic Lab",
      },
      date: "April 28, 2025",
      category: "lab-result",
      description: "Complete blood count (CBC) and metabolic panel results.",
    },
    {
      id: "rec-3",
      title: "Cardiology Consultation",
      provider: {
        name: "Dr. Michael Chen",
        type: "doctor",
        specialty: "Cardiologist",
      },
      date: "April 15, 2025",
      category: "consultation",
      description: "Consultation for heart palpitations and chest discomfort.",
    },
    {
      id: "rec-4",
      title: "Prescription Medication",
      provider: {
        name: "MedPharm Pharmacy",
        type: "pharmacy",
        specialty: "Retail Pharmacy",
      },
      date: "April 10, 2025",
      category: "prescription",
      description: "Lisinopril 10mg for hypertension management.",
    },
    {
      id: "rec-5",
      title: "X-Ray Results",
      provider: {
        name: "LifeCare Laboratory",
        type: "laboratory",
        specialty: "Diagnostic Lab",
      },
      date: "March 22, 2025",
      category: "lab-result",
      description: "Chest X-ray to evaluate lung condition.",
    },
    {
      id: "rec-6",
      title: "Allergy Test Results",
      provider: {
        name: "Dr. Jessica Williams",
        type: "doctor",
        specialty: "Allergist",
      },
      date: "March 15, 2025",
      category: "lab-result",
      description: "Comprehensive allergy panel testing for environmental and food allergies.",
    },
  ]

  // Filter records based on search query
  const filteredRecords = records.filter((record) => {
    if (searchQuery === "") return true

    return (
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  if (filteredRecords.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No records found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery
              ? `No records matching "${searchQuery}" were found.`
              : "You don't have any medical records yet."}
          </p>
          <Button>Upload Medical Record</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {filteredRecords.map((record) => (
        <Card
          key={record.id}
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => onRecordSelect(record.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                {record.category === "examination" || record.category === "consultation" ? (
                  <Stethoscope className="h-5 w-5 text-primary" />
                ) : record.category === "lab-result" ? (
                  <TestTube className="h-5 w-5 text-primary" />
                ) : (
                  <Pill className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h3 className="font-medium">{record.title}</h3>
                  <Badge variant="outline" className="w-fit capitalize">
                    {record.category.replace("-", " ")}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{record.description}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1">Provider:</span>
                    <span>{record.provider.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1">Date:</span>
                    <span>{record.date}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={(e) => e.stopPropagation()}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
