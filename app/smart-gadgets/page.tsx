import { Navbar } from "@/components/navbar"

export default function SmartGadgetsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">Smart Gadgets</h1>
        <p className="text-muted-foreground">All smart gadget products.</p>
      </div>
    </div>
  )
}
