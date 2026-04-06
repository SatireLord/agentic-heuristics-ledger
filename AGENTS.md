---
domain: agentic-heuristics-ledger
status: binding
source: AGENTS.md
---
# Universal AI Agent Operating Manual & System Constraints: Agentic Heuristics Ledger

**STATUS:** BINDING / MANDATORY  
**ROLE:** This document defines the absolute legal execution boundaries for all agents operating within the `agentic-heuristics-ledger`. It overrides all architectural prose and task-specific implementation suggestions.  
[AGENTS-UPDATE] (060426, Grok/Gemini): Final canonical synthesis; zero horizontal drift; metadata taxonomy tightened for RAG determinism.

## I. NORMATIVE LANGUAGE & EXECUTION CONTROL
- **MUST / SHALL**: Absolute requirement. Agent execution fails if not met.
- **SHOULD**: Recommended unless justified, documented [FRICTION] exception provided.
- **System Planning Mode (Default):** Agents MUST NOT generate functional implementation code during initial prompts or architectural discussions. Output MUST be restricted to theoretical architecture mapping, byte-level specification, causal logic sequences, and step-by-step validation.
- **The "IMPLEMENTATION AUTHORIZED" Gate:** Agents SHALL ONLY generate functional code blocks when the user explicitly includes the exact phrase: `"IMPLEMENTATION AUTHORIZED"` in their prompt.

## II. THE SOURCE-OF-TRUTH & ANTI-HALLUCINATION RULES
1. **Cite Before Writing:** Agents MUST NOT re-architect or invent new infrastructural layers without first citing existing file paths, classes, and symbol names.
2. **No-Guessing Rule:** If a required datum is missing (repository name, target method name, path, framework version), the agent MUST halt and ask the user. Do not infer or guess targets.
3. **Evidence-Backed Claims:** Any statement claiming a feature is "already implemented," "missing," or "broken" MUST include the exact file path and function/class name as proof.

## III. THE CODEX CONVERGENCE LAW (BINDING)
All task invocations are Deterministic Execution Units. If a rule cannot be satisfied, ABORT and emit a `[FRICTION]` comment.
1. **Authority Hierarchy:** `AGENTS.md` > Task Description > In-Code Comments > Architectural Documents > Commit History.
2. **Subsystem Lock & Surface Budget:** Modify code in only the primary subsystems and their direct dependencies. Do not cleanup, restyle, or "fix" adjacent code.
3. **Dependency Gate:** No new dependencies without explicit authorization, exact package name, exact version, and justification. Missing any? ABORT.
4. **Deterministic Exit State:** Every task must converge to a Stable, Buildable State. Zero speculation. No placeholder stubs, fake integration points, or "TODO" scaffolding.

## IV. AWP FILE ENTRY & ENVIRONMENTAL AUDITOR PROTOCOL
**INVARIANT:** No logic mutation, feature implementations, or iterations shall commence until the following Top-Down Header Scan and audit are performed at index 0.

### The Environmental Key (Header Template)
Agents MUST audit and document these specific points in the "Header Quarantine Zone" (first 25 lines):
A. **Programming Languages:** Explicitly list dialects (e.g., Node.js 20, Markdown, JSON5, YAML).
B. **Syntax Nuances:** Document specific differences (e.g., AST walker limits, Zod schema strictness).
C. **Reference Material:** Relevant URLs or documentation paths.
D. **Dependency Versioning:** Known bugs or constraints (e.g., `gray-matter` YAML parsing constraints).
E. **Environment Quirks:** Platform traps (e.g., macOS CRLF vs LF hashing collisions).
F. **Coding Lineup Sequence:** Exact execution order (e.g., `export-knowledge.js` Step 2).
G. **Friction & Integrity Risks:** Logic forks, OOM triggers, or areas prone to corruption.

## V. MACHINE-PARSEABLE COMMENT & EVOLUTION DISCIPLINE
All non-trivial changes must include intent-level comments.
* **[INTENT]:** Why this decision exists (the goal).
* **[INVARIANT]:** Rules that must NEVER be broken (safety/constraints).
* **[CONTEXT]:** Assumptions, dependencies, or design history.
* **[FRICTION]:** Logic forks, ambiguities, or inferred context.
* **[AGENTS-UPDATE]:** Spec changes with date + reason.

### Evolution & Discovery Logging
* **Format A (Evolution):** `// [EVOLUTION] (DDMMYY, AgentName): [Description of discovery or change]`.
* **Format B (Discovery):** `[(TIMESTAMP)] DISCOVERY: [Descriptor] | [Scope]`.
* **Zero-Overwrite:** Never delete existing tags. All logs are strictly additive to maintain Forensic Continuity.

## VI. ARCHITECTURAL & SYSTEM INVARIANTS
1. **Memory & Scale Constraints:** No monolithic buffering. Propose chunked, streamed, or paginated data processing. Truncate massive error objects before JSON serialization to prevent OOM crashes.
2. **State & Persistence:** Any proposed file system mutation or state change MUST be mathematically idempotent. Critical file moves MUST use atomic operations.
3. **Boundary & Interface Strict Typing:** Every new API endpoint, interface, or IPC bridge MUST explicitly state: Direction/Protocol, Casing Rules, Time/Units (e.g., UTC ISO-8601), and Nullability.
4. **Hash-Normalization:** Any filesystem read intended for hashing MUST apply line-ending normalization (`CRLF` to `LF`) before encoding to prevent cross-platform CI integrity failures.

## VII. THE FAILURE LEDGER & AUTOPSY PROTOCOL
1. **Pre-Flight Check:** Before beginning any task, the agent MUST read `docs/FailureRuns.md` (or local equivalent ledger).
2. **Erasing is Failure:** Overwriting functional polish or legacy QoL optimizations with "cleaner" but less feature-rich code is a Protocol Violation.
3. **Autopsy Write Trigger:** Upon successful resolution of a bug, execution of a fix, or bypassing a previously logged FRICTION state, the agent MUST append a standardized JSON-style block detailing the FAILED state, causal mechanism, deterministic fix, and active dependencies.

## VIII. SPECULATIVE WORK & IDEA CONTAINMENT
Production code must remain convergent. All speculative thinking is quarantined.
* **Forbidden in Code:** TODOs for future phases, placeholder methods, commented-out features.
* **The Quarantine:** All out-of-scope ideas must be written to `docs/IdeaDump.md` using the following JSON block:

    {
      "IDEA-[YYYYMMDD]-[SHORT-SLUG]": {
        "INTENT": "One sentence description.",
        "WHY_IT_EXISTS": "Problem it solves.",
        "DEPENDENCIES": "Subsystems/files/libs required.",
        "BLOCKERS": "Underspecification or risks.",
        "RELATED_TASKS": "Future phases."
      }
    }

## IX. LEDGER-SPECIFIC INVARIANTS
1. **Serialization Determinism:** `knowledge-export.json` payload keys must be deterministically ordered before SHA-256 checksum generation.
2. **YAML Frontmatter Mandate:** Every Markdown artifact MUST contain `domain`, `status`, and `source`. The build script will fatally reject non-compliant files.
3. **Manifest Evolution (Schema Versioning):** Every JSON manifest MUST include a top-level `"version": <int>` field. Modifying schemas without incrementing the version and providing a migration path is a Protocol Violation.
4. **AST Non-Destruction:** Comment stripping inside JSON payload models must utilize AST walkers; regex-only stripping is a protocol violation.
5. **Path Confinement:** Allowlist roots are strictly confined to predefined secure directories. Deny operations must trigger synchronous audit appends.
6. **RAG Provenance:** All agent outputs MUST reference source file+line for claims.

## X. METADATA & DATA PROVENANCE TAXONOMY
1. **Mandatory Frontmatter Ontology:** The required `domain`, `status`, and `source` YAML keys must map strictly to a centralized ontology ledger. Free-text or ad-hoc values are prohibited.  
   Example:
   ```yaml
   ---
   domain: agentic-heuristics-ledger
   status: binding
   source: AGENTS.md
   ---
2. NotebookLM Conlang Anchors: Agents MUST wrap critical semantic nodes in machine-parseable brackets (e.g., [[ENTITY: Kuz-Sylícon Prīma]], [[DEF: exact definition]]) to bind conceptual logic.

3. Relational Tagging: Inter-file dependencies must be explicitly tagged at EOF using deterministic relational links.

Topic: Conlang Anchors as Bounded Semantic Nodes
Information: Retained and formalized Grok's example of the NotebookLM conlang syntax (`[[ENTITY: Kuz-Sylícon Prīma]]`) in Section X.2.
Explanation: Utilizing specific, lore-accurate entities or terms already present in your architectural models ensures that the parsing engine recognizes the exact string match required to bind a concept, rather than relying on fuzzy semantic proximity.
Details: When a downstream retrieval system encounters these brackets, it strips away the surrounding contextual noise and indexes the relationship natively. This physically prevents horizontal drift where an LLM might attempt to synonymize or dilute highly specific terms (such as renaming "Kuz-Sylícon Prīma" to "alien robots") during a summary generation.

## XI. PUBLIC PORTFOLIO INTERACTION PROTOCOL (Added 06-Apr-2026)

**INTENT**: Bind all agents to treat the four public artifacts in the system-governance-standards repository as immutable governance vectors while preserving strict Air-Gap isolation.

**INVARIANT**: Never modify, delete, or expose raw code from SYSTEM_DESIGN.md, DECLARATIVE_AGENT_MANIFEST.json, CONTRIBUTING.md, or GEM_ORCHESTRATION.md. All interactions MUST be read-only and reference-only.

**CONTEXT**: These four files satisfy Microsoft’s exact artifact submission gate (PitchMeAI 2026) for declarative-agent and repository-governance experience. They are the sole public proof layer.

**FRICTION**: Any agent attempting to edit these files in the public repo triggers immediate ABORT and [FRICTION] log.

### Interaction Rules (All Agents MUST Obey)
1. When reading SYSTEM_DESIGN.md → extract only INTENT/INVARIANT/CONTEXT/FRICTION tags; never infer executable logic.
2. When reading DECLARATIVE_AGENT_MANIFEST.json → validate against schema v1.6 only; never alter instructions or capabilities.
3. When reading CONTRIBUTING.md → enforce branching/PR rules on every commit to the public repo.
4. When reading GEM_ORCHESTRATION.md → reference only high-level QLOP/Split-and-Seed patterns; never output actual Gemini Gem prompts.
5. Before any public commit: run `npm run build` and verify knowledge-export.json checksum matches AGENTS.md invariant.

**AGENTS-UPDATE** (060426): Added Section XI – Public Portfolio Interaction Protocol to enforce Air-Gap on Microsoft-facing artifacts.
