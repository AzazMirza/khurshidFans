import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Prisma } from "@prisma/client";
import path from "path";
import sharp from "sharp";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET — Fetch paginated or searched products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const limit = 12; 
    const skip = (currentPage - 1) * limit;

    // 👇 Use correct type name: `Prisma.productWhereInput`
    const where: Prisma.ProductWhereInput | undefined = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
            {
              category: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
          ],
        }
      : undefined;

    // ✅ Fetch products and total count in parallel
    const [products, totalProds] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { id: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalProds / limit);

    return NextResponse.json(
      {
        products,
        totalProds,
        currentPage,
        totalPages,
      },
      { headers: corsHeaders }
    );
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

      // Function to compress and convert image
      const processImage = async (file: File, folder: string) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileSizeMB = buffer.byteLength / (1024 * 1024);
        const fileNameWithoutExt = path.parse(file.name).name;
        const timeStamp = Date.now();

        const compressedFileName = `${fileNameWithoutExt}-${timeStamp}.webp`;
        const outputPath = path.join(folder, compressedFileName);

        // Compress & Convert to WebP
        const optimizedBuffer = await sharp(buffer)
          .resize({ width: 1200 })
          .webp({ quality: fileSizeMB > 1 ? 75 : 85 })
          .toBuffer();

        await fs.writeFile(outputPath, optimizedBuffer);
        return `/uploads/${compressedFileName}`;
      };

      // Main image
      const mainFile = formData.get("image") as File | null;
      if (mainFile) {
        mainImagePath = await processImage(mainFile, uploadDir);
      } else {
        mainImagePath = `/uploads/default.png`;
      }

      // Multiple images
      const files = formData.getAll("images") as File[];
      if (files.length > 0) {
        for (const file of files) {
          const imagePath = await processImage(file, uploadDir);
          additionalImages.push(imagePath);
        }
      } else {
        additionalImages = ["/uploads/default.png"];
      }
    } else {
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


    if (!name || !price || !stock || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

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

    // 🔹 Generate SKU after saving
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
