# 0001. Disponibilité commerciale par marché et encaissement

- **Statut** : Accepté
- **Date** : 2026-11-11
- **Décideurs** : équipe projet
- **Référence** : ADR-0087 et ADR-0089 de `onir-cms-commercial-back`.

## Contexte

Le paiement en ligne international fiable depuis Madagascar n'est pas disponible.

Les moyens actuels sont :

- Orange Money ;
- Mvola ;
- validation manuelle par un opérateur ;
- code unique dans la description du transfert.

Ils fonctionnent pour Madagascar, mais ne permettent pas d'encaisser proprement
des abonnements récurrents auprès de clients internationaux.

Il faut donc distinguer :

- le **produit vendu** ;
- le **marché** ;
- le **mode de vente** ;
- le **moyen d'encaissement**.

L'objectif initial est :

- Cloud ONIR CMS en self-service uniquement à Madagascar ;
- autres offres pour l'international ;
- aucune dépendance à un PSP international tant que l'encaissement n'est pas
  fiable.

## Décision

### 1. Cloud self-service réservé à Madagascar

Les offres suivantes sont disponibles uniquement avec un pays de facturation
`MG` :

- Cloud Starter ;
- Cloud Business ;
- Cloud Scale.

Elles utilisent :

```text
sales_mode            = self_service
available_countries   = ['MG']
billing_currency      = MGA
payment_methods       = ['orange_money', 'mvola']
requires_manual_payment = true
```

Le parcours reste celui du code unique :

```text
demande → code → paiement mobile money → validation opérateur → facture → provisioning
```

Aucun code de paiement n'est généré pour une demande hors Madagascar.

### 2. Offres internationales

Hors Madagascar, ONIR propose des offres sans abonnement Cloud self-service :

#### Self-hosted + support

```text
type                 = self_hosted_support
sales_mode           = quote
available_countries  = ['*']
payment_methods      = ['bank_transfer', 'partner']
```

Le logiciel reste open source. L'installation, la configuration et le support
sont vendus sous forme de devis ou de contrat annuel.

#### Enterprise

```text
type                 = enterprise
sales_mode           = quote
available_countries  = ['*']
payment_methods      = ['bank_transfer', 'partner']
```

Offre sur devis : instance dédiée, configuration, support premium, engagement
annuel.

#### Partenaire / revendeur

```text
type                 = partner
sales_mode           = partner
available_countries  = ['*']
```

Un partenaire local facture et encaisse dans son pays. ONIR fournit la licence,
l'accès et le support de second niveau.

### 3. La disponibilité appartient au catalogue commercial

La landing ne doit pas coder en dur « Madagascar uniquement ».

Chaque offre porte :

```text
type
sales_mode
available_countries
billing_currency
payment_methods
requires_manual_payment
```

Le filtrage se fait côté serveur et dans le backoffice.

### 4. La géolocalisation IP n'est pas une preuve

L'IP peut être utilisée pour :

- choisir l'affichage initial ;
- signaler un risque ;
- demander une revue manuelle.

Elle ne doit jamais être la seule condition d'acceptation ou de refus.

La validation principale repose sur :

- le pays de facturation déclaré ;
- le numéro de téléphone ;
- le moyen de paiement ;
- la validation opérateur.

Un client hors IP Madagascar avec un paiement Mvola malgache peut être accepté
après revue manuelle.

### 5. Parcours international

Une demande internationale ne crée pas :

- de code mobile money ;
- de facture automatique ;
- d'abonnement Cloud actif.

Elle crée une **demande de devis / de contact** avec :

- pays ;
- contact WhatsApp et email ;
- besoin ;
- budget ;
- délai estimé ;
- type d'offre souhaité.

Le commercial valide ensuite le devis, le contrat et l'encaissement.

### 6. ONIR-CMS ne porte pas la logique géographique

ONIR-CMS continue de recevoir uniquement :

- une organisation ;
- un profil de limites ;
- une invitation ;
- une période.

La disponibilité commerciale, le pays et le mode de paiement restent dans le
backoffice commercial.

## Alternatives écartées

### IP bloquée strictement

Rejetée : VPN, roaming, opérateurs et diaspora rendent l'IP peu fiable.

### Cloud self-service mondial avec paiement manuel

Rejeté pour le lancement : trop de risques d'impayés et de frais
internationaux.

### Stripe / PSP international immédiat

Rejeté pour le moment : disponibilité et délais d'intégration depuis
Madagascar.

### Un seul type d'offre pour tous les pays

Rejeté : le mode d'encaissement et le niveau de support ne sont pas les mêmes.

## Conséquences

### Positives

- Cloud vendable immédiatement à Madagascar.
- Clients internationaux servis sans encaissement récurrent automatique.
- Aucun faux code de paiement hors Madagascar.
- Catalogue extensible à d'autres pays.
- Séparation claire entre marketing, contrat et provisioning.

### Négatives

- Plusieurs parcours commerciaux à maintenir.
- Les demandes internationales sont manuelles.
- Le pays doit être collecté et validé.
- La détection IP reste indicative.
- L'expansion internationale du Cloud nécessitera un moyen d'encaissement
  fiable.

## Tests attendus

- `MG` : offres Cloud visibles et demandables ;
- `hors MG` : offres Cloud masquées ;
- `hors MG` : self-hosted, Enterprise et partenaire visibles ;
- API Cloud avec `billingCountry` hors MG : refus ;
- API internationale : aucune génération de code mobile money ;
- IP hors MG + paiement Mvola : revue manuelle, pas blocage silencieux ;
- traductions FR / EN / MG cohérentes ;
- aucune régression sur les offres existantes.
