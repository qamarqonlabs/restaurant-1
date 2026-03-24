"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart-context"
import { getProductById, products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Minus, Plus, ArrowLeft, ShoppingCart } from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const productId = params.id as string
  const product = getProductById(productId)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
            <Link href="/menu">
              <Button>Back to Menu</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
    setQuantity(1)
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Menu
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          {/* Product Details */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Product Image */}
            <div className="flex items-center justify-center overflow-hidden rounded-lg bg-muted">
              <div className="relative h-96 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <p className="mb-2 text-sm font-medium text-primary capitalize">
                {product.category.replace("_", " ")}
              </p>
              <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>

              {/* Rating */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="mb-6 text-lg text-muted-foreground">
                {product.description}
              </p>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold">Ingredients:</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient) => (
                    <li
                      key={ingredient}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6 flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center rounded-lg border border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-12 px-4 py-2 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="mb-4 gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              <Button variant="outline" size="lg" onClick={() => router.back()}>
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-8 text-3xl font-bold">You might also like</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Reviews Section */}
          <section className="border-t border-border pt-16">
            <h2 className="mb-8 text-3xl font-bold">Reviews</h2>
            <div className="grid gap-6">
              {[
                {
                  name: "John Doe",
                  rating: 5,
                  comment: "Absolutely delicious! Highly recommend.",
                  date: "2 weeks ago",
                },
                {
                  name: "Jane Smith",
                  rating: 4,
                  comment: "Great taste and good portion size.",
                  date: "1 month ago",
                },
                {
                  name: "Mike Johnson",
                  rating: 5,
                  comment: "Best dish I have ever had! Will order again.",
                  date: "2 months ago",
                },
              ].map((review, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-semibold">{review.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <div className="mb-2 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
