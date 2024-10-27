"use client";
import React, { useState } from "react";
import useServiceStore, { ServiceProps } from "@/store/serviceStore";
import { Button } from "./ui/button";
import { LucideEdit3, MoreHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AlertModal } from "./modals/alertModal";
// import useServiceStore from "@/store/serviceStore"; // Импортируем store
import toast from "react-hot-toast";
import { ServiceChangeModal } from "./modals/serviceModal";

interface CellActionProps {
  className?: string;
  data: ServiceProps;
}

const CellAction: React.FC<CellActionProps> = ({ className, data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // Для управления редактирования
  const deleteService = useServiceStore((state) => state.deleteService);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteService(data.serviceId);
      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className={cn("text-gray-400", className)}>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
      <ServiceChangeModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        serviceData={data}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opcje</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <LucideEdit3 className="mr-2 h-4 w-4" />
            Edycja usługi...
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Usunięcie usługi...
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;
