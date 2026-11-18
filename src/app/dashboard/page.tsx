"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Loading Dashboard...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-7xl">

                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome, {user.name}!
                </h1>

                <p className="mt-2 text-gray-500">
                    Welcome to your CampusCart Dashboard.
                </p>

            </div>
        </main>
    );
}
