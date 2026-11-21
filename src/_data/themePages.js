import fs from "node:fs";
import path from "node:path";
import allLocales from "./allLocales.js";
import themeDownloads from "./themeDownloads.js";

const root = process.cwd();

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
}

export default allLocales
  .filter((locale) => locale.available)
  .flatMap((locale) => {
    const themes = readJson(`i18n/${locale.code}/themes.json`);
    return themes.items.map((theme) => ({
      locale,
      route: `${locale.routes.themes}${theme.id}/`,
      theme,
      download: themeDownloads[theme.id],
      alternates: allLocales
        .filter((alt) => alt.available)
        .map((alt) => ({
          code: alt.code,
          hreflang: alt.htmlLang,
          ogLocale: alt.ogLocale,
          href: `${alt.routes.themes}${theme.id}/`,
        })),
    }));
  });
