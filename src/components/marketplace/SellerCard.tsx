interface SellerCardProps {
    sellerName: string;
    sellerEmail: string;
}

export default function SellerCard({
    sellerName,
    sellerEmail,
}: SellerCardProps) {
    return (
        <div className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-4 mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#524B63]">
                Seller Information
            </h3>

            <p className="mt-2 text-sm font-bold text-[#0D0C22]">
                {sellerName}
            </p>

            <p className="text-xs text-[#524B63] mt-0.5">
                {sellerEmail}
            </p>
        </div>
    );
}
