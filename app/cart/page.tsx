"use client"
import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const paymentMethods = ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery", "Bank Transfer"]

export default function CartPage() {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0])
  const router = useRouter()
  const { user } = useAuth()
  const [showBankDetails, setShowBankDetails] = useState(false)


  // Editable cart items
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "RGB LED Strip Lights",
      image: "/rgb-led-strip-lights-colorful.jpg",
      price: 2999,
      quantity: 1,
    },
    {
      id: "2",
      name: "Smart WiFi Bulb",
      image: "/smart-wifi-bulb-white.jpg",
      price: 1999,
      quantity: 2,
    },
  ])

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const handleDelete = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto py-8">
      <button
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-all"
        onClick={() => router.back()}
      >
        ← Back
      </button>
      <h1 className="text-3xl font-extrabold mb-8 text-center">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-xl font-bold mb-4">Items</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center bg-background rounded-xl shadow-lg p-4 hover:shadow-[0_0_24px_4px_rgba(0,255,255,0.3)] transition-all">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover mr-4 border border-blue-400" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    Qty:
                    <Button size="sm" variant="outline" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                  </div>
                </div>
                <div className="font-bold text-blue-600 text-xl mr-4">Rs. {item.price * item.quantity}</div>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right text-lg font-bold">Total: <span className="text-blue-600">Rs. {total}</span></div>
        </div>
        <div className="bg-background rounded-xl shadow-lg p-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <select
            value={selectedMethod}
            onChange={e => setSelectedMethod(e.target.value)}
            className="border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
          >
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 text-lg shadow-md hover:scale-105 transition-transform"
            onClick={() => {
              if (!user) {
                router.push('/login')
                return
              }
              if (selectedMethod === 'Bank Transfer') {
                setShowBankDetails(true)
                return
              }
              // Proceed with other payment methods (placeholder)
              alert(`Proceeding to payment via ${selectedMethod}`)
            }}
          >
            Proceed to Payment
          </Button>
          {showBankDetails && (
            <div className="mt-4 p-4 bg-background/80 rounded">
              <h3 className="font-semibold mb-2">Bank Transfer Details</h3>
              <p className="text-sm text-muted-foreground">Bank: Example Bank</p>
              <p className="text-sm text-muted-foreground">Account Name: NextWave Gadgets</p>
              <p className="text-sm text-muted-foreground">Account Number: 1234567890</p>
              <p className="text-sm text-muted-foreground">Branch: Colombo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
