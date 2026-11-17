import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: NextRequest) {
    try {
        // Get JWT from cookie
        const token = request.cookies.get("campuscart-token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized. Please login." },
                { status: 401 }
            );
        }

        // Verify JWT
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
        );

        // Get user ID from JWT
        const userId = payload.sub;

        if (!userId) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        // Find user in database
        await connectDB();

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "User authenticated successfully",
                user,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Authentication Error:", error);

        return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 401 }
        );
    }
}
