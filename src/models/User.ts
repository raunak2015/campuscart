import { Schema, model, models } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "student" | "admin";
    phone?: string;
    college?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        college: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
