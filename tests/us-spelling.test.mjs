// US spelling guard (owner decision: Zerbiq uses US spelling).
// Fails if the British spelling of "color" appears, in any form or case, in a tracked file's
// text or file name (source, docs, tests). ALLOWED lists documented external-contract
// exceptions (path -> line patterns); it is empty: nothing here needed one.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const WORD = new RegExp(['col', 'our'].join(''), 'i') // assembled so this file does not match itself
const ALLOWED = {}
const SKIP_NAMES = new Set(['package-lock.json'])
const SKIP_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.pdf', '.ttf', '.otf', '.woff', '.woff2', '.zip', '.mp4', '.svg'])

function findHits(files, read) {
  const hits = []
  for (const rel of files) {
    if (SKIP_NAMES.has(path.basename(rel)) || rel.includes('node_modules/')) continue
    if (SKIP_EXT.has(path.extname(rel).toLowerCase())) continue
    if (WORD.test(rel)) hits.push(`${rel}: file name`)
    const text = read(rel)
    if (text === null) continue
    const allow = ALLOWED[rel] ?? []
    text.split(/\r?\n/).forEach((line, i) => {
      if (WORD.test(line) && !allow.some((re) => re.test(line))) hits.push(`${rel}:${i + 1}: ${line.trim().slice(0, 120)}`)
    })
  }
  return hits
}

function readTracked(rel) {
  try {
    const buf = fs.readFileSync(path.join(ROOT, rel))
    return buf.includes(0) ? null : buf.toString('utf8')
  } catch {
    return null
  }
}

test('no British spelling of color in tracked files (code, text, docs, tests)', () => {
  const out = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  assert.deepEqual(findHits(out.split('\0').filter(Boolean), readTracked), [])
})

test('the guard catches every form, with file and line, and file names', () => {
  const brit = ['col', 'our'].join('')
  const files = {
    'a.js': `ok\nconst ${brit}Type = 1\n// ${brit.toUpperCase()}S and ${brit}ed\n`,
    [`${brit}s.md`]: 'fine\n',
    'package-lock.json': `{"x":"${brit}"}`,
  }
  const hits = findHits(Object.keys(files), (rel) => files[rel] ?? null)
  assert.deepEqual(hits, [`a.js:2: const ${brit}Type = 1`, `a.js:3: // ${brit.toUpperCase()}S and ${brit}ed`, `${brit}s.md: file name`])
})
