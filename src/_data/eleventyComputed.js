export default {
  locale: (data) => {
    if (data.locale) return data.locale;
    if (!data.articleLocale) return undefined;
    return data.allLocales?.find((locale) => locale.code === data.articleLocale);
  },
  t: (data) => data.i18n?.[data.locale?.code] ?? {},
  p: (data) => {
    if (data.pageKey === "article") {
      return {
        meta: {
          title: data.title,
          description: data.excerpt,
          ogTitle: data.title,
          ogDescription: data.excerpt,
        },
      };
    }
    return data.i18n?.[data.locale?.code]?.[data.pageKey] ?? {};
  },
  currentRoute: (data) => data.locale?.routes?.[data.pageKey] ?? "/",
  css: (data) => data.css ?? ["/assets/css/landing-v2.css?v=19"],
  headerVariant: (data) => data.headerVariant ?? "v2",
  footerVariant: (data) => data.footerVariant ?? data.headerVariant ?? "v2",
  wrapper: (data) => data.wrapper ?? null,
  mainClass: (data) => data.mainClass ?? "",
  viewport: (data) => data.viewport || "width=device-width, initial-scale=1",
  headExtra: (data) => data.headExtra ?? "",
  bodyScripts: (data) => data.bodyScripts ?? [],
  mainAttrs: (data) => {
    if (data.mainAttrs) return data.mainAttrs;
    if (data.partnerChat) return `data-partner-chat-url="${data.site.partnerChat}" data-privacy-url="${data.locale.routes.privacy}"`;
    return "";
  },
  showWidget: (data) => data.showWidget ?? true,
  canonical: (data) => {
    if (!data.pageKey || data.pageKey === "notFound") return null;
    if (data.pageKey === "article") return `${data.site.baseUrl}${data.page.url}`;
    return `${data.site.baseUrl}${data.locale?.routes?.[data.pageKey] ?? "/"}`;
  },
  alternates: (data) => {
    if (!data.pageKey || data.pageKey === "notFound" || data.pageKey === "article") return [];
    return data.allLocales
      .filter((locale) => locale.available)
      .map((locale) => ({
        code: locale.code,
        hreflang: locale.htmlLang,
        ogLocale: locale.ogLocale,
        href: `${data.site.baseUrl}${locale.routes[data.pageKey]}`,
      }));
  },
};
