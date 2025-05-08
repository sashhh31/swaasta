import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { products } from "@/lib/data"
import ProductCard from "@/components/ProductCard"

export default function ProductPage({ params }: { params: { id: string } }) {
  
  const productId = Number.parseInt(params.id)
  console.log("Product ID:", productId)
  const product:any = products.find((p) => p.id === productId) || products[0]

  const shippingOptions = [
    { id: "standard", name: "Standard Delivery", price: 4.99, days: "3-5" },
    { id: "express", name: "Express Delivery", price: 9.99, days: "1-2" },
    { id: "same-day", name: "Same Day Delivery", price: 14.99, days: "Today" },
  ]

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="relative aspect-square rounded-lg overflow-hidden border">
            <Image
              src={ "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.prescription && (
              <Badge className="absolute top-4 right-4 bg-amber-500">Prescription Required</Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden border">
                <Image
                  src={ `/placeholder.svg?height=150&width=150&text=Image${i}`}
                  alt={`${product.name} view ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6">
          <div>
            <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
            </Link>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="font-bold text-2xl">${product.price.toFixed(2)}</div>
              {product.originalPrice && (
                <div className="text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</div>
              )}
            </div>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div className="font-medium">Quantity</div>
            <div className="flex items-center">
              <Button variant="outline" size="icon">
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">1</div>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-medium">Shipping Options</div>
            <RadioGroup defaultValue="standard">
              {shippingOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex flex-1 justify-between cursor-pointer">
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground">Delivery in {option.days} days</div>
                    </div>
                    <div className="font-medium">${option.price.toFixed(2)}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-12">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button variant="outline" className="flex-1 h-12">
              <Link href={`/Products/checkout`} className="flex items-center justify-center">
              Buy Now
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4" />
            <span>Free shipping on orders over $50</span>
          </div>

          {product.prescription && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
              <div className="font-medium">Prescription Required</div>
              <p className="text-sm mt-1">
                This medicine requires a valid prescription. You can upload your prescription during checkout.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">About {product.name}</h3>
              <p className="text-muted-foreground">
                {product.longDescription ||
                  `${product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
              </p>
              <h3 className="text-lg font-medium">Indications</h3>
              <p className="text-muted-foreground">
                This medication is used to treat the symptoms of {product.category.toLowerCase()}.
              </p>
              <h3 className="text-lg font-medium">Dosage</h3>
              <p className="text-muted-foreground">
                Take as directed by your healthcare provider. The usual recommended dose is one tablet twice daily.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-medium">Product Details</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Brand</div>
                    <div>MediMart</div>
                    <div className="text-muted-foreground">Form</div>
                    <div>Tablet</div>
                    <div className="text-muted-foreground">Package Size</div>
                    <div>30 tablets</div>
                    <div className="text-muted-foreground">Storage</div>
                    <div>Store below 25°C</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Ingredients</div>
                  <p className="text-sm text-muted-foreground">
                    Active ingredient: Lorem ipsum. Inactive ingredients: Lactose, microcrystalline cellulose, magnesium
                    stearate, silicon dioxide.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">John D.</div>
                      <div className="text-sm text-muted-foreground">Verified Purchase</div>
                    </div>
                    <div className="flex items-center text-amber-500 my-1">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <svg
                            key={j}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Great product! It worked exactly as described and helped with my symptoms. Would definitely
                      recommend.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
