import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";

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
                <FavoritesProvider>
                    {children}
                </FavoritesProvider>
            </body>
        </html>
    );
}