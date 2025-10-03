"use client"
import { Navbar } from "@/components/navbar"
import { HomePage } from "@/components/home-page"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HomePage />
    </div>
  )
}
