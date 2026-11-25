# SEO — suivi du plan d’amélioration

Ce dossier contient les livrables du plan [`plan-amelioration-seo.md`](../plans/plan-amelioration-seo.md).

## Statut

**L0 — en cours.** Le socle technique est audité et les exports Search Console du
2026-11-25 sont intégrés. La porte G0 n’est pas encore franchie : il manque les volumes de
recherche, les URL détaillées des anomalies de couverture et les événements de conversion.

**L1 — corrections locales appliquées.** H1, JSON-LD, titles, accessibilité et cibles
tactiles sont corrigés dans le build préprod. Le LCP mobile reste à reproduire sur la
préprod authentifiée.

**L2 — cluster d’autorité FR créé.** Le modèle de page SEO est utilisé par
`/chatbot-madagascar/`, `/initiative-ia-madagascar/`, `/open-source-madagascar/` et
`/expertise-ia-madagascar/`. Les pages sont liées entre elles et disposent de JSON-LD
adaptés. À valider en préprod avant production.

## Livrables

| Fichier | Contenu |
| --- | --- |
| [`audit-technique.md`](./audit-technique.md) | Crawl, métadonnées, H1, canonical, JSON-LD, liens, performance, accessibilité |
| [`baseline.md`](./baseline.md) | Périmètre indexable, état initial, performance, limites de mesure |
| [`keyword-map.csv`](./keyword-map.csv) | Requêtes candidates, intentions, pages cibles, statut de validation |
| [`url-map.csv`](./url-map.csv) | Pages existantes, pages à créer, actions et indexabilité |
| [`claims.md`](./claims.md) | Affirmations produit vérifiées, tarifs et formulations interdites |
| [`cannibalisation.md`](./cannibalisation.md) | Risques de chevauchement et règles de différenciation |
| [`gsc-2026-11-25.md`](./gsc-2026-11-25.md) | Baseline Search Console : clics, impressions, requêtes, pays, pages et couverture |
| [`l1-corrections.md`](./l1-corrections.md) | Corrections SEO et accessibilité appliquées, vérifications et point LCP |

## Constats principaux

- 58 URL dans le sitemap, 58 réponses 200 dans le build préprod.
- 0 lien interne cassé, 0 canonical incohérent, 0 duplication de title/description.
- H1, JSON-LD et accessibilité corrigés ; Lighthouse accessibilité à 100 sur la home mobile.
- Le LCP mobile de la home reste à reproduire (`NO_LCP`).
- Search Console : 5 clics, 50 impressions, requêtes de marque uniquement.
- 36 pages indexées, 29 non indexées, dont 6 404 et 1 401 à identifier.
- Le doublon `www.onir-cms.tech` est corrigé par une redirection `301` vers l’apex.
- Les volumes de recherche ne sont pas encore validés.

## Prochaine action

Compléter L0 :

1. identifier les URL exactes des 404, 401 et pages `noindex` ;
2. valider les volumes de recherche ;
3. mesurer les conversions ;
4. rejouer le LCP mobile sur la préprod ;
5. vérifier l’évolution Search Console après le déploiement préprod.

L1b a corrigé la redirection `www` et le cache des assets. Reste le modèle de pages SEO.
