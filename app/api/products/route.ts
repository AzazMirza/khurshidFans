import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET — Fetch all or search products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const products = await prisma.product.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { category: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
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

// POST — Create new product
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let name, price, stock, category, rating, description;
    let mainImagePath = "";
    let additionalImages: string[] = [];

    // Use /public/uploads (accessible by browser)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      name = formData.get("name") as string;
      price = formData.get("price") as string;
      stock = formData.get("stock") as string;
      category = formData.get("category") as string;
      rating = formData.get("rating") as string;
      description = formData.get("description") as string;

      // Main image
      const mainFile = formData.get("image") as File | null;
      if (mainFile) {
        const bytes = await mainFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}_${mainFile.name}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        mainImagePath = `/uploads/${fileName}`;
      } else {
        mainImagePath = `/uploads/default.png`;
      }

      // Multiple images
      const files = formData.getAll("images") as File[];
      if (files.length > 0) {
        for (const file of files) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileName = `${Date.now()}_${file.name}`;
          const filePath = path.join(uploadDir, fileName);
          await fs.writeFile(filePath, buffer);
          additionalImages.push(`/uploads/${fileName}`);
        }
      } else {
        additionalImages = ["/uploads/default.png"];
      }
    } else {
      // JSON body
      const body = await req.json();
      ({
        name,
        price,
        stock,
        category,
        rating,
        description,
        image: mainImagePath,
        images: additionalImages,
      } = body);

      if (!mainImagePath) mainImagePath = "/uploads/default.png";
      if (!additionalImages || additionalImages.length === 0)
        additionalImages = ["/uploads/default.png"];
    }

    // Validation
    if (!name || !price || !stock || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Save in DB
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
        category,
        rating: rating ? Number(rating) : Math.floor(Math.random() * 3) + 3, 
        description: description || null,
        sku: "TEMP",
        image: mainImagePath,
        images: additionalImages,
      },
    });

    // Generate SKU
    const formattedName = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
    const generatedSku = `${formattedName}_${product.id}`;

    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: { sku: generatedSku },
    });

    return NextResponse.json(updatedProduct, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error("POST /api/products error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500, headers: corsHeaders }
    );
  }
}

