import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userEmail?: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Not Authorized" });
  try {
    const payload = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET!);
    req.userEmail = (payload as any).userEmail;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
