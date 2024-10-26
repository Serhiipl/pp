import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function GET() {
  try {
    const services = await prismadb.services.findMany();
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
