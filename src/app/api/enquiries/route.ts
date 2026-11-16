
import Enquiry from "@/models/Enquiry";
import Product from "@/models/Product";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            productId,
            buyerName,
            buyerEmail,
            message
        } = body;

        if (!productId || !buyerName || !buyerEmail || !message) {
            return Response.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const product = await Product.findById(productId);

        if (!product) {
            return Response.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        const enquiry = await Enquiry.create({
            productId,
            buyerName,
            buyerEmail,
            sellerEmail: product.sellerEmail,
            message
        });

        return Response.json(enquiry, { status: 201 });

    } catch (error) {
        return Response.json(
            { message: "Failed to create enquiry" },
            { status: 500 }
        );
    }
}
