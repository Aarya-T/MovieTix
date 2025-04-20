import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    image: "/placeholder.svg?height=450&width=300&text=Dune",
    rating: 4.8,
    genres: ["Sci-Fi", "Adventure"],
    duration: "166 min",
  },
  {
    id: 2,
    title: "The Batman",
    image: "/placeholder.svg?height=450&width=300&text=Batman",
    rating: 4.7,
    genres: ["Action", "Crime"],
    duration: "176 min",
  },
  {
    id: 3,
    title: "Everything Everywhere All at Once",
    image: "/placeholder.svg?height=450&width=300&text=Everything",
    rating: 4.9,
    genres: ["Sci-Fi", "Comedy"],
    duration: "139 min",
  },
  {
    id: 4,
    title: "Top Gun: Maverick",
    image: "/placeholder.svg?height=450&width=300&text=Top%20Gun",
    rating: 4.8,
    genres: ["Action", "Drama"],
    duration: "130 min",
  },
]

export default function FeaturedMovies() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredMovies.map((movie) => (
        <div key={movie.id} className="group">
          <div className="rounded-lg overflow-hidden bg-muted relative mb-3 aspect-[2/3]">
            <img
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button asChild>
                <Link
                  href={`/booking/1?time=7:30 PM&date=2024-03-20&movieId=${movie.id}&movieTitle=${encodeURIComponent(movie.title)}`}
                >
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <Link href={`/movies/${movie.id}`} className="block">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{movie.title}</h3>
            </Link>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{movie.rating}</span>
              <span className="text-muted-foreground text-sm mx-2">•</span>
              <span className="text-sm text-muted-foreground">{movie.duration}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="font-normal">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
