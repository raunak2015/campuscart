"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProductForm() {
    const router = useRouter();
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Books");
    const [condition, setCondition] = useState("Good");
    const [listingType, setListingType] = useState<
        "sale" | "free" | "exchange"
    >("sale");
    const [customSellerName, setCustomSellerName] = useState("");
    const [customSellerEmail, setCustomSellerEmail] = useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const sellerName = customSellerName || user?.name || "";
    const sellerEmail = customSellerEmail || user?.email || "";

    const inputClass =
        "w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white";

    const labelClass =
        "mb-1.5 block text-xs font-semibold text-[#0D0C22]";

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    price: Number(price),
                    category,
                    condition,
                    images: image ? [image] : [],
                    sellerName,
                    sellerEmail,
                    listingType,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create product"
                );
            }

            router.push("/marketplace");
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

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Product Title */}
            <div>
                <label className={labelClass}>
                    Product Title <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    placeholder="e.g. Data Structures and Algorithms in C++"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={inputClass}
                />
            </div>

            {/* Description */}
            <div>
                <label className={labelClass}>
                    Product Description <span className="text-red-500">*</span>
                </label>

                <textarea
                    rows={4}
                    placeholder="Describe the condition, edition, and any included accessories..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className={inputClass}
                />
            </div>

            {/* Price & Listing Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                    <label className={labelClass}>
                        Price (₹) <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="number"
                        placeholder="0"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Listing Type <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={listingType}
                        onChange={(e) =>
                            setListingType(
                                e.target.value as "sale" | "free" | "exchange"
                            )
                        }
                        className={inputClass}
                    >
                        <option value="sale">For Sale</option>
                        <option value="free">Free</option>
                        <option value="exchange">Exchange</option>
                    </select>
                </div>

            </div>

            {/* Category & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                    <label className={labelClass}>
                        Category <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={inputClass}
                    >
                        <option value="Books">Books</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>
                        Condition <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className={inputClass}
                    >
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                    </select>
                </div>

            </div>

            {/* Seller Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                    <label className={labelClass}>
                        Seller Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        placeholder="Your name"
                        value={sellerName}
                        onChange={(e) => setCustomSellerName(e.target.value)}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Seller Email <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="email"
                        placeholder="you@campus.edu"
                        value={sellerEmail}
                        onChange={(e) => setCustomSellerEmail(e.target.value)}
                        required
                        className={inputClass}
                    />
                </div>

            </div>

            {/* Image URL */}
            <div>
                <label className={labelClass}>
                    Product Image URL <span className="text-[#524B63] font-normal">(Optional)</span>
                </label>

                <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Image Preview */}
            {image && (
                <div className="rounded-lg border border-[#E7E7E9] p-3 bg-[#F8F7F4]">
                    <p className="text-xs font-semibold text-[#524B63] mb-2">Image Preview:</p>
                    <div className="h-44 w-full overflow-hidden rounded-md bg-white">
                        <img
                            src={image}
                            alt="Preview"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#0D0C22] py-3 text-sm font-semibold text-white transition hover:bg-[#3A3546] disabled:opacity-50"
            >
                {loading ? "Publishing listing..." : "Publish Listing"}
            </button>

        </form>
    );
}
