"use client";
import React from "react";
import ServiceForm from "./serviceForm";

const AddService: React.FC = () => {
  return (
    <div className="w-full bg-slate-100 py-5 px-6 text-zinc-600">
      <h1 className="text-2xl my-4 font-sans">Dodaj nową usługe</h1>
      <ServiceForm />
    </div>
  );
};

export default AddService;
