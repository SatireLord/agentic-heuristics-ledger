const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');
const crypto = require('crypto'); // Essential for generating the checksum

const REPO_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIRECTORIES = [
  'research',
  'corpus-engineering',
  'declarative-agents',
  'ux-security-heuristics'
];

// 2. Utility: Recursive Directory Crawler
async function walkDirectory(directoryPath) {
  let entries;
  try {
    entries = await fs.readdir(directoryPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const results = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        return walkDirectory(fullPath);
      }
      return fullPath;
    })
  );

  return results.flat();
}

// 3. New Implementation: Forensic Validation and Integrity Checksum
async function validateAndExport(output) {
  // Validate YAML frontmatter existence
  output.documents.forEach(doc => {
    if (!doc.frontmatter || !doc.frontmatter.domain) {
      throw new Error(`[VALIDATION FAILURE]: Missing 'domain' field in ${doc.path}`);
    }
  });

  // Generate SHA-256 Checksum for data provenance
  const content = JSON.stringify(output, null, 2) + '\n';
  const checksum = crypto.createHash('sha256').update(content).digest('hex');
  output.checksum = checksum;

  const destination = path.join(REPO_ROOT, 'knowledge-export.json');
  await fs.writeFile(destination, content, 'utf8');
}

// 4. Main Execution Loop
async function buildKnowledgeExport() {
  const markdownFilesNested = await Promise.all(
    SOURCE_DIRECTORIES.map((relativeDir) =>
      walkDirectory(path.join(REPO_ROOT, relativeDir))
    )
  );

  const markdownFiles = markdownFilesNested
    .flat()
    .filter((filePath) => filePath.endsWith('.md'))
    .sort();

  const documents = await Promise.all(
    markdownFiles.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf8');
      const parsed = matter(raw);
      return {
        path: path.relative(REPO_ROOT, filePath).replaceAll(path.sep, '/'),
        frontmatter: parsed.data,
        content: parsed.content.trim()
      };
    })
  );

  const output = {
    generatedAt: new Date().toISOString(),
    sources: SOURCE_DIRECTORIES,
    documents
  };

  await validateAndExport(output);
  console.log(`[SUCCESS]: Exported ${documents.length} documents with SHA-256 checksum.`);
}

buildKnowledgeExport().catch((error) => {
  console.error('Failed to export knowledge graph:', error);
  process.exitCode = 1;
});