"use client"

import { motion } from "framer-motion"
import { stagger, fadeIn } from "@/lib/animations"
import { Calendar, Pill, TestTube, Video, FileText, MessageSquare } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: <Calendar className="h-10 w-10" />,
      title: "Easy Appointment Booking",
      description: "Schedule appointments with doctors, pharmacies, and labs with just a few clicks."
    },
    {
      icon: <Video className="h-10 w-10" />,
      title: "Video Consultations",
      description: "Connect with healthcare professionals from the comfort of your home."
    },
    {
      icon: <Pill className="h-10 w-10" />,
      title: "Medicine Delivery",
      description: "Order prescriptions and get them delivered to your doorstep."
    },
    {
      icon: <TestTube className="h-10 w-10" />,
      title: "Home Sample Collection",
      description: "Schedule lab technicians to collect samples from your home."
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Digital Health Records",
      description: "Access all your medical records and history in one secure place."
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "Secure Messaging",
      description: "Chat with healthcare providers for queries and follow-ups."
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <motion.span 
            className="inline-block text-sm font-medium text-primary mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Features
          </motion.span>
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Everything You Need For Healthcare
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-500 md:text-xl dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Our platform offers a comprehensive suite of healthcare services designed to make your life easier and healthier.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="relative group overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
