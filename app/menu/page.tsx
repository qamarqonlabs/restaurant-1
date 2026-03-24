"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { CartSummary } from "@/components/cart-summary"
import { products, Product } from "@/lib/products"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    Product["category"] | "all"
  >("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "all" || product.category === selectedCategory
      const searchMatch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && searchMatch
    })
  }, [selectedCategory, searchQuery])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Our Menu</h1>
            <p className="text-lg text-muted-foreground">
              Explore our delicious selection of dishes
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Main Content - Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-muted-foreground">
                    No dishes found matching your search.
                  </p>
                </div>
              ) : (
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cart Summary on Desktop */}
          <div className="fixed top-24 right-6 hidden w-80 lg:block">
            <CartSummary />
          </div>

          {/* Cart Summary on Mobile */}
          <div className="mt-8 lg:hidden">
            <CartSummary />
          </div>
        </div>
      </main>
    </>
  )
}
