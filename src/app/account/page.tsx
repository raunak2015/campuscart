"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Package,
    CheckCircle2,
    Inbox,
    Send,
    ArrowUpRight,
    LayoutDashboard,
    ShoppingBag,
    MessageSquare,
    UserRound,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

interface DashboardStats {
    totalListings: number;
    activeListings: number;
    receivedEnquiries: number;
    myEnquiries: number;
}

type DashboardTab =
    | "Overview"
    | "My Listings"
    | "My Enquiries"
    | "Received Enquiries"
    | "Profile";

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeTab, setActiveTab] =
        useState<DashboardTab>("Overview");

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.replace("/login");
            return;
        }

        const fetchDashboard = async () => {
            try {
                setStatsLoading(true);
                setError("");

                const response = await fetch("/api/dashboard");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load dashboard"
                    );
                }

                setStats(data.stats);

            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong"
                );
            } finally {
                setStatsLoading(false);
            }
        };

        fetchDashboard();
    }, [user, authLoading, router]);

    if (authLoading || (!user && !error)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-sm font-medium text-[#524B63]">
                    Checking authentication...
                </p>
            </div>
        );
    }

    if (!user) return null;

    const tabs: {
        name: DashboardTab;
        icon: React.ElementType;
        href?: string;
    }[] = [
        { name: "Overview", icon: LayoutDashboard },
        { name: "My Listings", icon: ShoppingBag, href: "/account/listings" },
        { name: "My Enquiries", icon: Send, href: "/account/enquiries" },
        { name: "Received Enquiries", icon: Inbox, href: "/account/received-enquiries" },
        { name: "Profile", icon: UserRound, href: "/account/profile" },
    ];

    const statCards = [
        {
            title: "Total Listings",
            value: stats?.totalListings ?? 0,
            icon: Package,
        },
        {
            title: "Active Listings",
            value: stats?.activeListings ?? 0,
            icon: CheckCircle2,
        },
        {
            title: "Received Enquiries",
            value: stats?.receivedEnquiries ?? 0,
            icon: Inbox,
        },
        {
            title: "My Enquiries",
            value: stats?.myEnquiries ?? 0,
            icon: Send,
        },
    ];

    return (
        <main className="min-h-screen bg-white px-6 py-10">

            <div className="mx-auto max-w-7xl">

                {/* Dashboard Header */}
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#524B63]">
                        Student Dashboard
                    </p>

                    <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#0D0C22]">
                        Welcome back, {user.name}!
                    </h1>

                    <p className="mt-1 text-sm text-[#3D3D4E]">
                        Manage your campus listings and buyer conversations.
                    </p>
                </div>

                {/* Dashboard Top Navigation */}
                <div className="mb-8 overflow-x-auto border-b border-[#E7E7E9]">
                    <div className="flex min-w-max gap-6">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.name;

                            if (tab.href) {
                                return (
                                    <Link
                                        key={tab.name}
                                        href={tab.href}
                                        className="flex items-center gap-2 border-b-2 border-transparent px-1 pb-3 text-sm font-semibold text-[#524B63] transition hover:text-[#0D0C22]"
                                    >
                                        <Icon size={16} />
                                        {tab.name}
                                    </Link>
                                );
                            }

                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition ${
                                        isActive
                                            ? "border-[#0D0C22] text-[#0D0C22]"
                                            : "border-transparent text-[#524B63] hover:text-[#0D0C22]"
                                    }`}
                                >
                                    <Icon size={16} />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Overview Content */}
                {activeTab === "Overview" && (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-[#0D0C22]">
                                    Account Summary
                                </h2>
                                <p className="text-xs text-[#524B63]">
                                    Here&apos;s what&apos;s happening with your account.
                                </p>
                            </div>

                            <Link
                                href="/sell"
                                className="flex items-center gap-2 rounded-full bg-[#0D0C22] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3A3546]"
                            >
                                + List a Product
                            </Link>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Statistics Cards - Flat Dribbble style */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            {statCards.map((card) => {
                                const Icon = card.icon;

                                return (
                                    <div
                                        key={card.title}
                                        className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-5 transition hover:border-[#0D0C22]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-semibold text-[#524B63]">
                                                    {card.title}
                                                </p>

                                                <h3 className="mt-2 text-2xl font-bold text-[#0D0C22]">
                                                    {statsLoading ? "..." : card.value}
                                                </h3>
                                            </div>

                                            <div className="rounded-full border border-[#E7E7E9] bg-white p-2.5 text-[#0D0C22]">
                                                <Icon size={20} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 rounded-xl border border-[#E7E7E9] bg-white p-6">
                            <h2 className="text-base font-bold text-[#0D0C22]">
                                Quick Actions
                            </h2>

                            <p className="text-xs text-[#524B63] mt-0.5">
                                Common tasks and navigation shortcuts.
                            </p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">

                                <Link
                                    href="/sell"
                                    className="flex items-center justify-between rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-4 transition hover:border-[#0D0C22]"
                                >
                                    <div className="flex items-center gap-3">
                                        <Package className="text-[#0D0C22]" size={20} />
                                        <div>
                                            <p className="text-sm font-bold text-[#0D0C22]">
                                                Sell a Product
                                            </p>
                                            <p className="text-xs text-[#524B63]">
                                                Create a new listing
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={18} className="text-[#524B63]" />
                                </Link>

                                <Link
                                    href="/marketplace"
                                    className="flex items-center justify-between rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-4 transition hover:border-[#0D0C22]"
                                >
                                    <div className="flex items-center gap-3">
                                        <ShoppingBag className="text-[#0D0C22]" size={20} />
                                        <div>
                                            <p className="text-sm font-bold text-[#0D0C22]">
                                                Explore Marketplace
                                            </p>
                                            <p className="text-xs text-[#524B63]">
                                                Discover student items
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={18} className="text-[#524B63]" />
                                </Link>

                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-6 rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-6">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="text-[#0D0C22]" size={18} />
                                <h2 className="text-sm font-bold text-[#0D0C22]">
                                    Activity & Updates
                                </h2>
                            </div>

                            <p className="mt-1 text-xs text-[#524B63]">
                                You have {stats?.activeListings ?? 0} active listing(s) and {stats?.receivedEnquiries ?? 0} received inquiry messages.
                            </p>
                        </div>
                    </>
                )}

            </div>
        </main>
    );
}
