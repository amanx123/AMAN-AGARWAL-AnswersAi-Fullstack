import { Router } from "express";
import { getAnswer, getQuestionAndAnswerById } from "../controllers/questions";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, getAnswer); //Accepts user question, and returns AI-generated answer.
router.get("/:questionId", authMiddleware, getQuestionAndAnswerById); //Retrieve specific question and answer by question ID.

export default router;
