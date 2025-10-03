'use client'

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Select } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"

type Product = {
  id: string
  name: string
  image: string
  price: number
  category: string
  rating: number
  reviews: number
  inStock: boolean
}

const categories = [
  { label: "All", value: "all" },
  { label: "LED Lights", value: "led" },
  { label: "Smart Gadgets", value: "smart" },
];

const products: Product[] = [
  {
    id: "1",
    name: "RGB LED Strip Lights",
    image: "/rgb-led-strip-lights-colorful.jpg",
    price: 2999,
    category: "led",
    rating: 4.5,
    reviews: 120,
    inStock: true,
  },
  {
    id: "2",
    name: "Smart WiFi Bulb",
    image: "/smart-wifi-bulb-white.jpg",
    price: 1999,
    category: "smart",
    rating: 4.2,
    reviews: 85,
    inStock: true,
  },
  {
    id: "3",
    name: "Security Camera",
    image: "/security-camera-white-modern.jpg",
    price: 8999,
    category: "security",
    rating: 4.7,
    reviews: 60,
    inStock: false,
  },
  {
    id: "4",
    name: "Bluetooth Smart Speaker",
    image: "/bluetooth-smart-speaker-black.jpg",
    price: 4999,
    category: "smart",
    rating: 4.3,
    reviews: 45,
    inStock: true,
  },
  // Add more products as needed
]


export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredProducts: Product[] =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Store</h1>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-3 py-2 bg-background text-foreground"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">No products found.</div>
          )}
        </div>
      </div>
    </>
  )
}