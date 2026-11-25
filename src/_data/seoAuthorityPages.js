import allLocales from "./allLocales.js";

const fr = allLocales.find((locale) => locale.code === "fr");

const initiative = {
  kind: "initiative",
  locale: fr,
  route: "/initiative-ia-madagascar/",
  alternates: [],
  data: {
    meta: {
      title: "Initiative IA à Madagascar — ONIR CMS",
      description:
        "ONIR CMS est une initiative IA malagasy ouverte : un produit réel, open source et documenté, construit depuis Madagascar.",
      ogTitle: "Initiative IA à Madagascar — ONIR CMS",
      ogDescription:
        "Une initiative malagasy qui construit un produit IA open source, avec des preuves techniques et une ambition internationale.",
      ogImage: "/assets/og/onir-cms-1200x630.png",
    },
    hero: {
      kicker: "Initiative IA",
      title: "Construire l’IA à Madagascar, pas seulement l’utiliser",
      lead:
        "ONIR CMS est une initiative malagasy qui construit un produit IA complet : plateforme de chatbots, éditeur visuel, templates, documentation et offre Cloud locale. L’objectif n’est pas de paraître innovant, mais de rendre la chose vérifiable.",
      primaryLabel: "Découvrir ONIR CMS",
      primaryHref: "/chatbot-madagascar/",
      secondaryLabel: "Voir le code source",
      secondaryHref: "https://github.com/RINOHeinrich1/onir-cms",
    },
    intro: {
      title: "Une initiative, pas une démonstration",
      paragraphs: [
        "Madagascar forme des développeurs, des techniciens et des créateurs. Le pays peut produire autre chose que des logiciels de gestion : des produits, des interfaces, des infrastructures et des outils d’IA. La différence ne se joue pas seulement sur le talent. Elle se joue sur la capacité à construire un produit visible, documenté, distribué et maintenu.",
        "ONIR CMS a été conçu comme une réponse concrète à ce décalage. C’est un logiciel open source sous licence MIT, avec une offre Cloud disponible à Madagascar. Il ne s’agit pas d’un prototype de vitrine : le produit comprend un éditeur, des assistants IA, des templates, des conversations, des fiches de collecte et une documentation technique.",
      ],
    },
    sections: [
      {
        kicker: "Le constat",
        title: "Le talent existe. La visibilité manque.",
        paragraphs: [
          "On résume souvent la technologie malagasy à la gestion, à l’externalisation ou à des projets invisibles. Ce résumé est injuste, mais il pointe un problème réel : les produits techniques ambitieux restent peu documentés, peu distribués et peu reliés à une histoire publique.",
          "Une initiative IA crédible doit donc montrer trois choses : ce qu’elle construit, comment elle le construit et ce que d’autres peuvent vérifier. C’est cette logique qui guide ONIR CMS.",
        ],
      },
      {
        kicker: "Le produit",
        title: "Un produit IA complet, pas un simple formulaire",
        paragraphs: [
          "ONIR CMS permet de créer des assistants IA, de gérer les conversations, de préparer la reprise humaine, de collecter des informations structurées et de personnaliser l’expérience avec des templates.",
          "Le produit est open source et peut être auto-hébergé. ONIR CMS Cloud ajoute une offre hébergée pour les organisations qui veulent utiliser le produit sans administrer l’infrastructure. Les deux modèles sont distincts et complémentaires.",
        ],
        bullets: [
          "Assistants IA personnalisés.",
          "Éditeur visuel et templates.",
          "Suivi des conversations.",
          "Reprise humaine.",
          "Fiches de prospection et collecte structurée.",
          "API, widget et webhooks.",
          "Cloud local avec tarifs en ariary.",
        ],
      },
      {
        kicker: "Pour Madagascar",
        title: "Pourquoi cette initiative compte localement",
        paragraphs: [
          "Un produit IA construit à Madagascar crée autre chose qu’un revenu : il crée des compétences sur un produit complet, des références techniques, des modèles d’interface et une capacité à discuter d’égal à égal avec des partenaires internationaux.",
          "Il rend aussi l’IA plus concrète pour les organisations locales. Une PME n’a pas besoin d’un discours abstrait sur l’intelligence artificielle : elle a besoin d’un assistant qui répond, qui collecte une demande et qui sait quand passer la main.",
        ],
      },
      {
        kicker: "Les preuves",
        title: "Ce que l’on peut vérifier",
        paragraphs: [
          "Une ambition sans preuve reste un slogan. ONIR CMS peut être examiné à travers son dépôt, sa licence, ses releases, sa documentation, ses démonstrations et ses templates.",
          "Les preuves ne sont pas toutes des chiffres. Une architecture documentée, un code public, une démonstration fonctionnelle et un template utilisable sont déjà des signaux forts. Ils montrent une capacité d’exécution, pas seulement une intention.",
        ],
        bullets: [
          "Dépôt GitHub public et licence MIT.",
          "Releases et journal des changements.",
          "Documentation et décisions d’architecture.",
          "Démonstrations de chatbots.",
          "Templates visuels publiés.",
          "Offre Cloud avec paiement local.",
          "Articles et guides techniques.",
        ],
      },
      {
        kicker: "Ouverture",
        title: "Une initiative ouverte",
        paragraphs: [
          "L’open source n’est pas un argument décoratif. Il permet à d’autres développeurs de lire le code, de le tester, de signaler un problème, de proposer un template ou d’adapter le produit à un usage différent.",
          "Cette ouverture donne aussi une responsabilité : documenter, expliquer les limites et rendre les contributions compréhensibles. Une initiative crédible n’est pas une communauté imaginaire ; c’est un espace où l’on peut réellement entrer.",
        ],
      },
      {
        kicker: "Ambition",
        title: "Construire depuis Madagascar, pas malgré Madagascar",
        paragraphs: [
          "ONIR CMS ne se présente pas comme une exception locale. Il se présente comme un produit qui peut être utilisé à Madagascar et au-delà. Le Cloud est d’abord disponible localement, avec des moyens de paiement adaptés ; le logiciel open source peut être déployé ailleurs.",
          "L’ambition est de montrer qu’une initiative malagasy peut traiter des sujets d’IA, d’open source, de design d’interface et de distribution produit avec le même niveau d’exigence qu’un projet international.",
        ],
      },
    ],
    related: [
      {
        label: "ONIR CMS open source",
        href: "/open-source-madagascar/",
        description: "Le dépôt, la licence MIT et la contribution.",
      },
      {
        label: "Expertise IA",
        href: "/expertise-ia-madagascar/",
        description: "Concevoir et déployer des assistants IA depuis Madagascar.",
      },
      {
        label: "Chatbot à Madagascar",
        href: "/chatbot-madagascar/",
        description: "Comprendre l’usage produit et les cas concrets.",
      },
      {
        label: "Fonctionnalités",
        href: "/fonctionnalites/",
        description: "Les capacités réelles de la plateforme.",
      },
      {
        label: "Thèmes et templates",
        href: "/themes/",
        description: "Les expériences visuelles publiées.",
      },
      {
        label: "Code source",
        href: "https://github.com/RINOHeinrich1/onir-cms",
        description: "Lire, tester et contribuer.",
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Qu’est-ce que l’initiative ONIR CMS ?",
          a: "ONIR CMS est un logiciel open source sous licence MIT pour créer des chatbots et des assistants IA, avec une offre Cloud disponible à Madagascar. L’initiative consiste à construire et documenter un produit IA depuis Madagascar.",
        },
        {
          q: "ONIR CMS est-il un projet malagasy ?",
          a: "ONIR CMS est développé par ONIRTECH, une initiative malagasy. Le logiciel est open source et le Cloud est proposé localement.",
        },
        {
          q: "Peut-on vérifier les affirmations techniques ?",
          a: "Oui. Le dépôt GitHub, la licence, les releases, la documentation, les démonstrations et les templates sont accessibles publiquement.",
        },
        {
          q: "Le projet est-il réservé à Madagascar ?",
          a: "Non. Le Cloud est proposé à Madagascar aujourd’hui, mais le logiciel open source peut être installé et utilisé ailleurs.",
        },
      ],
    },
    cta: {
      kicker: "Prendre part",
      title: "Découvrir le produit, lire le code, ou tester un usage.",
      lead:
        "Une initiative se juge à ce qu’elle produit et à ce que d’autres peuvent en faire. Commencez par une démonstration ou par le dépôt open source.",
      primaryLabel: "Découvrir ONIR CMS",
      primaryHref: "/chatbot-madagascar/",
      secondaryLabel: "Voir GitHub",
      secondaryHref: "https://github.com/RINOHeinrich1/onir-cms",
    },
  },
};

const openSource = {
  kind: "openSource",
  locale: fr,
  route: "/open-source-madagascar/",
  alternates: [],
  data: {
    meta: {
      title: "Projet open source à Madagascar — ONIR CMS",
      description:
        "ONIR CMS est un projet open source malagasy sous licence MIT : code public, documentation, auto-hébergement et templates.",
      ogTitle: "Projet open source à Madagascar — ONIR CMS",
      ogDescription:
        "Un projet open source malagasy sous licence MIT pour construire des chatbots et des assistants IA.",
      ogImage: "/assets/og/onir-cms-1200x630.png",
    },
    hero: {
      kicker: "Projet open source",
      title: "Un projet open source malagasy pour l’IA",
      lead:
        "ONIR CMS est publié sous licence MIT. Le code peut être lu, testé, auto-hébergé et adapté. Cette page rassemble les points d’entrée techniques : dépôt, licence, documentation, installation et contribution.",
      primaryLabel: "Voir le dépôt GitHub",
      primaryHref: "https://github.com/RINOHeinrich1/onir-cms",
      secondaryLabel: "Lire la documentation",
      secondaryHref: "https://cms-backoffice.onirtech.com/documentation",
    },
    intro: {
      title: "Un logiciel ouvert, pas une boîte noire",
      paragraphs: [
        "L’open source est utile quand il permet réellement de comprendre, d’installer et de modifier le logiciel. ONIR CMS est publié sous licence MIT : une organisation peut étudier le code, l’auto-héberger et l’adapter à ses besoins.",
        "Le projet ne se résume pas au code. Une partie de la valeur se trouve dans la documentation, les décisions d’architecture, les templates, les démonstrations et les retours d’usage. C’est cet ensemble qui rend le projet appropriable.",
      ],
    },
    sections: [
      {
        kicker: "Le dépôt",
        title: "Ce que contient le projet",
        paragraphs: [
          "Le dépôt public contient le logiciel, ses évolutions et les éléments nécessaires pour comprendre son fonctionnement. Les releases et le journal des changements permettent de suivre les versions.",
          "Le projet est distinct du service Cloud. ONIR CMS Cloud est une offre hébergée ; le logiciel open source reste disponible séparément, sous licence MIT.",
        ],
        bullets: [
          "Code source public.",
          "Licence MIT.",
          "Releases et changelog.",
          "Documentation et ADR.",
          "Templates visuels.",
          "Démonstrations fonctionnelles.",
        ],
      },
      {
        kicker: "Auto-hébergement",
        title: "Installer ONIR CMS soi-même",
        paragraphs: [
          "L’auto-hébergement s’adresse aux organisations qui veulent maîtriser leur infrastructure ou adapter le logiciel. Il suppose des compétences en déploiement, en configuration et en maintenance.",
          "La documentation technique est le bon point de départ. Elle décrit l’installation, la configuration et les templates. Pour une organisation sans compétences techniques internes, l’offre Cloud réduit cette charge d’exploitation.",
        ],
      },
      {
        kicker: "Contribution",
        title: "Comment contribuer",
        paragraphs: [
          "Une contribution peut prendre plusieurs formes : signaler un bug avec un cas reproductible, proposer une amélioration, corriger une documentation, créer un template ou discuter d’une décision technique.",
          "La contribution la plus utile n’est pas nécessairement la plus spectaculaire. Un rapport de bug clair, une capture, un test ou une correction de documentation font avancer le projet.",
        ],
        bullets: [
          "Ouvrir une issue avec un contexte clair.",
          "Proposer une correction ou une amélioration.",
          "Documenter un cas d’usage.",
          "Créer ou adapter un template.",
          "Partager un retour après un test réel.",
        ],
      },
      {
        kicker: "Templates",
        title: "Un écosystème visuel",
        paragraphs: [
          "ONIR CMS propose des templates pour adapter l’interface d’un assistant à un usage ou à une identité visuelle. Les templates publiés sont accessibles depuis le catalogue.",
          "Puzzle est un exemple de template destiné à une expérience de chatbot. Les templates ne remplacent pas le contenu : ils donnent une structure et une direction visuelle.",
        ],
      },
      {
        kicker: "Limites",
        title: "Ce que l’open source ne règle pas",
        paragraphs: [
          "L’open source ne garantit pas une installation clé en main, un support permanent ou une réponse à tous les besoins. Il donne la possibilité d’inspecter, d’adapter et de construire.",
          "Une organisation doit donc choisir entre auto-hébergement et Cloud selon ses compétences, ses contraintes et son niveau d’autonomie. Le bon choix dépend du projet, pas d’une préférence abstraite.",
        ],
      },
    ],
    related: [
      {
        label: "Initiative IA",
        href: "/initiative-ia-madagascar/",
        description: "Le sens du projet et son ancrage malagasy.",
      },
      {
        label: "Fonctionnalités",
        href: "/fonctionnalites/",
        description: "Les capacités du produit.",
      },
      {
        label: "Chatbot à Madagascar",
        href: "/chatbot-madagascar/",
        description: "Les usages concrets et le parcours produit.",
      },
      {
        label: "Participer",
        href: "/participer/",
        description: "Contribuer au projet et à l’écosystème.",
      },
      {
        label: "Documentation",
        href: "https://cms-backoffice.onirtech.com/documentation",
        description: "Installation, configuration et templates.",
      },
      {
        label: "GitHub",
        href: "https://github.com/RINOHeinrich1/onir-cms",
        description: "Le dépôt public et les releases.",
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "ONIR CMS est-il open source ?",
          a: "Oui. Le logiciel est publié sous licence MIT et le code est accessible publiquement.",
        },
        {
          q: "Peut-on auto-héberger ONIR CMS ?",
          a: "Oui. L’auto-hébergement est possible, mais il nécessite des compétences en installation, configuration et maintenance.",
        },
        {
          q: "Où trouver la documentation ?",
          a: "La documentation technique est accessible depuis le landing ONIR CMS. Elle couvre l’installation, la configuration et les templates.",
        },
        {
          q: "Comment contribuer ?",
          a: "Vous pouvez ouvrir une issue, proposer une correction, améliorer la documentation ou partager un retour après un test réel.",
        },
      ],
    },
    cta: {
      kicker: "Explorer le projet",
      title: "Lire le code, tester, contribuer.",
      lead:
        "Le dépôt est public. La contribution la plus utile commence souvent par un test réel et un retour précis.",
      primaryLabel: "Voir GitHub",
      primaryHref: "https://github.com/RINOHeinrich1/onir-cms",
      secondaryLabel: "Lire la documentation",
      secondaryHref: "https://cms-backoffice.onirtech.com/documentation",
    },
  },
};

const expertise = {
  kind: "expertise",
  locale: fr,
  route: "/expertise-ia-madagascar/",
  alternates: [],
  data: {
    meta: {
      title: "Expertise IA à Madagascar — ONIRTECH",
      description:
        "ONIRTECH conçoit et déploie des assistants IA à Madagascar avec ONIR CMS : cadrage, intégration, personnalisation, collecte de données et accompagnement.",
      ogTitle: "Expertise IA à Madagascar — ONIRTECH",
      ogDescription:
        "Concevoir et déployer des assistants IA depuis Madagascar, avec ONIR CMS.",
      ogImage: "/assets/og/onir-cms-1200x630.png",
    },
    hero: {
      kicker: "Expertise IA",
      title: "Concevoir et déployer des assistants IA à Madagascar",
      lead:
        "ONIRTECH accompagne les organisations qui veulent passer d’un besoin métier à un assistant IA utilisable : cadrage, conception, intégration, personnalisation et suivi. L’expertise est construite autour d’ONIR CMS, de ses démonstrations et de ses templates.",
      primaryLabel: "Parler de votre projet",
      primaryHref: "/#contact",
      secondaryLabel: "Voir les cas d’usage",
      secondaryHref: "/cas-usage/reception-client/",
    },
    intro: {
      title: "De l’intention au parcours réel",
      paragraphs: [
        "Un projet d’assistant IA commence rarement par une question technique. Il commence par un problème : des demandes sans réponse, une qualification difficile, un support répétitif ou une expérience client à structurer.",
        "ONIRTECH part de ce problème et construit un parcours vérifiable. L’objectif n’est pas d’ajouter un chatbot à un site, mais de concevoir un assistant qui répond correctement, collecte les informations utiles et sait quand transmettre la conversation.",
      ],
    },
    sections: [
      {
        kicker: "Ce que nous faisons",
        title: "Des interventions concrètes",
        paragraphs: [
          "ONIRTECH intervient sur le cadrage, la conception et le déploiement d’assistants IA avec ONIR CMS. Le périmètre est défini avant de commencer, avec un livrable observable.",
        ],
        bullets: [
          "Cadrage du besoin et des parcours.",
          "Conception de l’assistant et de son rôle.",
          "Intégration au site ou à l’environnement existant.",
          "Personnalisation de l’interface avec un template.",
          "Définition des informations à collecter.",
          "Mise en place de la reprise humaine.",
          "Accompagnement et amélioration après les premiers tests.",
        ],
      },
      {
        kicker: "Méthode",
        title: "Un parcours de projet lisible",
        paragraphs: [
          "La méthode commence par un objectif limité et mesurable. Un premier parcours réduit vaut mieux qu’un assistant qui prétend tout faire. On définit ensuite les informations fiables, les questions à poser et les cas où une personne doit reprendre la conversation.",
          "Le prototype est testé avec de vraies questions. Les réponses incomplètes, les incompréhensions et les cas de blocage deviennent la base de l’amélioration. La publication ne marque pas la fin du projet : elle marque le début de l’observation.",
        ],
      },
      {
        kicker: "Cas d’usage",
        title: "Accueil, qualification et support",
        paragraphs: [
          "Les premiers usages sont souvent les plus utiles : accueillir un visiteur, répondre aux questions fréquentes, qualifier une demande de devis ou orienter vers le bon service. Le parcours de réception client donne un exemple concret de cette logique.",
          "Un assistant bien conçu ne se contente pas de répondre. Il structure la demande, conserve le contexte et prépare la suite pour l’organisation.",
        ],
      },
      {
        kicker: "Preuves",
        title: "Des démonstrations avant des promesses",
        paragraphs: [
          "ONIRTECH s’appuie sur des éléments observables : le produit ONIR CMS, les démonstrations, les templates, les articles et le dépôt open source. Ces éléments permettent de juger la capacité d’exécution avant de démarrer un projet.",
          "Les projets réels et les usages publiés sur le landing servent de base de discussion. Ils ne remplacent pas un cadrage spécifique, mais ils montrent la direction et le niveau d’exigence.",
        ],
      },
      {
        kicker: "Périmètre",
        title: "Ce que l’expertise ne promet pas",
        paragraphs: [
          "Un assistant IA ne résout pas tous les problèmes de relation client. Il peut se tromper, mal comprendre une demande ou manquer de contexte. C’est pourquoi la reprise humaine, les limites et les tests font partie du projet.",
          "ONIRTECH ne promet pas une disponibilité permanente sans engagement correspondant. La conception doit distinguer ce qui est automatisé, ce qui est supervisé et ce qui reste humain.",
        ],
      },
    ],
    related: [
      {
        label: "Initiative IA",
        href: "/initiative-ia-madagascar/",
        description: "Le projet et son ancrage à Madagascar.",
      },
      {
        label: "Chatbot à Madagascar",
        href: "/chatbot-madagascar/",
        description: "Comprendre le produit et les usages.",
      },
      {
        label: "Démonstrations",
        href: "/#demos",
        description: "Voir des parcours de chatbot en fonctionnement.",
      },
      {
        label: "Templates",
        href: "/themes/",
        description: "Les interfaces et expériences publiées.",
      },
      {
        label: "Réception client",
        href: "/cas-usage/reception-client/",
        description: "Un parcours concret de qualification.",
      },
      {
        label: "Fonctionnalités",
        href: "/fonctionnalites/",
        description: "Les capacités disponibles dans ONIR CMS.",
      },
      {
        label: "Tarifs",
        href: "/tarifs/",
        description: "Les offres Cloud et leurs limites.",
      },
      {
        label: "Nous contacter",
        href: "/#contact",
        description: "Décrire votre besoin et votre contexte.",
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Quels types de projets ONIRTECH accompagne-t-il ?",
          a: "ONIRTECH accompagne le cadrage, la conception et le déploiement d’assistants IA avec ONIR CMS, notamment pour l’accueil, la qualification et le support.",
        },
        {
          q: "Faut-il déjà avoir un chatbot ?",
          a: "Non. Le cadrage peut partir d’un besoin métier, d’un volume de demandes ou d’un parcours client à structurer.",
        },
        {
          q: "L’expertise est-elle disponible à Madagascar ?",
          a: "Oui. ONIRTECH construit son expertise IA à Madagascar et propose ONIR CMS Cloud localement.",
        },
        {
          q: "Peut-on commencer par une démonstration ?",
          a: "Oui. Les démonstrations et les templates publiés permettent de vérifier le produit avant de définir un projet.",
        },
      ],
    },
    cta: {
      kicker: "Cadrer un projet",
      title: "Partez d’un besoin réel, pas d’une vitrine.",
      lead:
        "Décrivez le parcours à améliorer, les demandes à traiter et les informations à collecter. Le cadrage permettra de définir un premier livrable utile.",
      primaryLabel: "Parler de votre projet",
      primaryHref: "/#contact",
      secondaryLabel: "Voir ONIR CMS",
      secondaryHref: "/chatbot-madagascar/",
    },
  },
};

export default [initiative, openSource, expertise];
