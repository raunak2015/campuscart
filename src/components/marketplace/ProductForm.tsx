
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Books");
    const [condition, setCondition] = useState("Good");
    const [listingType, setListingType] = useState<
        "sale" | "free" | "exchange"
    >("sale");
    const [sellerName, setSellerName] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const inputClass =
        "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100";

    const labelClass =
        "mb-2 block text-sm font-semibold text-gray-800";

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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Product Title */}
            <div>
                <label className={labelClass}>
                    Product Title <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    placeholder="e.g. Data Structures Book"
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
                    placeholder="Describe your product, condition, usage..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className={`${inputClass} resize-y`}
                />
            </div>

            {/* Price + Listing Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                    <label className={labelClass}>
                        Price (₹) <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500">
                            ₹
                        </span>

                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            required
                            disabled={listingType === "free"}
                            className={`${inputClass} pl-9 disabled:bg-gray-100`}
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>
                        Listing Type <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                        {(["sale", "free", "exchange"] as const).map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => {
                                    setListingType(type);

                                    if (type === "free") {
                                        setPrice("0");
                                    }
                                }}
                                className={`rounded-xl border py-3 text-sm font-medium capitalize transition ${
                                    listingType === type
                                        ? "border-purple-500 bg-purple-600 text-white shadow-md shadow-purple-100"
                                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Category + Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                    <label className={labelClass}>
                        Seller Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        placeholder="Your name"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
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
                        placeholder="you@example.com"
                        value={sellerEmail}
                        onChange={(e) => setSellerEmail(e.target.value)}
                        required
                        className={inputClass}
                    />
                </div>

            </div>

            {/* Image URL */}
            <div>
                <label className={labelClass}>
                    Product Image URL <span className="text-gray-400 font-normal">(Optional)</span>
                </label>

                <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={inputClass}
                />

                {/* Image Preview */}
                {image && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">
                            Image Preview
                        </p>

                        <img
                            src={image}
                            alt="Product preview"
                            className="h-48 w-full rounded-xl border border-gray-200 object-contain bg-gray-50"
                        />
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
            >
                {loading ? "Listing Product..." : "+ List Product"}
            </button>

            <p className="text-center text-xs text-gray-400">
                * Required fields
            </p>

        </form>
    );
}
