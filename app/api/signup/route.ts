import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key"; // use .env in production

export async function POST(req: Request) {
  try {
    const { name, identifier, password } = await req.json();

    // ✅ Validate input
    if (!name || !identifier || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Detect if identifier is email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: isEmail ? { email: identifier } : { phone: identifier },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email: isEmail ? identifier : null,
        phone: !isEmail ? identifier : null,
        password: hashedPassword,
      },
    });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, phone: user.phone },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Store session in cookie
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // ✅ Respond success
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error.message, error.stack);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
