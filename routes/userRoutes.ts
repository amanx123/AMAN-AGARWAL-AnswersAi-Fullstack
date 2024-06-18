import { Router } from "express";
import { register } from "../controllers/auth";
import { getUserById, getUserQuestions } from "../controllers/users";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", register); //Create a new user account.
router.get("/:userId", authMiddleware, getUserById); //Retrieve a user profile with a given userId
router.get("/:userId/questions", authMiddleware, getUserQuestions); //Retrieve all questions asked by user with a given userId

export default router;
