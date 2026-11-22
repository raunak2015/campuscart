"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
        return (
            <div className="py-24 text-center text-sm text-[#524B63]">
                Loading product...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="py-24 text-center">
                <p className="text-sm font-semibold text-red-600">
                    {error || "Product not found"}
                </p>
                <Link
                    href="/marketplace"
                    className="mt-4 inline-block rounded-full bg-[#0D0C22] px-5 py-2 text-xs font-semibold text-white"
                >
                    Back to Marketplace
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-10">
            {/* Back link */}
            <Link
                href="/marketplace"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#524B63] hover:text-[#0D0C22] mb-6"
            >
                <ArrowLeft size={14} /> Back to Marketplace
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Reusable Product Image */}
                <ProductImage
                    images={product.images}
                    title={product.title}
                />

                {/* Product Details & Enquiry */}
                <div>
                    <ProductInfo product={product} />

                    <SellerCard
                        sellerName={product.sellerName}
                        sellerEmail={product.sellerEmail}
                    />

                    <EnquiryForm productId={product._id} />
                </div>
            </div>
        </div>
    );
}

export default function ProductDetailsPage() {
    return (
        <Suspense fallback={<div className="py-24 text-center text-sm text-[#524B63]">Loading product...</div>}>
            <ProductDetailsContent />
        </Suspense>
    );
}
