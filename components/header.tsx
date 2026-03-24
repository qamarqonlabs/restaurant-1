"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart, UtensilsCrossed } from "lucide-react"

export function Header() {
  const { state } = useCart()
  const cartItemsCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span>FoodHub</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/menu"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Menu
          </Link>
          <Link href="/checkout" className="relative">
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        <div className="md:hidden">
          <Link href="/checkout" className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
