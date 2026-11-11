const DEFAULT_BACKOFFICE_URL = "https://preprod-backoffice.onir-cms.tech";

function formatPrice(value) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} Ar`;
}

export default async function pricing() {
  const baseUrl = (process.env.COMMERCIAL_BACK_URL || DEFAULT_BACKOFFICE_URL).replace(/\/+$/, "");
  try {
    const response = await fetch(`${baseUrl}/api/public/offers`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return { offers: [], internationalOffers: [] };
    const payload = await response.json();
    const offers = Array.isArray(payload.offers) ? payload.offers : [];
    const order = { STARTER: 0, BUSINESS: 1, SCALE: 2 };
    const cloudOffers = offers.filter((offer) => (offer.type ?? "cloud_subscription") === "cloud_subscription");
    const internationalOffers = offers.filter((offer) => (offer.type ?? "cloud_subscription") !== "cloud_subscription");
    return {
      offers: cloudOffers
        .sort((a, b) => (order[a.code] ?? 99) - (order[b.code] ?? 99))
        .map((offer) => ({
        code: offer.code,
        name: offer.name,
        description: offer.description,
        maxChatbots: offer.maxChatbots ?? null,
        maxMessages: offer.maxMessages ?? null,
        maxMessagesFormatted: offer.maxMessages
          ? new Intl.NumberFormat("fr-FR").format(offer.maxMessages)
          : null,
        maxStorageMb: offer.maxStorageMb ?? null,
        tokensLabel: offer.maxTokens ? `${new Intl.NumberFormat("fr-FR").format(offer.maxTokens)} tokens / mois` : null,
        durations: (offer.durations || []).map((duration) => ({
          months: duration.months,
          priceLabel: formatPrice(duration.priceMga),
        })),
      })),
      internationalOffers,
    };
  } catch {
    return { offers: [], internationalOffers: [] };
  }
}
