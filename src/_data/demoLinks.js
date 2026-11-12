const appBase = process.env.PREPROD_APP_URL ?? "";
const preprodLink = (token) => `${appBase}/l/${token}`;

export default {
  onirtech: appBase
    ? preprodLink("0KC3CzJJa6tEk1PsRM7LA_zwi__AUzmDsBdJ_ZGX3ro")
    : "https://magic-link.onir-cms.tech/l/RUNc31WnQ_97jptABSwUkiWDFe4uBKsi",
  a2dm: appBase
    ? preprodLink("t_9tHoVeSPjL4Ebe3vfac2cqm6DUvWOeoMF1bxYFXUM")
    : "https://magic-link.onir-cms.tech/l/UTmz3b3UB2Lia_N8eDj_iUNsMvvugCUE",
  mandampro:
    process.env.MANDAMPRO_DEMO_URL ??
    (appBase ? `${appBase}/l/xDworc7TkeWuw88DZ_kFxopiKWJ6huZ-` : ""),
};
