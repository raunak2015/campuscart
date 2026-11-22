"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "@/types/product";

interface FavoritesContextType {
    favorites: Product[];
    loaded: boolean;
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Load favorites from localStorage
    useEffect(() => {
        queueMicrotask(() => {
            try {
                const storedFavorites = localStorage.getItem("campuscart-favorites");
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch {
                // ignore localStorage parsing errors
            } finally {
                setLoaded(true);
            }
        });
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        if (loaded) {
            localStorage.setItem(
                "campuscart-favorites",
                JSON.stringify(favorites)
            );
        }
    }, [favorites, loaded]);

    // Add or remove favorite
    const toggleFavorite = (product: Product) => {
        setFavorites((prev) => {
            const exists = prev.some(
                (item) => item._id === product._id
            );

            if (exists) {
                return prev.filter(
                    (item) => item._id !== product._id
                );
            }

            return [...prev, product];
        });
    };

    // Check whether product is favorite
    const isFavorite = (productId: string) => {
        return favorites.some(
            (item) => item._id === productId
        );
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, loaded, toggleFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites must be used inside FavoritesProvider");
    }

    return context;
}
