(() => {
  const openButton = document.querySelector("[data-hero-video-open]");
  const modal = document.querySelector("[data-hero-video-modal]");
  const video = document.querySelector("[data-hero-video]");
  const closeButton = document.querySelector("[data-hero-video-close]");

  if (!openButton || !modal || !video) return;

  const mobileQuery = window.matchMedia("(max-width: 700px)");
  const isMobile = () => mobileQuery.matches;
  const sourceFor = (mobile) =>
    mobile ? video.dataset.mobileSrc : video.dataset.desktopSrc;
  const posterFor = (mobile) =>
    mobile ? video.dataset.mobilePoster : video.dataset.desktopPoster;

  const applySource = () => {
    const mobile = isMobile();
    const source = sourceFor(mobile);
    if (video.getAttribute("src") !== source) {
      video.setAttribute("src", source);
      video.setAttribute("poster", posterFor(mobile));
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
