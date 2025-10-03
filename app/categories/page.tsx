import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function CategoriesPage() {
  const cats = ["led-lights", "smart-gadgets", "security-cameras", "smart-speakers"]
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        <ul className="space-y-2">
          {cats.map(c => (
            <li key={c}><Link href={`/category/${c}`} className="text-primary">{c.replace(/-/g, " ")}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
