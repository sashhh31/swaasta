"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Filter,
  Search,
  Upload,
  Download,
  FileText,
  Calendar,
  Clock,
  AlertCircle,
  ChevronRight,
  X,
  Eye,
  Paperclip,
  FileImage,
  FileIcon as FilePdf,
  FileSpreadsheet,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for medical records
const mockMedicalRecords = [
  {
    id: "rec1",
    title: "Annual Physical Examination",
    date: "2025-04-15",
    doctor: "Dr. Emily Carter",
    specialty: "Internal Medicine",
    facility: "Mercy Hospital",
    type: "Examination",
    files: [
      { name: "Physical_Exam_Report.pdf", type: "pdf", size: "1.2 MB" },
      { name: "Blood_Work_Results.pdf", type: "pdf", size: "0.8 MB" },
    ],
    summary:
      "Annual physical examination shows all vitals within normal range. Cholesterol slightly elevated, recommended dietary changes and follow-up in 6 months.",
    tags: ["physical", "annual", "preventive"],
  },
  {
    id: "rec2",
    title: "Cardiology Consultation",
    date: "2025-03-10",
    doctor: "Dr. James Wilson",
    specialty: "Cardiology",
    facility: "Heart Institute",
    type: "Consultation",
    files: [
      { name: "Cardio_Consultation.pdf", type: "pdf", size: "1.5 MB" },
      { name: "ECG_Results.jpg", type: "image", size: "3.2 MB" },
      { name: "Heart_Scan.jpg", type: "image", size: "4.1 MB" },
    ],
    summary:
      "Consultation for occasional chest pain. ECG shows normal sinus rhythm. Stress test recommended as precautionary measure.",
    tags: ["cardiology", "consultation", "chest pain"],
  },
  {
    id: "rec3",
    title: "Vaccination Record",
    date: "2025-02-20",
    doctor: "Dr. Lisa Ray",
    specialty: "Family Medicine",
    facility: "Community Health Center",
    type: "Immunization",
    files: [{ name: "Vaccination_Record.pdf", type: "pdf", size: "0.5 MB" }],
    summary:
      "Received annual flu vaccine and COVID-19 booster. No adverse reactions observed during 15-minute monitoring period.",
    tags: ["vaccination", "immunization", "preventive"],
  },
  {
    id: "rec4",
    title: "Dermatology Follow-up",
    date: "2025-01-05",
    doctor: "Dr. Sarah Johnson",
    specialty: "Dermatology",
    facility: "Skin Care Clinic",
    type: "Follow-up",
    files: [
      { name: "Dermatology_Notes.pdf", type: "pdf", size: "0.7 MB" },
      { name: "Skin_Condition_Photos.jpg", type: "image", size: "2.8 MB" },
    ],
    summary:
      "Follow-up for eczema treatment. Condition has improved with prescribed medication. Continuing current treatment plan with reduced frequency.",
    tags: ["dermatology", "eczema", "follow-up"],
  },
  {
    id: "rec5",
    title: "Laboratory Results",
    date: "2024-12-18",
    doctor: "Dr. Michael Chang",
    specialty: "Pathology",
    facility: "MedLab Diagnostics",
    type: "Lab Test",
    files: [
      { name: "Complete_Blood_Count.pdf", type: "pdf", size: "0.9 MB" },
      { name: "Lipid_Panel.pdf", type: "pdf", size: "0.6 MB" },
      { name: "Lab_Results_Summary.xlsx", type: "spreadsheet", size: "1.1 MB" },
    ],
    summary:
      "Comprehensive blood work including CBC, metabolic panel, and lipid profile. All results within normal range except slightly elevated LDL cholesterol.",
    tags: ["laboratory", "blood work", "diagnostic"],
  },
]

// Mock data for medical history timeline
const mockMedicalHistory = [
  {
    id: "hist1",
    date: "2025-04-15",
    event: "Annual Physical Examination",
    description: "Routine check-up with Dr. Emily Carter",
    type: "examination",
  },
  {
    id: "hist2",
    date: "2025-03-10",
    event: "Cardiology Consultation",
    description: "Consultation for occasional chest pain with Dr. James Wilson",
    type: "consultation",
  },
  {
    id: "hist3",
    date: "2025-02-20",
    event: "Vaccination",
    description: "Received annual flu vaccine and COVID-19 booster",
    type: "immunization",
  },
  {
    id: "hist4",
    date: "2025-01-05",
    event: "Dermatology Follow-up",
    description: "Follow-up for eczema treatment with Dr. Sarah Johnson",
    type: "follow-up",
  },
  {
    id: "hist5",
    date: "2024-12-18",
    event: "Laboratory Tests",
    description: "Comprehensive blood work at MedLab Diagnostics",
    type: "lab-test",
  },
  {
    id: "hist6",
    date: "2024-11-03",
    event: "Dental Check-up",
    description: "Routine dental examination and cleaning",
    type: "dental",
  },
  {
    id: "hist7",
    date: "2024-09-22",
    event: "Ophthalmology Appointment",
    description: "Annual eye examination and prescription update",
    type: "eye-exam",
  },
  {
    id: "hist8",
    date: "2024-07-14",
    event: "Urgent Care Visit",
    description: "Treatment for acute bronchitis",
    type: "urgent-care",
  },
]

// Helper function to get file icon
const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FilePdf className="w-4 h-4 text-rose-500" />
    case "image":
      return <FileImage className="w-4 h-4 text-cyan-500" />
    case "spreadsheet":
      return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
    default:
      return <FileText className="w-4 h-4 text-primary" />
  }
}

// Helper function to get event type icon and color
const getEventTypeConfig = (type: string) => {
  switch (type) {
    case "examination":
      return {
        icon: <Calendar className="w-4 h-4" />,
        color: "bg-blue-500 dark:bg-blue-600",
      }
    case "consultation":
      return {
        icon: <FileText className="w-4 h-4" />,
        color: "bg-purple-500 dark:bg-purple-600",
      }
    case "immunization":
      return {
        icon: <Sparkles className="w-4 h-4" />,
        color: "bg-emerald-500 dark:bg-emerald-600",
      }
    case "follow-up":
      return {
        icon: <Clock className="w-4 h-4" />,
        color: "bg-amber-500 dark:bg-amber-600",
      }
    case "lab-test":
      return {
        icon: <FileText className="w-4 h-4" />,
        color: "bg-cyan-500 dark:bg-cyan-600",
      }
    case "dental":
      return {
        icon: <FileText className="w-4 h-4" />,
        color: "bg-indigo-500 dark:bg-indigo-600",
      }
    case "eye-exam":
      return {
        icon: <Eye className="w-4 h-4" />,
        color: "bg-teal-500 dark:bg-teal-600",
      }
    case "urgent-care":
      return {
        icon: <AlertCircle className="w-4 h-4" />,
        color: "bg-rose-500 dark:bg-rose-600",
      }
    default:
      return {
        icon: <FileText className="w-4 h-4" />,
        color: "bg-gray-500 dark:bg-gray-600",
      }
  }
}

interface MedicalRecordsListProps {
  onRecordSelect: (recordId: string) => void
  searchQuery: string
}

const MedicalRecordsList = ({ onRecordSelect, searchQuery }: MedicalRecordsListProps) => {
  const filteredRecords = mockMedicalRecords.filter(
    (record) =>
      searchQuery === "" ||
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  if (filteredRecords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="bg-primary/10 rounded-full p-6 mb-4">
          <Search className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">No records found{searchQuery ? ` for "${searchQuery}"` : ""}</h3>
        <p className="text-muted-foreground max-w-sm">
          {searchQuery
            ? "Try adjusting your search or filters to find what you're looking for."
            : "Your medical records will appear here once they are added."}
        </p>
        <Button className="mt-6" size="lg">
          <Upload className="mr-2 h-4 w-4" /> Upload Medical Records
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredRecords.map((record) => (
        <Card
          key={record.id}
          className="hover:shadow-md dark:hover:shadow-primary/10 transition-all cursor-pointer border-muted/50 hover:border-primary/30"
          onClick={() => onRecordSelect(record.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>

              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-medium text-base">{record.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {record.doctor} • {record.specialty}
                    </p>
                  </div>

                  <Badge variant="outline" className="w-fit flex items-center h-5 capitalize">
                    {record.type}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                    {new Date(record.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <FileText className="w-3 h-3 mr-1 flex-shrink-0" />
                    {record.facility}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Paperclip className="w-3 h-3 mr-1 flex-shrink-0" />
                    {record.files.length} file{record.files.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-2 line-clamp-1">{record.summary}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {record.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="hidden sm:flex items-center self-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface MedicalRecordDetailProps {
  recordId: string
  onClose: () => void
}

const MedicalRecordDetail = ({ recordId, onClose }: MedicalRecordDetailProps) => {
  const record = mockMedicalRecords.find((r) => r.id === recordId)

  if (!record)
    return (
      <Card className="h-full shadow-none lg:shadow-xl border-0 lg:border rounded-none lg:rounded-lg flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Not Found</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="py-6 flex-grow">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p>Record details could not be loaded.</p>
          </div>
        </CardContent>
      </Card>
    )

  return (
    <Card className="h-full shadow-none lg:shadow-xl border-0 lg:border rounded-none lg:rounded-lg flex flex-col">
      <div className="h-1.5 w-full bg-primary"></div>
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2 capitalize">
              {record.type}
            </Badge>
            <CardTitle className="text-xl mb-1">{record.title}</CardTitle>
            <CardDescription>
              {new Date(record.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <ScrollArea className="flex-grow">
        <CardContent className="p-4 space-y-6">
          {/* Provider Information */}
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {record.doctor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{record.doctor}</h3>
              <p className="text-sm text-muted-foreground">{record.specialty}</p>
              <p className="text-sm text-muted-foreground">{record.facility}</p>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h4 className="text-sm font-medium mb-2">Summary</h4>
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm whitespace-pre-wrap">{record.summary}</p>
            </div>
          </div>

          {/* Files */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-muted-foreground" />
              Attached Files ({record.files.length})
            </h4>
            <div className="space-y-2">
              {record.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-sm font-medium mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {record.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </ScrollArea>

      <CardFooter className="border-t p-4">
        <div className="flex gap-2 w-full">
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button variant="default" className="flex-1">
            <Eye className="mr-2 h-4 w-4" /> View Full Record
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const MedicalHistoryTimeline = () => {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[9px] before:w-0.5 before:bg-muted">
      {mockMedicalHistory.map((event, index) => {
        const typeConfig = getEventTypeConfig(event.type)
        return (
          <div key={event.id} className="relative">
            <div
              className={`absolute left-[-23px] flex h-6 w-6 items-center justify-center rounded-full ${typeConfig.color} text-white`}
            >
              {typeConfig.icon}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <time className="text-sm font-medium text-primary">
                {new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </time>
              <div className="bg-muted/30 p-3 rounded-md flex-grow">
                <h3 className="font-medium">{event.event}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("records")
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)

  const handleRecordSelect = (recordId: string) => {
    setSelectedRecord(recordId)
  }

  const handleCloseDetail = () => {
    setSelectedRecord(null)
  }

  return (
    <div className="space-y-6 w-full bg-gradient-to-b from-background to-background/95">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Medical Records</h2>
        <p className="text-muted-foreground">Access and manage your medical records and history</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1 space-y-4">
          <Card className="border-muted/50">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search records..."
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
                  <Button size="sm" className="flex items-center gap-1 bg-primary hover:bg-primary/90">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </CardHeader>
            {showFilters && (
              <div className="px-4 pb-3">
                <div className="p-3 bg-muted/30 rounded-lg space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Record Type</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Examination
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Consultation
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Lab Test
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Immunization
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Follow-up
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Date Range</label>
                    <div className="flex gap-2">
                      <Input type="date" className="text-xs h-8" />
                      <span className="flex items-center text-muted-foreground">to</span>
                      <Input type="date" className="text-xs h-8" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      Clear
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Tabs defaultValue="records" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="records" className="relative data-[state=active]:bg-transparent">
                Medical Records
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
              </TabsTrigger>
              <TabsTrigger value="history" className="relative data-[state=active]:bg-transparent">
                Medical History
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="records" className="mt-4">
              <MedicalRecordsList onRecordSelect={handleRecordSelect} searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History Timeline</CardTitle>
                  <CardDescription>Your medical history over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <MedicalHistoryTimeline />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {selectedRecord && (
          <div className="w-full md:w-1/3">
            <MedicalRecordDetail recordId={selectedRecord} onClose={handleCloseDetail} />
          </div>
        )}
      </div>
    </div>
  )
}
