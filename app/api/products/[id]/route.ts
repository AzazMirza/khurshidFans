import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface Params {
  params: { id: string };
}

// ✅ Handle CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET — Fetch one product by ID
export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(product, { headers: corsHeaders });
  } catch (error: any) {
    console.error("GET /api/products/[id] error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ PUT — Update product (with optional new image upload)
export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = params;

    const contentType = req.headers.get("content-type") || "";

    // 👉 Case 1: JSON update (no file)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const { name, price, stock, category, sku, rating, description, image } = body;

      const updated = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          price: price ? Number(price) : undefined,
          stock: stock ? Number(stock) : undefined,
          category,
          sku,
          rating: rating ? Number(rating) : undefined,
          description,
          image,
        },
      });

      return NextResponse.json(updated, { headers: corsHeaders });
    }

    // 👉 Case 2: Form-data update (file upload)
    else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const name = formData.get("name")?.toString() || "";
      const price = Number(formData.get("price"));
      const stock = Number(formData.get("stock"));
      const category = formData.get("category")?.toString() || "";
      const sku = formData.get("sku")?.toString() || "";
      const rating = Number(formData.get("rating"));
      const description = formData.get("description")?.toString() || "";
      const file = formData.get("image") as File | null;

      let imagePath: string | undefined;

      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), "public/uploads");

        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
        await fs.writeFile(filePath, buffer);

        imagePath = `/uploads/${path.basename(filePath)}`;
      }

      const updated = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          price: isNaN(price) ? undefined : price,
          stock: isNaN(stock) ? undefined : stock,
          category,
          sku,
          rating: isNaN(rating) ? undefined : rating,
          description,
          ...(imagePath ? { image: imagePath } : {}),
        },
      });

      return NextResponse.json(updated, { headers: corsHeaders });
    }

    // 👉 Unsupported type
    return NextResponse.json(
      { error: "Unsupported content type" },
      { status: 400, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("PUT /api/products/[id] error:", error.message);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404, headers: corsHeaders }
      );
    }
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 400, headers: corsHeaders }
    );
  }
}

// ✅ DELETE — Delete product
export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = params;
    await prisma.product.delete({ where: { id: Number(id) } });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("DELETE /api/products/[id] error:", error.message);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 400, headers: corsHeaders }
    );
  }
}
