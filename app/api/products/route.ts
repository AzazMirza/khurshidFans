import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET — Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(products, { headers: corsHeaders });
  } catch (error: any) {
    console.error("GET /api/products error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ POST — Create new product (supports JSON or form-data)
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let name, price, stock, category, rating, description, imagePath;

    // 🧾 Case 1: If form-data (image upload)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = formData.get("name") as string;
      price = formData.get("price") as string;
      stock = formData.get("stock") as string;
      category = formData.get("category") as string;
      rating = formData.get("rating") as string;
      description = formData.get("description") as string;
      const file = formData.get("image") as File | null;

      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        await fs.writeFile(filePath, buffer);

        imagePath = `/uploads/${fileName}`;
      }
    } else {
      // 🧾 Case 2: JSON body
      const body = await req.json();
      ({ name, price, stock, category, rating, description, imagePath } = body);
    }

    // ✅ Validate required fields
    if (!name || !price || !stock || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Step 1 — Create product (temporary SKU)
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
        category,
        rating: rating ? Number(rating) : null,
        description: description || null,
        sku: "TEMP",
        image: imagePath || null,
      },
    });

    // ✅ Step 2 — Generate SKU
    const formattedName = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
    const generatedSku = `${formattedName}_${product.id}`;

    // ✅ Step 3 — Update SKU
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: { sku: generatedSku },
    });

    return NextResponse.json(updatedProduct, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error("POST /api/products error:", error.message, error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500, headers: corsHeaders }
    );
  }
}
