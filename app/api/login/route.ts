import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    // 1️⃣ Validate input
    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email/phone and password are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Find user by email OR phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email or phone" },
        { status: 404 }
      );
    }

    // 3️⃣ Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 4️⃣ Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email || user.phone },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Prepare response
    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

    // 6️⃣ Attach secure cookie
    res.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Optional: Handle preflight CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
