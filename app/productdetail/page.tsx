"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { 
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Star,
  TrendingUp,
  Eye,
  DollarSign
} from "lucide-react";
import CuratedSidebar from "@/components/curatedsidebar";

// ✅ Define full product type
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
  rating: number;
  reviews: number;
  sold: number;
  views: number;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  status: string;
  tags: string[];
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string; // URL param is always string

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    alert('asdf')
    // if (!id) return;

    const fetchProduct = async () => {
      try {
        alert('asdf')
        const res = await fetch(`http://192.168.1.102:3000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data: Product = await res.json();
        setProduct(data);
        console.log(data);
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  },[id]);

  // ✅ Loading state
  if (loading) {
    return (
      <CuratedSidebar
        main={
          <main className="flex-1 p-6 bg-gray-50">
            <div>Loading product...</div>
          </main>
        }
      />
    );
  }

  // ✅ Error state
  if (error || !product) {
    return (
      <CuratedSidebar
        main={
          <main className="flex-1 p-6 bg-gray-50">
            <div className="text-red-500">{error || "Product not found"}</div>
            <Link href="/products" className="mt-4 inline-block">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </main>
        }
      />
    );
  }

  // ✅ Fallback for originalPrice if not provided
  const originalPrice = product.originalPrice ?? product.price * 1.25;

  return (
    <CuratedSidebar
      main={
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Link href="/products">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Button>
              </Link>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Product Images */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                    <img 
                      src={product.images[selectedImage]?.trim() || "/placeholder.svg"} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                          selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img 
                          src={image.trim() || "/placeholder.svg"} 
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Product Description */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Description</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{product.description}</p>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Specifications</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium text-gray-600">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Basic Info Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                    <Badge 
                      variant={product.status === "In Stock" ? "default" : "destructive"}
                    >
                      {product.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                      {originalPrice > product.price && (
                        <>
                          <span className="text-lg text-gray-400 line-through">
                            ${originalPrice.toFixed(2)}
                          </span>
                          <Badge variant="secondary">
                            {Math.round(((originalPrice - product.price) / originalPrice) * 100)}% OFF
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">SKU:</span>
                      <span className="font-medium">{product.sku}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Stock:</span>
                      <span className="font-medium">{product.stock} units</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Performance</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total Sales</p>
                        <p className="text-xl font-bold">{product.sold}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-xl font-bold">
                          ${(product.sold * product.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total Views</p>
                        <p className="text-xl font-bold">{product.views.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Quick Actions</h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    Duplicate Product
                  </Button>
                  <Button className="w-full" variant="outline">
                    View in Store
                  </Button>
                  <Button className="w-full" variant="outline">
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      }
    />
  );
}