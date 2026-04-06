---
domain: agent-logic
status: active
source: grok-research
---

# Forensic Analysis: Agentic JSON Edge-Case Logic

## Scope
This document defines resilient JSON intake behavior for high-integrity agent pipelines where malformed or non-standard payloads are expected.

## Edge Cases

### 1) Trailing Commas via JSON5
- Accept trailing commas in objects/arrays during tolerant parse phases.
- Normalize output to strict JSON before persistence.
- Preserve parse diagnostics so downstream validators can flag origin quality.

### 2) AST-Based Comment Stripping
- Tokenize or parse into AST before removing comments.
- Avoid regex-only stripping to prevent accidental mutation inside strings.
- Emit a transformation trace indicating stripped ranges and checksum deltas.

### 3) NaN/Infinity Coercion
- Detect non-finite numeric literals (`NaN`, `Infinity`, `-Infinity`).
- Coerce to explicit semantic placeholders (for example, `null` + diagnostic note) under policy.
- Record coercion decisions for auditability and deterministic replay.

### 4) BigInt Precision Management
- Detect numeric literals beyond IEEE-754 safe integer range.
- Store as canonical decimal strings or typed wrappers to avoid precision loss.
- Rehydrate to BigInt only in trusted runtime zones with explicit schema intent.

## Multi-Stage Resilience Pipeline
1. **Zod/Ajv Pre-Validation**
   - Fast gate checks for schema shape, required fields, and type boundaries.
2. **Tolerant Parsing**
   - JSON5 + controlled canonicalization for comments, trailing commas, and numeric anomalies.
3. **LLM-Based Semantic Repair**
   - Restricted repair pass for semantic inconsistencies (field intent mismatch, mislabeled enums, contradictory values).
   - Repairs must be explainable, diffed, and reviewable before hard commit.

## Forensic Controls
- Keep original payload hash, normalized payload hash, and repair hash chain.
- Require deterministic serializers for all post-repair outputs.
- Reject silent repair; all remediation must produce machine-readable provenance.
