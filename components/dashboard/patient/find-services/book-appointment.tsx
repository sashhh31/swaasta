"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Clock } from "lucide-react"

interface BookAppointmentProps {
  provider: any
}

export function BookAppointment({ provider }: BookAppointmentProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined)
  const [appointmentType, setAppointmentType] = useState<string | undefined>(undefined)
  const [step, setStep] = useState(1)
  const [isBooked, setIsBooked] = useState(false)

  // Mock time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ]

  const handleBookAppointment = () => {
    // In a real app, this would send the booking to the server
    setIsBooked(true)
  }

  if (isBooked) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium mb-2">Appointment Booked!</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your appointment with {provider.name} has been scheduled for{" "}
          {date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} at{" "}
          {timeSlot}.
        </p>
        <Button
          onClick={() => {
            setIsBooked(false)
            setStep(1)
            setDate(undefined)
            setTimeSlot(undefined)
            setAppointmentType(undefined)
          }}
        >
          Book Another Appointment
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {step === 1 && (
        <>
          <div>
            <h4 className="font-medium mb-2">Select Date</h4>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              disabled={(date) => {
                // Disable past dates and Sundays
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return date < today || date.getDay() === 0
              }}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!date}>
              Next
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <h4 className="font-medium mb-2">Select Time</h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={timeSlot === slot ? "default" : "outline"}
                  className="flex items-center justify-center"
                  onClick={() => setTimeSlot(slot)}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {slot}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)} disabled={!timeSlot}>
              Next
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Appointment Type</h4>
              <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="in-person" />
                  <Label htmlFor="in-person">In-Person Visit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video">Video Consultation</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="font-medium mb-2">Visit Reason</h4>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason for visit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-patient">New Patient Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                  <SelectItem value="annual">Annual Check-up</SelectItem>
                  <SelectItem value="urgent">Urgent Care</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h4 className="font-medium mb-2">Additional Notes</h4>
              <Textarea placeholder="Please share any specific concerns or information that would be helpful for your provider to know before the appointment." />
            </div>

            <div>
              <h4 className="font-medium mb-2">Appointment Summary</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Provider:</span>
                  <span className="text-sm">{provider.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">
                    {date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Time:</span>
                  <span className="text-sm">{timeSlot}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={handleBookAppointment} disabled={!appointmentType}>
              Confirm Booking
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
