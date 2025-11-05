import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET → Fetch user's cart
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));

  if (!userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400, headers: corsHeaders });

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
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
    });

    return NextResponse.json(cartItems, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch cart" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ POST → Add item to cart
export async function POST(req: Request) {
  try {
    const { userId, productId, quantity } = await req.json();

    if (!userId || !productId)
      return NextResponse.json(
        { error: "Missing userId or productId" },
        { status: 400, headers: corsHeaders }
      );

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404, headers: corsHeaders });

    // Check if item already in cart
    const existing = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    let cartItem;
    if (existing) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + (quantity || 1) },
        include: { product: true },
      });
    } else {
      // Create new item
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity: quantity || 1,
        },
        include: { product: true },
      });
    }

    return NextResponse.json(cartItem, { status: 201, headers: corsHeaders });
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add to cart" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ PUT → Update quantity
export async function PUT(req: Request) {
  try {
    const { cartItemId, quantity } = await req.json();

    if (!cartItemId || quantity < 1)
      return NextResponse.json({ error: "Invalid data" }, { status: 400, headers: corsHeaders });

    const updated = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { product: true },
    });

    return NextResponse.json(updated, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update item" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ DELETE → Remove single item
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const cartItemId = Number(searchParams.get("id"));

  if (!cartItemId)
    return NextResponse.json({ error: "Missing cartItemId" }, { status: 400, headers: corsHeaders });

  try {
    await prisma.cartItem.delete({ where: { id: cartItemId } });
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error removing cart item:", error);
    return NextResponse.json(
      { error: error.message || "Failed to remove item" },
      { status: 500, headers: corsHeaders }
    );
  }
}
