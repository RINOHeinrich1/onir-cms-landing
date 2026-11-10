const appBase = process.env.PREPROD_APP_URL ?? "";
const partnerChatToken = "PRoc__QYCoD6781oNeRruH_LEkZ5wmK7";

export default {
  name: "ONIR CMS",
  baseUrl: "https://onir-cms.tech",
  logoLight: "/assets/logo/onir-cms-light.webp",
  logoDark: "/assets/logo/onir-cms-dark.webp",
  github: "https://github.com/RINOHeinrich1/onir-cms",
  documentation: "https://cms-backoffice.onirtech.com/documentation",
  templatesGuide: "https://cms-backoffice.onirtech.com/documentation/templates-visuels",
  installationGuide: "https://cms-backoffice.onirtech.com/documentation/installation",
  login: "https://magic-panel.onir-cms.tech/login",
  partnerChat: appBase
    ? `${appBase}/l/${partnerChatToken}`
    : `https://magic-link.onir-cms.tech/l/${partnerChatToken}`,
  partnerApi: "https://partner-api.onir-cms.tech/partenaires",
  whatsappUrl: "https://wa.me/261349368233",
  whatsappNumber: "+261349368233",
  contactEmail: "contact@onir-cms.tech",
  linkedin: "https://www.linkedin.com/groups/40618339/",
  facebook: "https://www.facebook.com/people/Onir-Cms/61595921202498/",
  widget: {
    src: "https://cms-backoffice.onirtech.com/widget/v2.js",
    token: "kLrv9RS6vNxdb77hDQWGLZEL7XvVgb1g",
    position: "bottom-right",
  },
};
