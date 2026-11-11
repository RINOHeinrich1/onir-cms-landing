(function () {
  var dialog = document.getElementById("rdv-chat");
  if (!dialog) return;
  var form = dialog.querySelector("[data-rdv-form]");
  var error = dialog.querySelector("[data-rdv-error]");

  function open() {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    var first = dialog.querySelector("input, textarea");
    if (first) first.focus();
  }

  function close() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  document.querySelectorAll("[data-rdv-open]").forEach(function (button) {
    button.addEventListener("click", open);
  });
  dialog.querySelectorAll("[data-rdv-close]").forEach(function (button) {
    button.addEventListener("click", close);
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) close();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var whatsapp = String(data.get("whatsapp") || "").trim();
    var email = String(data.get("email") || "").trim();
    var need = String(data.get("need") || "").trim();
    var budget = String(data.get("budget") || "").trim();
    var timeline = String(data.get("timeline") || "").trim();
    if (!whatsapp && !email) {
      error.textContent = "Indiquez au moins un WhatsApp ou un email.";
      error.hidden = false;
      return;
    }
    if (!need) {
      error.textContent = "Décrivez votre besoin.";
      error.hidden = false;
      return;
    }
    error.hidden = true;
    var message = [
      "Demande de rendez-vous ONIR-CMS",
      "WhatsApp : " + (whatsapp || "—"),
      "Email : " + (email || "—"),
      "Besoin : " + need,
      "Budget : " + (budget || "—"),
      "Délai : " + (timeline || "—"),
    ].join("\n");
    var base = dialog.getAttribute("data-whatsapp") || "https://wa.me/261349368233";
    window.open(base + "?text=" + encodeURIComponent(message), "_blank", "noopener");
    close();
  });
})();
