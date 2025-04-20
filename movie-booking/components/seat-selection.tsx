"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Generate a more realistic seating layout
const generateSeats = () => {
  const rows = "JIHGFEDCBA".split("") // Reversed to show front rows at bottom
  const seatsPerRow = 18 // More seats per row for a wider theater

  // Randomly mark some seats as taken
  const takenSeats = new Set()
  for (let i = 0; i < 50; i++) {
    const row = rows[Math.floor(Math.random() * rows.length)]
    const seat = Math.floor(Math.random() * seatsPerRow) + 1
    takenSeats.add(`${row}${seat}`)
  }

  return rows.map((row) => {
    // Make front rows (A-C) have fewer seats for a more realistic curved layout
    let actualSeatsPerRow = seatsPerRow
    let leftPadding = 0

    if (row === "A" || row === "B") {
      actualSeatsPerRow = 10
      leftPadding = 4
    } else if (row === "C" || row === "D") {
      actualSeatsPerRow = 14
      leftPadding = 2
    }

    return {
      rowId: row,
      leftPadding,
      seats: Array.from({ length: actualSeatsPerRow }, (_, i) => {
        const seatNumber = i + 1
        const seatId = `${row}${seatNumber}`
        return {
          id: seatId,
          row,
          number: seatNumber,
          taken: takenSeats.has(seatId),
          // Add a gap in the middle for aisles
          isGap:
            seatNumber === Math.floor(actualSeatsPerRow / 2) || seatNumber === Math.floor(actualSeatsPerRow / 2) + 1,
        }
      }),
    }
  })
}

interface SeatSelectionProps {
  ticketCount: number
  onSeatSelect?: (seats: string[]) => void
}

export default function SeatSelection({ ticketCount, onSeatSelect = () => {} }: SeatSelectionProps) {
  const [seatLayout] = useState(generateSeats())
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const handleSeatClick = (seatId: string, taken: boolean) => {
    if (taken) return

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId)
      } else {
        if (prev.length >= ticketCount) {
          // Remove the first selected seat if we're adding more than the ticket count
          return [...prev.slice(1), seatId]
        }
        return [...prev, seatId]
      }
    })
  }

  // Add this after the handleSeatClick function
  // Notify parent component when selected seats change
  useEffect(() => {
    onSeatSelect(selectedSeats)
  }, [selectedSeats, onSeatSelect])

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Screen */}
      <div className="w-full max-w-4xl mb-10 relative">
        <div className="h-8 bg-gradient-to-b from-primary/30 to-transparent rounded-t-full mx-auto w-[90%]"></div>
        <div className="h-2 bg-primary/80 w-[90%] mx-auto rounded-t-md"></div>
        <div className="absolute -bottom-6 w-full text-center text-sm text-muted-foreground">SCREEN</div>
      </div>

      {/* Seat Layout */}
      <div className="mt-8 overflow-x-auto w-full max-w-4xl pb-4">
        <div className="min-w-[800px]">
          {seatLayout.map((row) => (
            <div key={row.rowId} className="flex items-center mb-2">
              <div className="w-8 text-center font-medium text-muted-foreground">{row.rowId}</div>
              <div className="flex" style={{ marginLeft: `${row.leftPadding * 2}rem` }}>
                {row.seats.map((seat, index) => (
                  <div key={seat.id} className={cn("px-1", seat.isGap ? "mr-6" : "")}>
                    <button
                      className={cn(
                        "h-8 w-8 rounded-t-lg border flex items-center justify-center transition-colors",
                        seat.taken
                          ? "bg-muted-foreground/30 border-muted-foreground/30 cursor-not-allowed"
                          : "border-primary/30",
                        selectedSeats.includes(seat.id) ? "bg-primary text-primary-foreground border-primary" : "",
                      )}
                      onClick={() => handleSeatClick(seat.id, seat.taken)}
                      disabled={seat.taken}
                      aria-label={`Seat ${seat.id}`}
                    >
                      <span className="text-xs font-medium">{seat.number}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-8 text-center font-medium text-muted-foreground">{row.rowId}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-10">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-t-lg border border-primary/30 mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-t-lg bg-primary border-primary mr-2"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-t-lg bg-muted-foreground/30 border-muted-foreground/30 mr-2"></div>
          <span className="text-sm">Taken</span>
        </div>
      </div>

      {/* Selected Seats Info */}
      <div className="mt-8 text-center p-4 bg-muted/30 rounded-md max-w-md">
        <p className="font-medium">
          Selected Seats: {selectedSeats.length > 0 ? selectedSeats.sort().join(", ") : "None"}
        </p>
        <div className="mt-2 flex items-center justify-center">
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${(selectedSeats.length / ticketCount) * 100}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium">
            {selectedSeats.length}/{ticketCount}
          </span>
        </div>
      </div>
    </div>
  )
}
