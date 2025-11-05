import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // 1️⃣ Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 2️⃣ Calculate total amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    // 3️⃣ Create Order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { orderItems: { include: { product: true } } },
    });

    // 4️⃣ Clear Cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    // 5️⃣ Return order summary
    return NextResponse.json(
      { message: "Checkout successful", order },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
