// app/ui/orders/table.tsx
import { fetchFilteredOrders } from '@/app/lib/data'; // You'll need to create this server function
import { formatDateToLocal, formatCurrency } from '@/lib/utils'; // Adjust import path if needed
import { Button } from '@/components/ui/button'; // Adjust import path if needed
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // Fetch orders based on the query and current page
  const { orders, totalPages } = await fetchFilteredOrders(query, currentPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-6">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gray-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Order #{order.id}
              </CardTitle>
              <Badge
                variant={
                  order.status === 'PENDING' ? 'secondary' :
                  order.status === 'SHIPPED' ? 'default' :
                  order.status === 'DELIVERED' ? 'outline' :
                  'destructive' // Assuming other statuses like 'CANCELLED' are destructive
                }
              >
                {order.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Placed on {formatDateToLocal(order.createdAt)}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium">Customer</h3>
              <p className="text-sm">{order.user.name}</p>
              <p className="text-xs text-muted-foreground">{order.user.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium">Items</h3>
              <ul className="text-sm space-y-1">
                {order.orderItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.product.name} (x{item.quantity})
                    </span>
                    <span>
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-lg font-bold">{formatCurrency(order.totalAmount)}</p>
              </div>
              <Button asChild size="sm">
                <Link href={`/orders/${order.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}