import { Navbar } from "@/components/navbar"

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">Warranty</h1>
        <p className="text-muted-foreground">Warranty information and registration.</p>
      </div>
    </div>
  )
}
