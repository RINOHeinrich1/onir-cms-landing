(function () {
  var dialog = document.getElementById("subscribe-dialog");
  if (!dialog) return;
  var form = dialog.querySelector("[data-subscribe-form]");
  var error = dialog.querySelector("[data-subscribe-error]");
  var result = dialog.querySelector("[data-subscribe-result]");
  var summary = dialog.querySelector("[data-subscribe-summary]");
  var unavailable = dialog.querySelector("[data-subscribe-unavailable]");
  var unavailableMessage = dialog.querySelector("[data-subscribe-unavailable-message]");
  var defaultFullMessage = unavailableMessage ? unavailableMessage.textContent : "";
  var codeEl = dialog.querySelector("[data-subscribe-code]");
  var offerEl = dialog.querySelector("[data-subscribe-offer]");
  var amountEl = dialog.querySelector("[data-subscribe-amount]");
  var expiresEl = dialog.querySelector("[data-subscribe-expires]");
  var instructionsEl = dialog.querySelector("[data-subscribe-instructions]");
  var successLeadEl = dialog.querySelector("[data-subscribe-success-lead]");
  var freeLead = dialog.getAttribute("data-free-lead") || "";
  var freeInstructions = dialog.getAttribute("data-free-instructions") || "";
  var affiliateAppliedText = dialog.getAttribute("data-affiliate-applied") || "Code appliqué.";
  var affiliateInvalidText = dialog.getAttribute("data-affiliate-invalid") || "Ce code ne s’applique pas à cette offre.";
  var affiliateCheckingText = dialog.getAttribute("data-affiliate-checking") || "Vérification du code...";
  var affiliateNetworkErrorText = dialog.getAttribute("data-affiliate-network-error") || "Impossible de vérifier le code.";
  var termsCheck = dialog.querySelector("[data-subscribe-terms-check]");
  var termsLink = dialog.querySelector("[data-subscribe-terms-link]");
  var termsStatus = dialog.querySelector("[data-subscribe-terms-status]");
  var submit = dialog.querySelector("[data-subscribe-submit]");
  var closeButtons = dialog.querySelectorAll("[data-subscribe-close]");
  var affiliateInput = dialog.querySelector("[data-subscribe-affiliate-code]");
  var affiliateApply = dialog.querySelector("[data-subscribe-apply-code]");
  var affiliateMessage = dialog.querySelector("[data-subscribe-affiliate-message]");
  var priceBreakdown = dialog.querySelector("[data-subscribe-price-breakdown]");
  var listPriceEl = dialog.querySelector("[data-subscribe-list-price]");
  var discountRow = dialog.querySelector("[data-subscribe-discount-row]");
  var discountEl = dialog.querySelector("[data-subscribe-discount]");
  var netPriceEl = dialog.querySelector("[data-subscribe-net-price]");
  var api = dialog.getAttribute("data-api") || "https://backoffice.onir-cms.tech";
  var terms = null;
  var offersPromise = null;
  var currentOffer = null;
  var appliedDiscount = 0;

  function formatMoney(value) {
    return new Intl.NumberFormat("fr-FR").format(value) + " Ar";
  }

  function loadOffers() {
    if (offersPromise === null) {
      offersPromise = fetch(api.replace(/\/+$/, "") + "/api/public/offers?country=MG")
        .then(function (response) {
          if (!response.ok) throw new Error();
          return response.json();
        })
        .then(function (data) {
          var byCode = {};
          (data.offers || []).forEach(function (offer) { byCode[offer.code] = offer; });
          return byCode;
        })
        .catch(function () { return {}; })
        .finally(function () { offersPromise = null; });
    }
    return offersPromise;
  }

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
        if (submit && termsCheck && termsCheck.checked) submit.disabled = false;
      })
      .catch(function () {
        setTermsUnavailable("Conditions Générales indisponibles. Contactez ONIR-CMS.");
      });
  }

  function reset() {
    form.hidden = false;
    result.hidden = true;
    if (unavailable) unavailable.hidden = true;
    error.hidden = true;
    form.reset();
    currentOffer = null;
    appliedDiscount = 0;
    if (affiliateMessage) affiliateMessage.textContent = "";
    renderPrice(0);
  }

  function showUnavailable(message) {
    form.hidden = true;
    result.hidden = true;
    error.hidden = true;
    if (unavailableMessage) unavailableMessage.textContent = message || defaultFullMessage;
    if (unavailable) unavailable.hidden = false;
  }

  function listPrice() {
    if (!currentOffer) return 0;
    var months = Number(form.elements.durationMonths.value);
    var durations = currentOffer.durations || [];
    for (var index = 0; index < durations.length; index += 1) {
      if (Number(durations[index].months) === months) return Number(durations[index].priceMga) || 0;
    }
    return 0;
  }

  function renderPrice(paidDiscount) {
    var list = listPrice();
    if (!priceBreakdown || list <= 0) {
      if (priceBreakdown) priceBreakdown.hidden = true;
      return;
    }
    var discount = Math.max(0, Number(paidDiscount) || 0);
    var net = Math.max(0, list - discount);
    priceBreakdown.hidden = false;
    if (listPriceEl) listPriceEl.textContent = formatMoney(list);
    if (netPriceEl) netPriceEl.textContent = formatMoney(net);
    if (discount > 0) {
      if (discountRow) discountRow.hidden = false;
      if (discountEl) discountEl.textContent = "- " + formatMoney(discount);
    } else {
      if (discountRow) discountRow.hidden = true;
      if (discountEl) discountEl.textContent = "";
    }
  }

  function setAffiliateMessage(message) {
    if (affiliateMessage) affiliateMessage.textContent = message || "";
  }

  function applyAffiliateCode(silent) {
    var code = affiliateInput ? affiliateInput.value.trim() : "";
    if (code === "") {
      appliedDiscount = 0;
      renderPrice(0);
      setAffiliateMessage("");
      return Promise.resolve(true);
    }
    if (!currentOffer) {
      setAffiliateMessage(affiliateNetworkErrorText);
      return Promise.resolve(false);
    }
    var months = Number(form.elements.durationMonths.value);
    if (!silent) setAffiliateMessage(affiliateCheckingText);
    return fetch(
      api.replace(/\/+$/, "") +
        "/api/public/affiliation/validate?code=" +
        encodeURIComponent(code) +
        "&offerCode=" +
        encodeURIComponent(currentOffer.code) +
        "&durationMonths=" +
        encodeURIComponent(months),
    )
      .then(function (response) { return response.json(); })
      .then(function (payload) {
        if (!payload || payload.valid !== true) {
          appliedDiscount = 0;
          renderPrice(0);
          setAffiliateMessage(affiliateInvalidText);
          return false;
        }
        appliedDiscount = Number(payload.discountMga) || 0;
        renderPrice(appliedDiscount);
        setAffiliateMessage(affiliateAppliedText + " -" + formatMoney(appliedDiscount));
        return true;
      })
      .catch(function () {
        appliedDiscount = 0;
        renderPrice(0);
        setAffiliateMessage(affiliateNetworkErrorText);
        return false;
      });
  }

  function open(button) {
    var card = button.closest(".cloud-detail-card");
    var duration = card ? card.querySelector(".cloud-duration") : null;
    var code = button.getAttribute("data-offer-code") || "";
    reset();
    loadOffers().then(function (offers) {
      var offer = offers[code];
      currentOffer = offer || null;
      if (offer && offer.available === false) {
        showUnavailable(offer.fullMessage || defaultFullMessage);
      } else {
        form.elements.offerCode.value = code;
        form.elements.durationMonths.innerHTML = duration ? duration.innerHTML : "";
        if (duration) form.elements.durationMonths.value = duration.value;
        summary.textContent = button.getAttribute("data-offer-name") || "";
        var ref = new URLSearchParams(window.location.search).get("ref");
        if (ref && affiliateInput && affiliateInput.value.trim() === "") {
          affiliateInput.value = ref.trim();
        }
        renderPrice(0);
        loadTerms();
        if (affiliateInput && affiliateInput.value.trim() !== "") {
          applyAffiliateCode(true);
        }
      }
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  }

  function close() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    setTimeout(reset, 200);
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".js-subscribe");
    if (button) open(button);
  });
  closeButtons.forEach(function (button) { button.addEventListener("click", close); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) close(); });

  if (termsCheck) {
    termsCheck.addEventListener("change", function () {
      if (submit) submit.disabled = !termsCheck.checked || terms === null;
    });
  }

  if (affiliateApply) {
    affiliateApply.addEventListener("click", function () { applyAffiliateCode(false); });
  }

  if (affiliateInput) {
    affiliateInput.addEventListener("input", function () {
      appliedDiscount = 0;
      setAffiliateMessage("");
      renderPrice(0);
    });
  }

  form.elements.durationMonths.addEventListener("change", function () {
    appliedDiscount = 0;
    renderPrice(0);
    if (affiliateInput && affiliateInput.value.trim() !== "") applyAffiliateCode(true);
  });

  form.addEventListener("submit", async function (event) {
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
    var affiliateCode = affiliateInput ? affiliateInput.value.trim() : "";
    if (affiliateCode !== "") {
      var valid = await applyAffiliateCode(false);
      if (!valid) {
        error.textContent = affiliateInvalidText;
        error.hidden = false;
        return;
      }
    }
    var data = new FormData(form);
    var payload = {
      organizationName: String(data.get("organizationName") || "").trim(),
      contactName: String(data.get("contactName") || "").trim(),
      contactEmail: String(data.get("contactEmail") || "").trim(),
      contactPhone: String(data.get("contactPhone") || "").trim(),
      offerCode: String(data.get("offerCode") || ""),
      durationMonths: Number(data.get("durationMonths")),
      affiliateCode: affiliateCode,
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
        if (!out.ok) {
          if (out.body.error === "OFFER_FULL") {
            showUnavailable(out.body.message || defaultFullMessage);
            return;
          }
          throw new Error(out.body.message || out.body.error || "Demande refusée");
        }
        form.hidden = true;
        result.hidden = false;
        codeEl.textContent = out.body.code;
        offerEl.textContent = out.body.offerName;
        amountEl.textContent = out.body.free
          ? "Gratuit"
          : new Intl.NumberFormat("fr-FR").format(out.body.priceMga) + " Ar";
        if (out.body.discountMga > 0) {
          amountEl.textContent += " (remise " + new Intl.NumberFormat("fr-FR").format(out.body.discountMga) + " Ar)";
        }
        expiresEl.textContent = new Date(out.body.expiresAt).toLocaleDateString("fr-FR");
        if (successLeadEl && out.body.free && freeLead) successLeadEl.textContent = freeLead;
        instructionsEl.textContent = out.body.free
          ? freeInstructions
          : out.body.paymentInstructions || "Contactez ONIR pour obtenir les coordonnées de paiement.";
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
