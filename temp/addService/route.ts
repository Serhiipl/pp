// app/api/services/addService/route.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/db"; // Переконайтеся, що шлях правильний

export async function POST(request: Request) {
  const { name, description, price, time, active } = await request.json();

  if (!name || !description || price == null || !time) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const service = await prismadb.services.create({
      data: {
        name,
        description,
        price,
        time,
        active,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error adding service:", error);
    return NextResponse.json(
      { error: "Failed to add service" },
      { status: 500 }
    );
  }
}
