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
            onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product);
            }}
            aria-label={
                favorite
                    ? "Remove from favorites"
                    : "Add to favorites"
            }
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                favorite
                    ? "border-[#EA4C89] bg-[#FFF0F5] text-[#EA4C89]"
                    : "border-[#E7E7E9] bg-white text-[#524B63] hover:border-[#0D0C22] hover:text-[#0D0C22]"
            }`}
        >
            <span className="text-sm font-bold leading-none">
                {favorite ? "♥" : "♡"}
            </span>
        </button>
    );
}
