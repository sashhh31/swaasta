"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon, ThumbsUp } from "lucide-react"

interface ProviderReviewsProps {
  providerId: string
}

export function ProviderReviews({ providerId }: ProviderReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      user: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "May 2, 2025",
      comment:
        "Dr. Smith is an excellent cardiologist. She took the time to explain everything in detail and answered all my questions. Highly recommend!",
      likes: 12,
    },
    {
      id: "2",
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "April 28, 2025",
      comment:
        "Very professional and knowledgeable. The wait time was a bit long, but the quality of care was worth it.",
      likes: 5,
    },
    {
      id: "3",
      user: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "April 15, 2025",
      comment:
        "Great experience overall. The staff was friendly and the doctor was very thorough. I'll definitely be coming back.",
      likes: 8,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Patient Reviews</h4>
        <Button size="sm" onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      {showReviewForm && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button key={star} variant="ghost" size="icon" className="h-8 w-8">
                <StarIcon className="h-5 w-5 text-gray-300 hover:text-yellow-500" />
              </Button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">Select rating</span>
          </div>
          <Textarea placeholder="Share your experience with this provider..." />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowReviewForm(false)}>
              Cancel
            </Button>
            <Button size="sm">Submit Review</Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                  <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{review.user}</div>
                  <div className="text-xs text-muted-foreground">{review.date}</div>
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm">{review.comment}</p>
            <div className="mt-2 flex items-center">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span className="text-xs">{review.likes}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Load More Reviews
      </Button>
    </div>
  )
}
