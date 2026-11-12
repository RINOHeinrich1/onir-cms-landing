export default {
  t: (data) => data.i18n?.[data.locale?.code] ?? {},
  p: (data) => data.i18n?.[data.locale?.code]?.[data.pageKey] ?? {},
  currentRoute: (data) => data.locale?.routes?.[data.pageKey] ?? "/",
  css: (data) => data.css ?? ["/assets/css/landing-v2.css?v=15"],
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
    return `${data.site.baseUrl}${data.locale?.routes?.[data.pageKey] ?? "/"}`;
  },
  alternates: (data) => {
    if (!data.pageKey || data.pageKey === "notFound") return [];
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
