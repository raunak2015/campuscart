
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";

export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);

                if (!response.ok) {
                    throw new Error("Product not found");
                }

                const data: Product = await response.json();
                setProduct(data);
            } catch (error) {
                setError("Unable to load product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p className="text-center py-20">Loading product...</p>;
    }

    if (error || !product) {
        return (
            <p className="text-center text-red-500 py-20">
                {error || "Product not found"}
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Product Image */}
                <div>
                    <img
                        src={product.images[0] || "/placeholder.png"}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded-xl"
                    />
                </div>

                {/* Product Information */}
                <div>
                    <p className="text-sm text-gray-500">
                        {product.category}
                    </p>

                    <h1 className="text-3xl font-bold mt-2">
                        {product.title}
                    </h1>

                    <p className="text-xl font-bold mt-4">
                        {product.listingType === "free"
                            ? "Free"
                            : `₹${product.price}`}
                    </p>

                    <p className="mt-4">
                        Condition: {product.condition}
                    </p>

                    <p className="mt-6 text-gray-600">
                        {product.description}
                    </p>

                    {/* Seller Information */}
                    <div className="border rounded-xl p-4 mt-8">
                        <h2 className="font-semibold text-lg">
                            Seller Information
                        </h2>

                        <p className="mt-2">
                            {product.sellerName}
                        </p>

                        <p className="text-gray-500 text-sm">
                            {product.sellerEmail}
                        </p>
                    </div>

                    {/* Contact Seller */}
                    <a
                        href={`mailto:${product.sellerEmail}`}
                        className="block text-center bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
                    >
                        Contact Seller
                    </a>
                </div>

            </div>
        </div>
    );
}
