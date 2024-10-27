import React, { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import useServiceStore from "@/store/serviceStore";

interface FormData {
  name: string;
  description: string;
  price: string;
  time: string;
  active: boolean;
}

const ServiceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    time: "",
    active: true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  const { addService } = useServiceStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price, time, active } = formData;

    if (!name || !description || !price || !time) {
      alert("Please fill in all fields.");
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Cena nie może być 0 czy poniżej.", {
        position: "top-center",
        duration: 2000,
        icon: "⚠️",
        style: {
          background: "coral",
          fontWeight: "normal",
        },
      });
      return;
    }
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: parsedPrice,
          time,
          active,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add service");
      }

      const newService = await response.json();
      addService(newService);

      // Очистка полей формы
      setFormData({
        name: "",
        description: "",
        price: "",
        time: "",
        active: true,
      });

      toast.success("Dodano nową usługe.", {
        duration: 3000,
        position: "top-center",
        icon: "👏",
      });
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full border rounded-md p-4 flex flex-col gap-3 relative"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nazwa usługi:"
          className="w-full md:w-1/2 rounded-sm px-2 py-1 invalid:border-red-400 shadow-md  shadow-red-100 border border-red-100 focus:outline-none focus:border-red-400"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Cena: zł"
          className="w-full md:w-1/4 rounded-sm px-2 py-1 invalid:border-red-400 shadow-md  shadow-red-100 border border-red-100 focus:outline-none focus:border-red-400"
        />
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="Czas realizacji min:"
          className="w-full md:w-1/4 rounded-sm px-2 py-1 invalid:border-red-400 shadow-md  shadow-red-100 border border-red-100 focus:outline-none focus:border-red-400"
        />
      </div>
      <label className="flex items-center">
        <span className="mr-2">Aktywna:</span>
        <input
          name="active"
          type="checkbox"
          checked={formData.active}
          onChange={handleChange}
        />
      </label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Opis usługi..."
        className="w-full rounded-sm px-2 py-1 resize-none  shadow-md  shadow-red-100 border border-red-100 focus:outline-none focus:border-red-400"
        minLength={1}
        maxLength={500}
        required
        rows={4}
      />
      <Button className="w-full sm:w-80 bg-red-200 ml-auto" type="submit">
        Dodaj Usługe!
      </Button>
    </form>
  );
};

export default ServiceForm;
