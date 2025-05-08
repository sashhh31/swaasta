"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MapPin, Upload, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  idType: z.enum(["pan", "aadhaar"]),
  idNumber: z.string().min(1, "ID number is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6, "Pincode must be 6 digits"),
})

type VerificationFormProps = {
  role: "doctor" | "pharmacy" | "laboratory"
}

export function VerificationForm({ role }: VerificationFormProps) {
  const [step, setStep] = useState(1)
  const [documentUploaded, setDocumentUploaded] = useState(false)
  const [idUploaded, setIdUploaded] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idType: "aadhaar",
      idNumber: "",
      licenseNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  })

  const roleTitle = {
    doctor: "Doctor",
    pharmacy: "Pharmacy",
    laboratory: "Laboratory",
  }

  const documentTitle = {
    doctor: "Medical License",
    pharmacy: "Pharmacy License",
    laboratory: "Laboratory Certification",
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step < 3) {
      setStep(step + 1)
    } else {
      console.log(values)
      setIsSubmitted(true)
    }
  }

  function handlePrevious() {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{roleTitle[role]} Verification</CardTitle>
        <CardDescription>
          Complete the verification process to start using the platform as a {roleTitle[role].toLowerCase()}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verification Submitted!</h3>
            <p className="text-gray-500 mb-6 max-w-xs">
              Your verification information has been submitted for review. You'll receive an email once your account is approved.
            </p>
            <div className="flex items-center justify-center p-4 border rounded-lg bg-yellow-50 border-yellow-200 w-full mb-4">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-sm text-yellow-700">Pending Admin Approval</p>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" className="mt-4">
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                        1
                      </div>
                      <span className="text-sm font-medium">Identity Verification</span>
                    </div>
                    <span className="text-xs text-gray-500">Step 1 of 3</span>
                  </div>

                  <FormField
                    control={form.control}
                    name="idType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>ID Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="aadhaar" id="aadhaar" />
                              <Label htmlFor="aadhaar">Aadhaar Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pan" id="pan" />
                              <Label htmlFor="pan">PAN Card</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your ID number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border rounded-md p-4 space-y-4">
                    <FormLabel className="block mb-2">Upload ID Proof</FormLabel>
                    <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer relative">
                      {idUploaded ? (
                        <div className="flex flex-col items-center text-green-600">
                          <CheckCircle className="h-10 w-10 mb-2" />
                          <span className="text-sm font-medium">Document Uploaded</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-500">
                          <Upload className="h-10 w-10 mb-2" />
                          <span className="text-sm font-medium">Upload Document</span>
                          <span className="text-xs mt-1">JPG, PNG or PDF (max 5MB)</span>
                        </div>
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={() => setIdUploaded(true)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                        2
                      </div>
                      <span className="text-sm font-medium">Professional Verification</span>
                    </div>
                    <span className="text-xs text-gray-500">Step 2 of 3</span>
                  </div>

                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{documentTitle[role]} Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your license number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border rounded-md p-4 space-y-4">
                    <FormLabel className="block mb-2">Upload {documentTitle[role]}</FormLabel>
                    <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer relative">
                      {documentUploaded ? (
                        <div className="flex flex-col items-center text-green-600">
                          <CheckCircle className="h-10 w-10 mb-2" />
                          <span className="text-sm font-medium">Document Uploaded</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-500">
                          <Upload className="h-10 w-10 mb-2" />
                          <span className="text-sm font-medium">Upload Document</span>
                          <span className="text-xs mt-1">JPG, PNG or PDF (max 5MB)</span>
                        </div>
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={() => setDocumentUploaded(true)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                        3
                      </div>
                      <span className="text-sm font-medium">Address Verification</span>
                    </div>
                    <span className="text-xs text-gray-500">Step 3 of 3</span>
                  </div>

                  <div className="flex items-center justify-center p-4 border rounded-lg bg-gray-50 mb-4">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm">Using your current location</span>
                    <Button variant="link" size="sm" className="ml-2 h-auto p-0">
                      Change
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="6-digit pincode" maxLength={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handlePrevious}>
                    Previous
                  </Button>
                ) : (
                  <Link href="/auth/register">
                    <Button variant="outline">Back</Button>
                  </Link>
                )}
                <Button type="submit">{step === 3 ? "Submit" : "Next"}</Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
} 