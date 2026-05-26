"use client";

import { useMemo, useState } from "react";
import {
  calculateEstimatedVram,
  formatVramResult,
  getVramRecommendation,
} from "@/services/vram-calculator.service";
import type {
  ContextPreset,
  ModelSizeBillion,
  Quantization,
  VramCalculatorInput,
} from "@/types";

const DEFAULT_INPUT: VramCalculatorInput = {
  modelSizeBillion: 8,
  quantization: "int4",
  contextPreset: "medium",
  safetyMarginPercent: 20,
};

const MODEL_SIZES: ModelSizeBillion[] = [7, 8, 13, 32, 70];

export default function VramCalculator() {
  const [input, setInput] = useState<VramCalculatorInput>(DEFAULT_INPUT);
  const result = useMemo(() => calculateEstimatedVram(input), [input]);
  const recommendation = getVramRecommendation(result);

  function updateInput<Key extends keyof VramCalculatorInput>(
    key: Key,
    value: VramCalculatorInput[Key],
  ) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="calculator-card" aria-label="VRAM estimate calculator">
      <div className="calculator-form">
        <label>
          Model size
          <select
            aria-label="Select model size"
            value={input.modelSizeBillion}
            onChange={(event) =>
              updateInput("modelSizeBillion", Number(event.target.value) as ModelSizeBillion)
            }
          >
            {MODEL_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}B parameters
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantization
          <select
            aria-label="Select quantization"
            value={input.quantization}
            onChange={(event) =>
              updateInput("quantization", event.target.value as Quantization)
            }
          >
            <option value="fp16">FP16</option>
            <option value="int8">INT8</option>
            <option value="int4">INT4</option>
          </select>
        </label>

        <label>
          Context preset
          <select
            aria-label="Select context preset"
            value={input.contextPreset}
            onChange={(event) =>
              updateInput("contextPreset", event.target.value as ContextPreset)
            }
          >
            <option value="short">Short (+1 GB overhead)</option>
            <option value="medium">Medium (+2 GB overhead)</option>
            <option value="long">Long (+4 GB overhead)</option>
          </select>
        </label>

        <label>
          Safety margin: {input.safetyMarginPercent}%
          <input
            aria-label="Set safety margin percentage"
            min={0}
            max={50}
            step={5}
            type="range"
            value={input.safetyMarginPercent}
            onChange={(event) =>
              updateInput("safetyMarginPercent", Number(event.target.value))
            }
          />
        </label>
      </div>

      <div className="calculator-result" aria-live="polite">
        <p className="panel-label">Rough estimate</p>
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
            <dt>Selected mode</dt>
            <dd>
              {result.quantization.toUpperCase()} / {result.contextPreset} context
            </dd>
          </div>
          <div>
            <dt>Confidence</dt>
            <dd>Low - estimate requires validation</dd>
          </div>
        </dl>
        <p className="calculator-summary">{formatVramResult(result)}</p>
        <p className="calculator-warning">{result.warning}</p>
        <ul className="calculator-notes">
          {result.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
