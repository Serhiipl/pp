import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, time, active } = body;
    // na przyszłość kiedy dodam autoryzacje

    //  const { userId } = auth();
    //  if (!userId) {
    //    return new NextResponse("Unauthenticated", { status: 401 });
    //  }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (price == null) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!time) {
      return new NextResponse("Time is required", { status: 400 });
    }
    // Tworzenie nowego zapisu w bazie danych
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
    return new NextResponse("Failed to add service, Internal server error", {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const services = await prismadb.services.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const body = await request.json();
    const { name, description, price, time, active } = body;

    // na przyszłość kiedy dodam autoryzacje

    //  const { userId } = auth();
    //  if (!userId) {
    //    return new NextResponse("Unauthenticated", { status: 401 });
    //  }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (price == null) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!time) {
      return new NextResponse("Time is required", { status: 400 });
    }
    // aktualizujemy usługę za pomocą serviceId z params
    const service = await prismadb.services.update({
      where: {
        serviceId: params.serviceId,
      },
      data: {
        name,
        description,
        price,
        time,
        active,
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.log("[Błąd przy zmianie usługi", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    if (!params.serviceId) {
      return new NextResponse("Service id is required", { status: 400 });
    }
    const service = await prismadb.services.delete({
      where: { serviceId: params.serviceId },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.log("[Błąd przy kasowaniu usługi", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
