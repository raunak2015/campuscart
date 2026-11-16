import mongoose, { Schema, model, models } from "mongoose";

export interface IEnquiry {
    productId: mongoose.Types.ObjectId;
    buyerName: string;
    buyerEmail: string;
    sellerEmail: string;
    message: string;
    status: "pending" | "responded";
}

const enquirySchema = new Schema<IEnquiry>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    buyerName: {
        type: String,
        required: true,
        trim: true
    },
    buyerEmail: {
        type: String,
        required: true,
        trim: true
    },
    sellerEmail: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "responded"],
        default: "pending"
    }
}, { timestamps: true });

const Enquiry =
    models.Enquiry || model<IEnquiry>("Enquiry", enquirySchema);

export default Enquiry;