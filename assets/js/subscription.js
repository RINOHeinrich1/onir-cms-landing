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
  var termsCheck = dialog.querySelector("[data-subscribe-terms-check]");
  var termsLink = dialog.querySelector("[data-subscribe-terms-link]");
  var termsStatus = dialog.querySelector("[data-subscribe-terms-status]");
  var submit = dialog.querySelector("[data-subscribe-submit]");
  var closeButtons = dialog.querySelectorAll("[data-subscribe-close]");
  var api = dialog.getAttribute("data-api") || "https://preprod-backoffice.onir-cms.tech";
  var terms = null;

  function setTermsUnavailable(message) {
    terms = null;
    if (termsLink) termsLink.hidden = true;
    if (termsCheck) {
      termsCheck.checked = false;
      termsCheck.disabled = true;
    }
    if (submit) submit.disabled = true;
    if (termsStatus) {
      termsStatus.textContent = message;
      termsStatus.hidden = false;
    }
  }

  function loadTerms() {
    if (termsStatus) termsStatus.hidden = true;
    if (termsCheck) termsCheck.disabled = true;
    if (submit) submit.disabled = true;
    return fetch(api.replace(/\/+$/, "") + "/api/public/legal/terms?locale=fr")
      .then(function (response) {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(function (data) {
        terms = data;
        if (termsLink) {
          termsLink.href = data.fileUrl;
          termsLink.hidden = false;
        }
        if (termsCheck) termsCheck.disabled = false;
      })
      .catch(function () {
        setTermsUnavailable("Conditions Générales indisponibles. Contactez ONIR-CMS.");
      });
  }

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
    if (duration) form.elements.durationMonths.value = duration.value;
    summary.textContent = button.getAttribute("data-offer-name") || "";
    reset();
    loadTerms();
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

  if (termsCheck) {
    termsCheck.addEventListener("change", function () {
      if (submit) submit.disabled = !termsCheck.checked || terms === null;
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (terms === null) {
      error.textContent = "Conditions Générales indisponibles. Contactez ONIR-CMS.";
      error.hidden = false;
      return;
    }
    if (!termsCheck || !termsCheck.checked) {
      error.textContent = "Vous devez accepter les Conditions Générales.";
      error.hidden = false;
      return;
    }
    var data = new FormData(form);
    var payload = {
      organizationName: String(data.get("organizationName") || "").trim(),
      contactName: String(data.get("contactName") || "").trim(),
      contactEmail: String(data.get("contactEmail") || "").trim(),
      contactPhone: String(data.get("contactPhone") || "").trim(),
      offerCode: String(data.get("offerCode") || ""),
      durationMonths: Number(data.get("durationMonths")),
      countryCode: "MG",
      billingCountry: "MG",
      termsAccepted: true,
      termsDocumentId: terms.documentId,
      termsVersion: terms.version,
      termsLocale: terms.resolvedLocale,
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
        error.textContent = err.message === "TERMS_CHANGED"
          ? "Les Conditions Générales ont changé. Rechargez la page."
          : err.message === "TERMS_REQUIRED" || err.message === "TERMS_UNAVAILABLE"
            ? "Acceptez les Conditions Générales avant d'envoyer la demande."
            : err.message || "Impossible d'envoyer la demande.";
        error.hidden = false;
      });
  });
})();
