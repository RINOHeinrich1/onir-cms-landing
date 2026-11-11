(function () {
  var carousel = document.querySelector("[data-cloud-carousel]");
  if (!carousel) return;
  var track = carousel.querySelector(".cloud-detail-grid");
  var previous = carousel.querySelector("[data-carousel-prev]");
  var next = carousel.querySelector("[data-carousel-next]");
  if (!track || !previous || !next) return;

  function cardStep() {
    var card = track.querySelector(".cloud-detail-card");
    if (!card) return 300;
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

  function updateButtons() {
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
})();
