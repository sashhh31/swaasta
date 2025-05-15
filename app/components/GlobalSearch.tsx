"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, User, FileText, Calendar, ClipboardList, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock search results - Replace with actual API call
const mockSearchResults: any = {
  doctors: [
    { id: 1, name: "Dr. John Smith", specialty: "Cardiology", type: "doctor" },
    { id: 2, name: "Dr. Sarah Johnson", specialty: "Pediatrics", type: "doctor" },
  ],
  medicines: [
    { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", type: "medicine" },
    { id: 2, name: "Amoxicillin 250mg", category: "Antibiotics", type: "medicine" },
  ],
  hospitals: [
    { id: 1, name: "City General Hospital", location: "Downtown", type: "hospital" },
    { id: 2, name: "Metro Medical Center", location: "Westside", type: "hospital" },
  ],
  tests: [
    { id: 1, name: "Complete Blood Count", category: "Blood Tests", type: "test" },
    { id: 2, name: "Lipid Profile", category: "Blood Tests", type: "test" },
  ],
}

export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      // Mock search logic - Replace with actual API call
      const results = [
        ...mockSearchResults.doctors,
        ...mockSearchResults.medicines,
        ...mockSearchResults.hospitals,
        ...mockSearchResults.tests,
      ].filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.specialty && item.specialty.toLowerCase().includes(query.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(query.toLowerCase()))
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  // Get icon based on result type
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'doctor':
        return <User className="h-4 w-4" />
      case 'medicine':
        return <FileText className="h-4 w-4" />
      case 'hospital':
        return <Calendar className="h-4 w-4" />
      case 'test':
        return <ClipboardList className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  // Get result link based on type
  const getResultLink = (item: any) => {
    switch (item.type) {
      case 'doctor':
        return `/doctors/${item.id}`
      case 'medicine':
        return `/pharmacy/${item.id}`
      case 'hospital':
        return `/hospitals/${item.id}`
      case 'test':
        return `/lab-tests/${item.id}`
      default:
        return '#'
    }
  }

  return (
    <div className="relative w-full max-w-sm" ref={searchRef}>
      <Input 
        className="pl-3 pr-10 py-2 rounded-full border-teal-800 bg-teal-800/10 focus:ring-teal-500 focus:border-teal-500" 
        placeholder="Search doctors, medicines, hospitals..." 
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => searchQuery.length > 2 && setShowResults(true)}
      />
      {searchQuery && (
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute right-10 top-0 h-full text-gray-500 hover:text-gray-700"
          onClick={() => {
            setSearchQuery("")
            setShowResults(false)
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <Button 
        size="icon" 
        variant="ghost" 
        className="absolute right-0 top-0 h-full rounded-r-full bg-teal-800 text-white hover:bg-teal-700"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto z-50">
          <div className="p-2">
            {searchResults.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={getResultLink(result)}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowResults(false)}
              >
                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-800">
                  {getResultIcon(result.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{result.name}</p>
                  <p className="text-xs text-gray-500">
                    {result.specialty || result.category || result.location}
                  </p>
                </div>
                <span className="text-xs text-teal-600 capitalize">{result.type}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 