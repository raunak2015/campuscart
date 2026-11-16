"use client";

import { useState } from "react";

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

            setSuccess("Enquiry sent successfully!");

            setBuyerName("");
            setBuyerEmail("");
            setMessage("");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border rounded-xl p-5 mt-8 space-y-4"
        >
            <h2 className="text-xl font-bold">
                Send Enquiry
            </h2>

            <input
                type="text"
                placeholder="Your Name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
                className="w-full border rounded-lg px-4 py-3"
            />

            <input
                type="email"
                placeholder="Your Email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                required
                className="w-full border rounded-lg px-4 py-3"
            />

            <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full border rounded-lg px-4 py-3"
            />

            {error && (
                <p className="text-red-500">{error}</p>
            )}

            {success && (
                <p className="text-green-600">{success}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send Enquiry"}
            </button>
        </form>
    );
}
