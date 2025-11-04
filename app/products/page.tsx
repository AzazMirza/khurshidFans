// app/products/page.tsx
// This is the main Server Component for the /products route.
// It fetches data based on searchParams and renders the layout and the client component.
import { Suspense } from 'react'; // Used in the Server Component
import Pagination from '@/components/pagination'; // Client Component
import Search from '@/components/search'; // Client Component
// import { lusitana } from 'next/font'; // Adjust import path if needed
import { ProductsSkeleton } from '@/components/skeletons'; // You'll need to create this
import { fetchFilteredProducts, fetchProductsPages } from '@/app/lib/data'; // You'll need to create these server functions
import { Product } from '@/app/types'; // Ensure this type is accessible
import CuratedSidebar from "@/components/curatedsidebar";
import ProductPageClient from '@/app/ui/products/productsListing'; // Import the Client Component

// Define the shape of the API response if not already defined globally
// interface ApiResponse {
//   products: Product[];
//   totalProds: number;
//   currentPage: number;
//   totalPages: number;
// }

interface PageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

// --- Main Page Component (Server Component) ---
// This component fetches data based on URL search parameters.
// It renders the sidebar and passes the fetched data to the Client Component.
// Note: This function itself does NOT have 'use client'; at the top.
export default async function Page(props: PageProps) {
  // Extract search parameters from the URL
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch data on the server using the query and page from the URL
  const { products, totalPages } = await fetchFilteredProducts(query, currentPage);

  // Render the layout and wrap the Client Component in Suspense
  return (
    <CuratedSidebar
      main={
        <main className="flex-1 p-6 bg-gray-50">
          <Suspense key={query + currentPage} fallback={<ProductsSkeleton />}>
            {/* Pass the server-fetched data to the Client Component */}
            {/* The ProductPageClient function is now a separate Client Component file */}
            {/* and is correctly marked with 'use client'; inside its own file. */}
            <ProductPageClient
              initialProducts={products}
              totalPages={totalPages}
              query={query}
              currentPage={currentPage}
            />
          </Suspense>
        </main>
      }
    />
  );
}