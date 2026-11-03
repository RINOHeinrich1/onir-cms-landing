const routes = {
  home: { fr: "/", en: "/en/", mg: "/mg/" },
  features: {
    fr: "/fonctionnalites/",
    en: "/en/features/",
    mg: "/mg/fampiasa/",
  },
  themes: { fr: "/themes/", en: "/en/themes/", mg: "/mg/endrika/" },
  participate: {
    fr: "/participer/",
    en: "/en/participate/",
    mg: "/mg/handray-anjara/",
  },
  legal: {
    fr: "/mentions-legales/",
    en: "/en/legal-notice/",
    mg: "/mg/fampahafantarana/",
  },
  privacy: {
    fr: "/confidentialite-site/",
    en: "/en/privacy/",
    mg: "/mg/tsiambaratelo/",
  },
  notFound: { fr: "/404.html", en: "/en/404.html", mg: "/mg/404.html" },
};

function routesFor(code) {
  return Object.fromEntries(
    Object.entries(routes).map(([pageKey, byLocale]) => [pageKey, byLocale[code]]),
  );
}

export default [
  {
    code: "fr",
    label: "Français",
    htmlLang: "fr",
    ogLocale: "fr_FR",
    available: true,
    routes: routesFor("fr"),
  },
  {
    code: "en",
    label: "English",
    htmlLang: "en",
    ogLocale: "en_US",
    available: true,
    routes: routesFor("en"),
  },
  {
    code: "mg",
    label: "Malagasy",
    htmlLang: "mg",
    ogLocale: "mg_MG",
    available: true,
    routes: routesFor("mg"),
  },
];
