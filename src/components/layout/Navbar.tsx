"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Sell Product", href: "/sell" },
    { name: "Favorites", href: "/favorites" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-violet-700">
          CampusCart
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-gray-600 transition hover:text-violet-700"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="font-medium text-gray-700 hover:text-violet-700"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-violet-700 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-800"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-medium text-gray-700 hover:text-violet-700"
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-gray-100" />

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg bg-violet-700 px-4 py-2.5 text-center font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
