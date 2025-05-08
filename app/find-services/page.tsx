"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  MapPin,
  Star,
  Heart,
  Filter,
  ChevronDown,
  Stethoscope,
  Building2,
  Microscope,
  Phone,
  Video,
  Info,
  Navigation,
  Share2,
  Bookmark,
  Plus,
  X,
} from "lucide-react"

// Mock data for healthcare services
const mockServices = {
  doctors: [
    {
      id: "doc1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 124,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Today",
      price: "$150",
      hospital: "City Medical Center",
      distance: "1.2 miles",
      address: "123 Medical Ave, Suite 101",
      experience: "15 years",
      education: "Harvard Medical School",
      languages: ["English", "Spanish"],
      insurances: ["Blue Cross", "Aetna", "Medicare"],
      featured: true,
    },
    {
      id: "doc2",
      name: "Dr. Michael Chang",
      specialty: "Dermatologist",
      rating: 4.8,
      reviews: 98,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Tomorrow",
      price: "$125",
      hospital: "Westside Health",
      distance: "2.5 miles",
      address: "456 Health Blvd, Suite 202",
      experience: "10 years",
      education: "Johns Hopkins University",
      languages: ["English", "Mandarin"],
      insurances: ["United Healthcare", "Cigna", "Medicare"],
      featured: false,
    },
    {
      id: "doc3",
      name: "Dr. Emily Parker",
      specialty: "Pediatrician",
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Today",
      price: "$100",
      hospital: "Children's Hospital",
      distance: "0.8 miles",
      address: "789 Children's Way",
      experience: "12 years",
      education: "Stanford University",
      languages: ["English", "French"],
      insurances: ["Blue Cross", "Cigna", "Medicaid"],
      featured: true,
    },
    {
      id: "doc4",
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      rating: 4.7,
      reviews: 87,
      image: "/placeholder.svg?height=400&width=250",
      availability: "May 10",
      price: "$200",
      hospital: "Ortho Specialists",
      distance: "3.1 miles",
      address: "321 Bone Street, Suite 505",
      experience: "20 years",
      education: "Yale University",
      languages: ["English"],
      insurances: ["Blue Cross", "Aetna", "United Healthcare"],
      featured: false,
    },
    {
      id: "doc5",
      name: "Dr. Lisa Rodriguez",
      specialty: "Neurologist",
      rating: 4.8,
      reviews: 112,
      image: "/placeholder.svg?height=400&width=250",
      availability: "May 12",
      price: "$175",
      hospital: "Neuro Institute",
      distance: "2.7 miles",
      address: "555 Brain Ave, Suite 303",
      experience: "14 years",
      education: "Columbia University",
      languages: ["English", "Spanish"],
      insurances: ["Aetna", "Cigna", "Medicare"],
      featured: true,
    },
  ],
  hospitals: [
    {
      id: "hosp1",
      name: "City Medical Center",
      specialty: "Multi-Specialty",
      rating: 4.7,
      reviews: 328,
      image: "/placeholder.svg?height=400&width=250",
      distance: "2.5 miles",
      address: "100 Hospital Drive",
      verified: true,
      emergency: true,
      beds: 450,
      founded: 1985,
      insurances: ["Blue Cross", "Aetna", "Medicare", "Cigna"],
      featured: true,
    },
    {
      id: "hosp2",
      name: "Memorial Hospital",
      specialty: "Cardiology, Oncology",
      rating: 4.5,
      reviews: 246,
      image: "/placeholder.svg?height=400&width=250",
      distance: "3.8 miles",
      address: "200 Memorial Blvd",
      verified: true,
      emergency: true,
      beds: 350,
      founded: 1992,
      insurances: ["Blue Cross", "United Healthcare", "Medicare"],
      featured: false,
    },
    {
      id: "hosp3",
      name: "St. Mary's Medical",
      specialty: "Women & Children",
      rating: 4.8,
      reviews: 189,
      image: "/placeholder.svg?height=400&width=250",
      distance: "1.2 miles",
      address: "300 St. Mary's Way",
      verified: true,
      emergency: true,
      beds: 275,
      founded: 1978,
      insurances: ["Blue Cross", "Aetna", "Cigna", "Medicaid"],
      featured: true,
    },
    {
      id: "hosp4",
      name: "University Hospital",
      specialty: "Research & Treatment",
      rating: 4.6,
      reviews: 274,
      image: "/placeholder.svg?height=400&width=250",
      distance: "4.1 miles",
      address: "400 University Parkway",
      verified: true,
      emergency: true,
      beds: 500,
      founded: 1965,
      insurances: ["Blue Cross", "Aetna", "Medicare", "Cigna", "United Healthcare"],
      featured: false,
    },
    {
      id: "hosp5",
      name: "Eastside Health Center",
      specialty: "Primary Care",
      rating: 4.4,
      reviews: 156,
      image: "/placeholder.svg?height=400&width=250",
      distance: "0.8 miles",
      address: "500 Eastside Avenue",
      verified: false,
      emergency: false,
      beds: 120,
      founded: 2005,
      insurances: ["Blue Cross", "Medicare", "Medicaid"],
      featured: false,
    },
  ],
  labs: [
    {
      id: "lab1",
      name: "MedLab Diagnostics",
      specialty: "Full Service Laboratory",
      rating: 4.6,
      reviews: 87,
      image: "/placeholder.svg?height=400&width=250",
      distance: "1.5 miles",
      address: "150 Lab Lane, Suite A",
      verified: true,
      homeService: true,
      turnaround: "24 hours",
      insurances: ["Blue Cross", "Aetna", "Medicare", "Cigna"],
      featured: true,
    },
    {
      id: "lab2",
      name: "LifeCare Labs",
      specialty: "Specialized Testing",
      rating: 4.7,
      reviews: 64,
      image: "/placeholder.svg?height=400&width=250",
      distance: "2.2 miles",
      address: "250 Health Street",
      verified: true,
      homeService: false,
      turnaround: "48 hours",
      insurances: ["Blue Cross", "United Healthcare", "Medicare"],
      featured: false,
    },
    {
      id: "lab3",
      name: "HealthSure Diagnostics",
      specialty: "Pathology & Imaging",
      rating: 4.5,
      reviews: 92,
      image: "/placeholder.svg?height=400&width=250",
      distance: "3.0 miles",
      address: "350 Diagnostic Drive",
      verified: true,
      homeService: true,
      turnaround: "24-72 hours",
      insurances: ["Blue Cross", "Aetna", "Cigna"],
      featured: true,
    },
    {
      id: "lab4",
      name: "QuickHealth Labs",
      specialty: "Rapid Testing",
      rating: 4.8,
      reviews: 78,
      image: "/placeholder.svg?height=400&width=250",
      distance: "1.8 miles",
      address: "450 Quick Avenue",
      verified: true,
      homeService: true,
      turnaround: "Same day",
      insurances: ["Blue Cross", "Aetna", "Medicare", "Cigna"],
      featured: true,
    },
    {
      id: "lab5",
      name: "Community Diagnostics",
      specialty: "Affordable Testing",
      rating: 4.3,
      reviews: 45,
      image: "/placeholder.svg?height=400&width=250",
      distance: "0.5 miles",
      address: "550 Community Road",
      verified: false,
      homeService: false,
      turnaround: "48-72 hours",
      insurances: ["Medicare", "Medicaid"],
      featured: false,
    },
  ],
}

const MapComponent = () => {
  return (
    <div className="relative w-full h-[400px] bg-muted/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/placeholder.svg?height=400&width=800" alt="Map" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <MapPin className="h-12 w-12 text-primary mb-2" />
          <p className="text-lg font-medium">Map View</p>
          <p className="text-sm text-muted-foreground">Interactive map would be displayed here</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="sm" className="bg-background/90 text-foreground hover:bg-background">
          <Navigation className="h-4 w-4 mr-2" /> My Location
        </Button>
        <Button size="sm" className="bg-background/90 text-foreground hover:bg-background">
          <Plus className="h-4 w-4 mr-2" /> Zoom In
        </Button>
      </div>
    </div>
  )
}

const ServiceCard = ({ service, type }: { service: any; type: string }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const getTypeIcon = () => {
    switch (type) {
      case "doctors":
        return <Stethoscope className="h-5 w-5 text-primary" />
      case "hospitals":
        return <Building2 className="h-5 w-5 text-primary" />
      case "labs":
        return <Microscope className="h-5 w-5 text-primary" />
      default:
        return <Stethoscope className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-muted/50 hover:border-primary/30 group">
      <div className="relative">
        <img src={service.image || "/placeholder.svg"} alt={service.name} className="w-full h-48 object-cover" />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black/70"
          onClick={toggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
        </Button>
        {service.featured && <Badge className="absolute top-2 left-2 bg-amber-500">Featured</Badge>}
        {service.availability && (
          <Badge className="absolute bottom-2 left-2 bg-emerald-600">{service.availability}</Badge>
        )}
        {service.verified && <Badge className="absolute bottom-2 left-2 bg-blue-600">Verified</Badge>}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <CardTitle className="text-lg">{service.name}</CardTitle>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium ml-1">{service.rating}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">{service.specialty}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          {service.distance} • {service.address}
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between pt-0">
        <div>
          {service.price && <div className="font-bold text-lg text-primary">{service.price}</div>}
          <div className="text-xs text-muted-foreground">{service.reviews} reviews</div>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform">
          {type === "doctors" ? "Book Now" : type === "labs" ? "Book Test" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  )
}

const ServiceDetail = ({ service, type, onClose }: { service: any; type: string; onClose: () => void }) => {
  if (!service) return null

  const getTypeIcon = () => {
    switch (type) {
      case "doctors":
        return <Stethoscope className="h-5 w-5 text-primary" />
      case "hospitals":
        return <Building2 className="h-5 w-5 text-primary" />
      case "labs":
        return <Microscope className="h-5 w-5 text-primary" />
      default:
        return <Stethoscope className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card className="h-full shadow-xl border rounded-lg flex flex-col">
      <div className="h-1.5 w-full bg-primary"></div>
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <div>
              <CardTitle className="text-xl">{service.name}</CardTitle>
              <div className="text-sm text-muted-foreground">{service.specialty}</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <div className="relative h-48">
        <img src={service.image || "/placeholder.svg"} alt={service.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button size="sm" variant="outline" className="bg-background/90">
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
          <Button size="sm" variant="outline" className="bg-background/90">
            <Bookmark className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <span className="font-medium">{service.rating}</span>
          <span className="text-sm text-muted-foreground">({service.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{service.distance}</span>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Address</h3>
            <p className="text-sm">{service.address}</p>
          </div>

          {type === "doctors" && (
            <>
              <div>
                <h3 className="text-sm font-medium mb-2">Experience & Education</h3>
                <p className="text-sm">{service.experience} of experience</p>
                <p className="text-sm">{service.education}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {service.languages.map((lang: string) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {type === "hospitals" && (
            <>
              <div>
                <h3 className="text-sm font-medium mb-2">Facility Information</h3>
                <p className="text-sm">{service.beds} beds</p>
                <p className="text-sm">Founded in {service.founded}</p>
                <p className="text-sm">{service.emergency ? "24/7 Emergency Services" : "No Emergency Services"}</p>
              </div>
            </>
          )}

          {type === "labs" && (
            <>
              <div>
                <h3 className="text-sm font-medium mb-2">Lab Information</h3>
                <p className="text-sm">Turnaround time: {service.turnaround}</p>
                <p className="text-sm">
                  {service.homeService ? "Home sample collection available" : "No home sample collection"}
                </p>
              </div>
            </>
          )}

          <div>
            <h3 className="text-sm font-medium mb-2">Accepted Insurance</h3>
            <div className="flex flex-wrap gap-2">
              {service.insurances.map((insurance: string) => (
                <Badge key={insurance} variant="outline">
                  {insurance}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {type === "doctors" && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Available Appointment Types</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-emerald-500 mr-2" />
                    <span className="text-sm">In-person visit</span>
                  </div>
                  <span className="text-sm font-medium">{service.price}</span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center">
                    <Video className="h-4 w-4 text-cyan-500 mr-2" />
                    <span className="text-sm">Video consultation</span>
                  </div>
                  <span className="text-sm font-medium">${Number.parseInt(service.price.substring(1)) - 25}</span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm">Phone consultation</span>
                  </div>
                  <span className="text-sm font-medium">${Number.parseInt(service.price.substring(1)) - 50}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Next Available</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="w-full justify-center text-xs h-auto py-2">
                Today
                <br />
                <span className="font-normal">2:30 PM</span>
              </Button>
              <Button variant="outline" className="w-full justify-center text-xs h-auto py-2">
                Tomorrow
                <br />
                <span className="font-normal">10:15 AM</span>
              </Button>
              <Button variant="outline" className="w-full justify-center text-xs h-auto py-2">
                Wed, May 10
                <br />
                <span className="font-normal">1:00 PM</span>
              </Button>
            </div>
            <Button variant="link" className="w-full text-primary">
              See more availability
            </Button>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-md p-3 text-sm">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-primary mb-1">Important Information</p>
                <ul className="list-disc pl-5 text-primary/80 space-y-1">
                  <li>Please arrive 15 minutes before your appointment</li>
                  <li>Bring your insurance card and ID</li>
                  <li>Referrals may be required for some insurance plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t">
        <Button className="w-full bg-primary hover:bg-primary/90">
          {type === "doctors" ? "Book Appointment" : type === "labs" ? "Book Test" : "Contact Facility"}
        </Button>
      </div>
    </Card>
  )
}

const FilterSidebar = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [distance, setDistance] = useState([5])
  const [priceRange, setPriceRange] = useState([200])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([])
  const [availability, setAvailability] = useState<string[]>([])

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "Primary Care",
    "Oncology",
    "Gynecology",
  ]

  const insurances = ["Blue Cross", "Aetna", "Medicare", "Medicaid", "Cigna", "United Healthcare"]

  const availabilityOptions = ["Today", "Tomorrow", "This Week", "Next Week"]

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty],
    )
  }

  const handleInsuranceChange = (insurance: string) => {
    setSelectedInsurances((prev) =>
      prev.includes(insurance) ? prev.filter((i) => i !== insurance) : [...prev, insurance],
    )
  }

  const handleAvailabilityChange = (option: string) => {
    setAvailability((prev) => (prev.includes(option) ? prev.filter((a) => a !== option) : [...prev, option]))
  }

  const applyFilters = () => {
    onFilterChange({
      distance: distance[0],
      priceRange: priceRange[0],
      specialties: selectedSpecialties,
      insurances: selectedInsurances,
      availability,
    })
  }

  const clearFilters = () => {
    setDistance([5])
    setPriceRange([200])
    setSelectedSpecialties([])
    setSelectedInsurances([])
    setAvailability([])
    onFilterChange({})
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <Button variant="outline" size="sm" onClick={clearFilters} className="mb-4">
          Clear All Filters
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Distance</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm">0 miles</span>
          <span className="text-sm">10 miles</span>
        </div>
        <Slider defaultValue={[5]} max={10} step={0.5} value={distance} onValueChange={setDistance} className="my-2" />
        <div className="text-sm text-center">Within {distance[0]} miles</div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Price Range</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm">$0</span>
          <span className="text-sm">$400</span>
        </div>
        <Slider
          defaultValue={[200]}
          max={400}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-2"
        />
        <div className="text-sm text-center">Up to ${priceRange[0]}</div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Specialty</h4>
        <div className="space-y-1">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm">
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Insurance</h4>
        <div className="space-y-1">
          {insurances.map((insurance) => (
            <div key={insurance} className="flex items-center">
              <input
                type="checkbox"
                id={`insurance-${insurance}`}
                checked={selectedInsurances.includes(insurance)}
                onChange={() => handleInsuranceChange(insurance)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`insurance-${insurance}`} className="ml-2 text-sm">
                {insurance}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Availability</h4>
        <div className="space-y-1">
          {availabilityOptions.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                id={`availability-${option}`}
                checked={availability.includes(option)}
                onChange={() => handleAvailabilityChange(option)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`availability-${option}`} className="ml-2 text-sm">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full bg-primary hover:bg-primary/90" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  )
}

export default function FindServicePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("doctors")
  const [showMap, setShowMap] = useState(true)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [filters, setFilters] = useState({})
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleServiceSelect = (service: any) => {
    setSelectedService(service)
  }

  const handleCloseDetail = () => {
    setSelectedService(null)
  }

  const filteredServices = mockServices[activeTab as keyof typeof mockServices].filter((service) => {
    if (searchQuery === "") return true
    return (
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-6 w-full bg-gradient-to-b from-background to-background/95">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Find Healthcare Services</h2>
        <p className="text-muted-foreground">Discover doctors, hospitals, and labs near you</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search and Map Section */}
        <div className="w-full md:w-3/4 space-y-4">
          <Card className="border-muted/50">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name, specialty, or location..."
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
                    className="flex items-center gap-1 md:hidden"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  <Button
                    variant={showMap ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setShowMap(!showMap)}
                  >
                    <MapPin className="h-4 w-4" />
                    {showMap ? "Hide Map" : "Show Map"}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {showMap && <MapComponent />}

          <Tabs defaultValue="doctors" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList className="grid grid-cols-3 w-fit">
                <TabsTrigger value="doctors" className="relative data-[state=active]:bg-transparent">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Doctors
                  <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
                </TabsTrigger>
                <TabsTrigger value="hospitals" className="relative data-[state=active]:bg-transparent">
                  <Building2 className="h-4 w-4 mr-2" />
                  Hospitals
                  <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
                </TabsTrigger>
                <TabsTrigger value="labs" className="relative data-[state=active]:bg-transparent">
                  <Microscope className="h-4 w-4 mr-2" />
                  Labs
                  <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-t-full data-[state=inactive]:opacity-0"></div>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  Relevance <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="doctors" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((doctor) => (
                  <div key={doctor.id} onClick={() => handleServiceSelect(doctor)}>
                    <ServiceCard service={doctor} type="doctors" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hospitals" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((hospital) => (
                  <div key={hospital.id} onClick={() => handleServiceSelect(hospital)}>
                    <ServiceCard service={hospital} type="hospitals" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="labs" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((lab) => (
                  <div key={lab.id} onClick={() => handleServiceSelect(lab)}>
                    <ServiceCard service={lab} type="labs" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Filters Sidebar */}
        <div className={`w-full md:w-1/4 ${showMobileFilters ? "block" : "hidden md:block"}`}>
          <Card className="sticky top-4">
            <CardContent className="p-4">
              <FilterSidebar onFilterChange={setFilters} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-auto">
            <ServiceDetail service={selectedService} type={activeTab} onClose={handleCloseDetail} />
          </div>
        </div>
      )}
    </div>
  )
}
