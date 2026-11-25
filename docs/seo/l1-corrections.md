# Corrections L1 — SEO et accessibilité

Date : 2026-11-25.  
Environnement : build préprod local. Aucune modification de production.

## Corrections appliquées

### H1 et sémantique
- Participer FR, EN et MG : le second H1 est devenu un H2.
- Le H1 de la home est maintenant :

```text
Créez votre assistant IA en toute maîtrise
```

- Le titre de l’article de réception client a été raccourci.

### JSON-LD
La home distingue maintenant deux objets :

- `SoftwareApplication` pour ONIR CMS open source, avec licence MIT ;
- `Service` pour ONIR CMS Cloud, avec `areaServed: Madagascar`.

Cela évite de présenter toute l’offre comme gratuite.

### Métadonnées
Titles retravaillés :

- home FR / EN / MG ;
- fonctionnalités FR / EN / MG ;
- tarifs FR / EN / MG ;
- thèmes FR / EN / MG ;
- index articles FR / EN / MG ;
- article de réception client.

Les descriptions des pages thèmes ont été raccourcies.

### Accessibilité
- Contrastes corrigés pour les CTA de démonstration et les kickers d’articles.
- Couleur de texte secondaire légèrement assombrie sur le thème clair.
- Cibles tactiles des paginations portées à 24 px.
- Libellé accessible du sélecteur de langue aligné sur son texte visible.
- Bouton vidéo : libellé accessible incluant le texte visible.
- Liste des fournisseurs : `role="listitem"` ajouté aux enfants.

### Styles
- `--accent-text` ajouté pour les textes orange sur fond clair.
- Pagination des carrousels : zone cliquable de 24 px, pastille visuelle conservée.

## Vérifications après correction

| Contrôle | Résultat |
| --- | ---: |
| URL testées | 58 |
| Réponses 200 | 58 |
| H1 manquants ou multiples | 0 |
| Titles manquants | 0 |
| Descriptions manquantes | 0 |
| Canonical incohérent | 0 |
| Titles dupliqués | 0 |
| Descriptions dupliquées | 0 |
| JSON-LD invalide | 0 |
| Liens internes cassés | 0 |
| Accessibilité Lighthouse home mobile | 100 |
| Bonnes pratiques Lighthouse home mobile | 100 |
| SEO Lighthouse home mobile | 100 |

## Point restant : LCP mobile

Le `NO_LCP` de la home persiste sur le build local, même après :
- retrait temporaire de la modale vidéo ;
- désactivation des animations et transitions ;
- contrôle desktop à 99.

Le problème n’est donc pas causé par la modale ni par les animations. Il doit être reproduit :
- sur la préprod avec authentification ;
- avec un navigateur réel ;
- avec un profil mobile.

Le reste de L1 peut avancer, mais le LCP mobile reste un point ouvert.

## Corrections non incluses dans ce lot

- Redirection `www` → apex : à faire au niveau Nginx, avant production.
- Politique de cache des assets : à vérifier dans Nginx.
- Modèle de page SEO pour les futurs guides, solutions et outils : à traiter dans L1b.
- Optimisation des titles secondaires Participer et mentions légales : non bloquant.
