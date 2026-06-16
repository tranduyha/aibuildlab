export interface ComparisonProfileItem {
  title: string;
  description: string;
}

export interface ComparisonProfileLink {
  slug: string;
  label: string;
  reason: string;
}

export interface ComparisonProfileFaq {
  question: string;
  answer: string;
}

export interface ComparisonProfile {
  slug: string;
  decisionSummary: string;
  whyThisPairMatters: ComparisonProfileItem[];
  bestFitQuestions: ComparisonProfileItem[];
  watchouts: ComparisonProfileItem[];
  sourceBackedDifferences: string[];
  unresolvedQuestions: string[];
  nearbyComparisons: ComparisonProfileLink[];
  faq: ComparisonProfileFaq[];
}
