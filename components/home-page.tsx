"use client"

import { useProducts } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Truck, Headphones, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "LED Strip Lights",
    image: "/led-strip-lights-colorful-room.jpg",
    count: 45,
  },
  {
    name: "Smart Bulbs",
    image: "/smart-bulbs-collection.jpg",
    count: 32,
  },
  {
    name: "Security Cameras",
    image: "/security-cameras-modern.jpg",
    count: 28,
  },
  {
    name: "Smart Speakers",
    image: "/smart-speakers-collection.jpg",
    count: 19,
  },
]

export function HomePage() {
  const { products } = useProducts()

  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30">New Arrivals Available</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Illuminate Your World with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Smart Technology
                </span>
              </h1>
              <p className="text-xl text-blue-100 text-pretty">
                Discover premium LED lights and cutting-edge smart gadgets that transform your space into a modern,
                connected home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-blue-50">
                    <Link href="/store" className="flex items-center gap-2">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                  >
                    <Link href="/categories">View Categories</Link>
                  </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
                <img
                  src="/modern-smart-home-setup-with-led-lights.jpg"
                  alt="Smart Home Setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Energy Efficient",
                description: "Save up to 80% on electricity bills",
              },
              {
                icon: Shield,
                title: "2 Year Warranty",
                description: "Comprehensive warranty coverage",
              },
              {
                icon: Truck,
                title: "Island Wide Delivery",
                description: "Free delivery over LKR 5,000",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Expert technical assistance",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Explore our wide range of LED lights and smart gadgets</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">Discover our most popular LED lights and smart gadgets</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/store">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8 text-lg">Get the latest updates on new products and exclusive offers</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
            <Button className="bg-white text-blue-600 hover:bg-blue-50">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NW</span>
                </div>
                <span className="text-xl font-bold">NextWave Gadgets</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your trusted partner for premium LED lights and smart gadgets in Sri Lanka.
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.8/5 (500+ reviews)</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/led-lights" className="hover:text-foreground">
                    LED Lights
                  </Link>
                </li>
                <li>
                  <Link href="/smart-gadgets" className="hover:text-foreground">
                    Smart Gadgets
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-foreground">
                    All Categories
                  </Link>
                </li>
                <li>
                  <Link href="/new-arrivals" className="hover:text-foreground">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-foreground">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-foreground">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:text-foreground">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 NextWave Gadgets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
