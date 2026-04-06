# Adversarial Detection for Declarative Agents

This guidance captures high-dimensional filtering and stenographic neutralization patterns aligned with `embedder.py` and `detector.py` style workflows.

## High-Dimensional Filtering
- Project prompts, tool outputs, and memory fragments into embedding space.
- Apply multi-threshold anomaly scoring:
  - distance from trusted centroid sets
  - local density deviation
  - cross-domain semantic drift
- Route high-risk vectors to quarantine lanes before agent policy execution.

## Steganographic Neutralization
- Detect covert channels in low-salience token regions, unusual delimiter cadence, and entropy spikes.
- Canonicalize formatting and normalize token boundaries prior to semantic interpretation.
- Strip or mask hidden payload carriers while preserving user-visible meaning where possible.

## Detection Pipeline
1. Embed and classify against known-safe and known-adversarial manifolds.
2. Run detector ensembles for obfuscation signatures and latent instruction injection.
3. Neutralize suspicious segments and annotate exact offsets.
4. Re-score sanitized output; block if residual risk exceeds policy budget.

## Audit Requirements
- Persist model version, detector thresholds, and confidence scores.
- Store pre/post neutralization digests for reproducibility.
- Enforce human-review mode for repeated high-risk sources.
