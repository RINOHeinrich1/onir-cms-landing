# Audit technique SEO — L0

Date : 2026-11-25  
Périmètre : landing ONIR CMS, build préprod généré depuis `main` (`9e9e8a3`).  
Mode : audit en lecture seule. Aucune page publique modifiée.

Les corrections issues de cet audit sont suivies dans [`l1-corrections.md`](./l1-corrections.md).

## Méthode

- Build local avec les variables préprod :
  - `PREPROD_APP_URL=https://preprod-cms.onirtech.com`
  - `PREPROD_PARTNER_API_URL=https://preprod-partner-api.onir-cms.tech/partenaires`
  - `COMMERCIAL_BACK_URL=https://preprod-backoffice.onir-cms.tech`
- Crawl du sitemap généré : 58 URL.
- Contrôle des titles, meta descriptions, H1, canonical, robots, hreflang, JSON-LD et liens internes.
- Lighthouse sur le build local, avec Chromium Playwright.
- La préprod HTTP est protégée par Basic Auth et renvoie `X-Robots-Tag: noindex, nofollow` ; le build local permet donc d’auditer le HTML réellement généré.

## Synthèse

| Contrôle | Résultat |
| --- | --- |
| URL dans le sitemap | 58 |
| Réponses 200 | 58 / 58 |
| Titles manquants | 0 |
| Meta descriptions manquantes | 0 |
| Canonical différent de l’URL | 0 |
| Titles dupliqués | 0 |
| Meta descriptions dupliquées | 0 |
| JSON-LD invalide | 0 |
| Liens internes testés | 76 |
| Liens internes cassés | 0 |
| Pages `noindex` dans le sitemap | 0 |

## Problèmes prioritaires

### P0 — Performance mobile de la home à reproduire

Lighthouse mobile sur la home retourne une performance `0` avec `NO_LCP`. Le même contrôle en desktop donne `99`.

Interprétation : il ne faut pas conclure que la home est lente sur tous les appareils, mais le rendu mobile doit être reproduit sur un vrai navigateur et sur la préprod. Le `NO_LCP` peut venir du chargement de la vidéo, d’un élément hero ou d’une particularité du navigateur headless.

À vérifier en priorité :
- élément LCP réel sur mobile ;
- poids et chargement de la vidéo hero ;
- chargement des polices ;
- scripts bloquants ;
- cache des assets.

### P0 — Accessibilité de la home

Lighthouse mobile : accessibilité `87`. Desktop : `91`.

Points relevés :
- contrastes insuffisants sur `.demo-cta`, `.article-kicker` et `.contact-kicker` ;
- cibles tactiles trop petites sur les boutons `.demo-dot` ;
- `aria-label` différent du texte visible sur le sélecteur de langue et le bouton vidéo ;
- `role="list"` sur `.providers` sans enfants de rôle `listitem`.

### P0 — Deux H1 sur les pages Participer

Pages concernées :
- `/participer/`
- `/en/participate/`
- `/mg/handray-anjara/`

Chaque page contient deux H1 :
- titre de la page ;
- titre de la section « Contribuer au code ».

Correction : garder un seul H1, transformer le second en H2.

### P0 — JSON-LD open source / Cloud

Le JSON-LD `SoftwareApplication` de la home porte :

```json
"offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
```

Cela décrit l’open source, mais peut laisser croire que toute l’offre ONIR CMS est gratuite. Le Cloud est payant à Madagascar.

Correction : séparer ou clarifier :
- ONIR CMS open source : gratuit, auto-hébergé, MIT ;
- ONIR CMS Cloud : offres payantes en MGA, disponibles à Madagascar.

### P1 — Métadonnées à retravailler

Titles trop courts ou trop génériques :
- `/` : `ONIR CMS — CMS pour chatbot`
- `/tarifs/` : `Tarifs — ONIR CMS`
- `/themes/` : `Thèmes libres · ONIR CMS`
- `/participer/` : `Participer · ONIR CMS`

Title trop long :
- `/articles/chatbot-reception-client/` : 89 caractères.

Meta descriptions hors plage de lecture :
- `/themes/` : 177 caractères ;
- `/en/themes/` : 171 ;
- `/mg/endrika/` : 174 ;
- pages starter : 59 à 79.

Les longueurs ne sont pas des règles absolues, mais les pages principales doivent avoir un titre plus explicite et une description plus lisible.

### P1 — Contenu de la home

H1 actuel :

```text
Créez votre assistant IA maitrisée
```

La formulation est grammaticalement fragile et peu explicite pour un moteur de recherche. À retravailler, par exemple :

```text
Créez votre assistant IA
```

ou :

```text
Créez un assistant IA adapté à votre organisation
```

### P1 — Hreflang des articles

Les articles n’ont pas de hreflang inter-langues. C’est acceptable tant qu’il n’existe qu’une version française.  
La règle à conserver : ne jamais ajouter de hreflang vers une traduction inexistante ou non relue.

### P2 — Redirections historiques

Les anciennes URL suivantes sont des redirections ou des pages `noindex` :
- `/articles/webhooks-tickets-github/`
- `/participer/developpeur/`
- `/participer/sponsoring/`
- `/plugins/`

Elles ne sont pas dans le sitemap. Comportement attendu, mais à vérifier avant toute modification de routing.

### P2 — Hôte `www`

Contrôle production en lecture seule : `https://www.onir-cms.tech/` répond `200` avec canonical vers l’apex.  
Recommandation : redirection `301` de `www` vers `onir-cms.tech` pour éviter un hôte dupliqué. À traiter hors préprod, avant mise en production des nouvelles pages.

## Performance Lighthouse

| Page | Form factor | Performance | Accessibilité | SEO |
| --- | --- | ---: | ---: | ---: |
| `/` | mobile | 0 (NO_LCP) | 87 | 100 |
| `/` | desktop | 99 | 91 | 100 |
| `/fonctionnalites/` | mobile | 96 | 96 | 100 |

Les scores SEO Lighthouse sont à 100 sur les pages testées. Les points à traiter sont donc surtout la performance mobile, l’accessibilité et la qualité éditoriale, pas les balises SEO de base.

## Corrections à porter dans L1

1. Corriger les deux H1 de Participer.
2. Clarifier le JSON-LD open source / Cloud.
3. Corriger le H1 de la home.
4. Retravailler les titles et descriptions des pages principales.
5. Corriger les contrastes, tailles de cible et libellés ARIA.
6. Reproduire le LCP mobile sur la préprod avec un navigateur réel.
7. Vérifier le cache des assets et le poids de la vidéo hero.
8. Prévoir la redirection `www` → apex avant la production.

## Limites de cet audit

- Google Search Console n’est pas connecté : pas de données d’impressions, de clics ni de couverture d’indexation.
- Les volumes de recherche ne sont pas validés : la carte de mots-clés est une hypothèse à confirmer.
- La préprod est volontairement `noindex` : les résultats d’indexation ne peuvent pas être mesurés dessus.
- Lighthouse mesure un build local ; il devra être rejoué sur la préprod avec authentification et sur mobile réel.
