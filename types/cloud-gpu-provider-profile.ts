export interface CloudGpuProviderProfileScenario {
  title: string;
  description: string;
}

export interface CloudGpuProviderProfileAlternative {
  slug: string;
  label: string;
  reason: string;
}

export interface CloudGpuProviderProfileFaq {
  question: string;
  answer: string;
}

export interface CloudGpuProviderProfile {
  slug: string;
  decisionSummary: string;
  bestFitScenarios: CloudGpuProviderProfileScenario[];
  watchouts: CloudGpuProviderProfileScenario[];
  sourceConfirmedFacts: string[];
  unresolvedQuestions: string[];
  nearbyAlternatives: CloudGpuProviderProfileAlternative[];
  faq: CloudGpuProviderProfileFaq[];
}
