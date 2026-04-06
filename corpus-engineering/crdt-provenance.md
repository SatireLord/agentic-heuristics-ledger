# CRDT Provenance Patterns

This document captures enterprise CRDT design motifs aligned to `CRDTMetadata.cs` and `DocumentHistoryService.cs` style provenance handling.

## Causal Consistency via Vector Clocks
- Attach vector clocks to every operation to preserve causal ordering.
- Increment local actor counters per mutation and merge remote counters by max-per-actor rules.
- Use happened-before checks to separate concurrent edits from stale updates.

## Tombstone Propagation
- Represent deletions as tombstones rather than immediate hard-removal.
- Gossip tombstones across replicas until convergence guarantees are met.
- Include tombstone epoch/version metadata so compaction can safely prune fully observed deletions.

## Semantic Merging Logic
- Resolve concurrent changes with intent-aware rules, not blind last-write-wins.
- Maintain operation provenance (actor, timestamp, vector state, merge rationale).
- For structured documents, merge at field/segment granularity with conflict markers where intent is ambiguous.

## Provenance Envelope
- Every merge should emit:
  - pre-state digest
  - operation set digest
  - post-state digest
  - rationale for conflict choices
- `DocumentHistoryService`-style history streams should remain append-only for audit replay.
