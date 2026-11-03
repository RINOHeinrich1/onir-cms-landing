export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ plugins: "plugins" });
  eleventyConfig.addPassthroughCopy({ "participer/developpeur": "participer/developpeur" });
  eleventyConfig.addPassthroughCopy({ "participer/sponsoring": "participer/sponsoring" });

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
