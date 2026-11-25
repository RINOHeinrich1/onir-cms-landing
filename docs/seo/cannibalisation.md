# Risques de cannibalisation — L0

Le site possède déjà des pages produit, des articles et un cas d’usage. Les nouvelles pages
doivent répondre à une intention différente, pas reformuler l’existant.

## Correspondances à surveiller

| Page existante | Nouvelle page | Risque | Différenciation obligatoire |
| --- | --- | --- | --- |
| `/` | `/chatbot-madagascar/` | La home et le pilier peuvent cibler les mêmes requêtes | La home reste la marque et le produit ; le pilier traite l’intention locale et l’achat |
| `/fonctionnalites/` | `/solutions/chatbot-entreprise-madagascar/` | Deux pages peuvent décrire les mêmes fonctionnalités | Fonctionnalités = capacités ; solution entreprise = résultats, cas d’usage et déploiement |
| `/tarifs/` | `/guides/prix-chatbot-madagascar/` | Deux pages peuvent parler du prix | Tarifs = offres et achat ; guide = facteurs de coût, comparaison et méthode d’estimation |
| `/cas-usage/reception-client/` | `/guides/creer-chatbot-madagascar/` | Deux pages peuvent expliquer la création | Cas d’usage = parcours concret ; guide = méthode générale de création |
| `/articles/chatbot-reception-client/` | `/guides/creer-chatbot-madagascar/` | Doublon tutoriel | L’article reste un tutoriel produit ciblé ; le guide devient la page de référence sur la création |
| `/guides/chatbot-malagasy/` | `/chatbot-madagascar/` | Deux intentions proches | Le pilier cible le marché Madagascar ; le guide traite la langue et les tests linguistiques |
| `/themes/puzzle/` | `/solutions/restaurant/` | Une page secteur peut dupliquer une démo de template | La page secteur décrit un métier et un parcours ; le thème décrit un template |
| `/en/themes/` et `/mg/endrika/` | Pages FR correspondantes | Duplication inter-langues | hreflang uniquement entre traductions réelles ; fallback noindex si nécessaire |
| `/articles/` | Pages guides | Index et contenus peuvent se chevaucher | L’index liste ; les guides répondent à une intention précise |

## Règles de décision

1. Une requête principale = une URL cible.
2. Une page existante qui répond déjà à l’intention doit être enrichie, pas dupliquée.
3. Un guide ne doit pas reprendre le contenu de la page tarifs ou fonctionnalités ; il doit
   apporter une méthode, des exemples ou une comparaison.
4. Une page secteur ne peut exister que si elle possède une démo, un template ou un parcours
   métier spécifique.
5. Les pages EN/MG ne doivent pas être indexées si leur contenu est un simple fallback.
6. Les redirections historiques restent hors sitemap.
7. Les articles peuvent renvoyer vers les pages commerciales, mais les pages commerciales ne
   doivent pas absorber tout le contenu des articles.

## Pages à ne pas créer maintenant

- `/solutions/immobilier/`
- `/solutions/hotellerie/`
- `/solutions/education/`
- `/solutions/tourisme/`

Ces pages sont décalées tant qu’il n’existe pas de preuve produit dédiée. Elles seraient des
pages sectorielles interchangeables, avec un risque de contenu mince ou de doorway page.

## pages à enrichir avant d’en créer de nouvelles

- `/themes/puzzle/` : ajouter captures, description d’usage, démo, installation.
- `/cas-usage/reception-client/` : ajouter captures, parcours, limites et CTA.
- `/articles/chatbot-reception-client/` : raccourcir le title et renforcer le maillage vers le
  futur guide de création.

## Vérification après publication

- Chercher chaque titre et chaque H1 dans Search Console.
- Vérifier les requêtes qui déclenchent plusieurs URL.
- Si deux URL se positionnent sur la même requête, fusionner ou différencier.
- Ne pas corriger la cannibalisation en ajoutant des mots-clés : corriger en clarifiant
  l’intention et le maillage.
