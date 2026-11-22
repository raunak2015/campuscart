"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/marketplace/ProductCard";
import type { Product } from "@/types/product";

export default function MarketplacePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [listingType, setListingType] = useState("All");

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || product.category === category;

        const matchesListingType =
            listingType === "All" ||
            product.listingType === listingType;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesListingType
        );
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: Product[] = await response.json();
                setProducts(data);
            } catch {
                setError("Unable to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">

            {/* Page Heading */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#0D0C22]">
                    Explore Marketplace
                </h1>
                <p className="mt-1 text-sm text-[#3D3D4E]">
                    Browse through student listings, study supplies, and campus essentials.
                </p>
            </div>

            {/* Search and Filters - Dribbble Style */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 rounded-full border border-[#E7E7E9] bg-[#F8F7F4] px-5 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white"
                />

                {/* Category Filter */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-full border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-2.5 text-xs font-semibold text-[#0D0C22] outline-none transition focus:border-[#0D0C22] focus:bg-white cursor-pointer"
                >
                    <option value="All">All Categories</option>
                    <option value="Books">Books</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                </select>

                {/* Listing Type Filter */}
                <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value)}
                    className="rounded-full border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-2.5 text-xs font-semibold text-[#0D0C22] outline-none transition focus:border-[#0D0C22] focus:bg-white cursor-pointer"
                >
                    <option value="All">All Types</option>
                    <option value="sale">For Sale</option>
                    <option value="free">Free</option>
                    <option value="exchange">Exchange</option>
                </select>

            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-600">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="py-20 text-center text-sm text-[#524B63]">
                    Loading campus products...
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
                <div className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] py-16 text-center">
                    <p className="text-base font-bold text-[#0D0C22]">No products found</p>
                    <p className="mt-1 text-xs text-[#524B63]">Try adjusting your search or filters.</p>
                </div>
            )}

            {/* Product Grid */}
            {!loading && filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}
