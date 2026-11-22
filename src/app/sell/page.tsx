import ProductForm from "@/components/marketplace/ProductForm";

export default function SellPage() {
    return (
        <main className="min-h-screen bg-white px-6 py-12">

            {/* Page Heading */}
            <div className="max-w-3xl mx-auto text-center mb-10">
                <span className="inline-block border border-[#E7E7E9] bg-[#F8F7F4] text-[#0D0C22] px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
                    Campus Marketplace
                </span>

                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0D0C22]">
                    List a Product for Sale
                </h1>

                <p className="text-[#3D3D4E] mt-2 text-sm max-w-md mx-auto">
                    Pass on your unused items, textbooks, and gear to fellow college students.
                </p>
            </div>

            {/* Form Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E7E7E9] p-6 sm:p-8">

                <div className="mb-6 border-b border-[#E7E7E9] pb-4">
                    <h2 className="text-lg font-bold text-[#0D0C22]">
                        Product Details
                    </h2>

                    <p className="text-xs text-[#524B63] mt-1">
                        Fill in accurate details to help buyers find your item.
                    </p>
                </div>

                <ProductForm />

            </div>

        </main>
    );
}
