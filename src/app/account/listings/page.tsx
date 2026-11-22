"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Package,
    CheckCircle2,
    Clock,
    Plus,
    Pencil,
    Trash2,
    ExternalLink,
    ArrowLeft,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/types/product";

type FilterType = "all" | "available" | "sold" | "reserved";

export default function MyListingsPage() {
    const { user, loading: authLoading } = useAuth();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeFilter, setActiveFilter] =
        useState<FilterType>("all");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchListings = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "/api/products/my-listings"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch listings"
                    );
                }

                setProducts(data.products);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [user, authLoading]);

    const filteredProducts = useMemo(() => {
        if (activeFilter === "all") return products;

        return products.filter(
            (product) => product.status === activeFilter
        );
    }, [products, activeFilter]);

    const totalListings = products.length;

    const availableListings = products.filter(
        (product) => product.status === "available"
    ).length;

    const soldListings = products.filter(
        (product) => product.status === "sold"
    ).length;

    const reservedListings = products.filter(
        (product) => product.status === "reserved"
    ).length;

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);

            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete product"
                );
            }

            setProducts((prev) =>
                prev.filter((product) => product._id !== id)
            );

        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleMarkSold = async (id: string) => {
        try {
            setUpdatingId(id);

            const response = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "sold",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update product"
                );
            }

            setProducts((prev) =>
                prev.map((product) =>
                    product._id === id
                        ? { ...product, status: "sold" }
                        : product
                )
            );

        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-sm font-medium text-[#524B63]">
                    Loading your listings...
                </p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-white px-6 py-10">

            <div className="mx-auto max-w-7xl">

                {/* Back button */}
                <Link
                    href="/account"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#524B63] hover:text-[#0D0C22] mb-4"
                >
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>

                {/* Page Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-[#0D0C22]">
                            My Listings
                        </h1>

                        <p className="mt-1 text-sm text-[#3D3D4E]">
                            Manage all products you have listed for sale or exchange.
                        </p>
                    </div>

                    <Link
                        href="/sell"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D0C22] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3A3546]"
                    >
                        <Plus size={16} />
                        Add New Product
                    </Link>
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {/* Statistics Cards */}
                <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

                    {[
                        {
                            title: "Total Listings",
                            value: totalListings,
                            icon: Package,
                        },
                        {
                            title: "Available",
                            value: availableListings,
                            icon: CheckCircle2,
                        },
                        {
                            title: "Sold",
                            value: soldListings,
                            icon: CheckCircle2,
                        },
                        {
                            title: "Reserved",
                            value: reservedListings,
                            icon: Clock,
                        },
                    ].map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-[#524B63]">
                                            {stat.title}
                                        </p>

                                        <h2 className="mt-1 text-xl font-bold text-[#0D0C22]">
                                            {stat.value}
                                        </h2>
                                    </div>

                                    <div className="rounded-full border border-[#E7E7E9] bg-white p-2 text-[#0D0C22]">
                                        <Icon size={16} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* Filter Tabs - Dribbble Pill Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                    {[
                        { label: "All", value: "all" },
                        { label: "Available", value: "available" },
                        { label: "Sold", value: "sold" },
                        { label: "Reserved", value: "reserved" },
                    ].map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() =>
                                setActiveFilter(filter.value as FilterType)
                            }
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                                activeFilter === filter.value
                                    ? "bg-[#0D0C22] text-white"
                                    : "border border-[#E7E7E9] bg-[#F8F7F4] text-[#3D3D4E] hover:border-[#0D0C22]"
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] px-6 py-14 text-center">
                        <Package
                            size={40}
                            className="mx-auto text-[#524B63]"
                        />

                        <h2 className="mt-3 text-base font-bold text-[#0D0C22]">
                            No listings found
                        </h2>

                        <p className="mt-1 text-xs text-[#524B63]">
                            {activeFilter === "all"
                                ? "You haven't listed any products yet."
                                : `You don't have any ${activeFilter} listings.`}
                        </p>

                        <Link
                            href="/sell"
                            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#0D0C22] px-5 py-2 text-xs font-semibold text-white hover:bg-[#3A3546]"
                        >
                            <Plus size={15} />
                            Create Your First Listing
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="overflow-hidden rounded-xl border border-[#E7E7E9] bg-white transition hover:border-[#0D0C22]"
                            >

                                {/* Product Image */}
                                <div className="relative h-48 bg-[#F8F7F4]">
                                    {product.images?.[0] ? (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-xs text-[#524B63]">
                                            No Image
                                        </div>
                                    )}

                                    <span className={`absolute right-3 top-3 rounded-full border border-[#E7E7E9] bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                                        product.status === "available"
                                            ? "text-[#0D0C22]"
                                            : product.status === "sold"
                                            ? "text-[#524B63]"
                                            : "text-amber-700"
                                    }`}>
                                        {product.status}
                                    </span>
                                </div>

                                {/* Product Details */}
                                <div className="p-4">

                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#524B63]">
                                        {product.category}
                                    </p>

                                    <h3 className="mt-1 truncate text-base font-bold text-[#0D0C22]">
                                        {product.title}
                                    </h3>

                                    <p className="mt-0.5 text-xs text-[#524B63]">
                                        {product.condition}
                                    </p>

                                    <p className="mt-2.5 text-lg font-bold text-[#0D0C22]">
                                        {product.listingType === "free"
                                            ? "FREE"
                                            : `₹${product.price}`}
                                    </p>

                                    {/* Actions */}
                                    <div className="mt-4 flex items-center gap-2 border-t border-[#E7E7E9] pt-3">

                                        <Link
                                            href={`/product/${product._id}`}
                                            className="flex flex-1 items-center justify-center gap-1 rounded-full border border-[#E7E7E9] py-1.5 text-xs font-semibold text-[#0D0C22] hover:bg-[#F8F7F4]"
                                        >
                                            <ExternalLink size={13} />
                                            View
                                        </Link>

                                        <button
                                            disabled
                                            title="Edit feature coming next"
                                            className="flex flex-1 items-center justify-center gap-1 rounded-full border border-[#E7E7E9] bg-[#F8F7F4] py-1.5 text-xs font-semibold text-[#524B63] opacity-60"
                                        >
                                            <Pencil size={13} />
                                            Edit
                                        </button>

                                        {product.status === "available" && (
                                            <button
                                                onClick={() => handleMarkSold(product._id)}
                                                disabled={updatingId === product._id}
                                                className="flex flex-1 items-center justify-center gap-1 rounded-full border border-green-200 bg-green-50 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                                            >
                                                <CheckCircle2 size={13} />
                                                {updatingId === product._id ? "..." : "Sold"}
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            disabled={deletingId === product._id}
                                            className="flex items-center justify-center rounded-full border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                            title="Delete listing"
                                        >
                                            <Trash2 size={15} />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
}
