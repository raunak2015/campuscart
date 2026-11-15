
interface ProductImageProps {
    images: string[];
    title: string;
}

export default function ProductImage({
    images,
    title,
}: ProductImageProps) {
    return (
        <img
            src={images[0] || "/placeholder.png"}
            alt={title}
            className="w-full h-96 object-cover rounded-xl"
        />
    );
}
