import React from "react";
import AddService from "../../components/addService";
import ShowServices from "../../components/showServices";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const AddServicePage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <div>
      <AddService />
      <ShowServices />
    </div>
  );
};

export default AddServicePage;
