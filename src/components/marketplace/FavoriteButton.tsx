
"use client";

import type { Product } from "@/types/product";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteButtonProps {
    product: Product;
}

export default function FavoriteButton({
    product,
}: FavoriteButtonProps) {
    const { toggleFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(product._id);

    return (
        <button
            type="button"
            onClick={() => toggleFavorite(product)}
            aria-label={
                favorite
                    ? "Remove from favorites"
                    : "Add to favorites"
            }
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition ${
                favorite
                    ? "bg-red-50 text-red-500"
                    : "bg-white text-gray-500 hover:bg-red-50 hover:text-red-500"
            }`}
        >
            <span className="text-xl">
                {favorite ? "♥" : "♡"}
            </span>
        </button>
    );
}
