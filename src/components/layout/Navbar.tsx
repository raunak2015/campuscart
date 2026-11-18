
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Menu,
    X,
    UserRound,
    LayoutDashboard,
    Package,
    MessageSquare,
    Inbox,
    ChevronDown,
    LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    const router = useRouter();
    const { user, loading, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
        setIsAccountOpen(false);
        router.push("/login");
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Marketplace", href: "/marketplace" },
        { name: "Sell Product", href: "/sell" },
        { name: "Favorites", href: "/favorites" },
    ];

    const accountLinks = [
        {
            name: "My Account",
            href: "/account",
            icon: LayoutDashboard,
        },
        {
            name: "My Listings",
            href: "/account/listings",
            icon: Package,
        },
        {
            name: "My Enquiries",
            href: "/account/enquiries",
            icon: MessageSquare,
        },
        {
            name: "Received Enquiries",
            href: "/account/received-enquiries",
            icon: Inbox,
        },
        {
            name: "Profile",
            href: "/account/profile",
            icon: UserRound,
        },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-violet-700"
                >
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

                {/* Desktop Auth */}
                <div className="hidden items-center gap-4 md:flex">
                    {loading ? (
                        <span className="text-sm text-gray-400">
                            Loading...
                        </span>
                    ) : user ? (
                        <div className="relative">

                            {/* Account Button */}
                            <button
                                onClick={() =>
                                    setIsAccountOpen(!isAccountOpen)
                                }
                                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 transition hover:border-violet-300 hover:bg-violet-50"
                            >
                                <UserRound
                                    size={19}
                                    className="text-violet-700"
                                />

                                <span className="font-semibold text-gray-700">
                                    Account
                                </span>

                                <ChevronDown
                                    size={16}
                                    className={`text-gray-500 transition ${
                                        isAccountOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Account Dropdown */}
                            {isAccountOpen && (
                                <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">

                                    <div className="border-b border-gray-100 px-4 py-3">
                                        <p className="font-semibold text-gray-900">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>

                                    {accountLinks.map((link) => {
                                        const Icon = link.icon;

                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() =>
                                                    setIsAccountOpen(false)
                                                }
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-violet-50 hover:text-violet-700"
                                            >
                                                <Icon size={18} />
                                                {link.name}
                                            </Link>
                                        );
                                    })}

                                    <div className="mt-1 border-t border-gray-100 pt-1">
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>
                    ) : (
                        <>
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

                        <div className="border-t border-gray-100 pt-4">

                            {loading ? (
                                <span className="text-sm text-gray-400">
                                    Loading...
                                </span>
                            ) : user ? (
                                <>
                                    <div className="mb-3">
                                        <p className="font-semibold text-gray-900">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>

                                    {accountLinks.map((link) => {
                                        const Icon = link.icon;

                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                                className="flex items-center gap-3 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                                            >
                                                <Icon size={18} />
                                                {link.name}
                                            </Link>
                                        );
                                    })}

                                    <button
                                        onClick={handleLogout}
                                        className="mt-2 flex w-full items-center gap-3 border-t border-gray-100 pt-4 text-left font-medium text-red-600"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2 font-medium text-gray-700"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/signup"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="mt-2 block rounded-lg bg-violet-700 px-4 py-2.5 text-center font-semibold text-white"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
