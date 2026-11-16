
import ProductForm from "@/components/marketplace/ProductForm";

export default function SellPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-12">

            {/* Page Heading */}
            <div className="max-w-5xl mx-auto text-center mb-10">
                <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    List a Product
                </span>

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    Sell Your{" "}
                    <span className="text-purple-600">Product</span>
                </h1>

                <p className="text-gray-500 mt-4 text-lg">
                    List your used items and connect with fellow students.
                </p>
            </div>

            {/* Form Card */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-purple-100 p-6 md:p-10">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Product Details
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Add the details of the item you want to sell.
                    </p>
                </div>

                <ProductForm />

            </div>

        </main>
    );
}
