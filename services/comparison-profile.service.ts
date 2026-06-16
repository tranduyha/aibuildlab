import { comparisonProfileRepository } from "@/repositories/comparison-profile.repository";
import type { Comparison } from "@/types";
import type { ComparisonProfile } from "@/types/comparison-profile";

function createFallbackProfile(comparison: Comparison): ComparisonProfile {
  return {
    slug: comparison.slug,
    decisionSummary: `${comparison.title} has comparison data but still needs a dedicated editorial profile. Use the source-backed GPU table and verification notes as a planning checkpoint, not as a benchmark or purchase conclusion.`,
    whyThisPairMatters: [
      {
        title: "Comparison profile pending",
        description: "This pair has a route and GPU records, but the data layer does not yet include a dedicated editorial profile.",
      },
      {
        title: "Use source-backed fields only",
        description: "Treat VRAM, memory, power, and confidence fields as planning inputs when they are source-backed.",
      },
      {
        title: "Keep benchmark claims out",
        description: "Do not infer speed, image throughput, tokens per second, or final workload fit without controlled evidence.",
      },
    ],
    bestFitQuestions: [
      {
        title: "What workload are you validating?",
        description: "Start with the model, runtime, context, image settings, or workflow constraint before interpreting the table.",
      },
      {
        title: "Which fields are source-backed?",
        description: "Use the comparison table and source notice to separate verified planning fields from gaps.",
      },
      {
        title: "What still needs testing?",
        description: "Identify benchmark, runtime, exact-card, and compatibility questions before making a hardware decision.",
      },
    ],
    watchouts: [
      {
        title: "Fallback content",
        description: "This copy is intentionally conservative until a pair-specific editorial profile is added.",
      },
      {
        title: "No buying guidance",
        description: "A draft comparison should not be treated as a purchase recommendation.",
      },
      {
        title: "No performance conclusion",
        description: "Performance requires benchmark sources and test context that are not present in fallback content.",
      },
    ],
    sourceBackedDifferences: [
      "The page can compare linked GPU profile fields when those fields have source mappings.",
      "The comparison record itself may still be draft or missing comparison-level sources.",
      "Benchmark, price, availability, and final fit claims remain unresolved unless future data adds source-backed evidence.",
    ],
    unresolvedQuestions: [
      "Which exact model, runtime, and settings will be used?",
      "Which exact board-partner cards are being compared?",
      "Would a short validation run reduce risk before local hardware planning?",
    ],
    nearbyComparisons: [],
    faq: [
      {
        question: `Why is ${comparison.title} conservative?`,
        answer: "The page has comparison data but no dedicated editorial profile yet, so it sticks to source-backed GPU fields and verification steps.",
      },
      {
        question: `Does ${comparison.title} include benchmark evidence?`,
        answer: "No. The fallback profile does not add benchmark, speed, price, availability, or purchase claims.",
      },
      {
        question: `What should I do before relying on ${comparison.title}?`,
        answer: "Run the workload through the calculator, review both GPU profiles, and verify exact-card and runtime details.",
      },
    ],
  };
}

export function getComparisonProfile(comparison: Comparison): ComparisonProfile {
  return comparisonProfileRepository.getComparisonProfileBySlug(comparison.slug) ?? createFallbackProfile(comparison);
}

export const comparisonProfileService = {
  getComparisonProfile,
};
