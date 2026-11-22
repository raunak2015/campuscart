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
            <main className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-sm font-medium text-[#524B63]">Loading your enquiries...</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm font-semibold text-[#0D0C22] mb-3">Please log in to view your enquiries.</p>
                    <Link href="/login" className="px-5 py-2.5 bg-[#0D0C22] text-white rounded-full text-xs font-semibold">
                        Log In
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white px-6 py-10">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/account"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#524B63] hover:text-[#0D0C22] mb-3"
                    >
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-extrabold tracking-tight text-[#0D0C22] flex items-center gap-2">
                        <Send className="text-[#0D0C22]" size={24} />
                        My Sent Enquiries
                    </h1>
                    <p className="mt-1 text-sm text-[#3D3D4E]">
                        Track enquiries and questions you have sent to sellers.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {enquiries.length === 0 ? (
                    <div className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-12 text-center">
                        <MessageSquare className="mx-auto text-[#524B63] mb-3" size={36} />
                        <h3 className="text-base font-bold text-[#0D0C22]">No enquiries sent yet</h3>
                        <p className="mt-1 text-xs text-[#524B63]">
                            When you reach out to sellers on product pages, your messages will appear here.
                        </p>
                        <Link
                            href="/marketplace"
                            className="mt-5 inline-block rounded-full bg-[#0D0C22] px-5 py-2 text-xs font-semibold text-white hover:bg-[#3A3546]"
                        >
                            Explore Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {enquiries.map((enquiry) => {
                            const product = typeof enquiry.productId === "object" ? (enquiry.productId as Product) : null;
                            const isResponded = enquiry.status === "responded";

                            return (
                                <div
                                    key={enquiry._id}
                                    className="rounded-xl border border-[#E7E7E9] bg-white p-5 transition hover:border-[#0D0C22]"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E7E7E9] pb-3 mb-3">
                                        <div>
                                            <p className="text-[11px] font-medium text-[#524B63]">
                                                To: <span className="font-semibold text-[#0D0C22]">{enquiry.sellerEmail}</span>
                                            </p>
                                            {product && (
                                                <Link
                                                    href={`/product/${product._id}`}
                                                    className="text-sm font-bold text-[#0D0C22] hover:underline"
                                                >
                                                    {product.title}
                                                </Link>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                                                    isResponded
                                                        ? "border-green-200 bg-green-50 text-green-700"
                                                        : "border-[#E7E7E9] bg-[#F8F7F4] text-[#0D0C22]"
                                                }`}
                                            >
                                                {isResponded ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                                {isResponded ? "Responded" : "Pending"}
                                            </span>
                                            <span className="text-[11px] text-[#524B63]">
                                                {formatDate(enquiry.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-[#F8F7F4] rounded-lg p-3 text-xs text-[#060318]">
                                        <p className="whitespace-pre-wrap leading-relaxed">{enquiry.message}</p>
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
