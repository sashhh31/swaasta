import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, ShieldCheck, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  // Sample cart summary data
  const cartSummary = {
    items: [
      { id: 1, name: "Paracetamol 500mg", quantity: 2, price: 5.99 },
      { id: 3, name: "Vitamin D3 1000IU", quantity: 1, price: 8.49 },
    ],
    subtotal: 20.47,
    shipping: 4.99,
    total: 25.46,
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground mt-1">Complete your order by providing your details below.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your street address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter your city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Enter your state" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="Enter your ZIP code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Enter your country" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
              <RadioGroup defaultValue="standard">
                <div className="grid gap-4">
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex flex-1 justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Standard Delivery</div>
                          <div className="text-sm text-muted-foreground">Delivery in 3-5 days</div>
                        </div>
                      </div>
                      <div className="font-medium">$4.99</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex flex-1 justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Express Delivery</div>
                          <div className="text-sm text-muted-foreground">Delivery in 1-2 days</div>
                        </div>
                      </div>
                      <div className="font-medium">$9.99</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="same-day" id="same-day" />
                    <Label htmlFor="same-day" className="flex flex-1 justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Same Day Delivery</div>
                          <div className="text-sm text-muted-foreground">Delivery today</div>
                        </div>
                      </div>
                      <div className="font-medium">$14.99</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <Tabs defaultValue="card">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  <TabsTrigger value="other">Other</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="mt-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="flex">
                        <Input id="card-number" placeholder="0000 0000 0000 0000" />
                        <div className="flex items-center ml-2 gap-1">
                          <Image
                            src="/placeholder.svg?height=24&width=36&text=Visa"
                            alt="Visa"
                            width={36}
                            height={24}
                          />
                          <Image
                            src="/placeholder.svg?height=24&width=36&text=MC"
                            alt="Mastercard"
                            width={36}
                            height={24}
                          />
                          <Image
                            src="/placeholder.svg?height=24&width=36&text=Amex"
                            alt="American Express"
                            width={36}
                            height={24}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" placeholder="Enter the name on your card" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal" className="mt-4">
                  <div className="text-center py-8">
                    <Image
                      src="/placeholder.svg?height=60&width=120&text=PayPal"
                      alt="PayPal"
                      width={120}
                      height={60}
                      className="mx-auto mb-4"
                    />
                    <p className="text-muted-foreground">You will be redirected to PayPal to complete your payment.</p>
                  </div>
                </TabsContent>
                <TabsContent value="other" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 text-center hover:border-emerald-600 cursor-pointer">
                      <Image
                        src="/placeholder.svg?height=40&width=80&text=Apple Pay"
                        alt="Apple Pay"
                        width={80}
                        height={40}
                        className="mx-auto mb-2"
                      />
                      <div className="font-medium">Apple Pay</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center hover:border-emerald-600 cursor-pointer">
                      <Image
                        src="/placeholder.svg?height=40&width=80&text=Google Pay"
                        alt="Google Pay"
                        width={80}
                        height={40}
                        className="mx-auto mb-2"
                      />
                      <div className="font-medium">Google Pay</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Prescription Upload</h2>
              <p className="text-muted-foreground mb-4">
                If you're ordering prescription medicines, please upload a valid prescription.
              </p>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60&text=Upload"
                    alt="Upload"
                    width={60}
                    height={60}
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your prescription file here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
                <Button variant="outline" className="mt-4">
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-4 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {cartSummary.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between">
                    <div className="text-muted-foreground">Subtotal</div>
                    <div className="font-medium">${cartSummary.subtotal.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-muted-foreground">Shipping</div>
                    <div className="font-medium">${cartSummary.shipping.toFixed(2)}</div>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <div className="font-medium">Total</div>
                    <div className="font-bold text-lg">${cartSummary.total.toFixed(2)}</div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">Place Order</Button>

                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure Checkout</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">We accept all major credit cards</div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">Your personal data is protected</div>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">Free shipping on orders over $50</div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                By placing your order, you agree to our{" "}
                <Link href="#" className="text-emerald-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-emerald-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
