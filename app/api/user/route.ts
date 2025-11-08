import { Prisma } from "@prisma/client"; 
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle preflight (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET → List all users with pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            { phone: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
          ],
        }
      : {};

    const totalUsers = await prisma.user.count({ where });

    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            orders: true,
            cartItems: true,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json(
      {
        data: users,
        meta: { totalUsers, totalPages, currentPage: page, limit },
      },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500, headers: corsHeaders }
    );
  }
}
 