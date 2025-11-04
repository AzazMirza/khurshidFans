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
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Star,
} from "lucide-react";
import CuratedSidebar from "@/components/curatedsidebar";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  description: string;
  sku: string;
  image: string;
  images: string[];
  createdAt: string;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!params.id || Array.isArray(params.id)) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const id = params.id as string;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/products/${encodeURIComponent(id)}`
        );
        if (!res.ok) throw new Error("Product not found");
        
        const data: Product = await res.json();
        console.log("Fetched product:", data);
        setProduct(data);
        setSelectedImage(0);
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <CuratedSidebar
        main={
          <main className="flex-1 p-6 bg-gray-50">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-96 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </main>
        }
      />
    );
  }

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

  // Safe handling of images
  const safeImages = product.images && Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image 
    ? [product.image]
    : ["/placeholder.svg"];

  const currentImageUrl = safeImages[selectedImage] || safeImages[0] || "/placeholder.svg";

  // Determine stock status
  const getStockStatus = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return "In Stock";
  };

  const stockStatus = getStockStatus(product.stock);

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
                      src={currentImageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  {safeImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {safeImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                            selectedImage === index
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${product.name} view ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Product Description */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Description</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    {product.description || "No description available."}
                  </p>
                </CardContent>
              </Card>

              {/* Product Details */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Product Details</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium text-gray-600">Product ID:</span>
                      <span className="text-gray-900">{product.id}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium text-gray-600">Category:</span>
                      <span className="text-gray-900">{product.category}</span>
                    </div>
                    {product.sku && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium text-gray-600">SKU:</span>
                        <span className="text-gray-900">{product.sku}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium text-gray-600">Added:</span>
                      <span className="text-gray-900">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                    <Badge
                      variant={
                        stockStatus === "In Stock"
                          ? "default"
                          : stockStatus === "Low Stock"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {stockStatus}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    {product.sku && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-medium">{product.sku}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Stock:</span>
                      <span className="font-medium">{product.stock} units</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

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