import mongoose, { Mongoose } from "mongoose";

export const connectDb = async () => {
    try {
       
        const MONGODB_URI = process.env.MONGODB_URI;
        
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined.");
        }

        const instance = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB connected: ${instance.connection.host}`);
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};
