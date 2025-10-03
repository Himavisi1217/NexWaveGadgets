import { Navbar } from "@/components/navbar"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">This is a placeholder privacy policy. Update with real content.</p>
      </div>
    </div>
  )
}
