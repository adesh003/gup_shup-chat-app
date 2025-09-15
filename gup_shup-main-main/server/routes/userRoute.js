import express from "express"
import { getOtherUser, getProfile,login, logout, register } from "../controllers/userContoller.js"
import { Router } from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/login" , login);
router.post("/register" , register);
router.get("/profile" , isAuthenticated , getProfile);
router.post("/logout" , isAuthenticated , logout);
router.get("/getOtherUser" , isAuthenticated , getOtherUser);

export default router;