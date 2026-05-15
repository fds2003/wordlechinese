import { readFile, writeFile } from 'fs/promises';

const BATCH_SIZE = 15;
const MAX_RETRIES = 2;
const API_KEY = process.env.DEEPSEEK_API_KEY;

if (!API_KEY) {
  console.error('Usage: DEEPSEEK_API_KEY=sk-xxx node scripts/translate-definitions.mjs');
  process.exit(1);
}

const API_URL = 'https://api.deepseek.com/v1/chat/completions';
const defsPath = new URL('../game-data/idiom-definitions.json', import.meta.url);

const definitions = JSON.parse(await readFile(defsPath, 'utf8'));
const entries = Object.entries(definitions);
const pending = entries.filter(([, def]) => def.zh && !def.en);
const done = entries.length - pending.length;

console.log(`Definitions: ${entries.length} total, ${done} done, ${pending.length} pending`);
if (pending.length === 0) { console.log('Nothing to translate.'); process.exit(0); }

let translated = 0;

async function translateBatch(batch) {
  const items = batch.map(([, def], i) => `${i + 1}. ${def.zh}`).join('\n');
  const body = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: `Translate ${batch.length} Chinese idiom explanations to English. Return ONLY the translations, one per line, numbered 1. to ${batch.length}.` },
      { role: 'user', content: items },
    ],
    temperature: 0.1,
    max_tokens: 2048,
  };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || '';
  const lines = text.split('\n').filter(l => /^\d+\./.test(l));
  if (lines.length < batch.length) throw new Error(`Got ${lines.length}/${batch.length} lines`);
  lines.forEach((line, i) => {
    const translation = line.replace(/^\d+\.\s*/, '').trim();
    if (translation) definitions[batch[i][0]].en = translation;
  });
}

for (let i = 0; i < pending.length; i += BATCH_SIZE) {
  const batch = pending.slice(i, i + BATCH_SIZE);
  let success = false;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      await translateBatch(batch);
      success = true;
      break;
    } catch (err) {
      if (attempt < MAX_RETRIES) { await new Promise(r => setTimeout(r, 1000)); continue; }
      console.error(`\nFailed batch ${i}: ${err.message}`);
    }
  }
  if (!success) {
    await writeFile(defsPath, JSON.stringify(definitions));
    console.log(`Saved ${done + translated} entries.`);
    process.exit(1);
  }
  translated += batch.length;
  await writeFile(defsPath, JSON.stringify(definitions));
  process.stdout.write(`\rProgress: ${done + translated}/${entries.length}`);
  await new Promise(r => setTimeout(r, 50));
}

console.log(`\nDone. All ${entries.length} entries translated.`);
