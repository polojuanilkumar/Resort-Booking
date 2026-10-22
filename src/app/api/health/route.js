import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getMongoDb();
    await db.command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      message: "MongoDB Atlas connection is working.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "MongoDB Atlas connection failed.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
