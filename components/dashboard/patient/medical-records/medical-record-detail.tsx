"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Download, FileText, Printer, Share2, Stethoscope, TestTube, Pill, X } from "lucide-react"

interface MedicalRecordDetailProps {
  recordId: string
  onClose: () => void
}

export function MedicalRecordDetail({ recordId, onClose }: MedicalRecordDetailProps) {
  const [activeTab, setActiveTab] = useState("details")

  // Mock record data based on recordId
  const record = {
    id: recordId,
    title:
      recordId === "rec-1"
        ? "Annual Physical Examination"
        : recordId === "rec-2"
          ? "Blood Test Results"
          : recordId === "rec-3"
            ? "Cardiology Consultation"
            : recordId === "rec-4"
              ? "Prescription Medication"
              : recordId === "rec-5"
                ? "X-Ray Results"
                : "Allergy Test Results",
    provider: {
      name:
        recordId === "rec-1"
          ? "Dr. Sarah Smith"
          : recordId === "rec-2"
            ? "LifeCare Laboratory"
            : recordId === "rec-3"
              ? "Dr. Michael Chen"
              : recordId === "rec-4"
                ? "MedPharm Pharmacy"
                : recordId === "rec-5"
                  ? "LifeCare Laboratory"
                  : "Dr. Jessica Williams",
      type:
        recordId === "rec-1" || recordId === "rec-3" || recordId === "rec-6"
          ? "doctor"
          : recordId === "rec-2" || recordId === "rec-5"
            ? "laboratory"
            : "pharmacy",
      specialty:
        recordId === "rec-1"
          ? "Primary Care Physician"
          : recordId === "rec-2" || recordId === "rec-5"
            ? "Diagnostic Lab"
            : recordId === "rec-3"
              ? "Cardiologist"
              : recordId === "rec-4"
                ? "Retail Pharmacy"
                : "Allergist",
    },
    date:
      recordId === "rec-1"
        ? "May 2, 2025"
        : recordId === "rec-2"
          ? "April 28, 2025"
          : recordId === "rec-3"
            ? "April 15, 2025"
            : recordId === "rec-4"
              ? "April 10, 2025"
              : recordId === "rec-5"
                ? "March 22, 2025"
                : "March 15, 2025",
    category:
      recordId === "rec-1"
        ? "examination"
        : recordId === "rec-2" || recordId === "rec-5" || recordId === "rec-6"
          ? "lab-result"
          : recordId === "rec-3"
            ? "consultation"
            : "prescription",
    description:
      recordId === "rec-1"
        ? "Routine annual physical examination with blood work and vitals check."
        : recordId === "rec-2"
          ? "Complete blood count (CBC) and metabolic panel results."
          : recordId === "rec-3"
            ? "Consultation for heart palpitations and chest discomfort."
            : recordId === "rec-4"
              ? "Lisinopril 10mg for hypertension management."
              : recordId === "rec-5"
                ? "Chest X-ray to evaluate lung condition."
                : "Comprehensive allergy panel testing for environmental and food allergies.",
    details: {
      summary:
        recordId === "rec-1"
          ? "Overall health is good. Blood pressure slightly elevated. Recommended lifestyle changes and follow-up in 6 months."
          : recordId === "rec-2"
            ? "All values within normal range except for slightly elevated cholesterol levels."
            : recordId === "rec-3"
              ? "No significant cardiac abnormalities detected. Recommended stress test and 24-hour heart monitoring."
              : recordId === "rec-4"
                ? "Take one tablet daily in the morning. Avoid grapefruit juice. Report any dizziness or persistent cough."
                : recordId === "rec-5"
                  ? "No abnormalities detected in the lungs. Clear chest X-ray."
                  : "Positive reactions to dust mites, cat dander, and peanuts. Recommended avoidance strategies and prescription for EpiPen.",
      vitals:
        recordId === "rec-1"
          ? {
              bloodPressure: "135/85 mmHg",
              heartRate: "72 bpm",
              temperature: "98.6°F",
              respiratoryRate: "16 breaths/min",
              weight: "170 lbs",
              height: "5'10\"",
              bmi: "24.4",
            }
          : null,
      labResults:
        recordId === "rec-2"
          ? {
              glucose: "95 mg/dL",
              cholesterol: {
                total: "210 mg/dL",
                hdl: "55 mg/dL",
                ldl: "130 mg/dL",
                triglycerides: "125 mg/dL",
              },
              wbc: "7.5 x10^9/L",
              rbc: "5.0 x10^12/L",
              platelets: "250 x10^9/L",
            }
          : recordId === "rec-6"
            ? {
                allergens: [
                  { name: "Dust Mites", reaction: "Positive" },
                  { name: "Cat Dander", reaction: "Positive" },
                  { name: "Dog Dander", reaction: "Negative" },
                  { name: "Pollen", reaction: "Negative" },
                  { name: "Mold", reaction: "Negative" },
                  { name: "Peanuts", reaction: "Positive" },
                  { name: "Tree Nuts", reaction: "Negative" },
                  { name: "Shellfish", reaction: "Negative" },
                ],
              }
            : null,
      prescription:
        recordId === "rec-4"
          ? {
              medication: "Lisinopril",
              dosage: "10mg",
              frequency: "Once daily",
              duration: "90 days",
              refills: 3,
              instructions:
                "Take one tablet by mouth once daily in the morning. Avoid grapefruit juice. Report any dizziness or persistent cough.",
            }
          : null,
      recommendations:
        recordId === "rec-1"
          ? ["Reduce sodium intake", "Exercise 30 minutes daily", "Follow up in 6 months"]
          : recordId === "rec-2"
            ? ["Reduce saturated fat intake", "Increase physical activity", "Recheck cholesterol in 3 months"]
            : recordId === "rec-3"
              ? ["Schedule stress test", "Wear 24-hour heart monitor", "Follow up in 2 weeks"]
              : recordId === "rec-4"
                ? ["Monitor blood pressure weekly", "Report any side effects", "Schedule follow-up in 1 month"]
                : recordId === "rec-5"
                  ? ["No specific recommendations", "Continue regular check-ups"]
                  : ["Avoid identified allergens", "Carry EpiPen at all times", "Consider allergy immunotherapy"],
    },
    files: [
      { id: "file-1", name: `${record ? record.title : "Medical Record"}.pdf`, type: "pdf", size: "1.2 MB" },
      { id: "file-2", name: "Raw Data.csv", type: "csv", size: "450 KB" },
    ],
  }

  return (
    <Card className="sticky top-20">
      <CardHeader className="relative pb-2">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
            {record.category === "examination" || record.category === "consultation" ? (
              <Stethoscope className="h-8 w-8 text-primary" />
            ) : record.category === "lab-result" ? (
              <TestTube className="h-8 w-8 text-primary" />
            ) : (
              <Pill className="h-8 w-8 text-primary" />
            )}
          </div>
          <CardTitle>{record.title}</CardTitle>
          <CardDescription className="mt-1">{record.provider.name}</CardDescription>
          <Badge variant="outline" className="mt-2 capitalize">
            {record.category.replace("-", " ")}
          </Badge>
        </div>
      </CardHeader>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-4">
          <TabsContent value="details" className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-sm text-muted-foreground">{record.date}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">Description</div>
                  <div className="text-sm text-muted-foreground">{record.description}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Summary</h4>
              <p className="text-sm text-muted-foreground">{record.details.summary}</p>
            </div>

            {record.details.vitals && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Vitals</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">
                      <span className="font-medium">Blood Pressure:</span>{" "}
                      <span className="text-muted-foreground">{record.details.vitals.bloodPressure}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Heart Rate:</span>{" "}
                      <span className="text-muted-foreground">{record.details.vitals.heartRate}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Temperature:</span>{" "}
                      <span className="text-muted-foreground">{record.details.vitals.temperature}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Respiratory Rate:</span>{" "}
                      <span className="text-muted-foreground">{record.details.vitals.respiratoryRate}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Weight:</span>{" "}
                      <span className="text-muted-foreground">{record.details.vitals.weight}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Height:</span>{" "}
                      <span className="text-muted-foreground">{record.details.vitals.height}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">BMI:</span>{" "}
                      <span className="text-muted-foreground">{record.details.vitals.bmi}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {record.details.labResults && record.id === "rec-2" && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Lab Results</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium">Blood Glucose</div>
                      <div className="text-sm text-muted-foreground">{record.details.labResults.glucose}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Cholesterol</div>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Total: {record.details.labResults.cholesterol.total}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            HDL: {record.details.labResults.cholesterol.hdl}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            LDL: {record.details.labResults.cholesterol.ldl}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Triglycerides: {record.details.labResults.cholesterol.triglycerides}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Blood Cell Count</div>
                      <div className="grid grid-cols-1 gap-2 mt-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            White Blood Cells: {record.details.labResults.wbc}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Red Blood Cells: {record.details.labResults.rbc}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Platelets: {record.details.labResults.platelets}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {record.details.labResults && record.id === "rec-6" && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Allergy Test Results</h4>
                  <div className="space-y-2">
                    {record.details.labResults.allergens.map((allergen, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{allergen.name}</span>
                        <Badge variant={allergen.reaction === "Positive" ? "destructive" : "outline"}>
                          {allergen.reaction}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {record.details.prescription && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Prescription Details</h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Medication:</span>{" "}
                      <span className="text-muted-foreground">{record.details.prescription.medication}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Dosage:</span>{" "}
                      <span className="text-muted-foreground">{record.details.prescription.dosage}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Frequency:</span>{" "}
                      <span className="text-muted-foreground">{record.details.prescription.frequency}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Duration:</span>{" "}
                      <span className="text-muted-foreground">{record.details.prescription.duration}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Refills:</span>{" "}
                      <span className="text-muted-foreground">{record.details.prescription.refills}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Instructions:</span>{" "}
                      <span className="text-muted-foreground">{record.details.prescription.instructions}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {record.details.recommendations && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {record.details.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="files">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Files</h4>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>

              <div className="space-y-2">
                {record.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.size}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" className="w-full">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" className="w-full ml-2">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button className="w-full ml-2">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </CardFooter>
      </Tabs>
    </Card>
  )
}
