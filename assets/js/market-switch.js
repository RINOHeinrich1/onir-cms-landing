(function () {
  var switcher = document.querySelector("[data-market-switch]");
  if (!switcher) return;
  var buttons = switcher.querySelectorAll("[data-market]");
  var params = new URLSearchParams(window.location.search);
  var initial = params.get("market") === "international" ? "INTL" : "MG";
  try {
    initial = window.localStorage.getItem("onir-market") || initial;
  } catch (error) {}

  function apply(market) {
    document.body.dataset.market = market;
    buttons.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-market") === market);
    });
    try { window.localStorage.setItem("onir-market", market); } catch (error) {}
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () { apply(button.getAttribute("data-market")); });
  });
  apply(initial === "INTL" ? "INTL" : "MG");
})();
