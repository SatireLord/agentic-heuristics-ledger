// A. Programming Languages: Node.js 20+, JavaScript (ESM/CommonJS hybrid logic)
// B. Syntax Nuances: Uses fs/promises for non-blocking I/O; utilizes AST-lite via gray-matter.
// C. Reference Material: https://github.com/SatireLord/agentic-heuristics-ledger/blob/main/AGENTS.md
// D. Dependency Versioning: gray-matter ^4.0.3, crypto (native)
// E. Environment Quirks: Path normalization required for cross-platform (macOS/Linux) hash consistency.
// F. Coding Lineup Sequence: 1. Setup -> 2. Walk Directories -> 3. Inject Root Files -> 4. Parse & Sort -> 5. Hash & Write.
// G. Friction & Integrity Risks: Improper key sorting before hashing will cause CI failure on identical content.

const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');
const crypto = require('crypto');

// [INVARIANT]: REPO_ROOT must be absolute to prevent path-traversal or relative leak during execution.
const REPO_ROOT = path.resolve(__dirname, '..');
// [CONTEXT]: Child directories containing domain-specific markdown artifacts.
const SOURCE_DIRECTORIES = ['research', 'corpus-engineering', 'declarative-agents', 'ux-security-heuristics'];
// [AGENTS-UPDATE] (060426): Added ROOT_LEVEL_FILES to capture AGENTS.md master ledger. // [1]
const ROOT_LEVEL_FILES = ['AGENTS.md', 'README.md'];
const DESTINATION = path.join(REPO_ROOT, 'knowledge-export.json');

async function walkDirectory(directoryPath) {
  let entries;
  try {
    entries = await fs.readdir(directoryPath, { withFileTypes: true });
  } catch {
    return []; // [FRICTION]: Suppress error for empty or missing directories to allow partial builds.
  }

  const results = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directoryPath, entry.name);
      return entry.isDirectory() ? walkDirectory(fullPath) : fullPath;
    })
  );

  return results.flat();
}

async function validateAndExport(output) {
  // [INVARIANT]: Every document MUST have a domain field in its frontmatter.
  output.documents.forEach(doc => {
    if (!doc.frontmatter || !doc.frontmatter.domain) {
      throw new Error(`[VALIDATION FAILURE]: Missing 'domain' field in ${doc.path}`);
    }
  });

  // [INTENT]: Serialize with deterministic key ordering and Unix-style line endings to ensure hash stability. // [2]
  const content = JSON.stringify(output, Object.keys(output).sort(), 2) + '\n';
  const checksum = crypto.createHash('sha256').update(content).digest('hex');
  output.checksum = checksum;

  await fs.writeFile(DESTINATION, JSON.stringify(output, null, 2), 'utf8');
}

async function buildKnowledgeExport() {
  const markdownFilesNested = await Promise.all(
    SOURCE_DIRECTORIES.map((relativeDir) => walkDirectory(path.join(REPO_ROOT, relativeDir)))
  );

  // [CONTEXT]: Combine nested directory hits with hardcoded root files.
  let markdownFiles = markdownFilesNested.flat().filter((filePath) => filePath.endsWith('.md'));
  
  ROOT_LEVEL_FILES.forEach(file => {
    const filePath = path.join(REPO_ROOT, file);
    // [FRICTION]: Use stat to verify existence since root files are manual injections.
    markdownFiles.push(filePath);
  });

  const documents = await Promise.all(
    markdownFiles.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf8');
      const parsed = matter(raw);
      return {
        // [INVARIANT]: Paths MUST use forward-slashes for cross-platform checksum alignment.
        path: path.relative(REPO_ROOT, filePath).replaceAll(path.sep, '/'),
        frontmatter: parsed.data,
        content: parsed.content.trim()
      };
    })
  );

  // [INVARIANT]: Deterministic sort of document objects by path before output.
  documents.sort((a, b) => a.path.localeCompare(b.path));

  const output = {
    version: 1, // [AGENTS-UPDATE]: Initial schema versioning.
    generatedAt: new Date().toISOString(),
    sources: [...SOURCE_DIRECTORIES, 'root'],
    documents
  };

  await validateAndExport(output);
  console.log(`[SUCCESS]: Exported ${documents.length} documents with SHA-256 checksum.`);
}

buildKnowledgeExport().catch((error) => {
  console.error('[FATAL]: Export failed:', error);
  process.exitCode = 1;
});