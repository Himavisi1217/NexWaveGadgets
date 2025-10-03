import { Navbar } from "@/components/navbar"

export default function LedLightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">LED Lights</h1>
        <p className="text-muted-foreground">All LED light products.</p>
      </div>
    </div>
  )
}
