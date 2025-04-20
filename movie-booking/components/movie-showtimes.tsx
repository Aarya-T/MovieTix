"use client"

import { useState } from "react"
import { format, addDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock } from "lucide-react"
import Link from "next/link"

// Mock data for theaters and showtimes
const theaters = [
  {
    id: 1,
    name: "AMC Cinema",
    location: "Downtown",
    distance: "2.5 miles away",
    showtimes: ["10:30 AM", "1:15 PM", "4:00 PM", "7:30 PM", "10:15 PM"],
  },
  {
    id: 2,
    name: "Regal Cinemas",
    location: "Westside Mall",
    distance: "4.1 miles away",
    showtimes: ["11:00 AM", "2:30 PM", "5:45 PM", "8:30 PM"],
  },
  {
    id: 3,
    name: "Cinemark",
    location: "Eastside Plaza",
    distance: "3.7 miles away",
    showtimes: ["12:15 PM", "3:30 PM", "6:45 PM", "9:30 PM"],
  },
]

export default function MovieShowtimes() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"))

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i)
    return {
      value: format(date, "yyyy-MM-dd"),
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : format(date, "EEE, MMM d"),
    }
  })

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Select Date</h3>
        <div className="flex overflow-x-auto pb-2 gap-2">
          {dates.map((date) => (
            <Button
              key={date.value}
              variant={selectedDate === date.value ? "default" : "outline"}
              onClick={() => setSelectedDate(date.value)}
              className="flex-shrink-0"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date.label}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="standard" className="mb-6">
        <TabsList>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="imax">IMAX</TabsTrigger>
          <TabsTrigger value="3d">3D</TabsTrigger>
          <TabsTrigger value="vip">VIP</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6">
        {theaters.map((theater) => (
          <Card key={theater.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold">{theater.name}</h4>
                  <p className="text-muted-foreground">
                    {theater.location} • {theater.distance}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                  View Theater
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                {theater.showtimes.map((time, index) => (
                  <Button key={index} variant="outline" className="flex-1 md:flex-none min-w-[100px]" asChild>
                    <Link
                      href={`/booking/${theater.id}?time=${time}&date=${selectedDate}&movieId=1&movieTitle=Dune:%20Part%20Two`}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
