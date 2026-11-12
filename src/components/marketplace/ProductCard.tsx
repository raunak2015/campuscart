import Link from "next/link";
interface Product{
    _id: string;
    title: string;
    price: number;
    category: string;
    condition: string;
    images: string[];
    listingType: "sale" | "free" | "exchange";
}
interface ProductCardProps{
    product: Product;
}

export default function ProductCard({product}: ProductCardProps){
    return(
        <div  className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <img
                src={product.images[0] || "/placeholder.png"}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-3">
                <p className="text-sm text-gray-500">
                    {product.category}
                </p>
                <h2 className="text-lg font-semibold mt-1">
                    {product.title}
                </h2>
                 <p className="text-sm text-gray-600 mt-1">
                    Condition: {product.condition}
                </p>
                <p className="text-xl font-bold mt-2">
                    {product.listingType === "free"
                        ? "Free"
                        : `₹${product.price}`}
                </p>
                <Link
                    href={`/product/${product._id}`}
                    className="block text-center bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
                >
                    View Details
                </Link>

            </div>
        </div>
    )
}