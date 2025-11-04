// app/lib/data.ts
import { Product } from "@/app/types";

// Define the shape of the API response
interface ApiResponse {
  products: Product[];
  totalProds: number;
  currentPage: number;
  totalPages: number;
}

interface OrderApiResponse {
  orders: Order[]; // Assuming you have an Order type defined
  totalOrders: number;
  currentPage: number;
  totalPages: number;
}
interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: string; // e.g., 'PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  orderItems: {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    product: {
      id: number;
      name: string;
      price: number;
      image: string;
      category: string;
      sku: string;
      rating: number;
      description: string;
    };
  }[];
}


export async function fetchFilteredOrders(
  query: string,
  currentPage: number,
  itemsPerPage: number = 6 // Adjust as needed
): Promise<{ orders: Order[], totalPages: number }> {
  try {
    const offset = (currentPage - 1) * itemsPerPage;
    const searchParam = query ? `&search=${encodeURIComponent(query)}` : '';
    // Note: Adjust the API endpoint to match your backend's pagination parameters (e.g., offset/limit vs page/pageSize)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/orders?page=${currentPage}${searchParam}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch orders.');
    }

    const  OrderApiResponse = await res.json();
    // The API response structure is assumed to be { orders, totalOrders, currentPage, totalPages }
    // Adjust based on your actual API response
    return {
      orders: OrderApiResponse.orders,
      totalPages: OrderApiResponse.totalPages,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders.');
  }
}

// Fetch the total number of pages for pagination
export async function fetchOrdersPages(query: string): Promise<number> {
  try {
    // The main fetchFilteredOrders already gets the totalPages, so we could potentially call that
    // with page=1 and return just the totalPages. Or the API could have a separate endpoint for count.
    // For now, using fetchFilteredOrders to get totalPages
    const { totalPages } = await fetchFilteredOrders(query, 1); // Fetch page 1 to get total
    return totalPages;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of pages for orders.');
  }
}

// Fetch a single order by its ID
export async function fetchOrderById(id: string): Promise<Order | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/${id}`);

    if (!res.ok) {
      // If the API returns 404, return null
      if (res.status === 404) {
        console.log('Order not found');
        return null;
      }
      throw new Error('Failed to fetch order.');
    }

    const order: Order = await res.json();
    return order;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch order.');
  }
}

// Fetch filtered and paginated products from your API
export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
  itemsPerPage: number = 6 // Adjust as needed
): Promise<{ products: Product[], totalPages: number }> {
  try {
    const offset = (currentPage - 1) * itemsPerPage;
    const searchParam = query ? `&search=${encodeURIComponent(query)}` : '';
    // Note: Adjust the API endpoint to match your backend's pagination parameters (e.g., offset/limit vs page/pageSize)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/products?page=${currentPage}${searchParam}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch products.');
    }

    const  ApiResponse = await res.json();
    // The API response structure is { products, totalProds, currentPage, totalPages }
    return {
      products: ApiResponse.products,
      totalPages: ApiResponse.totalPages,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

// Fetch the total number of pages for pagination
// This function might not be strictly necessary if your main API endpoint returns totalPages,
// but keeping it for consistency with the example.
export async function fetchProductsPages(query: string): Promise<number> {
  try {
    // The main fetchFilteredProducts already gets the totalPages, so we could potentially call that
    // with page=1 and return just the totalPages. Or the API could have a separate endpoint for count.
    // For now, assume fetchFilteredProducts with a dummy page call gets the total.
    // A more efficient way might be a separate API endpoint returning just the count.
    // const countRes = await fetch(`${process.env.NEXT_PUBLIC_API}/products/count?query=${query}`);
    // const { totalProds } = await countRes.json();
    // const totalPages = Math.ceil(totalProds / ITEMS_PER_PAGE);

    // For now, using fetchFilteredProducts to get totalPages
    const { totalPages } = await fetchFilteredProducts(query, 1); // Fetch page 1 to get total
    return totalPages;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of pages.');
  }
}

