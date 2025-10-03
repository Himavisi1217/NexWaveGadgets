import { Navbar } from "@/components/navbar"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ContactPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      router.push('/login')
      return
    }
    // In a real app we'd send the message to the backend. For now show success.
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto py-16 flex flex-col items-center">
        <div className="bg-background/80 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-purple-500">
          <h1 className="text-4xl font-extrabold mb-6 text-purple-400 drop-shadow-lg">Contact Us</h1>
          <p className="mb-6 text-muted-foreground">Have questions or need support? Reach out to us below:</p>
          {sent ? (
            <div className="p-6 bg-green-900/40 rounded">Thanks — your message was sent.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <input name="name" type="text" placeholder="Your Name" className="w-full border-2 border-blue-400 rounded px-3 py-2 bg-background/90 text-foreground focus:ring-2 focus:ring-blue-500" required />
              <input name="email" type="email" placeholder="Your Email" className="w-full border-2 border-blue-400 rounded px-3 py-2 bg-background/90 text-foreground focus:ring-2 focus:ring-blue-500" required />
              <textarea name="message" placeholder="Your Message" className="w-full border-2 border-purple-400 rounded px-3 py-2 bg-background/90 text-foreground focus:ring-2 focus:ring-purple-500" rows={4} required />
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded px-3 py-2 font-bold text-lg shadow-md hover:scale-105 transition-transform">Send Message</button>
            </form>
          )}
          <div className="mt-8 text-sm text-muted-foreground">
            <div>Email: <a href="mailto:info@nextwavegadgets.lk" className="underline text-blue-400">info@nextwavegadgets.lk</a></div>
            <div>Phone: <a href="tel:+94123456789" className="underline text-purple-400">+94 123 456 789</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}
