"use server"

import nodemailer from "nodemailer"

// Configure email transporter
// For production, you would use your actual SMTP credentials
// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
  },
})

export async function sendBookingConfirmation({
  email,
  bookingReference,
  movieTitle,
  theaterName,
  date,
  time,
  seats,
  ticketCount,
  totalAmount,
}: {
  email: string
  bookingReference: string
  movieTitle: string
  theaterName: string
  date: string
  time: string
  seats: string[]
  ticketCount: number
  totalAmount: string
}) {
  try {
    // For development/testing, log the email instead of sending it
    if (process.env.NODE_ENV === "development") {
      console.log(`
        To: ${email}
        Subject: Your MovieTix Booking Confirmation - ${bookingReference}
        
        Dear Customer,
        
        Thank you for booking with MovieTix! Your booking has been confirmed.
        
        Booking Details:
        - Booking Reference: ${bookingReference}
        - Movie: ${movieTitle}
        - Theater: ${theaterName}
        - Date & Time: ${date} at ${time}
        - Seats: ${seats.join(", ")}
        - Number of Tickets: ${ticketCount}
        - Total Amount: ${totalAmount}
        
        Please arrive at least 15 minutes before the show time.
        Present your booking reference at the counter to collect your tickets.
        
        We hope you enjoy the movie!
        
        Best regards,
        The MovieTix Team
      `)

      return { success: true, message: "Email would be sent in production" }
    }

    // Send actual email in production
    await transport.sendMail({
      from: process.env.EMAIL_FROM || "bookings@movietix.com",
      to: email,
      subject: `Your MovieTix Booking Confirmation - ${bookingReference}`,
      text: `
        Dear Customer,
        
        Thank you for booking with MovieTix! Your booking has been confirmed.
        
        Booking Details:
        - Booking Reference: ${bookingReference}
        - Movie: ${movieTitle}
        - Theater: ${theaterName}
        - Date & Time: ${date} at ${time}
        - Seats: ${seats.join(", ")}
        - Number of Tickets: ${ticketCount}
        - Total Amount: ${totalAmount}
        
        Please arrive at least 15 minutes before the show time.
        Present your booking reference at the counter to collect your tickets.
        
        We hope you enjoy the movie!
        
        Best regards,
        The MovieTix Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e50914; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">MovieTix Booking Confirmation</h1>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
            <p>Dear Customer,</p>
            
            <p>Thank you for booking with MovieTix! Your booking has been confirmed.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #333;">Booking Details</h2>
              <p><strong>Booking Reference:</strong> ${bookingReference}</p>
              <p><strong>Movie:</strong> ${movieTitle}</p>
              <p><strong>Theater:</strong> ${theaterName}</p>
              <p><strong>Date & Time:</strong> ${date} at ${time}</p>
              <p><strong>Seats:</strong> ${seats.join(", ")}</p>
              <p><strong>Number of Tickets:</strong> ${ticketCount}</p>
              <p><strong>Total Amount:</strong> ${totalAmount}</p>
            </div>
            
            <p>Please arrive at least 15 minutes before the show time.</p>
            <p>Present your booking reference at the counter to collect your tickets.</p>
            
            <p>We hope you enjoy the movie!</p>
            
            <p>Best regards,<br>The MovieTix Team</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>&copy; ${new Date().getFullYear()} MovieTix. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}
