"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileDown, Printer, Share2 } from "lucide-react"

interface CertificateData {
  id: string
  title: string
  recipientName: string
  issuedBy: string
  issuedDate: Date
  description?: string
  additionalDetails?: Record<string, string>
  logo?: string
  signature?: string
}

interface CertificateGeneratorProps {
  data: CertificateData
  type: "appointment" | "report" | "prescription"
}

export function CertificateGenerator({ data, type }: CertificateGeneratorProps) {
  const [format, setFormat] = useState<"pdf" | "print">("pdf")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    console.log("Downloading certificate:", data.id)
    // For demonstration, we'll just show an alert
    alert(`Certificate ${data.id} would be downloaded as a PDF`)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    // In a real application, this would open a share dialog
    console.log("Sharing certificate:", data.id)
    // For demonstration, we'll just show an alert
    alert(`Certificate ${data.id} would be shared`)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="download">Download Options</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <FileDown className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <TabsContent value="preview" className="mt-0">
          <Card className="border-2 print:border-0">
            <CardContent className="p-6">
              <div className="certificate-container" id="certificate-container">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                    {data.logo ? (
                      <img src={data.logo} alt="Logo" className="h-16 w-auto mr-4" />
                    ) : (
                      <div className="h-16 w-16 bg-primary/10 flex items-center justify-center rounded-full mr-4">
                        <span className="font-bold text-xl text-primary">HC</span>
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold">Swaasta</h1>
                      <p className="text-gray-500">Your Health, Our Priority</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Certificate ID</p>
                    <p className="font-medium">{data.id}</p>
                  </div>
                </div>

                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold mb-2">
                    {type === "appointment"
                      ? "Appointment Confirmation"
                      : type === "report"
                      ? "Medical Report"
                      : "Prescription Certificate"}
                  </h2>
                  <div className="w-32 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="mb-8">
                  <p className="text-center text-lg">
                    This is to certify that{" "}
                    <span className="font-bold">{data.recipientName}</span>{" "}
                    {type === "appointment"
                      ? "has scheduled an appointment with"
                      : type === "report"
                      ? "has received a medical report from"
                      : "has been prescribed medication by"}{" "}
                    <span className="font-bold">{data.issuedBy}</span> on{" "}
                    <span className="font-bold">{formatDate(data.issuedDate)}</span>.
                  </p>
                </div>

                {data.description && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <p className="text-gray-700">{data.description}</p>
                  </div>
                )}

                {data.additionalDetails && Object.keys(data.additionalDetails).length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        {Object.entries(data.additionalDetails).map(([key, value]) => (
                          <tr key={key} className="border-b">
                            <td className="py-2 font-medium">{key}</td>
                            <td className="py-2">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="flex justify-between items-end mt-16">
                  <div>
                    <p className="text-sm text-gray-500">Date of Issue</p>
                    <p>{formatDate(new Date())}</p>
                  </div>
                  <div className="text-center">
                    {data.signature ? (
                      <img src={data.signature} alt="Signature" className="h-16 mb-2" />
                    ) : (
                      <div className="h-16 border-b border-dashed mb-2 w-40"></div>
                    )}
                    <p className="font-medium">{data.issuedBy}</p>
                    <p className="text-sm text-gray-500">
                      {type === "appointment"
                        ? "Healthcare Provider"
                        : type === "report"
                        ? "Medical Professional"
                        : "Authorized Physician"}
                    </p>
                  </div>
                </div>

                <div className="mt-16 pt-4 border-t text-center text-xs text-gray-500">
                  <p>This document is electronically generated and doesn't require a physical signature.</p>
                  <p className="mt-1">
                    Verify this certificate's authenticity at{" "}
                    <span className="text-primary">www.Swaasta.com/verify</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="download" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Download Options</h3>
                  <p className="text-gray-500">
                    Choose the format you want to download the certificate in.
                  </p>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      format === "pdf" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setFormat("pdf")}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">PDF Document</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Download as a standard PDF document that can be printed or shared digitally.
                        </p>
                      </div>
                      <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                        {format === "pdf" && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      format === "print" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setFormat("print")}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Print Version</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Optimized for printing with adjusted margins and no background colors.
                        </p>
                      </div>
                      <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                        {format === "print" && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Instead
                  </Button>
                  <Button onClick={format === "print" ? handlePrint : handleDownload}>
                    {format === "print" ? (
                      <>
                        <Printer className="h-4 w-4 mr-2" />
                        Print Now
                      </>
                    ) : (
                      <>
                        <FileDown className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 