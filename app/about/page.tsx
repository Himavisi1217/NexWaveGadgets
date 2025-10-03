import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto py-16 flex flex-col items-center">
        <div className="bg-background/80 rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center border border-blue-500">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-400 drop-shadow-lg">About Us</h1>
          <img src="/placeholder-logo.png" alt="Logo" className="mx-auto mb-6 w-24 h-24 rounded-full shadow-lg border-4 border-purple-500" />
          <p className="text-lg text-muted-foreground mb-4">
            <span className="font-bold text-blue-300">NextWave Gadgets</span> is your trusted source for professional LED lights and smart gadgets in Sri Lanka. We are committed to providing high-quality products and excellent customer service.
          </p>
          <p className="mb-4">
            Our mission is to bring the latest technology and innovation to your home and business, making life smarter and brighter.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl px-6 py-4 shadow-lg">
              <span className="text-2xl font-bold">10+</span>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl px-6 py-4 shadow-lg">
              <span className="text-2xl font-bold">1000+</span>
              <div className="text-sm">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
