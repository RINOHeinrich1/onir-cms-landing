import fs from "node:fs";
import path from "node:path";
import allLocales from "../src/_data/allLocales.js";

const root = process.cwd();
const i18nRoot = path.join(root, "i18n");
const reference = "fr";
const allowedTags = new Set(["a", "br", "code", "em", "strong"]);
const forbiddenPattern = /<(script|iframe|object|embed|style)\b|javascript:|on\w+\s*=/i;
const optionalKeys = new Set([
  "common.reviewNotice",
  "legal.legalNotice",
  "privacy.legalNotice",
  "participate.sponsor.runtimeNotice",
]);

function readLocale(code) {
  const directory = path.join(i18nRoot, code);
  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
  const data = {};

  for (const file of files) {
    const key = path.basename(file, ".json");
    data[key] = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
  }

  return data;
}

function flatten(value, prefix = "", out = {}) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${prefix}[${index}]`, out));
    return out;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      flatten(item, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }
  out[prefix] = value;
  return out;
}

function placeholders(value) {
  if (typeof value !== "string") return [];
  return [...value.matchAll(/\{\{\s*([\w.]+)\s*\}\}/g)].map((match) => match[1]).sort();
}

function checkHtml(key, value, errors) {
  if (typeof value !== "string") return;
  if (forbiddenPattern.test(value)) {
    errors.push(`HTML interdit dans ${key}`);
  }
  for (const match of value.matchAll(/<\/?([a-z0-9-]+)/gi)) {
    if (!allowedTags.has(match[1].toLowerCase())) {
      errors.push(`Balise <${match[1]}> interdite dans ${key}`);
    }
  }
}

const localeCodes = fs
  .readdirSync(i18nRoot)
  .filter((entry) => fs.statSync(path.join(i18nRoot, entry)).isDirectory());

for (const locale of allLocales.filter((item) => item.available)) {
  if (!localeCodes.includes(locale.code)) {
    console.error(`[i18n] Locale disponible sans dossier : ${locale.code}`);
    process.exitCode = 1;
  }
}

const referenceData = flatten(readLocale(reference));
const referenceKeys = new Set(Object.keys(referenceData));
let errorCount = 0;

for (const code of localeCodes) {
  const data = flatten(readLocale(code));
  const keys = new Set(Object.keys(data));
  const errors = [];

  for (const key of referenceKeys) {
    if (!keys.has(key)) {
      errors.push(`Clé manquante : ${key}`);
    }
  }
  for (const key of keys) {
    if (!referenceKeys.has(key)) {
      errors.push(`Clé en trop : ${key}`);
    }
  }

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string" && value.trim() === "" && !optionalKeys.has(key)) {
      errors.push(`Valeur vide : ${key}`);
    }
    checkHtml(key, value, errors);

    const base = referenceData[key];
    if (typeof base === "string" && typeof value === "string") {
      const expected = placeholders(base).join(",");
      const actual = placeholders(value).join(",");
      if (expected !== actual) {
        errors.push(`Placeholders différents : ${key} (attendu: ${expected || "aucun"}, trouvé: ${actual || "aucun"})`);
      }
    }
  }

  if (errors.length > 0) {
    errorCount += errors.length;
    console.error(`\n[i18n] ${code} — ${errors.length} erreur(s)`);
    for (const error of errors) console.error(`  - ${error}`);
  } else {
    console.log(`[i18n] ${code} — OK (${keys.size} clés)`);
  }
}

if (errorCount > 0) {
  console.error(`\n[i18n] ${errorCount} erreur(s) au total.`);
  process.exit(1);
}

console.log(`\n[i18n] ${localeCodes.length} locale(s) vérifiée(s).`);
