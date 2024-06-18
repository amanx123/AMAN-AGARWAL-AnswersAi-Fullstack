import { Response, NextFunction } from "express";
import { verifyToken } from "../controllers/auth";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
