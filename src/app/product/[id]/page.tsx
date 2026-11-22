"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Product } from "@/types/product";
import ProductImage from "@/components/marketplace/ProductImage";
import ProductInfo from "@/components/marketplace/ProductInfo";
import SellerCard from "@/components/marketplace/SellerCard";
import EnquiryForm from "@/components/marketplace/EnquiryForm";

function ProductDetailsContent() {
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
            } catch {
                setError("Unable to load product details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
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
                {/* Reusable Product Image */}
                <ProductImage
                    images={product.images}
                    title={product.title}
                />

                {/* Product Details */}
                <div>
                    <ProductInfo product={product} />

                    {/* Reusable Seller Information */}
                    <SellerCard
                        sellerName={product.sellerName}
                        sellerEmail={product.sellerEmail}
                    />

                    {/* Contact Seller */}
                    <EnquiryForm productId={product._id} />
                </div>
            </div>
        </div>
    );
}

export default function ProductDetailsPage() {
    return (
        <Suspense fallback={<p className="text-center py-20">Loading product...</p>}>
            <ProductDetailsContent />
        </Suspense>
    );
}
