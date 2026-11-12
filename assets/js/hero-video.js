(() => {
  const openButton = document.querySelector("[data-hero-video-open]");
  const modal = document.querySelector("[data-hero-video-modal]");
  const video = document.querySelector("[data-hero-video]");
  const closeButton = document.querySelector("[data-hero-video-close]");

  if (!openButton || !modal || !video) return;

  const mobileQuery = window.matchMedia("(max-width: 700px)");
  const pageLang = (document.documentElement.lang || "fr").slice(0, 2).toLowerCase();
  const locale = ["en", "fr", "mg"].includes(pageLang) ? pageLang : "en";
  const isMobile = () => mobileQuery.matches;
  const key = (name) => name.charAt(0).toUpperCase() + name.slice(1);
  const sourceFor = (mobile) =>
    video.dataset[`${mobile ? "mobile" : "desktop"}Src${key(locale)}`] ??
    video.dataset[`${mobile ? "mobile" : "desktop"}SrcEn`];
  const posterFor = (mobile) =>
    video.dataset[`${mobile ? "mobile" : "desktop"}Poster${key(locale)}`] ??
    video.dataset[`${mobile ? "mobile" : "desktop"}PosterEn`];

  const applySource = () => {
    const mobile = isMobile();
    const source = sourceFor(mobile);
    if (!source) return;
    if (video.getAttribute("src") !== source) {
      video.setAttribute("src", source);
      video.setAttribute("poster", posterFor(mobile) ?? "");
      video.load();
    }
  };

  const close = () => {
    video.pause();
    video.currentTime = 0;
    if (modal.open) modal.close();
  };

  const open = () => {
    applySource();
    if (!modal.open) modal.showModal();
    video.play().catch(() => {});
  };

  openButton.addEventListener("click", open);
  closeButton?.addEventListener("click", close);

  modal.addEventListener("close", () => {
    video.pause();
    video.currentTime = 0;
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  mobileQuery.addEventListener("change", () => {
    if (!modal.open) {
      applySource();
      return;
    }
    applySource();
    video.play().catch(() => {});
  });

  applySource();
})();
