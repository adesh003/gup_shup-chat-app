import dotenv from "dotenv";

dotenv.config();
import { Server } from "socket.io";
import https from "https";
import express from "express";

const app = express();

const server = https.createServer(app)


const io = new Server(server, {
    cors:{
        origin:process.env.CLIENT_URL
    }
})


io.on("connection", (socket) => {
    console.log("a user connected" , socket.id);
})
export {io,app, server}