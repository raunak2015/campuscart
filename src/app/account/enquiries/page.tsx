"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, Clock, CheckCircle2, MessageSquare, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { Enquiry } from "@/types/enquiry";
import type { Product } from "@/types/product";
import { formatDate } from "@/lib/utils";

export default function MyEnquiriesPage() {
    const { user, loading: authLoading } = useAuth();
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchEnquiries = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/enquiries?type=sent");
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

    if (authLoading || loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Loading your enquiries...</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-700 font-semibold mb-4">Please log in to view your enquiries.</p>
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
                            <Send className="text-violet-700" size={28} />
                            My Sent Enquiries
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Track enquiries you have sent to sellers.
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
                        <MessageSquare className="mx-auto text-gray-300 mb-3" size={48} />
                        <h3 className="text-lg font-semibold text-gray-800">No enquiries sent yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            When you reach out to sellers on product pages, your messages will appear here.
                        </p>
                        <Link
                            href="/marketplace"
                            className="mt-5 inline-block rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-800"
                        >
                            Explore Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {enquiries.map((enquiry) => {
                            const product = typeof enquiry.productId === "object" ? (enquiry.productId as Product) : null;
                            const isResponded = enquiry.status === "responded";

                            return (
                                <div
                                    key={enquiry._id}
                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-3 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                To: <span className="font-medium text-gray-700">{enquiry.sellerEmail}</span>
                                            </p>
                                            {product && (
                                                <Link
                                                    href={`/product/${product._id}`}
                                                    className="text-base font-bold text-violet-700 hover:underline"
                                                >
                                                    {product.title}
                                                </Link>
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

                                    <div className="bg-gray-50 rounded-xl p-3.5 text-sm text-gray-700">
                                        <p className="font-medium text-xs text-gray-500 mb-1">Your message:</p>
                                        <p className="whitespace-pre-wrap">{enquiry.message}</p>
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
