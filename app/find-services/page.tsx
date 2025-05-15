"use client"
import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

import {
  Search,
  MapPin,
  Star,
  Heart,
  Filter,
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
  LayoutGrid,
  MapIcon,
  CreditCard,
  Clock,
  CheckCircle2,
  Locate,
  Zap,
  ArrowRight,
  Loader2,
  Wallet,
  ShieldCheck,
  Sparkles,
  FlaskConical,
} from "lucide-react"

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
      price: "₹1500",
      hospital: "City Medical Center",
      distance: "1.2 miles",
      address: "123 Medical Ave, Suite 101",
      experience: "15 years",
      education: "Harvard Medical School",
      languages: ["English", "Spanish"],
      insurances: ["Blue Cross", "Aetna", "Medicare"],
      featured: true,
      lat: 28.6139,
      lng: 77.209,
    },
    {
      id: "doc2",
      name: "Dr. Michael Chang",
      specialty: "Dermatology",
      rating: 4.8,
      reviews: 98,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Tomorrow",
      price: "₹1250",
      hospital: "Westside Health",
      distance: "2.5 miles",
      address: "456 Health Blvd, Suite 202",
      experience: "10 years",
      education: "Johns Hopkins University",
      languages: ["English", "Mandarin"],
      insurances: ["United Healthcare", "Cigna", "Medicare"],
      featured: false,
      lat: 28.6229,
      lng: 77.208,
    },
    {
      id: "doc3",
      name: "Dr. Emily Parker",
      specialty: "Pediatrics",
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Today",
      price: "₹1000",
      hospital: "Children's Hospital",
      distance: "0.8 miles",
      address: "789 Children's Way",
      experience: "12 years",
      education: "Stanford University",
      languages: ["English", "French"],
      insurances: ["Blue Cross", "Cigna", "Medicaid"],
      featured: true,
      lat: 28.6129,
      lng: 77.229,
    },
    {
      id: "doc4",
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      rating: 4.7,
      reviews: 87,
      image: "/placeholder.svg?height=400&width=250",
      availability: "May 10",
      price: "₹2000",
      hospital: "Ortho Specialists",
      distance: "3.1 miles",
      address: "321 Bone Street, Suite 505",
      experience: "20 years",
      education: "Yale University",
      languages: ["English"],
      insurances: ["Blue Cross", "Aetna", "United Healthcare"],
      featured: false,
      lat: 28.6339,
      lng: 77.219,
    },
    {
      id: "doc5",
      name: "Dr. Lisa Rodriguez",
      specialty: "Neurology",
      rating: 4.8,
      reviews: 112,
      image: "/placeholder.svg?height=400&width=250",
      availability: "May 12",
      price: "₹1750",
      hospital: "Neuro Institute",
      distance: "2.7 miles",
      address: "555 Brain Ave, Suite 303",
      experience: "14 years",
      education: "Columbia University",
      languages: ["English", "Spanish"],
      insurances: ["Aetna", "Cigna", "Medicare"],
      featured: true,
      lat: 28.6039,
      lng: 77.239,
    },
    {
      id: "doc6",
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      rating: 4.9,
      reviews: 145,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Today",
      price: "₹1800",
      hospital: "Heart Care Center",
      distance: "1.5 miles",
      address: "789 Heart Street",
      experience: "18 years",
      education: "AIIMS Delhi",
      languages: ["English", "Hindi"],
      insurances: ["Blue Cross", "Aetna", "Medicare"],
      featured: true,
      lat: 28.6239,
      lng: 77.219,
    },
    {
      id: "doc7",
      name: "Dr. Priya Sharma",
      specialty: "Dermatology",
      rating: 4.7,
      reviews: 92,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Tomorrow",
      price: "₹1500",
      hospital: "Skin Care Clinic",
      distance: "2.1 miles",
      address: "456 Skin Avenue",
      experience: "12 years",
      education: "PGI Chandigarh",
      languages: ["English", "Hindi", "Punjabi"],
      insurances: ["United Healthcare", "Cigna", "Medicare"],
      featured: false,
      lat: 28.6329,
      lng: 77.228,
    },
    {
      id: "doc8",
      name: "Dr. Amit Patel",
      specialty: "Orthopedics",
      rating: 4.8,
      reviews: 118,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Today",
      price: "₹2200",
      hospital: "Bone & Joint Hospital",
      distance: "1.8 miles",
      address: "123 Joint Street",
      experience: "15 years",
      education: "MAMC Delhi",
      languages: ["English", "Hindi", "Gujarati"],
      insurances: ["Blue Cross", "Aetna", "United Healthcare"],
      featured: true,
      lat: 28.6139,
      lng: 77.229,
    },
    {
      id: "doc9",
      name: "Dr. Ananya Gupta",
      specialty: "Gynecology",
      rating: 4.9,
      reviews: 167,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Today",
      price: "₹1600",
      hospital: "Women's Health Center",
      distance: "1.4 miles",
      address: "234 Women's Health Drive",
      experience: "13 years",
      education: "Lady Hardinge Medical College",
      languages: ["English", "Hindi", "Bengali"],
      insurances: ["Blue Cross", "Aetna", "Medicare", "Cigna"],
      featured: true,
      lat: 28.6149,
      lng: 77.219,
    },
    {
      id: "doc10",
      name: "Dr. Vikram Singh",
      specialty: "Ophthalmology",
      rating: 4.8,
      reviews: 134,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Tomorrow",
      price: "₹1900",
      hospital: "Eye Care Institute",
      distance: "2.3 miles",
      address: "567 Vision Street",
      experience: "16 years",
      education: "Sankara Nethralaya",
      languages: ["English", "Hindi", "Tamil"],
      insurances: ["Blue Cross", "United Healthcare", "Medicare"],
      featured: false,
      lat: 28.6249,
      lng: 77.239,
    },
    {
      id: "doc11",
      name: "Dr. Meera Kapoor",
      specialty: "Psychiatry",
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg?height=400&width=250",
      availability: "May 11",
      price: "₹2000",
      hospital: "Mental Wellness Center",
      distance: "1.9 miles",
      address: "789 Mind Street",
      experience: "11 years",
      education: "NIMHANS Bangalore",
      languages: ["English", "Hindi", "Kannada"],
      insurances: ["Blue Cross", "Aetna", "Cigna"],
      featured: true,
      lat: 28.6139,
      lng: 77.249,
    },
    {
      id: "doc12",
      name: "Dr. Arjun Reddy",
      specialty: "ENT",
      rating: 4.8,
      reviews: 156,
      image: "/placeholder.svg?height=400&width=250",
      availability: "Today",
      price: "₹1700",
      hospital: "ENT Specialists",
      distance: "2.0 miles",
      address: "345 Ear Nose Throat Ave",
      experience: "14 years",
      education: "Christian Medical College",
      languages: ["English", "Hindi", "Telugu"],
      insurances: ["Blue Cross", "Aetna", "Medicare", "United Healthcare"],
      featured: false,
      lat: 28.6239,
      lng: 77.229,
    }
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
      lat: 28.6239,
      lng: 77.199,
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
      lat: 28.6339,
      lng: 77.229,
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
      lat: 28.6139,
      lng: 77.249,
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
      lat: 28.5939,
      lng: 77.219,
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
      lat: 28.6239,
      lng: 77.259,
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
      price: "₹1200",
      lat: 28.6339,
      lng: 77.209,
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
      price: "₹950",
      lat: 28.6139,
      lng: 77.239,
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
      price: "₹1500",
      lat: 28.6039,
      lng: 77.219,
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
      price: "₹1800",
      lat: 28.6239,
      lng: 77.229,
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
      price: "₹800",
      lat: 28.6139,
      lng: 77.199,
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
      price: "₹500",
      lat: 28.6339,
      lng: 77.239,
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
      price: "₹450",
      lat: 28.6039,
      lng: 77.249,
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
      price: "₹600",
      lat: 28.5939,
      lng: 77.209,
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
      price: "₹550",
      lat: 28.6239,
      lng: 77.189,
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
      price: "₹700",
      lat: 28.6139,
      lng: 77.259,
    },
  ],
}

type ServiceKey = keyof typeof mockServices

// Enhanced Map Component with more visual appeal
const MapComponent = ({
  services,
  activeTab,
  onMarkerClick,
}: { services: any[]; activeTab: ServiceKey; onMarkerClick: (service: any) => void }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-lg font-medium">Loading map data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0">
            <img src="/placeholder.svg?height=800&width=1200" alt="Map" className="w-full h-full object-cover" />

            {/* Simulated map markers */}
            {services.map((service, index) => (
              <button
                key={service.id}
                className="absolute animate-in fade-in zoom-in duration-300"
                style={{
                  top: `${((service.lat - 28.58) / 0.1) * 80}%`,
                  left: `${((service.lng - 77.18) / 0.1) * 80}%`,
                  animationDelay: `${index * 100}ms`,
                }}
                onClick={() => onMarkerClick(service)}
              >
                <div className="relative group">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shadow-lg transform-gpu transition-transform group-hover:scale-110",
                      activeTab === "doctors"
                        ? "bg-emerald-500"
                        : activeTab === "hospitals"
                          ? "bg-blue-500"
                          : activeTab === "labs"
                            ? "bg-purple-500"
                            : "bg-rose-500",
                    )}
                  >
                    {activeTab === "doctors" ? (
                      <Stethoscope className="h-4 w-4 text-white" />
                    ) : activeTab === "hospitals" ? (
                      <Building2 className="h-4 w-4 text-white" />
                    ) : activeTab === "labs" ? (
                      <Microscope className="h-4 w-4 text-white" />
                    ) : (
                      <Pill className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2 whitespace-nowrap text-sm font-medium">
                      {service.name}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-slate-800"></div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

      

          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button
              size="sm"
              className="bg-white dark:bg-slate-800 text-foreground hover:bg-slate-100 dark:hover:bg-slate-700 shadow-lg"
            >
              <Locate className="h-4 w-4 mr-2 text-primary" /> My Location
            </Button>
            <Button
              size="sm"
              className="bg-white dark:bg-slate-800 text-foreground hover:bg-slate-100 dark:hover:bg-slate-700 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" /> Zoom In
            </Button>
            <Button
              size="sm"
              className="bg-white dark:bg-slate-800 text-foreground hover:bg-slate-100 dark:hover:bg-slate-700 shadow-lg"
            >
              <Navigation className="h-4 w-4 mr-2 text-primary" /> Directions
            </Button>
          </div>

          <div className="absolute bottom-4 left-4">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
                  <span>Doctors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>Hospitals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                  <span>Labs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-rose-500 mr-1"></div>
                  <span>Pharmacies</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Enhanced Service Card with better visual design
const ServiceCard = ({
  service,
  type,
  onCardClick,
}: { service: any; type: string; onCardClick: (service: any) => void }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleCardClickInternal = () => {
    onCardClick(service)
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCardClick(service)
  }

  const getTypeIcon = () => {
    switch (type) {
      case "doctors":
        return <Stethoscope className="h-5 w-5 text-emerald-500" />
      case "hospitals":
        return <Building2 className="h-5 w-5 text-blue-500" />
      case "labs":
        return <Microscope className="h-5 w-5 text-purple-500" />
      case "pharmacies":
        return <Pill className="h-5 w-5 text-rose-500" />
      default:
        return <Stethoscope className="h-5 w-5 text-emerald-500" />
    }
  }

  const getButtonText = () => {
    switch (type) {
      case "doctors":
        return "Book Appointment"
      case "labs":
        return "Book Test"
      case "pharmacies":
        return "Order Medicines"
      default:
        return "View Details"
    }
  }

  const getButtonColor = () => {
    switch (type) {
      case "doctors":
        return "bg-emerald-500 hover:bg-emerald-600 text-white"
      case "hospitals":
        return "bg-blue-500 hover:bg-blue-600 text-white"
      case "labs":
        return "bg-purple-500 hover:bg-purple-600 text-white"
      case "pharmacies":
        return "bg-rose-500 hover:bg-rose-600 text-white"
      default:
        return "bg-primary hover:bg-primary/90"
    }
  }

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 group cursor-pointer animate-in fade-in-50 duration-500"
      onClick={handleCardClickInternal}
    >
      <div className="relative">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black/70 z-10"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-4 w-4 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground group-hover:text-rose-500"}`}
          />
        </Button>

        {service.featured && (
          <Badge className="absolute top-2 left-2 bg-amber-500 text-white font-medium px-2 py-1">
            <Sparkles className="h-3 w-3 mr-1" /> Featured
          </Badge>
        )}

        {service.availability && type === "doctors" && (
          <Badge className="absolute bottom-2 left-2 bg-emerald-600 text-white">
            <Clock className="h-3 w-3 mr-1" /> {service.availability}
          </Badge>
        )}

        {service.verified && (
          <Badge className="absolute bottom-2 left-2 bg-blue-600 text-white">
            <ShieldCheck className="h-3 w-3 mr-1" /> Verified
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
          </div>
          <div className="flex items-center flex-shrink-0 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium ml-1 text-amber-700 dark:text-amber-300">{service.rating}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground truncate mt-1" title={service.specialty}>
          {service.specialty}
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0 text-slate-400" />
          <span className="truncate" title={`${service.distance} • ${service.address}`}>
            {service.distance} • {service.address}
          </span>
        </div>
      </CardHeader>

      <CardFooter className="flex justify-between items-center pt-2 pb-4">
        <div>
          {service.price && <div className="font-bold text-lg text-slate-900 dark:text-slate-50">{service.price}</div>}
          <div className="text-xs text-muted-foreground">{service.reviews} reviews</div>
        </div>
        <Button
          size="sm"
          className={cn("group-hover:scale-105 transition-transform shadow-md", getButtonColor())}
          onClick={handleButtonClick}
        >
          {getButtonText()}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Define the service type
type ServiceType = "doctors" | "hospitals" | "labs" | "pharmacies"

interface ServiceDetailProps {
  service: any
  type: ServiceType
  onClose: () => void
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, type, onClose }) => {
  const router = useRouter()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  if (!service) return null

  const getTypeIcon = () => {
    switch (type) {
      case "doctors":
        return <Stethoscope className="h-5 w-5 text-emerald-500" />
      case "hospitals":
        return <Building2 className="h-5 w-5 text-blue-500" />
      case "labs":
        return <FlaskConical className="h-5 w-5 text-purple-500" />
      case "pharmacies":
        return <Pill className="h-5 w-5 text-rose-500" />
      default:
        return null
    }
  }

  const handleActionClick = () => {
    if (type === "hospitals") {
      // For hospitals, just show a message
      toast({
        title: "Hospital Information",
        description: "Contact the hospital directly for appointments and information.",
      })
    } else {
      // For doctors, labs, pharmacies - show payment modal
      setShowPaymentModal(true)
    }
  }

  const handlePaymentSubmit = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)

      // Close payment success after delay
      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentSuccess(false)

        // Show success toast
        toast({
          title: "Payment Successful!",
          description:
            type === "doctors"
              ? "Your appointment has been booked."
              : type === "labs"
                ? "Your lab test has been booked."
                : "Your medicine order has been placed.",
          variant: "default",
        })
      }, 2000)
    }, 2000)
  }

  const getActionButtonText = () => {
    switch (type) {
      case "doctors":
        return "Book Appointment"
      case "labs":
        return "Book Test"
      case "pharmacies":
        return "Order Medicines"
      case "hospitals":
        return "Contact Hospital"
      default:
        return "View Details"
    }
  }

  const getActionButtonColor = () => {
    switch (type) {
      case "doctors":
        return "bg-emerald-500 hover:bg-emerald-600 text-white"
      case "hospitals":
        return "bg-blue-500 hover:bg-blue-600 text-white"
      case "labs":
        return "bg-purple-500 hover:bg-purple-600 text-white"
      case "pharmacies":
        return "bg-rose-500 hover:bg-rose-600 text-white"
      default:
        return "bg-primary hover:bg-primary/90"
    }
  }

  return (
  

  <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <ScrollArea className="flex-grow">
          <div
            className={cn(
              "h-1.5 w-full",
              type === "doctors"
                ? "bg-emerald-500"
                : type === "hospitals"
                  ? "bg-blue-500"
                  : type === "labs"
                    ? "bg-purple-500"
                    : "bg-rose-500"
            )}
          />

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

          <div className="p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-full flex items-center">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium ml-1 text-amber-700 dark:text-amber-300">{service.rating}</span>
              </div>
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
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Address</h3>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <p className="text-sm">{service.address}</p>
                </div>
              </div>

              {type === "doctors" && service.experience && service.education && (
                <>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Experience & Education
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                      <p className="text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                        {service.experience} of experience
                      </p>
                      <p className="text-sm flex items-center mt-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                        {service.education}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.languages.map((lang: string) => (
                        <Badge key={lang} variant="outline" className="bg-slate-50 dark:bg-slate-800/50">
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
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Facility Information
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 space-y-2">
                      <p className="text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                        {service.beds} beds
                      </p>
                      <p className="text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                        Founded in {service.founded}
                      </p>
                      <p className="text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                        {service.emergency ? "24/7 Emergency Services" : "No Emergency Services"}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {type === "labs" && (
                <>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Lab Information
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 space-y-2">
                      <p className="text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-purple-500 mr-2" />
                        Turnaround time: {service.turnaround}
                      </p>
                      <p className="text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-purple-500 mr-2" />
                        {service.homeService ? "Home sample collection available" : "No home sample collection"}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {type === "pharmacies" && (
                <>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Pharmacy Information
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 space-y-2">
                      <p className="text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-rose-500 mr-2" />
                        {service.delivery ? "Delivery service available" : "No delivery service"}
                      </p>
                      <p className="text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-rose-500 mr-2" />
                        {service.driveThru ? "Drive-thru available" : "No drive-thru"}
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                  Accepted Insurance
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.insurances.map((insurance: string) => (
                    <Badge key={insurance} variant="outline" className="font-normal bg-slate-50 dark:bg-slate-800/50">
                      {insurance}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {type === "doctors" && service.price && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Available Appointment Types
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-sm">In-person visit</span>
                      </div>
                      <span className="text-sm font-medium">{service.price}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-center">
                        <Video className="h-4 w-4 text-cyan-500 mr-2" />
                        <span className="text-sm">Video consultation</span>
                      </div>
                      <span className="text-sm font-medium">₹{Number.parseInt(service.price.substring(1)) - 250}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="text-sm">Phone consultation</span>
                      </div>
                      <span className="text-sm font-medium">₹{Number.parseInt(service.price.substring(1)) - 500}</span>
                    </div>
                  </div>
                </div>
              )}

              {type === "pharmacies" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Services</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-sm">In-store pickup</span>
                      </div>
                      <span className="text-sm font-medium">Free</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-center">
                        <Stethoscope className="h-4 w-4 text-cyan-500 mr-2" />
                        <span className="text-sm">Pharmacist consultation</span>
                      </div>
                      <span className="text-sm font-medium">Free</span>
                    </div>
                    {service.delivery && (
                      <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex items-center">
                          <Navigation className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-sm">Home delivery</span>
                        </div>
                        <span className="text-sm font-medium">₹50</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(type === "doctors" || type === "labs") && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Next Available</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="w-full justify-center text-xs h-auto py-2 flex-col leading-tight bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Today
                      <span className="font-normal text-muted-foreground">2:30 PM</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center text-xs h-auto py-2 flex-col leading-tight bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Tomorrow
                      <span className="font-normal text-muted-foreground">10:15 AM</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center text-xs h-auto py-2 flex-col leading-tight bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      May 10
                      <span className="font-normal text-muted-foreground">1:00 PM</span>
                    </Button>
                  </div>
                  <Button variant="link" className="w-full text-primary p-0 h-auto mt-2">
                    See more availability
                  </Button>
                </div>
              )}

              <div
                className={cn(
                  "border rounded-md p-3 text-sm",
                  type === "doctors"
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900"
                    : type === "hospitals"
                      ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900"
                      : type === "labs"
                        ? "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900"
                        : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900",
                )}
              >
                <div className="flex items-start gap-2">
                  <Info
                    className={cn(
                      "h-4 w-4 mt-0.5 flex-shrink-0",
                      type === "doctors"
                        ? "text-emerald-500"
                        : type === "hospitals"
                          ? "text-blue-500"
                          : type === "labs"
                            ? "text-purple-500"
                            : "text-rose-500",
                    )}
                  />
                  <div>
                    <p
                      className={cn(
                        "font-medium mb-1",
                        type === "doctors"
                          ? "text-emerald-700 dark:text-emerald-300"
                          : type === "hospitals"
                            ? "text-blue-700 dark:text-blue-300"
                            : type === "labs"
                              ? "text-purple-700 dark:text-purple-300"
                              : "text-rose-700 dark:text-rose-300",
                      )}
                    >
                      Important Information
                    </p>
                    {type === "pharmacies" ? (
                      <ul
                        className={cn(
                          "list-disc pl-5 space-y-1",
                          type === "doctors"
                            ? "text-emerald-700/80 dark:text-emerald-300/80"
                            : type === "hospitals"
                              ? "text-blue-700/80 dark:text-blue-300/80"
                              : type === "labs"
                                ? "text-purple-700/80 dark:text-purple-300/80"
                                : "text-rose-700/80 dark:text-rose-300/80",
                        )}
                      >
                        <li>Bring your prescription or prescription number</li>
                        <li>Bring your insurance card and ID</li>
                        <li>Ask about medication counseling</li>
                      </ul>
                    ) : (
                      <ul
                        className={cn(
                          "list-disc pl-5 space-y-1",
                          type === "doctors"
                            ? "text-emerald-700/80 dark:text-emerald-300/80"
                            : type === "hospitals"
                              ? "text-blue-700/80 dark:text-blue-300/80"
                              : type === "labs"
                                ? "text-purple-700/80 dark:text-purple-300/80"
                                : "text-rose-700/80 dark:text-rose-300/80",
                        )}
                      >
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
        </ScrollArea>

        <div className="mt-auto p-4 border-t bg-card sticky bottom-0">
          <Button
            className={cn("w-full text-lg py-6 shadow-md", getActionButtonColor())}
            onClick={handleActionClick}
            size="lg"
          >
            {getActionButtonText()}
          </Button>
        </div>

        {/* Payment Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="sm:max-w-[500px]">
            {paymentSuccess ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
                <p className="text-center text-muted-foreground mb-6">
                  {type === "doctors"
                    ? "Your appointment has been booked successfully."
                    : type === "labs"
                      ? "Your lab test has been booked successfully."
                      : "Your medicine order has been placed successfully."}
                </p>
                <p className="text-sm text-center text-muted-foreground">
                  A confirmation has been sent to your email and phone.
                </p>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    {type === "doctors" ? "Book Appointment" : type === "labs" ? "Book Lab Test" : "Order Medicines"}
                  </DialogTitle>
                </DialogHeader>

                {type === "doctors" && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label>Appointment Type</Label>
                      <RadioGroup defaultValue="in-person" onValueChange={setSelectedOption}>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <Label htmlFor="in-person" className="flex items-center">
                              <MapPin className="h-4 w-4 text-emerald-500 mr-2" />
                              In-person visit
                            </Label>
                          </div>
                          <span className="text-sm font-medium">{service.price}</span>
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="video" />
                            <Label htmlFor="video" className="flex items-center">
                              <Video className="h-4 w-4 text-cyan-500 mr-2" />
                              Video consultation
                            </Label>
                          </div>
                          <span className="text-sm font-medium">
                            ₹{Number.parseInt(service.price.substring(1)) - 250}
                          </span>
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone" className="flex items-center">
                              <Phone className="h-4 w-4 text-purple-500 mr-2" />
                              Phone consultation
                            </Label>
                          </div>
                          <span className="text-sm font-medium">
                            ₹{Number.parseInt(service.price.substring(1)) - 500}
                          </span>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Select onValueChange={setSelectedDate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="tomorrow">Tomorrow</SelectItem>
                            <SelectItem value="may-10">May 10, 2025</SelectItem>
                            <SelectItem value="may-11">May 11, 2025</SelectItem>
                            <SelectItem value="may-12">May 12, 2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Select onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9-00">9:00 AM</SelectItem>
                            <SelectItem value="10-30">10:30 AM</SelectItem>
                            <SelectItem value="11-45">11:45 AM</SelectItem>
                            <SelectItem value="2-15">2:15 PM</SelectItem>
                            <SelectItem value="3-30">3:30 PM</SelectItem>
                            <SelectItem value="4-45">4:45 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {type === "labs" && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label>Test Type</Label>
                      <RadioGroup defaultValue="lab-visit" onValueChange={setSelectedOption}>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lab-visit" id="lab-visit" />
                            <Label htmlFor="lab-visit" className="flex items-center">
                              <MapPin className="h-4 w-4 text-purple-500 mr-2" />
                              Visit Lab
                            </Label>
                          </div>
                          <span className="text-sm font-medium">{service.price}</span>
                        </div>
                        {service.homeService && (
                          <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="home-collection" id="home-collection" />
                              <Label htmlFor="home-collection" className="flex items-center">
                                <Navigation className="h-4 w-4 text-cyan-500 mr-2" />
                                Home Sample Collection
                              </Label>
                            </div>
                            <span className="text-sm font-medium">
                              ₹{Number.parseInt(service.price.substring(1)) + 150}
                            </span>
                          </div>
                        )}
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Select onValueChange={setSelectedDate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="tomorrow">Tomorrow</SelectItem>
                            <SelectItem value="may-10">May 10, 2025</SelectItem>
                            <SelectItem value="may-11">May 11, 2025</SelectItem>
                            <SelectItem value="may-12">May 12, 2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Select onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9-00">9:00 AM</SelectItem>
                            <SelectItem value="10-30">10:30 AM</SelectItem>
                            <SelectItem value="11-45">11:45 AM</SelectItem>
                            <SelectItem value="2-15">2:15 PM</SelectItem>
                            <SelectItem value="3-30">3:30 PM</SelectItem>
                            <SelectItem value="4-45">4:45 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {type === "pharmacies" && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label>Delivery Option</Label>
                      <RadioGroup defaultValue="pickup" onValueChange={setSelectedOption}>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pickup" id="pickup" />
                            <Label htmlFor="pickup" className="flex items-center">
                              <MapPin className="h-4 w-4 text-rose-500 mr-2" />
                              Store Pickup
                            </Label>
                          </div>
                          <span className="text-sm font-medium">Free</span>
                        </div>
                        {service.delivery && (
                          <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="delivery" id="delivery" />
                              <Label htmlFor="delivery" className="flex items-center">
                                <Navigation className="h-4 w-4 text-cyan-500 mr-2" />
                                Home Delivery
                              </Label>
                            </div>
                            <span className="text-sm font-medium">₹50</span>
                          </div>
                        )}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Prescription Upload</Label>
                      <div className="border border-dashed rounded-md p-6 text-center">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Drag & drop or click to upload</p>
                          <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, PDF up to 5MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Separator className="my-2" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup defaultValue="card">
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center">
                          <CreditCard className="h-4 w-4 text-slate-500 mr-2" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center">
                          <Zap className="h-4 w-4 text-slate-500 mr-2" />
                          UPI
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex items-center">
                          <Wallet className="h-4 w-4 text-slate-500 mr-2" />
                          Digital Wallet
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="rounded-md bg-slate-50 dark:bg-slate-800/50 p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Subtotal</span>
                      <span className="text-sm font-medium">{service.price}</span>
                    </div>
                    {type === "pharmacies" && selectedOption === "delivery" && (
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Delivery Fee</span>
                        <span className="text-sm font-medium">₹50</span>
                      </div>
                    )}
                    {type === "labs" && selectedOption === "home-collection" && (
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Home Collection Fee</span>
                        <span className="text-sm font-medium">₹150</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Tax</span>
                      <span className="text-sm font-medium">
                      ₹{(() => {
  const price = service?.price;
  if (!price || typeof price !== 'string') return 0;
  const numeric = Number.parseInt(price.substring(1));
  return Math.round(numeric * 0.18);
})()}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>
  ₹
  {service?.price
    ? Number.parseInt(service.price.substring(1)) +
      (type === "pharmacies" && selectedOption === "delivery" ? 50 : 0) +
      (type === "labs" && selectedOption === "home-collection" ? 150 : 0) +
      Math.round(Number.parseInt(service.price.substring(1)) * 0.18)
    : 0}
</span>

                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                    className={cn(
                      type === "doctors"
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : type === "labs"
                          ? "bg-purple-500 hover:bg-purple-600 text-white"
                          : "bg-rose-500 hover:bg-rose-600 text-white"
                    )}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
    </DialogContent>
  </Dialog>
)}

const FilterSidebar = ({
  onFilterChange,
  currentFilters,
  activeTab,
}: {
  onFilterChange: (filters: any) => void
  currentFilters: any
  activeTab: ServiceKey
}) => {
  const [distance, setDistance] = useState<number[]>([currentFilters.distance || 10])
  const [priceRange, setPriceRange] = useState<number[]>([currentFilters.priceRange || 300])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(currentFilters.specialties || [])
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>(currentFilters.insurances || [])
  const [availability, setAvailability] = useState<string[]>(currentFilters.availability || [])
  const [features, setFeatures] = useState<Record<string, boolean>>(currentFilters.features || {})

  useEffect(() => {
    setDistance([currentFilters.distance || 10])
    setPriceRange([currentFilters.priceRange || (activeTab === "doctors" ? 300 : 0)])
    setSelectedSpecialties(currentFilters.specialties || [])
    setSelectedInsurances(currentFilters.insurances || [])
    setAvailability(currentFilters.availability || [])
    setFeatures(currentFilters.features || {})
  }, [currentFilters, activeTab])

  const allSpecialties = useMemo(() => {
    const specialtiesSet = new Set<string>()
    if (activeTab === "doctors") 
      mockServices.doctors.forEach((doc) => specialtiesSet.add(doc.specialty))
    else if (activeTab === "hospitals")
      mockServices.hospitals.forEach((h) => h.specialty.split(", ").forEach((s) => specialtiesSet.add(s)))
    else if (activeTab === "labs") 
      mockServices.labs.forEach((l) => specialtiesSet.add(l.specialty))
    else if (activeTab === "pharmacies") 
      mockServices.pharmacies.forEach((p) => specialtiesSet.add(p.specialty))
    return Array.from(specialtiesSet).sort()
  }, [activeTab])

  const allInsurances = useMemo(() => {
    const insurancesSet = new Set<string>()
    Object.values(mockServices)
      .flat()
      .forEach((service) => {
        if (service.insurances) service.insurances.forEach((ins: string) => insurancesSet.add(ins))
      })
    return Array.from(insurancesSet).sort()
  }, [])

  const availabilityOptions = ["Today", "Tomorrow", "Next 7 days"]

  const handleApplyFilters = () => {
    onFilterChange({
      distance: distance[0],
      priceRange: activeTab === "doctors" ? priceRange[0] : undefined,
      specialties: selectedSpecialties,
      insurances: selectedInsurances,
      availability,
      features,
    })
  }

  const handleResetFilters = () => {
    setDistance([10])
    setPriceRange([activeTab === "doctors" ? 3000 : 0])
    setSelectedSpecialties([])
    setSelectedInsurances([])
    setAvailability([])
    setFeatures({})
    onFilterChange({
      distance: 10,
      priceRange: activeTab === "doctors" ? 3000 : undefined,
      specialties: [],
      insurances: [],
      availability: [],
      features: {},
    })
  }

  const toggleItemInList = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const toggleFeature = (featureKey: string) => {
    setFeatures((prev) => ({ ...prev, [featureKey]: !prev[featureKey] }))
  }

  const renderFeatureFilters = () => {
    switch (activeTab) {
      case "hospitals":
        return (
          <>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="emergency"
                checked={features.emergency || false}
                onCheckedChange={() => toggleFeature("emergency")}
              />
              <Label htmlFor="emergency" className="text-sm font-normal">
                24/7 Emergency
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="verifiedHosp"
                checked={features.verified || false}
                onCheckedChange={() => toggleFeature("verified")}
              />
              <Label htmlFor="verifiedHosp" className="text-sm font-normal">
                Verified
              </Label>
            </div>
          </>
        )
      case "labs":
        return (
          <>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="homeService"
                checked={features.homeService || false}
                onCheckedChange={() => toggleFeature("homeService")}
              />
              <Label htmlFor="homeService" className="text-sm font-normal">
                Home Sample Collection
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="verifiedLab"
                checked={features.verified || false}
                onCheckedChange={() => toggleFeature("verified")}
              />
              <Label htmlFor="verifiedLab" className="text-sm font-normal">
                Verified
              </Label>
            </div>
          </>
        )
      case "pharmacies":
        return (
          <>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="delivery"
                checked={features.delivery || false}
                onCheckedChange={() => toggleFeature("delivery")}
              />
              <Label htmlFor="delivery" className="text-sm font-normal">
                Delivery Available
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="driveThru"
                checked={features.driveThru || false}
                onCheckedChange={() => toggleFeature("driveThru")}
              />
              <Label htmlFor="driveThru" className="text-sm font-normal">
                Drive-Thru
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="verifiedPharm"
                checked={features.verified || false}
                onCheckedChange={() => toggleFeature("verified")}
              />
              <Label htmlFor="verifiedPharm" className="text-sm font-normal">
                Verified
              </Label>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <SheetContent className="w-[350px] sm:w-[400px] flex flex-col p-0">
      <SheetHeader className="p-6 pb-4 border-b">
        <SheetTitle className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-primary" /> Filters
        </SheetTitle>
      </SheetHeader>
      <ScrollArea className="flex-grow p-6">
        <div className="space-y-6">
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

          {activeTab === "doctors" && (
            <div>
              <Label className="text-sm font-medium">Price Range (max: ₹{priceRange[0]})</Label>
              <Slider
                defaultValue={[300]}
                value={priceRange}
                max={5000}
                step={100}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>
          )}

          {activeTab === "doctors" && (
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
          <Button onClick={handleApplyFilters} className="flex-1 bg-primary hover:bg-primary/90">
            Apply Filters
          </Button>
        </SheetClose>
        <Button onClick={handleResetFilters} variant="outline" className="flex-1">
          Reset
        </Button>
      </div>
    </SheetContent>
  )
}

// Missing Upload icon component
const Upload = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

export default function HealthcareSearchPage() {
  const [activeTab, setActiveTab] = useState<ServiceType>("doctors")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"grid">("grid")
  const [appliedFilters, setAppliedFilters] = useState<any>({
    distance: 10,
    priceRange: 3000,
    specialties: [],
    insurances: [],
    availability: [],
    features: {},
  })

  const servicesForTab = mockServices[activeTab]

  const filteredServices = useMemo(() => {
    let services:any = servicesForTab
    console.log('Initial services:', services)

    if (searchTerm) {
      services = services.filter(
        (service:any) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (service.address && service.address.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      console.log('After search filter:', services)
    }

    services = services.filter((service:any) => {
      const serviceDistance = Number.parseFloat(service.distance.replace(" miles", ""))
      return serviceDistance <= appliedFilters.distance
    })
    console.log('After distance filter:', services)

    if (activeTab === "doctors" && appliedFilters.priceRange) {
      console.log('Price range filter:', appliedFilters.priceRange)
      services = services.filter((service:any) => {
        if (!service.price) {
          console.log('No price for service:', service.name)
          return true
        }
        // Remove the ₹ symbol and any commas before parsing
        const priceStr = service.price.replace(/[₹,]/g, '')
        const price = Number.parseInt(priceStr)
        console.log('Service:', service.name, 'Price:', price, 'Max:', appliedFilters.priceRange)
        return price <= appliedFilters.priceRange
      })
      console.log('After price filter:', services)
    }

    if (appliedFilters.specialties && appliedFilters.specialties.length > 0) {
      services = services.filter((service:any) =>
        appliedFilters.specialties.some((spec: string) => service.specialty.toLowerCase().includes(spec.toLowerCase())),
      )
      console.log('After specialties filter:', services)
    }

    if (appliedFilters.insurances && appliedFilters.insurances.length > 0) {
      services = services.filter((service:any) =>
        service.insurances.some((ins: string) => appliedFilters.insurances.includes(ins))
      )
      console.log('After insurance filter:', services)
    }

    if (activeTab === "doctors" && appliedFilters.availability && appliedFilters.availability.length > 0) {
      services = services.filter((service:any) => {
        if (!service.availability) return false
        const availabilityLower = service.availability.toLowerCase()
        return appliedFilters.availability.some((avail: string) => {
          const availLower = avail.toLowerCase()
          if (availLower === "today" || availLower === "tomorrow") {
            return availabilityLower === availLower
          }
          if (availLower === "next 7 days") return true
          return false
        })
      })
      console.log('After availability filter:', services)
    }

    if (appliedFilters.features) {
      Object.entries(appliedFilters.features).forEach(([key, value]) => {
        if (value) {
          services = services.filter((service:any) => service[key] === true)
        }
      })
      console.log('After features filter:', services)
    }

    return services
  }, [servicesForTab, searchTerm, activeTab, appliedFilters])

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue as ServiceType)
    setSelectedService(null)
    setIsDetailPanelOpen(false)
    setAppliedFilters({
      distance: 10,
      priceRange: tabValue === "doctors" ? 3000 : undefined,
      specialties: [],
      insurances: [],
      availability: [],
      features: {},
    })
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

  const getTypeIcon = () => {
    switch (activeTab) {
      case "doctors":
        return <Stethoscope className="h-5 w-5 text-emerald-500" />
      case "hospitals":
        return <Building2 className="h-5 w-5 text-blue-500" />
      case "labs":
        return <FlaskConical className="h-5 w-5 text-purple-500" />
      case "pharmacies":
        return <Pill className="h-5 w-5 text-rose-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white dark:bg-slate-950 px-4 sm:px-6 shadow-sm">
        <h1 className="text-xl font-bold text-primary whitespace-nowrap flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2" />
          Health Connect
        </h1>
        <div className="relative flex-1 ml-auto md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-slate-100 dark:bg-slate-800 pl-8 md:w-[300px] lg:w-[400px] border-slate-200 dark:border-slate-700"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto h-9 w-9 md:ml-4">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </SheetTrigger>
          <FilterSidebar onFilterChange={handleFilterChange} currentFilters={appliedFilters} activeTab={activeTab} />
        </Sheet>
      </header>

      <main className="flex flex-col">
        {/* Map as Hero Section */}
        <div className="w-full h-[50vh] md:h-[60vh] relative">
          <MapComponent services={filteredServices} activeTab={activeTab} onMarkerClick={handleServiceCardClick} />

          {/* Overlay for search tabs */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto rounded-none bg-transparent">
                {(Object.keys(mockServices) as ServiceKey[]).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={cn(
                      "py-3 text-sm md:text-base capitalize flex items-center justify-center rounded-none border-b-2 border-transparent",
                      "data-[state=active]:border-b-2 data-[state=active]:shadow-none",
                      key === "doctors"
                        ? "data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400"
                        : key === "hospitals"
                          ? "data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400"
                          : key === "labs"
                            ? "data-[state=active]:border-purple-500 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-400"
                            : "data-[state=active]:border-rose-500 data-[state=active]:text-rose-700 dark:data-[state=active]:text-rose-400",
                    )}
                  >
                    <span className={`tab-icon ${key}`}> {key}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="p-4 sm:p-6 flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredServices.length} results for{" "}
              <span
                className={cn(
                  "font-semibold",
                  activeTab === "doctors"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : activeTab === "hospitals"
                      ? "text-blue-600 dark:text-blue-400"
                      : activeTab === "labs"
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-rose-600 dark:text-rose-400",
                )}
              >
                {activeTab}
              </span>
              {searchTerm && (
                <>
                  {" "}
                  matching <span className="font-semibold text-primary">"{searchTerm}"</span>
                </>
              )}
            </p>
          
          </div>

          <div className="transition-all duration-300 ease-in-out">
            <div className={"block"}>
              {currentView === "grid" && (
                filteredServices.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredServices.map((service:any) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        type={activeTab}
                        onCardClick={handleServiceCardClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                    <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No services found.</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                  </div>
                )
              )}
          
            </div>

            {isDetailPanelOpen && selectedService && (
              <ServiceDetail service={selectedService} type={activeTab} onClose={handleCloseDetail} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
