import React from "react";
import NavbarComponent from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Push everything down by 4rem (navbar height) */}
      <div className="pt-16">
        <NavbarComponent />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
