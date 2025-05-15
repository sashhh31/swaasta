"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Test {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  turnaroundTime: string;
  status: "available" | "unavailable";
}

const mockTests: Test[] = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    description: "Measures different components of blood including red blood cells, white blood cells, and platelets.",
    price: 75,
    turnaroundTime: "24-48 hours",
    status: "available",
  },
  {
    id: "2",
    name: "Comprehensive Metabolic Panel",
    category: "Chemistry",
    description: "Measures kidney function, liver function, electrolyte levels, and blood sugar.",
    price: 120,
    turnaroundTime: "24-48 hours",
    status: "available",
  },
  {
    id: "3",
    name: "Lipid Panel",
    category: "Chemistry",
    description: "Measures cholesterol and triglyceride levels.",
    price: 85,
    turnaroundTime: "24-48 hours",
    status: "available",
  },
  {
    id: "4",
    name: "Thyroid Function Test",
    category: "Endocrinology",
    description: "Measures thyroid hormone levels to assess thyroid function.",
    price: 150,
    turnaroundTime: "48-72 hours",
    status: "available",
  },
];

export default function TestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(mockTests.map((test) => test.category)));

  const filteredTests = mockTests.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Laboratory Tests</h1>
        <Button>Schedule New Test</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Available Tests</CardTitle>
            <CardDescription>
              Browse and schedule laboratory tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <select
                className="border rounded-md px-3 py-2"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Turnaround Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell>{test.category}</TableCell>
                    <TableCell>${test.price}</TableCell>
                    <TableCell>{test.turnaroundTime}</TableCell>
                    <TableCell>
                      <Badge
                        variant={test.status === "available" ? "default" : "secondary"}
                      >
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Categories</CardTitle>
            <CardDescription>Browse by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 