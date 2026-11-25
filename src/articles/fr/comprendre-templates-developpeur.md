---
title: "Comprendre les templates ONIR CMS côté développement"
slug: "comprendre-templates-developpeur"
translationKey: "comprendre-templates-developpeur"
articleLocale: "fr"
author: "RINO Heinrich"
excerpt: "Collections, groupes, références, structure, scopes et insertions : les grandes lignes du contrat des templates visuels."
category: "Développement"
reading: "7 min"
publishedAt: "2026-11-25"
draft: false
cover: ""
accent: "orange"
layout: layouts/article.njk
pageKey: article
permalink: /articles/comprendre-templates-developpeur/index.html
---
Un template ONIR CMS est un package autonome qui contient un rendu Web Component et un manifeste déclaratif : `onirtech.template.json`.

Le cœur ne connaît pas le métier du template. Il lit le manifeste, valide les paramètres et transmet les valeurs au rendu.

## Deux niveaux à distinguer

### 1. Les données : `params`
`params` décrit les données personnalisables :

- chaînes, nombres, booléens, couleurs ;
- objets ;
- tableaux d’objets appelés **collections**.

Les valeurs sont stockées dans ONIR CMS, pas dans le manifeste.

### 2. L’édition : `editor`
`editor` décrit comment le studio présente et sélectionne ces données :

- `collections` : métadonnées des listes (`itemKey`, `itemLabel`, `itemKind`) ;
- `dynamicRegions` : correspondance entre une zone DOM et un élément de collection ;
- `bindings` : paramètres autorisés pour une zone ;
- `groups` : sections visuelles du panneau de droite ;
- `fields` + `visibleWhen` : visibilité conditionnelle des champs ;
- `valueLabels` : libellés lisibles pour les valeurs techniques ;
- `references` : relations entre collections ;
- `structure` : hiérarchie de contenance ;
- `scopes` : portée globale, partagée, page ou locale ;
- `insertion` : types d’enfants autorisés et valeurs par défaut.

## Les concepts essentiels

### Collection
Une collection est une liste d’objets avec une identité stable.

```json
"blocks": [
  { "id": "hero_main", "kind": "hero", "title": "Bienvenue" }
]
```

L’identifiant est généré et ne doit pas être géré par l’utilisateur.

### Groupe
Un groupe ne stocke rien. Il organise les champs dans le sidebar.

```json
{
  "param": "global_theme",
  "id": "colors",
  "label": "Couleurs",
  "fields": ["primary", "secondary"]
}
```

### VisibleWhen
`visibleWhen` filtre les champs selon une valeur réelle.

```json
{
  "param": "blocks",
  "field": "image_url",
  "visibleWhen": { "field": "kind", "in": ["hero", "card", "image"] }
}
```

C’est la solution recommandée pour éviter les champs sans effet pour un composant donné.

### DynamicRegions
Une région dynamique relie une zone cliquable à un élément réel.

```json
{ "idPattern": "block:{id}", "collection": "blocks", "keyField": "id" }
```

Le résolveur vérifie ensuite que l’élément existe et que son identifiant est unique.

### References
Une référence relie deux collections.

```json
{ "from": "blocks", "field": "action_id", "to": "actions", "targetKey": "id" }
```

Le studio peut alors proposer un sélecteur au lieu d’un ID brut.

### Structure
`structure` décrit la contenance :

```json
{
  "roots": "pages",
  "children": {
    "collection": "blocks",
    "through": "placements",
    "parentKey": "parent_id",
    "childKey": "child_id"
  }
}
```

### Insertion
`insertion` déclare ce que l’on peut créer sous un parent donné :

```json
{
  "parentKind": "menu",
  "childCollection": "blocks",
  "allowedKinds": ["menu_item", "link", "button"],
  "slot": "content"
}
```

Sans cette déclaration, le cœur ne peut pas deviner les types autorisés.

## Règles d’architecture

- Aucune logique métier du template dans le cœur.
- Aucune convention implicite sur les noms de collections.
- Les identifiants sont stables et uniques.
- Les valeurs sont validées avant persistance.
- Une version publiée doit être incrémentée.
- Les cycles fonctionnels sont autorisés ; les cycles de contenance réels sont interdits.
- Le rendu lit les paramètres ; le manifeste guide l’éditeur.

## Versionner un template

Un dépôt de template doit contenir au minimum :

- `onirtech.template.json` ;
- le bundle UI (par exemple `index.js`) ;
- un aperçu ;
- un README de développement ;
- la version et le SHA de l’archive publiée.

Toute modification du manifeste ou du rendu doit incrémenter la version et produire une nouvelle archive installable.

## Ce qu’il faut retenir

Le manifeste n’est pas du code exécuté. C’est un contrat déclaratif :

- `params` = données ;
- `editor` = édition ;
- `structure` = contenance ;
- `references` = liens ;
- `insertion` = création ;
- `groups` = présentation.

Le cœur reste générique ; le template déclare son vocabulaire et ses règles.
