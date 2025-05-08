"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Plus, Search, ShoppingCart } from "lucide-react"
import { MedicationsList } from "@/components/dashboard/patient/medications/medications-list"
import { MedicationDetail } from "@/components/dashboard/patient/medications/medication-detail"
// import { MedicationReminders } from "@/components/dashboard/patient/medications/medication-reminders"

export default function MedicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("current")
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null)

  const handleMedicationSelect = (medicationId: string) => {
    setSelectedMedication(medicationId)
  }

  const handleCloseDetail = () => {
    setSelectedMedication(null)
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Medications</h2>
        <p className="text-muted-foreground">Manage your medications, refills, and reminders</p>
      </div>

      <div className="flex flex-col w-full md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search medications..."
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
                  <Button size="sm" className="flex items-center gap-1" asChild>
                    <a href="/dashboard/patient/medications/add">
                      <Plus className="h-4 w-4" />
                      Add
                    </a>
                  </Button>
                  <Button size="sm" className="flex items-center gap-1" asChild>
                    <a href="/dashboard/patient/medications/order">
                      <ShoppingCart className="h-4 w-4" />
                      Order
                    </a>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-4">
              <MedicationsList status="current" onMedicationSelect={handleMedicationSelect} searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="past" className="mt-4">
              <MedicationsList status="past" onMedicationSelect={handleMedicationSelect} searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="reminders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medication Reminders</CardTitle>
                  <CardDescription>Set up and manage your medication reminders</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <MedicationReminders /> */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {selectedMedication && (
          <div className="w-full md:w-1/3">
            <MedicationDetail medicationId={selectedMedication} onClose={handleCloseDetail} />
          </div>
        )}
      </div>
    </div>
  )
}
