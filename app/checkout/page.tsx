"use client"
import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle } from "lucide-react"

const TAX_RATE = 0.1
const DELIVERY_FEE = 4.99

export default function CheckoutPage() {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart()
  const [items, setItems] = useState<typeof state.items>(state.items)
  const [deliveryMethod, setDeliveryMethod] = useState("delivery")
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
  })

  const subtotal = state.total
  const tax = subtotal * TAX_RATE
  const deliveryFee = deliveryMethod === "delivery" ? DELIVERY_FEE : 0
  const total = subtotal + tax + deliveryFee

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      deliveryMethod === "delivery" &&
      (!formData.address || !formData.city || !formData.zipCode)
    ) {
      alert("Please fill in all required fields")
      return
    }
    if (!formData.firstName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields")
      return
    }
    setOrderPlaced(true)
    setItems(state.items)
    clearCart()
  }

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <div className="py-16 text-center">
              <h1 className="mb-4 text-4xl font-bold">Your cart is empty</h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Add some delicious items from our menu
              </p>
              <Link href="/menu">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (orderPlaced) {
    const WANumber = "923707475981"
    const qrCodeUrl = "https://api.whatsapp.com/send?phone=" + WANumber
    const text =
      deliveryMethod === "delivery"
        ? `
*📦  Order Placed*
____________________________________________
*⏳  Status*: Panding
*🕒  Order Time*: ${new Date().toString()}
____________________________________________
*👤  Name*: ${formData.firstName} ${formData.lastName}
*📧  Email*: ${formData.email}
*📞  Phone*: ${formData.phone}
*📍  Address*: ${formData.address}
*🏙️  City*: ${formData.city}
*📮  Zip Code*: ${formData.zipCode}
*💰  Total Amount*: ${total.toFixed(2)} PKR
____________________________________________
*🛍️  Order Items*
${items.map((item) => `> *${item.name}*: ${item.quantity} x ${item.price.toFixed(2)} PKR = ${(item.quantity * item.price).toFixed(2)} PKR`).join("\n")}`
        : `
*📦  Order Placed*
____________________________________________
*⏳  Status*: Panding
*🕒  Order Time*: ${new Date().toString()}
____________________________________________
*👤  Name*: ${formData.firstName} ${formData.lastName}
*📧  Email*: ${formData.email}
*📞  Phone*: ${formData.phone}
*💰  Total Amount*: ${(subtotal + tax + deliveryFee).toFixed(2)} PKR
*🛍️  Order Items*
${items.map((item) => `> *${item.name}*: ${item.quantity} x ${item.price.toFixed(2)} PKR = ${(item.quantity * item.price).toFixed(2)} PKR`).join("\n")}`
    const furl = `${qrCodeUrl}&text=${encodeURIComponent(text)}`
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center py-16">
          <div className="max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <Link href={furl}>
                <QRCodeSVG
                  value={furl}
                  size={500}
                  className="rounded-lg bg-white p-4 shadow-lg"
                />
              </Link>
            </div>
            <h1 className="mb-4 text-4xl font-bold">Scan/Click the QR</h1>
            <div className="mb-8 rounded-lg bg-muted/30 p-6 text-left">
              <p className="mb-2 font-semibold">Order Details:</p>
              <p className="text-sm text-muted-foreground">
                Total Amount:{" "}
                <span className="font-bold text-primary">
                  {total.toFixed(2)} PKR
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Delivery Address: {formData.address}, {formData.city}
              </p>
            </div>
            <Link href="/menu">
              <Button size="lg" className="w-full">
                Order More Food
              </Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

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
          <h1 className="mb-8 text-4xl font-bold">Your Order</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Cart Items and Form */}
            <div className="space-y-8 lg:col-span-2">
              {/* Cart Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Items in Cart</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="mb-2 text-sm text-muted-foreground">
                          {item.price.toFixed(2)} PKR each
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded border border-border">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="h-8 w-8 rounded-none p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-2 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="h-8 w-8 rounded-none p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold">
                              {(item.price * item.quantity).toFixed(2)} PKR
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={deliveryMethod}
                    onValueChange={setDeliveryMethod}
                  >
                    <div className="flex cursor-pointer items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label
                        htmlFor="delivery"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-semibold">Home Delivery</div>
                        <div className="text-sm text-muted-foreground">
                          Delivery fee: ${DELIVERY_FEE.toFixed(2)} (30-45
                          minutes)
                        </div>
                      </Label>
                    </div>
                    <div className="flex cursor-pointer items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Pickup</div>
                        <div className="text-sm text-muted-foreground">
                          Pick up your order (15-20 minutes)
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery & Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {deliveryMethod === "delivery" && (
                      <>
                        <div>
                          <Label htmlFor="address">Address *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="123 Main Street"
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="New York"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              placeholder="10001"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </form>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value: string) =>
                      handleSelectChange("paymentMethod", value)
                    }
                  >
                    <div className="flex cursor-pointer items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <Label
                        htmlFor="card"
                        className="flex-1 cursor-pointer font-semibold"
                      >
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex cursor-pointer items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label
                        htmlFor="cash"
                        className="flex-1 cursor-pointer font-semibold"
                      >
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 h-fit">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {subtotal.toFixed(2)} PKR
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">{tax.toFixed(2)} PKR</span>
                  </div>
                  {deliveryMethod === "delivery" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery Fee
                      </span>
                      <span className="font-medium">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </CardContent>

                <div className="px-6 pb-6">
                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full"
                    size="lg"
                    disabled={state.items.length === 0}
                  >
                    Place Order
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
