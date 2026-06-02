"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  calculateEstimatedVram,
  formatVramResult,
  getCalculatorModelGroups,
  getCalculatorModelOptions,
  getCalculatorProfiles,
  getDefaultCalculatorInput,
  getVramRecommendation,
  isContextPreset,
  isQuantization,
  isRuntimeKey,
} from "@/services/vram-calculator.service";
import type { VramCalculatorInput } from "@/types";

const MODEL_OPTIONS = getCalculatorModelOptions();
const MODEL_GROUPS = getCalculatorModelGroups();
const PROFILES = getCalculatorProfiles();

const GROUP_LABELS: Record<string, string> = {
  llm: "LLM",
  "image-diffusion": "Image diffusion",
  other: "Embedding / other",
};

export default function VramCalculator() {
  const [input, setInput] = useState<VramCalculatorInput>(getDefaultCalculatorInput());

  const selectedModel = useMemo(
    () => MODEL_OPTIONS.find((model) => model.slug === input.modelSlug) ?? MODEL_OPTIONS[0],
    [input.modelSlug],
  );

  const normalizedInput = useMemo(
    () => ({
      ...input,
      modelSlug: selectedModel?.slug ?? input.modelSlug,
      modelSizeBillion: selectedModel?.modelSizeBillion ?? input.modelSizeBillion,
    }),
    [input, selectedModel],
  );

  const result = useMemo(() => calculateEstimatedVram(normalizedInput), [normalizedInput]);
  const recommendation = getVramRecommendation(result);

  function updateInput<Key extends keyof VramCalculatorInput>(key: Key, value: VramCalculatorInput[Key]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="calculator-card" aria-label="VRAM estimate calculator">
      <div className="calculator-form">
        <label>
          AI model
          <select
            aria-label="Select AI model"
            value={normalizedInput.modelSlug}
            onChange={(event) => updateInput("modelSlug", event.target.value)}
          >
            {Object.entries(MODEL_GROUPS).map(([key, items]) =>
              items.length > 0 ? (
                <optgroup key={key} label={GROUP_LABELS[key] ?? key}>
                  {items.map((model) => (
                    <option key={model.slug} value={model.slug}>
                      {model.name} ({model.modelSizeBillion}B)
                    </option>
                  ))}
                </optgroup>
              ) : null,
            )}
          </select>
        </label>

        <label>
          Quantization
          <select
            aria-label="Select quantization"
            value={normalizedInput.quantization}
            onChange={(event) => {
              const value = event.target.value;
              if (isQuantization(value)) {
                updateInput("quantization", value);
              }
            }}
          >
            {PROFILES.quantizationProfiles.map((profile) => (
              <option key={profile.key} value={profile.key}>
                {profile.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Context preset
          <select
            aria-label="Select context preset"
            value={normalizedInput.contextPreset}
            onChange={(event) => {
              const value = event.target.value;
              if (isContextPreset(value)) {
                updateInput("contextPreset", value);
              }
            }}
          >
            {PROFILES.contextPresets.map((profile) => (
              <option key={profile.key} value={profile.key}>
                {profile.label} ({profile.contextTokens.toLocaleString()} tokens)
              </option>
            ))}
          </select>
        </label>

        <label>
          Runtime profile
          <select
            aria-label="Select runtime profile"
            value={normalizedInput.runtime}
            onChange={(event) => {
              const value = event.target.value;
              if (isRuntimeKey(value)) {
                updateInput("runtime", value);
              }
            }}
          >
            {PROFILES.runtimeProfiles.map((profile) => (
              <option key={profile.key} value={profile.key}>
                {profile.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Safety margin: {normalizedInput.safetyMarginPercent}%
          <input
            aria-label="Set safety margin percentage"
            min={0}
            max={50}
            step={5}
            type="range"
            value={normalizedInput.safetyMarginPercent}
            onChange={(event) => updateInput("safetyMarginPercent", Number(event.target.value))}
          />
        </label>
      </div>

      <div className="calculator-result" aria-live="polite">
        <div className="estimate-badges" aria-label="Estimate status">
          <span>Planning estimate</span>
          <span>Not benchmark data</span>
          <span>Assumption profile {result.assumptionVersion}</span>
        </div>
        <p className="estimate-value">{result.estimatedVramGb.toFixed(1)} GB</p>
        <p className="estimate-minimum">
          Recommended planning minimum: <strong>{result.recommendedMinimumVramGb} GB VRAM</strong>
        </p>
        <dl className="estimate-details">
          <div>
            <dt>Planning tier</dt>
            <dd>{recommendation.gpuTier}</dd>
          </div>
          <div>
            <dt>Selected model</dt>
            <dd>{selectedModel?.name ?? "Model not found"}</dd>
          </div>
          <div>
            <dt>Runtime</dt>
            <dd>{result.assumptionsUsed.runtimeLabel}</dd>
          </div>
          <div>
            <dt>Confidence</dt>
            <dd>{result.confidence.toUpperCase()}</dd>
          </div>
        </dl>
        <p className="calculator-summary">{formatVramResult(result)}</p>
        <p className="calculator-warning">{result.warning}</p>
        <ul className="calculator-notes">
          {result.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        <section className="calculator-match-section" aria-label="Source-backed GPU matches">
          <h3>Source-backed GPU matches</h3>
          {result.sourceBackedGpuMatches.length === 0 ? (
            <p className="muted">No exact source-backed GPU match yet.</p>
          ) : (
            <div className="gpu-match-grid">
              {result.sourceBackedGpuMatches.map((gpu) => (
                <Link key={gpu.slug} className="gpu-match-card" href={`/gpu/${gpu.slug}`}>
                  <strong>{gpu.name}</strong>
                  <span>{gpu.vramGb} GB VRAM</span>
                  <span className="gpu-match-badge">Source-backed</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {result.planningGpuCandidates.length > 0 ? (
          <section className="calculator-match-section" aria-label="Planning GPU candidates">
            <h3>Planning candidates (needs verification)</h3>
            <div className="gpu-match-grid">
              {result.planningGpuCandidates.map((gpu) => (
                <Link key={gpu.slug} className="gpu-match-card" href={`/gpu/${gpu.slug}`}>
                  <strong>{gpu.name}</strong>
                  <span>{gpu.vramGb} GB VRAM</span>
                  <span className="gpu-match-badge gpu-match-badge-draft">Planning-only</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <nav className="result-actions" aria-label="Next planning steps">
          <Link className="result-action-primary" href="/gpu">
            View matching GPU profiles
          </Link>
          <Link href="/compare">Compare source-backed GPU planning profiles</Link>
          <Link href="/builds">Explore build planning pages</Link>
          <Link href="/guides">Read local AI planning guides</Link>
        </nav>
      </div>
    </section>
  );
}
