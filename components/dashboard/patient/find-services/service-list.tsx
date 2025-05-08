"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarIcon, MapPin, Clock, Stethoscope, Pill, TestTube } from "lucide-react"

interface ServiceListProps {
  activeTab: string
  onProviderSelect: (providerId: string) => void
}

export function ServiceList({ activeTab, onProviderSelect }: ServiceListProps) {
  // Mock data for service providers
  const serviceProviders = [
    {
      id: "doc-1",
      name: "Dr. Sarah Smith",
      type: "doctor",
      specialty: "Cardiologist",
      address: "123 Medical Ave, New York, NY",
      distance: "0.8 miles",
      availability: "Available today",
      rating: 4.8,
      reviews: 124,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "doc-2",
      name: "Dr. Michael Chen",
      type: "doctor",
      specialty: "Dermatologist",
      address: "456 Health St, New York, NY",
      distance: "1.2 miles",
      availability: "Next available: Tomorrow",
      rating: 4.6,
      reviews: 98,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "pharm-1",
      name: "MedPharm Pharmacy",
      type: "pharmacy",
      specialty: "Retail Pharmacy",
      address: "789 Wellness Blvd, New York, NY",
      distance: "0.5 miles",
      availability: "Open until 9 PM",
      rating: 4.5,
      reviews: 87,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "lab-1",
      name: "LifeCare Laboratory",
      type: "laboratory",
      specialty: "Diagnostic Lab",
      address: "321 Science Dr, New York, NY",
      distance: "1.5 miles",
      availability: "Open until 6 PM",
      rating: 4.7,
      reviews: 65,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter providers based on active tab
  const filteredProviders = serviceProviders.filter((provider) => {
    if (activeTab === "all") return true
    if (activeTab === "doctors" && provider.type === "doctor") return true
    if (activeTab === "pharmacies" && provider.type === "pharmacy") return true
    if (activeTab === "labs" && provider.type === "laboratory") return true
    return false
  })

  return (
    <div className="space-y-4">
      {filteredProviders.map((provider) => (
        <div
          key={provider.id}
          className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => onProviderSelect(provider.id)}
        >
          <div className="flex items-center sm:items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
              <AvatarFallback>
                {provider.type === "doctor" ? "DR" : provider.type === "pharmacy" ? "PH" : "LB"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h3 className="font-medium">{provider.name}</h3>
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1 w-fit ${
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
              </div>
              <p className="text-sm text-muted-foreground">{provider.specialty}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-sm">
                  <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{provider.rating}</span>
                  <span className="text-muted-foreground ml-1">({provider.reviews})</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{provider.distance}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{provider.availability}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0 sm:ml-auto">
            <Button size="sm" className="flex-1 sm:flex-none">
              View Profile
            </Button>
            <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
              Book Appointment
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
