import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";


export const metadata: Metadata = {
    title: "CampusCart",
    description: "CampusCart - Student Marketplace",
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <FavoritesProvider>
                        <Navbar />
                        {children}
                    </FavoritesProvider>
                </AuthProvider>
            </body>
        </html>
    );
}