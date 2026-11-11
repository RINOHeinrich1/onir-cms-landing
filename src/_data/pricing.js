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
    if (!response.ok) return { offers: [] };
    const payload = await response.json();
    const offers = Array.isArray(payload.offers) ? payload.offers : [];
    return {
      offers: offers.map((offer) => ({
        code: offer.code,
        name: offer.name,
        description: offer.description,
        maxChatbots: offer.maxChatbots ?? null,
        tokensLabel: offer.maxTokens ? `${new Intl.NumberFormat("fr-FR").format(offer.maxTokens)} tokens / mois` : null,
        durations: (offer.durations || []).map((duration) => ({
          months: duration.months,
          priceLabel: formatPrice(duration.priceMga),
        })),
      })),
    };
  } catch {
    return { offers: [] };
  }
}
