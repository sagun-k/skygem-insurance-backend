import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { InsuranceRecommendationService } from "../services/recommendation.service.js";
import { InsuranceRecommendationRequest } from "../types/recommendation.types.js";

export class RecommendationController {
  private service = new InsuranceRecommendationService();

  // Convert your function to a class method
  submitRecommendation = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const recInput = req.body as InsuranceRecommendationRequest;
      const rec = this.service.generateRecommendation(recInput);
      await this.service.storeInsuranceRequest(recInput.userEmail!, recInput, rec);
      res.json({ recommendation: rec });
    } catch (e) {
      next(e);
    }
  };
}
