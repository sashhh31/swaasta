import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal } from "lucide-react"

export default function ProductsPage() {
  const categories = ["Pain Relief", "Antibiotics", "Vitamins", "First Aid", "Cold & Flu", "Allergy"]

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">All Medicines</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search medicines..." className="pl-8 bg-background" />
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <div className="font-medium flex items-center justify-between">
              <span>Filters</span>
              <SlidersHorizontal className="h-4 w-4" />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category}`} />
                    <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Prescription</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="prescription-yes" />
                  <Label htmlFor="prescription-yes" className="text-sm font-normal">
                    Required
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="prescription-no" />
                  <Label htmlFor="prescription-no" className="text-sm font-normal">
                    Not Required
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
              <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700">Apply</Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mx-1">
              Previous
            </Button>
            <Button variant="outline" className="mx-1 bg-emerald-600 text-white">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="mx-1">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
