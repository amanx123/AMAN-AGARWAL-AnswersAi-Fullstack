import { Request, Response } from "express";
import { run } from "../google-ai";
import { questions } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";

interface User {
  id: string;
}

const generateAnswer = async (question: string) => {
  //generating answer using google gemini ai large language model
  const response = await run(question);
  return response.trim().replace(/\*/g, "");
};

export const getAnswer = async (req: any, res: Response) => {
  const { question } = req.body;
  const userId = (req.user as User)?.id as string;
  if (!userId) {
    return res
      .status(400)
      .json({ error: "User not found, please login / register" });
  }
  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }
  const answer = await generateAnswer(question);
  try {
    const data = await db
      .insert(questions)
      .values({ userId: userId, question: question, answer: answer })
      .returning();
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getQuestionAndAnswerById = async (req: Request, res: Response) => {
  const { questionId } = req.params;
  const data = await db.query.questions.findFirst({
    where: eq(questions.id, questionId),
  });
  res.status(200).json(data);
};
