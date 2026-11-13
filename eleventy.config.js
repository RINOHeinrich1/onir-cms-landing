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

  eleventyConfig.addFilter("articlesForLocale", (items, code) =>
    (items ?? []).filter((item) => item.data.articleLocale === code),
  );

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
