"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { refreshUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            await refreshUser();
            router.push("/account");

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
                        Welcome to CampusCart<span className="text-[#EA4C89]">.</span>
                    </h1>

                    <p className="mt-1 text-xs text-[#524B63]">
                        Enter your credentials to access your account.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#0D0C22]">
                            Email Address
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
                            Password
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-[#0D0C22] py-3 text-sm font-semibold text-white transition hover:bg-[#3A3546] disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>

                </form>

                {/* Signup Link */}
                <p className="mt-6 text-center text-xs text-[#524B63]">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-[#0D0C22] underline hover:text-[#3D3D4E]"
                    >
                        Sign up
                    </Link>
                </p>

            </div>
        </main>
    );
}
