// app/orders/[id]/page.tsx
import { fetchOrderById } from '@/app/lib/data'; // You'll need to create this server function
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import CuratedSidebar from "@/components/curatedsidebar";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const id = (await params).id;
  let order;

  try {
    order = await fetchOrderById(id);
  } catch (error) {
    console.error('Failed to fetch order:', error);
    return (
      <CuratedSidebar
        main={
          <main className="flex-1 p-6 bg-gray-50">
            <div className="text-red-500">Failed to load order details.</div>
            <Link href="/orders" className="mt-4 inline-block">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
          </main>
        }
      />
    );
  }

  if (!order) {
    return (
      <CuratedSidebar
        main={
          <main className="flex-1 p-6 bg-gray-50">
            <div className="text-red-500">Order not found.</div>
            <Link href="/orders" className="mt-4 inline-block">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
          </main>
        }
      />
    );
  }

  return (
    <CuratedSidebar
      main={
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            </div>
            <div className="flex gap-2">
              {/* Add Edit/Delete buttons if applicable */}
              <Button variant="outline">
                <Link href="/orders">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Orders
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Order Details</h2>
                  <Badge
                    variant={
                      order.status === 'PENDING' ? 'secondary' :
                      order.status === 'SHIPPED' ? 'default' :
                      order.status === 'DELIVERED' ? 'outline' :
                      'destructive'
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Order ID</h3>
                    <p className="text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Date</h3>
                    <p className="text-gray-900">{formatDateToLocal(order.createdAt)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Customer</h3>
                    <p className="text-gray-900">{order.user.name}</p>
                    <p className="text-sm text-gray-500">{order.user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Total Amount</h3>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(order.totalAmount)}</p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4">Items</h3>
                <ul className="space-y-4">
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMG}${item.product.image}`}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">SKU: {item.product.sku}</p>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(item.price)} x {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {order.user.name}</p>
                  <p><span className="font-medium">Email:</span> {order.user.email}</p>
                  {/* Add address fields if available */}
                </div>
              </div>

              {/* Add Payment and Shipping details sections if available */}
            </div>
          </div>
        </main>
      }
    />
  );
}