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
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
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

        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to delete product"
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleMarkSold = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to mark this product as sold?"
        );

        if (!confirmed) return;

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
                    data.message || "Failed to update product status"
                );
            }

            setProducts((prev) =>
                prev.map((product) =>
                    product._id === id
                        ? { ...product, status: "sold" }
                        : product
                )
            );

        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">
                    Loading your listings...
                </p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="font-medium text-violet-700">
                            Account / My Listings
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-gray-900">
                            My Listings
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Manage all the products you have listed.
                        </p>
                    </div>

                    <Link
                        href="/sell"
                        className="flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800"
                    >
                        <Plus size={19} />
                        Add New Product
                    </Link>
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                        {error}
                    </div>
                )}

                {/* Statistics */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {[
                        {
                            title: "Total Listings",
                            value: totalListings,
                            icon: Package,
                            color: "bg-violet-100 text-violet-700",
                        },
                        {
                            title: "Available",
                            value: availableListings,
                            icon: CheckCircle2,
                            color: "bg-green-100 text-green-700",
                        },
                        {
                            title: "Sold",
                            value: soldListings,
                            icon: CheckCircle2,
                            color: "bg-blue-100 text-blue-700",
                        },
                        {
                            title: "Reserved",
                            value: reservedListings,
                            icon: Clock,
                            color: "bg-orange-100 text-orange-700",
                        },
                    ].map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {stat.title}
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                            {stat.value}
                                        </h2>
                                    </div>

                                    <div className={`rounded-xl p-3 ${stat.color}`}>
                                        <Icon size={24} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* Filter Tabs */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
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
                            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${activeFilter === filter.value
                                ? "bg-violet-700 text-white"
                                : "border border-gray-200 bg-white text-gray-600 hover:border-violet-300"
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="mt-8 rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
                        <Package
                            size={45}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="mt-4 text-xl font-bold text-gray-900">
                            No listings found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            {activeFilter === "all"
                                ? "You haven't listed any products yet."
                                : `You don't have any ${activeFilter} listings.`}
                        </p>

                        <Link
                            href="/sell"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-700 px-5 py-3 font-semibold text-white hover:bg-violet-800"
                        >
                            <Plus size={18} />
                            Create Your First Listing
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                {/* Product Image */}
                                <div className="relative h-52 bg-gray-100">
                                    {product.images?.[0] ? (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}

                                    <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${product.status === "available"
                                        ? "bg-green-100 text-green-700"
                                        : product.status === "sold"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-orange-100 text-orange-700"
                                        }`}>
                                        {product.status}
                                    </span>
                                </div>

                                {/* Product Details */}
                                <div className="p-5">

                                    <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">
                                        {product.category}
                                    </p>

                                    <h3 className="mt-2 truncate text-lg font-bold text-gray-900">
                                        {product.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {product.condition}
                                    </p>

                                    <p className="mt-3 text-xl font-bold text-gray-900">
                                        {product.listingType === "free"
                                            ? "FREE"
                                            : `₹${product.price}`}
                                    </p>

                                    {/* Actions */}
                                    <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">

                                        <Link
                                            href={`/product/${product._id}`}
                                            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            <ExternalLink size={15} />
                                            View
                                        </Link>

                                        <button
                                            disabled
                                            title="Edit feature coming next"
                                            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-violet-50 py-2 text-sm font-medium text-violet-700 opacity-60"
                                        >
                                            <Pencil size={15} />
                                            Edit
                                        </button>
                                        {product.status === "available" && (
                                            <button
                                                onClick={() => handleMarkSold(product._id)}
                                                disabled={updatingId === product._id}
                                                className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-green-50 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                                            >
                                                <CheckCircle2 size={15} />
                                                {updatingId === product._id ? "Updating..." : "Sold"}
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            disabled={deletingId === product._id}
                                            className="flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                            title="Delete listing"
                                        >
                                            <Trash2 size={17} />
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
