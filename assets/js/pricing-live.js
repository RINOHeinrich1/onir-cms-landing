(function () {
  var section = document.querySelector("[data-pricing-live]");
  if (!section) return;
  var grid = section.querySelector(".cloud-detail-grid");
  var i18nScript = section.querySelector("[data-pricing-i18n]");
  var dialog = document.getElementById("subscribe-dialog");
  if (!grid || !i18nScript || !dialog) return;

  var labels;
  try {
    labels = JSON.parse(i18nScript.textContent || "{}");
  } catch (error) {
    return;
  }

  var locale = section.getAttribute("data-locale") || "fr";
  var api = (dialog.getAttribute("data-api") || "").replace(/\/+$/, "");
  if (api === "") return;

  function formatNumber(value) {
    return new Intl.NumberFormat(locale).format(value);
  }

  function formatPrice(value) {
    return formatNumber(value) + " Ar";
  }

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function period(months) {
    return labels.pricePeriod && labels.pricePeriod[months]
      ? labels.pricePeriod[months]
      : "/ " + months + " " + labels.months;
  }

  function descriptionFor(offer) {
    if (labels.offerDescriptions && labels.offerDescriptions[offer.code]) {
      return labels.offerDescriptions[offer.code];
    }
    return offer.description || "";
  }

  function renderBenefits(offer) {
    var list = element("ul", "price-list cloud-benefits");
    if (offer.maxChatbots !== null && offer.maxChatbots !== undefined) {
      list.append(element("li", "", formatNumber(offer.maxChatbots) + " " + labels.includedChatbots));
    }
    if (offer.maxTokens !== null && offer.maxTokens !== undefined) {
      list.append(
        element("li", "", formatNumber(offer.maxTokens) + " " + labels.includedTokens),
      );
    }
    if (offer.maxMessages !== null && offer.maxMessages !== undefined) {
      list.append(
        element("li", "", formatNumber(offer.maxMessages) + " " + labels.includedMessages),
      );
    }
    if (offer.maxStorageMb !== null && offer.maxStorageMb !== undefined) {
      var storage =
        offer.maxStorageMb >= 1024
          ? formatNumber(offer.maxStorageMb / 1024) + " " + labels.storageGb
          : formatNumber(offer.maxStorageMb) + " " + labels.storageMb;
      list.append(element("li", "", storage + " " + labels.storageLabel));
    }
    return list;
  }

  function renderOffer(offer) {
    var card = element("article", "cloud-detail-card");
    card.setAttribute("data-cloud-card", "");

    var head = element("div", "cloud-offer-head");
    head.append(element("strong", "", offer.name));
    var description = descriptionFor(offer);
    if (description) head.append(element("span", "", description));
    card.append(head);
    card.append(renderBenefits(offer));

    var durations = Array.isArray(offer.durations) ? offer.durations : [];
    var select = element("select", "cloud-duration");
    select.hidden = true;
    select.setAttribute("aria-label", (labels.subscription && labels.subscription.duration) || "");
    durations.forEach(function (duration, index) {
      var option = element("option");
      option.value = String(duration.months);
      option.setAttribute("data-price", formatPrice(duration.priceMga));
      option.setAttribute("data-period", period(duration.months));
      option.textContent =
        duration.months + " " + labels.months + " — " + formatPrice(duration.priceMga);
      option.selected = index === 0;
      select.append(option);
    });
    card.append(select);

    var price = element("div", "cloud-price");
    var priceValue = element(
      "strong",
      "",
      durations.length > 0 ? formatPrice(durations[0].priceMga) : "",
    );
    priceValue.setAttribute("data-cloud-price", "");
    price.append(priceValue);
    var priceLabel = element(
      "span",
      "",
      durations.length > 0 ? period(durations[0].months) : "",
    );
    priceLabel.setAttribute("data-cloud-period", "");
    price.append(priceLabel);
    card.append(price);

    var button = element(
      "button",
      "btn btn-accent js-subscribe",
      labels.cloud ? labels.cloud.offersCta : "",
    );
    button.type = "button";
    button.setAttribute("data-offer-code", offer.code);
    button.setAttribute("data-offer-name", offer.name);
    card.append(button);
    return card;
  }

  function render(offers) {
    var order = { FREE: 0, STARTER: 1, BUSINESS: 2, SCALE: 3 };
    offers.sort(function (left, right) {
      return (order[left.code] === undefined ? 99 : order[left.code]) -
        (order[right.code] === undefined ? 99 : order[right.code]);
    });
    var fragment = document.createDocumentFragment();
    offers.forEach(function (offer) {
      fragment.append(renderOffer(offer));
    });
    if (offers.length === 0) {
      fragment.append(element("p", "price-empty", labels.cloud.empty));
    }
    grid.replaceChildren(fragment);
    document.dispatchEvent(new CustomEvent("onir:pricing-rendered"));
  }

  fetch(api + "/api/public/offers?country=MG", { headers: { Accept: "application/json" } })
    .then(function (response) {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then(function (data) {
      var offers = Array.isArray(data.offers)
        ? data.offers.filter(function (offer) {
            return (offer.type || "cloud_subscription") === "cloud_subscription";
          })
        : [];
      render(offers);
    })
    .catch(function () {
      // Le HTML statique reste le fallback.
    });
})();
