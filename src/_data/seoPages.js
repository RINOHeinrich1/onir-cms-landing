import allLocales from "./allLocales.js";
import seoAuthorityPages from "./seoAuthorityPages.js";

const fr = allLocales.find((locale) => locale.code === "fr");

const chatbotMadagascar = {
  locale: fr,
  route: "/chatbot-madagascar/",
  alternates: [],
  data: {
    meta: {
      title: "Chatbot IA à Madagascar — ONIR CMS",
      description:
        "Découvrez comment un chatbot IA peut répondre à vos clients, qualifier les demandes et préparer la reprise humaine. ONIR CMS Cloud à Madagascar.",
      ogTitle: "Chatbot IA à Madagascar — ONIR CMS",
      ogDescription:
        "Un assistant IA pour répondre aux clients, collecter les informations utiles et préparer la reprise humaine.",
      ogImage: "/assets/og/onir-cms-1200x630.png",
    },
    hero: {
      kicker: "Chatbot à Madagascar",
      title: "Créez votre chatbot IA à Madagascar",
      lead:
        "Un assistant IA peut répondre aux questions fréquentes, qualifier les demandes et transmettre les conversations utiles à votre équipe. ONIR CMS Cloud est conçu pour les entreprises malagasy, avec une alternative open source auto-hébergée.",
      primaryLabel: "Essayer une démonstration",
      primaryHref: "/#demos",
      secondaryLabel: "Voir les tarifs",
      secondaryHref: "/tarifs/",
    },
    intro: {
      title: "Un chatbot utile, pas une simple vitrine",
      paragraphs: [
        "Un chatbot IA est un assistant capable de comprendre une question, de répondre avec les informations de votre organisation et de poursuivre une conversation. Il peut accueillir un visiteur, expliquer une offre, collecter un besoin ou orienter vers la bonne personne.",
        "La différence entre un chatbot utile et un gadget tient à trois éléments : la qualité des informations fournies, la possibilité de reprendre la conversation humainement et la capacité à mesurer ce qui se passe. ONIR CMS réunit ces trois dimensions dans un outil open source, avec une offre Cloud pour les organisations qui ne veulent pas gérer l’hébergement.",
      ],
    },
    sections: [
      {
        kicker: "Le besoin",
        title: "Pourquoi utiliser un chatbot à Madagascar ?",
        paragraphs: [
          "Les clients posent souvent les mêmes questions : horaires, disponibilité, prix, livraison, conditions ou démarches. Un assistant peut répondre immédiatement à ces demandes simples et libérer du temps pour les échanges qui nécessitent vraiment une intervention humaine.",
          "À Madagascar, cette utilité est particulièrement concrète pour les organisations qui reçoivent des demandes en dehors des horaires de bureau, qui utilisent plusieurs canaux ou qui perdent des prospects faute de suivi. Le chatbot ne remplace pas l’équipe : il prépare la conversation et évite que certaines demandes restent sans réponse.",
        ],
      },
      {
        kicker: "Cloud et open source",
        title: "ONIR CMS Cloud, ou ONIR CMS auto-hébergé",
        paragraphs: [
          "ONIR CMS existe sous deux formes complémentaires. ONIR CMS est un logiciel open source sous licence MIT : il peut être installé et hébergé par une équipe technique. ONIR CMS Cloud est le service hébergé pour les organisations qui veulent créer et exploiter un assistant sans administrer toute l’infrastructure.",
          "L’offre Cloud est disponible à Madagascar, avec des tarifs en ariary et des moyens de paiement locaux. Les offres et les limites sont consultables sur la page Tarifs. Les abonnements Cloud sont activés après vérification du paiement.",
        ],
        note:
          "Le Cloud et l’auto-hébergement ne facturent pas la même chose. L’open source est gratuit ; le Cloud inclut l’hébergement, l’exploitation et les services associés.",
      },
      {
        kicker: "Conversations",
        title: "Répondre automatiquement, puis passer la main",
        paragraphs: [
          "Un assistant IA traite les questions répétitives, mais une conversation commerciale ou sensible peut nécessiter un humain. ONIR CMS permet de suivre les conversations et de reprendre la main lorsqu’un membre de l’équipe doit intervenir.",
          "Ce fonctionnement évite les deux extrêmes : un robot qui bloque le client et une équipe qui répond manuellement à toutes les questions. L’objectif est de donner une réponse rapide, de conserver le contexte et de transmettre la conversation au bon moment.",
        ],
      },
      {
        kicker: "Données",
        title: "Collecter les bonnes informations, pas tout collecter",
        paragraphs: [
          "Un chatbot peut structurer une demande avec des informations utiles : le besoin, le secteur, la ville, le budget ou la disponibilité. ONIR CMS permet de créer des fiches de prospection et de collecter des informations dans un cadre défini.",
          "La collecte doit rester proportionnée à la demande. Il vaut mieux poser trois questions utiles que demander dix informations que personne ne lira. Les données collectées doivent être accessibles à l’équipe et utilisées dans le respect des règles de confidentialité applicables.",
        ],
      },
      {
        kicker: "Cas d’usage",
        title: "Des usages concrets pour les entreprises malagasy",
        paragraphs: [
          "Les usages les plus simples sont souvent les plus rentables : accueillir les visiteurs d’un site, répondre aux questions sur une offre, qualifier une demande de devis ou orienter vers un service. Un assistant bien préparé peut aussi accompagner la prise de rendez-vous ou la préparation d’une commande.",
          "La page de réception client montre un parcours concret, de l’accueil à la collecte du besoin. Elle peut servir de point de départ avant d’adapter le scénario à votre activité.",
        ],
      },
      {
        kicker: "Mise en place",
        title: "Comment créer son premier chatbot ?",
        paragraphs: [
          "La création commence par un objectif précis : répondre à une question, qualifier un prospect ou assurer un premier niveau de support. Il faut ensuite rassembler les informations fiables, définir le rôle de l’assistant et choisir les informations à collecter.",
          "La personnalisation de l’interface, les tests de conversation et la publication viennent après. Il est préférable de lancer un premier parcours limité, de l’observer et de l’améliorer avec de vraies questions plutôt que de tout prévoir avant le premier essai.",
        ],
        bullets: [
          "Définir un objectif et un périmètre limité.",
          "Rassembler les informations vérifiées de votre organisation.",
          "Définir les questions à poser et les cas de reprise humaine.",
          "Tester avec des questions réelles avant la publication.",
          "Suivre les conversations et corriger les réponses incomplètes.",
        ],
      },
      {
        kicker: "Budget",
        title: "Combien coûte un chatbot à Madagascar ?",
        paragraphs: [
          "Le coût dépend du mode de déploiement, du volume de conversations, des fonctionnalités et du niveau d’accompagnement. Un chatbot open source auto-hébergé n’a pas le même coût qu’une offre Cloud clé en main.",
          "ONIR CMS Cloud propose plusieurs niveaux d’offre, avec des limites de chatbots, de tokens, de messages et de stockage. Les tarifs sont exprimés en ariary et consultables sur la page dédiée. Avant de choisir, il faut estimer le volume réel de demandes et le temps que l’équipe peut consacrer à la préparation de l’assistant.",
        ],
      },
      {
        kicker: "Technologie",
        title: "Une initiative malagasy, un logiciel ouvert",
        paragraphs: [
          "ONIR CMS est développé par ONIRTECH, une initiative malagasy. Le logiciel est open source sous licence MIT, ce qui permet à une équipe de l’installer, de l’étudier et de l’adapter à ses besoins.",
          "Cette ouverture ne veut pas dire que tout se configure sans accompagnement. Elle signifie que l’organisation garde la maîtrise de son déploiement et peut choisir son hébergement, ses fournisseurs de modèles compatibles OpenAI et son niveau d’autonomie.",
        ],
      },
    ],
    related: [
      {
        label: "Initiative IA",
        href: "/initiative-ia-madagascar/",
        description: "Le projet, son ancrage malagasy et ses preuves.",
      },
      {
        label: "Open source",
        href: "/open-source-madagascar/",
        description: "Le dépôt, la licence MIT et la contribution.",
      },
      {
        label: "Expertise IA",
        href: "/expertise-ia-madagascar/",
        description: "Cadrer et déployer un assistant avec ONIRTECH.",
      },
      {
        label: "Fonctionnalités",
        href: "/fonctionnalites/",
        description: "Création, conversations, reprise humaine, fiches et intégrations.",
      },
      {
        label: "Réception client",
        href: "/cas-usage/reception-client/",
        description: "Un parcours concret pour accueillir et qualifier une demande.",
      },
      {
        label: "Tarifs",
        href: "/tarifs/",
        description: "Les offres Cloud et leurs limites, en ariary.",
      },
      {
        label: "Thème Puzzle",
        href: "/themes/puzzle/",
        description: "Un template pour présenter une expérience de chatbot.",
      },
      {
        label: "Comprendre les templates",
        href: "/articles/comprendre-templates-utilisateur/",
        description: "Comment personnaliser l’interface d’un assistant.",
      },
      {
        label: "Code source",
        href: "https://github.com/RINOHeinrich1/onir-cms",
        description: "Le logiciel open source sous licence MIT.",
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Qu’est-ce qu’un chatbot IA ?",
          a: "C’est un assistant logiciel qui comprend une question, répond avec les informations fournies et poursuit une conversation. Il peut être limité à un usage précis, comme l’accueil ou la qualification d’une demande.",
        },
        {
          q: "ONIR CMS est-il gratuit ?",
          a: "ONIR CMS est open source sous licence MIT et peut être auto-hébergé. ONIR CMS Cloud est un service payant, avec des offres et des limites consultables sur la page Tarifs.",
        },
        {
          q: "ONIR CMS Cloud est-il disponible à Madagascar ?",
          a: "Oui. L’offre Cloud est disponible à Madagascar, avec des tarifs en ariary et des moyens de paiement locaux. Les abonnements sont activés après vérification du paiement.",
        },
        {
          q: "Le chatbot peut-il transmettre une conversation à un humain ?",
          a: "Oui. ONIR CMS permet le suivi des conversations et la reprise humaine lorsque la demande nécessite une intervention de l’équipe.",
        },
        {
          q: "Faut-il savoir programmer ?",
          a: "La création d’un premier parcours est assistée, mais l’installation auto-hébergée et la personnalisation avancée peuvent nécessiter des compétences techniques. L’offre Cloud réduit cette charge d’exploitation.",
        },
      ],
    },
    cta: {
      kicker: "Passer à l’essai",
      title: "Construisez un premier parcours, puis mesurez.",
      lead:
        "Commencez par une question fréquente, un formulaire court ou une demande de devis. Testez une démonstration et choisissez ensuite le mode de déploiement adapté.",
      primaryLabel: "Tester une démonstration",
      primaryHref: "/#demos",
      secondaryLabel: "Voir les tarifs",
      secondaryHref: "/tarifs/",
    },
  },
};

export default [chatbotMadagascar, ...seoAuthorityPages];
