import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import Product from "@/models/Product";

async function getAuthenticatedEmail(request: NextRequest): Promise<string | null> {
    const token = request.cookies.get("campuscart-token")?.value;
    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        if (typeof payload.email !== "string") return null;
        return payload.email;
    } catch {
        return null;
    }
}

// GET - Fetch user's sent or received enquiries
export async function GET(request: NextRequest) {
    try {
        const email = await getAuthenticatedEmail(request);
        if (!email) {
            return NextResponse.json(
                { message: "Unauthorized. Please login." },
                { status: 401 }
            );
        }

        await connectDB();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type"); // "sent" | "received"

        const filter =
            type === "sent"
                ? { buyerEmail: email }
                : { sellerEmail: email };

        const enquiries = await Enquiry.find(filter)
            .populate({
                path: "productId",
                model: Product,
                select: "title price images category status",
            })
            .sort({ createdAt: -1 });

        return NextResponse.json({ enquiries });
    } catch (error) {
        console.error("Fetch Enquiries Error:", error);
        return NextResponse.json(
            { message: "Failed to fetch enquiries" },
            { status: 500 }
        );
    }
}

// POST - Submit a new enquiry
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { productId, buyerName, buyerEmail, message } = body;

        if (!productId || !buyerName || !buyerEmail || !message) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        const enquiry = await Enquiry.create({
            productId,
            buyerName,
            buyerEmail,
            sellerEmail: product.sellerEmail,
            message,
        });

        return NextResponse.json(enquiry, { status: 201 });
    } catch (error) {
        console.error("Create Enquiry Error:", error);
        return NextResponse.json(
            { message: "Failed to create enquiry" },
            { status: 500 }
        );
    }
}

// PATCH - Update enquiry status (only seller)
export async function PATCH(request: NextRequest) {
    try {
        const email = await getAuthenticatedEmail(request);
        if (!email) {
            return NextResponse.json(
                { message: "Unauthorized. Please login." },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();
        const { id, status } = body;

        if (!id || !["pending", "responded"].includes(status)) {
            return NextResponse.json(
                { message: "Invalid request payload" },
                { status: 400 }
            );
        }

        const enquiry = await Enquiry.findOneAndUpdate(
            { _id: id, sellerEmail: email },
            { status },
            { new: true }
        ).populate({
            path: "productId",
            model: Product,
            select: "title price images category status",
        });

        if (!enquiry) {
            return NextResponse.json(
                { message: "Enquiry not found or access denied" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Enquiry status updated successfully",
            enquiry,
        });
    } catch (error) {
        console.error("Update Enquiry Error:", error);
        return NextResponse.json(
            { message: "Failed to update enquiry" },
            { status: 500 }
        );
    }
}
