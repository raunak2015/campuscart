import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../lib/mongodb";
import Product from "../models/Product";
import Enquiry from "../models/Enquiry";

async function seed() {
    console.log("Connecting to MongoDB...");
    await connectDB();

    console.log("Checking products...");
    let product = await Product.findOne();

    if (!product) {
        console.log("No product found. Creating sample product...");
        product = await Product.create({
            title: "Calculus Early Transcendentals 8th Edition",
            description: "Used for 1 semester, great condition with minimal highlighting.",
            price: 650,
            category: "Books",
            condition: "Good",
            images: [
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
            ],
            sellerName: "Campus Senior",
            sellerEmail: "senior@campus.edu",
            listingType: "sale",
            status: "available",
        });
    }

    console.log("Seeding sample enquiries...");
    const sampleEnquiries = [
        {
            productId: product._id,
            buyerName: "Alex Rivera",
            buyerEmail: "alex@campus.edu",
            sellerEmail: product.sellerEmail,
            message: "Hi! Is this still available? Can we meet at the campus library?",
            status: "pending",
        },
        {
            productId: product._id,
            buyerName: "Priya Sharma",
            buyerEmail: "priya@campus.edu",
            sellerEmail: product.sellerEmail,
            message: "Hello! Are you open to ₹500 for this textbook?",
            status: "responded",
        },
    ];

    for (const enq of sampleEnquiries) {
        const existing = await Enquiry.findOne({
            productId: enq.productId,
            buyerEmail: enq.buyerEmail,
        });
        if (!existing) {
            await Enquiry.create(enq);
            console.log(`Created enquiry from ${enq.buyerName}`);
        }
    }

    console.log("Enquiries seeded successfully!");
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
