import Link from "next/link"
import { Film, Laugh, Heart, Skull, Rocket, Award } from "lucide-react"

const categories = [
  {
    id: "action",
    name: "Action",
    icon: <Film className="h-6 w-6" />,
    color: "bg-red-500/10 text-red-500",
  },
  {
    id: "comedy",
    name: "Comedy",
    icon: <Laugh className="h-6 w-6" />,
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    id: "romance",
    name: "Romance",
    icon: <Heart className="h-6 w-6" />,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    id: "horror",
    name: "Horror",
    icon: <Skull className="h-6 w-6" />,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: "sci-fi",
    name: "Sci-Fi",
    icon: <Rocket className="h-6 w-6" />,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "drama",
    name: "Drama",
    icon: <Award className="h-6 w-6" />,
    color: "bg-green-500/10 text-green-500",
  },
]

export default function MovieCategories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          href={`/category/${category.id}`}
          key={category.id}
          className="flex flex-col items-center p-6 rounded-lg bg-card hover:bg-card/80 transition-colors border border-border"
        >
          <div className={`rounded-full p-3 mb-3 ${category.color}`}>{category.icon}</div>
          <span className="font-medium">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
