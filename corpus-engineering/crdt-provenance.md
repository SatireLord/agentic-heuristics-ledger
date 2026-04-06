---
domain: corpus-engineering
status: active
source: grok-4.20-expert
---

# CRDT Provenance Patterns

Derived from `CRDTMetadata.cs` and `DocumentHistoryService.cs`:

## Causal Consistency via Vector Clocks
Implementation of vector clocks ensures partial ordering of agentic edits across distributed sectors.

```javascript
function mergeClocks(local, remote) {
  const merged = { ...local }; // [1]
  for (const [actor, counter] of Object.entries(remote)) {
    merged[actor] = Math.max(merged[actor] || 0, counter); // [2]
  }
  return merged;
}
```

## Conflict Resolution
* **Tombstone Propagation:** Logic for managing deleted nodes in multi-agent environments to prevent "resurrected data" during concurrent synchronization.
* **Last-Write-Wins (LWW) vs. Semantic Merging:** Defining conflict resolution strategies where agent intent overrides timestamp priority in non-scalar fields.