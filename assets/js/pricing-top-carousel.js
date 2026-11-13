(function () {
  document.querySelectorAll("[data-pricing-carousel], [data-cloud-carousel]").forEach((carousel) => {
    var track = carousel.querySelector(".pricing-grid, .cloud-detail-grid");
    var dots = carousel.querySelector("[data-carousel-dots]");
    var previous = carousel.querySelector("[data-pricing-prev], [data-carousel-prev]");
    var next = carousel.querySelector("[data-pricing-next], [data-carousel-next]");
    if (!track || !dots || !previous || !next) return;
    var slides = Array.from(track.children);
    if (slides.length === 0) return;

    var page = 0;
    var pageCount = 1;
    var frame = 0;

    function gapSize() {
      var styles = window.getComputedStyle(track);
      return parseFloat(styles.columnGap || styles.gap || "16") || 16;
    }

    function perPage() {
      var slideWidth = slides[0].getBoundingClientRect().width;
      if (slideWidth === 0) return 1;
      return Math.max(1, Math.round((track.clientWidth + gapSize()) / (slideWidth + gapSize())));
    }

    function updateControls() {
      previous.disabled = page <= 0;
      next.disabled = page >= pageCount - 1;
    }

    function updateDots() {
      Array.from(dots.children).forEach(function (dot, index) {
        var active = index === page;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      updateControls();
    }

    function pageOffsets() {
      var maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      return Array.from({ length: pageCount }, function (_, index) {
        var target = slides[Math.min(index * perPage(), slides.length - 1)];
        return Math.min(target ? target.offsetLeft : 0, maxScroll);
      });
    }

    function goToPage(nextPage) {
      page = Math.max(0, Math.min(pageCount - 1, nextPage));
      updateDots();
      var target = pageOffsets()[page];
      if (target !== undefined) track.scrollTo({ left: target, behavior: "smooth" });
    }

    function renderDots() {
      var nextCount = Math.ceil(slides.length / perPage());
      pageCount = nextCount;
      page = Math.min(page, pageCount - 1);
      if (dots.children.length !== pageCount) {
        dots.replaceChildren();
        for (let index = 0; index < pageCount; index += 1) {
          var dot = document.createElement("button");
          dot.type = "button";
          dot.className = "demo-dot";
          dot.setAttribute("aria-label", "Page " + (index + 1));
          dot.addEventListener("click", function () {
            goToPage(index);
          });
          dots.append(dot);
        }
      }
      updateDots();
    }

    function syncFromScroll() {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        frame = 0;
        var current = track.scrollLeft;
        var offsets = pageOffsets();
        var nearest = 0;
        for (var index = 1; index < offsets.length; index += 1) {
          if (Math.abs(offsets[index] - current) < Math.abs(offsets[nearest] - current)) nearest = index;
        }
        page = nearest;
        updateDots();
      });
    }

    previous.addEventListener("click", function () { goToPage(page - 1); });
    next.addEventListener("click", function () { goToPage(page + 1); });
    track.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", renderDots);
    renderDots();
  });
})();
