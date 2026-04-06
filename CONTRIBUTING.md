---
domain: repository-governance
status: binding
source: AGENTS.md
---
# CONTRIBUTING.md

## Branching Strategy
All feature work MUST use feature/agent-capability-[name] branches.

## Commit Message Hygiene
Every commit MUST begin with one of: feat:, fix:, docs:, refactor:, chore:.

## Pull Request Requirements
- Linked GitHub issue
- Schema validation of all Markdown frontmatter
- Successful npm run build with matching SHA-256 checksum in knowledge-export.json
