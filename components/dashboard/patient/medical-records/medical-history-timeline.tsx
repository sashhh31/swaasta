import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Pill, Stethoscope, TestTube } from "lucide-react"

export function MedicalHistoryTimeline() {
  // Mock medical history data
  const historyItems = [
    {
      id: "hist-1",
      title: "Annual Physical Examination",
      provider: "Dr. Sarah Smith",
      date: "May 2, 2025",
      category: "examination",
      description: "Routine annual physical examination with blood work and vitals check.",
    },
    {
      id: "hist-2",
      title: "Blood Test Results",
      provider: "LifeCare Laboratory",
      date: "April 28, 2025",
      category: "lab-result",
      description: "Complete blood count (CBC) and metabolic panel results.",
    },
    {
      id: "hist-3",
      title: "Cardiology Consultation",
      provider: "Dr. Michael Chen",
      date: "April 15, 2025",
      category: "consultation",
      description: "Consultation for heart palpitations and chest discomfort.",
    },
    {
      id: "hist-4",
      title: "Prescription Medication",
      provider: "MedPharm Pharmacy",
      date: "April 10, 2025",
      category: "prescription",
      description: "Lisinopril 10mg for hypertension management.",
    },
    {
      id: "hist-5",
      title: "X-Ray Results",
      provider: "LifeCare Laboratory",
      date: "March 22, 2025",
      category: "lab-result",
      description: "Chest X-ray to evaluate lung condition.",
    },
    {
      id: "hist-6",
      title: "Allergy Test Results",
      provider: "Dr. Jessica Williams",
      date: "March 15, 2025",
      category: "lab-result",
      description: "Comprehensive allergy panel testing for environmental and food allergies.",
    },
    {
      id: "hist-7",
      title: "Flu Vaccination",
      provider: "MedPharm Pharmacy",
      date: "October 10, 2024",
      category: "vaccination",
      description: "Annual influenza vaccination.",
    },
    {
      id: "hist-8",
      title: "Dental Checkup",
      provider: "Dr. Robert Wilson",
      date: "September 5, 2024",
      category: "examination",
      description: "Routine dental examination and cleaning.",
    },
  ]

  // Group history items by year and month
  const groupedHistory: Record<string, Record<string, typeof historyItems>> = {}

  historyItems.forEach((item) => {
    const date = new Date(item.date)
    const year = date.getFullYear().toString()
    const month = date.toLocaleString("default", { month: "long" })

    if (!groupedHistory[year]) {
      groupedHistory[year] = {}
    }

    if (!groupedHistory[year][month]) {
      groupedHistory[year][month] = []
    }

    groupedHistory[year][month].push(item)
  })

  return (
    <div className="space-y-8">
      {Object.entries(groupedHistory).map(([year, months]) => (
        <div key={year} className="space-y-6">
          <h3 className="text-lg font-semibold sticky top-0 bg-background py-2">{year}</h3>

          {Object.entries(months).map(([month, items]) => (
            <div key={month} className="space-y-2">
              <h4 className="text-md font-medium text-muted-foreground">{month}</h4>

              <div className="space-y-4 pl-4 border-l">
                {items.map((item) => (
                  <div key={item.id} className="relative pl-6">
                    <div className="absolute left-[-13px] p-1 rounded-full bg-background border">
                      {item.category === "examination" || item.category === "consultation" ? (
                        <Stethoscope className="h-3 w-3 text-primary" />
                      ) : item.category === "lab-result" ? (
                        <TestTube className="h-3 w-3 text-primary" />
                      ) : item.category === "vaccination" ? (
                        <FileText className="h-3 w-3 text-primary" />
                      ) : (
                        <Pill className="h-3 w-3 text-primary" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.title}</span>
                        <Badge variant="outline" className="capitalize">
                          {item.category.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{item.date}</span>
                      </div>
                      <p className="text-sm">{item.provider}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      <Button variant="outline" className="w-full">
        Load More History
      </Button>
    </div>
  )
}
