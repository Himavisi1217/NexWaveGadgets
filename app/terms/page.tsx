import { Navbar } from "@/components/navbar"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">This is a placeholder terms of service. Update with real content.</p>
      </div>
    </div>
  )
}
