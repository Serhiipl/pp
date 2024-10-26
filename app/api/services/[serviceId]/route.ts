import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

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
