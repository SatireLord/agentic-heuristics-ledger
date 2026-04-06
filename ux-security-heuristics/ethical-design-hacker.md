---
domain: ux-security
status: active
source: grok-4.20-expert
---

# Security UX Heuristics

Patterns from `AdversarialGuardian.cs` and `CipherService.cs`:

## Transparent Extraction
UI patterns that explicitly visualize the "Guardian" intervention when an agent attempts to access restricted memory sectors.

## Cryptographic Anchoring
Ensuring every declarative instruction is signed via `CipherService` to verify the authenticity of the logic manifest.

```javascript
const generateManifest = (state, policyId) => {
  const hash = crypto.createHash('sha256').update(JSON.stringify(state)).digest('hex'); // [3]
  return {
    preStateHash: hash,
    policyId: policyId,
    timestamp: Date.now() // [4]
  };
};
```