import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { questions, users } from "../drizzle/schema";
import { Request, Response } from "express";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.username,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUserQuestions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const allQuestions = await db.query.questions.findMany({
      where: eq(questions.userId, userId),
    });
    res.status(200).json(allQuestions);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
