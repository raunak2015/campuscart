
import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-950 px-6 py-20 text-white lg:py-28">

                <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

                    {/* Left Content */}
                    <div>
                        

                        <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Your Campus.
                            <br />
                            Your <span className="text-violet-300">Marketplace.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 text-violet-100/80 sm:text-lg">
                            Buy, sell and exchange everything you need for
                            college life. Discover affordable products from
                            students around your campus.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                href="/marketplace"
                                className="rounded-xl bg-white px-7 py-3.5 font-semibold text-violet-900 transition hover:bg-violet-100"
                            >
                                Explore Marketplace →
                            </Link>

                            <Link
                                href="/sell"
                                className="rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
                            >
                                Start Selling
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-8">
                            <div>
                                <h3 className="text-2xl font-bold">Buy</h3>
                                <p className="mt-1 text-sm text-violet-200">
                                    At student prices
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">Sell</h3>
                                <p className="mt-1 text-sm text-violet-200">
                                    Your unused items
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">Connect</h3>
                                <p className="mt-1 text-sm text-violet-200">
                                    With your community
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative mx-auto w-full max-w-lg">

                        <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-violet-500/30 blur-3xl" />
                        <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-indigo-400/30 blur-3xl" />

                        <div className="relative rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-violet-200">
                                        CampusCart Marketplace
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold">
                                        Find your next favourite
                                    </h2>
                                </div>

                                <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs font-medium text-green-300">
                                    ● Live
                                </span>
                            </div>

                            {/* Product Visual Cards */}
                            <div className="mt-7 grid grid-cols-2 gap-4">

                                <div className="rounded-2xl bg-white p-3 text-gray-900 shadow-lg">
                                    <div className="flex h-32 items-center justify-center rounded-xl bg-violet-100 text-6xl">
                                        📚
                                    </div>
                                    <h3 className="mt-3 font-bold">
                                        Study Books
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Student essentials
                                    </p>
                                </div>

                                <div className="mt-8 rounded-2xl bg-white p-3 text-gray-900 shadow-lg">
                                    <div className="flex h-32 items-center justify-center rounded-xl bg-indigo-100 text-6xl">
                                        🎧
                                    </div>
                                    <h3 className="mt-3 font-bold">
                                        Electronics
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Great deals
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white p-3 text-gray-900 shadow-lg">
                                    <div className="flex h-32 items-center justify-center rounded-xl bg-pink-100 text-6xl">
                                        🎒
                                    </div>
                                    <h3 className="mt-3 font-bold">
                                        Accessories
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Everyday needs
                                    </p>
                                </div>

                                <div className="mt-8 rounded-2xl bg-white p-3 text-gray-900 shadow-lg">
                                    <div className="flex h-32 items-center justify-center rounded-xl bg-amber-100 text-6xl">
                                        💻
                                    </div>
                                    <h3 className="mt-3 font-bold">
                                        Gadgets
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Upgrade for less
                                    </p>
                                </div>

                            </div>

                            <div className="mt-5 rounded-xl border border-white/20 bg-white/10 p-4 text-center">
                                <p className="text-sm text-violet-100">
                                    Everything your college life needs, in one place.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
}
