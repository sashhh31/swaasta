"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  StarIcon,
  MapPin,
  Phone,
  Mail,
  Globe,
  X,
  MessageSquare,
  CalendarIcon,
  Stethoscope,
  Pill,
  TestTube,
} from "lucide-react"
import { ProviderReviews } from "./provider-reviews"
import { BookAppointment } from "./book-appointment"

interface ServiceProviderDetailProps {
  providerId: string
  onClose: () => void
}

export function ServiceProviderDetail({ providerId, onClose }: ServiceProviderDetailProps) {
  const [activeTab, setActiveTab] = useState("about")

  // Mock data for the selected provider
  const provider = {
    id: providerId,
    name:
      providerId === "doc-1"
        ? "Dr. Sarah Smith"
        : providerId === "doc-2"
          ? "Dr. Michael Chen"
          : providerId === "pharm-1"
            ? "MedPharm Pharmacy"
            : "LifeCare Laboratory",
    type: providerId.startsWith("doc") ? "doctor" : providerId.startsWith("pharm") ? "pharmacy" : "laboratory",
    specialty:
      providerId === "doc-1"
        ? "Cardiologist"
        : providerId === "doc-2"
          ? "Dermatologist"
          : providerId === "pharm-1"
            ? "Retail Pharmacy"
            : "Diagnostic Lab",
    address: "123 Medical Ave, New York, NY",
    phone: "(555) 123-4567",
    email: "contact@example.com",
    website: "www.example.com",
    hours: [
      { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    services: ["General Consultation", "Preventive Care", "Chronic Disease Management", "Health Screenings"],
    education: providerId.startsWith("doc")
      ? [
          { degree: "MD", institution: "Harvard Medical School", year: "2010" },
          { degree: "Residency", institution: "Johns Hopkins Hospital", year: "2014" },
        ]
      : [],
    rating: 4.8,
    reviews: 124,
    avatar: "/placeholder.svg?height=80&width=80",
  }

  return (
    <Card className="sticky top-20">
      <CardHeader className="relative pb-2">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-2">
            <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
            <AvatarFallback>
              {provider.type === "doctor" ? "DR" : provider.type === "pharmacy" ? "PH" : "LB"}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{provider.name}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="outline"
              className={`flex items-center gap-1 ${
                provider.type === "doctor"
                  ? "text-blue-600 dark:text-blue-400"
                  : provider.type === "pharmacy"
                    ? "text-green-600 dark:text-green-400"
                    : "text-purple-600 dark:text-purple-400"
              }`}
            >
              {provider.type === "doctor" ? (
                <Stethoscope className="h-3 w-3" />
              ) : provider.type === "pharmacy" ? (
                <Pill className="h-3 w-3" />
              ) : (
                <TestTube className="h-3 w-3" />
              )}
              <span className="capitalize">{provider.type}</span>
            </Badge>
            <CardDescription>{provider.specialty}</CardDescription>
          </div>
          <div className="flex items-center mt-2">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{provider.rating}</span>
            <span className="text-muted-foreground ml-1">({provider.reviews} reviews)</span>
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="book">Book</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-4">
          <TabsContent value="about" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{provider.address}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{provider.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{provider.website}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Hours</h4>
              <div className="space-y-1">
                {provider.hours.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.day}</span>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">About</h4>
              <p className="text-sm text-muted-foreground">{provider.about}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Services</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {provider.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>

            {provider.type === "doctor" && provider.education.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Education & Training</h4>
                  <div className="space-y-2">
                    {provider.education.map((edu, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-muted-foreground">
                          {edu.institution}, {edu.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            <ProviderReviews providerId={providerId} />
          </TabsContent>

          <TabsContent value="book">
            <BookAppointment provider={provider} />
          </TabsContent>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" className="w-full" onClick={() => setActiveTab("reviews")}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Read Reviews
          </Button>
          <Button className="w-full ml-2" onClick={() => setActiveTab("book")}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </CardFooter>
      </Tabs>
    </Card>
  )
}
