// src/components/Navbar.jsx

import React from "react";
import "./Navbar.css";

import {
  Navbar as MaterialNavbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NavbarComponent() {
  const [openNav, setOpenNav] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    const handler = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const items = [
    { label: "Home", to: "/" },
    { label: "Upload", to: "/upload" },
    { label: "Chat", to: "/chat" },
    { label: "Phishing", to: "/phishing" },
    { label: "My Files", to: "/my-files" },
  ];

  // Mobile menu: vertical list with 1rem gaps
  const mobileNavList = (
    <ul className="flex flex-col space-y-4 p-4">
      {items.map(({ label, to }) => (
        <li key={to}>
          <Link
            to={to}
            className={`block px-3 py-2 rounded-md text-lg font-medium transition-colors ${
              pathname === to
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );

  // Desktop menu: horizontal, centered, with 3rem gaps
  const desktopNavList = (
    <ul className="flex items-center space-x-12">
      {items.map(({ label, to }) => (
        <li key={to}>
          <Link
            to={to}
            className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
              pathname === to
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <MaterialNavbar className="mt-navbar fixed top-0 inset-x-0 z-50 bg-black text-gray-100">
      <div className="max-w-7xl mx-auto flex items-start px-4 py-4">
        <div className="w-1/4 flex justify-end items-start pl-4 pt-2">
          <Typography
            as={Link}
            to="/"
            className="text-2xl font-bold text-[#800020]"
          >
            SHADOWSEC
          </Typography>
        </div>

        {/* Centered desktop links */}
        <div className="hidden lg:flex flex-1 justify-center">
          {desktopNavList}
        </div>

        {/* Hamburger toggle on mobile */}
      </div>

      {/* Mobile dropdown menu */}
      <MobileNav open={openNav} className="lg:hidden bg-black">
        {mobileNavList}
      </MobileNav>
    </MaterialNavbar>
  );
}
