import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Product Image */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                    src={product.images[0] || "/placeholder.png"}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Listing Type Badge */}
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    product.listingType === "free"
                        ? "bg-green-100 text-green-700"
                        : product.listingType === "exchange"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-purple-100 text-purple-700"
                }`}>
                    {product.listingType}
                </span>
            </div>

            {/* Product Details */}
            <div className="p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                    {product.category}
                </p>

                <h2 className="mt-2 line-clamp-1 text-lg font-bold text-gray-900">
                    {product.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Condition: {product.condition}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">
                        {product.listingType === "free"
                            ? "Free"
                            : `₹${product.price}`}
                    </p>

                    <Link
                        href={`/product/${product._id}`}
                        className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                    >
                        View Details
                    </Link>
                </div>

            </div>
        </div>
    );
}
