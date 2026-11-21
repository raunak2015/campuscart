"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, CheckCircle2, Clock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { Enquiry } from "@/types/enquiry";
import type { Product } from "@/types/product";
import { formatDate } from "@/lib/utils";

export default function ReceivedEnquiriesPage() {
    const { user, loading: authLoading } = useAuth();
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchEnquiries = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/enquiries?type=received");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to load enquiries");
                }

                setEnquiries(data.enquiries || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, [user, authLoading]);

    const handleToggleStatus = async (enquiry: Enquiry) => {
        const nextStatus = enquiry.status === "pending" ? "responded" : "pending";
        try {
            setUpdatingId(enquiry._id);
            const res = await fetch("/api/enquiries", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: enquiry._id,
                    status: nextStatus,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to update status");
            }

            setEnquiries((prev) =>
                prev.map((item) =>
                    item._id === enquiry._id ? { ...item, status: nextStatus } : item
                )
            );
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    if (authLoading || loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Loading received enquiries...</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-700 font-semibold mb-4">Please log in to view received enquiries.</p>
                    <Link href="/login" className="px-5 py-2.5 bg-violet-700 text-white rounded-xl font-medium">
                        Log In
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link
                            href="/account"
                            className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:underline mb-2"
                        >
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Inbox className="text-violet-700" size={28} />
                            Received Enquiries
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Messages from buyers interested in your listings.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {enquiries.length === 0 ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                        <Inbox className="mx-auto text-gray-300 mb-3" size={48} />
                        <h3 className="text-lg font-semibold text-gray-800">No buyer enquiries yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            When students reach out about your listed items, their enquiries will appear here.
                        </p>
                        <Link
                            href="/sell"
                            className="mt-5 inline-block rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-800"
                        >
                            Create a Listing
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {enquiries.map((enquiry) => {
                            const product = typeof enquiry.productId === "object" ? (enquiry.productId as Product) : null;
                            const isResponded = enquiry.status === "responded";
                            const isUpdating = updatingId === enquiry._id;

                            return (
                                <div
                                    key={enquiry._id}
                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-3 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                From:{" "}
                                                <span className="font-semibold text-gray-900">
                                                    {enquiry.buyerName}
                                                </span>{" "}
                                                ({enquiry.buyerEmail})
                                            </p>
                                            {product && (
                                                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                                                    Item:{" "}
                                                    <Link
                                                        href={`/product/${product._id}`}
                                                        className="text-violet-700 hover:underline"
                                                    >
                                                        {product.title}
                                                    </Link>
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                                    isResponded
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-amber-100 text-amber-700"
                                                }`}
                                            >
                                                {isResponded ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                                                {isResponded ? "Responded" : "Pending"}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {formatDate(enquiry.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-3.5 text-sm text-gray-700 mb-4">
                                        <p className="whitespace-pre-wrap">{enquiry.message}</p>
                                    </div>

                                    <div className="flex items-center justify-end gap-3">
                                        <a
                                            href={`mailto:${enquiry.buyerEmail}?subject=Regarding your enquiry for ${product ? product.title : "CampusCart listing"}`}
                                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            <Mail size={14} /> Reply via Email
                                        </a>

                                        <button
                                            onClick={() => handleToggleStatus(enquiry)}
                                            disabled={isUpdating}
                                            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-white transition ${
                                                isResponded
                                                    ? "bg-amber-600 hover:bg-amber-700"
                                                    : "bg-green-600 hover:bg-green-700"
                                            } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            {isUpdating
                                                ? "Updating..."
                                                : isResponded
                                                ? "Mark as Pending"
                                                : "Mark as Responded"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
