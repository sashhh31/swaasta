import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-white"></div>
                </div>
              </div>
              <span className="text-2xl font-bold">
                SWA<span className="text-yellow-500">AS</span>TA
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#doctors" className="text-teal-800 hover:text-teal-600 font-medium">
                Doctors
              </Link>
              <Link href="#pharmacy" className="text-teal-800 hover:text-teal-600 font-medium">
                Pharmacy
              </Link>
              <Link href="#laboratory" className="text-teal-800 hover:text-teal-600 font-medium">
                Laboratory
              </Link>
              <Link href="#hospital" className="text-teal-800 hover:text-teal-600 font-medium">
                Hospital
              </Link>
              <Link href="#about" className="text-teal-800 hover:text-teal-600 font-medium">
                About Us
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Input 
                className="pl-3 pr-10 py-2 rounded-full border-teal-800 bg-teal-800/10 focus:ring-teal-500 focus:border-teal-500" 
                placeholder="Search here.." 
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full rounded-r-full bg-teal-800 text-white hover:bg-teal-700"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/auth/login">
              <Button variant="outline" className="border-teal-800 text-teal-800 hover:bg-teal-50">
                Log in
              </Button>
              </Link>
              <Link href="/auth/register">
              <Button className="bg-teal-800 text-white hover:bg-teal-700">
                Register
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="container px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-teal-900 leading-tight">
                  CONNECT DIRECTLY<br />WITH YOUR DOCTOR
                </h1>
                <p className="text-xl text-teal-800 tracking-widest">
                  CONCIERGE MEDICINE
                </p>
                <p className="text-gray-600 max-w-md">
                  Experience healthcare like never before. Book appointments, order medicines, 
                  schedule lab tests, and more - all in one place.
                </p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-md">
                  MAKE AN APPOINTMENT TODAY!
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image 
                  src="/placeholder.svg?height=800&width=600" 
                  alt="Doctor with digital health interface"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-transparent mix-blend-overlay"></div>
              </div>
            </div>
          </div>
          
          {/* DNA Background Element */}
          <div className="absolute left-0 top-0 w-full h-full -z-10 opacity-10">
            <div className="absolute left-10 top-1/4 w-64 h-64 rounded-full border-4 border-teal-200 animate-pulse"></div>
            <div className="absolute right-10 bottom-1/4 w-48 h-48 rounded-full border-4 border-teal-300 animate-pulse delay-700"></div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 bg-gradient-to-b from-white to-teal-50">
          <div className="container px-4">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-teal-900 mb-2">Find Doctors</h3>
                <p className="text-gray-600 mb-4">Connect with top specialists in your area for consultations and treatments.</p>
                <Button variant="link" className="text-teal-700 p-0 flex items-center">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-teal-900 mb-2">Pharmacy</h3>
                <p className="text-gray-600 mb-4">Order medicines online and get them delivered to your doorstep.</p>
                <Button variant="link" className="text-teal-700 p-0 flex items-center">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-teal-900 mb-2">Laboratory</h3>
                <p className="text-gray-600 mb-4">Book diagnostic tests and get your reports online.</p>
                <Button variant="link" className="text-teal-700 p-0 flex items-center">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-teal-900 mb-2">Hospitals</h3>
                <p className="text-gray-600 mb-4">Find the best hospitals and healthcare facilities near you.</p>
                <Button variant="link" className="text-teal-700 p-0 flex items-center">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section id="doctors" className="py-12">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-yellow-500 mr-3"></div>
                <h2 className="text-2xl font-bold text-teal-800">Doctors</h2>
              </div>
              <Link href="/find-services" className="text-teal-700 flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="w-full h-full rounded-full overflow-hidden bg-yellow-300">
                        <Image 
                          src="/placeholder.svg?height=200&width=200" 
                          alt="Doctor profile"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-teal-900">Dr. {item === 1 ? "Avinash" : item === 2 ? "Maria Andaloro" : "Michael Brian"}</h3>
                    <p className="text-gray-600 mb-1">{item === 1 ? "Doctor of Medicine" : item === 2 ? "Dental Medicine" : "Family Physician"}</p>
                    <p className="text-gray-500 text-sm mb-3">Vasnt Kunj, Del</p>
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-2 w-full">
                      <Button className="bg-teal-800 hover:bg-teal-700 text-white w-full">
                        Book Now
                      </Button>
                      <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 w-full">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Laboratory Section */}
        <section id="laboratory" className="py-12 bg-gray-50">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-yellow-500 mr-3"></div>
                <h2 className="text-2xl font-bold text-teal-800">Laboratory</h2>
              </div>
              <Link href="/find-services" className="text-teal-700 flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="w-full h-full rounded-full overflow-hidden bg-yellow-300">
                        <Image 
                          src="/placeholder.svg?height=200&width=200" 
                          alt="Laboratory profile"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 text-center">
                      {item === 1 || item === 3 ? "Mig-302, Lane 8, Satya sai" : 
                       item === 2 ? "43, Ritvik Nilaya, 2nd main" : "Plot no-3637, Indian idol"}
                    </p>
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pharmacy Section */}
        <section id="pharmacy" className="py-12">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-yellow-500 mr-3"></div>
                <h2 className="text-2xl font-bold text-teal-800">Pharmacy</h2>
              </div>
              <Link href="#" className="text-teal-700 flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="w-full h-full rounded-full overflow-hidden bg-yellow-300">
                        <Image 
                          src="/placeholder.svg?height=200&width=200" 
                          alt="Pharmacy profile"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-gradient-to-b from-white to-teal-50">
          <div className="container px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-teal-900 mb-4">Featured Health Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our curated selection of premium health and wellness products to support your journey to better health.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 relative">
                    <Image 
                      src={`/placeholder.svg?height=300&width=400&text=Product+${item}`}
                      alt={`Health product ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-teal-900 mb-1">
                      {item === 1 ? "Organic Multivitamin" : 
                       item === 2 ? "Herbal Immunity Booster" : 
                       item === 3 ? "Natural Skin Care Set" : 
                       "Ayurvedic Wellness Pack"}
                    </h3>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">(42)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-teal-800">₹{item * 299}</p>
                      <Button size="sm" className="bg-teal-700 hover:bg-teal-600 text-white">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-teal-50">
          <div className="container px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-teal-900 mb-4">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from our satisfied customers about their experience with SWAASTA's healthcare services.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    {item === 1 ? 
                      "SWAASTA has completely transformed how I manage my healthcare. The convenience of booking appointments and getting medicines delivered is incredible." : 
                     item === 2 ? 
                      "The doctors on SWAASTA are highly professional and caring. I've been getting my regular check-ups through the platform and couldn't be happier." : 
                      "The lab test booking and home collection service saved me so much time. The reports were delivered promptly and the entire experience was seamless."}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-teal-900">
                        {item === 1 ? "Priya Sharma" : item === 2 ? "Rahul Mehta" : "Ananya Patel"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item === 1 ? "Delhi" : item === 2 ? "Mumbai" : "Bangalore"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-800 text-white">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Download the SWAASTA App</h2>
                <p className="text-teal-100 mb-6">
                  Get the complete healthcare experience on your mobile. Book appointments, order medicines, 
                  schedule lab tests, and more - all from your smartphone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-teal-800 hover:bg-teal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      <path fillRule="evenodd" d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    App Store
                  </Button>
                  <Button className="bg-white text-teal-800 hover:bg-teal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[300px]">
                <Image 
                  src="/placeholder.svg?height=600&width=400&text=App+Screenshot" 
                  alt="SWAASTA mobile app"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-teal-900 text-white py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center mb-4">
                <div className="relative h-10 w-10 mr-2">
                  <div className="absolute inset-0 rounded-full bg-red-500 flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-white"></div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-white">
                  SWA<span className="text-yellow-500">AS</span>TA
                </span>
              </Link>
              <p className="text-teal-200 mb-4">
                Your complete healthcare solution for a healthier and happier life.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-teal-200 hover:text-white">Home</Link></li>
                <li><Link href="#" className="text-teal-200 hover:text-white">About Us</Link></li>
                <li><Link href="#" className="text-teal-200 hover:text-white">Services</Link></li>
                <li><Link href="#" className="text-teal-200 hover:text-white">Doctors</Link></li>
                <li><Link href="#" className="text-teal-200 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-teal-200 hover:text-white">Find a Doctor</Link></li>
                <li><Link href="#" className="text-teal-200 hover:text-white">Online Pharmacy</Link></li>
                <li><Link href="#" className="text-teal-200 hover:text-white">Lab Tests</Link></li>
                <li><Link href="#" className="text-teal-200 hover:text-white">Health Packages</Link></li>
                <li><Link href="#" className="text-teal-200 hover:text-white">Hospital Care</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-teal-200">
                <p className="mb-2">123 Healthcare Avenue</p>
                <p className="mb-2">New Delhi, India 110001</p>
                <p className="mb-2">Email: info@swaasta.com</p>
                <p>Phone: +91 98765 43210</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-teal-800 mt-8 pt-8 text-center text-teal-300">
            <p>&copy; {new Date().getFullYear()} SWAASTA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
