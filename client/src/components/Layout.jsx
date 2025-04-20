import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0a0f1a] to-[#1e293b] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent opacity-50"></div>
      </div>
      <Navbar />
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </div>
  );
}
