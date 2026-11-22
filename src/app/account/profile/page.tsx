"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserRound, Mail, School, Phone, ShieldCheck, ArrowLeft, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user, loading: authLoading, refreshUser } = useAuth();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [college, setCollege] = useState("");

    const [loadingProfile, setLoadingProfile] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (authLoading || !user) return;

        const loadProfile = async () => {
            try {
                setLoadingProfile(true);
                const res = await fetch("/api/auth/profile");
                const data = await res.json();

                if (res.ok && data.user) {
                    setName(data.user.name || "");
                    setPhone(data.user.phone || "");
                    setCollege(data.user.college || "");
                }
            } catch (err) {
                console.error("Error loading profile:", err);
            } finally {
                setLoadingProfile(false);
            }
        };

        loadProfile();
    }, [user, authLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const res = await fetch("/api/auth/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, college }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to update profile");
            }

            setSuccessMessage("Profile updated successfully!");
            await refreshUser();
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (authLoading || loadingProfile) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Loading profile...</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-700 font-semibold mb-4">Please log in to view your profile.</p>
                    <Link href="/login" className="px-5 py-2.5 bg-violet-700 text-white rounded-xl font-medium">
                        Log In
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                {/* Back button */}
                <Link
                    href="/account"
                    className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:underline mb-6"
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm">
                    {/* Header */}
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 font-bold text-2xl">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                                <Mail size={14} /> {user.email}
                            </p>
                            <span className="inline-flex items-center gap-1 mt-2 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 border border-violet-100">
                                <ShieldCheck size={12} /> {user.role === "admin" ? "Administrator" : "Student Member"}
                            </span>
                        </div>
                    </div>

                    {successMessage && (
                        <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
                            <Check size={18} />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <UserRound className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full rounded-xl border border-gray-200 bg-gray-100 pl-10 pr-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-400">Email address cannot be changed.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                College / Campus Name
                            </label>
                            <div className="relative">
                                <School className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                    placeholder="e.g. State Engineering College"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Contact Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="e.g. +91 9876543210"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-violet-800 transition disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
