(function () {
  document.querySelectorAll("[data-theme-dialog-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      var dialog = document.getElementById("theme-dialog-" + button.dataset.themeDialogOpen);
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    });
  });

  document.querySelectorAll("[data-theme-dialog]").forEach(function (dialog) {
    dialog.querySelectorAll("[data-theme-dialog-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        dialog.close();
      });
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  });
})();
