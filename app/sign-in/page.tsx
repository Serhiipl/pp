"use client";

import React from "react";
import FacebookLogin from "./components/FacebookLogin";

const SignIn = () => {
  return (
    <div className="w-full flex justify-center mt-20">
      <div className="flex flex-col w-[400px]">
        <h1 className="text-4xl text-center w-full font-bold mb-10 text-black/70">
          Sign In
        </h1>
        <FacebookLogin />
      </div>
    </div>
  );
};

export default SignIn;
