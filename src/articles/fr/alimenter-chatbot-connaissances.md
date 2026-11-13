---
title: "Alimentez votre chatbot en connaissances"
slug: "alimenter-chatbot-connaissances"
translationKey: "alimenter-chatbot-connaissances"
articleLocale: "fr"
excerpt: "Ajoutez une information métier à un chatbot, choisissez sa portée et vérifiez qu’elle est bien active."
category: "Tutoriel"
reading: "4 min"
publishedAt: "2026-11-13"
draft: false
accent: "orange"
layout: layouts/article.njk
pageKey: article
permalink: /articles/alimenter-chatbot-connaissances/index.html
---
Un chatbot devient réellement utile lorsqu’il dispose d’informations fiables sur votre activité. ONIR-CMS permet d’ajouter ces informations sous forme de connaissances, puis de choisir les chatbots qui peuvent les utiliser.

Dans ce tutoriel, nous ajoutons une connaissance sur les services et horaires d’une entreprise, puis nous la rattachons à un chatbot de réception client.

## Étape 1 — Ouvrir les connaissances

Depuis **Connaissances**, cliquez sur **Nouvelle entrée**. La page liste toutes les informations internes disponibles pour l’organisation.

![Liste des connaissances ONIR-CMS avec le bouton Nouvelle entrée](/assets/articles/knowledge-step-1.png)

## Étape 2 — Créer une nouvelle connaissance

Le formulaire demande un **titre** et un **contenu**. Le titre est important : c’est la référence exacte que l’IA utilisera pour retrouver l’information.

![Formulaire vide de création d’une connaissance](/assets/articles/knowledge-step-2.png)

## Étape 3 — Rédiger une information claire

Pour cet exemple, nous ajoutons les horaires et les services proposés :

> L’entreprise est ouverte du lundi au vendredi, de 8h à 17h. Elle propose un accompagnement client, des prestations de conseil et un service de suivi. Les demandes reçues en dehors des horaires sont traitées le jour ouvré suivant.

![Titre et contenu renseignés dans le formulaire](/assets/articles/knowledge-step-3.png)

## Étape 4 — Choisir la portée

Deux possibilités :

- **Global** : la connaissance est disponible pour tous les chatbots de l’organisation ;
- **Chatbots de la portée** : vous sélectionnez un ou plusieurs chatbots précis.

Ici, nous choisissons **Assistant Réception** et laissons la connaissance **Active**.

![Sélection du chatbot Assistant Réception dans la portée](/assets/articles/knowledge-step-4.png)

## Étape 5 — Enregistrer et vérifier

Après **Enregistrer**, la connaissance apparaît dans la liste avec :

- le badge **ACTIVE** ;
- le chatbot associé ;
- le contenu ;
- le créateur.

![Connaissance enregistrée et associée au chatbot](/assets/articles/knowledge-step-5.png)

## Bonnes pratiques

- Utilisez un **titre explicite** et stable.
- Écrivez des informations courtes et factuelles.
- Évitez de mélanger plusieurs sujets dans une même entrée.
- Rattachez la connaissance au bon chatbot lorsque l’information est spécifique.
- Vérifiez toujours le badge **ACTIVE** et la portée après l’enregistrement.

## Étape 6 — Tester dans le chatbot

Ouvrez le chatbot et posez une question correspondant à la connaissance ajoutée. Ici, le visiteur demande simplement :

> Quels sont vos horaires d’ouverture ?

Le chatbot répond avec les horaires enregistrés et rappelle le traitement des demandes hors horaires. La connaissance est donc bien prise en compte.

![Le chatbot répond avec la connaissance ajoutée](/assets/articles/knowledge-step-6.png)

Le chatbot peut maintenant s’appuyer sur cette connaissance pour répondre aux questions correspondantes.
