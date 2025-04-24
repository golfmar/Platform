import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "your-secret-key"; // Замени на .env

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json();
    console.log("<====auth request====>", { email, action });

    if (action === "register") {
      const existingUser = await prisma.users.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.users.create({
        data: {
          username: email.split("@")[0],
          email,
          password_hash: hashedPassword,
          created_at: new Date(),
        },
      });
      console.log("<====user created====>", user);
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return NextResponse.json({
        token,
        email: user.email,
        username: user.username,
      });
    } else if (action === "login") {
      const user = await prisma.users.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return NextResponse.json({
        token,
        email: user.email,
        username: user.username,
      });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("<====error====>", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
