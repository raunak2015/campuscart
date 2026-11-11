import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    condition: string;
    sellerName: string;
    sellerEmail: string;
    listingType: "sale" | "auction" | "exchange";
    status: "available" | "sold" | "reserved";
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
        default: []
    },
    condition: {
        type: String,
        required: true,
        trim: true
    },
    sellerName: {
        type: String,
        required: true,
        trim: true
    },
    sellerEmail: {
        type: String,
        required: true,
        trim: true
    },
    listingType: {
        type: String,
        enum: ["sale", "auction", "exchange"],
        default: "sale",
    },
    status: {
        type: String,
        enum: ["available", "sold", "reserved"],
        default: "available",
    }
},
    {
        timestamps: true
    }
)

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
