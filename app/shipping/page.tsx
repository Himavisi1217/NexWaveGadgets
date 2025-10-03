import { Navbar } from "@/components/navbar"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">Shipping Info</h1>
        <p className="text-muted-foreground">Shipping details and timelines.</p>
      </div>
    </div>
  )
}
