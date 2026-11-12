(function () {
  const carousels = document.querySelectorAll("[data-demo-carousel]");
  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-demo-track]");
    const dots = carousel.querySelector("[data-demo-dots]");
    const slides = Array.from(track?.children ?? []);
    if (!track || !dots || slides.length === 0) return;

    let page = 0;
    let pageCount = 1;
    let frame = 0;

    function gapSize() {
      const gap = getComputedStyle(track).columnGap || getComputedStyle(track).gap;
      return Number.parseFloat(gap) || 0;
    }

    function perPage() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      if (slideWidth === 0) return 1;
      return Math.max(1, Math.round((track.clientWidth + gapSize()) / (slideWidth + gapSize())));
    }

    function scrollToPage(nextPage) {
      const target = slides[Math.min(nextPage * perPage(), slides.length - 1)];
      if (!target) return;
      track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }

    function renderDots() {
      const nextCount = Math.ceil(slides.length / perPage());
      if (nextCount === pageCount && dots.children.length === nextCount) return;
      pageCount = nextCount;
      dots.replaceChildren();
      for (let index = 0; index < pageCount; index += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "demo-dot";
        dot.setAttribute("aria-label", `Page ${index + 1}`);
        dot.addEventListener("click", () => {
          page = index;
          updateDots();
          scrollToPage(index);
        });
        dots.append(dot);
      }
      updateDots();
    }

    function updateDots() {
      Array.from(dots.children).forEach((dot, index) => {
        dot.classList.toggle("is-active", index === page);
      });
    }

    function syncFromScroll() {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        const first = slides[0];
        const step = first.offsetWidth + gapSize();
        const current = Math.round(track.scrollLeft / Math.max(step, 1));
        page = Math.min(pageCount - 1, Math.floor(current / perPage()));
        updateDots();
      });
    }

    track.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", renderDots);
    renderDots();
  });
})();
