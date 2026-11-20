import type { Product } from "./product";

export interface Enquiry {
    _id: string;
    productId: string | Product;
    buyerName: string;
    buyerEmail: string;
    sellerEmail: string;
    message: string;
    status: "pending" | "responded";
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateEnquiryInput {
    productId: string;
    buyerName: string;
    buyerEmail: string;
    message: string;
}
