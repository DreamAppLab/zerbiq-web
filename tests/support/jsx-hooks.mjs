// Node module hooks so tests can import and RENDER the site's real page files
// (JSX in .js files, the "@/" path alias, CSS imports) without a Next build.
// Registered by tests that render pages: register('./support/jsx-hooks.mjs', import.meta.url).
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transform } from 'sucrase';

const ROOT = new URL('../../', import.meta.url);
const ROOT_PATH = fileURLToPath(ROOT);

function inRepoSource(url) {
  if (!url.startsWith('file:')) return false;
  const p = fileURLToPath(url);
  // fileURLToPath gives the platform's separators (backslashes on Windows).
  return p.startsWith(ROOT_PATH) && !p.split(sep).includes('node_modules');
}

export async function resolve(specifier, context, nextResolve) {
  let spec = specifier;
  if (spec.startsWith('@/')) spec = new URL(spec.slice(2), ROOT).href;
  try {
    return await nextResolve(spec, context);
  } catch (err) {
    if (err?.code !== 'ERR_MODULE_NOT_FOUND' && err?.code !== 'ERR_UNSUPPORTED_DIR_IMPORT') throw err;
    // Extensionless imports, as Next allows ('./ZIcon', 'next/link').
    for (const ext of ['.js', '.mjs', '/index.js']) {
      try {
        return await nextResolve(spec + ext, context);
      } catch {
        // try the next extension
      }
    }
    throw err;
  }
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('.css')) return { format: 'module', source: '', shortCircuit: true };
  if (inRepoSource(url) && /\.(js|jsx)$/.test(url) && existsSync(fileURLToPath(url))) {
    const src = await readFile(fileURLToPath(url), 'utf8');
    const { code } = transform(src, {
      transforms: ['jsx'],
      jsxRuntime: 'automatic',
      production: true,
      filePath: fileURLToPath(url),
    });
    return { format: 'module', source: code, shortCircuit: true };
  }
  return nextLoad(url, context);
}

export const ROOT_URL = pathToFileURL(ROOT_PATH).href;
