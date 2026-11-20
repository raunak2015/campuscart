import type { Product } from "@/types/product";

export const productService = {
    async getAll(): Promise<Product[]> {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    },

    async getById(id: string): Promise<Product> {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
    },

    async getMyListings(): Promise<{ products: Product[]; total: number }> {
        const res = await fetch("/api/products/my-listings");
        if (!res.ok) throw new Error("Failed to fetch listings");
        return res.json();
    },

    async create(data: Partial<Product>): Promise<Product> {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to create product");
        }
        return res.json();
    },

    async update(id: string, data: Partial<Product>): Promise<Product> {
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to update product");
        }
        return res.json();
    },

    async delete(id: string): Promise<{ message: string }> {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to delete product");
        }
        return res.json();
    },
};
