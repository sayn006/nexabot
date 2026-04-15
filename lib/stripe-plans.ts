export const PLANS = {
  STARTER: {
    name: "Starter",
    priceId: "price_1TMQaWKMy9tSUwtivVu040SB",
    price: 77,
    features: [
      "1 chatbot site web",
      "1 agent IA",
      "500 conversations/mois",
      "Support email",
      "Widget personnalisable",
    ],
  },
  BUSINESS: {
    name: "Business",
    priceId: "price_1TMQaWKMy9tSUwtiCIH9zQ19",
    price: 150,
    features: [
      "Chatbot + WhatsApp",
      "3 agents IA",
      "2 000 conversations/mois",
      "Support prioritaire",
      "Analytics avancés",
      "Intégrations personnalisées",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    priceId: "price_1TMQaXKMy9tSUwtiQhXuA3HQ",
    price: 300,
    features: [
      "Agents illimités",
      "Vocal + Workflow",
      "Conversations illimitées",
      "Account manager dédié",
      "SLA garanti",
      "API dédiée",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
