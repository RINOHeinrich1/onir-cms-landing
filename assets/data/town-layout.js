(function () {
  "use strict";

  window.ONIR_TOWN_LAYOUT = {
    version: 2,
    centerZoneId: "centre",
    centerSlotId: "centre-01",
    zones: [
      {
        id: "centre",
        slug: "centre",
        title: "Centre",
        navTitle: "Centre",
        description: "La place historique, rare et premium, autour d’ONIR-CMS.",
        neighbors: { nord: "nord", est: "est", sud: "sud", ouest: "ouest" }
      },
      {
        id: "nord",
        slug: "organisations",
        title: "Organisations",
        navTitle: "Organisations",
        description: "Le quartier des organisations, coopératives et projets structurants.",
        neighbors: { sud: "centre" }
      },
      {
        id: "est",
        slug: "partenaires-technologiques",
        title: "Partenaires technologiques",
        navTitle: "Partenaires tech",
        description: "La place des alliances et des partenaires technologiques.",
        neighbors: { ouest: "centre" }
      },
      {
        id: "sud",
        slug: "particuliers",
        title: "Particuliers",
        navTitle: "Particuliers",
        description: "L’allée des particuliers et des soutiens indépendants.",
        neighbors: { nord: "centre" }
      },
      {
        id: "ouest",
        slug: "institutions",
        title: "Institutions",
        navTitle: "Institutions",
        description: "Le quartier des institutions et de l’extension.",
        neighbors: { est: "centre" }
      }
    ],
    slots: [
      {
        id: "centre-01",
        zoneId: "centre",
        x: 600,
        y: 382,
        building: "tower",
        size: "lg",
        accent: "#f08000",
        allowedNatures: ["platform"],
        reserved: true
      },
      {
        id: "centre-02",
        zoneId: "centre",
        x: 420,
        y: 300,
        building: "workshop",
        size: "sm",
        accent: "#c77819",
        allowedNatures: ["entreprise"],
        premium: true
      },
      {
        id: "centre-03",
        zoneId: "centre",
        x: 800,
        y: 300,
        building: "workshop",
        size: "sm",
        accent: "#c77819",
        allowedNatures: ["entreprise"],
        premium: true
      },
      {
        id: "centre-04",
        zoneId: "centre",
        x: 430,
        y: 470,
        building: "workshop",
        size: "sm",
        accent: "#c77819",
        allowedNatures: ["entreprise"],
        premium: true
      },
      {
        id: "centre-05",
        zoneId: "centre",
        x: 770,
        y: 470,
        building: "workshop",
        size: "sm",
        accent: "#c77819",
        allowedNatures: ["entreprise"],
        premium: true
      },
      {
        id: "nord-01",
        zoneId: "nord",
        x: 300,
        y: 120,
        building: "workshop",
        size: "md",
        accent: "#2f7d63",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-02",
        zoneId: "nord",
        x: 300,
        y: 270,
        building: "workshop",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-03",
        zoneId: "nord",
        x: 300,
        y: 420,
        building: "workshop",
        size: "sm",
        accent: "#c96d3b",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-04",
        zoneId: "nord",
        x: 300,
        y: 570,
        building: "workshop",
        size: "md",
        accent: "#8a6b2f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-05",
        zoneId: "nord",
        x: 300,
        y: 700,
        building: "workshop",
        size: "sm",
        accent: "#5b7c4a",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-06",
        zoneId: "nord",
        x: 900,
        y: 120,
        building: "workshop",
        size: "sm",
        accent: "#2f7d63",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-07",
        zoneId: "nord",
        x: 900,
        y: 270,
        building: "workshop",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-08",
        zoneId: "nord",
        x: 900,
        y: 420,
        building: "workshop",
        size: "sm",
        accent: "#c96d3b",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-09",
        zoneId: "nord",
        x: 900,
        y: 570,
        building: "workshop",
        size: "sm",
        accent: "#8a6b2f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "nord-10",
        zoneId: "nord",
        x: 900,
        y: 700,
        building: "workshop",
        size: "sm",
        accent: "#5b7c4a",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-01",
        zoneId: "est",
        x: 200,
        y: 180,
        building: "workshop",
        size: "md",
        accent: "#f08000",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-02",
        zoneId: "est",
        x: 400,
        y: 180,
        building: "workshop",
        size: "sm",
        accent: "#5b7c4a",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-03",
        zoneId: "est",
        x: 600,
        y: 180,
        building: "workshop",
        size: "md",
        accent: "#2f7d63",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-04",
        zoneId: "est",
        x: 800,
        y: 180,
        building: "workshop",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-05",
        zoneId: "est",
        x: 1000,
        y: 180,
        building: "workshop",
        size: "sm",
        accent: "#8a6b2f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-06",
        zoneId: "est",
        x: 200,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#c96d3b",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-07",
        zoneId: "est",
        x: 400,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#5b7c4a",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-08",
        zoneId: "est",
        x: 600,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#2f7d63",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-09",
        zoneId: "est",
        x: 800,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "est-10",
        zoneId: "est",
        x: 1000,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#8a6b2f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "sud-01",
        zoneId: "sud",
        x: 250,
        y: 160,
        building: "house",
        size: "sm",
        accent: "#c96d3b",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-02",
        zoneId: "sud",
        x: 400,
        y: 160,
        building: "house",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-03",
        zoneId: "sud",
        x: 800,
        y: 160,
        building: "house",
        size: "sm",
        accent: "#8a6b2f",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-04",
        zoneId: "sud",
        x: 950,
        y: 160,
        building: "house",
        size: "sm",
        accent: "#2f7d63",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-05",
        zoneId: "sud",
        x: 250,
        y: 360,
        building: "house",
        size: "sm",
        accent: "#5b7c4a",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-06",
        zoneId: "sud",
        x: 400,
        y: 360,
        building: "house",
        size: "sm",
        accent: "#c96d3b",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-07",
        zoneId: "sud",
        x: 800,
        y: 360,
        building: "house",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-08",
        zoneId: "sud",
        x: 950,
        y: 360,
        building: "house",
        size: "sm",
        accent: "#8a6b2f",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-09",
        zoneId: "sud",
        x: 250,
        y: 560,
        building: "house",
        size: "sm",
        accent: "#2f7d63",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-10",
        zoneId: "sud",
        x: 400,
        y: 560,
        building: "house",
        size: "sm",
        accent: "#5b7c4a",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-11",
        zoneId: "sud",
        x: 800,
        y: 560,
        building: "house",
        size: "sm",
        accent: "#c96d3b",
        allowedNatures: ["particulier"]
      },
      {
        id: "sud-12",
        zoneId: "sud",
        x: 950,
        y: 560,
        building: "house",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["particulier"]
      },
      {
        id: "ouest-01",
        zoneId: "ouest",
        x: 200,
        y: 180,
        building: "workshop",
        size: "md",
        accent: "#5b7c4a",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-02",
        zoneId: "ouest",
        x: 400,
        y: 180,
        building: "workshop",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-03",
        zoneId: "ouest",
        x: 600,
        y: 180,
        building: "workshop",
        size: "sm",
        accent: "#8a6b2f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-04",
        zoneId: "ouest",
        x: 800,
        y: 180,
        building: "workshop",
        size: "sm",
        accent: "#c96d3b",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-05",
        zoneId: "ouest",
        x: 1000,
        y: 180,
        building: "workshop",
        size: "sm",
        accent: "#2f7d63",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-06",
        zoneId: "ouest",
        x: 200,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#5b7c4a",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-07",
        zoneId: "ouest",
        x: 400,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#3f6f8f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-08",
        zoneId: "ouest",
        x: 600,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#8a6b2f",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-09",
        zoneId: "ouest",
        x: 800,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#c96d3b",
        allowedNatures: ["entreprise"]
      },
      {
        id: "ouest-10",
        zoneId: "ouest",
        x: 1000,
        y: 580,
        building: "workshop",
        size: "sm",
        accent: "#2f7d63",
        allowedNatures: ["entreprise"]
      }
    ]
  };
})();
