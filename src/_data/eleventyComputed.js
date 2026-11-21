export default {
  locale: (data) => {
    if (data.locale) return data.locale;
    if (data.themePage?.locale) return data.themePage.locale;
    if (data.useCasePage?.locale) return data.useCasePage.locale;
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
    if (data.pageKey === "useCase" && data.useCasePage) {
      return {
        ...data.useCasePage.data,
        meta: data.useCasePage.data.meta,
      };
    }
    if (data.pageKey === "theme" && data.themePage) {
      const base = data.i18n?.[data.locale?.code]?.themes ?? {};
      const suffix =
        data.locale?.code === "fr"
          ? "thème chatbot ONIR CMS"
          : data.locale?.code === "mg"
            ? "endrika chatbot ONIR CMS"
            : "ONIR CMS chatbot theme";
      return {
        ...base,
        meta: {
          title: `${data.themePage.theme.name} — ${suffix}`,
          description: data.themePage.theme.description,
          ogTitle: `${data.themePage.theme.name} — ${suffix}`,
          ogDescription: data.themePage.theme.description,
          ogImage: "/assets/og/onir-cms-1200x630.png",
        },
      };
    }
    return data.i18n?.[data.locale?.code]?.[data.pageKey] ?? {};
  },
  currentRoute: (data) => data.locale?.routes?.[data.pageKey] ?? "/",
  css: (data) => data.css ?? ["/assets/css/landing-v2.css?v=21"],
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
    if (data.pageKey === "articles" && data.locale?.code !== "fr") {
      return `${data.site.baseUrl}/articles/`;
    }
    if (data.pageKey === "theme" && data.themePage) {
      return `${data.site.baseUrl}${data.themePage.route}`;
    }
    if (data.pageKey === "useCase" && data.useCasePage) {
      return `${data.site.baseUrl}${data.useCasePage.route}`;
    }
    return `${data.site.baseUrl}${data.locale?.routes?.[data.pageKey] ?? "/"}`;
  },
  alternates: (data) => {
    if (!data.pageKey || data.pageKey === "notFound" || data.pageKey === "article") return [];
    if (data.pageKey === "articles") return [];
    if (data.pageKey === "theme" && data.themePage) {
      return data.themePage.alternates.map((alt) => ({
        ...alt,
        href: `${data.site.baseUrl}${alt.href}`,
      }));
    }
    if (data.pageKey === "useCase" && data.useCasePage) {
      return data.useCasePage.alternates.map((alt) => ({
        ...alt,
        href: `${data.site.baseUrl}${alt.href}`,
      }));
    }
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
