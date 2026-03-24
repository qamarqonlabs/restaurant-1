"use client"

import { useCart } from "@/lib/cart-context"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const TAX_RATE = 0.1
const DELIVERY_FEE = 4.99

interface CartSummaryProps {
  showActions?: boolean
  onCheckout?: () => void
}

export function CartSummary({
  showActions = false,
  onCheckout,
}: CartSummaryProps) {
  const { state } = useCart()

  const subtotal = state.total
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax + DELIVERY_FEE

  return (
    <Card className="sticky top-24 h-fit">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{subtotal.toFixed(2)} PKR</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span className="font-medium">{tax.toFixed(2)} PKR</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="font-medium">{DELIVERY_FEE.toFixed(2)} PKR</span>
        </div>
        <div className="flex justify-between border-t border-border pt-4">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold text-primary">
            {total.toFixed(2)} PKR
          </span>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={onCheckout} className="w-full" size="lg">
            Continue to Payment
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
