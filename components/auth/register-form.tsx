"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowRight, ChevronLeft, User, Stethoscope, Pill, TestTube } from "lucide-react"
import Image from "next/image"

// Importing components
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const stepOneSchema = z.object({
  role: z.enum(["patient", "doctor", "pharmacy", "laboratory"]),
})

const stepTwoSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().min(10, {
    message: "Please enter a valid mobile number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

const fullSchema = stepOneSchema.merge(stepTwoSchema)

type FormData = z.infer<typeof fullSchema>

export default function SignupForm() {
  const [step, setStep] = useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(step === 1 ? stepOneSchema : fullSchema),
    defaultValues: {
      role: "patient",
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
  })

  const onSubmit = (values: FormData) => {
    if (step === 1) {
      setStep(2)
    } else {
      console.log("Submitting:", values)
      // Handle actual sign-up logic here
    }
  }

  return (
    <div className="flex min-h-screen items-center  justify-center bg-gradient-to-br from-white to-gray-200 p-4">
      <div className="w-full max-w-full">
        {/* Logo or brand element */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-purple-600 p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-800">HealthConnect</span>
          </div>
        </div>

        <Card className="overflow-hidden rounded-xl border-0 bg-white shadow-lg">
          <CardContent className="p-0">
            {/* Progress indicator */}
            <div className="mb-6 flex w-full">
              <div className={`h-1 w-1/2 ${step === 1 ? 'bg-purple-500' : 'bg-purple-300'}`}></div>
              <div className={`h-1 w-1/2 ${step === 2 ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
            </div>

            <div className="px-6 pb-8 pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="mb-6 text-center">
                        <h1 className="mb-2 text-2xl font-bold text-gray-800">Welcome aboard</h1>
                        <p className="text-sm text-gray-600">
                          Choose your role to get started with HealthConnect
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                {[
                                  { role: "patient", icon: <User className="h-6 w-6" /> },
                                  { role: "doctor", icon: <Stethoscope className="h-6 w-6" /> },
                                  { role: "pharmacy", icon: <Pill className="h-6 w-6" /> },
                                  { role: "laboratory", icon: <TestTube className="h-6 w-6" /> },
                                ].map(({ role, icon }) => (
                                  <FormItem key={role}>
                                    <FormControl>
                                      <RadioGroupItem value={role} id={role} className="peer sr-only" />
                                    </FormControl>
                                    <FormLabel
                                      htmlFor={role}
                                      className={cn(
                                        "flex flex-col items-center justify-between rounded-lg border border-gray-300 bg-gray-100 p-4 text-gray-800 transition-all hover:border-purple-400 hover:bg-gray-200",
                                        "peer-checked:border-purple-500 peer-checked:bg-purple-100 peer-checked:text-gray-800"
                                      )}
                                    >
                                      <div className="mb-3 rounded-full bg-gray-200 p-3">
                                        {icon}
                                      </div>
                                      <span className="text-center font-medium">
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                      </span>
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="mt-8 w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-white transition-all hover:opacity-90"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="mb-6">
                        <button 
                          type="button" 
                          onClick={() => setStep(1)} 
                          className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-800"
                        >
                          <ChevronLeft className="mr-1 h-4 w-4" />
                          Back
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">Complete your profile</h1>
                        <p className="text-sm text-gray-600">
                          We need a few more details to set up your account
                        </p>
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-gray-600">Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John Doe" 
                                  {...field} 
                                  className="rounded-lg border-gray-300 bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-gray-600">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="you@example.com" 
                                  {...field} 
                                  className="rounded-lg border-gray-300 bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-gray-600">Mobile</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+91 1234567890" 
                                  {...field} 
                                  className="rounded-lg border-gray-300 bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-gray-600">Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  className="rounded-lg border-gray-300 bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="mt-8 w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-white transition-all hover:opacity-90"
                      >
                        Create Account
                      </Button>

                      <p className="mt-4 text-center text-xs text-gray-600">
                        By signing up, you agree to our 
                        <a href="#" className="text-purple-400 hover:text-purple-300"> Terms of Service </a> 
                        and 
                        <a href="#" className="text-purple-400 hover:text-purple-300"> Privacy Policy</a>
                      </p>
                    </>
                  )}
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>

        {/* Login link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}