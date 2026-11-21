import fs from "node:fs";
import path from "node:path";
import allLocales from "./allLocales.js";

const root = process.cwd();
export default allLocales
  .filter((locale) => locale.available)
  .map((locale) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(root, `i18n/${locale.code}/useCases.json`), "utf8"),
    );
    return {
      locale,
      data,
      route: locale.routes.useCases,
      alternates: allLocales
        .filter((alt) => alt.available)
        .map((alt) => ({
          code: alt.code,
          hreflang: alt.htmlLang,
          ogLocale: alt.ogLocale,
          href: alt.routes.useCases,
        })),
    };
  });
