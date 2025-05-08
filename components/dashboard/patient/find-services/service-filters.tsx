import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ServiceFilters() {
  return (
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="distance">Distance</Label>
          <div className="flex items-center gap-4">
            <Slider defaultValue={[5]} max={20} step={1} className="flex-1" />
            <span className="text-sm font-medium">5 miles</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Minimum Rating</Label>
          <Select defaultValue="4">
            <SelectTrigger id="rating">
              <SelectValue placeholder="Select minimum rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="3.5">3.5+ Stars</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Availability</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="available-today" />
              <label
                htmlFor="available-today"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Available Today
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="available-weekend" />
              <label
                htmlFor="available-weekend"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Weekend Availability
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="open-now" />
              <label
                htmlFor="open-now"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Open Now
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="video-consult" />
              <label
                htmlFor="video-consult"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Video Consultation
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Insurance</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="insurance-aetna" />
              <label
                htmlFor="insurance-aetna"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Aetna
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="insurance-bluecross" />
              <label
                htmlFor="insurance-bluecross"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Blue Cross
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="insurance-cigna" />
              <label
                htmlFor="insurance-cigna"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Cigna
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="insurance-medicare" />
              <label
                htmlFor="insurance-medicare"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Medicare
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button>Apply Filters</Button>
      </div>
    </CardContent>
  )
}
