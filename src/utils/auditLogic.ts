import type { AuditData, AuditResult } from '../types';

export const calculateAuditResults = (data: AuditData): AuditResult => {
    const { revenueGoal, averageCheck, conversionRate, hasCrm, hasSalesTeam } = data;

    // Avoid division by zero
    const safeCheck = averageCheck || 1;
    const safeConversion = conversionRate || 1;

    // 1. Funnel Calculations
    const clientsNeeded = Math.ceil(revenueGoal / safeCheck);
    // Conversion is percentage (e.g. 30 means 0.3)
    const leadsNeeded = Math.ceil(clientsNeeded / (safeConversion / 100));

    // 2. Budget Calculations (CPL $0.8 - $1.5)
    // Penalties
    let inefficiencyMultiplier = 1;
    const lostBudgetPercent = 0;

    const risks: string[] = [];
    const recommendations: string[] = [];

    if (!hasCrm) {
        inefficiencyMultiplier += 0.20;
        risks.push("CRM tizimi yo'qligi sababli lidlarning 20% yo'qotilmoqda.");
        recommendations.push("CRM tizimi (AmoCRM/Bitrix24) o'rnating. Bu byudjetni tejaydi va mijozlar bazasini shakllantiradi.");
    }

    if (!hasSalesTeam) {
        inefficiencyMultiplier += 0.20;
        risks.push("Sotuv bo'limi yo'qligi sababli konversiya past bo'lishi mumkin.");
        recommendations.push("Lidlar kuyib ketmasligi uchun alohida sotuv menejeri yollang yoki skriptlarni kuchaytirings.");
    }

    if (data.socialMediaStatus === 'bad' || data.socialMediaStatus === 'average') {
        recommendations.push("Ijtimoiy tarmoqlardagi sahifalaringizni ('Upakovka') kuchaytiring. Ishonch past bo'lsa, reklama qimmatga tushadi.");
    }

    // Base Budget
    const minCpl = 0.8;
    const maxCpl = 1.5;

    // Real budget considers inefficiencies? 
    // The prompt says: "Sizda tizim bo'lmagani uchun real byudjet 40% ga qimmatroq tushishi mumkin."
    // So we apply the multiplier to the expected budget to show "Real needed budget" or "Potential waste".

    const baseMinBudget = leadsNeeded * minCpl;
    const baseOptimalBudget = leadsNeeded * maxCpl;

    const realMinBudget = baseMinBudget * inefficiencyMultiplier;
    const realOptimalBudget = baseOptimalBudget * inefficiencyMultiplier;

    const lostBudget = (realOptimalBudget - baseOptimalBudget); // Approximate loss

    // Health Score Calculation (Simple heuristic)
    let score = 100;
    if (!hasCrm) score -= 20;
    if (!hasSalesTeam) score -= 20;
    if (data.socialMediaStatus !== 'good' && data.socialMediaStatus !== 'excellent') score -= 10;
    if (conversionRate < 10) score -= 10;

    return {
        clientsNeeded,
        leadsNeeded,
        minBudget: Math.round(realMinBudget),
        optimalBudget: Math.round(realOptimalBudget),
        healthScore: Math.max(0, score),
        risks,
        recommendations,
        lostBudget: Math.round(lostBudget)
    };
};
