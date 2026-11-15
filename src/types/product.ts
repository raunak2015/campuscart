
export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    images: string[];
    sellerName: string;
    sellerEmail: string;
    listingType: "sale" | "free" | "exchange";
    status: "available" | "sold" | "reserved";
    createdAt?: string;
    updatedAt?: string;
}