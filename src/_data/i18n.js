import fs from "node:fs";
import path from "node:path";
import allLocales from "./allLocales.js";

const root = process.cwd();

export default Object.fromEntries(
  allLocales
    .filter((locale) => locale.available)
    .map((locale) => {
      const directory = path.join(root, "i18n", locale.code);
      const messages = {};

      for (const file of fs.readdirSync(directory)) {
        if (!file.endsWith(".json")) continue;
        const key = path.basename(file, ".json");
        messages[key] = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
      }

      return [locale.code, messages];
    }),
);
