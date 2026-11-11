(function () {
  var switcher = document.querySelector("[data-duration-switch]");
  if (!switcher) return;
  var tabs = switcher.querySelectorAll(".duration-tab");
  var cards = document.querySelectorAll("[data-cloud-card]");

  function apply(months) {
    tabs.forEach(function (tab) {
      tab.classList.toggle("is-active", tab.getAttribute("data-months") === months);
    });
    cards.forEach(function (card) {
      var select = card.querySelector(".cloud-duration");
      if (!select) return;
      select.value = months;
      var option = select.selectedOptions[0];
      if (!option) return;
      var price = card.querySelector("[data-cloud-price]");
      var period = card.querySelector("[data-cloud-period]");
      if (price) price.textContent = option.getAttribute("data-price") || "";
      if (period) period.textContent = option.getAttribute("data-period") || "";
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      apply(tab.getAttribute("data-months"));
    });
  });
})();
