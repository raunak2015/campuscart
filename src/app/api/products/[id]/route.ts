import Product from "@/models/Product";
import connectDB from "@/lib/mongodb";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);
    if (!product) {
        return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json(product);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const { id } = await params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json({
        message: "Product deleted successfully"
    });
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const product = await Product.findByIdAndUpdate(
        id,
        body,
        {new: true, runValidators: true}
    );

    if(!product){
        return Response.json(
            {message: "Product not found"},
            {status: 404}
        );
    }

    return Response.json(product);
}