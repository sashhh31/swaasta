"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle } from "lucide-react"

interface OTPVerificationProps {
  phoneNumber: string
  onVerify: () => void
  onResend: () => void
  onBack: () => void
}

export function OTPVerification({ phoneNumber, onVerify, onResend, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const inputRefs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [timeLeft, isVerified])

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    setError(null)
    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to previous input on backspace or left arrow if current input is empty
    if ((e.key === "Backspace" || e.key === "ArrowLeft") && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move focus to next input on right arrow
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, 6).split("")
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit
      }
    })

    setOtp(newOtp)

    // Focus the appropriate input after paste
    if (digits.length < 6) {
      inputRefs.current[digits.length]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const verifyOtp = () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP")
      return
    }

    // Here you would typically validate the OTP with a backend service
    // For demo purposes, we're accepting any 6-digit code
    setIsVerified(true)
    setTimeout(() => {
      onVerify()
    }, 1500)
  }

  const handleResend = () => {
    setTimeLeft(30)
    setError(null)
    onResend()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verification</CardTitle>
        <CardDescription>
          {isVerified
            ? "Phone number verified successfully!"
            : `Enter the 6-digit code sent to ${phoneNumber}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isVerified ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center text-gray-600">Your phone number has been verified.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-lg"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center text-red-500 text-sm mb-4">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <p className="text-center text-sm text-gray-500 mb-4">
              Didn't receive the code?{" "}
              {timeLeft > 0 ? (
                <span>Resend in {timeLeft}s</span>
              ) : (
                <Button variant="link" className="p-0 h-auto" onClick={handleResend}>
                  Resend Code
                </Button>
              )}
            </p>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        {!isVerified && (
          <Button onClick={verifyOtp} disabled={otp.join("").length !== 6}>
            Verify
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 