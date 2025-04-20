import Link from "next/link"
import { Star, Clock, Calendar, Film, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieShowtimes from "@/components/movie-showtimes"

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch movie data based on the ID
  const movie = {
    id: params.id,
    title: "Dune: Part Two",
    image: "/placeholder.svg?height=600&width=400&text=Dune%20Part%20Two",
    backdrop: "/placeholder.svg?height=1080&width=1920&text=Dune%20Part%20Two%20Backdrop",
    rating: 4.8,
    releaseDate: "March 1, 2024",
    duration: "166 min",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Movie Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 z-10" />
        <img
          src={movie.backdrop || "/placeholder.svg"}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="hidden md:block rounded-lg overflow-hidden w-64 flex-shrink-0 shadow-lg">
              <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="font-normal">
                    {genre}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{movie.rating}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link
                    href={`/booking/1?time=7:30 PM&date=2024-03-20&movieId=${movie.id}&movieTitle=${encodeURIComponent(movie.title)}`}
                  >
                    Book Tickets
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Film className="mr-2 h-4 w-4" /> Watch Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="showtimes">Showtimes</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
                    <p className="text-muted-foreground">{movie.description}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Cast & Crew</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {movie.cast.map((actor) => (
                        <div key={actor} className="text-center">
                          <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-2 bg-muted">
                            <img
                              src={`/placeholder.svg?height=96&width=96&text=${actor.split(" ")[0]}`}
                              alt={actor}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="font-medium">{actor}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Director:</span> {movie.director}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="showtimes">
                  <MovieShowtimes />
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">User Reviews</h3>
                      <Button variant="outline" size="sm">
                        Write a Review
                      </Button>
                    </div>

                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-border pb-6 last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-muted w-10 h-10 flex items-center justify-center">
                              <span className="font-medium">U{review}</span>
                            </div>
                            <div>
                              <p className="font-medium">User {review}</p>
                              <div className="flex">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < 5 - (review % 2) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-muted-foreground">
                          This is a fantastic movie with amazing visuals and storytelling. The characters are well
                          developed and the plot keeps you engaged throughout.
                        </p>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold mb-4">Recommended</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((movie) => (
                    <Link href={`/movies/${movie}`} key={movie} className="flex gap-4 group">
                      <div className="rounded overflow-hidden w-20 h-28 flex-shrink-0 bg-muted">
                        <img
                          src={`/placeholder.svg?height=112&width=80&text=Movie%20${movie}`}
                          alt={`Movie ${movie}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          Similar Movie {movie}
                        </h4>
                        <div className="flex items-center gap-1 my-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{4.5 - movie * 0.1}/5</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Action, Adventure</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground self-center" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
