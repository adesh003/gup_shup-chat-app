import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/message.route.js";
import { connectDb } from "./db/connection1.db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

// Middleware
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
    }
));    
app.use(express.json());
app.use(cookieParser());

connectDb();

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 MongoDB URI: ${process.env.MONGODB_URI.split('@')[1]?.split('/')[0] || 'Not configured'}`);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});
