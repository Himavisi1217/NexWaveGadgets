"use client"
import { Navbar } from "@/components/navbar"
import { HomePage } from "@/components/home-page"
export default function Page() {
  // Home page is public. Users can browse without logging in.

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HomePage />
    </div>
  )
}
