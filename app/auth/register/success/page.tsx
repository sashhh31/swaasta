import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

export default function RegistrationSuccessPage() {
  // This would be determined by the registration flow
  const userType: "patient" | "doctor" | "pharmacy" | "hospital" = "doctor" // Example: patient, doctor, pharmacy, hospital
  const isPending = userType !== "patient"

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            {isPending ? (
              <Clock className="h-6 w-6 text-emerald-600" />
            ) : (
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            )}
          </div>
          <CardTitle className="text-xl">{isPending ? "Registration Submitted" : "Registration Successful"}</CardTitle>
          <CardDescription>
            {isPending ? "Your registration is pending verification" : "Your account has been successfully created"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isPending ? (
            <div className="space-y-4">
              <p className="text-sm text-center text-muted-foreground">
                Thank you for registering as a {userType}. Your application has been submitted and is currently under
                review.
              </p>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-medium">What happens next?</h3>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Our team will verify your documents and credentials</li>
                  <li>This process typically takes 2-3 business days</li>
                  <li>You'll receive an email notification once your account is approved</li>
                  <li>You can check your application status by logging in to your account</li>
                </ul>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                If you have any questions, please contact our support team at support@medimart.com
              </p>
            </div>
          ) : (
            <p className="text-sm text-center text-muted-foreground">
              Welcome to MediMart! You can now access all patient features including ordering medicines, tracking your
              health, and more.
            </p>
          )}

          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link href={isPending ? "/login" : "/dashboard"}>{isPending ? "Go to Login" : "Go to Dashboard"}</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
