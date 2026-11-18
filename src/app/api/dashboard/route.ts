import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Product from "@/models/Product";
import Enquiry from "@/models/Enquiry";

export async function GET(request: NextRequest) {
    try {
        // 1. Get JWT from cookie
        const token = request.cookies.get("campuscart-token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
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

        const userId = payload.sub;

        if (!userId) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        // 3. Connect to database
        await connectDB();

        // 4. Find authenticated user
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // 5. Get dashboard statistics
        const [
            totalListings,
            activeListings,
            receivedEnquiries,
            myEnquiries
        ] = await Promise.all([
            Product.countDocuments({
                sellerEmail: user.email
            }),

            Product.countDocuments({
                sellerEmail: user.email,
                status: "available"
            }),

            Enquiry.countDocuments({
                sellerEmail: user.email
            }),

            Enquiry.countDocuments({
                buyerEmail: user.email
            })
        ]);

        // 6. Send response
        return NextResponse.json({
            stats: {
                totalListings,
                activeListings,
                receivedEnquiries,
                myEnquiries
            }
        });

    } catch (error) {
        console.error("Dashboard API Error:", error);

        return NextResponse.json(
            { message: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}
