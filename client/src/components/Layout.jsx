import React from "react";
import NavbarComponent from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="pt-16">
        <NavbarComponent />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
