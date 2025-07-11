import { Request, Response, NextFunction } from "express";
import { AuthenticationService } from "../services/auth.service.js";
import { User } from "../types/auth.types.js";


export class AuthenticationController {
  private service = new AuthenticationService();
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.verifyToken = this.verifyToken.bind(this);

  }

  async register(req: Request<any, any, User>, res: Response, next: NextFunction) {
    try {
      const user = await this.service.registerUser(req.body.email, req.body.password);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request<any, any, User>, res: Response, next: NextFunction) {
    try {
      const token = await this.service.loginUser(req.body.email, req.body.password);
      res.json({ token });
    } catch (e) {
      next(e);
    }
  }

    async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization!;
      const token = authHeader.split(" ")[1];
      const { email } = await this.service.verifyToken(token);
      res.json({ email });
    } catch (e) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  }

}

