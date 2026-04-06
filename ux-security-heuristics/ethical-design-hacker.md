# Ethical Design Hacker Heuristics

This document outlines transparent extraction and cryptographic anchoring patterns aligned to `AdversarialGuardian.cs` and `CipherService.cs` style controls.

## Transparent Extraction
- Security extraction steps must be visible, explainable, and bounded by declared policy.
- Label each extracted artifact with source span, extraction rationale, and confidence.
- Prevent opaque hidden-rule transformations that users and auditors cannot inspect.

## Cryptographic Anchoring
- Anchor critical security decisions to signed event records.
- Use hash chains to bind extraction outputs, policy context, and final action decisions.
- Verify anchor integrity before replay, rollback, or incident forensics.

## Governance Pattern
- Pair guardian decision engines with cryptographic services for tamper-evident trails.
- Separate duties: policy adjudication, cryptographic sealing, and audit retrieval.
- Require deterministic serialization before signing to avoid signature drift.

## Ethical Constraints
- Favor reversible neutralization over destructive redaction when safe.
- Minimize over-collection during extraction; collect only policy-relevant artifacts.
- Escalate uncertain adversarial findings instead of silently suppressing user intent.
