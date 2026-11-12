(function () {
  "use strict";

  var root = document.documentElement;
  var toggles = document.querySelectorAll("[data-theme-toggle]");

  function label(button, attribute, fallback) {
    return button.getAttribute(attribute) || fallback;
  }

  function renderTheme() {
    var dark = root.dataset.theme === "dark";
    toggles.forEach(function (button) {
      button.setAttribute(
        "aria-label",
        dark
          ? label(button, "data-theme-label-light", "Activer le thème clair")
          : label(button, "data-theme-label-dark", "Activer le thème sombre"),
      );
    });
  }

  toggles.forEach(function (button) {
    button.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("onir-theme", next);
        localStorage.setItem("theme", next);
        localStorage.setItem("proto-theme", next);
      } catch (error) {
        /* stockage indisponible */
      }
      renderTheme();
    });
  });

  renderTheme();

  var menuToggles = document.querySelectorAll("[data-menu-toggle]");
  menuToggles.forEach(function (button) {
    var header = button.closest(".site-head");
    var nav = document.getElementById(button.getAttribute("aria-controls") || "");
    if (!header || !nav) return;

    function closeMenu() {
      header.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!header.classList.contains("menu-open")) return;
      if (header.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
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
