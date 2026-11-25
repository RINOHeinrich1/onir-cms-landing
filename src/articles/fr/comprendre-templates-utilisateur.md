---
title: "Les templates ONIR CMS expliqués simplement"
slug: "comprendre-templates-utilisateur"
translationKey: "comprendre-templates-utilisateur"
articleLocale: "fr"
author: "RINO Heinrich"
excerpt: "À quoi sert un template, ce que vous pouvez modifier sans développeur et comment repérer les réglages qui ont réellement un effet."
category: "Guide"
reading: "4 min"
publishedAt: "2026-11-25"
draft: false
cover: ""
accent: "blue"
layout: layouts/article.njk
pageKey: article
permalink: /articles/comprendre-templates-utilisateur/index.html
---
Un **template** est le modèle visuel de votre site. Il définit les pages, les zones, les composants et les réglages que vous pouvez modifier sans toucher au code.

Pensez à un template comme à un meuble déjà assemblé : vous pouvez changer les couleurs, les textes, les images ou l’ordre de certains éléments, mais vous ne reconstruisez pas les planches.

## Ce que vous pouvez modifier

Selon le template, vous pouvez généralement changer :

- les textes et les titres ;
- les images et leurs descriptions ;
- les couleurs et la typographie ;
- les pages et les menus ;
- les styles partagés ;
- certains composants : cartes, boutons, galeries, etc.

## Comprendre les zones

Dans l’aperçu, le **curseur d’inspection** permet de sélectionner une zone. Les réglages associés apparaissent alors dans le panneau de droite.

Une zone peut être :

- une page entière ;
- un en-tête ou un pied de page ;
- une carte ;
- un menu ;
- un bouton ;
- un composant de conversation.

Le panneau de droite ne montre que les réglages utiles à cette zone.

## Les identifiants sont techniques

Les identifiants servent à relier les éléments entre eux. Ils sont générés automatiquement et n’ont pas besoin d’être saisis à la main.

Vous devez surtout vous concentrer sur ce que vous voyez : un titre, une image, une couleur, une destination de menu.

## Tous les champs n’ont pas le même effet

Un template peut contenir plusieurs types de composants. Certains champs ne servent qu’à un type précis.

Exemple : un champ « image » n’a généralement aucun effet sur un composant de conversation. Si un champ est affiché, il doit avoir un effet visible sur la zone sélectionnée.

Lorsqu’un réglage ne produit aucun changement, c’est souvent qu’il n’est pas utilisé par ce composant.

## Bonnes pratiques

1. Sélectionnez d’abord la zone dans l’aperçu.
2. Modifiez un réglage à la fois.
3. Vérifiez immédiatement le résultat dans l’aperçu.
4. Utilisez les groupes du panneau de droite pour ne pas vous perdre.
5. Évitez de dupliquer un composant sans avoir vérifié son type.
6. Enregistrez régulièrement.

## Ce qu’il faut retenir

- Le template fournit le cadre.
- Les paramètres permettent de personnaliser ce cadre.
- L’aperçu montre le résultat réel.
- Les IDs sont automatiques.
- Un champ affiché doit avoir une utilité compréhensible pour la zone en cours.

Si un réglage semble sans effet, ne le modifiez pas au hasard : sélectionnez la bonne zone et vérifiez que ce champ appartient bien à ce composant.
