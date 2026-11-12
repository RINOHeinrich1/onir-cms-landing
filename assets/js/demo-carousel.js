(function () {
  document.querySelectorAll("[data-demo-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-demo-track]");
    const dots = carousel.querySelector("[data-demo-dots]");
    const previous = carousel.querySelector("[data-demo-prev]");
    const next = carousel.querySelector("[data-demo-next]");
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

    function updateControls() {
      if (previous) previous.disabled = page <= 0;
      if (next) next.disabled = page >= pageCount - 1;
    }

    function updateDots() {
      Array.from(dots.children).forEach((dot, index) => {
        const active = index === page;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      updateControls();
    }

    function pageOffsets() {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      return Array.from({ length: pageCount }, (_, index) => {
        const target = slides[Math.min(index * perPage(), slides.length - 1)];
        return Math.min(target?.offsetLeft ?? 0, maxScroll);
      });
    }

    function scrollToPage(nextPage) {
      const target = pageOffsets()[nextPage];
      if (target === undefined) return;
      track.scrollTo({ left: target, behavior: "smooth" });
    }

    function goToPage(nextPage) {
      page = Math.max(0, Math.min(pageCount - 1, nextPage));
      updateDots();
      scrollToPage(page);
    }

    function renderDots() {
      const nextCount = Math.ceil(slides.length / perPage());
      if (nextCount === pageCount && dots.children.length === nextCount) {
        updateControls();
        return;
      }
      pageCount = nextCount;
      page = Math.min(page, pageCount - 1);
      dots.replaceChildren();
      for (let index = 0; index < pageCount; index += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "demo-dot";
        dot.setAttribute("aria-label", `Page ${index + 1}`);
        dot.addEventListener("click", () => goToPage(index));
        dots.append(dot);
      }
      updateDots();
    }

    function syncFromScroll() {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        const current = track.scrollLeft;
        const offsets = pageOffsets();
        let nearest = 0;
        for (let index = 1; index < offsets.length; index += 1) {
          if (Math.abs(offsets[index] - current) < Math.abs(offsets[nearest] - current)) nearest = index;
        }
        page = nearest;
        updateDots();
      });
    }

    previous?.addEventListener("click", () => goToPage(page - 1));
    next?.addEventListener("click", () => goToPage(page + 1));
    track.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", renderDots);
    renderDots();
  });
})();
