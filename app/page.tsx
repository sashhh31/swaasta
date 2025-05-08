import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight, Star, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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
        {/* Hero Section - With image as main background */}
        <section className="relative bg-[url('/medicine.png')] bg-cover bg-center min-h-screen flex items-center text-white">
  {/* Overlay */}
  <div className="absolute inset-0  z-0" />

  {/* Main Content */}
  <div className="relative z-10 w-full">
    <div className="container px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            HEALTHCARE. REAL RESULTS
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Take the step towards a healthier, more vibrant life – shop now and fuel your body with the best!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-teal-700 hover:bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center">
              Shop now
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="link" className="text-teal-300 hover:text-teal-100 transition-colors duration-300">
              Learn more
            </Button>
          </div>
        </div>

        {/* Right Product Image */}
        <div className="relative flex justify-center">
          <div className="relative h-[400px] w-full max-w-md">
            <Image
              src="/image.png"
              alt="Vitamin D3+K2 supplement bottle"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-1/4 right-0">
            <Badge className="bg-white text-gray-800 shadow-md rounded-full px-3 py-1 hover:bg-gray-100 transition-all">
              Allergen-Free
            </Badge>
          </div>
          <div className="absolute bottom-1/4 left-0">
            <Badge className="bg-white text-gray-800 shadow-md rounded-full px-3 py-1 hover:bg-gray-100 transition-all">
              Premium Ingredients
            </Badge>
          </div>
          <div className="absolute bottom-1/3 right-0">
            <Badge className="bg-white text-gray-800 shadow-md rounded-full px-3 py-1 hover:bg-gray-100 transition-all">
              Non-GMO
            </Badge>
          </div>
        </div>
      </div>

      {/* Background Text */}
      <div className="absolute right-0 top-0 text-white opacity-5 text-9xl font-black pointer-events-none select-none">
        HEALTH
      </div>

      {/* Decorative Circle */}
      <div className="absolute right-10 bottom-1/4 w-48 h-48 rounded-full border-4 border-pink-300 animate-pulse opacity-30 z-0"></div>
    </div>
  </div>
</section>

        {/* Products Section */}
        {/* <section className="py-12 bg-gray-50">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-yellow-500 mr-3"></div>
                <h2 className="text-2xl font-bold text-teal-800">New Arrivals</h2>
              </div>
              <Link href="/products" className="text-teal-700 flex items-center">
                View all products <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Omega-3 Fish oil",
                  subtitle: "Original Formula",
                  price: "$22.00",
                  image: "/placeholder.svg?height=300&width=200&text=Omega-3"
                },
                {
                  name: "Vitamin D3+K2",
                  subtitle: "With Coconut MCT Oil",
                  price: "$45.99",
                  image: "/placeholder.svg?height=300&width=200&text=Vitamin+D3"
                },
                {
                  name: "Marine Collagen Peptides",
                  subtitle: "30 Servings",
                  price: "$32.99",
                  image: "/placeholder.svg?height=300&width=200&text=Collagen"
                },
                {
                  name: "A set of Dietary supplements",
                  subtitle: "60-Day Collagen Regimen",
                  price: "$39.00",
                  image: "/placeholder.svg?height=300&width=200&text=Supplements"
                }
              ].map((product, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden bg-white">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-gray-400 hover:text-teal-600"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">{product.price}</span>
                      <Button size="sm" className="bg-teal-800 hover:bg-teal-700 text-white rounded-full">
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Doctors Section */}
        <section id="doctors" className="py-12">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-yellow-500 mr-3"></div>
                <h2 className="text-2xl font-bold text-teal-800">Doctors</h2>
              </div>
              <Link href="/doctors" className="text-teal-700 flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Dr. Avinash",
                  specialty: "Doctor of Medicine",
                  location: "Vasnt Kunj, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Doctor"
                },
                {
                  name: "Dr. Maria Andaloro",
                  specialty: "Dental Medicine",
                  location: "Vasnt Kunj, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Doctor"
                },
                {
                  name: "Dr. Michael Brian",
                  specialty: "Family Physician",
                  location: "Vasnt Kunj, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Doctor"
                },
                {
                  name: "Dr. Michael Brian",
                  specialty: "Family Physician",
                  location: "Vasnt Kunj, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Doctor"
                }
              ].map((doctor, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                        <Image 
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-teal-900">{doctor.name}</h3>
                    <p className="text-gray-600 mb-1">{doctor.specialty}</p>
                    <p className="text-gray-500 text-sm mb-3">{doctor.location}</p>
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
              <Link href="/laboratory" className="text-teal-700 flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "City Lab Center",
                  address: "Mig-302, Lane 8, Satya sai",
                  image: "/placeholder.svg?height=200&width=200&text=Lab"
                },
                {
                  name: "Precise Diagnostics",
                  address: "43, Ritvik Nilaya, 2nd main",
                  image: "/placeholder.svg?height=200&width=200&text=Lab"
                },
                {
                  name: "Metro Labs",
                  address: "Mig-302, Lane 8, Satya sai",
                  image: "/placeholder.svg?height=200&width=200&text=Lab"
                },
                {
                  name: "HealthPoint Diagnostics",
                  address: "Plot no-3637, Indian idol",
                  image: "/placeholder.svg?height=200&width=200&text=Lab"
                }
              ].map((lab, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                        <Image 
                          src={lab.image || "/placeholder.svg"}
                          alt="Laboratory"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-teal-900">{lab.name}</h3>
                    <p className="text-gray-600 mb-3 text-center">{lab.address}</p>
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-2 w-full">
                      <Button className="bg-teal-800 hover:bg-teal-700 text-white w-full">
                        Book Test
                      </Button>
                      <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 w-full">
                        View Details
                      </Button>
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
              <Link href="/find-services" className="text-teal-700 flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "MedPlus Pharmacy",
                  address: "Rajouri Garden, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Pharmacy"
                },
                {
                  name: "HealthMart",
                  address: "Connaught Place, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Pharmacy"
                },
                {
                  name: "Wellness Drugs",
                  address: "Mayur Vihar, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Pharmacy"
                },
                {
                  name: "Care Pharmaceuticals",
                  address: "Karol Bagh, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Pharmacy"
                }
              ].map((pharmacy, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="w-full h-full rounded-full overflow-hidden bg-yellow-50">
                        <Image 
                          src={pharmacy.image} 
                          alt="Pharmacy profile"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-teal-900">{pharmacy.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">{pharmacy.address}</p>
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-2 w-full">
                      <Button className="bg-teal-800 hover:bg-teal-700 text-white w-full">
                        Order Medicines
                      </Button>
                      <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hospital Section */}
        <section id="hospital" className="py-12 bg-gray-50">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-yellow-500 mr-3"></div>
                <h2 className="text-2xl font-bold text-teal-800">Hospitals</h2>
              </div>
              <Link href="/hospitals" className="text-teal-700 flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "City Hospital",
                  specialty: "Multi-Specialty Hospital",
                  location: "Vasnt Kunj, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Hospital"
                },
                {
                  name: "Metro Medical Center",
                  specialty: "Cardiology Center",
                  location: "Vasnt Kunj, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Hospital"
                },
                {
                  name: "Care Hospital",
                  specialty: "Pediatric Specialty",
                  location: "Vasnt Kunj, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Hospital"
                },
                {
                  name: "Health & Wellness Center",
                  specialty: "General Medicine",
                  location: "Vasnt Kunj, Del",
                  image: "/placeholder.svg?height=200&width=200&text=Hospital"
                }
              ].map((hospital, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="w-full h-full rounded-full overflow-hidden bg-teal-50">
                        <Image 
                          src={hospital.image}
                          alt="Hospital profile"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-teal-900">{hospital.name}</h3>
                    <p className="text-gray-600 mb-1">{hospital.specialty}</p>
                    <p className="text-gray-500 text-sm mb-3">{hospital.location}</p>
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-2 w-full">
                      <Button className="bg-teal-800 hover:bg-teal-700 text-white w-full">
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <Image 
              src="/placeholder.svg?height=1000&width=1800&text=Medical+Background" 
              alt="Medical background"
              fill
              className="object-cover"
            />
          </div>
          <div className="container px-4 relative z-10">
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
                <a href="#" className="text-white hover:text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-teal-200 hover:text-yellow-400">About Us</Link></li>
                <li><Link href="/contact" className="text-teal-200 hover:text-yellow-400">Contact</Link></li>
                <li><Link href="/careers" className="text-teal-200 hover:text-yellow-400">Careers</Link></li>
                <li><Link href="/blog" className="text-teal-200 hover:text-yellow-400">Blog</Link></li>
                <li><Link href="/terms" className="text-teal-200 hover:text-yellow-400">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/doctors" className="text-teal-200 hover:text-yellow-400">Find Doctors</Link></li>
                <li><Link href="/pharmacy" className="text-teal-200 hover:text-yellow-400">Order Medicines</Link></li>
                <li><Link href="/lab-tests" className="text-teal-200 hover:text-yellow-400">Book Lab Tests</Link></li>
                <li><Link href="/appointments" className="text-teal-200 hover:text-yellow-400">Book Appointment</Link></li>
                <li><Link href="/teleconsult" className="text-teal-200 hover:text-yellow-400">Video Consultation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-teal-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Health Street, Medical District, City
                </li>
                <li className="flex items-center text-teal-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@swaasta.com
                </li>
                <li className="flex items-center text-teal-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  1800-SWAASTA
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-teal-800 mt-8 pt-8 text-center text-teal-200">
            <p>&copy; {new Date().getFullYear()} SWAASTA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}