import type { Product } from "@/types/product";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({
    product,
}: ProductInfoProps) {
    return (
        <div>
            <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#E7E7E9] bg-[#F8F7F4] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#524B63]">
                    {product.category}
                </span>
                <span className="text-xs font-medium text-[#524B63]">
                    Condition: <strong className="text-[#0D0C22]">{product.condition}</strong>
                </span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D0C22]">
                {product.title}
            </h1>

            <p className="mt-3 text-2xl font-bold text-[#0D0C22]">
                {product.listingType === "free"
                    ? "Free"
                    : `₹${product.price}`}
            </p>

            <div className="mt-6 border-t border-[#E7E7E9] pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#524B63] mb-2">
                    Description
                </h3>
                <p className="text-sm text-[#3D3D4E] leading-relaxed whitespace-pre-wrap">
                    {product.description}
                </p>
            </div>
        </div>
    );
}
