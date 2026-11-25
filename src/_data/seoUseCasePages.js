import allLocales from "./allLocales.js";

const fr = allLocales.find((locale) => locale.code === "fr");

const hub = {
  kind: "useCaseHub",
  locale: fr,
  route: "/cas-usage/",
  alternates: [],
  data: {
    meta: {
      title: "Cas d’usage chatbot et automatisation — ONIR CMS",
      description:
        "Découvrez des cas d’usage concrets d’ONIR CMS : réception client, webhooks, recherche dans les fiches et qualification des demandes.",
      ogTitle: "Cas d’usage — ONIR CMS",
      ogDescription:
        "Des usages concrets pour relier conversations, fiches structurées et actions métier.",
      ogImage: "/assets/og/onir-cms-1200x630.png",
    },
    hero: {
      kicker: "Cas d’usage",
      title: "Des usages concrets, pas des démonstrations abstraites",
      lead:
        "ONIR CMS ne se limite pas à répondre à des questions. Les conversations peuvent produire des fiches structurées, déclencher des webhooks et alimenter une recherche utile pour l’organisation.",
      primaryLabel: "Voir les fonctionnalités",
      primaryHref: "/fonctionnalites/",
      secondaryLabel: "Parler d’un projet",
      secondaryHref: "/#contact",
    },
    intro: {
      title: "Un assistant, des fiches, des actions",
      paragraphs: [
        "Un cas d’usage n’est pas une liste de fonctionnalités. C’est un parcours qui part d’un besoin réel et se termine par un résultat observable : une demande qualifiée, une fiche créée, une action déclenchée ou une information retrouvée.",
        "Les pages ci-dessous décrivent des parcours distincts. La réception client montre l’accueil et la qualification. Les webhooks montrent comment une fiche peut déclencher une action. La recherche montre comment interroger des fiches existantes. La collecte montre comment structurer une demande.",
      ],
    },
    cards: [
      {
        label: "Réception client",
        href: "/cas-usage/reception-client/",
        description: "Accueillir, répondre, qualifier et préparer la reprise humaine.",
      },
      {
        label: "Webhooks et événements",
        href: "/cas-usage/webhooks-evenements/",
        description: "Déclencher une action métier lorsqu’une fiche atteint un état précis.",
      },
      {
        label: "Recherche dans les fiches",
        href: "/cas-usage/recherche-fiches/",
        description: "Retrouver une information dans des données structurées.",
      },
      {
        label: "Collecte et qualification",
        href: "/cas-usage/collecte-qualification/",
        description: "Transformer une conversation en fiche exploitable.",
      },
    ],
    sections: [
      {
        kicker: "Pourquoi ces pages",
        title: "Chaque cas d’usage répond à une question différente",
        paragraphs: [
          "Une organisation qui cherche à automatiser une action ne cherche pas la même chose qu’une organisation qui veut qualifier des prospects ou interroger ses dossiers. Séparer les cas d’usage permet de choisir le bon point de départ.",
          "Ces pages ne remplacent pas le cadrage. Elles montrent ce qui est possible, les conditions à respecter et les preuves disponibles dans ONIR CMS.",
        ],
      },
    ],
    related: [
      {
        label: "Fonctionnalités",
        href: "/fonctionnalites/",
        description: "Les capacités du produit.",
      },
      {
        label: "Chatbot à Madagascar",
        href: "/chatbot-madagascar/",
        description: "Le point d’entrée produit.",
      },
      {
        label: "Expertise IA",
        href: "/expertise-ia-madagascar/",
        description: "Cadrer et déployer un parcours.",
      },
      {
        label: "Webhooks : le tutoriel",
        href: "/articles/webhooks-automatiser-fiches/",
        description: "Le détail technique du déclenchement.",
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Quels cas d’usage sont disponibles dans ONIR CMS ?",
          a: "Les parcours publiés couvrent la réception client, les webhooks sur événements de fiche, la recherche dans les fiches et la collecte de qualification.",
        },
        {
          q: "Peut-on combiner plusieurs cas d’usage ?",
          a: "Oui. Un même parcours peut collecter une fiche, déclencher un webhook et rendre l’information recherchable, selon la configuration.",
        },
      ],
    },
    cta: {
      kicker: "Choisir un parcours",
      title: "Partez du résultat attendu, pas de la fonctionnalité.",
      lead:
        "Qualifier une demande, déclencher une action ou retrouver une information : le bon cas d’usage dépend du problème à résoudre.",
      primaryLabel: "Parler de votre projet",
      primaryHref: "/#contact",
      secondaryLabel: "Voir les fonctionnalités",
      secondaryHref: "/fonctionnalites/",
    },
  },
};

const webhooks = {
  kind: "useCase",
  locale: fr,
  route: "/cas-usage/webhooks-evenements/",
  alternates: [],
  data: {
    meta: {
      title: "Webhooks et automatisation — ONIR CMS",
      description:
        "Déclenchez une action métier depuis une fiche ONIR CMS : événement, conditions, mapping des champs, retries et journal des livraisons.",
      ogTitle: "Webhooks et automatisation — ONIR CMS",
      ogDescription:
        "Une fiche atteint un état, un webhook déclenche l’action contrôlée.",
      ogImage: "/assets/og/onir-cms-1200x630.png",
    },
    hero: {
      kicker: "Webhooks et événements",
      title: "Déclencher une action métier depuis une fiche",
      lead:
        "Un webhook relie une fiche structurée à un outil externe. Lorsqu’un champ est rempli ou qu’un état est atteint, ONIR CMS peut envoyer un payload contrôlé, avec authentification, journal et nouvelle tentative en cas d’échec.",
      primaryLabel: "Lire le tutoriel webhook",
      primaryHref: "/articles/webhooks-automatiser-fiches/",
      secondaryLabel: "Voir les fonctionnalités",
      secondaryHref: "/fonctionnalites/",
    },
    intro: {
      title: "Une fiche n’est pas une fin en soi",
      paragraphs: [
        "Une fiche de collecte contient des informations structurées : un besoin, un contact, un statut, des champs métier. Ces informations peuvent rester dans ONIR CMS, mais elles peuvent aussi déclencher la suite du processus.",
        "Le webhook est le pont entre la conversation et l’action. Il ne s’exécute pas au hasard : il est lié à un événement de fiche, à un périmètre et à un mapping de champs défini par l’organisation.",
      ],
    },
    sections: [
      {
        kicker: "Déclencheurs",
        title: "Les événements de fiche",
        paragraphs: [
          "ONIR CMS peut déclencher un webhook à différents moments du remplissage d’une fiche. Le choix de l’événement change le moment où l’action part et les champs disponibles dans le payload.",
        ],
        bullets: [
          "Un champ précis est rempli.",
          "Un groupe de champs est rempli.",
          "Tous les champs obligatoires sont remplis.",
          "Tous les champs de la fiche sont remplis.",
        ],
        note:
          "Le déclenchement n’est pas un accès libre de l’IA à un outil externe. L’événement, le périmètre et les champs envoyés sont définis par l’utilisateur.",
      },
      {
        kicker: "Exemples",
        title: "Des actions concrètes",
        paragraphs: [
          "Le webhook devient utile lorsqu’il relie une demande à un système qui doit agir. Le scénario dépend du métier, mais le principe reste le même : une information structurée déclenche une action contrôlée.",
        ],
        bullets: [
          "Une demande de devis crée un événement dans l’agenda.",
          "Un incident ouvre un ticket d’intervention.",
          "Une candidature crée un dossier RH.",
          "Une commande réserve du stock.",
          "Une visite prépare un badge d’accès.",
        ],
      },
      {
        kicker: "Contrôle",
        title: "Ce que le webhook garde traçable",
        paragraphs: [
          "Un webhook opérationnel doit pouvoir être diagnostiqué. ONIR CMS conserve les livraisons, les tentatives, les réponses et les erreurs. Un endpoint peut être testé avant d’être utilisé en production.",
          "Cette traçabilité évite les automatisations invisibles. On peut savoir quelle fiche a déclenché quelle livraison, avec quel payload et quel résultat.",
        ],
        bullets: [
          "Endpoint nommé et activable.",
          "Mapping des champs de la fiche.",
          "Authentification configurable.",
          "Nouvelles tentatives en cas d’échec.",
          "Journal des livraisons et test manuel.",
        ],
      },
      {
        kicker: "Périmètre",
        title: "Toutes les fiches ou une fiche précise",
        paragraphs: [
          "Un webhook peut être limité à une fiche de collecte précise ou couvrir les fiches d’un chatbot. Ce périmètre évite d’envoyer des données au mauvais service.",
          "La configuration doit rester lisible : un webhook trop large est difficile à maintenir et augmente le risque d’envoyer une information inutile.",
        ],
      },
    ],
    related: [
      {
        label: "Tutoriel webhook",
        href: "/articles/webhooks-automatiser-fiches/",
        description: "Périmètre, événement, payload, authentification et tests.",
      },
      {
        label: "Collecte et qualification",
        href: "/cas-usage/collecte-qualification/",
        description: "La fiche qui alimente le webhook.",
      },
      {
        label: "Recherche dans les fiches",
        href: "/cas-usage/recherche-fiches/",
        description: "Exploiter les fiches autrement.",
      },
      {
        label: "Fonctionnalités",
        href: "/fonctionnalites/",
        description: "Webhooks, API et fiches de prospection.",
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Qu’est-ce qu’un webhook dans ONIR CMS ?",
          a: "C’est un appel vers un service externe, déclenché par un événement de fiche et configuré avec un URL, des champs, une authentification et un journal de livraison.",
        },
        {
          q: "Quand le webhook se déclenche-t-il ?",
          a: "Selon la configuration : lorsqu’un champ est rempli, qu’un groupe de champs est rempli, que les champs obligatoires sont remplis ou que tous les champs sont remplis.",
        },
        {
          q: "Peut-on tester un webhook avant la production ?",
          a: "Oui. ONIR CMS permet de tester un endpoint et de consulter le journal des livraisons.",
        },
        {
          q: "Le webhook peut-il envoyer toutes les fiches ?",
          a: "Le périmètre peut cibler une fiche précise ou les fiches d’un chatbot. Il doit être choisi avec soin.",
        },
      ],
    },
    cta: {
      kicker: "Automatiser sans perdre le contrôle",
      title: "Reliez une fiche à l’action qui doit suivre.",
      lead:
        "Décrivez l’événement, les données à transmettre et le service qui doit agir. Le webhook doit rester explicite, testable et traçable.",
      primaryLabel: "Lire le tutoriel",
      primaryHref: "/articles/webhooks-automatiser-fiches/",
      secondaryLabel: "Parler de votre projet",
      secondaryHref: "/#contact",
    },
  },
};

const search = {
  kind: "useCase",
  locale: fr,
  route: "/cas-usage/recherche-fiches/",
  alternates: [],
  data: {
    meta: {
      title: "Recherche intelligente dans les fiches — ONIR CMS",
      description:
        "Un assistant IA peut rechercher dans des fiches structurées : besoins, prospects, incidents ou dossiers. Une recherche intelligente, dans un périmètre contrôlé.",
      ogTitle: "Recherche intelligente dans les fiches — ONIR CMS",
      ogDescription:
        "Interroger des données structurées avec un assistant IA, dans un périmètre contrôlé.",
      ogImage: "/assets/og/onir-cms-1200x630.png",
    },
    hero: {
      kicker: "Recherche dans les fiches",
      title: "Rechercher dans vos fiches avec un assistant IA",
      lead:
        "Les fiches ONIR CMS contiennent des données structurées. Un assistant peut les interroger pour retrouver une demande, un prospect, un incident ou un dossier, dans un périmètre défini. C’est ce que nous appelons une recherche intelligente sur les fiches.",
      primaryLabel: "Voir la collecte",
      primaryHref: "/cas-usage/collecte-qualification/",
      secondaryLabel: "Voir les fonctionnalités",
      secondaryHref: "/fonctionnalites/",
    },
    intro: {
      title: "Répondre à partir de données réelles",
      paragraphs: [
        "Un assistant qui répond uniquement à partir d’un texte généraliste ne connaît pas vos dossiers. Un assistant qui peut rechercher dans des fiches structurées peut retrouver une information réelle : un besoin exprimé, une ville, un statut, un contact ou une date.",
        "ONIR CMS dispose d’un outil de recherche de fiches avec un périmètre organisation et chatbot, une planification de recherche et une validation. L’objectif n’est pas de laisser l’IA parcourir tout le système, mais de l’autoriser à chercher dans le bon périmètre.",
      ],
    },
    sections: [
      {
        kicker: "Le principe",
        title: "Une recherche outillée, pas une réponse inventée",
        paragraphs: [
          "La recherche ne consiste pas à demander à un modèle de deviner une réponse. Elle transforme une question en recherche structurée, l’exécute dans les fiches autorisées et utilise les résultats pour répondre.",
          "Cette approche permet de citer une fiche, de filtrer par champ et de vérifier ce qui existe réellement. Elle dépend toutefois de la qualité des données collectées : une fiche incomplète produit une recherche moins utile.",
        ],
      },
      {
        kicker: "Usages",
        title: "Retrouver une demande, un prospect ou un incident",
        paragraphs: [
          "La recherche dans les fiches est utile lorsqu’une organisation accumule des demandes et perd du temps à les retrouver. Elle peut servir au support, aux opérations, aux ventes ou à la gestion de dossiers.",
        ],
        bullets: [
          "Retrouver les demandes d’une ville ou d’un secteur.",
          "Retrouver les prospects avec un besoin précis.",
          "Retrouver les incidents d’un statut.",
          "Retrouver une fiche à partir d’un contact ou d’une date.",
          "Préparer une réponse à partir de plusieurs fiches.",
        ],
      },
      {
        kicker: "Conditions",
        title: "Ce qu’il faut pour que la recherche fonctionne",
        paragraphs: [
          "La recherche dépend du périmètre, des champs et des droits. Il faut définir quelles fiches sont interrogeables, quels champs sont utiles et qui peut voir les résultats.",
          "Il faut aussi accepter une limite : l’IA ne doit pas répondre si la donnée n’existe pas. Une recherche qui ne trouve rien doit pouvoir le dire clairement.",
        ],
        bullets: [
          "Des champs structurés et cohérents.",
          "Un périmètre organisation et chatbot explicite.",
          "Des droits d’accès adaptés.",
          "Un message clair lorsque la recherche ne trouve rien.",
          "Un moyen de vérifier la fiche source.",
        ],
      },
      {
        kicker: "Différence",
        title: "Ne pas confondre recherche et génération",
        paragraphs: [
          "La génération produit un texte. La recherche retrouve une information. Les deux peuvent se combiner, mais la recherche doit rester vérifiable.",
          "C’est cette distinction qui rend le cas d’usage crédible : l’assistant ne prétend pas connaître vos dossiers, il cherche dans les fiches auxquelles il a accès.",
        ],
      },
    ],
    related: [
      {
        label: "Collecte et qualification",
        href: "/cas-usage/collecte-qualification/",
        description: "La qualité de la fiche conditionne la recherche.",
      },
      {
        label: "Webhooks",
        href: "/cas-usage/webhooks-evenements/",
        description: "Déclencher une action à partir d’une fiche.",
      },
      {
        label: "Fonctionnalités",
        href: "/fonctionnalites/",
        description: "Recherche de fiches et gestion des données.",
      },
      {
        label: "Réception client",
        href: "/cas-usage/reception-client/",
        description: "Le parcours de collecte initial.",
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "L’assistant peut-il chercher dans toutes les fiches ?",
          a: "Non. La recherche doit être limitée à un périmètre défini, avec des droits et des fiches autorisées.",
        },
        {
          q: "La recherche utilise-t-elle les fiches existantes ?",
          a: "Oui. L’outil de recherche de fiches interroge des données structurées existantes dans le périmètre configuré.",
        },
        {
          q: "Que se passe-t-il si aucune fiche ne correspond ?",
          a: "L’assistant doit l’indiquer clairement au lieu d’inventer une réponse.",
        },
        {
          q: "Faut-il des fiches bien remplies ?",
          a: "Oui. La qualité des champs et la cohérence des données influencent directement la pertinence de la recherche.",
        },
      ],
    },
    cta: {
      kicker: "Exploiter les fiches",
      title: "Une recherche utile commence par une collecte propre.",
      lead:
        "Définissez les informations à collecter, le périmètre de recherche et les droits avant de connecter l’assistant aux fiches.",
      primaryLabel: "Voir la collecte",
      primaryHref: "/cas-usage/collecte-qualification/",
      secondaryLabel: "Parler de votre projet",
      secondaryHref: "/#contact",
    },
  },
};

const collecte = {
  kind: "useCase",
  locale: fr,
  route: "/cas-usage/collecte-qualification/",
  alternates: [],
  data: {
    meta: {
      title: "Collecte et qualification des demandes — ONIR CMS",
      description:
        "Transformez une conversation en fiche structurée : champs typés, statut, qualification, reprise humaine et déclenchement d’actions.",
      ogTitle: "Collecte et qualification — ONIR CMS",
      ogDescription:
        "Une conversation devient une fiche exploitable, avec les champs et le statut utiles.",
      ogImage: "/assets/og/onir-cms-1200x630.png",
    },
    hero: {
      kicker: "Collecte et qualification",
      title: "Transformer une conversation en fiche exploitable",
      lead:
        "Un assistant peut poser les bonnes questions, remplir une fiche structurée, qualifier une demande et préparer la suite. La valeur ne se trouve pas dans le message final, mais dans les données réellement utilisables.",
      primaryLabel: "Voir la réception client",
      primaryHref: "/cas-usage/reception-client/",
      secondaryLabel: "Voir les webhooks",
      secondaryHref: "/cas-usage/webhooks-evenements/",
    },
    intro: {
      title: "Une conversation qui produit autre chose qu’un transcript",
      paragraphs: [
        "Une conversation peut être agréable et ne produire aucune information exploitable. La collecte structurée corrige cela : chaque question a un objectif, chaque champ a un type et chaque fiche peut être relue par une personne.",
        "ONIR CMS permet de définir des fiches de collecte, des champs typés et des statuts. La fiche devient le point de passage entre l’échange, la qualification et l’action.",
      ],
    },
    sections: [
      {
        kicker: "Structure",
        title: "Des champs, pas un bloc de texte",
        paragraphs: [
          "Une fiche structurée permet de filtrer, de rechercher et de déclencher une action. Un simple paragraphe de résumé ne le permet pas.",
          "La conception de la fiche doit rester proportionnée au besoin. Trois champs utiles valent mieux qu’un formulaire de vingt questions que personne ne relit.",
        ],
        bullets: [
          "Champs typés et libellés clairs.",
          "Informations obligatoires identifiées.",
          "Statuts de qualification.",
          "Fiche consultable par l’organisation.",
          "Export et reprise humaine.",
        ],
      },
      {
        kicker: "Qualification",
        title: "Séparer la demande du bruit",
        paragraphs: [
          "Toutes les conversations n’ont pas la même valeur. La qualification permet de distinguer une demande sérieuse, une question d’information, un incident ou un prospect à rappeler.",
          "Cette étape peut rester humaine. L’assistant prépare la fiche et le statut ; l’organisation décide ensuite de la suite.",
        ],
      },
      {
        kicker: "Suite",
        title: "Relier la fiche à l’action",
        paragraphs: [
          "Une fiche qualifiée peut déclencher un webhook : créer un événement, ouvrir un ticket, préparer un dossier ou réserver une ressource. La collecte devient le début d’un processus, pas une fin.",
          "Cette combinaison est la différence entre un chatbot qui collecte des coordonnées et un système qui structure une demande puis agit.",
        ],
      },
      {
        kicker: "Limites",
        title: "Ce que la collecte ne garantit pas",
        paragraphs: [
          "Une fiche n’est pas une vérité automatique. L’assistant peut mal comprendre, un visiteur peut donner une information incomplète ou un champ peut être mal configuré.",
          "La validation humaine, les statuts et les tests restent nécessaires. La collecte doit être conçue comme un processus révisable, pas comme une automatisation aveugle.",
        ],
      },
    ],
    related: [
      {
        label: "Réception client",
        href: "/cas-usage/reception-client/",
        description: "Le parcours complet de collecte.",
      },
      {
        label: "Recherche dans les fiches",
        href: "/cas-usage/recherche-fiches/",
        description: "Exploiter les données collectées.",
      },
      {
        label: "Webhooks",
        href: "/cas-usage/webhooks-evenements/",
        description: "Déclencher une action après qualification.",
      },
      {
        label: "Fonctionnalités",
        href: "/fonctionnalites/",
        description: "Fiches de prospection et collecte.",
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Qu’est-ce qu’une fiche de collecte ?",
          a: "C’est une fiche structurée qui rassemble les informations utiles d’une conversation : besoin, contact, statut et champs métier.",
        },
        {
          q: "Peut-on qualifier automatiquement une demande ?",
          a: "L’assistant peut préparer la fiche et proposer un statut, mais la validation humaine reste possible et recommandée selon le contexte.",
        },
        {
          q: "Peut-on déclencher une action après la collecte ?",
          a: "Oui. Une fiche peut déclencher un webhook lorsqu’un champ ou un ensemble de champs est rempli.",
        },
        {
          q: "Que faire si la fiche est incomplète ?",
          a: "La conversation peut continuer ou la fiche peut être revue par une personne avant utilisation.",
        },
      ],
    },
    cta: {
      kicker: "Structurer la demande",
      title: "Une fiche utile vaut mieux qu’une conversation longue.",
      lead:
        "Définissez les informations qui servent réellement à qualifier et à agir, puis reliez la fiche à la suite du processus.",
      primaryLabel: "Voir la réception client",
      primaryHref: "/cas-usage/reception-client/",
      secondaryLabel: "Parler de votre projet",
      secondaryHref: "/#contact",
    },
  },
};

export default [hub, webhooks, search, collecte];
