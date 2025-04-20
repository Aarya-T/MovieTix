import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"

const upcomingMovies = [
  {
    id: 1,
    title: "Gladiator II",
    image: "/placeholder.svg?height=450&width=300&text=Gladiator%20II",
    releaseDate: "November 22, 2024",
    description: "The sequel to the Academy Award-winning film follows a new hero in ancient Rome.",
  },
  {
    id: 2,
    title: "Furiosa: A Mad Max Saga",
    image: "/placeholder.svg?height=450&width=300&text=Furiosa",
    releaseDate: "May 24, 2024",
    description: "The origin story of the renegade warrior from Mad Max: Fury Road.",
  },
  {
    id: 3,
    title: "Mission: Impossible 8",
    image: "/placeholder.svg?height=450&width=300&text=Mission%20Impossible",
    releaseDate: "May 23, 2025",
    description: "Ethan Hunt returns for another impossible mission in this action-packed sequel.",
  },
]

export default function ComingSoon() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {upcomingMovies.map((movie) => (
        <div key={movie.id} className="flex flex-col">
          <div className="rounded-lg overflow-hidden bg-muted relative mb-4 aspect-[2/3]">
            <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center text-white gap-2">
                <CalendarDays className="h-4 w-4" />
                <span className="text-sm">{movie.releaseDate}</span>
              </div>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{movie.description}</p>
          <Button variant="outline" className="w-full">
            Get Notified
          </Button>
        </div>
      ))}
    </div>
  )
}
