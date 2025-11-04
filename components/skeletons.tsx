// app/components/skeletons.tsx
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a shadcn/ui skeleton component
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Example skeleton for a single product card
function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <Skeleton className="h-48 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-8 w-full" />
      </div>
    </Card>
  );
}

// Skeleton for the main products grid
export function ProductsGridSkeleton({ numItems = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: numItems }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Skeleton for the entire page content (used in Suspense)
export function ProductsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>
      <ProductsGridSkeleton numItems={6} />
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}

// components/skeletons.tsx (add this function)

// Example skeleton for a single order card
function OrderCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-1/3 mt-2" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-4 w-1/4 mb-2" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-2">
          <div>
            <Skeleton className="h-3 w-1/4 mb-1" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton for the main orders grid
export function OrdersGridSkeleton({ numItems = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-6">
      {Array.from({ length: numItems }).map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Skeleton for the entire page content (used in Suspense)
export function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>
      <OrdersGridSkeleton numItems={6} />
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}