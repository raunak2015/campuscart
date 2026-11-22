"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            router.push("/login");

        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">

            <div className="w-full max-w-md rounded-2xl border border-[#E7E7E9] bg-white p-8">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-[#0D0C22]">
                        Join CampusCart<span className="text-[#EA4C89]">.</span>
                    </h1>

                    <p className="mt-1 text-xs text-[#524B63]">
                        Create your account to start trading on campus.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#0D0C22]">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className="w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#0D0C22]">
                            College Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@campus.edu"
                            required
                            className="w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#0D0C22]">
                            Password (min 8 chars)
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#0D0C22]">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full rounded-lg border border-[#E7E7E9] bg-[#F8F7F4] px-4 py-2.5 text-sm text-[#060318] outline-none transition focus:border-[#0D0C22] focus:bg-white"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-[#0D0C22] py-3 text-sm font-semibold text-white transition hover:bg-[#3A3546] disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-xs text-[#524B63]">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-[#0D0C22] underline hover:text-[#3D3D4E]"
                    >
                        Log in
                    </Link>
                </p>

            </div>
        </main>
    );
}
