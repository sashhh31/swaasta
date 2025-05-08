import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"

export default function Home() {
  const featuredProducts = products.slice(0, 6)
  const categories = ["Pain Relief", "Antibiotics", "Vitamins", "First Aid", "Cold & Flu", "Allergy"]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl font-bold text-emerald-600">MediMart</div>
          </Link>
          <div className="relative hidden w-full max-w-sm md:flex mx-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search medicines..." className="pl-8 bg-background" />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/Products/carts">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Sign In</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your Health, Our Priority
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Quality medicines delivered to your doorstep. Fast, reliable, and secure.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex space-x-2">
                  <Input type="search" placeholder="Search medicines..." className="flex-1" />
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Search</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Categories</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Browse our wide range of pharmaceutical products
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border hover:border-emerald-600 transition-colors"
                  >
                    <div className="text-lg font-medium">{category}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Medicines</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Popular and essential medicines for your health needs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Button asChild className="mt-8 bg-emerald-600 hover:bg-emerald-700">
                <Link href="/Products/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Why Choose Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Trusted Healthcare Partner</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide authentic medicines, fast delivery, and expert pharmacist consultation to ensure your
                  health is in good hands.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Authentic Medicines</h3>
                  <p className="text-muted-foreground">
                    All our products are sourced directly from authorized manufacturers.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Fast Delivery</h3>
                  <p className="text-muted-foreground">Get your medicines delivered within 24-48 hours.</p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Expert Consultation</h3>
                  <p className="text-muted-foreground">Our pharmacists are available to answer your queries.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 px-4 md:px-6">
          <div className="flex-1 space-y-4">
            <div className="text-xl font-bold text-emerald-600">MediMart</div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Your trusted healthcare partner providing quality medicines and healthcare products.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <div className="font-medium">Quick Links</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/products" className="hover:underline">
                All Products
              </Link>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
              <Link href="/faq" className="hover:underline">
                FAQs
              </Link>
            </nav>
          </div>
          <div className="flex-1 space-y-4">
            <div className="font-medium">Contact</div>
            <div className="text-sm text-muted-foreground">
              <p>123 Health Street</p>
              <p>Wellness City, WC 12345</p>
              <p>support@medimart.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>© 2023 MediMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
