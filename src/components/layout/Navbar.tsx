"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { user, loading, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
        router.push("/login");
    };

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
                    {loading ? (
                        <span className="text-sm text-gray-400">Loading...</span>
                    ) : user ? (
                        <>
                            <span className="font-medium text-gray-700">
                                Hi, {user.name}
                            </span>

                            <Link
                                href="/dashboard"
                                className="rounded-lg bg-violet-700 px-4 py-2.5 font-semibold text-white"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="font-medium text-red-600 hover:text-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>

                            <Link
                                href="/signup"
                                className="rounded-lg bg-violet-700 px-5 py-2.5 font-semibold text-white"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
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

                        {loading ? (
                            <span className="text-sm text-gray-400">Loading...</span>
                        ) : user ? (
                            <>
                                <p className="font-medium text-gray-700">
                                    Hi, {user.name}
                                </p>

                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-lg bg-violet-700 px-4 py-2.5 text-center font-semibold text-white"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="text-left font-medium text-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
