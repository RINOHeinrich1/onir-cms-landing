export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ plugins: "plugins" });
  eleventyConfig.addPassthroughCopy({ "participer/developpeur": "participer/developpeur" });
  eleventyConfig.addPassthroughCopy({ "participer/sponsoring": "participer/sponsoring" });

  eleventyConfig.addCollection("articles", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/articles/**/*.md")
      .filter((item) => item.data.draft !== true)
      .filter((item) =>
        item.data.publishedAt === undefined ||
        new Date(item.data.publishedAt).getTime() <= Date.now(),
      )
      .sort(
        (left, right) =>
          new Date(right.data.publishedAt ?? 0).getTime() -
          new Date(left.data.publishedAt ?? 0).getTime(),
      ),
  );

  eleventyConfig.addFilter("articlesForLocale", (items, code) => {
    const byKey = new Map();
    for (const item of items ?? []) {
      const key = item.data.translationKey ?? item.data.slug;
      const existing = byKey.get(key);
      if (existing === undefined) {
        byKey.set(key, item);
        continue;
      }
      const current = item.data.articleLocale;
      const previous = existing.data.articleLocale;
      if (current === code || (previous !== code && current === "fr")) {
        byKey.set(key, item);
      }
    }
    return [...byKey.values()].sort(
      (left, right) =>
        new Date(right.data.publishedAt ?? 0).getTime() -
        new Date(left.data.publishedAt ?? 0).getTime(),
    );
  });

  eleventyConfig.addFilter("absoluteUrl", (path, baseUrl) => {
    if (!path) return baseUrl;
    if (/^https?:\/\//.test(path)) return path;
    return `${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  });

  eleventyConfig.addFilter("localeUrl", (routes, pageKey, code) => {
    return routes?.[pageKey]?.[code] ?? "/";
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
