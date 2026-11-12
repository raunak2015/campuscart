import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);


const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

async function connectDB(){
    await mongoose.connect(MONGODB_URI!);
    console.log("MongoDB connected");
}

export default connectDB;