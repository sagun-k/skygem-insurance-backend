import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class AuthenticationService {
  async registerUser(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return prisma.user.create({ data: { email, password: hashed } });
  }

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  }

  async verifyToken(token: string): Promise<{ email: string }> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user) throw new Error("User not found");
      return { email: user.email };
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }

}

