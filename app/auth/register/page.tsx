"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, FileText, HelpCircle, Upload } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [userType, setUserType] = useState("patient")
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({})

  const handleFileUpload = (fileType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name
      setUploadedFiles({ ...uploadedFiles, [fileType]: fileName })
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Create Your Account</h1>
        <p className="text-muted-foreground mt-2">
          Join MediMart to access healthcare products and services tailored to your needs
        </p>
      </div>

      <Tabs defaultValue="patient" onValueChange={setUserType} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="patient">Patient</TabsTrigger>
          <TabsTrigger value="doctor">Doctor</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
          <TabsTrigger value="hospital">Hospital</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>
              {userType === "patient"
                ? "Patient Registration"
                : userType === "doctor"
                  ? "Doctor Registration"
                  : userType === "pharmacy"
                    ? "Pharmacy Registration"
                    : "Hospital Registration"}
            </CardTitle>
            <CardDescription>
              {userType === "patient"
                ? "Create your patient account to order medicines and track your health"
                : "Please provide your professional details for verification"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Common Fields for All User Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" required />
              </div>
            </div>

            {/* Patient-specific Fields */}
            <TabsContent value="patient" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter your first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter your last name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter your full address" rows={3} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Emergency Contact (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Contact Name" />
                  <Input placeholder="Contact Phone Number" />
                </div>
              </div>
            </TabsContent>

            {/* Doctor-specific Fields */}
            <TabsContent value="doctor" className="space-y-6 mt-6">
              <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Verification Required</AlertTitle>
                <AlertDescription>
                  Doctor accounts require verification. Your account will be pending until we verify your credentials.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="doctor-name">Full Name</Label>
                  <Input id="doctor-name" placeholder="Dr. Full Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select>
                    <SelectTrigger id="specialization">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general-physician">General Physician</SelectItem>
                      <SelectItem value="cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="dermatologist">Dermatologist</SelectItem>
                      <SelectItem value="neurologist">Neurologist</SelectItem>
                      <SelectItem value="pediatrician">Pediatrician</SelectItem>
                      <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                      <SelectItem value="orthopedic">Orthopedic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medical-license">Medical License Number</Label>
                  <Input id="medical-license" placeholder="Enter your license number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medical-council">Medical Council</Label>
                  <Select>
                    <SelectTrigger id="medical-council">
                      <SelectValue placeholder="Select medical council" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mci">Medical Council of India (MCI)</SelectItem>
                      <SelectItem value="nmc">National Medical Commission (NMC)</SelectItem>
                      <SelectItem value="state">State Medical Council</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="clinic-address">Clinic/Hospital Address</Label>
                  <Textarea id="clinic-address" placeholder="Enter your clinic or hospital address" rows={3} />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Required Documents</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Medical Degree Certificate
                    </div>
                    <p className="text-sm text-muted-foreground">Upload a scanned copy of your medical degree</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="degree-certificate"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("degree", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("degree-certificate")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.degree ? uploadedFiles.degree : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Medical License
                    </div>
                    <p className="text-sm text-muted-foreground">Upload a scanned copy of your medical license</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="medical-license-file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("license", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("medical-license-file")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.license ? uploadedFiles.license : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Identity Proof
                    </div>
                    <p className="text-sm text-muted-foreground">Upload Aadhaar Card, PAN Card, or Passport</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="identity-proof"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("identity", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("identity-proof")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.identity ? uploadedFiles.identity : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Registration Certificate
                    </div>
                    <p className="text-sm text-muted-foreground">Upload Medical Council Registration Certificate</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="registration-certificate"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("registration", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("registration-certificate")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.registration ? uploadedFiles.registration : "Choose File"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Pharmacy-specific Fields */}
            <TabsContent value="pharmacy" className="space-y-6 mt-6">
              <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Verification Required</AlertTitle>
                <AlertDescription>
                  Pharmacy accounts require verification. Your account will be pending until we verify your credentials.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pharmacy-name">Pharmacy Name</Label>
                  <Input id="pharmacy-name" placeholder="Enter pharmacy name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Owner Name</Label>
                  <Input id="owner-name" placeholder="Enter owner's full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pharmacy-license">Pharmacy License Number</Label>
                  <Input id="pharmacy-license" placeholder="Enter license number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gst-number">GST Number</Label>
                  <Input id="gst-number" placeholder="Enter GST number" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pharmacy-address">Pharmacy Address</Label>
                  <Textarea id="pharmacy-address" placeholder="Enter complete pharmacy address" rows={3} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pharmacist-name">Registered Pharmacist Name</Label>
                  <Input id="pharmacist-name" placeholder="Enter registered pharmacist name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pharmacist-registration">Pharmacist Registration Number</Label>
                  <Input id="pharmacist-registration" placeholder="Enter registration number" required />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Required Documents</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Pharmacy License
                    </div>
                    <p className="text-sm text-muted-foreground">Upload a scanned copy of your pharmacy license</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="pharmacy-license-file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("pharmacyLicense", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("pharmacy-license-file")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.pharmacyLicense ? uploadedFiles.pharmacyLicense : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      GST Registration Certificate
                    </div>
                    <p className="text-sm text-muted-foreground">Upload GST registration certificate</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="gst-certificate"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("gstCertificate", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("gst-certificate")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.gstCertificate ? uploadedFiles.gstCertificate : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Pharmacist Registration Certificate
                    </div>
                    <p className="text-sm text-muted-foreground">Upload registered pharmacist certificate</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="pharmacist-certificate"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("pharmacistCertificate", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("pharmacist-certificate")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.pharmacistCertificate ? uploadedFiles.pharmacistCertificate : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Drug License (Form 20 & 21)
                    </div>
                    <p className="text-sm text-muted-foreground">Upload Form 20 & 21 as per Drugs and Cosmetics Act</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="drug-license"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("drugLicense", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("drug-license")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.drugLicense ? uploadedFiles.drugLicense : "Choose File"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Hospital-specific Fields */}
            <TabsContent value="hospital" className="space-y-6 mt-6">
              <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Verification Required</AlertTitle>
                <AlertDescription>
                  Hospital accounts require verification. Your account will be pending until we verify your credentials.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hospital-name">Hospital Name</Label>
                  <Input id="hospital-name" placeholder="Enter hospital name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-type">Hospital Type</Label>
                  <Select>
                    <SelectTrigger id="hospital-type">
                      <SelectValue placeholder="Select hospital type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government Hospital</SelectItem>
                      <SelectItem value="private">Private Hospital</SelectItem>
                      <SelectItem value="charitable">Charitable Hospital</SelectItem>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="nursing-home">Nursing Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Administrator Name</Label>
                  <Input id="admin-name" placeholder="Enter administrator's name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-registration">Hospital Registration Number</Label>
                  <Input id="hospital-registration" placeholder="Enter registration number" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="hospital-address">Hospital Address</Label>
                  <Textarea id="hospital-address" placeholder="Enter complete hospital address" rows={3} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bed-capacity">Bed Capacity</Label>
                  <Input id="bed-capacity" type="number" placeholder="Enter number of beds" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-contact">Hospital Contact Number</Label>
                  <Input id="hospital-contact" placeholder="Enter hospital contact number" required />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Required Documents</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Hospital Registration Certificate
                    </div>
                    <p className="text-sm text-muted-foreground">Upload hospital registration certificate</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="hospital-certificate"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("hospitalCertificate", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("hospital-certificate")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.hospitalCertificate ? uploadedFiles.hospitalCertificate : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      NABH/JCI Accreditation (if applicable)
                    </div>
                    <p className="text-sm text-muted-foreground">Upload accreditation certificate if available</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="accreditation"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("accreditation", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("accreditation")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.accreditation ? uploadedFiles.accreditation : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Clinical Establishment License
                    </div>
                    <p className="text-sm text-muted-foreground">Upload clinical establishment license</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="clinical-license"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("clinicalLicense", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("clinical-license")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.clinicalLicense ? uploadedFiles.clinicalLicense : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Fire Safety Certificate
                    </div>
                    <p className="text-sm text-muted-foreground">Upload fire safety NOC certificate</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        id="fire-certificate"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("fireCertificate", e)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("fire-certificate")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadedFiles.fireCertificate ? uploadedFiles.fireCertificate : "Choose File"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Approval Status Information */}
            {userType !== "patient" && (
              <div className="bg-muted p-4 rounded-lg space-y-4">
                <div className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  Approval Process
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 text-amber-500">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Submission:</span> Your application will be submitted for review
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 text-amber-500">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Verification:</span> Our team will verify your documents and
                      credentials (2-3 business days)
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Approval:</span> Once approved, you'll receive full access to your
                      account
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-top space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="#" className="text-emerald-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-emerald-600 hover:underline">
                    Privacy Policy
                  </Link>
                  . I confirm that all information provided is accurate and complete.
                </Label>
              </div>

              {userType !== "patient" && (
                <div className="flex items-top space-x-2">
                  <Checkbox id="certification" />
                  <Label htmlFor="certification" className="text-sm font-normal">
                    I certify that I am authorized to register this {userType} and that all documents provided are
                    authentic and valid as per Indian regulations.
                  </Label>
                </div>
              )}
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              {userType === "patient" ? "Create Account" : "Submit for Verification"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
