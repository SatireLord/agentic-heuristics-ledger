---
domain: systems-governance
status: binding
source: AGENTS.md
---
# SYSTEM_DESIGN.md

## Chronos Secure Subsystem (Valora Project)
**INTENT**: Provide deterministic memory safety and cryptographic airlocks for offline-first document persistence.
**INVARIANT**: Only the active user viewport sector remains in plaintext memory; all adjacent sectors remain sealed with AES-GCM.
**CONTEXT**: Hybrid C#/.NET 8 + GDScript architecture governed by Axiom Weaver Protocol.
**FRICTION**: Full-string diff_match_patch triggers Gen-2 GC pressure during autosaves.

### Cryptographic Airlocks
- Master key derivation uses PBKDF2-SHA256 with randomized 16-byte salts and minimum 100,000 iterations.
- Sector-Based Encryption segments documents into discrete EncryptedSector objects.
- Deterministic memory scrubbing employs CryptographicOperations.ZeroMemory to obliterate transient plaintext buffers.
