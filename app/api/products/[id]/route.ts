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
export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = params;
    const contentType = req.headers.get("content-type") || "";

    // 👉 Case 1: JSON update (no file)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const {
        name,
        price,
        stock,
        category,
        sku,
        rating,
        description,
        image,
        images,
      } = body;

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
          images: Array.isArray(images) ? images : undefined,
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
      const galleryFiles = formData.getAll("images") as File[]; 

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      let mainImagePath: string | undefined;
      const galleryPaths: string[] = [];

      // Save main image if provided
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
        await fs.writeFile(filePath, buffer);
        mainImagePath = `/uploads/${path.basename(filePath)}`;
      }

      // Save gallery images if provided
      if (galleryFiles.length > 0) {
        for (const f of galleryFiles) {
          const bytes = await f.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const filePath = path.join(uploadDir, `${Date.now()}-${f.name}`);
          await fs.writeFile(filePath, buffer);
          galleryPaths.push(`/uploads/${path.basename(filePath)}`);
        }
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
          ...(mainImagePath ? { image: mainImagePath } : {}),
          ...(galleryPaths.length > 0 ? { images: galleryPaths } : {}),
        },
      });

      return NextResponse.json(updated, { headers: corsHeaders });
    }

    // Unsupported content type
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

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = params;

    // Find product first (to delete its images later)
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Delete images from filesystem if they exist
    const imagePaths = [
      product.image,
      ...(Array.isArray(product.images) ? product.images : []),
    ].filter(Boolean) as string[];

    for (const img of imagePaths) {
      const filePath = path.join(process.cwd(), "public", img);
      try {
        await fs.unlink(filePath);
      } catch {
        // Ignore if file doesn't exist
      }
    }

    // Delete product from database
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("DELETE /api/products/[id] error:", error.message);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500, headers: corsHeaders }
    );
  }
}  