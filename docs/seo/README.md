# SEO — suivi du plan d’amélioration

Ce dossier contient les livrables du plan [`plan-amelioration-seo.md`](../plans/plan-amelioration-seo.md).

## Statut

**L0 — en cours.** Le socle technique est audité. La porte G0 n’est pas encore franchie :
il manque Search Console, les volumes de recherche et les événements de conversion.

**L1 — corrections locales appliquées.** H1, JSON-LD, titles, accessibilité et cibles
tactiles sont corrigés dans le build préprod. Le LCP mobile reste à reproduire sur la
préprod authentifiée.

## Livrables

| Fichier | Contenu |
| --- | --- |
| [`audit-technique.md`](./audit-technique.md) | Crawl, métadonnées, H1, canonical, JSON-LD, liens, performance, accessibilité |
| [`baseline.md`](./baseline.md) | Périmètre indexable, état initial, performance, limites de mesure |
| [`keyword-map.csv`](./keyword-map.csv) | Requêtes candidates, intentions, pages cibles, statut de validation |
| [`url-map.csv`](./url-map.csv) | Pages existantes, pages à créer, actions et indexabilité |
| [`claims.md`](./claims.md) | Affirmations produit vérifiées, tarifs et formulations interdites |
| [`cannibalisation.md`](./cannibalisation.md) | Risques de chevauchement et règles de différenciation |
| [`l1-corrections.md`](./l1-corrections.md) | Corrections SEO et accessibilité appliquées, vérifications et point LCP |

## Constats principaux

- 58 URL dans le sitemap, 58 réponses 200 dans le build préprod.
- 0 lien interne cassé, 0 canonical incohérent, 0 duplication de title/description.
- Trois pages Participer ont deux H1.
- La home a un H1 à reformuler.
- Le JSON-LD `SoftwareApplication` mélange open source gratuit et Cloud payant.
- La performance mobile de la home doit être reproduite (`NO_LCP`).
- L’accessibilité de la home est à corriger (contrastes, cibles tactiles, ARIA).
- Les volumes de recherche ne sont pas encore validés.

## Prochaine action

Compléter L0 :

1. connecter Search Console/Bing ;
2. relever les impressions, clics et requêtes ;
3. valider les volumes ;
4. mesurer les conversions ;
5. rejouer le LCP mobile sur la préprod.

Ensuite seulement, ouvrir L1.
