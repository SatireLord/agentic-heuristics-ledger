const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');

const REPO_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIRECTORIES = [
  'research',
  'corpus-engineering',
  'declarative-agents',
  'ux-security-heuristics'
];

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

  const destination = path.join(REPO_ROOT, 'knowledge-export.json');
  await fs.writeFile(destination, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`Exported ${documents.length} documents to ${destination}`);
}

buildKnowledgeExport().catch((error) => {
  console.error('Failed to export knowledge graph:', error);
  process.exitCode = 1;
});
