(function () {
  "use strict";

  var root = document.documentElement;
  var toggles = document.querySelectorAll("[data-theme-toggle]");

  function renderTheme() {
    var dark = root.dataset.theme === "dark";
    toggles.forEach(function (button) {
      button.setAttribute("aria-label", dark ? "Activer le thème clair" : "Activer le thème sombre");
    });
  }

  toggles.forEach(function (button) {
    button.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (error) {
        /* stockage indisponible */
      }
      renderTheme();
    });
  });

  renderTheme();

  var menus = document.querySelectorAll(".site-menu");
  function closeMenus(except) {
    menus.forEach(function (menu) {
      if (menu !== except) menu.removeAttribute("open");
    });
  }

  document.addEventListener("click", function (event) {
    menus.forEach(function (menu) {
      if (!menu.contains(event.target)) menu.removeAttribute("open");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenus(null);
  });

  var dialog = document.querySelector("[data-demo-dialog]");
  if (dialog !== null) {
    document.querySelectorAll("[data-demo-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          dialog.setAttribute("open", "");
        }
      });
    });

    document.querySelectorAll("[data-demo-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (typeof dialog.close === "function") {
          dialog.close();
        } else {
          dialog.removeAttribute("open");
        }
      });
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog && typeof dialog.close === "function") {
        dialog.close();
      }
    });
  }
})();
