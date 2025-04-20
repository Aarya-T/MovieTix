"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, Info, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SeatSelection from "@/components/seat-selection"
import SnacksSelection from "@/components/snacks-selection"
import { notFound } from "next/navigation"

export default function BookingPage({ params }: { params: { theaterId: string } }) {
  const searchParams = useSearchParams()
  const time = searchParams.get("time") || "7:30 PM"
  const date = searchParams.get("date") || "2024-03-20"
  const movieId = searchParams.get("movieId")
  const movieTitle = searchParams.get("movieTitle")

  const [ticketCount, setTicketCount] = useState("2")
  const [step, setStep] = useState(1)
  const [snacksTotal, setSnacksTotal] = useState(0)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [bookingReference, setBookingReference] = useState("")
  const [phone, setPhone] = useState("")
  const [smsSent, setSmsSent] = useState(false)

  // If no movieId is provided, show 404
  if (!movieId && typeof window !== "undefined") {
    notFound()
  }

  // Mock theater data
  const theater = {
    id: params.theaterId,
    name: "PVR Cinemas",
    location: "Phoenix Mall",
  }

  // Generate a booking reference
  const generateBookingReference = () => {
    return `MTIX-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`
  }

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    // Generate booking reference if not already set
    const reference = bookingReference || generateBookingReference()
    setBookingReference(reference)

    // In a real app, you would save the booking to a database here

    // Move to confirmation step
    setStep(3)

    // Send confirmation email if email is provided
    if (email) {
      try {
        const { sendBookingConfirmation } = await import("@/app/actions/email-actions")
        const result = await sendBookingConfirmation({
          email,
          bookingReference: reference,
          movieTitle: movie.title,
          theaterName: theater.name,
          date: date.replace(/-/g, "/"),
          time,
          seats: selectedSeats.length > 0 ? selectedSeats.sort() : ["J12", "J13"], // Use actual selected seats or fallback
          ticketCount: Number.parseInt(ticketCount),
          totalAmount: `₹${grandTotal}`,
        })

        setEmailSent(result.success)
      } catch (error) {
        console.error("Failed to send confirmation email:", error)
      }
    }

    // Send confirmation SMS if phone is provided
    if (phone) {
      try {
        const { sendBookingSMS } = await import("@/app/actions/sms-actions")
        const result = await sendBookingSMS({
          phone,
          bookingReference: reference,
          movieTitle: movie.title,
          date: date.replace(/-/g, "/"),
          time,
          seats: selectedSeats.length > 0 ? selectedSeats.sort() : ["J12", "J13"],
          totalAmount: `₹${grandTotal}`,
        })

        setSmsSent(result.success)
      } catch (error) {
        console.error("Failed to send confirmation SMS:", error)
      }
    }
  }

  // Use the movie data from URL or fallback to mock data
  const movie = {
    id: movieId || "1",
    title: movieTitle || "Dune: Part Two",
    image: `/placeholder.svg?height=300&width=200&text=${encodeURIComponent(movieTitle || "Dune Part Two")}`,
    rating: "UA",
    duration: "166 min",
  }

  // Calculate ticket price
  const ticketPrice = 999
  const bookingFee = 99
  const ticketTotal = Number.parseInt(ticketCount) * ticketPrice
  const taxAmount = ((ticketTotal + bookingFee + snacksTotal) * 0.18).toFixed(2)
  const grandTotal = ((ticketTotal + bookingFee + snacksTotal) * 1.18).toFixed(2)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Link
              href={`/movies/${movie.id}`}
              className="flex items-center text-primary-foreground/80 hover:text-primary-foreground"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to Movie</span>
            </Link>
            <div className="mx-auto text-center">
              <h1 className="text-xl font-bold">{movie.title}</h1>
              <p className="text-primary-foreground/80">
                {theater.name} • {date.replace(/-/g, "/")} • {time}
              </p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Booking Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-8 border-b pb-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mb-2`}
            >
              1
            </div>
            <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Seats</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mb-2`}
            >
              2
            </div>
            <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Snacks</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mb-2`}
            >
              3
            </div>
            <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Select Seats</h2>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <Select value={ticketCount} onValueChange={setTicketCount}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Tickets" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Ticket</SelectItem>
                        <SelectItem value="2">2 Tickets</SelectItem>
                        <SelectItem value="3">3 Tickets</SelectItem>
                        <SelectItem value="4">4 Tickets</SelectItem>
                        <SelectItem value="5">5 Tickets</SelectItem>
                        <SelectItem value="6">6 Tickets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <SeatSelection ticketCount={Number.parseInt(ticketCount)} onSeatSelect={setSelectedSeats} />

                <Button className="w-full mt-8" size="lg" onClick={() => setStep(2)}>
                  Continue to Snacks
                </Button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Add Snacks & Drinks</h2>

                <SnacksSelection onSnacksChange={setSnacksTotal} />

                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="font-medium mb-4">Contact Information</h3>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address <span className="text-muted-foreground">(for booking confirmation)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Mobile Number <span className="text-muted-foreground">(for SMS confirmation)</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-2 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground">
                        +91
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="9876543210"
                        maxLength={10}
                        pattern="[0-9]{10}"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter 10-digit mobile number without country code
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handleConfirmBooking}>
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Booking Confirmation</h2>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Booking Successful!</h3>
                  <p className="text-green-700 mb-4">Your tickets have been booked successfully.</p>
                  <p className="text-sm text-green-600 mb-2">Booking ID: {bookingReference}</p>
                  {email && (
                    <p className="text-sm text-green-600">
                      {emailSent ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline-block mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Confirmation email sent to {email}
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline-block mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Could not send confirmation email. Please check your booking details.
                        </>
                      )}
                    </p>
                  )}
                  {phone && (
                    <p className="text-sm text-green-600">
                      {smsSent ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline-block mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Confirmation SMS sent to +91 {phone}
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline-block mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Could not send confirmation SMS. Please check your mobile number.
                        </>
                      )}
                    </p>
                  )}
                </div>

                <div className="space-y-6 mb-8">
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Booking Details</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Movie:</div>
                      <div>{movie.title}</div>
                      <div className="text-muted-foreground">Date & Time:</div>
                      <div>
                        {date.replace(/-/g, "/")} • {time}
                      </div>
                      <div className="text-muted-foreground">Theater:</div>
                      <div>
                        {theater.name}, {theater.location}
                      </div>
                      <div className="text-muted-foreground">Seats:</div>
                      <div>{selectedSeats.length > 0 ? selectedSeats.sort().join(", ") : "J12, J13 (Sample)"}</div>
                      <div className="text-muted-foreground">Tickets:</div>
                      <div>{ticketCount}</div>
                      {email && (
                        <>
                          <div className="text-muted-foreground">Email:</div>
                          <div>{email}</div>
                        </>
                      )}
                      {phone && (
                        <>
                          <div className="text-muted-foreground">Phone:</div>
                          <div>+91 {phone}</div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Important Information</h3>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• Please arrive at least 15 minutes before the show time.</li>
                      <li>• Bring your booking ID for verification at the counter.</li>
                      <li>• Outside food and beverages are not allowed in the theater.</li>
                      <li>• Please maintain silence during the movie.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button className="flex-1">Download Tickets</Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

                <div className="flex gap-4 mb-6">
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-20 h-28 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{movie.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {movie.rating} • {movie.duration}
                    </p>
                    <p className="text-sm mt-2">{theater.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {date.replace(/-/g, "/")} • {time}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tickets ({ticketCount})</span>
                    <span>₹{ticketTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking Fee</span>
                    <span>₹{bookingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Snacks & Drinks</span>
                    <span>₹{snacksTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{taxAmount}</span>
                  </div>
                </div>

                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-2 p-3 bg-muted/30 rounded-md">
                  <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Tickets once booked cannot be exchanged or refunded. Please review your booking details before
                    confirming.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
