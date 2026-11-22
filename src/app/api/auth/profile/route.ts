import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

async function getAuthenticatedUserId(request: NextRequest): Promise<string | null> {
    const token = request.cookies.get("campuscart-token")?.value;
    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        if (typeof payload.sub !== "string") return null;
        return payload.sub;
    } catch {
        return null;
    }
}

// GET - Get user profile
export async function GET(request: NextRequest) {
    try {
        const userId = await getAuthenticatedUserId(request);
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized. Please login." },
                { status: 401 }
            );
        }

        await connectDB();
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Get Profile Error:", error);
        return NextResponse.json(
            { message: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
    try {
        const userId = await getAuthenticatedUserId(request);
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized. Please login." },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();
        const { name, phone, college } = body;

        const updateData: Record<string, string> = {};
        if (typeof name === "string" && name.trim()) updateData.name = name.trim();
        if (typeof phone === "string") updateData.phone = phone.trim();
        if (typeof college === "string") updateData.college = college.trim();

        const user = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        return NextResponse.json(
            { message: "Failed to update profile" },
            { status: 500 }
        );
    }
}
