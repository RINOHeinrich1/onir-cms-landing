# Plan d’amélioration SEO — landing ONIR CMS

Statut : en cours — L0 (audit et cadrage).

Livrables : [`docs/seo/`](../seo/README.md).

Périmètre : `onir-cms.tech` (landing statique Eleventy). Le produit, l’API, la tarification
et les règles commerciales restent hors périmètre de ce plan.

## Objectif

Construire un écosystème de contenus qui positionne ONIR CMS sur les recherches
« chatbot Madagascar », « assistant IA Madagascar » et les intentions commerciales associées,
sans dénaturer le positionnement international ni la logique produit.

Le plan est organisé **par lots**, avec des dépendances et des portes de sortie. Aucun
calendrier : un lot démarre uniquement lorsque ses dépendances sont satisfaites et que la
porte précédente est franchie.

## Principes

- Une intention de recherche = une URL.
- Aucune page créée sans preuve de demande ou sans contenu réellement unique.
- Aucune page secteur dupliquée avec seulement le nom du métier changé.
- Aucun chiffre, tarif, client, témoignage ou statistique inventé.
- Le logiciel open source et ONIR CMS Cloud doivent rester distingués.
- Le français est la langue source ; EN/MG uniquement avec une qualité vérifiée.
- Le design et les composants existants sont réutilisés.
- La logique métier et les règles de tarification ne sont pas modifiées.
- Aucune promesse de position Google.

## État des lieux

Le site dispose déjà de :

- génération statique Eleventy ;
- routes FR à la racine, EN sous `/en/`, MG sous `/mg/` ;
- canonical, hreflang et `x-default` sur les pages principales ;
- `robots.txt` et `sitemap.xml` ;
- Open Graph et Twitter Card ;
- JSON-LD `Organization`, `WebSite`, `SoftwareApplication`, `Article`, `FAQPage` ;
- pages fonctionnalités, tarifs, thèmes, thème détaillé, cas d’usage et articles ;
- offres Cloud chargées dynamiquement depuis l’API ;
- cas d’usage existant : `/cas-usage/reception-client/` ;
- thème Puzzle publié : `/themes/puzzle/`.

Points à traiter :

- le JSON-LD `SoftwareApplication` de l’accueil porte `price: 0 EUR` : il mélange open source
  et Cloud payant ;
- les articles n’ont pas de hreflang inter-langues : à ne traiter que lorsque de vraies
  traductions existent ;
- le sitemap doit contenir uniquement les pages indexables et les nouvelles pages SEO ;
- le maillage entre le pilier, les guides, les fonctionnalités et les démos reste à construire ;
- les pages secteur et les pages guides n’existent pas encore.

## Architecture cible

```text
/chatbot-madagascar/                       page pilier
/guides/creer-chatbot-madagascar/          guide tutoriel
/guides/prix-chatbot-madagascar/           guide achat
/solutions/chatbot-entreprise-madagascar/  page B2B
/solutions/<secteur>/                      pages secteur, preuve obligatoire
/outils/calculateur-rentabilite-chatbot/   outil gratuit
```

Les pages existantes servent de socle :

```text
/fonctionnalites/        preuve fonctionnelle
/tarifs/                 conversion
/themes/                 catalogue
/themes/puzzle/          preuve et démonstration
/cas-usage/reception-client/  cas d’usage réel
/articles/               autorité thématique
```

## Vue d’ensemble des lots

| Lot | Objectif | Dépend de |
| --- | --- | --- |
| L0 | Cadrage, audit, mots-clés et vérité produit | — |
| L1 | Socle SEO technique et modèle de page | L0 |
| L2 | Page pilier `chatbot-madagascar` | L0, L1 |
| L3 | Guides de conversion | L0, L1, L2 |
| L4 | Preuves produit et templates | L0, L1, L2 |
| L5 | B2B et secteurs | L0, L2, L4 |
| L6 | International et autorité | L2, L3 |
| L7 | Outils et mesure | L0, L1, L3 |

Ordre recommandé :

```text
L0 → L1 → L2 → L3 + L4 → L5 → L6
                    ↘ L7
```

Règle : **L5 ne démarre pas avant que L4 ait produit une preuve réelle et publiable.**

## L0 — Cadrage, audit et vérité produit

### Objectif

Savoir ce qui est vrai, ce qui est demandé, ce qui existe déjà et ce qui peut être publié
sans inventer.

### Travaux

- Crawler le site et vérifier :
  - codes HTTP ;
  - redirections et 404 ;
  - titles et meta descriptions dupliqués ;
  - H1 et hiérarchie H2/H3 ;
  - canonical et hreflang ;
  - HTML rendu sans JavaScript ;
  - maillage interne ;
  - pages orphelines ;
  - version mobile ;
  - Core Web Vitals.
- Vérifier l’indexation dans Google Search Console et Bing Webmaster Tools.
- Soumettre le sitemap.
- Inventorier les pages existantes et les intentions qu’elles couvrent.
- Rechercher les mots-clés et analyser les SERP :
  - chatbot Madagascar ;
  - chatbot IA Madagascar ;
  - création chatbot Madagascar ;
  - prix chatbot Madagascar ;
  - chatbot entreprise Madagascar ;
  - assistant IA Madagascar ;
  - chatbot malagasy ;
  - chatbot malgache ;
  - chatbot sans code Madagascar.
- Vérifier les volumes et l’intention réelle de chaque requête.
- Vérifier les tarifs Cloud depuis l’API, sans valeur en dur.
- Vérifier la licence MIT et les fonctionnalités réellement disponibles.
- Vérifier les promesses : reprise humaine, disponibilité, hébergement, limites.
- Décider de l’usage éditorial de « malagasy » et de « malgache » selon les requêtes.

### Livrables

```text
docs/seo/audit-technique.md
docs/seo/keyword-map.csv
docs/seo/url-map.csv
docs/seo/claims.md
docs/seo/baseline.md
docs/seo/cannibalisation.md
```

### Critères de sortie

- Chaque mot-clé prioritaire a une intention et une page cible.
- Chaque affirmation produit est vérifiée.
- Les pages existantes à enrichir sont identifiées.
- Aucune nouvelle page n’est planifiée sans demande ou valeur démontrée.

**Porte G0 :** validation de L0 avant toute production de contenu.

## L1 — Socle SEO technique

### Objectif

Pouvoir créer une page SEO correcte par défaut, sans réinventer les métadonnées ni le
maillage à chaque page.

### Travaux

- Créer un modèle de page réutilisable pour :
  - pilier ;
  - guide ;
  - solution ;
  - secteur ;
  - outil.
- Centraliser dans le modèle :
  - title ;
  - meta description ;
  - canonical ;
  - Open Graph ;
  - Twitter Card ;
  - hreflang ;
  - breadcrumb ;
  - JSON-LD ;
  - CTA ;
  - date de mise à jour ;
  - auteur ou entité responsable.
- Ajouter les nouvelles pages au sitemap.
- Exclure les pages `noindex` du sitemap.
- Ajouter `lastmod` aux pages principales.
- Corriger le JSON-LD pour distinguer :
  - ONIR CMS open source ;
  - ONIR CMS Cloud SaaS.
- Vérifier les hreflang des articles : uniquement entre traductions réelles.
- Ajouter le suivi des CTA.
- Ajouter les breadcrumbs visibles et structurés.
- Vérifier le rendu HTML sans JavaScript.
- Vérifier que le build et le contrôle i18n restent verts.

### Livrables

- Modèle de page SEO.
- Données de routing et de métadonnées.
- Sitemap mis à jour.
- JSON-LD corrigé.
- Checklist SEO de publication.

### Critères de sortie

- Une nouvelle page peut être créée avec des métadonnées correctes par défaut.
- Le sitemap ne contient que des pages indexables.
- Les données structurées sont valides.
- Les CTA sont mesurables.
- Aucune régression de build ni de traduction.

**Porte G1 :** validation de L1 avant L2.

## L2 — Page pilier `/chatbot-madagascar/`

### Objectif

Créer la page de référence sur l’intention principale.

### Sous-lots

```text
L2.1 Brief et analyse SERP
L2.2 Rédaction FR
L2.3 Preuves et captures
L2.4 Implémentation et métadonnées
L2.5 QA mobile, liens, indexation
```

### Contenu attendu

- Qu’est-ce qu’un chatbot IA ?
- Pourquoi utiliser un chatbot à Madagascar ?
- ONIR CMS Cloud et ses cas d’usage.
- Réponses automatiques et reprise humaine.
- Collecte de données structurées.
- Exemples par secteur.
- Création d’un premier chatbot.
- Facteurs de prix.
- Technologie développée à Madagascar.
- Démonstrations interactives.
- FAQ.
- CTA démonstration et tarifs.

### Title et H1 proposés

```text
Title : Chatbot IA à Madagascar — ONIR CMS
H1    : Créez votre chatbot IA à Madagascar
```

### Liens internes obligatoires

```text
/guides/creer-chatbot-madagascar/
/guides/prix-chatbot-madagascar/
/solutions/chatbot-entreprise-madagascar/
/fonctionnalites/
/tarifs/
/themes/
/themes/puzzle/
/cas-usage/reception-client/
```

### Critères de sortie

- Une seule intention principale.
- Title, meta description et H1 uniques.
- Preuve produit réelle.
- Au moins 3 liens entrants et 3 sortants.
- CTA mesurés.
- Page indexable et présente dans le sitemap.

**Porte G2 :** pilier publié et maillé avant les guides.

## L3 — Guides de conversion

### L3a — `/guides/creer-chatbot-madagascar/`

Intention : tutoriel.

Title proposé :

```text
Créer un chatbot à Madagascar sans coder — ONIR CMS
```

H1 proposé :

```text
Comment créer un chatbot IA à Madagascar sans programmer ?
```

Contenu :

- définir l’objectif ;
- choisir entre sur mesure et SaaS ;
- créer son compte ;
- configurer le rôle de l’assistant ;
- ajouter les connaissances ;
- définir les informations à collecter ;
- personnaliser l’interface ;
- tester ;
- publier ;
- analyser les résultats.

Preuves : captures réelles, tutoriel court, lien vers la démo.

CTA : « Créer mon chatbot ».

### L3b — `/guides/prix-chatbot-madagascar/`

Intention : décision d’achat.

Title proposé :

```text
Prix d’un chatbot à Madagascar — ONIR CMS
```

H1 proposé :

```text
Combien coûte un chatbot IA à Madagascar ?
```

Contenu :

- types de chatbots ;
- facteurs de prix ;
- développement sur mesure ;
- solution SaaS ;
- coût des modèles IA ;
- hébergement et maintenance ;
- offres ONIR CMS Cloud ;
- rentabilité ;
- choix selon le budget.

Règle : les tarifs sont lus depuis l’API, jamais hardcodés.

CTA : « Voir les tarifs » et « Demander une démonstration ».

### Critères de sortie

- Deux intentions distinctes, sans cannibalisation avec le pilier.
- Aucun chiffre non vérifié.
- Chaque page possède son propre CTA.
- Chaque page est liée au pilier et aux fonctionnalités.

## L4 — Preuves produit et templates

### Objectif

Produire les actifs qui rendent le SEO crédible et différenciant.

### Travaux

- Enrichir `/cas-usage/reception-client/` :
  - capture réelle ;
  - parcours avant/après ;
  - exemple de fiche de qualification ;
  - limites ;
  - CTA.
- Transformer `/themes/puzzle/` en vraie page de présentation :
  - description ;
  - captures ;
  - cas d’usage ;
  - démo ;
  - installation ;
  - version ;
  - JSON-LD correct.
- Ajouter un lien depuis le pilier vers Puzzle.
- Constituer une bibliothèque de captures réutilisables.
- Documenter les templates disponibles.

### Critères de sortie

- Chaque preuve est réelle.
- Aucune capture inventée.
- Chaque template publié a une page indexable.
- Les pages de preuve sont liées au pilier et aux guides.

**Porte G3 :** validation de L4 avant L5.

## L5 — B2B et secteurs

### L5a — `/solutions/chatbot-entreprise-madagascar/`

Intention : B2B.

Title proposé :

```text
Chatbot entreprise à Madagascar — ONIR CMS
```

H1 proposé :

```text
Un assistant IA pour votre entreprise à Madagascar
```

Contenu :

- enjeux de la relation client à Madagascar ;
- réponses hors horaires ;
- questions récurrentes ;
- qualification des prospects ;
- reprise humaine ;
- centralisation des données ;
- intégrations et webhooks ;
- exemples par secteur ;
- déploiement.

CTA : « Demander une démonstration ».

### L5b — Pages secteur

Deux pages maximum au démarrage :

```text
/solutions/restaurant/
/solutions/ecommerce/
```

Candidates ultérieures : immobilier, éducation, tourisme, hôtellerie.

Chaque page doit avoir :

- une démo ou un template dédié ;
- un parcours métier réel ;
- des captures ;
- une FAQ spécifique ;
- un CTA démo ;
- un contenu non interchangeable.

Aucune page secteur sans preuve produit.

### Critères de sortie

- Chaque page secteur apporte une preuve propre.
- Aucune page « doorway ».
- Les pages sont liées au pilier, aux templates et à la page entreprise.

## L6 — International et autorité

### Travaux

- Décider des langues réellement supportées.
- FR d’abord.
- MG uniquement avec relecture native.
- EN ensuite si le marché le justifie.
- Configurer hreflang uniquement entre pages traduites.
- Ne pas indexer les traductions faibles.
- Créer les backlinks locaux :
  - ONIRTECH ;
  - GitHub ;
  - LinkedIn ;
  - communautés tech malagasy ;
  - partenaires ;
  - écoles et universités ;
  - annuaires pertinents.
- Mettre à jour les pages existantes selon Search Console.

### Critères de sortie

- Aucun hreflang orphelin.
- Aucune traduction automatique indexée.
- Backlinks acquis sans spam.
- Positionnement international conservé.

## L7 — Outils et mesure

### L7a — Calculateur de rentabilité

URL :

```text
/outils/calculateur-rentabilite-chatbot/
```

Fonctions :

- nombre de conversations ;
- temps moyen par réponse ;
- coût horaire ;
- taux d’automatisation ;
- économie estimée en ariary ;
- CTA démonstration.

Règles :

- formules visibles ;
- hypothèses modifiables ;
- aucun résultat présenté comme une garantie.

### L7b — Testeur malagasy

Conditionnel :

- qualité linguistique réelle ;
- quotas ;
- coût IA maîtrisé ;
- modération ;
- CTA.

Ne pas lancer si le coût ou la qualité ne sont pas maîtrisés.

### L7c — Générateur de prompts

À décaler ou supprimer : peu différenciant.

### L7d — Tableau de bord

Suivre :

- pages indexées ;
- impressions ;
- clics ;
- CTR ;
- clics CTA ;
- démonstrations ;
- inscriptions ;
- pages sans impressions ;
- pages à fort CTR mais faible conversion.

## Portes de sortie

| Porte | Condition |
| --- | --- |
| G0 | Audit, mots-clés et vérité produit validés |
| G1 | Socle SEO technique validé |
| G2 | Pilier publié et maillé |
| G3 | Guides et preuves produit publiés |
| G4 | Pages B2B et secteurs validées par les preuves |
| G5 | International et outils validés |

## Définition de « terminé » pour une page

Une page est publiable seulement si :

- elle répond à une intention unique ;
- elle a un title et une meta description uniques ;
- elle a un H1 unique ;
- elle contient une preuve produit réelle ;
- elle a au moins 3 liens internes entrants et 2 sortants ;
- elle est dans le sitemap ;
- elle est testée sur mobile ;
- elle a un CTA mesurable ;
- elle ne contient aucune statistique ou promesse inventée ;
- elle est validée techniquement et éditorialement.

## Contrat d’exécution d’un lot

Chaque lot doit préciser :

```text
Objectif
Périmètre inclus
Périmètre exclu
Dépendances
Fichiers concernés
Artefacts attendus
Preuves produit utilisées
Critères d’acceptation
Tests de validation
Risques
```

Un agent ne doit jamais :

- inventer un tarif ;
- inventer un client ;
- inventer une statistique ;
- promettre une position Google ;
- créer une page secteur sans preuve ;
- modifier la logique métier ;
- dupliquer une page existante.

## Articulation avec le plan marché

Le plan [`plan-marche-mada-international.md`](./plan-marche-mada-international.md) reste la
référence pour :

- la disponibilité commerciale par pays ;
- les offres Cloud et internationales ;
- les moyens de paiement ;
- les parcours de demande ;
- les règles de facturation.

Le plan SEO ne redéfinit pas ces règles. Il réutilise les offres et les tarifs exposés par
l’API, et ne crée aucune promesse commerciale qui contredirait ce plan.

## Risques et parades

| Risque | Parade |
| --- | --- |
| Pages secteur dupliquées | Deux pages maximum, avec démo réelle |
| Cannibalisation | Une intention = une URL |
| Volume faible sur « chatbot Madagascar » | Cibler aussi les longues traînes et le B2B |
| « Malagasy » vs « malgache » | Utiliser les deux naturellement |
| Tarifs obsolètes | Lire l’API, jamais hardcoder |
| Traductions faibles | Publier seulement les langues relues |
| Contenu générique | Captures, démos, cas concrets, tutoriels |
| Attente de résultats trop rapide | Revue à 30, 60 et 90 jours |
