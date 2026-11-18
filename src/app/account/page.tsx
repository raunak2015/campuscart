
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

    // Authentication check and dashboard API call
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

            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
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
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">
                    Checking authentication...
                </p>
            </div>
        );
    }

    if (!user) return null;

    const tabs: {
        name: DashboardTab;
        icon: React.ElementType;
    }[] = [
        { name: "Overview", icon: LayoutDashboard },
        { name: "My Listings", icon: ShoppingBag },
        { name: "My Enquiries", icon: Send },
        { name: "Received Enquiries", icon: Inbox },
        { name: "Profile", icon: UserRound },
    ];

    const statCards = [
        {
            title: "Total Listings",
            value: stats?.totalListings ?? 0,
            icon: Package,
            color: "bg-violet-100 text-violet-700",
        },
        {
            title: "Active Listings",
            value: stats?.activeListings ?? 0,
            icon: CheckCircle2,
            color: "bg-green-100 text-green-700",
        },
        {
            title: "Received Enquiries",
            value: stats?.receivedEnquiries ?? 0,
            icon: Inbox,
            color: "bg-blue-100 text-blue-700",
        },
        {
            title: "My Enquiries",
            value: stats?.myEnquiries ?? 0,
            icon: Send,
            color: "bg-orange-100 text-orange-700",
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Dashboard Header */}
                <div className="mb-8">
                    <p className="font-medium text-violet-700">
                        Student Dashboard
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-gray-900">
                        Welcome back, {user.name}!
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your listings and marketplace activity.
                    </p>
                </div>

                {/* Dashboard Top Navigation */}
                <div className="mb-8 overflow-x-auto border-b border-gray-200">
                    <div className="flex min-w-max gap-6">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.name;

                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`flex items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium transition ${
                                        isActive
                                            ? "border-violet-700 text-violet-700"
                                            : "border-transparent text-gray-500 hover:text-violet-700"
                                    }`}
                                >
                                    <Icon size={17} />
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
                                <h2 className="text-xl font-bold text-gray-900">
                                    Overview
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Here's what's happening with your account.
                                </p>
                            </div>

                            <Link
                                href="/sell"
                                className="flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800"
                            >
                                + Sell Product
                            </Link>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {statCards.map((card) => {
                                const Icon = card.icon;

                                return (
                                    <div
                                        key={card.title}
                                        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    {card.title}
                                                </p>

                                                <h3 className="mt-3 text-3xl font-bold text-gray-900">
                                                    {statsLoading ? "..." : card.value}
                                                </h3>
                                            </div>

                                            <div className={`rounded-xl p-3 ${card.color}`}>
                                                <Icon size={24} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900">
                                Quick Actions
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your CampusCart account quickly.
                            </p>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">

                                <Link
                                    href="/sell"
                                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-violet-300 hover:bg-violet-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Package className="text-violet-700" />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                Sell a Product
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Create a new listing
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={20} />
                                </Link>

                                <Link
                                    href="/marketplace"
                                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-violet-300 hover:bg-violet-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <ShoppingBag className="text-violet-700" />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                Explore Marketplace
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Discover student products
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={20} />
                                </Link>

                            </div>
                        </div>

                        {/* Recent Activity Placeholder */}
                        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="text-violet-700" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Activity
                                </h2>
                            </div>

                            <p className="mt-3 text-sm text-gray-500">
                                Your recent listings and enquiries will appear here.
                            </p>
                        </div>
                    </>
                )}

                {/* Other Tabs - Upcoming Implementation */}
                {activeTab !== "Overview" && (
                    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
                            <LayoutDashboard className="text-violet-700" size={26} />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            {activeTab}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            This section will be implemented in our next milestone.
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}
