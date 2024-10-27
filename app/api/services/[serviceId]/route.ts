import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const body = await request.json();
    const { name, description, price, time, active } = body;

    if (!name || !description || price == null || !time) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const service = await prismadb.services.update({
      where: { serviceId: params.serviceId },
      data: { name, description, price, time, active },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const { serviceId } = params;

    if (!serviceId) {
      return NextResponse.json("Service ID is required", { status: 400 });
    }

    const service = await prismadb.services.delete({
      where: { serviceId },
    });

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
