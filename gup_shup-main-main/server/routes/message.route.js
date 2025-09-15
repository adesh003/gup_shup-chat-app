import express from "express"
import { Router } from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getMessage, sendMessage } from "../controllers/message.contoller.js";


const router = express.Router();

router.post("/send/:recieverId" ,isAuthenticated, sendMessage);
router.get("/getMessage/:otherParticipantId" ,isAuthenticated, getMessage);
export default router;