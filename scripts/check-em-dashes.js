#!/usr/bin/env node
/*
 * Build-time check: fail if U+2014 (em dash) appears in tracked source content.
 *
 * Locked by SITE_SPEC.md § 1.6 voice rule 8 ("No em dashes. Hyphens, colons,
 * periods only.") and standing deliverable #5 ("Lint U+2014 across all copy
 * files; fail the build on violation."). CLAUDE.md Hard Rules echoes the same.
 *
 * Scans:
 *   - app/        (recursively; all source modules + JSON-LD strings)
 *   - public/llms.txt
 *
 * Excluded by design (these describe the rule or quote it, so they would
 * false-positive): SITE_SPEC.md, CLAUDE.md, deviations.md, tracker.md, docs/,
 * reference/. They are simply absent from the scan list above.
 *
 * On any hit, reports `file:line:column: em dash (U+2014) found` plus the
 * offending line and a caret, then exits 1.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EM_DASH = '—';

const SCAN_PATHS = ['app', 'public/llms.txt'];

const SCAN_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.txt',
  '.json',
  '.md',
  '.html',
]);

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function gatherFiles() {
  const files = [];
  for (const rel of SCAN_PATHS) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    if (fs.statSync(abs).isDirectory()) {
      for (const file of walk(abs)) {
        if (SCAN_EXTENSIONS.has(path.extname(file))) files.push(file);
      }
    } else {
      files.push(abs);
    }
  }
  return files;
}

function scanFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let col = -1;
    while ((col = line.indexOf(EM_DASH, col + 1)) !== -1) {
      hits.push({ line: i + 1, column: col + 1, context: line });
    }
  }
  return hits;
}

function relPosix(p) {
  return path.relative(ROOT, p).split(path.sep).join('/');
}

function main() {
  const files = gatherFiles();
  let total = 0;
  for (const file of files) {
    const hits = scanFile(file);
    if (hits.length === 0) continue;
    const rel = relPosix(file);
    for (const hit of hits) {
      const pointer = ' '.repeat(Math.max(0, hit.column - 1)) + '^';
      console.error(`${rel}:${hit.line}:${hit.column}: em dash (U+2014) found`);
      console.error(`  ${hit.context}`);
      console.error(`  ${pointer}`);
      total++;
    }
  }
  if (total > 0) {
    const fileWord = files.length === 1 ? 'file' : 'files';
    const dashWord = total === 1 ? 'em dash' : 'em dashes';
    console.error(`\n${total} ${dashWord} found across ${files.length} scanned ${fileWord}.`);
    console.error('Use hyphens (-), colons, or periods. See CLAUDE.md Hard Rules and SITE_SPEC.md § 1.6 voice rule 8.');
    process.exit(1);
  }
  console.log(`em-dash linter: clean (${files.length} files scanned).`);
}

main();
