"use server"

import twilio from "twilio"

export async function sendBookingSMS({
  phone,
  bookingReference,
  movieTitle,
  date,
  time,
  seats,
  totalAmount,
}: {
  phone: string
  bookingReference: string
  movieTitle: string
  date: string
  time: string
  seats: string[]
  totalAmount: string
}) {
  try {
    // For development/testing, log the SMS instead of sending it
    if (process.env.NODE_ENV === "development") {
      console.log(`
        To: +91${phone}
        SMS: MovieTix Booking Confirmation}
        Your booking for ${movieTitle} is confirmed!
        Date & Time: ${date} at ${time}
        Seats: ${seats.join(", ")}`)

      return { success: true, message: "SMS would be sent in production" }
    }

    // Initialize Twilio client with environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !twilioNumber) {
      throw new Error("Missing Twilio credentials")
    }
    console.log({
  accountSid,
  authToken: authToken ? "defined" : "undefined",
  twilioNumber,
})

    const client = twilio(accountSid, authToken)

    // Send SMS
    await client.messages.create({
      body: `MovieTix Booking Confirmation
Your booking for ${movieTitle} is confirmed!
Date & Time: ${date} at ${time}
Seats: ${seats.join(", ")}`,
      from: twilioNumber,
      to: `+91${phone}`, // Adding India country code
    })

    return { success: true, message: "SMS sent successfully" }
  } catch (error) {
    console.error("Error sending SMS:", error)
    return { success: false, message: "Failed to send SMS" }
  }
}
