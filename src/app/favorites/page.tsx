"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/marketplace/ProductCard";

export default function FavoritesPage() {
    const { favorites, loaded } = useFavorites();
    if (!loaded) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-violet-50">
                <p className="text-lg font-semibold text-purple-600">
                    Loading favorites...
                </p>
            </main>
        );
    }
    return (
        <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="mb-10">
                    <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                        ♥ Your Collection
                    </span>

                    <h1 className="mt-4 text-4xl font-extrabold text-gray-900">
                        My <span className="text-purple-600">Favorites</span>
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Products you have saved for later.
                    </p>
                </div>



                {/* Empty State */}
                {favorites.length === 0 ? (
                    <div className="rounded-3xl border border-purple-100 bg-white p-12 text-center shadow-sm">

                        <div className="text-6xl text-purple-200">♡</div>

                        <h2 className="mt-4 text-2xl font-bold text-gray-900">
                            No favorites yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Explore the marketplace and save products you like.
                        </p>

                        <Link
                            href="/marketplace"
                            className="mt-6 inline-flex rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
                        >
                            Explore Marketplace
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="mb-6 text-sm text-gray-500">
                            {favorites.length} saved product(s)
                        </p>

                        {/* Favorites Grid */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
