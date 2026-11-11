# Plan d’action — Marché Madagascar / international

## Objectif

- Cloud ONIR CMS en self-service uniquement à Madagascar.
- Offres internationales basées sur devis, support et partenaires.
- Aucun paiement Cloud automatique hors Madagascar tant que l’encaissement
  international n’est pas fiable.
- Aucune régression sur les offres Cloud existantes à Madagascar.

## Principe

```text
MG          → Cloud self-service + Orange Money / Mvola + code
International → Self-hosted / Enterprise / Partenaire + devis
```

## Phase 1 — Backoffice commercial

### 1.1 Catalogue d’offres

Ajouter à `offers` :

```text
type                   cloud_subscription | self_hosted_support | enterprise | partner
sales_mode             self_service | quote | partner
available_countries    text[]  -- ['MG'] ou ['*']
billing_currency       MGA | EUR | USD
payment_methods        text[]
requires_manual_payment boolean
```

Migration :

```text
db/migrations/0006_offer_markets.sql
```

Backfill :

```text
STARTER, BUSINESS, SCALE
  type = cloud_subscription
  sales_mode = self_service
  available_countries = ['MG']
  billing_currency = MGA
  payment_methods = ['orange_money', 'mvola']
  requires_manual_payment = true
```

Créer les offres internationales :

```text
SELF_HOSTED_SUPPORT
  type = self_hosted_support
  sales_mode = quote
  available_countries = ['*']
  payment_methods = ['bank_transfer', 'partner']

ENTERPRISE
  type = enterprise
  sales_mode = quote
  available_countries = ['*']
  payment_methods = ['bank_transfer', 'partner']

PARTNER
  type = partner
  sales_mode = partner
  available_countries = ['*']
  payment_methods = ['partner']
```

### 1.2 API publique des offres

```http
GET /api/public/offers?country=MG
```

Règles :

- ne retourner que les offres dont `available_countries` contient le pays ou `*` ;
- retourner `salesMode`, `type`, `currency`, `requiresManualPayment` ;
- ne jamais retourner les offres Cloud hors MG ;
- si `country` absent : retourner uniquement les offres `*` et les offres
  internationales.

### 1.3 Demande Cloud MG

Étendre `POST /api/public/subscription-requests` avec :

```json
{
  "countryCode": "MG",
  "billingCountry": "MG",
  "contactPhone": "+261..."
}
```

Validation serveur :

- pays = `MG` ;
- téléphone compatible ;
- offre Cloud autorisée ;
- moyen de paiement Orange Money ou Mvola ;
- code unique généré uniquement si toutes les conditions passent.

Statuts d’erreur :

```text
OFFER_NOT_AVAILABLE_IN_COUNTRY
BILLING_COUNTRY_NOT_SUPPORTED
```

### 1.4 Demandes internationales

Créer une table :

```text
commercial_requests
  id
  type              self_hosted_support | enterprise | partner
  country_code
  contact_name
  contact_email
  contact_phone
  need
  budget
  timeline
  status            new | contacted | quoted | won | lost
  notes
  created_at
  updated_at
```

API :

```http
POST /api/public/commercial-requests
```

Règles :

- aucun code mobile money ;
- aucune facture automatique ;
- aucune création d’organisation avant contrat ;
- notification au commercial.

### 1.5 Backoffice

Ajouter une page :

```text
/demandes-commerciales
```

Fonctions :

- lister les demandes internationales ;
- filtrer par type et pays ;
- changer le statut ;
- ajouter une note ;
- consulter le contact WhatsApp/email.

### 1.6 Traçabilité

Ajouter aux demandes Cloud :

```text
country_code
billing_country
ip_country
eligibility_status
eligibility_reason
```

Les demandes hors MG ne doivent pas générer de code de paiement.

## Phase 2 — Landing

### 2.1 Contexte pays

Créer un module :

```text
src/_data/market.js
```

Responsabilités :

- pays sélectionné ;
- pays détecté ;
- offres disponibles ;
- mode de vente.

Le pays sélectionné est prioritaire sur l’IP.

### 2.2 Prix Cloud conditionnels

Modifier :

```text
src/_data/pricing.js
src/_includes/partials/pricing.njk
```

Règles :

- `MG` : afficher Cloud Starter / Business / Scale ;
- hors `MG` : masquer les offres Cloud self-service ;
- hors `MG` : afficher Self-hosted, Enterprise, Partenaire ;
- conserver les traductions FR / EN / MG.

### 2.3 Parcours de demande

- Cloud MG : modale existante + code + instructions Mobile Money ;
- International : bouton « Demander un devis » ;
- la modale internationale doit demander :
  - WhatsApp ;
  - email ;
  - besoin ;
  - budget ;
  - délai ;
  - pays.

### 2.4 Traductions

Ajouter dans :

```text
i18n/fr/pricing.json
i18n/en/pricing.json
i18n/mg/pricing.json
```

Clés :

```text
market.madagascarOnly
market.availableSoon
market.internationalOffer
market.requestQuote
market.selfHostedSupport
market.enterprise
market.partner
```

Le contrôle i18n doit rester vert.

### 2.5 Message hors Madagascar

Afficher :

```text
ONIR CMS Cloud est disponible uniquement à Madagascar pour le moment.
Découvrez nos offres self-hosted, Entreprise ou via un partenaire.
```

Sans bouton de paiement Cloud.

## Phase 3 — ONIR-CMS

Aucune logique géographique dans ONIR-CMS.

Le provisioning reste inchangé :

```text
organisation + profil + invitation + période
```

Il n’est appelé qu’après :

- validation du paiement Cloud MG ;
- ou signature/accord commercial international.

## Phase 4 — Tests

### Backoffice

- offre MG visible avec `?country=MG` ;
- offre Cloud absente avec `?country=FR` ;
- demande Cloud avec `billingCountry=FR` refusée ;
- demande internationale sans code créée ;
- aucun code mobile money pour l’international.

### Landing

- `/tarifs/` en MG : 3 offres Cloud ;
- `/tarifs/` hors MG : Cloud masqué ;
- self-hosted / Enterprise / partenaire visibles ;
- traductions FR/EN/MG complètes ;
- aucun bouton Cloud actif hors MG.

### Sécurité

- impossible de contourner avec un pays déclaré dans le navigateur ;
- validation serveur systématique ;
- IP seulement signal de revue.

## Ordre de mise en œuvre

1. Migration catalogue et backfill des offres Cloud.
2. API `GET /api/public/offers?country=...`.
3. Validation pays dans la demande Cloud.
4. Table et API des demandes commerciales internationales.
5. Page backoffice des demandes internationales.
6. Contexte pays et affichage conditionnel de la landing.
7. Traductions.
8. Tests backoffice + landing.
9. Déploiement préprod.

## Critères d’acceptation

- Un visiteur à Madagascar peut souscrire au Cloud avec code Mobile Money.
- Un visiteur hors Madagascar ne voit pas les offres Cloud self-service.
- Il voit les offres Self-hosted, Enterprise et Partenaire.
- Une demande internationale crée un devis/contact, pas un abonnement.
- Aucun code de paiement n’est généré hors MG.
- Les traductions FR/EN/MG sont complètes.
- ONIR-CMS ne contient aucune règle commerciale de pays.
