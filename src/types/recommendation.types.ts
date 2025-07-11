export enum RiskTolerance{
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
}

export interface InsuranceRecommendationRequest {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: RiskTolerance;
  userEmail?: string; // Optional, can be used to associate with a user
}

export interface Recommendation {
  type: string;
  coverage: string;
  term: string;
  monthlyPremium: string;
  explanation: string;
}
