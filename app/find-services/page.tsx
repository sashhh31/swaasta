"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet" // Added for filter sidebar
import { Checkbox } from "@/components/ui/checkbox" // Added for filter options
import { Label } from "@/components/ui/label" // Added for filter options
import { ScrollArea } from "@/components/ui/scroll-area" // Added for scrollable filter options

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
  Pill,
  LayoutGrid, // Added for Grid view
  Map as MapIcon, // Added for Map view icon
} from "lucide-react"

// Mock data for healthcare services
const mockServices = {
  doctors: [
    {
      id: "doc1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
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
      specialty: "Dermatology",
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
      specialty: "Pediatrics",
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
      specialty: "Orthopedics",
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
      specialty: "Neurology",
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
  pharmacies: [
    {
      id: "pharm1",
      name: "HealthPlus Pharmacy",
      specialty: "24/7 Full Service",
      rating: 4.7,
      reviews: 142,
      image: "/placeholder.svg?height=400&width=250",
      distance: "0.8 miles",
      address: "123 Main Street",
      verified: true,
      delivery: true,
      driveThru: true,
      insurances: ["Blue Cross", "Aetna", "Medicare", "Cigna"],
      featured: true,
    },
    {
      id: "pharm2",
      name: "Community Care Pharmacy",
      specialty: "Compounding Specialist",
      rating: 4.6,
      reviews: 98,
      image: "/placeholder.svg?height=400&width=250",
      distance: "1.5 miles",
      address: "456 Oak Avenue",
      verified: true,
      delivery: true,
      driveThru: false,
      insurances: ["Blue Cross", "Medicare", "Medicaid"],
      featured: false,
    },
    {
      id: "pharm3",
      name: "MediQuick Pharmacy",
      specialty: "Rapid Prescription Filling",
      rating: 4.8,
      reviews: 115,
      image: "/placeholder.svg?height=400&width=250",
      distance: "2.1 miles",
      address: "789 Elm Street",
      verified: true,
      delivery: false,
      driveThru: true,
      insurances: ["Blue Cross", "Aetna", "Cigna", "United Healthcare"],
      featured: true,
    },
    {
      id: "pharm4",
      name: "Wellness Pharmacy",
      specialty: "Holistic & Natural Products",
      rating: 4.5,
      reviews: 87,
      image: "/placeholder.svg?height=400&width=250",
      distance: "3.4 miles",
      address: "321 Wellness Way",
      verified: true,
      delivery: true,
      driveThru: false,
      insurances: ["Blue Cross", "Aetna", "United Healthcare"],
      featured: false,
    },
    {
      id: "pharm5",
      name: "CityRx Pharmacy",
      specialty: "Specialty Medications",
      rating: 4.9,
      reviews: 132,
      image: "/placeholder.svg?height=400&width=250",
      distance: "1.7 miles",
      address: "555 Central Avenue",
      verified: true,
      delivery: true,
      driveThru: true,
      insurances: ["Blue Cross", "Cigna", "Medicare", "United Healthcare"],
      featured: true,
    },
  ],
}

type ServiceKey = keyof typeof mockServices;


const MapComponent = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-full bg-muted/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/placeholder.svg?height=600&width=800" alt="Map" className="w-full h-full object-cover opacity-60" />
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

const ServiceCard = ({ service, type, onCardClick }: { service: any; type: string, onCardClick: (service: any) => void }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleCardClickInternal = (e: React.MouseEvent) => {
    if (type === "pharmacies") {
       // Allow product navigation for pharmacies on button click, detail view on card click
       // The main click is now handled by onCardClick prop for detail view
    }
    onCardClick(service); // Notify parent to show details
  }
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (type === "pharmacies") {
      router.push("/Products"); // Example: navigate to a generic products page for pharmacies
    } else {
      onCardClick(service); // Or open details / booking for other types
      console.log(`Button clicked for ${service.name}`);
    }
  };


  const getTypeIcon = () => {
    switch (type) {
      case "doctors":
        return <Stethoscope className="h-5 w-5 text-primary" />
      case "hospitals":
        return <Building2 className="h-5 w-5 text-primary" />
      case "labs":
        return <Microscope className="h-5 w-5 text-primary" />
      case "pharmacies":
        return <Pill className="h-5 w-5 text-primary" />
      default:
        return <Stethoscope className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 border-muted/50 hover:border-primary/30 group cursor-pointer"
      onClick={handleCardClickInternal}
    >
      <div className="relative">
        <img src={service.image || "/placeholder.svg"} alt={service.name} className="w-full h-48 object-cover" />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black/70"
          onClick={toggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground group-hover:text-rose-500"}`} />
        </Button>
        {service.featured && <Badge className="absolute top-2 left-2 bg-amber-500 text-white">Featured</Badge>}
        {service.availability && (type === "doctors") && (
          <Badge className="absolute bottom-2 left-2 bg-emerald-600 text-white">{service.availability}</Badge>
        )}
        {service.verified && <Badge className="absolute bottom-2 left-2 bg-blue-600 text-white">Verified</Badge>}
          {/* Show availability for doctors, verified for others if availability isn't present */}
        {type !== "doctors" && !service.availability && service.verified && (
            <Badge className="absolute bottom-2 left-2 bg-blue-600 text-white">Verified</Badge>
        )}

      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
          </div>
          <div className="flex items-center flex-shrink-0">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium ml-1">{service.rating}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground truncate" title={service.specialty}>{service.specialty}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate" title={`${service.distance} • ${service.address}`}>{service.distance} • {service.address}</span>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-end pt-2">
        <div>
          {service.price && <div className="font-bold text-lg text-primary">{service.price}</div>}
          <div className="text-xs text-muted-foreground">{service.reviews} reviews</div>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform"
          onClick={handleButtonClick}
        >
          {type === "doctors" ? "Book Now" :
            type === "labs" ? "Book Test" :
            type === "pharmacies" ? "View Products" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  )
}

const ServiceDetail = ({ service, type, onClose }: { service: any; type: string; onClose: () => void }) => {
  const router = useRouter()

  if (!service) return null

  const getTypeIcon = () => {
    switch (type) {
      case "doctors":
        return <Stethoscope className="h-5 w-5 text-primary" />
      case "hospitals":
        return <Building2 className="h-5 w-5 text-primary" />
      case "labs":
        return <Microscope className="h-5 w-5 text-primary" />
      case "pharmacies":
        return <Pill className="h-5 w-5 text-primary" />
      default:
        return <Stethoscope className="h-5 w-5 text-primary" />
    }
  }

  const handleActionClick = () => {
    if (type === "pharmacies") {
      router.push("/products") // Example: navigate to a generic products page
    } else {
      // Handle booking or other actions for doctors, labs, hospitals
      console.log(`Primary action for ${service.name}, type ${type}`);
      // Potentially open a booking modal or navigate to a booking page
      // router.push(`/booking/${type}/${service.id}`);
    }
  }

  return (
    <Card className="h-full shadow-xl border rounded-lg flex flex-col overflow-hidden">
      <ScrollArea className="flex-grow"> {/* Added ScrollArea */}
        <div className="h-1.5 w-full bg-primary"></div>
        <CardHeader className="border-b pb-4 sticky top-0 bg-card z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              {getTypeIcon()}
              <div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <div className="text-sm text-muted-foreground">{service.specialty}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 flex-shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="relative h-48 md:h-64">
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

        <div className="p-4 flex items-center justify-between bg-muted/30 border-b">
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

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Address</h3>
              <p className="text-sm">{service.address}</p>
            </div>

            {type === "doctors" && service.experience && service.education && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Experience & Education</h3>
                  <p className="text-sm">{service.experience} of experience</p>
                  <p className="text-sm">{service.education}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Languages</h3>
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
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Facility Information</h3>
                  <p className="text-sm">{service.beds} beds</p>
                  <p className="text-sm">Founded in {service.founded}</p>
                  <p className="text-sm">{service.emergency ? "24/7 Emergency Services" : "No Emergency Services"}</p>
                </div>
              </>
            )}

            {type === "labs" && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Lab Information</h3>
                  <p className="text-sm">Turnaround time: {service.turnaround}</p>
                  <p className="text-sm">
                    {service.homeService ? "Home sample collection available" : "No home sample collection"}
                  </p>
                </div>
              </>
            )}

            {type === "pharmacies" && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Pharmacy Information</h3>
                  <p className="text-sm">{service.delivery ? "Delivery service available" : "No delivery service"}</p>
                  <p className="text-sm">{service.driveThru ? "Drive-thru available" : "No drive-thru"}</p>
                </div>
              </>
            )}

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Accepted Insurance</h3>
              <div className="flex flex-wrap gap-2">
                {service.insurances.map((insurance: string) => (
                  <Badge key={insurance} variant="outline" className="font-normal">
                    {insurance}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {type === "doctors" && service.price && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Available Appointment Types</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-muted/50">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-emerald-500 mr-2" />
                      <span className="text-sm">In-person visit</span>
                    </div>
                    <span className="text-sm font-medium">{service.price}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-muted/50">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 text-cyan-500 mr-2" />
                      <span className="text-sm">Video consultation</span>
                    </div>
                    <span className="text-sm font-medium">${Math.max(50, Number.parseInt(service.price?.substring(1) || "0") - 25)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-muted/50">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm">Phone consultation</span>
                    </div>
                    <span className="text-sm font-medium">${Math.max(30,Number.parseInt(service.price?.substring(1) || "0") - 50)}</span>
                  </div>
                </div>
              </div>
            )}

            {type === "pharmacies" && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Services</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-muted/50">
                    <div className="flex items-center">
                      <Pill className="h-4 w-4 text-emerald-500 mr-2" />
                      <span className="text-sm">In-store pickup</span>
                    </div>
                    <span className="text-sm font-medium">Free</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-muted/50">
                    <div className="flex items-center">
                      <Stethoscope className="h-4 w-4 text-cyan-500 mr-2" /> {/* Using Stethoscope as proxy for consultation */}
                      <span className="text-sm">Pharmacist consultation</span>
                    </div>
                    <span className="text-sm font-medium">Free</span>
                  </div>
                  {service.delivery && (
                    <div className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-muted/50">
                      <div className="flex items-center">
                        <Navigation className="h-4 w-4 text-purple-500 mr-2" /> {/* Using Navigation for delivery */}
                        <span className="text-sm">Home delivery</span>
                      </div>
                      <span className="text-sm font-medium">$5</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {(type === "doctors" || type === "labs") && (
                <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Next Available</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Button variant="outline" className="w-full justify-center text-xs h-auto py-2 flex-col leading-tight">
                    Today
                    <span className="font-normal text-muted-foreground">2:30 PM</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-center text-xs h-auto py-2 flex-col leading-tight">
                    Tomorrow
                    <span className="font-normal text-muted-foreground">10:15 AM</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-center text-xs h-auto py-2 flex-col leading-tight">
                    May 10
                    <span className="font-normal text-muted-foreground">1:00 PM</span>
                    </Button>
                </div>
                <Button variant="link" className="w-full text-primary p-0 h-auto mt-2">
                    See more availability
                </Button>
                </div>
            )}


            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-md p-3 text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary mb-1">Important Information</p>
                  {type === "pharmacies" ? (
                    <ul className="list-disc pl-5 text-primary/80 space-y-1">
                      <li>Bring your prescription or prescription number</li>
                      <li>Bring your insurance card and ID</li>
                      <li>Ask about medication counseling</li>
                    </ul>
                  ) : (
                    <ul className="list-disc pl-5 text-primary/80 space-y-1">
                      <li>Please arrive 15 minutes before your appointment</li>
                      <li>Bring your insurance card and ID</li>
                      <li>Referrals may be required for some insurance plans</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea> {/* End ScrollArea */}
      <div className="mt-auto p-4 border-t bg-card sticky bottom-0">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
          onClick={handleActionClick}
          size="lg"
        >
          {type === "doctors" ? "Book Appointment" :
            type === "labs" ? "Book Test" :
            type === "pharmacies" ? "Browse Products" : "Contact Facility"}
        </Button>
      </div>
    </Card>
  )
}

const FilterSidebar = ({
  onFilterChange,
  currentFilters,
  activeTab
}: {
  onFilterChange: (filters: any) => void
  currentFilters: any
  activeTab: ServiceKey
}) => {
  const [distance, setDistance] = useState<number[]>([currentFilters.distance || 10])
  const [priceRange, setPriceRange] = useState<number[]>([currentFilters.priceRange || 300]) // Max price for doctors
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(currentFilters.specialties || [])
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>(currentFilters.insurances || [])
  const [availability, setAvailability] = useState<string[]>(currentFilters.availability || [])
  const [features, setFeatures] = useState<Record<string, boolean>>(currentFilters.features || {})


  // Update internal state if currentFilters prop changes (e.g. on tab switch)
  useEffect(() => {
    setDistance([currentFilters.distance || 10]);
    setPriceRange([currentFilters.priceRange || (activeTab === 'doctors' ? 300 : 0)]); // Price relevant for doctors
    setSelectedSpecialties(currentFilters.specialties || []);
    setSelectedInsurances(currentFilters.insurances || []);
    setAvailability(currentFilters.availability || []);
    setFeatures(currentFilters.features || {});
  }, [currentFilters, activeTab]);


  const allSpecialties = useMemo(() => {
    const specialtiesSet = new Set<string>()
    if (activeTab === 'doctors') mockServices.doctors.forEach(doc => specialtiesSet.add(doc.specialty))
    else if (activeTab === 'hospitals') mockServices.hospitals.forEach(h => h.specialty.split(', ').forEach(s => specialtiesSet.add(s)))
    // Labs and Pharmacies might have less distinct "specialties" in this data structure
    else if (activeTab === 'labs') mockServices.labs.forEach(l => specialtiesSet.add(l.specialty))
    else if (activeTab === 'pharmacies') mockServices.pharmacies.forEach(p => specialtiesSet.add(p.specialty))
    return Array.from(specialtiesSet).sort()
  }, [activeTab])

  const allInsurances = useMemo(() => {
    const insurancesSet = new Set<string>()
    Object.values(mockServices).flat().forEach(service => {
        if(service.insurances) service.insurances.forEach((ins: string) => insurancesSet.add(ins))
    })
    return Array.from(insurancesSet).sort()
  }, [])

  const availabilityOptions = ["Today", "Tomorrow", "Next 7 days"] // Example, could be dynamic

  const handleApplyFilters = () => {
    onFilterChange({
      distance: distance[0],
      priceRange: activeTab === 'doctors' ? priceRange[0] : undefined, // Only apply price for doctors
      specialties: selectedSpecialties,
      insurances: selectedInsurances,
      availability,
      features,
    })
  }
  
  const handleResetFilters = () => {
    setDistance([10]);
    setPriceRange([activeTab === 'doctors' ? 300 : 0]);
    setSelectedSpecialties([]);
    setSelectedInsurances([]);
    setAvailability([]);
    setFeatures({});
    onFilterChange({ // Also notify parent to reset
      distance: 10,
      priceRange: activeTab === 'doctors' ? 300 : undefined,
      specialties: [],
      insurances: [],
      availability: [],
      features: {},
    });
  };


  const toggleItemInList = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  const toggleFeature = (featureKey: string) => {
    setFeatures(prev => ({ ...prev, [featureKey]: !prev[featureKey] }));
  };


  const renderFeatureFilters = () => {
    switch(activeTab) {
        case 'hospitals':
            return (
                <>
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="emergency" checked={features.emergency || false} onCheckedChange={() => toggleFeature('emergency')} />
                        <Label htmlFor="emergency" className="text-sm font-normal">24/7 Emergency</Label>
                    </div>
                     <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="verifiedHosp" checked={features.verified || false} onCheckedChange={() => toggleFeature('verified')} />
                        <Label htmlFor="verifiedHosp" className="text-sm font-normal">Verified</Label>
                    </div>
                </>
            );
        case 'labs':
            return (
                <>
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="homeService" checked={features.homeService || false} onCheckedChange={() => toggleFeature('homeService')} />
                        <Label htmlFor="homeService" className="text-sm font-normal">Home Sample Collection</Label>
                    </div>
                     <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="verifiedLab" checked={features.verified || false} onCheckedChange={() => toggleFeature('verified')} />
                        <Label htmlFor="verifiedLab" className="text-sm font-normal">Verified</Label>
                    </div>
                </>
            );
        case 'pharmacies':
            return (
                <>
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="delivery" checked={features.delivery || false} onCheckedChange={() => toggleFeature('delivery')} />
                        <Label htmlFor="delivery" className="text-sm font-normal">Delivery Available</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="driveThru" checked={features.driveThru || false} onCheckedChange={() => toggleFeature('driveThru')} />
                        <Label htmlFor="driveThru" className="text-sm font-normal">Drive-Thru</Label>
                    </div>
                     <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="verifiedPharm" checked={features.verified || false} onCheckedChange={() => toggleFeature('verified')} />
                        <Label htmlFor="verifiedPharm" className="text-sm font-normal">Verified</Label>
                    </div>
                </>
            );
        default: return null;
    }
  }


  return (
    <SheetContent className="w-[350px] sm:w-[400px] flex flex-col p-0">
      <SheetHeader className="p-6 pb-4 border-b">
        <SheetTitle className="flex items-center"><Filter className="h-5 w-5 mr-2 text-primary"/> Filters</SheetTitle>
      </SheetHeader>
      <ScrollArea className="flex-grow p-6">
        <div className="space-y-6">
          {/* Distance Filter */}
          <div>
            <Label className="text-sm font-medium">Distance (max: {distance[0]} miles)</Label>
            <Slider
              defaultValue={[10]}
              value={distance}
              max={50}
              step={1}
              onValueChange={setDistance}
              className="mt-2"
            />
          </div>

          {/* Price Range Filter (Only for Doctors) */}
          {activeTab === 'doctors' && (
            <div>
              <Label className="text-sm font-medium">Price Range (max: ${priceRange[0]})</Label>
              <Slider
                defaultValue={[300]}
                value={priceRange}
                max={500}
                step={10}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>
          )}
          
          {/* Availability Filter (Example for Doctors) */}
          {activeTab === 'doctors' && (
            <div>
                <Label className="text-sm font-medium">Availability</Label>
                <div className="mt-2 space-y-2">
                {availabilityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                        id={`avail-${option}`}
                        checked={availability.includes(option)}
                        onCheckedChange={() => toggleItemInList(option, availability, setAvailability)}
                    />
                    <Label htmlFor={`avail-${option}`} className="text-sm font-normal">
                        {option}
                    </Label>
                    </div>
                ))}
                </div>
            </div>
          )}


          {/* Specialties Filter */}
          {allSpecialties.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Specialty</Label>
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                {allSpecialties.map((specialty) => (
                  <div key={specialty} className="flex items-center space-x-2">
                    <Checkbox
                      id={`spec-${specialty}`}
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={() => toggleItemInList(specialty, selectedSpecialties, setSelectedSpecialties)}
                    />
                    <Label htmlFor={`spec-${specialty}`} className="text-sm font-normal">
                      {specialty}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insurance Filter */}
            {allInsurances.length > 0 && (
            <div>
                <Label className="text-sm font-medium">Insurance</Label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                {allInsurances.map((insurance) => (
                    <div key={insurance} className="flex items-center space-x-2">
                    <Checkbox
                        id={`ins-${insurance}`}
                        checked={selectedInsurances.includes(insurance)}
                        onCheckedChange={() => toggleItemInList(insurance, selectedInsurances, setSelectedInsurances)}
                    />
                    <Label htmlFor={`ins-${insurance}`} className="text-sm font-normal">
                        {insurance}
                    </Label>
                    </div>
                ))}
                </div>
            </div>
            )}

            {/* Feature specific filters */}
            {renderFeatureFilters() && (
                 <div>
                    <Label className="text-sm font-medium">Features</Label>
                    {renderFeatureFilters()}
                </div>
            )}


        </div>
      </ScrollArea>
      <div className="p-6 border-t flex gap-2">
        <SheetClose asChild>
          <Button onClick={handleApplyFilters} className="flex-1 bg-primary hover:bg-primary/90">Apply Filters</Button>
        </SheetClose>
        <Button onClick={handleResetFilters} variant="outline" className="flex-1">Reset</Button>
      </div>
    </SheetContent>
  )
}


export default function HealthcareSearchPage() {
  const [activeTab, setActiveTab] = useState<ServiceKey>("doctors")
  const [searchTerm, setSearchTerm] = useState<any>("")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false)
  // MODIFICATION: Set currentView to "map" by default
  const [currentView, setCurrentView] = useState<"grid" | "map">("map") 
  const [appliedFilters, setAppliedFilters] = useState<any>({
    distance: 10, // Default distance
    priceRange: 300, // Default max price for doctors
    specialties: [],
    insurances: [],
    availability: [],
    features: {}
  })

  const servicesForTab = mockServices[activeTab]

  const filteredServices = useMemo(() => {
    let services = servicesForTab;

    // Search filter
    if (searchTerm) {
      services = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.address && service.address.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by distance
    services = services.filter(service => {
        const serviceDistance = parseFloat(service.distance);
        return serviceDistance <= appliedFilters.distance;
    });

    // Filter by price (only for doctors)
    if (activeTab === 'doctors' && appliedFilters.priceRange) {
        services = services.filter(service => {
            if (!service.price) return true; // Keep if no price info
            const price = parseInt(service.price.substring(1));
            return price <= appliedFilters.priceRange;
        });
    }
    
    // Filter by specialty
    if (appliedFilters.specialties && appliedFilters.specialties.length > 0) {
        services = services.filter(service =>
            appliedFilters.specialties.some((spec: string) => service.specialty.toLowerCase().includes(spec.toLowerCase()))
        );
    }

    // Filter by insurance
    if (appliedFilters.insurances && appliedFilters.insurances.length > 0) {
        services = services.filter(service =>
            service.insurances.some((ins: string) => appliedFilters.insurances.includes(ins))
        );
    }
    
    // Filter by availability (example for doctors)
    if (activeTab === 'doctors' && appliedFilters.availability && appliedFilters.availability.length > 0) {
        services = services.filter(service => {
            if (!service.availability) return false;
            const availabilityLower = service.availability.toLowerCase();
            return appliedFilters.availability.some((avail: string) => {
                const availLower = avail.toLowerCase();
                if (availLower === "today" || availLower === "tomorrow") {
                    return availabilityLower === availLower;
                }
                // "Next 7 days" logic would be more complex, this is a placeholder
                // For now, it means any explicit availability matches.
                if (availLower === "next 7 days") return true; 
                return false;
            });
        });
    }

    // Filter by features
    if (appliedFilters.features) {
        Object.entries(appliedFilters.features).forEach(([key, value]) => {
            if (value) { // only filter if the feature is checked (true)
                services = services.filter(service => service[key] === true);
            }
        });
    }


    return services;
  }, [servicesForTab, searchTerm, activeTab, appliedFilters]);


  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue as ServiceKey)
    setSelectedService(null) // Close detail panel on tab change
    setIsDetailPanelOpen(false)
    // Optionally reset filters or adjust them based on the new tab
    setAppliedFilters({
        distance: 10,
        priceRange: tabValue === 'doctors' ? 300 : undefined, // Reset price for non-doctor tabs
        specialties: [],
        insurances: [],
        availability: [],
        features: {}
    });
  }

  const handleServiceCardClick = (service: any) => {
    setSelectedService(service)
    setIsDetailPanelOpen(true)
  }

  const handleCloseDetail = () => {
    setSelectedService(null)
    setIsDetailPanelOpen(false)
  }

  const handleFilterChange = (newFilters: any) => {
    setAppliedFilters(newFilters)
  }

  const TabIcon = ({ type }: { type: ServiceKey }) => {
    switch (type) {
      case "doctors": return <Stethoscope className="mr-2 h-4 w-4" />;
      case "hospitals": return <Building2 className="mr-2 h-4 w-4" />;
      case "labs": return <Microscope className="mr-2 h-4 w-4" />;
      case "pharmacies": return <Pill className="mr-2 h-4 w-4" />;
      default: return null;
    }
  };


  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
        <h1 className="text-xl font-semibold text-primary whitespace-nowrap">Health Connect</h1>
        <div className="relative flex-1 ml-auto md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-muted pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="ml-auto h-9 w-9 md:ml-4">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                </Button>
            </SheetTrigger>
            <FilterSidebar onFilterChange={handleFilterChange} currentFilters={appliedFilters} activeTab={activeTab}/>
        </Sheet>
      </header>

      <main className="flex flex-col">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sticky top-16 bg-background z-20 border-b">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto rounded-none">
            {(Object.keys(mockServices) as ServiceKey[]).map((key) => (
              <TabsTrigger key={key} value={key} className="py-3 text-sm md:text-base capitalize flex items-center justify-center data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">
                <TabIcon type={key} /> {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="p-4 sm:p-6 flex-1">
            <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                Showing {filteredServices.length} results for <span className="font-semibold text-primary">{activeTab}</span>
                {searchTerm && <> matching <span className="font-semibold text-primary">"{searchTerm}"</span></>}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant={currentView === 'grid' ? 'secondary': 'outline'}
                        size="sm"
                        onClick={() => setCurrentView('grid')}
                        className="h-9 w-9 p-0"
                        disabled={isDetailPanelOpen} // Disable view switch when detail is open on small screens
                    >
                        <LayoutGrid className="h-4 w-4"/>
                        <span className="sr-only">Grid View</span>
                    </Button>
                    <Button
                        variant={currentView === 'map' ? 'secondary': 'outline'}
                        size="sm"
                        onClick={() => setCurrentView('map')}
                        className="h-9 w-9 p-0"
                        disabled={isDetailPanelOpen}
                    >
                        <MapIcon className="h-4 w-4"/>
                        <span className="sr-only">Map View</span>
                    </Button>
                </div>
            </div>

          <div className={`transition-all duration-300 ease-in-out ${isDetailPanelOpen ? 'lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6' : ''}`}>
              {/* Main Content Area: Grid or Map */}
              <div className={`${isDetailPanelOpen && currentView === 'grid' ? 'hidden lg:block' : ''} ${currentView === 'map' && !isDetailPanelOpen ? 'block' : currentView === 'grid' && !isDetailPanelOpen ? 'block' : 'hidden lg:block' }`}>
                {currentView === 'grid' && !isDetailPanelOpen && (
                    filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredServices.map(service => (
                            <ServiceCard key={service.id} service={service} type={activeTab} onCardClick={handleServiceCardClick} />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                        <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium">No services found.</p>
                        <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                        </div>
                    )
                )}
                {currentView === 'map' && !isDetailPanelOpen && (
                  // This div will render for map view when detail panel is not open on non-XL screens
                  // Or when detail panel is open (handled by the outer grid structure on lg)
                  // For XL screens without detail panel, the specific XL layout below will be used.
                  // This MapComponent is for general map view.
                  <div className="xl:hidden"> {/* Hide this if the XL specific map layout is shown */}
                    <MapComponent />
                  </div>
                )}
              </div>
              
              {/* MODIFICATION: For XL screens when map view is active and detail panel is NOT open. Map is now first. */}
              {currentView === 'map' && !isDetailPanelOpen && (
                <div className="hidden xl:grid xl:grid-cols-2 gap-6"> {/* Removed mt-6 from here to align with grid view */}
                  {/* Map Component Container (now first) */}
                  <div className="h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
                    <MapComponent />
                  </div>
                  {/* Service Cards ScrollArea (now second) */}
                  {filteredServices.length > 0 ? (
                    <ScrollArea className="h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4"> {/* Adjusted grid for better fit */}
                        {filteredServices.slice(0, 6).map(service => ( // Show limited items
                          <ServiceCard key={service.id} service={service} type={activeTab} onCardClick={handleServiceCardClick} />
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="text-center py-12 col-span-1 flex items-center justify-center">
                      <div>
                        <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium">No services to display on map.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* Detail Panel Area */}
              {isDetailPanelOpen && selectedService && (
                // On large screens, this div will be the second column.
                // On smaller screens, it will take full width if main content is hidden.
                <div className={`fixed inset-0 z-40 bg-background p-0 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:p-0 lg:translate-x-0 ${isDetailPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                  <ServiceDetail service={selectedService} type={activeTab} onClose={handleCloseDetail} />
                </div>
              )}
            </div>
        </div>
      </main>
    </div>
  )
}