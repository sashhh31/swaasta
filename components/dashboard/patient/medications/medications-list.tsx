"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Bell, Calendar, Clock, Pill, Plus, RefreshCw } from "lucide-react"

interface MedicationsListProps {
  status: "current" | "past"
  onMedicationSelect: (medicationId: string) => void
  searchQuery: string
}

export function MedicationsList({ status, onMedicationSelect, searchQuery }: MedicationsListProps) {
  // Mock medications data
  const allMedications = [
    {
      id: "med-1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      refillsLeft: 2,
      supply: 80,
      status: "active",
      startDate: "January 15, 2025",
      endDate: null,
      prescribedBy: "Dr. Sarah Smith",
      pharmacy: "MedPharm Pharmacy",
      instructions: "Take one tablet by mouth once daily in the morning.",
      purpose: "Blood pressure management",
      sideEffects: ["Dizziness", "Cough", "Headache"],
      interactions: ["Potassium supplements", "NSAIDs", "Lithium"],
      reminders: [
        { time: "8:00 AM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      ],
    },
    {
      id: "med-2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      refillsLeft: 1,
      supply: 30,
      status: "active",
      startDate: "February 10, 2025",
      endDate: null,
      prescribedBy: "Dr. Michael Chen",
      pharmacy: "MedPharm Pharmacy",
      instructions: "Take one tablet by mouth twice daily with meals.",
      purpose: "Diabetes management",
      sideEffects: ["Nausea", "Diarrhea", "Stomach pain"],
      interactions: ["Alcohol", "Contrast dyes", "Certain antibiotics"],
      reminders: [
        { time: "8:00 AM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
        { time: "6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      ],
    },
    {
      id: "med-3",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      refillsLeft: 0,
      supply: 10,
      status: "refill-needed",
      startDate: "March 5, 2025",
      endDate: null,
      prescribedBy: "Dr. Sarah Smith",
      pharmacy: "MedPharm Pharmacy",
      instructions: "Take one tablet by mouth once daily at bedtime.",
      purpose: "Cholesterol management",
      sideEffects: ["Muscle pain", "Liver problems", "Digestive issues"],
      interactions: ["Grapefruit juice", "Certain antibiotics", "Antifungal medications"],
      reminders: [
        { time: "9:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      ],
    },
    {
      id: "med-4",
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      refillsLeft: 0,
      supply: 0,
      status: "completed",
      startDate: "April 1, 2025",
      endDate: "April 10, 2025",
      prescribedBy: "Dr. Jessica Williams",
      pharmacy: "MedPharm Pharmacy",
      instructions: "Take one capsule by mouth three times daily for 10 days.",
      purpose: "Bacterial infection",
      sideEffects: ["Diarrhea", "Rash", "Nausea"],
      interactions: ["Birth control pills", "Certain antibiotics", "Blood thinners"],
      reminders: [],
    },
    {
      id: "med-5",
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed for pain",
      refillsLeft: 3,
      supply: 90,
      status: "active",
      startDate: "March 15, 2025",
      endDate: null,
      prescribedBy: "Dr. Robert Wilson",
      pharmacy: "MedPharm Pharmacy",
      instructions: "Take one tablet by mouth every 6 hours as needed for pain.",
      purpose: "Pain relief",
      sideEffects: ["Stomach upset", "Heartburn", "Dizziness"],
      interactions: ["Blood thinners", "Certain blood pressure medications", "Aspirin"],
      reminders: [],
    },
    {
      id: "med-6",
      name: "Prednisone",
      dosage: "10mg",
      frequency: "Once daily for 7 days",
      refillsLeft: 0,
      supply: 0,
      status: "completed",
      startDate: "February 20, 2025",
      endDate: "February 27, 2025",
      prescribedBy: "Dr. Michael Chen",
      pharmacy: "MedPharm Pharmacy",
      instructions: "Take one tablet by mouth once daily for 7 days.",
      purpose: "Inflammation",
      sideEffects: ["Increased appetite", "Mood changes", "Insomnia"],
      interactions: ["NSAIDs", "Blood thinners", "Certain antibiotics"],
      reminders: [],
    },
  ]

  // Filter medications based on status and search query
  const filteredMedications = allMedications.filter((medication) => {
    const matchesStatus =
      (status === "current" && (medication.status === "active" || medication.status === "refill-needed")) ||
      (status === "past" && medication.status === "completed")

    const matchesSearch =
      searchQuery === "" ||
      medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medication.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medication.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  if (filteredMedications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Pill className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No medications found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery
              ? `No medications matching "${searchQuery}" were found.`
              : status === "current"
                ? "You don't have any current medications."
                : "You don't have any past medications."}
          </p>
          {status === "current" && (
            <Button asChild>
              <a href="/dashboard/patient/medications/add">Add Medication</a>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {filteredMedications.map((medication) => (
        <Card
          key={medication.id}
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => onMedicationSelect(medication.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Pill className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h3 className="font-medium">
                    {medication.name} {medication.dosage}
                  </h3>
                  {medication.status === "refill-needed" ? (
                    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                      <AlertCircle className="h-3 w-3" />
                      Refill Needed
                    </Badge>
                  ) : medication.status === "active" ? (
                    <Badge className="w-fit">Active</Badge>
                  ) : (
                    <Badge variant="outline" className="w-fit">
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{medication.purpose}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{medication.frequency}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Started: {medication.startDate}</span>
                  </div>
                </div>

                {medication.status !== "completed" && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Supply</span>
                      <span>{medication.supply}%</span>
                    </div>
                    <Progress value={medication.supply} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{medication.refillsLeft} refills left</span>
                      {medication.reminders.length > 0 && (
                        <span className="flex items-center">
                          <Bell className="h-3 w-3 mr-1" />
                          Reminders set
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                {medication.status === "refill-needed" && (
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refill
                  </Button>
                )}
                {medication.status === "active" && medication.reminders.length === 0 && (
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-1" />
                    Set Reminder
                  </Button>
                )}
                {medication.status === "completed" && (
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Renew
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
