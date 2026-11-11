(function () {
  var dialog = document.getElementById("subscribe-dialog");
  if (!dialog) return;
  var form = dialog.querySelector("[data-subscribe-form]");
  var error = dialog.querySelector("[data-subscribe-error]");
  var result = dialog.querySelector("[data-subscribe-result]");
  var summary = dialog.querySelector("[data-subscribe-summary]");
  var codeEl = dialog.querySelector("[data-subscribe-code]");
  var offerEl = dialog.querySelector("[data-subscribe-offer]");
  var amountEl = dialog.querySelector("[data-subscribe-amount]");
  var expiresEl = dialog.querySelector("[data-subscribe-expires]");
  var instructionsEl = dialog.querySelector("[data-subscribe-instructions]");
  var closeButtons = dialog.querySelectorAll("[data-subscribe-close]");
  var api = dialog.getAttribute("data-api") || "https://preprod-backoffice.onir-cms.tech";

  function reset() {
    form.hidden = false;
    result.hidden = true;
    error.hidden = true;
    form.reset();
  }

  function open(button) {
    var card = button.closest(".cloud-detail-card");
    var duration = card ? card.querySelector(".cloud-duration") : null;
    form.elements.offerCode.value = button.getAttribute("data-offer-code") || "";
    form.elements.durationMonths.innerHTML = duration ? duration.innerHTML : "";
    summary.textContent = button.getAttribute("data-offer-name") || "";
    reset();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function close() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    setTimeout(reset, 200);
  }

  document.querySelectorAll(".js-subscribe").forEach(function (button) {
    button.addEventListener("click", function () { open(button); });
  });
  closeButtons.forEach(function (button) { button.addEventListener("click", close); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) close(); });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var payload = {
      organizationName: String(data.get("organizationName") || "").trim(),
      contactName: String(data.get("contactName") || "").trim(),
      contactEmail: String(data.get("contactEmail") || "").trim(),
      contactPhone: String(data.get("contactPhone") || "").trim(),
      offerCode: String(data.get("offerCode") || ""),
      durationMonths: Number(data.get("durationMonths")),
    };
    if (!payload.organizationName || !payload.contactName || !payload.contactEmail) {
      error.textContent = "Renseignez l'organisation, le contact et l'email.";
      error.hidden = false;
      return;
    }
    error.hidden = true;
    fetch(api.replace(/\/+$/, "") + "/api/public/subscription-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        return response.json().then(function (body) { return { ok: response.ok, body: body }; });
      })
      .then(function (out) {
        if (!out.ok) throw new Error(out.body.error || "Demande refusée");
        form.hidden = true;
        result.hidden = false;
        codeEl.textContent = out.body.code;
        offerEl.textContent = out.body.offerName;
        amountEl.textContent = new Intl.NumberFormat("fr-FR").format(out.body.priceMga) + " Ar";
        expiresEl.textContent = new Date(out.body.expiresAt).toLocaleDateString("fr-FR");
        instructionsEl.textContent = out.body.paymentInstructions || "Contactez ONIR pour obtenir les coordonnées de paiement.";
      })
      .catch(function (err) {
        error.textContent = err.message || "Impossible d'envoyer la demande.";
        error.hidden = false;
      });
  });
})();
