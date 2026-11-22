"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

interface EnquiryFormProps {
    productId: string;
}

export default function EnquiryForm({
    productId,
}: EnquiryFormProps) {
    const [buyerName, setBuyerName] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const inputClass =
        "w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] px-3.5 py-2 text-xs text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white";

    const labelClass =
        "mb-1 block text-xs font-semibold text-[#0D0C22]";

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    buyerName,
                    buyerEmail,
                    message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to send enquiry"
                );
            }

            setSuccess("Enquiry sent! The seller will be notified.");
            setBuyerName("");
            setBuyerEmail("");
            setMessage("");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6 rounded-xl border border-[#E7E7E9] bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
                <Mail size={16} className="text-[#0D0C22]" />
                <h3 className="text-sm font-bold text-[#0D0C22]">
                    Contact Seller
                </h3>
            </div>

            {success && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 p-3 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={15} />
                    <span>{success}</span>
                </div>
            )}

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-600">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className={labelClass}>Your Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Your Email</label>
                    <input
                        type="email"
                        placeholder="you@campus.edu"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        required
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Message</label>
                    <textarea
                        rows={3}
                        placeholder="Hi, is this item still available? Can we meet on campus?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className={inputClass}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#0D0C22] py-2.5 text-xs font-semibold text-white transition hover:bg-[#3A3546] disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
}
