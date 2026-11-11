import mongoose, {Schema, model, models} from "mongoose";

export interface IProduct {
    title: string;
    description: string;
    price: number;
    category: string;
    
}