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
            <main className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-sm font-medium text-[#524B63]">Loading profile...</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm font-semibold text-[#0D0C22] mb-3">Please log in to view your profile.</p>
                    <Link href="/login" className="px-5 py-2.5 bg-[#0D0C22] text-white rounded-full text-xs font-semibold">
                        Log In
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white px-6 py-10">
            <div className="mx-auto max-w-2xl">
                {/* Back button */}
                <Link
                    href="/account"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#524B63] hover:text-[#0D0C22] mb-4"
                >
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>

                <div className="rounded-2xl border border-[#E7E7E9] bg-white p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 border-b border-[#E7E7E9] pb-6 mb-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F7F4] border border-[#E7E7E9] text-[#0D0C22] font-bold text-xl">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[#0D0C22]">{user.name}</h1>
                            <p className="text-xs text-[#524B63] flex items-center gap-1.5 mt-0.5">
                                <Mail size={13} /> {user.email}
                            </p>
                            <span className="inline-flex items-center gap-1 mt-1.5 rounded-full bg-[#F8F7F4] px-2.5 py-0.5 text-[11px] font-semibold text-[#0D0C22] border border-[#E7E7E9]">
                                <ShieldCheck size={12} /> {user.role === "admin" ? "Administrator" : "Student Member"}
                            </span>
                        </div>
                    </div>

                    {successMessage && (
                        <div className="mb-5 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 p-3 text-xs font-semibold text-green-700">
                            <Check size={15} />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-600">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#0D0C22] mb-1.5">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <UserRound className="absolute left-3.5 top-3 text-[#524B63]" size={16} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] pl-10 pr-4 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#0D0C22] mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-3 text-[#524B63]" size={16} />
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full rounded-lg border border-[#E7E7E9] bg-[#ECEBF0] pl-10 pr-4 py-2.5 text-sm text-[#524B63] cursor-not-allowed"
                                />
                            </div>
                            <p className="mt-1 text-[11px] text-[#524B63]">College email address cannot be changed.</p>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#0D0C22] mb-1.5">
                                College / Campus Name
                            </label>
                            <div className="relative">
                                <School className="absolute left-3.5 top-3 text-[#524B63]" size={16} />
                                <input
                                    type="text"
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                    placeholder="e.g. State Engineering College"
                                    className="w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] pl-10 pr-4 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#0D0C22] mb-1.5">
                                Contact Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-3 text-[#524B63]" size={16} />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="e.g. +91 9876543210"
                                    className="w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] pl-10 pr-4 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-2 rounded-full bg-[#0D0C22] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#3A3546] transition disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
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
