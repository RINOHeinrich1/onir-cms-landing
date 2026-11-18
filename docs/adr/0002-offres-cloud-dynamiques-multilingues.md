# 0002. Offres Cloud dynamiques et libellés multilingues

- **Statut** : Accepté
- **Date** : 2026-11-18
- **Décideurs** : équipe projet
- **Référence** : ADR-0001.

## Contexte

La page `/tarifs/` est générée statiquement par Eleventy. Les offres Cloud
sont récupérées depuis l'API commerciale **au moment du build** et leurs
quotas sont écrits dans le HTML.

Conséquences :

- une modification de profil ou d'offre n'apparaît qu'après un nouveau
  déploiement de la landing ;
- un quota modifié dans le backoffice peut afficher une ancienne valeur
  pendant plusieurs jours ;
- les libellés sont déjà traduits par Eleventy, mais les valeurs dynamiques ne
  peuvent pas l'être au build.

## Décision

### 1. L'API commerciale reste la source de vérité

Le HTML généré au build reste présent comme **fallback** pour le premier
rendu, le SEO et les navigateurs sans JavaScript.

Après le chargement, un script client interroge :

```text
GET <commercialApi>/api/public/offers?country=MG
```

et remplace les cartes Cloud par les offres réellement disponibles.

### 2. Rendu côté client

Le script `pricing-live.js` :

- vide puis reconstruit `.cloud-detail-grid` ;
- utilise uniquement des API DOM (`createElement`, `textContent`) pour les
  données provenant de l'API ;
- applique l'ordre éditorial local (`FREE`, `STARTER`, `BUSINESS`, `SCALE`),
  les nouvelles offres inconnues étant placées à la fin ;
- affiche les quotas, prix, durées et disponibilité à jour ;
- émet un événement `onir:pricing-rendered` après le rendu.

En cas d'échec réseau, le HTML statique reste affiché sans erreur visible.

### 3. Traduction limitée aux libellés

Les données commerciales (nom, description, prix, quotas) ne sont pas
traduites côté landing. Seuls les **libellés** et les descriptions éditoriales
mappées le sont :

- `chatbots inclus` ;
- `tokens inclus / mois` ;
- `messages / mois` ;
- `Go` / `Mo` / `de stockage` ;
- `mois` et périodes de prix ;
- bouton de souscription ;
- descriptions par code d'offre (`offerDescriptions`).

Ces libellés sont injectés une seule fois dans un bloc JSON
`application/json` par locale, puis lus par le script.

### 4. Compatibilité avec les composants existants

- `pricing-top-carousel.js` observe les changements du DOM pour recalculer les
  diapositives et les paginations.
- `pricing-duration.js` utilise la délégation d'événements et relit les cartes
  après `onir:pricing-rendered`.
- `subscription.js` continue d'interroger l'API à l'ouverture du formulaire
  pour la disponibilité et le message de complétude.

### 5. Sécurité

- aucune clé ou secret n'est exposé au navigateur ;
- seules les données de l'endpoint public sont utilisées ;
- les contenus API sont insérés via `textContent`, jamais via `innerHTML`.

## Conséquences

- Les quotas et offres sont à jour sans redéploiement.
- Le HTML statique reste une photographie de secours.
- Ajouter une nouvelle offre ne nécessite plus de reconstruire la landing.
- Ajouter un nouveau libellé nécessite d'ajouter sa clé dans les trois fichiers
  `i18n/*/pricing.json`.
