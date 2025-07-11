import prisma from "../prisma.js";
import { InsuranceRecommendationRequest, Recommendation, RiskTolerance } from "../types/recommendation.types.js";
import formatCurrency from "../utils/formatCurrency.js";
import { z } from "zod";


const requestSchema = z.object({
  age: z.number(),
  income: z.number(),
  dependents: z.number(),
  riskTolerance: z.string(),
});

export class InsuranceRecommendationService {

  generateRecommendation(request: InsuranceRecommendationRequest): Recommendation {
    const { age, income, dependents, riskTolerance } = request;

    let multiplier = riskTolerance === RiskTolerance.LOW ? 8 : riskTolerance === RiskTolerance.HIGH ? 12 : 10;
    const baseCoverage = income * multiplier;
    const dependentBonus = dependents * 50000;
    const totalCoverage = baseCoverage + dependentBonus;
    const term = age > 60 ? "10 years" : age > 50 ? "15 years" : "20 years";
    const monthlyPremium = (totalCoverage * 0.0012 * (age / 40)) / 12;

    return {
      type: "Term Life Insurance",
      coverage: formatCurrency(totalCoverage),
      term,
      monthlyPremium: formatCurrency(monthlyPremium),
      explanation: `Based on your ${riskTolerance} risk tolerance, annual income of ${formatCurrency(income)}, and ${dependents} dependents, we recommend ${formatCurrency(totalCoverage)} coverage for ${term}.`,
    };
  }

  async storeInsuranceRequest(userEmail: string, request: InsuranceRecommendationRequest, recommendation: Recommendation) {
    try {
      requestSchema.parse(request);
      const user = await prisma.user.findUnique({ where: { email: userEmail } });
      if (user === null) {
        throw new Error("User not found")
      }
      return prisma.insuranceRequest.create({
        data: {
          userId: user.id as number,
          age: request.age as number,
          income: request.income as number,
          dependents: request.dependents as number,
          riskTolerance: request.riskTolerance,
          recommendation: JSON.stringify(recommendation),
        },
      });
    } catch (error) {
      console.error("Error storing insurance request:", error);
      throw error;
    }
  }
}
