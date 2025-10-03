"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  stockQuantity: number
  rating: number
  reviews: number
  isNew?: boolean
  isSale?: boolean
  features: string[]
  specifications: Record<string, string>
  createdAt: string
  updatedAt: string
}

interface ProductContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
  searchProducts: (query: string) => Product[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

// Initial mock products
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Smart LED Strip Lights RGB 5M",
    description:
      "Premium RGB LED strip lights with WiFi control, 16 million colors, and music sync. Perfect for ambient lighting in bedrooms, living rooms, and gaming setups.",
    price: 4500,
    originalPrice: 6000,
    image: "/rgb-led-strip-lights-colorful.jpg",
    category: "LED Lights",
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isSale: true,
    features: ["16 Million Colors", "WiFi Control", "Music Sync", "Voice Control", "Timer Function"],
    specifications: {
      Length: "5 Meters",
      Power: "24W",
      Voltage: "12V DC",
      "LED Count": "300 LEDs",
      Waterproof: "IP65",
    },
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Smart WiFi Bulb E27 9W",
    description:
      "Energy-efficient smart bulb with adjustable brightness and color temperature. Control via smartphone app or voice commands.",
    price: 2200,
    image: "/smart-wifi-bulb-white.jpg",
    category: "LED Lights",
    inStock: true,
    stockQuantity: 50,
    rating: 4.6,
    reviews: 89,
    features: ["Dimmable", "Color Temperature Control", "WiFi Control", "Voice Control", "Energy Efficient"],
    specifications: {
      Power: "9W",
      Voltage: "220-240V AC",
      Base: "E27",
      Brightness: "800 Lumens",
      Lifespan: "25,000 Hours",
    },
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Bluetooth Smart Speaker",
    description:
      "High-quality Bluetooth speaker with rich bass and crystal-clear sound. Features built-in microphone for hands-free calls.",
    price: 8500,
    originalPrice: 12000,
    image: "/bluetooth-smart-speaker-black.jpg",
    category: "Smart Gadgets",
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviews: 156,
    isSale: true,
    features: ["Bluetooth 5.0", "12-Hour Battery", "Waterproof", "Built-in Microphone", "Voice Assistant"],
    specifications: {
      Bluetooth: "5.0",
      Battery: "2000mAh",
      Playtime: "12 Hours",
      Range: "10 Meters",
      Waterproof: "IPX7",
    },
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Smart Home Security Camera",
    description:
      "1080P HD security camera with night vision, motion detection, and two-way audio. Monitor your home from anywhere.",
    price: 15000,
    image: "/security-camera-white-modern.jpg",
    category: "Smart Gadgets",
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviews: 203,
    isNew: true,
    features: ["1080P HD", "Night Vision", "Motion Detection", "Two-Way Audio", "Cloud Storage"],
    specifications: {
      Resolution: "1080P",
      "Field of View": "110°",
      "Night Vision": "Up to 10m",
      Storage: "Cloud + SD Card",
      Connectivity: "WiFi 2.4GHz",
    },
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "LED Panel Light 36W",
    description:
      "Ultra-slim LED panel light with uniform light distribution. Perfect for offices, kitchens, and commercial spaces.",
    price: 3200,
    image: "/led-panel-light-square-white.jpg",
    category: "LED Lights",
    inStock: false,
    stockQuantity: 0,
    rating: 4.5,
    reviews: 67,
    features: ["Ultra Slim", "Uniform Light", "Energy Efficient", "Long Lifespan", "Easy Installation"],
    specifications: {
      Power: "36W",
      Voltage: "220-240V AC",
      Size: "600x600mm",
      Brightness: "3600 Lumens",
      "Color Temperature": "6500K",
    },
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Smart Doorbell with Camera",
    description:
      "Smart video doorbell with HD camera, motion detection, and smartphone notifications. See who's at your door from anywhere.",
    price: 18500,
    originalPrice: 22000,
    image: "/smart-doorbell-camera-black.jpg",
    category: "Smart Gadgets",
    inStock: true,
    stockQuantity: 12,
    rating: 4.8,
    reviews: 91,
    isSale: true,
    features: ["HD Video", "Motion Detection", "Two-Way Audio", "Night Vision", "Smartphone Alerts"],
    specifications: {
      Resolution: "1080P",
      "Field of View": "160°",
      Battery: "Rechargeable",
      Storage: "Cloud Storage",
      Installation: "Wireless",
    },
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
]

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Load products from localStorage or use initial products
    const savedProducts = localStorage.getItem("nextwave_products")
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (error) {
        setProducts(initialProducts)
      }
    } else {
      setProducts(initialProducts)
    }
  }, [])

  useEffect(() => {
    // Save products to localStorage whenever products change
    if (products.length > 0) {
      localStorage.setItem("nextwave_products", JSON.stringify(products))
    }
  }, [products])

  const addProduct = (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const newProduct: Product = {
      ...productData,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates, updatedAt: new Date().toISOString() } : product,
      ),
    )
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const getProduct = (id: string) => {
    return products.find((product) => product.id === id)
  }

  const getProductsByCategory = (category: string) => {
    return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.features.some((feature) => feature.toLowerCase().includes(lowercaseQuery)),
    )
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getProductsByCategory,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
