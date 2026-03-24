"use client"

import { Button } from "@/components/ui/button"
import { Product } from "@/lib/products"

interface CategoryFilterProps {
  selectedCategory: Product["category"] | "all"
  onCategoryChange: (category: Product["category"] | "all") => void
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories: { value: Product["category"] | "all"; label: string }[] = [
    { value: "all", label: "All Items" },
    { value: "appetizers", label: "Appetizers" },
    { value: "mains", label: "Main Courses" },
    { value: "desserts", label: "Desserts" },
    { value: "beverages", label: "Beverages" },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Categories</h3>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={
              selectedCategory === category.value ? "default" : "outline"
            }
            className="justify-start"
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
