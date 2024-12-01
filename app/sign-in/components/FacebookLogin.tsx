import { Facebook } from "lucide-react";
import React from "react";

const FacebookLogin = () => {
  return (
    <div className="w-full flex items-center justify-center rounded-2xl bg-blue-800 mt-6 h-12 p-4 hover:cursor-pointer gap-8">
      <Facebook className="w-6 h-6 text-white" />
      <p className="text-white text-xl font-normal">Sign In with Facebook</p>
    </div>
  );
};

export default FacebookLogin;
