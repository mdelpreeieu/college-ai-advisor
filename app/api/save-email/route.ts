import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "emails.txt");
    fs.appendFileSync(filePath, `${email}\n`, "utf8");

    return NextResponse.json({ message: "Email saved" });
  } catch (error) {
    console.error("Failed to save email:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
