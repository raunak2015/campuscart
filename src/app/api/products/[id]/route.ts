import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

type RouteContext = {
    params: Promise<{ id: string }>;
};

// Authentication helper
async function getAuthenticatedEmail(request: NextRequest) {
    const token = request.cookies.get("campuscart-token")?.value;

    if (!token) {
        return null;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
    );

    if (typeof payload.email !== "string") {
        return null;
    }

    return payload.email;
}

// GET - Fetch a single product
export async function GET(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        await connectDB();

        const { id } = await params;

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);

    } catch (error) {
        console.error("Get Product Error:", error);

        return NextResponse.json(
            { message: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

// DELETE - Delete only own product
export async function DELETE(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const email = await getAuthenticatedEmail(request);

        if (!email) {
            return NextResponse.json(
                { message: "Unauthorized. Please login." },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;

        const product = await Product.findOneAndDelete({
            _id: id,
            sellerEmail: email,
        });

        if (!product) {
            return NextResponse.json(
                { message: "Product not found or access denied" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.error("Delete Product Error:", error);

        return NextResponse.json(
            { message: "Failed to delete product" },
            { status: 500 }
        );
    }
}

// PUT - Update only own product
export async function PUT(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const email = await getAuthenticatedEmail(request);

        if (!email) {
            return NextResponse.json(
                { message: "Unauthorized. Please login." },
                { status: 401 }
            );
        }

        await connectDB();

        const { id } = await params;
        const body = await request.json();

        // Never allow ownership or system fields to be changed
        const allowedFields = [
            "title",
            "description",
            "price",
            "category",
            "images",
            "condition",
            "listingType",
            "status",
        ];

        const safeUpdateData = Object.fromEntries(
            Object.entries(body).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        const product = await Product.findOneAndUpdate(
            {
                _id: id,
                sellerEmail: email,
            },
            safeUpdateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return NextResponse.json(
                { message: "Product not found or access denied" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        console.error("Update Product Error:", error);

        return NextResponse.json(
            { message: "Failed to update product" },
            { status: 500 }
        );
    }
}
