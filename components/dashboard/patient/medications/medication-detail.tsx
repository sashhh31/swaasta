"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Calendar, Clock, Info, Pill, X } from "lucide-react"

interface MedicationDetailProps {
  medicationId: string
  onClose: () => void
}

export function MedicationDetail({ medicationId, onClose }: MedicationDetailProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [showRefillDialog, setShowRefillDialog] = useState(false)
  const [showReminderDialog, setShowReminderDialog] = useState(false)

  // Mock medication data based on medicationId
  const medication = {
    id: medicationId,
    name: medicationId === "med-1" ? "Lisinopril" :
          medicationId === "med-2" ? "Metformin" :
          medicationId === "med-3" ? "Atorvastatin" :
          medicationId === "med-4" ? "Amoxicillin" :
          medicationId === "med-5" ? "Ibuprofen" : "Prednisone",
    dosage: medicationId === "med-1" ? "10mg" :
            medicationId === "med-2" ? "500mg" :
            medicationId === "med-3" ? "20mg" :
            medicationId === "med-4" ? "500mg" :
            medicationId === "med-5" ? "400mg" : "10mg",
    frequency: medicationId === "med-1" ? "Once daily" :
               medicationId === "med-2" ? "Twice daily" :
               medicationId === "med-3" ? "Once daily at bedtime" :
               medicationId === "med-4" ? "Three times daily" :
               medicationId === "med-5" ? "As needed for pain" : "Once daily for 7 days",
    refillsLeft: medicationId === "med-1" ? 2 :
                 medicationId === "med-2" ? 1 :
                 medicationId === "med-3" ? 0 :
                 medicationId === "med-4" ? 0 :
                 medicationId === "med-5" ? 3 : 0,
    supply: medicationId === "med-1" ? 80 :
            medicationId === "med-2" ? 30 :
            medicationId === "med-3" ? 10 :
            medicationId === "med-4" ? 0 :
            medicationId === "med-5" ? 90 : 0,
    status: medicationId === "med-1" || medicationId === "med-2" || medicationId === "med-5" ? "active" :
            medicationId === "med-3" ? "refill-needed" : "completed",
    startDate: medicationId === "med-1" ? "January 15, 2025" :
               medicationId === "med-2" ? "February 10, 2025" :
               medicationId === "med-3" ? "March 5, 2025" :
               medicationId === "med-4" ? "April 1, 2025" :
               medicationId === "med-5" ? "March 15, 2025" : "February 20, 2025",
    endDate: medicationId === "med-4" ? "April 10, 2025" :
             medicationId === "med-6" ? "February 27, 2025" : null,
    prescribedBy: medicationId === "med-1" || medicationId === "med-3" ? "Dr. Sarah Smith" :
                  medicationId === "med-2" || medicationId === "med-6" ? "Dr. Michael Chen" :
                  medicationId === "med-4" ? "Dr. Jessica Williams" : "Dr. Robert Wilson",
    pharmacy: "MedPharm Pharmacy",
    instructions: medicationId === "med-1" ? "Take one tablet by mouth once daily in the morning." :
                  medicationId === "med-2" ? "Take one tablet by mouth twice daily with meals." :
                  medicationId === "med-3" ? "Take one tablet by mouth once daily at bedtime." :
                  medicationId === "med-4" ? "Take one capsule by mouth three times daily for 10 days." :
                  medicationId === "med-5" ? "Take one tablet by mouth every 6 hours as needed for pain." : 
                  "Take one tablet by mouth once daily for 7 days.",
    purpose: medicationId === "med-1" ? "Blood pressure management" :
             medicationId === "med-2" ? "Diabetes management" :
             medicationId === "med-3" ? "Cholesterol management" :
             medicationId === "med-4" ? "Bacterial infection" :
             medicationId === "med-5" ? "Pain relief" : "Inflammation",
    sideEffects: medicationId === "med-1" ? ["Dizziness", "Cough", "Headache"] :
                 medicationId === "med-2" ? ["Nausea", "Diarrhea", "Stomach pain"] :
                 medicationId === "med-3" ? ["Muscle pain", "Liver problems", "Digestive issues"] :
                 medicationId === "med-4" ? ["Diarrhea", "Rash", "Nausea"] :
                 medicationId === "med-5" ? ["Stomach upset", "Heartburn", "Dizziness"] : 
                 ["Increased appetite", "Mood changes", "Insomnia"],
    interactions: medicationId === "med-1" ? ["Potassium supplements", "NSAIDs", "Lithium"] :
                  medicationId === "med-2" ? ["Alcohol", "Contrast dyes", "Certain antibiotics"] :
                  medicationId === "med-3" ? ["Grapefruit juice", "Certain antibiotics", "Antifungal medications"] :
                  medicationId === "med-4" ? ["Birth control pills", "Certain antibiotics", "Blood thinners"] :
                  medicationId === "med-5" ? ["Blood thinners", "Certain blood pressure medications", "Aspirin"] : 
                  ["NSAIDs", "Blood thinners", "Certain antibiotics"],
    reminders: medicationId === "med-1" ? [
                { time: "8:00 AM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }
              ] :
              medicationId === "med-2" ? [
                { time: "8:00 AM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
                { time: "6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }
              ] :
              medicationId === "med-3" ? [
                { time: "9:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }
              ] : []
  }

  const handleRefillRequest = () => {
    // In a real app, this would send a refill request to the server
    setShowRefillDialog(false)
  }

  const handleSetReminder = () => {
    // In a real app, this would save the reminder settings to the server
    setShowReminderDialog(false)
  }

  return (
    <Card className="sticky top-20">
      <CardHeader className="relative pb-2">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
            <Pill className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>{medication.name}</CardTitle>
          <CardDescription className="mt-1">{medication.dosage}</CardDescription>
          {medication.status === "refill-needed" ? (
            <Badge variant="destructive" className="flex items-center gap-1 mt-2">
              <AlertCircle className="h-3 w-3" />
              Refill Needed
            </Badge>
          ) : medication.status === "active" ? (
            <Badge className="mt-2">Active</Badge>
          ) : (
            <Badge variant="outline" className="mt-2">Completed</Badge>
          )}
        </div>
      </CardHeader>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-4">
        <TabsContent value="details" className="space-y-4">
            {/* Existing details code ... */}
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Reminders</h4>
              {medication.reminders && medication.reminders.length > 0 ? (
                <div className="space-y-3">
                  {medication.reminders.map((reminder, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{reminder.time}</div>
                        <Button variant="ghost" size="sm">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {reminder.days.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    No Reminders Set
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            {/* Existing info code ... */}
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Reminders</h4>
              {medication.reminders && medication.reminders.length > 0 ? (
                <div className="space-y-3">
                  {medication.reminders.map((reminder, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{reminder.time}</div>
                        <Button variant="ghost" size="sm">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {reminder.days.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    No Reminders Set
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="reminders" className="space-y-4">
            {medication.reminders && medication.reminders.length > 0 ? (
              <>
                <div className="space-y-3">
                  {medication.reminders.map((reminder, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{reminder.time}</div>
                        <Button variant="ghost" size="sm">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {reminder.days.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowReminderDialog(true)}
                >
                  Add Another Reminder
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">No Reminders Set</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a reminder to help you remember to take your medication
                </p>
                <Button onClick={() => setShowReminderDialog(true)}>
                  Set Reminder
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Instructions</h4>
              <p className="text-sm text-muted-foreground">{medication.instructions}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Prescribed By</h4>
              <p className="text-sm text-muted-foreground">{medication.prescribedBy}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Pharmacy</h4>
              <p className="text-sm text-muted-foreground">{medication.pharmacy}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Side Effects</h4>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                {medication.sideEffects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Interactions</h4>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                {medication.interactions.map((interaction, index) => (
                  <li key={index}>{interaction}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
