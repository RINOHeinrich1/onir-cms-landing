(() => {
  const openButton = document.querySelector("[data-hero-video-open]");
  const modal = document.querySelector("[data-hero-video-modal]");
  const video = document.querySelector("[data-hero-video]");
  const closeButton = document.querySelector("[data-hero-video-close]");
  const previous = document.querySelector("[data-hero-video-prev]");
  const next = document.querySelector("[data-hero-video-next]");
  const dots = document.querySelector("[data-hero-video-dots]");

  if (!openButton || !modal || !video || !dots) return;

  const mobileQuery = window.matchMedia("(max-width: 700px)");
  const pageLang = (document.documentElement.lang || "fr").slice(0, 2).toLowerCase();
  const locale = ["en", "fr", "mg"].includes(pageLang) ? pageLang : "en";
  const isMobile = () => mobileQuery.matches;
  const key = (name) => name.charAt(0).toUpperCase() + name.slice(1);
  const labels = {
    fr: { demo: "Démo du chatbot", motion: "Présentation ONIR CMS" },
    en: { demo: "Chatbot demo", motion: "ONIR CMS overview" },
    mg: { demo: "Fanandramana chatbot", motion: "Fampahafantarana ONIR CMS" },
  };

  let slides = [];
  let index = 0;

  function sourceFor(slide, mobile) {
    return mobile ? slide.mobile : slide.desktop;
  }

  function buildSlides() {
    const demo = video.dataset[`demoSrc${key(locale)}`] ?? video.dataset.demoSrcFr;
    const motionDesktop = video.dataset[`desktopSrc${key(locale)}`] ?? video.dataset.desktopSrcEn;
    const motionMobile = video.dataset[`mobileSrc${key(locale)}`] ?? video.dataset.mobileSrcEn;
    const motionPosterDesktop = video.dataset[`desktopPoster${key(locale)}`] ?? "";
    const motionPosterMobile = video.dataset[`mobilePoster${key(locale)}`] ?? "";
    slides = [
      { desktop: demo, mobile: demo, label: labels[locale].demo },
      {
        desktop: motionDesktop,
        mobile: motionMobile,
        posterDesktop: motionPosterDesktop,
        posterMobile: motionPosterMobile,
        label: labels[locale].motion,
      },
    ];
  }

  function applySlide(autoplay = false) {
    const slide = slides[index];
    if (!slide) return;
    const mobile = isMobile();
    const source = sourceFor(slide, mobile);
    if (!source) return;
    video.setAttribute("src", source);
    video.setAttribute("poster", mobile ? slide.posterMobile ?? "" : slide.posterDesktop ?? "");
    video.load();
    updateControls();
    if (autoplay) video.play().catch(() => {});
  }

  function updateControls() {
    if (previous) previous.disabled = index <= 0;
    if (next) next.disabled = index >= slides.length - 1;
    Array.from(dots.children).forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function renderDots() {
    dots.replaceChildren();
    slides.forEach((slide, slideIndex) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-video-dot";
      dot.setAttribute("aria-label", slide.label);
      dot.addEventListener("click", () => goTo(slideIndex));
      dots.append(dot);
    });
    updateControls();
  }

  function goTo(nextIndex) {
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));
    applySlide(modal.open);
  }

  function close() {
    video.pause();
    video.currentTime = 0;
    if (modal.open) modal.close();
  }

  function open() {
    buildSlides();
    index = 0;
    renderDots();
    applySlide(false);
    if (!modal.open) modal.showModal();
    video.play().catch(() => {});
  }

  const visual = document.querySelector(".hero-visual");
  visual?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("button, a, dialog")) return;
    open();
  });

  openButton.addEventListener("click", open);
  closeButton?.addEventListener("click", close);
  previous?.addEventListener("click", () => goTo(index - 1));
  next?.addEventListener("click", () => goTo(index + 1));

  modal.addEventListener("close", () => {
    video.pause();
    video.currentTime = 0;
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  mobileQuery.addEventListener("change", () => {
    if (!modal.open) return;
    applySlide(true);
  });

  buildSlides();
  renderDots();
  applySlide(false);
})();
