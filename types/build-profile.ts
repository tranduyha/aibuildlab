export interface BuildProfileItem {
  title: string;
  description: string;
}

export interface BuildProfileDecision {
  signal: string;
  localPath: string;
  testFirstPath: string;
}

export interface BuildProfileWorkload {
  workload: string;
  usefulWhen: string;
  riskSignal: string;
}

export interface BuildProfileGpuPath {
  slug: string;
  label: string;
  role: string;
  watchout: string;
}

export interface BuildProfileNextRoute {
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface BuildProfileFaq {
  question: string;
  answer: string;
}

export interface BuildProfile {
  slug: string;
  intentSummary: string;
  decisionPrompts: string[];
  quickVerdicts: BuildProfileItem[];
  decisionRows: BuildProfileDecision[];
  workloadRows: BuildProfileWorkload[];
  gpuPaths: BuildProfileGpuPath[];
  systemConstraints: BuildProfileItem[];
  validationWorkflow: string[];
  nextRoutes: BuildProfileNextRoute[];
  faq: BuildProfileFaq[];
}
