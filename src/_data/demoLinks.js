const appBase = process.env.PREPROD_APP_URL ?? "";

export default {
  onirtech: "https://magic-link.onir-cms.tech/l/RUNc31WnQ_97jptABSwUkiWDFe4uBKsi",
  a2dm: "https://magic-link.onir-cms.tech/l/UTmz3b3UB2Lia_N8eDj_iUNsMvvugCUE",
  mandampro:
    process.env.MANDAMPRO_DEMO_URL ??
    (appBase ? `${appBase}/l/xDworc7TkeWuw88DZ_kFxopiKWJ6huZ-` : ""),
};
