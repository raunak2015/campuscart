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
        { name: "Home", href: "/marketplace" },
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
        <nav className="sticky top-0 z-50 border-b border-[#E7E7E9] bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo with Dribbble-style branding */}
                <Link
                    href="/marketplace"
                    className="flex items-center gap-1 text-xl font-bold tracking-tight text-[#0D0C22]"
                >
                    CampusCart
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EA4C89]"></span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-7 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[14px] font-medium text-[#3D3D4E] transition hover:text-[#0D0C22]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth */}
                <div className="hidden items-center gap-3 md:flex">
                    {loading ? (
                        <span className="text-sm text-[#524B63]">
                            Loading...
                        </span>
                    ) : user ? (
                        <div className="relative">

                            {/* Account Button */}
                            <button
                                onClick={() =>
                                    setIsAccountOpen(!isAccountOpen)
                                }
                                className="flex items-center gap-2 rounded-full border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-2 text-sm font-semibold text-[#0D0C22] transition hover:bg-[#ECEBF0]"
                            >
                                <UserRound
                                    size={16}
                                    className="text-[#0D0C22]"
                                />

                                <span>
                                    {user.name.split(" ")[0]}
                                </span>

                                <ChevronDown
                                    size={14}
                                    className={`text-[#524B63] transition ${
                                        isAccountOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Account Dropdown */}
                            {isAccountOpen && (
                                <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-xl border border-[#E7E7E9] bg-white py-1.5 shadow-lg">

                                    <div className="border-b border-[#E7E7E9] px-4 py-3 bg-[#F8F7F4]">
                                        <p className="font-semibold text-sm text-[#0D0C22]">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-xs text-[#524B63]">
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
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#3D3D4E] transition hover:bg-[#F8F7F4] hover:text-[#0D0C22]"
                                            >
                                                <Icon size={16} />
                                                {link.name}
                                            </Link>
                                        );
                                    })}

                                    <div className="mt-1 border-t border-[#E7E7E9] pt-1">
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2.5">
                            <Link
                                href="/login"
                                className="rounded-full px-4 py-2 text-sm font-semibold text-[#0D0C22] transition hover:text-[#3D3D4E]"
                            >
                                Log in
                            </Link>

                            <Link
                                href="/signup"
                                className="rounded-full bg-[#0D0C22] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3A3546]"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-lg p-2 text-[#0D0C22] hover:bg-[#F8F7F4] md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-[#E7E7E9] bg-white px-5 py-4 md:hidden">
                    <div className="flex flex-col gap-3">

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm font-semibold text-[#3D3D4E] hover:text-[#0D0C22]"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="border-t border-[#E7E7E9] pt-3">

                            {loading ? (
                                <span className="text-xs text-[#524B63]">
                                    Loading...
                                </span>
                            ) : user ? (
                                <>
                                    <div className="mb-3 rounded-lg bg-[#F8F7F4] p-3">
                                        <p className="font-semibold text-sm text-[#0D0C22]">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-[#524B63]">
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
                                                className="flex items-center gap-2.5 py-2 text-sm font-medium text-[#3D3D4E] hover:text-[#0D0C22]"
                                            >
                                                <Icon size={16} />
                                                {link.name}
                                            </Link>
                                        );
                                    })}

                                    <button
                                        onClick={handleLogout}
                                        className="mt-2 flex w-full items-center gap-2 border-t border-[#E7E7E9] pt-3 text-left text-sm font-semibold text-red-600"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-2 pt-1">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="rounded-full border border-[#E7E7E9] py-2.5 text-center text-sm font-semibold text-[#0D0C22]"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href="/signup"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="rounded-full bg-[#0D0C22] py-2.5 text-center text-sm font-semibold text-white"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
