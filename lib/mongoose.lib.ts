import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in .env.local");
}

let isConnected = false; // tránh connect nhiều lần khi chạy hot reload

export const connectDB = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log(" MongoDB connected");
    } catch (error) {
        console.error(" MongoDB connection error:", error);
        throw error;
    }
};
