// app/orders/page.tsx
import { Suspense } from 'react';
import { fetchFilteredOrders, fetchOrdersPages } from '@/app/lib/data'; // You'll need to create these server functions
import { OrdersSkeleton } from '@/components/skeletons'; // You'll need to create this
import Search from '@/components/search'; // Your existing Search component
import Pagination from '@/components/pagination'; // Your existing Pagination component
// import { lusitana } from '@/app/ui/fonts'; // Adjust import path if needed
import { OrdersTable } from '@/app/ui/orders/page'; // Your new Table component
// import { CreateOrder } from '@/app/ui/orders/buttons'; // Example button component
import CuratedSidebar from "@/components/curatedsidebar";

interface PageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch data on the server using the query and page from the URL
  const totalPages = await fetchOrdersPages(query); // Fetch total pages based on search
  // Note: The OrdersTable will handle fetching the specific page of orders
  // based on query and currentPage props passed to it.

  return (
    <CuratedSidebar
      main={
        <main className="flex-1 p-6 bg-gray-50">
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              {/* <h1 className={`${lusitana.className} text-2xl`}>Orders</h1> */}
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
              <Search placeholder="Search orders (e.g. customer name, email, status...)" />
              {/* <CreateOrder /> Add a button for creating orders if needed */}
            </div>
            <Suspense key={query + currentPage} fallback={<OrdersSkeleton />}>
              <OrdersTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </main>
      }
    />
  );
}