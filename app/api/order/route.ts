import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle preflight (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET → Fetch all orders (with user + products)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                category: true,
                sku: true,
                rating: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ POST → Create new order (and return full info)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items } = body;

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 🧮 Calculate total and prepare order items
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) throw new Error(`Product not found: ${item.productId}`);

      totalAmount += product.price * item.quantity;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price, // snapshot price
      });
    }

    // 🧾 Create order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        orderItems: { create: orderItemsData },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                category: true,
                sku: true,
                rating: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(order, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500, headers: corsHeaders }
    );
  }
}
