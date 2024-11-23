import express from 'express';
const router=express.Router();
import {signup , login, logout,updateProfile} from "../controllers/auth.controllers.js"
import { protectRoute } from '../middleware/auth.middleware.js';
import { checkAuth } from '../controllers/auth.controllers.js';

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute, checkAuth)
export default router;