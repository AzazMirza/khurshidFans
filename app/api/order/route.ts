import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle preflight (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET → Fetch orders with user name, pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where = userId ? { userId } : {};

    const totalOrders = await prisma.order.count({ where });

    const orders = await prisma.order.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
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

    const totalPages = Math.ceil(totalOrders / limit);

    return NextResponse.json(
      {
        data: orders,
        meta: { totalOrders, totalPages, currentPage: page, limit },
      },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ PUT → Update order status
export async function PUT(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status)
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400, headers: corsHeaders });

    const validStatuses = ["PENDING", "PAID", "SHIPPED", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status))
      return NextResponse.json({ error: "Invalid status" }, { status: 400, headers: corsHeaders });

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
        orderItems: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json(
      { message: `Order status updated to ${status}`, order: updatedOrder },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update status" },
      { status: 500, headers: corsHeaders }
    );
  }
}
