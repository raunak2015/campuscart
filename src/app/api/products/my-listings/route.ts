import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
    try {
        // 1. Get authentication token
        const token = request.cookies.get("campuscart-token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Please login first" },
                { status: 401 }
            );
        }

        // 2. Verify JWT
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
        );

        const email = payload.email;

        if (typeof email !== "string") {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        // 3. Connect to MongoDB
        await connectDB();

        // 4. Fetch only logged-in user's products
        const products = await Product.find({
            sellerEmail: email,
        }).sort({ createdAt: -1 });

        return NextResponse.json({
            products,
            total: products.length,
        });

    } catch (error) {
        console.error("My Listings API Error:", error);

        return NextResponse.json(
            { message: "Failed to fetch your listings" },
            { status: 500 }
        );
    }
}
