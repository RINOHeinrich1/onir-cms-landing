# Vérité produit et affirmations autorisées — L0

Date de vérification : 2026-11-25.  
Environnement de référence : préprod.

## Règle

Une affirmation ne peut être publiée que si elle est vérifiée dans le produit, l’API, le dépôt
ou un document officiel. Les formulations commerciales ne doivent pas transformer une
possibilité technique en promesse systématique.

## Affirmations vérifiées

| Affirmation | Statut | Source |
| --- | --- | --- |
| ONIR CMS est un logiciel open source sous licence MIT. | Vérifié | `LICENSE` du dépôt `onir-cms` |
| ONIR CMS peut être auto-hébergé. | Vérifié | Site, page fonctionnalités, tarifs |
| ONIR CMS Cloud est une offre SaaS. | Vérifié | Page tarifs, API des offres |
| ONIR CMS Cloud est réservé à Madagascar aujourd’hui. | Vérifié | Plan marché, page tarifs, API `availableCountries: ["MG"]` |
| Le paiement Cloud à Madagascar se fait par Orange Money ou Mvola. | Vérifié | API préprod `paymentMethods` |
| Les offres Cloud sont activées après vérification manuelle du paiement. | Vérifié | API `requiresManualPayment: true`, page tarifs |
| ONIR CMS permet de créer un assistant avec un rôle et un ton. | Vérifié | Page fonctionnalités |
| ONIR CMS permet le suivi des conversations. | Vérifié | Page fonctionnalités |
| ONIR CMS permet la reprise humaine d’une conversation. | Vérifié | Page fonctionnalités |
| ONIR CMS permet de collecter des informations dans des fiches. | Vérifié | Page fonctionnalités |
| ONIR CMS propose des intégrations, un widget, une API et des notifications. | Vérifié | Page fonctionnalités, article webhooks |
| ONIR CMS fonctionne avec des fournisseurs compatibles OpenAI. | Vérifié | Page fonctionnalités |
| ONIR CMS permet de personnaliser l’apparence et propose des thèmes. | Vérifié | Page fonctionnalités, catalogue de thèmes |
| Puzzle existe en version `1.1.0-beta.3`. | Vérifié | Catalogue et archive de téléchargement |
| ONIR CMS est né à Madagascar / est une initiative malagasy. | Vérifié | Page d’accueil |

## Tarifs vérifiés sur préprod

Les valeurs ci-dessous sont celles de l’API préprod au 2026-11-25. Elles ne doivent pas être
recopiées en dur dans les contenus : la page tarifs les charge dynamiquement.

| Offre | Prix mensuel | Limites principales |
| --- | ---: | --- |
| Gratuit | 0 Ar | 1 chatbot, 20 000 tokens, 200 messages, 50 Mo |
| Starter | 35 000 Ar | 3 chatbots, 1 000 000 tokens, 10 000 messages, 250 Mo |
| Business | 120 000 Ar | 10 chatbots, 5 000 000 tokens, 50 000 messages, 5 Go |
| Scale | 350 000 Ar | 30 chatbots, 15 000 000 tokens, 150 000 messages, 20 Go |
| Enterprise | Sur devis | Instance dédiée, configuration et support premium |
| Self-hosted + support | Sur devis | Installation, configuration et support annuel |
| Partenaire | Sur devis | Revendeur local, facturation et support de premier niveau |

Les offres payantes Cloud sont en MGA et disponibles à Madagascar.

## Affirmations interdites sans vérification complémentaire

- « Disponible 24h/24, 7j/7 » : ne pas l’écrire sans engagement de support explicite.
- « Meilleur chatbot de Madagascar » ou « n°1 » : aucune preuve comparative.
- « Des centaines d’entreprises utilisent ONIR CMS » : aucune donnée publique vérifiée.
- « Données hébergées en Europe » pour le Cloud : lieu d’hébergement non vérifié dans ce lot.
- « 100 % gratuit » pour ONIR CMS Cloud : seul l’auto-hébergement est gratuit.
- « Création sans aucune compétence » : la création est assistée, mais l’installation et la
  personnalisation avancée peuvent nécessiter des compétences techniques.
- Témoignages, notes, avis, logos clients ou études de cas inventés.
- Statistiques de temps économisé, de conversion ou de rentabilité non mesurées.

## Formulations recommandées

- « ONIR CMS est open source sous licence MIT et peut être auto-hébergé. »
- « ONIR CMS Cloud est disponible à Madagascar, avec paiement Orange Money ou Mvola. »
- « Les offres Cloud sont activées après vérification du paiement. »
- « L’IA répond, collecte les informations utiles et prépare la reprise humaine. »
- « Les tarifs Cloud sont consultables sur la page Tarifs ; ils peuvent évoluer. »
- « Puzzle est un template officiel ONIR CMS, actuellement en version beta. »

## Point JSON-LD à corriger

Le `SoftwareApplication` de la home porte une offre à `0 EUR`. Cette information décrit
l’open source, pas ONIR CMS Cloud. Le JSON-LD doit distinguer les deux modèles ou renvoyer
vers une description non trompeuse.
