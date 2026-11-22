import Link from "next/link";
import type { Product } from "@/types/product";
import FavoriteButton from "./FavoriteButton";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group overflow-hidden rounded-xl border border-[#E7E7E9] bg-white transition hover:border-[#0D0C22]">

            {/* Product Image */}
            <div className="relative h-52 overflow-hidden bg-[#F8F7F4]">
                <img
                    src={product.images[0] || "/placeholder.png"}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Listing Type Badge */}
                <span className="absolute left-3 top-3 rounded-full border border-[#E7E7E9] bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase text-[#0D0C22]">
                    {product.listingType}
                </span>

                {/* Favorite Button */}
                <div className="absolute right-3 top-3">
                    <FavoriteButton product={product} />
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4">

                <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-[#524B63]">
                        {product.category}
                    </p>
                    <span className="text-[11px] font-medium text-[#524B63]">
                        {product.condition}
                    </span>
                </div>

                <h2 className="mt-1.5 line-clamp-1 text-sm font-bold text-[#0D0C22] group-hover:text-[#3D3D4E]">
                    {product.title}
                </h2>

                <div className="mt-4 flex items-center justify-between border-t border-[#E7E7E9] pt-3">
                    <p className="text-base font-bold text-[#0D0C22]">
                        {product.listingType === "free"
                            ? "Free"
                            : `₹${product.price}`}
                    </p>

                    <Link
                        href={`/product/${product._id}`}
                        className="rounded-full bg-[#0D0C22] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#3A3546]"
                    >
                        View
                    </Link>
                </div>

            </div>

        </div>
    );
}
