"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
import gsap from "gsap";

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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs for GSAP
  const mainImageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Helper to get fallback image URL (kept for the default.png as a last resort)
  const getDefaultFallbackImage = () => {
    return `${process.env.NEXT_PUBLIC_IMG}/uploads/default.png`;
  };

  // Fetch product
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
        const apiUrl = `${process.env.NEXT_PUBLIC_API}/products/${encodeURIComponent(id)}`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Product not found");
        const  Product = await res.json();
        setProduct(Product);
        // Reset selected image index when a new product loads
        setSelectedImage(0);
      } catch (err) {
        setError(`Failed to load product: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]); // Re-fetch when params.id changes

  // Compute the list of images to display *each render*
  // Use the primary 'image' if 'images' is empty or not an array
  const imageList = product ? (product.images && product.images.length > 0 ? product.images : [product.image]) : [];
  // Use fallback if no imageList can be formed
  const displayImages = imageList.length > 0 ? imageList : [getDefaultFallbackImage()];

  // Determine the URL for the currently selected image *each render*
  const currentImageUrl = displayImages[selectedImage] || getDefaultFallbackImage();

  // GSAP transition for main image
  const animateImageChange = useCallback((newIndex: number) => {
    // Prevent animation if already transitioning or index is invalid
    if (isTransitioning || newIndex === selectedImage || !mainImageRef.current || newIndex < 0 || newIndex >= displayImages.length) return;

    setIsTransitioning(true);
    const nextImage = new Image();
    nextImage.src = displayImages[newIndex];

    nextImage.onload = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Update state only after the animation completes
          setSelectedImage(newIndex);
          setIsTransitioning(false);
        }
      });

      // Fade out current
      tl.to(mainImageRef.current!, { // Use non-null assertion as we checked above
        opacity: 0,
        duration: 0.2,
        ease: "power2.out"
      })
      // Swap src instantly (offscreen)
      .call(() => {
        if (mainImageRef.current) {
          mainImageRef.current.src = nextImage.src;
        }
      })
      // Fade in new
      .to(mainImageRef.current!, { // Use non-null assertion
        opacity: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    };

    nextImage.onerror = () => {
      // Fallback Strategy: Try to get the URL from the product state again
      const fallbackUrlFromState = displayImages[newIndex];
      if (mainImageRef.current && mainImageRef.current.src !== fallbackUrlFromState && fallbackUrlFromState) {
         // Attempt to reload the image from the state
         mainImageRef.current.src = fallbackUrlFromState;
         // Note: This might also fail if the state is genuinely incorrect or network is down.
         // If this secondary attempt also fails, we could then go to the default fallback.
         // For now, we'll assume this state-reload fixes the issue or will fail again and be handled by the next onError.
      } else {
          // If state URL is the same as current, or state doesn't have a URL, use the default fallback
          if (mainImageRef.current && mainImageRef.current.src !== getDefaultFallbackImage()) {
            mainImageRef.current.src = getDefaultFallbackImage();
          }
      }
      // Update state to reflect the new image (either reloaded from state or default fallback)
      setSelectedImage(newIndex);
      setIsTransitioning(false);
    };
  }, [selectedImage, displayImages, isTransitioning]); // Include displayImages in dependency array

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    if (!isTransitioning && index >= 0 && index < displayImages.length) {
      animateImageChange(index);
    }
  };

  // Keyboard navigation - only attach if there are multiple images to navigate
  useEffect(() => {
    if (displayImages.length <= 1) return; // Do nothing if only one image

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (selectedImage - 1 + displayImages.length) % displayImages.length;
        animateImageChange(prevIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (selectedImage + 1) % displayImages.length;
        animateImageChange(nextIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Cleanup listener on unmount or when displayImages length changes
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, displayImages.length, animateImageChange]); // Include dependencies

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailsRef.current || displayImages.length <= 1) return; // Do nothing if only one image
    const activeThumb = thumbnailsRef.current.children[selectedImage] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }, [selectedImage, displayImages.length]); // Include displayImages.length


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
            {/* <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Enhanced Carousel */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {/* Main Image Viewer */}
                  <div
                    ref={imageContainerRef}
                    className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-4 relative"
                  >
                    <img
                      ref={mainImageRef}
                      src={ process.env.NEXT_PUBLIC_IMG + currentImageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain transition-opacity duration-300"
                      onError={(e) => {
                        // Fallback Strategy for main image: Try to get the URL from the product state again
                        const currentIndex = selectedImage;
                        const fallbackUrlFromState = displayImages[currentIndex];
                        if (e.currentTarget.src !== fallbackUrlFromState && fallbackUrlFromState) {
                           // Attempt to reload the image from the state
                           e.currentTarget.src = fallbackUrlFromState;
                           // If this also fails, it will trigger onError again.
                           // We could add a flag to prevent infinite loops, but often the second attempt succeeds.
                        } else {
                            // If state URL is the same as current, or state doesn't have a URL, use the default fallback
                            if (e.currentTarget.src !== getDefaultFallbackImage()) {
                              e.currentTarget.src = getDefaultFallbackImage();
                            }
                        }
                      }}
                    />
                    {isTransitioning && (
                      <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                    )}
                  </div>

                  {/* Thumbnails Carousel */}
                  {displayImages.length > 1 && (
                    <div className="relative">
                      <div
                        ref={thumbnailsRef}
                        className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar"
                      >
                        {displayImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                              selectedImage === index
                                ? "border-blue-500 ring-2 ring-blue-200"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            disabled={isTransitioning}
                          >
                            <img
                              src={process.env.NEXT_PUBLIC_IMG + image}
                              alt={`${product.name} view ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback Strategy for thumbnail: Try to get the URL from the product state again
                                // This uses the 'image' variable from the map iteration
                                if (e.currentTarget.src !== image && image) {
                                   // Attempt to reload the thumbnail from the state variable 'image'
                                   // Note: The 'image' variable here is the one from the map callback, which should be correct.
                                   e.currentTarget.src = image;
                                   // If this also fails, it will trigger onError again.
                                } else {
                                    // If state URL is the same as current, or state doesn't have a URL, use the default fallback
                                    if (e.currentTarget.src !== getDefaultFallbackImage()) {
                                      e.currentTarget.src = getDefaultFallbackImage();
                                    }
                                }
                              }}
                            />
                          </button>
                        ))}
                      </div>
                      {/* Scroll indicators (optional) */}
                      {/* Note: These are just visual elements and don't control scrolling */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rest of your content remains unchanged */}
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

            {/* Right Column - Product Info (unchanged) */}
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