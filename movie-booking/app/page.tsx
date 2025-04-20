import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeaturedMovies from "@/components/featured-movies"
import ComingSoon from "@/components/coming-soon"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Featured movie"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Oppenheimer</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8">
            The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/booking/1?time=7:30 PM&date=2024-03-20&movieId=1&movieTitle=Oppenheimer">Book Tickets</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Trailer
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Movies</h2>
            <Link href="/movies" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <FeaturedMovies />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <Link href="/coming-soon" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <ComingSoon />
        </div>
      </section>
    </div>
  )
}
