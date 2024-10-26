"use client";
import React from "react";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CellActionProps {
  className?: string;
}

const CellAction: React.FC<CellActionProps> = ({ className }) => {
  return (
    <div className={cn("text-gray-400", className)}>
      <Button variant="ghost" className="w-8 h-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal />
      </Button>
    </div>
  );
};

export default CellAction;
