import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/data"

export default function CartPage() {
  // Sample cart items
  const cartItems = [
    { id: 1, productId: 1, quantity: 2 },
    { id: 2, productId: 3, quantity: 1 },
  ]

  const cartProducts = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
    }
  })

  const subtotal = cartProducts.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  const shipping = 4.99
  const total = subtotal + shipping

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any medicines to your cart yet.</p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="border rounded-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-muted/50">
                <div className="col-span-2 font-medium">Product</div>
                <div className="font-medium text-center">Price</div>
                <div className="font-medium text-center">Quantity</div>
                <div className="font-medium text-right">Total</div>
              </div>

              {cartProducts.map((item) => (
                <div key={item.id} className="border-t first:border-t-0">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
                    <div className="md:col-span-2 flex gap-4">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product?.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.product?.name || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
                          {item.product?.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">{item.product?.category}</div>
                        {item.product?.prescription && (
                          <div className="text-xs text-amber-600 mt-1">Prescription Required</div>
                        )}
                      </div>
                    </div>
                    <div className="text-center flex items-center md:justify-center">
                      <div className="text-sm text-muted-foreground md:hidden">Price:</div>
                      <div className="ml-auto md:ml-0">${item.product?.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center justify-between md:justify-center">
                      <div className="text-sm text-muted-foreground md:hidden">Quantity:</div>
                      <div className="flex items-center">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="w-10 text-center">{item.quantity}</div>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end">
                      <div className="text-sm text-muted-foreground md:hidden">Total:</div>
                      <div className="font-medium">${((item.product?.price || 0) * item.quantity).toFixed(2)}</div>
                    </div>
                    <div className="md:hidden">
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 p-0 h-auto">
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="ghost" className="text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="border rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="text-muted-foreground">Subtotal</div>
                  <div className="font-medium">${subtotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-muted-foreground">Shipping</div>
                  <div className="font-medium">${shipping.toFixed(2)}</div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-medium">Total</div>
                  <div className="font-bold text-lg">${total.toFixed(2)}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="font-medium">Promo Code</div>
                <div className="flex gap-2">
                  <Input placeholder="Enter code" className="flex-1" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Proceed to Checkout</Button>

              <div className="text-sm text-muted-foreground">
                <p>Shipping calculated at checkout. Prescription medicines require verification.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
