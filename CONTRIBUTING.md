# Contributing

## Forensic Documentation Standards

All knowledge artifacts must follow forensic-grade authoring requirements:

1. **Mandatory YAML frontmatter**
   - Every new markdown artifact must begin with YAML frontmatter.
   - Minimum recommended keys: `domain`, `status`, `source`.

2. **Strict JSON examples**
   - JSON examples must be syntactically valid unless explicitly documenting malformed cases.
   - Any non-standard JSON behavior must be labeled and explained.

3. **Forensic nomenclature**
   - Use consistent incident and audit language: provenance, causal chain, coercion, neutralization, anchoring.
   - Prefer deterministic and testable terminology over ambiguous narrative language.

Submissions that do not meet these standards should be revised before merge.
