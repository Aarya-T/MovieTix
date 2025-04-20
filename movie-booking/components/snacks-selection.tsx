"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SnackItem {
  id: number
  name: string
  price: number
  image: string
  description: string
}

const snackItems: SnackItem[] = [
  {
    id: 1,
    name: "Popcorn Combo",
    price: 399,
    image: "🍿",
    description: "Large popcorn with 2 soft drinks",
  },
  {
    id: 2,
    name: "Nachos with Cheese",
    price: 299,
    image: "🧀",
    description: "Crispy nachos with melted cheese",
  },
  {
    id: 3,
    name: "Soft Drink (Large)",
    price: 199,
    image: "🥤",
    description: "Your choice of Coke, Sprite, or Fanta",
  },
  {
    id: 4,
    name: "Candy Box",
    price: 149,
    image: "🍬",
    description: "Assorted candies and chocolates",
  },
  {
    id: 5,
    name: "Samosa (2 pcs)",
    price: 129,
    image: "🔺",
    description: "Crispy samosas with mint chutney",
  },
  {
    id: 6,
    name: "French Fries",
    price: 179,
    image: "🍟",
    description: "Crispy golden fries with seasoning",
  },
]

interface SnacksSelectionProps {
  onSnacksChange: (total: number) => void
}

export default function SnacksSelection({ onSnacksChange }: SnacksSelectionProps) {
  const [snacks, setSnacks] = useState<Record<number, number>>({})

  const updateSnackCount = (id: number, change: number) => {
    setSnacks((prev) => {
      const currentCount = prev[id] || 0
      const newCount = Math.max(0, currentCount + change)

      const updatedSnacks = {
        ...prev,
        [id]: newCount,
      }

      // Calculate total and notify parent
      const total = Object.entries(updatedSnacks).reduce((sum, [id, count]) => {
        const snack = snackItems.find((s) => s.id === Number(id))
        return sum + (snack?.price || 0) * count
      }, 0)

      onSnacksChange(total)

      return updatedSnacks
    })
  }

  return (
    <div className="space-y-4">
      {snackItems.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-4xl mr-4">{item.image}</div>
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                <p className="font-medium mt-1">₹{item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateSnackCount(item.id, -1)}
                disabled={!snacks[item.id]}
              >
                -
              </Button>
              <span className="w-8 text-center">{snacks[item.id] || 0}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateSnackCount(item.id, 1)}>
                +
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {Object.values(snacks).some((count) => count > 0) && (
        <div className="bg-muted/30 p-4 rounded-md mt-6">
          <h4 className="font-medium mb-2">Selected Items:</h4>
          <ul className="space-y-1">
            {Object.entries(snacks).map(([id, count]) => {
              if (count === 0) return null
              const snack = snackItems.find((s) => s.id === Number(id))
              return (
                <li key={id} className="flex justify-between text-sm">
                  <span>
                    {snack?.name} × {count}
                  </span>
                  <span>₹{(snack?.price || 0) * count}</span>
                </li>
              )
            })}
          </ul>
          <div className="border-t border-border mt-2 pt-2 flex justify-between font-medium">
            <span>Subtotal:</span>
            <span>
              ₹
              {Object.entries(snacks).reduce((sum, [id, count]) => {
                const snack = snackItems.find((s) => s.id === Number(id))
                return sum + (snack?.price || 0) * count
              }, 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
