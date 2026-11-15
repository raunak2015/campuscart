import { Product } from "@/types/product";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({
    product,
}: ProductInfoProps) {
    return (
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
        </div>
    );
}
