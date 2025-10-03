"use client"

import { useEffect, useState } from "react"
// useRouter already imported above
import { useAuth } from "@/lib/auth"
import { useProducts } from "@/lib/products"
import { useRouter } from "next/navigation"
import { ProductManagement } from "@/components/admin/product-management"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, TrendingUp, AlertTriangle } from "lucide-react"
export default function AdminDashboard() {
  const { user, loading, logout } = useAuth()
  const { products } = useProducts()
  const router = useRouter()
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/admin")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.inStock).length
  const outOfStockProducts = products.filter((p) => !p.inStock).length
  const lowStockProducts = products.filter((p) => p.inStock && p.stockQuantity <= 5).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-all"
            onClick={() => router.back()}
          >
            ← Back
          </button>
          {/* Admin Profile Icon & Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-all"
              onClick={() => setShowProfile((prev: boolean) => !prev)}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
              </svg>
              <span className="font-semibold">{user.name}</span>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 p-4 text-black">
                <div className="mb-2 font-bold text-lg">Admin Profile</div>
                <div className="mb-1"><span className="font-semibold">Name:</span> {user.name}</div>
                <div className="mb-1"><span className="font-semibold">Email:</span> {user.email}</div>
                <div className="mb-4"><span className="font-semibold">Role:</span> {user.role}</div>
                <button
                  className="w-full bg-red-600 text-white rounded px-3 py-2 font-bold hover:bg-red-700 transition-all"
                  onClick={() => { logout(); router.push("/admin") }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}. Manage your NextWave Gadgets store.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active products in catalog</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{inStockProducts}</div>
              <p className="text-xs text-muted-foreground">Products available for sale</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{outOfStockProducts}</div>
              <p className="text-xs text-muted-foreground">Products need restocking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <Package className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{lowStockProducts}</div>
              <p className="text-xs text-muted-foreground">Products with ≤5 units left</p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts > 0 && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alert
              </CardTitle>
              <CardDescription className="text-yellow-700 dark:text-yellow-300">
                {lowStockProducts} product{lowStockProducts > 1 ? "s" : ""} running low on stock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {products
                  .filter((p) => p.inStock && p.stockQuantity <= 5)
                  .map((product) => (
                    <Badge
                      key={product.id}
                      variant="outline"
                      className="border-yellow-300 text-yellow-800 dark:border-yellow-700 dark:text-yellow-200"
                    >
                      {product.name} ({product.stockQuantity} left)
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Product Management */}
        <ProductManagement />
      </div>
    </div>
  )
}
