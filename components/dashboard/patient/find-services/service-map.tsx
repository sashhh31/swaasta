"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Stethoscope, Pill, TestTube } from "lucide-react"

interface ServiceMapProps {
  activeTab: string
  onProviderSelect: (providerId: string) => void
}

export function ServiceMap({ activeTab, onProviderSelect }: ServiceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for service providers
  const serviceProviders = [
    {
      id: "doc-1",
      name: "Dr. Sarah Smith",
      type: "doctor",
      specialty: "Cardiologist",
      location: { lat: 40.712, lng: -74.006 },
      rating: 4.8,
    },
    {
      id: "doc-2",
      name: "Dr. Michael Chen",
      type: "doctor",
      specialty: "Dermatologist",
      location: { lat: 40.714, lng: -74.009 },
      rating: 4.6,
    },
    {
      id: "pharm-1",
      name: "MedPharm Pharmacy",
      type: "pharmacy",
      specialty: "Retail Pharmacy",
      location: { lat: 40.715, lng: -74.003 },
      rating: 4.5,
    },
    {
      id: "lab-1",
      name: "LifeCare Laboratory",
      type: "laboratory",
      specialty: "Diagnostic Lab",
      location: { lat: 40.71, lng: -74.005 },
      rating: 4.7,
    },
  ]

  useEffect(() => {
    // Simulate loading the map
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter providers based on active tab
  const filteredProviders = serviceProviders.filter((provider) => {
    if (activeTab === "all") return true
    if (activeTab === "doctors" && provider.type === "doctor") return true
    if (activeTab === "pharmacies" && provider.type === "pharmacy") return true
    if (activeTab === "labs" && provider.type === "laboratory") return true
    return false
  })

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-b-lg">
      <div ref={mapRef} className="w-full h-full">
        {/* This would be replaced with an actual map component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Map showing {filteredProviders.length} service providers</p>
        </div>

        {/* Mock map markers */}
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:z-10"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            onClick={() => onProviderSelect(provider.id)}
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-full shadow-md ${
                  provider.type === "doctor"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                    : provider.type === "pharmacy"
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                      : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200"
                }`}
              >
                {provider.type === "doctor" ? (
                  <Stethoscope className="h-5 w-5" />
                ) : provider.type === "pharmacy" ? (
                  <Pill className="h-5 w-5" />
                ) : (
                  <TestTube className="h-5 w-5" />
                )}
              </div>
              <div className="mt-1 px-2 py-1 bg-white dark:bg-gray-900 rounded shadow-md text-xs font-medium whitespace-nowrap">
                {provider.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4">
        <Card className="p-2 flex items-center gap-2 shadow-md">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <MapPin className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  )
}

import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
