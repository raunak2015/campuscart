interface ProductImageProps {
    images: string[];
    title: string;
}

export default function ProductImage({
    images,
    title,
}: ProductImageProps) {
    return (
        <div className="w-full h-96 overflow-hidden rounded-xl border border-[#E7E7E9] bg-[#F8F7F4]">
            <img
                src={images[0] || "/placeholder.png"}
                alt={title}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
