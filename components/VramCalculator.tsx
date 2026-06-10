"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  calculateImageGenerationVram,
  getDefaultImageGenerationInput,
  getImageGenerationModelOptions,
  getImageGenerationProfiles,
  isImageBatchSize,
  isImagePrecisionKey,
  isImageResolutionKey,
  isImageRuntimeKey,
  isImageWorkflowKey,
} from "@/services/image-generation-calculator.service";
import { imageGenerationValidationService } from "@/services/image-generation-validation.service";
import {
  calculateMoeEstimatedVram,
  formatMoeVramResult,
  getDefaultMoeCalculatorInput,
  getMoeCalculatorProfiles,
  getMoeModelOptions,
  isMoeContextPreset,
  isMoeQuantization,
  isMoeRuntimeKey,
} from "@/services/moe-vram-calculator.service";
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
import type {
  ImageGenerationCalculatorInput,
  ImageGenerationEstimateResult,
  ImageGenerationValidationComparison,
  MoeEstimateResult,
  MoeModelOption,
  MoeVramCalculatorInput,
  VramCalculatorInput,
  VramEstimateResult,
  VramGpuMatch,
} from "@/types";

type CalculatorMode = "llm" | "moe" | "image";

const MODEL_OPTIONS = getCalculatorModelOptions();
const MODEL_GROUPS = getCalculatorModelGroups();
const PROFILES = getCalculatorProfiles();
const MOE_MODEL_OPTIONS = getMoeModelOptions();
const MOE_PROFILES = getMoeCalculatorProfiles();
const IMAGE_MODEL_OPTIONS = getImageGenerationModelOptions();
const IMAGE_PROFILES = getImageGenerationProfiles();

const GROUP_LABELS: Record<string, string> = {
  llm: "LLM",
  "image-diffusion": "Image diffusion",
  moe: "Mixture-of-Experts",
  other: "Embedding / other",
};

function GpuMatchSections({
  sourceBackedGpuMatches,
  planningGpuCandidates,
}: {
  sourceBackedGpuMatches: VramGpuMatch[];
  planningGpuCandidates: VramGpuMatch[];
}) {
  return (
    <>
      <section className="calculator-match-section" aria-label="Source-backed GPU matches">
        <h3>Source-backed GPU matches</h3>
        {sourceBackedGpuMatches.length === 0 ? (
          <p className="muted">No exact source-backed GPU match yet.</p>
        ) : (
          <div className="gpu-match-grid">
            {sourceBackedGpuMatches.map((gpu) => (
              <Link key={gpu.slug} className="gpu-match-card" href={`/gpu/${gpu.slug}`}>
                <strong>{gpu.name}</strong>
                <span>{gpu.vramGb} GB VRAM</span>
                <span className="gpu-match-badge">Source-backed</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {planningGpuCandidates.length > 0 ? (
        <section className="calculator-match-section" aria-label="Planning GPU candidates">
          <h3>Planning candidates (needs verification)</h3>
          <div className="gpu-match-grid">
            {planningGpuCandidates.map((gpu) => (
              <Link key={gpu.slug} className="gpu-match-card" href={`/gpu/${gpu.slug}`}>
                <strong>{gpu.name}</strong>
                <span>{gpu.vramGb} GB VRAM</span>
                <span className="gpu-match-badge gpu-match-badge-draft">Planning-only</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

function ResultActions() {
  return (
    <nav className="result-actions" aria-label="Next planning steps">
      <Link className="result-action-primary" href="/gpu">
        View matching GPU profiles
      </Link>
      <Link href="/compare">Compare GPU options before committing</Link>
      <Link href="/builds">Explore build planning pages</Link>
      <Link href="/guides">Read local AI planning guides</Link>
    </nav>
  );
}

export default function VramCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("llm");
  const [input, setInput] = useState<VramCalculatorInput>(getDefaultCalculatorInput());
  const [moeInput, setMoeInput] = useState<MoeVramCalculatorInput>(getDefaultMoeCalculatorInput());
  const [imageInput, setImageInput] = useState<ImageGenerationCalculatorInput>(
    getDefaultImageGenerationInput(),
  );

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

  const llmResult = useMemo(() => calculateEstimatedVram(normalizedInput), [normalizedInput]);
  const recommendation = getVramRecommendation(llmResult);

  const selectedMoeModel = useMemo(
    () => MOE_MODEL_OPTIONS.find((model) => model.slug === moeInput.modelSlug) ?? MOE_MODEL_OPTIONS[0],
    [moeInput.modelSlug],
  );

  const normalizedMoeInput = useMemo(
    () => ({
      ...moeInput,
      modelSlug: selectedMoeModel?.slug ?? moeInput.modelSlug,
    }),
    [moeInput, selectedMoeModel],
  );

  const moeResult = useMemo(
    () => calculateMoeEstimatedVram(normalizedMoeInput),
    [normalizedMoeInput],
  );

  const selectedImageModel = useMemo(
    () =>
      IMAGE_MODEL_OPTIONS.find((model) => model.slug === imageInput.modelSlug) ??
      IMAGE_MODEL_OPTIONS[0],
    [imageInput.modelSlug],
  );

  const normalizedImageInput = useMemo(
    () => ({
      ...imageInput,
      modelSlug: selectedImageModel?.slug ?? imageInput.modelSlug,
    }),
    [imageInput, selectedImageModel],
  );

  const imageResult = useMemo(
    () => calculateImageGenerationVram(normalizedImageInput),
    [normalizedImageInput],
  );
  const imageValidationComparisons = useMemo(
    () => imageGenerationValidationService.compareSamplesByModelSlug(normalizedImageInput.modelSlug),
    [normalizedImageInput.modelSlug],
  );

  function updateInput<Key extends keyof VramCalculatorInput>(key: Key, value: VramCalculatorInput[Key]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function updateImageInput<Key extends keyof ImageGenerationCalculatorInput>(
    key: Key,
    value: ImageGenerationCalculatorInput[Key],
  ) {
    setImageInput((current) => ({ ...current, [key]: value }));
  }

  function updateMoeInput<Key extends keyof MoeVramCalculatorInput>(
    key: Key,
    value: MoeVramCalculatorInput[Key],
  ) {
    setMoeInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="calculator-card" aria-label="VRAM estimate calculator">
      <div className="calculator-form">
        <div className="calculator-mode-control" role="group" aria-label="Calculator mode">
          <button
            aria-pressed={mode === "llm"}
            className={mode === "llm" ? "active" : ""}
            type="button"
            onClick={() => setMode("llm")}
          >
            LLM
          </button>
          <button
            aria-pressed={mode === "moe"}
            className={mode === "moe" ? "active" : ""}
            type="button"
            onClick={() => setMode("moe")}
          >
            MoE
          </button>
          <button
            aria-pressed={mode === "image"}
            className={mode === "image" ? "active" : ""}
            type="button"
            onClick={() => setMode("image")}
          >
            Image Generation
          </button>
        </div>

        <label className="calculator-mode-select">
          Mode
          <select
            aria-label="Select calculator mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as CalculatorMode)}
          >
            <option value="llm">LLM</option>
            <option value="moe">MoE</option>
            <option value="image">Image Generation</option>
          </select>
        </label>

        {mode === "llm" ? (
          <LlmCalculatorForm input={normalizedInput} updateInput={updateInput} />
        ) : mode === "moe" ? (
          <MoeCalculatorForm input={normalizedMoeInput} updateInput={updateMoeInput} />
        ) : (
          <ImageCalculatorForm input={normalizedImageInput} updateInput={updateImageInput} />
        )}
      </div>

      {mode === "llm" ? (
        <LlmCalculatorResult
          recommendationTier={recommendation.gpuTier}
          result={llmResult}
          selectedModelName={selectedModel?.name ?? "Model not found"}
        />
      ) : mode === "moe" ? (
        <MoeCalculatorResult
          result={moeResult}
          selectedModel={selectedMoeModel}
        />
      ) : (
        <ImageCalculatorResult
          comparisons={imageValidationComparisons}
          result={imageResult}
          selectedModelName={selectedImageModel?.name ?? "Image model not found"}
        />
      )}
    </section>
  );
}

function LlmCalculatorForm({
  input,
  updateInput,
}: {
  input: VramCalculatorInput;
  updateInput: <Key extends keyof VramCalculatorInput>(key: Key, value: VramCalculatorInput[Key]) => void;
}) {
  return (
    <>
      <label>
        AI model
        <select
          aria-label="Select AI model"
          value={input.modelSlug}
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

      <section className="calculator-policy-note" aria-label="Mixture-of-Experts calculator policy">
        <strong>MoE has a separate estimate mode</strong>
        <p>
          Dense LLM estimates use dense model size. Switch to MoE mode for models such as
          DeepSeek-R1 and Mixtral so total parameters and active parameters are handled separately.
        </p>
      </section>

      <label>
        Quantization
        <select
          aria-label="Select quantization"
          value={input.quantization}
          onChange={(event) => {
            const value = event.target.value;
            if (isQuantization(value)) updateInput("quantization", value);
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
          value={input.contextPreset}
          onChange={(event) => {
            const value = event.target.value;
            if (isContextPreset(value)) updateInput("contextPreset", value);
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
          value={input.runtime}
          onChange={(event) => {
            const value = event.target.value;
            if (isRuntimeKey(value)) updateInput("runtime", value);
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
        Safety margin: {input.safetyMarginPercent}%
        <input
          aria-label="Set safety margin percentage"
          min={0}
          max={50}
          step={5}
          type="range"
          value={input.safetyMarginPercent}
          onChange={(event) => updateInput("safetyMarginPercent", Number(event.target.value))}
        />
      </label>
    </>
  );
}

function MoeCalculatorForm({
  input,
  updateInput,
}: {
  input: MoeVramCalculatorInput;
  updateInput: <Key extends keyof MoeVramCalculatorInput>(
    key: Key,
    value: MoeVramCalculatorInput[Key],
  ) => void;
}) {
  return (
    <>
      <label>
        MoE model
        <select
          aria-label="Select MoE model"
          value={input.modelSlug}
          onChange={(event) => updateInput("modelSlug", event.target.value)}
        >
          {MOE_MODEL_OPTIONS.map((model) => (
            <option key={model.slug} value={model.slug}>
              {model.name} ({model.totalParameterCountB}B total / {model.activeParameterCountB}B active)
            </option>
          ))}
        </select>
      </label>

      <section className="calculator-policy-note" aria-label="MoE estimate policy">
        <strong>MoE planning estimate</strong>
        <p>
          This mode uses total parameters as the conservative resident weight-memory baseline. Active
          parameters describe per-token compute behavior and are not treated as the VRAM floor.
        </p>
      </section>

      <label>
        Quantization
        <select
          aria-label="Select MoE quantization"
          value={input.quantization}
          onChange={(event) => {
            const value = event.target.value;
            if (isMoeQuantization(value)) updateInput("quantization", value);
          }}
        >
          {MOE_PROFILES.quantizationProfiles.map((profile) => (
            <option key={profile.key} value={profile.key}>
              {profile.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Context preset
        <select
          aria-label="Select MoE context preset"
          value={input.contextPreset}
          onChange={(event) => {
            const value = event.target.value;
            if (isMoeContextPreset(value)) updateInput("contextPreset", value);
          }}
        >
          {MOE_PROFILES.contextPresets.map((profile) => (
            <option key={profile.key} value={profile.key}>
              {profile.label} ({profile.contextTokens.toLocaleString()} tokens)
            </option>
          ))}
        </select>
      </label>

      <label>
        Runtime profile
        <select
          aria-label="Select MoE runtime profile"
          value={input.runtime}
          onChange={(event) => {
            const value = event.target.value;
            if (isMoeRuntimeKey(value)) updateInput("runtime", value);
          }}
        >
          {MOE_PROFILES.runtimeProfiles.map((profile) => (
            <option key={profile.key} value={profile.key}>
              {profile.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Safety margin: {input.safetyMarginPercent}%
        <input
          aria-label="Set MoE safety margin percentage"
          min={0}
          max={50}
          step={5}
          type="range"
          value={input.safetyMarginPercent}
          onChange={(event) => updateInput("safetyMarginPercent", Number(event.target.value))}
        />
      </label>
    </>
  );
}

function ImageCalculatorForm({
  input,
  updateInput,
}: {
  input: ImageGenerationCalculatorInput;
  updateInput: <Key extends keyof ImageGenerationCalculatorInput>(
    key: Key,
    value: ImageGenerationCalculatorInput[Key],
  ) => void;
}) {
  return (
    <>
      <label>
        Image model
        <select
          aria-label="Select image model"
          value={input.modelSlug}
          onChange={(event) => updateInput("modelSlug", event.target.value)}
        >
          {IMAGE_MODEL_OPTIONS.map((model) => (
            <option key={model.slug} value={model.slug}>
              {model.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Workflow
        <select
          aria-label="Select image workflow"
          value={input.workflow}
          onChange={(event) => {
            const value = event.target.value;
            if (isImageWorkflowKey(value)) updateInput("workflow", value);
          }}
        >
          {IMAGE_PROFILES.workflowProfiles.map((profile) => (
            <option key={profile.key} value={profile.key}>
              {profile.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Resolution
        <select
          aria-label="Select image resolution"
          value={input.resolution}
          onChange={(event) => {
            const value = event.target.value;
            if (isImageResolutionKey(value)) updateInput("resolution", value);
          }}
        >
          {IMAGE_PROFILES.resolutionProfiles.map((profile) => (
            <option key={profile.key} value={profile.key}>
              {profile.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Precision
        <select
          aria-label="Select image precision"
          value={input.precision}
          onChange={(event) => {
            const value = event.target.value;
            if (isImagePrecisionKey(value)) updateInput("precision", value);
          }}
        >
          {IMAGE_PROFILES.precisionProfiles.map((profile) => (
            <option key={profile.key} value={profile.key}>
              {profile.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Runtime profile
        <select
          aria-label="Select image runtime"
          value={input.runtime}
          onChange={(event) => {
            const value = event.target.value;
            if (isImageRuntimeKey(value)) updateInput("runtime", value);
          }}
        >
          {IMAGE_PROFILES.runtimeProfiles.map((profile) => (
            <option key={profile.key} value={profile.key}>
              {profile.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Batch size
        <select
          aria-label="Select image batch size"
          value={input.batchSize}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (isImageBatchSize(value)) updateInput("batchSize", value);
          }}
        >
          {IMAGE_PROFILES.batchProfiles.map((profile) => (
            <option key={profile.batchSize} value={profile.batchSize}>
              {profile.batchSize} image{profile.batchSize > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>

      <label>
        Safety margin: {input.safetyMarginPercent}%
        <input
          aria-label="Set image safety margin percentage"
          min={0}
          max={50}
          step={5}
          type="range"
          value={input.safetyMarginPercent}
          onChange={(event) => updateInput("safetyMarginPercent", Number(event.target.value))}
        />
      </label>
    </>
  );
}

function LlmCalculatorResult({
  recommendationTier,
  result,
  selectedModelName,
}: {
  recommendationTier: string;
  result: VramEstimateResult;
  selectedModelName: string;
}) {
  return (
    <div className="calculator-result" aria-live="polite">
      <div className="estimate-badges" aria-label="Estimate status">
        <span>Planning estimate</span>
        <span>Not benchmark data</span>
        <span>Assumption profile {result.assumptionVersion}</span>
      </div>
      <p className="estimate-value">{result.estimatedVramGb.toFixed(1)} GB</p>
      <p className="estimate-minimum">
        Planning minimum: <strong>{result.recommendedMinimumVramGb} GB VRAM</strong>
      </p>
      <dl className="estimate-details">
        <div>
          <dt>Planning tier</dt>
          <dd>{recommendationTier}</dd>
        </div>
        <div>
          <dt>Selected model</dt>
          <dd>{selectedModelName}</dd>
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
      <GpuMatchSections
        planningGpuCandidates={result.planningGpuCandidates}
        sourceBackedGpuMatches={result.sourceBackedGpuMatches}
      />
      <ResultActions />
    </div>
  );
}

function MoeCalculatorResult({
  result,
  selectedModel,
}: {
  result: MoeEstimateResult;
  selectedModel: MoeModelOption | undefined;
}) {
  return (
    <div className="calculator-result" aria-live="polite">
      <div className="estimate-badges" aria-label="Estimate status">
        <span>MoE planning estimate</span>
        <span>Not benchmark data</span>
        <span>Assumption profile {result.assumptionVersion}</span>
      </div>
      <p className="estimate-value">{result.estimatedVramGb.toFixed(1)} GB</p>
      <p className="estimate-minimum">
        Planning minimum: <strong>{result.recommendedMinimumVramGb} GB VRAM</strong>
      </p>
      <dl className="estimate-details">
        <div>
          <dt>Planning tier</dt>
          <dd>{result.gpuTier}</dd>
        </div>
        <div>
          <dt>Selected model</dt>
          <dd>{selectedModel?.name ?? result.assumptionsUsed.modelLabel}</dd>
        </div>
        <div>
          <dt>Total parameters</dt>
          <dd>{result.assumptionsUsed.totalParameterCountB}B</dd>
        </div>
        <div>
          <dt>Active parameters</dt>
          <dd>{result.assumptionsUsed.activeParameterCountB}B</dd>
        </div>
        <div>
          <dt>Resident baseline</dt>
          <dd>{result.assumptionsUsed.residentParameterCountB}B</dd>
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
      {selectedModel ? (
        <section className="validation-signal" aria-label="MoE model facts">
          <div>
            <strong>Total and active parameters are separated</strong>
            <span>
              {selectedModel.contextLengthTokens
                ? `${selectedModel.contextLengthTokens.toLocaleString()} token source-backed context window`
                : "Context window needs verification"}
            </span>
          </div>
          <p>
            {selectedModel.architectureNotes ??
              "MoE architecture details are tracked separately from dense LLM model size."}
          </p>
        </section>
      ) : null}
      <p className="calculator-summary">{formatMoeVramResult(result)}</p>
      <p className="calculator-warning">{result.warning}</p>
      <ul className="calculator-notes">
        {result.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <GpuMatchSections
        planningGpuCandidates={result.planningGpuCandidates}
        sourceBackedGpuMatches={result.sourceBackedGpuMatches}
      />
      <ResultActions />
    </div>
  );
}

function ImageCalculatorResult({
  comparisons,
  result,
  selectedModelName,
}: {
  comparisons: ImageGenerationValidationComparison[];
  result: ImageGenerationEstimateResult;
  selectedModelName: string;
}) {
  const validatedComparisons = comparisons.filter((comparison) => comparison.status === "validated");
  const closestComparison = validatedComparisons[0];

  return (
    <div className="calculator-result" aria-live="polite">
      <div className="estimate-badges" aria-label="Estimate status">
        <span>Image workflow</span>
        <span>Planning estimate</span>
        <span>Not benchmark data</span>
        <span>Assumption profile {result.assumptionVersion}</span>
      </div>
      <p className="estimate-value">{result.estimatedVramGb.toFixed(1)} GB</p>
      <p className="estimate-minimum">
        Planning minimum: <strong>{result.recommendedMinimumVramGb} GB VRAM</strong>
      </p>
      <dl className="estimate-details">
        <div>
          <dt>Planning tier</dt>
          <dd>{result.gpuTier}</dd>
        </div>
        <div>
          <dt>Selected model</dt>
          <dd>{selectedModelName}</dd>
        </div>
        <div>
          <dt>Workflow</dt>
          <dd>{result.assumptionsUsed.workflowLabel}</dd>
        </div>
        <div>
          <dt>Resolution</dt>
          <dd>{result.assumptionsUsed.resolutionLabel}</dd>
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
      <p className="calculator-summary">
        {result.estimatedVramGb.toFixed(1)} GB image workflow planning estimate with assumption
        profile {result.assumptionVersion}; validate the exact pipeline before hardware decisions.
      </p>
      <p className="calculator-warning">{result.warning}</p>
      <section className="validation-signal" aria-label="Image generation validation signal">
        <div>
          <strong>{validatedComparisons.length} observed sample{validatedComparisons.length === 1 ? "" : "s"} tracked</strong>
          <span>Setup-specific evidence, not a guarantee.</span>
        </div>
        {closestComparison ? (
          <p>
            Similar sample: {closestComparison.sample.modelSlug} / {closestComparison.sample.runtime} /{" "}
            {closestComparison.sample.precision.toUpperCase()} observed{" "}
            {closestComparison.observedPeakVramGb?.toFixed(2)} GB vs current estimate{" "}
            {closestComparison.currentEstimateGb.toFixed(1)} GB.
          </p>
        ) : (
          <p>No observed sample is available for this exact image model yet.</p>
        )}
      </section>
      <ul className="calculator-notes">
        {result.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <GpuMatchSections
        planningGpuCandidates={result.planningGpuCandidates}
        sourceBackedGpuMatches={result.sourceBackedGpuMatches}
      />
      <ResultActions />
    </div>
  );
}
