"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/marketplace/ProductCard";

export default function FavoritesPage() {
    const { favorites, loaded } = useFavorites();
    if (!loaded) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-sm font-medium text-[#524B63]">
                    Loading favorites...
                </p>
            </main>
        );
    }
    return (
        <main className="min-h-screen bg-white px-6 py-10">
            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="mb-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E7E7E9] bg-[#F8F7F4] px-3.5 py-1 text-xs font-semibold text-[#EA4C89]">
                        ♥ Saved Collection
                    </span>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0D0C22]">
                        My Favorites
                    </h1>

                    <p className="mt-1 text-sm text-[#3D3D4E]">
                        Products you have saved for later.
                    </p>
                </div>

                {/* Empty State */}
                {favorites.length === 0 ? (
                    <div className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-12 text-center">
                        <div className="text-4xl text-[#EA4C89]/60 mb-3">♡</div>

                        <h2 className="text-lg font-bold text-[#0D0C22]">
                            No favorites yet
                        </h2>

                        <p className="mt-1 text-xs text-[#524B63] max-w-sm mx-auto">
                            Explore the marketplace and save products you like to access them quickly.
                        </p>

                        <Link
                            href="/marketplace"
                            className="mt-5 inline-flex rounded-full bg-[#0D0C22] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3A3546]"
                        >
                            Explore Marketplace
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="mb-6 text-xs font-medium text-[#524B63]">
                            {favorites.length} saved product{favorites.length > 1 ? "s" : ""}
                        </p>

                        {/* Favorites Grid */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {favorites.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </>
                )}

            </div>
        </main>
    );
}
