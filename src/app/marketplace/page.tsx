"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/marketplace/ProductCard";
import { Product } from "@/types/product";


export default function MarketplacePage() {
    // Products state
    const [products, setProducts] = useState<Product[]>([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filter states
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [listingType, setListingType] = useState("All");

    // Filtering logic
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

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: Product[] = await response.json();

                setProducts(data);
            } catch (error) {
                setError("Unable to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">

            {/* Page Heading */}
            <h1 className="text-3xl font-bold mb-6">
                Campus Marketplace
            </h1>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-3 flex-1 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Category Filter */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All Listing Types</option>
                    <option value="sale">Sale</option>
                    <option value="free">Free</option>
                    <option value="exchange">Exchange</option>
                </select>

            </div>

            {/* Loading State */}
            {loading && (
                <p className="text-center py-10">
                    Loading products...
                </p>
            )}

            {/* Error State */}
            {!loading && error && (
                <p className="text-center text-red-500 py-10">
                    {error}
                </p>
            )}

            {/* Empty Database State */}
            {!loading && !error && products.length === 0 && (
                <p className="text-center py-10 text-gray-500">
                    No products available.
                </p>
            )}

            {/* Products */}
            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {filteredProducts.length === 0 ? (
                        <p className="col-span-full text-center py-10 text-gray-500">
                            No matching products found.
                        </p>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))
                    )}

                </div>
            )}

        </div>
    );
}
