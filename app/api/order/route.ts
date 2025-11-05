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

// ✅ GET → Fetch paginated orders
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // 🧾 Fetch total count
    const totalOrders = await prisma.order.count();

    // 🧾 Fetch paginated orders
    const orders = await prisma.order.findMany({
      skip,
      take: limit,
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

    // 🧮 Pagination info
    const totalPages = Math.ceil(totalOrders / limit);

    return NextResponse.json(
      {
        data: orders,
        meta: {
          totalOrders,
          totalPages,
          currentPage: page,
          limit,
        },
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
