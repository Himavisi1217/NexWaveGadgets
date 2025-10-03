import { Navbar } from "@/components/navbar"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">Careers</h1>
        <p className="text-muted-foreground">Explore job openings and join our team.</p>
      </div>
    </div>
  )
}
