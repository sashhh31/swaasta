"use client"

import { useSearchParams } from "next/navigation"
import { VerificationForm } from "@/components/auth/verification-form"

export default function VerificationPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") as "doctor" | "pharmacy" | "laboratory"
  
  if (!role || !["doctor", "pharmacy", "laboratory"].includes(role)) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Invalid Request</h1>
            <p className="text-sm text-muted-foreground">
              Please go back and select a valid role for verification.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Verification Required</h1>
          <p className="text-sm text-muted-foreground">
            Please complete the verification process to continue.
          </p>
        </div>
        <VerificationForm role={role} />
      </div>
    </div>
  )
} 