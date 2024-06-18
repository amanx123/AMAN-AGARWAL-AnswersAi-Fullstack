import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth";

const router = Router();

router.post("/login", login); //User login endpoint.
router.post("/logout", logout); //User logout endpoint.
router.post("/refresh", refresh); //Refresh access token endpoint

export default router;
