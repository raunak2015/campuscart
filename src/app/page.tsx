import Link from "next/link";
import { ArrowRight, ShoppingBag, PlusCircle, ShieldCheck } from "lucide-react";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">

            {/* Dribbble-style Minimalist Hero Section */}
            <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
                <div className="mx-auto max-w-3xl text-center">

                    {/* Subtle Pill Tag */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-1.5 text-xs font-semibold text-[#0D0C22] mb-6">
                        <span className="h-2 w-2 rounded-full bg-[#EA4C89]"></span>
                        The Campus Marketplace for Students
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-[#0D0C22] sm:text-6xl md:leading-[1.12]">
                        Discover, buy, and sell campus essentials.
                    </h1>

                    <p className="mt-6 text-base text-[#3D3D4E] sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        Connect with fellow students to trade textbooks, electronics, dorm furniture, and gear. Safe, affordable, and built specifically for your campus.
                    </p>

                    {/* Dribbble Style CTA Buttons */}
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/marketplace"
                            className="inline-flex items-center gap-2 rounded-full bg-[#0D0C22] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3A3546]"
                        >
                            <ShoppingBag size={16} />
                            Explore Marketplace
                            <ArrowRight size={15} />
                        </Link>

                        <Link
                            href="/sell"
                            className="inline-flex items-center gap-2 rounded-full border border-[#E7E7E9] bg-white px-7 py-3.5 text-sm font-semibold text-[#0D0C22] transition hover:bg-[#F8F7F4]"
                        >
                            <PlusCircle size={16} />
                            List an Item
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-14 flex items-center justify-center gap-8 border-t border-[#E7E7E9] pt-8 text-xs font-medium text-[#524B63]">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck size={16} className="text-[#0D0C22]" /> Verified Student Emails
                        </span>
                        <span>•</span>
                        <span>0% Commission Fees</span>
                        <span>•</span>
                        <span>Direct Campus Hand-off</span>
                    </div>

                </div>

                {/* Tonal Feature Grid (Flat, Dribbble aesthetic) */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-6 transition hover:border-[#0D0C22]">
                        <div className="text-3xl mb-3">📚</div>
                        <h3 className="font-bold text-base text-[#0D0C22]">Textbooks</h3>
                        <p className="mt-1 text-xs text-[#524B63] leading-relaxed">
                            Coursebooks, notes, and study prep materials from seniors.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-6 transition hover:border-[#0D0C22]">
                        <div className="text-3xl mb-3">🎧</div>
                        <h3 className="font-bold text-base text-[#0D0C22]">Electronics</h3>
                        <p className="mt-1 text-xs text-[#524B63] leading-relaxed">
                            Calculators, headphones, chargers, monitors, and laptops.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-6 transition hover:border-[#0D0C22]">
                        <div className="text-3xl mb-3">🪑</div>
                        <h3 className="font-bold text-base text-[#0D0C22]">Dorm & Furniture</h3>
                        <p className="mt-1 text-xs text-[#524B63] leading-relaxed">
                            Desks, lamps, organizers, and chairs for student living.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#E7E7E9] bg-[#F8F7F4] p-6 transition hover:border-[#0D0C22]">
                        <div className="text-3xl mb-3">🔄</div>
                        <h3 className="font-bold text-base text-[#0D0C22]">Free & Exchange</h3>
                        <p className="mt-1 text-xs text-[#524B63] leading-relaxed">
                            Items up for free adoption or trade with classmates.
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
}
