export interface AuditData {
    isBusinessOwner: boolean | null;
    hasCrm: boolean | null;
    hasSalesTeam: boolean | null;
    socialMediaStatus: 'bad' | 'average' | 'good' | 'excellent' | null;
    businessNiche: string;
    adPlatform: string;
    revenueGoal: number;
    averageCheck: number;
    conversionRate: number;
}

export interface AuditResult {
    clientsNeeded: number;
    leadsNeeded: number;
    minBudget: number;
    optimalBudget: number;
    healthScore: number;
    risks: string[];
    recommendations: string[];
    lostBudget: number; // Potential lost budget due to inefficiencies
}

export const initialAuditData: AuditData = {
    isBusinessOwner: null,
    hasCrm: null,
    hasSalesTeam: null,
    socialMediaStatus: null,
    businessNiche: '',
    adPlatform: '',
    revenueGoal: 0,
    averageCheck: 0,
    conversionRate: 0,
};
