// import {NextResponse} from "next/server";
import Product from "@/models/Product";
import connectDB from "@/lib/mongodb";

export async function GET(){
    await connectDB();
    
    const products = await Product.find().sort({ createdAt: -1 });
    return Response.json(products);
}

export async function POST(request: Request){
    await connectDB();
    const body = await request.json();
    const product = await Product.create(body);
    return Response.json(product, {status: 201});
}