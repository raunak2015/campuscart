interface SellerCardProps {
    sellerName: string;
    sellerEmail: string;
}

export default function SellerCard({
    sellerName,
    sellerEmail,
}: SellerCardProps) {
    return (
        <div className="border rounded-xl p-4 mt-8">
            <h2 className="font-semibold text-lg">
                Seller Information
            </h2>

            <p className="mt-2">{sellerName}</p>

            <p className="text-gray-500 text-sm">
                {sellerEmail}
            </p>
        </div>
    );
}
