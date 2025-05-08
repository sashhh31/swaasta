"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export function LandingTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "MediConnect has completely transformed how I manage my healthcare. I can book appointments, get medicines delivered, and chat with my doctor all from one app. It's incredibly convenient!",
      avatar: "/avatars/patient1.png",
      initials: "SJ",
      rating: 5,
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "As a healthcare provider, MediConnect has made it so much easier to manage my patient appointments and follow-ups. The video consultation feature is seamless and the digital records system is a game-changer.",
      avatar: "/avatars/doctor1.png",
      initials: "MC",
      rating: 5,
    },
    {
      name: "LifeCare Pharmacy",
      role: "Pharmacy Partner",
      content: "Joining MediConnect has significantly increased our customer base. The platform's inventory management tools and order processing system have streamlined our operations and improved efficiency.",
      avatar: "/avatars/pharmacy1.png",
      initials: "LP",
      rating: 4,
    },
    {
      name: "Robert Williams",
      role: "Patient",
      content: "I used to spend hours traveling to different clinics and pharmacies. Now with MediConnect, everything is at my fingertips. The home lab test booking feature has been particularly helpful.",
      avatar: "/avatars/patient2.png",
      initials: "RW",
      rating: 5,
    },
    {
      name: "MedLab Diagnostics",
      role: "Laboratory Partner",
      content: "The platform has helped us digitize our reports and streamline communication with patients. The scheduling system has reduced no-shows by sending timely reminders to patients.",
      avatar: "/avatars/lab1.png",
      initials: "ML",
      rating: 5,
    },
    {
      name: "Dr. Priya Sharma",
      role: "Pediatrician",
      content: "MediConnect has made it much easier for me to keep track of my patients' health over time. The intuitive interface and comprehensive tools make my practice more efficient and patient-focused.",
      avatar: "/avatars/doctor2.png",
      initials: "PS",
      rating: 4,
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <motion.span 
            className="inline-block text-sm font-medium text-primary mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Testimonials
          </motion.span>
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-500 md:text-xl dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Hear from patients, doctors, pharmacies, and laboratories about their experience with our platform.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex space-x-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300 fill-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
