# Baseline SEO — L0

Date : 2026-11-25.  
Environnement : build préprod généré depuis `main` (`9e9e8a3`).  
La préprod HTTP est protégée par Basic Auth et porte `X-Robots-Tag: noindex, nofollow`.

## Périmètre indexable

| Élément | Valeur |
| --- | ---: |
| URL dans le sitemap | 58 |
| Pages FR | 25 |
| Pages EN | 16 |
| Pages MG | 17 |
| Articles FR indexables | 6 |
| Pages thèmes | 10 par langue |
| Cas d’usage | 1 par langue |

Le sitemap contient les pages principales, les thèmes, les cas d’usage et les articles.
Les redirections historiques et les pages de fallback EN/MG des articles ne sont pas incluses.

## État technique initial

- 58 URL testées, 58 réponses `200` dans le build préprod.
- 76 liens internes contrôlés, 0 lien cassé.
- 0 canonical incohérent.
- 0 title dupliqué.
- 0 meta description dupliquée.
- 0 JSON-LD invalide.
- 0 page `noindex` présente dans le sitemap.
- 3 pages avec deux H1 : Participer FR, EN et MG.
- La home a un H1 grammaticalement fragile : « Créez votre assistant IA maitrisée ».
- Plusieurs titles sont courts ou génériques ; un title d’article dépasse 85 caractères.
- Plusieurs descriptions de thèmes dépassent 165 caractères.

## Performance

Mesures Lighthouse sur le build local :

| Page | Forme | Performance | Accessibilité | SEO |
| --- | --- | ---: | ---: | ---: |
| `/` | mobile | 0 (`NO_LCP`) | 87 | 100 |
| `/` | desktop | 99 | 91 | 100 |
| `/fonctionnalites/` | mobile | 96 | 96 | 100 |

Le score mobile de la home est à reproduire : le `NO_LCP` peut être un artefact du navigateur
headless ou un problème réel de rendu du hero. Le contrôle desktop et la page fonctionnalités
montrent que la base technique n’est pas globalement lente.

## Signaux de demande initiaux

Autocomplétion Google interrogée le 2026-11-25 en français :

- `chatbot madagascar` → quelques suggestions, dont « chat madagascar » ;
- `chatbot ia madagascar` → « chat a madagascar » ;
- `creation chatbot madagascar` → aucune suggestion ;
- `prix chatbot madagascar` → aucune suggestion ;
- `chatbot entreprise madagascar` → aucune suggestion ;
- `chatbot malagasy` → « chat malagasy », « ai malagasy » ;
- `chatbot malgache` → « chat malgache » ;
- `assistant ia madagascar` → « aide a madagascar ».

Ces signaux ne sont pas des volumes de recherche. Ils indiquent seulement que l’autocomplétion
est peu riche sur plusieurs requêtes. La demande doit être confirmée avec Search Console et un
outil de volumes avant de multiplier les pages.

## Ce qui manque encore pour clore G0

- Accès Google Search Console : impressions, clics, requêtes, pages indexées.
- Accès Bing Webmaster Tools.
- Volumes de recherche réels.
- Analyse des SERP concurrentielles.
- Événements de conversion : clic démo, demande de devis, inscription.
- Mesure du LCP mobile sur la préprod avec authentification et navigateur réel.
- Validation des affirmations produit avec l’équipe.

## Conclusion

Le socle SEO de base est sain : pas de casse technique majeure, pas de duplication, pas de
canonical incohérent. Les priorités sont la qualité éditoriale, l’accessibilité, le rendu
mobile, le JSON-LD open source/Cloud et la validation de la demande avant création des pages.
