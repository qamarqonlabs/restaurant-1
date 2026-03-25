"use client"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Clock, MapPin, Phone, Star } from "lucide-react"
import BlurText from "@/components/blur-text"
import { useState, useEffect } from "react"
import Loading from "./loading"
import { motion } from "motion/react"
import CurvedLoop from "@/components/CurvedLoop"
import ScrollVelocity from "@/components/ScrollVelocity"
const MCard = motion.create(Card)
import { useSyncExternalStore } from "react"

// This returns 'false' on the server and 'true' on the client
const isClient = () => true
const isServer = () => false
const subscribe = () => () => {} // No-op

export default function Home() {
  const hydrated = useSyncExternalStore(subscribe, isClient, isServer)

  if (!hydrated) return <Loading />
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=600&fit=crop"
              alt="Restaurant Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center text-white">
            <BlurText
              animateBy="letters"
              text="Welcome to shop"
              className="mb-4 flex justify-center text-center text-5xl font-bold text-balance md:text-6xl"
            ></BlurText>
            <BlurText
              animateBy="letters"
              text="You will own"
              className="mb-4 flex justify-center text-center text-5xl font-bold text-balance md:text-6xl"
            ></BlurText>
            <p className="mb-8 text-xl text-balance opacity-90 md:text-2xl">
              Discover delicious dishes delivered fresh to your door
            </p>
            <Link href="/menu">
              <Button size="lg" className="text-base">
                Browse Our Menu
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Dishes Section */}
        <section className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <BlurText
                className="mb-4 justify-center text-4xl font-bold text-balance"
                text="Featured Dishes"
              ></BlurText>
              <BlurText
                className="text-secondary-background mb-4 justify-center text-xl font-light text-neutral-400"
                text="Try our chef's most popular creations"
              ></BlurText>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  name: "Grilled Salmon Fillet",
                  image:
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
                  rating: 4.8,
                },
                {
                  name: "Chocolate Lava Cake",
                  image:
                    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
                  rating: 4.9,
                },
                {
                  name: "Pasta Carbonara",
                  image:
                    "https://images.unsplash.com/photo-1574969903809-3f7a1668ceb0?w=500&h=500&fit=crop",
                  rating: 4.7,
                },
              ].map((dish, index) => (
                <MCard
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 80,
                    damping: 5,
                  }}
                  key={dish.name}
                  className="overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="mb-2 text-lg font-semibold">{dish.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{dish.rating}</span>
                    </div>
                  </CardContent>
                </MCard>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-secondary/30 px-4 py-16 md:px-6">
          <BlurText
            className="mb-4 justify-center text-4xl font-bold text-balance"
            text="Why Choose FoodHub"
          ></BlurText>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: <ChefHat className="mb-2 h-8 w-8 text-primary" />,
                icon: "Chef Crafted",
                description:
                  "Every dish is prepared by our experienced chefs using the",
              },
              {
                title: <Clock className="mb-2 h-8 w-8 text-primary" />,
                icon: "Fast Delivery",
                description:
                  "Get your order delivered hot and fresh within 30-45 minutes",
              },
              {
                title: <Star className="mb-2 h-8 w-8 text-primary" />,
                icon: "Top Rated",
                description:
                  "Loved by thousands of customers with over 4.6 average rating",
              },
            ].map((item, index) => {
              return (
                <MCard
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 80,
                    damping: 5,
                  }}
                  key={index}
                >
                  <CardHeader>
                    {item.title}
                    <CardTitle>{item.icon}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </MCard>
              )
            })}
          </div>
        </section>

        {/* Restaurant Info Section */}
        <section className="px-4 py-16 md:px-6">
          <BlurText
            className="mb-4 justify-center text-4xl font-bold text-balance"
            text="Find Us"
          ></BlurText>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <MapPin className="mb-2 h-6 w-6 text-primary" />,
                title: "Location",
                description: (
                  <p className="text-muted-foreground">
                    123 Main Street
                    <br />
                    Downtown District
                    <br />
                    City, State 12345
                  </p>
                ),
              },

              {
                icon: <Clock className="mb-2 h-6 w-6 text-primary" />,
                title: "Hours",
                description: (
                  <p className="text-muted-foreground">
                    Monday - Thursday: 11am - 10pm
                    <br />
                    Friday - Saturday: 11am - 11pm
                    <br />
                    Sunday: 12pm - 9pm
                  </p>
                ),
              },

              {
                icon: <Phone className="mb-2 h-6 w-6 text-primary" />,
                title: "Contact",
                description: (
                  <p className="text-muted-foreground">
                    Phone: (555) 123-4567
                    <br />
                    Email: hello@foodhub.com
                    <br />
                    <Link href={"/order"} className="">
                      Order now
                    </Link>
                  </p>
                ),
              },
            ].map((item, index) => {
              return (
                <MCard
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 80,
                    damping: 5,
                  }}
                  key={item.title}
                >
                  <CardHeader>
                    {item.icon}
                    <CardTitle>{item.title}</CardTitle>
                    <CardContent className="mx-0 px-0 pt-4">
                      {item.description}
                    </CardContent>
                  </CardHeader>
                </MCard>
              )
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-secondary/30 px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <CurvedLoop
              marqueeText="What Our Customers Say * "
              curveAmount={120}
            ></CurvedLoop>
            <BlurText
              className="mb-4 justify-center text-4xl font-bold text-balance"
              text=""
            ></BlurText>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  comment:
                    "The food quality is exceptional and delivery is always on time!",
                  rating: 5,
                },
                {
                  name: "Sarah Johnson",
                  comment:
                    "The food quality is exceptional and delivery is always on time!",
                  rating: 5,
                },
                {
                  name: "Sarah Johnson",
                  comment:
                    "The food quality is exceptional and delivery is always on time!",
                  rating: 5,
                },
                {
                  name: "Sarah Johnson",
                  comment:
                    "The food quality is exceptional and delivery is always on time!",
                  rating: 5,
                },
                {
                  name: "Mike Chen",
                  comment:
                    "Best restaurant in town. The flavors are incredible!",
                  rating: 5,
                },
                {
                  name: "Emily Davis",
                  comment:
                    "Great variety and amazing customer service. Highly recommend!",
                  rating: 4.5,
                },
              ].map((testimonial, index) => (
                <MCard
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 80,
                    damping: 5,
                  }}
                  key={testimonial.name + index}
                >
                  <CardContent className="pt-6">
                    <div className="mb-3 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(testimonial.rating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mb-3 text-muted-foreground italic">
                      &quot;{testimonial.comment}&quot;
                    </p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </MCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <ScrollVelocity
              className="min-w-full"
              texts={["Ready To Order? ", "What are you waiting for? "]}
            ></ScrollVelocity>
            <p className="mb-8 text-xl text-muted-foreground">
              Browse our full menu and place your order now
            </p>
            <Link href="/menu">
              <Button size="lg" className="text-base">
                View Full Menu
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>&copy; 2024 FoodHub. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
