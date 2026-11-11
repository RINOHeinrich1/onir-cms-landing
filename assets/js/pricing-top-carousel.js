(function () {
  var carousel = document.querySelector("[data-pricing-carousel]");
  if (!carousel) return;
  var track = carousel.querySelector(".pricing-grid");
  var previous = carousel.querySelector("[data-pricing-prev]");
  var next = carousel.querySelector("[data-pricing-next]");
  if (!track || !previous || !next) return;

  function cardStep() {
    var card = track.querySelector(".price-card");
    if (!card) return 384;
    var styles = window.getComputedStyle(track);
    var gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
    return card.getBoundingClientRect().width + gap;
  }

  previous.addEventListener("click", function () {
    track.scrollBy({ left: -cardStep(), behavior: "smooth" });
  });
  next.addEventListener("click", function () {
    track.scrollBy({ left: cardStep(), behavior: "smooth" });
  });

  function update() {
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
