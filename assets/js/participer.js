(function () {
  "use strict";

  var sponsors = window.ONIR_SPONSORS || [];
  var byId = {};
  sponsors.forEach(function (sponsor) {
    byId[sponsor.id] = sponsor;
  });

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function typeLabel(type) {
    return (
      {
        person: "Personne physique",
        company: "Entreprise",
        society: "Société",
        organization: "Organisation"
      }[type] || ""
    );
  }

  function initials(name) {
    return String(name)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) {
        return part.charAt(0);
      })
      .join("")
      .toUpperCase();
  }

  function accentStyle(sponsor) {
    return "background:" + sponsor.accent + "22;color:" + sponsor.accent;
  }

  function mapTree(x, y, scale) {
    var s = scale || 1;
    return (
      '<g transform="translate(' + x + " " + y + ') scale(' + s + ')" aria-hidden="true">' +
      '<rect x="-2.5" y="0" width="5" height="16" rx="2" fill="var(--map-tree-dark)" opacity=".8"/>' +
      '<circle cx="-6" cy="-6" r="12" fill="var(--map-tree)"/>' +
      '<circle cx="6" cy="-4" r="10" fill="var(--map-tree)"/>' +
      '<circle cx="0" cy="-14" r="11" fill="var(--map-tree)"/>' +
      '<circle cx="-3" cy="-8" r="6" fill="var(--map-tree-dark)" opacity=".35"/>' +
      "</g>"
    );
  }

  function road(d) {
    return (
      '<path d="' + d + '" fill="none" stroke="var(--map-road-edge)" stroke-width="48" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="var(--map-road)" stroke-width="38" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="var(--map-road-line)" stroke-width="2" stroke-dasharray="8 11" stroke-linecap="round" opacity=".7"/>'
    );
  }

  function sidePath(d) {
    return (
      '<path d="' + d + '" fill="none" stroke="var(--map-road-edge)" stroke-width="17" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="var(--map-road)" stroke-width="12" stroke-linecap="round"/>'
    );
  }

  function buildingDims(sponsor) {
    if (sponsor.building === "tower") return { w: 190, h: 156 };
    if (sponsor.building === "house") return { w: 82, h: 82 };
    if (sponsor.size === "md") return { w: 108, h: 102 };
    return { w: 94, h: 92 };
  }

  function buildingMarkup(sponsor) {
    var dims = buildingDims(sponsor);
    var w = dims.w;
    var h = dims.h;
    var half = w / 2;
    var accent = sponsor.accent;
    var body = "";
    var labelY = 24;

    if (sponsor.building === "tower") {
      labelY = 32;
      body =
        '<rect x="' + -half + '" y="' + (-h + 14) + '" width="' + w + '" height="' + (h - 14) + '" rx="7" fill="var(--map-building)" stroke="var(--map-building-edge)" stroke-width="1.4"/>' +
        '<rect x="' + (-half - 7) + '" y="' + (-h + 2) + '" width="' + (w + 14) + '" height="18" rx="5" fill="' + accent + '"/>' +
        '<rect x="' + (-half + 16) + '" y="' + (-h + 34) + '" width="' + (w - 32) + '" height="40" rx="4" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.4"/>' +
        '<path d="M' + (-half + 44) + " " + (-h + 34) + "V" + (-h + 74) + "M" + (-half + 76) + " " + (-h + 34) + "V" + (-h + 74) + "M" + (-half + 108) + " " + (-h + 34) + "V" + (-h + 74) + '" stroke="var(--map-window-frame)" stroke-width="1.2" opacity=".85"/>' +
        '<rect x="' + (-half + 18) + '" y="' + (-h + 88) + '" width="42" height="34" rx="3" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
        '<rect x="' + (half - 60) + '" y="' + (-h + 88) + '" width="42" height="34" rx="3" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
        '<rect x="-16" y="-38" width="32" height="38" rx="3" fill="' + accent + '"/>' +
        '<rect x="-34" y="-72" width="68" height="20" rx="10" fill="' + accent + '"/>' +
        '<text x="0" y="-57" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800" letter-spacing=".08em">ONIR</text>' +
        '<path d="M' + (half - 24) + " " + (-h + 2) + "V" + (-h - 42) + '" stroke="' + accent + '" stroke-width="2.5"/>' +
        '<path d="M' + (half - 24) + " " + (-h - 42) + 'h30l-8 8 8 8h-30z" fill="' + accent + '"/>' +
        '<circle cx="-26" cy="-50" r="5" fill="var(--map-window)"/>' +
        '<circle cx="26" cy="-50" r="5" fill="var(--map-window)"/>';
    } else if (sponsor.building === "house") {
      labelY = 22;
      body =
        '<rect x="' + -half + '" y="-50" width="' + w + '" height="50" rx="4" fill="var(--map-building)" stroke="var(--map-building-edge)" stroke-width="1.3"/>' +
        '<path d="M' + (-half - 8) + " -50L0 " + -78 + "L" + (half + 8) + ' -50Z" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<rect x="' + (half - 22) + '" y="-74" width="9" height="20" rx="2" fill="var(--map-building-edge)" opacity=".55"/>' +
        '<rect x="-12" y="-26" width="24" height="26" rx="3" fill="' + accent + '"/>' +
        '<rect x="' + (-half + 13) + '" y="-37" width="19" height="17" rx="2" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
        '<rect x="' + (half - 32) + '" y="-37" width="19" height="17" rx="2" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
        '<path d="M' + (-half + 22) + " -37v17M" + (half - 22) + ' -37v17" stroke="var(--map-window-frame)" stroke-width="1"/>' +
        '<path d="M' + (-half - 7) + " 0h" + (w + 14) + '" stroke="var(--map-tree-dark)" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="' + (-half - 8) + '" cy="-4" r="7" fill="var(--map-tree)"/>' +
        '<circle cx="' + (half + 8) + '" cy="-4" r="7" fill="var(--map-tree)"/>' +
        '<rect x="-12" y="-48" width="24" height="12" rx="3" fill="' + accent + '" opacity=".9"/>' +
        '<text x="0" y="-39" text-anchor="middle" fill="#ffffff" font-size="8" font-weight="800">' + esc(sponsor.initials) + "</text>";
    } else {
      var roofStyle = sponsor.building === "house-office" ? "pitched" : "flat";
      body =
        '<rect x="' + -half + '" y="' + (-h + 15) + '" width="' + w + '" height="' + (h - 15) + '" rx="4" fill="var(--map-building)" stroke="var(--map-building-edge)" stroke-width="1.3"/>' +
        (roofStyle === "pitched"
          ? '<path d="M' + (-half - 8) + " " + (-h + 15) + "L0 " + (-h - 8) + "L" + (half + 8) + " " + (-h + 15) + 'Z" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1.2" stroke-linejoin="round"/>'
          : '<rect x="' + (-half - 5) + '" y="' + (-h + 6) + '" width="' + (w + 10) + '" height="13" rx="3" fill="' + accent + '"/>') +
        '<rect x="' + (-half + 13) + '" y="' + (-h + 48) + '" width="19" height="18" rx="2" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
        '<rect x="' + (-half + 42) + '" y="' + (-h + 48) + '" width="19" height="18" rx="2" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
        '<rect x="' + (half - 32) + '" y="' + (-h + 48) + '" width="19" height="18" rx="2" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
        '<rect x="-13" y="-31" width="26" height="31" rx="3" fill="' + accent + '"/>' +
        '<rect x="' + (-half + 13) + '" y="' + (-h + 28) + '" width="' + (w - 26) + '" height="14" rx="7" fill="' + accent + '" opacity=".9"/>' +
        '<text x="0" y="' + (-h + 38) + '" text-anchor="middle" fill="#ffffff" font-size="8.5" font-weight="800" letter-spacing=".05em">' + esc(sponsor.initials) + "</text>" +
        '<path d="M' + (-half + 11) + " " + (-h + 76) + "h" + (w - 22) + '" stroke="var(--map-building-edge)" stroke-width="1" opacity=".16"/>';
    }

    return (
      '<g class="sponsor-building" data-sponsor-id="' + esc(sponsor.id) + '" tabindex="0" role="link" aria-label="' +
      esc(sponsor.name + " — " + sponsor.typeLabel + " — " + sponsor.sponsorship.join(", ")) + '" transform="translate(' + sponsor.x + " " + sponsor.y + ')">' +
      "<title>" + esc(sponsor.name) + "</title>" +
      "<desc>" + esc(sponsor.typeLabel + ". " + sponsor.description) + "</desc>" +
      '<ellipse class="bldg-shadow" cx="0" cy="9" rx="' + (w * 0.58) + '" ry="8" fill="var(--map-shadow)" opacity=".55"/>' +
      body +
      '<rect class="focus-ring" x="' + (-half - 11) + '" y="' + (-h - 16) + '" width="' + (w + 22) + '" height="' + (h + 28) + '" rx="9" fill="none" stroke="' + accent + '" stroke-width="2.5" opacity="0"/>' +
      '<text class="map-label" x="0" y="' + labelY + '" text-anchor="middle">' + esc(sponsor.name) + "</text>" +
      "</g>"
    );
  }

  function emptyPlotMarkup(x, y) {
    return (
      '<g class="empty-plot" data-empty-plot tabindex="0" role="button" aria-label="Emplacement libre — devenir sponsor" transform="translate(' + x + " " + y + ')">' +
      "<title>Votre place</title>" +
      '<rect x="-38" y="-26" width="76" height="52" rx="9"/>' +
      '<path d="M0 -12v24M-12 0h24" stroke="var(--map-ink)" stroke-width="2" stroke-linecap="round" opacity=".55"/>' +
      '<text x="0" y="15" text-anchor="middle">Votre place</text>' +
      '<text x="0" y="42" class="map-label map-label-small" text-anchor="middle">Devenir sponsor</text>' +
      "</g>"
    );
  }

  function renderMap() {
    var map = document.querySelector("[data-town-map]");
    if (!map) return;

    var center = byId.onirtech;
    var others = sponsors.filter(function (sponsor) {
      return sponsor.id !== "onirtech";
    });

    map.innerHTML =
      "<title>La Ville ONIR — carte interactive des sponsors</title>" +
      "<desc>Une carte illustrée en 2D. ONIR-CMS occupe le centre. Cliquez sur un bâtiment pour découvrir son sponsor, ou sur un emplacement libre pour proposer votre soutien.</desc>" +
      "<defs>" +
      '<pattern id="town-dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="var(--map-road-line)" opacity=".28"/></pattern>' +
      '<clipPath id="town-clip"><rect width="1200" height="760" rx="30"/></clipPath>' +
      "</defs>" +
      '<g clip-path="url(#town-clip)">' +
      '<rect width="1200" height="760" fill="var(--map-paper)"/>' +
      '<rect width="1200" height="760" fill="url(#town-dots)"/>' +
      '<path d="M46 96C118 40 220 58 250 142c28 78-40 137-118 141C57 286 9 201 46 96Z" fill="var(--map-park)"/>' +
      '<path d="M946 54c78-27 155 18 159 91 4 61-44 106-110 104-79-2-116-53-107-113 4-30 27-68 58-82Z" fill="var(--map-park)"/>' +
      '<path d="M920 636c80-35 180 3 196 70 12 52-38 93-114 89-89-5-139-63-112-110 8-15 18-35 30-49Z" fill="var(--map-park-deep)"/>' +
      '<path d="M74 636c28-32 91-43 129-15 42 31 31 87-18 108-52 23-119-1-129-42-5-19 3-36 18-51Z" fill="var(--map-water)"/>' +
      '<path d="M94 650c22-17 64-18 87-2" fill="none" stroke="var(--map-water-light)" stroke-width="3" stroke-linecap="round" opacity=".8"/>' +
      road("M40 380H1160") +
      road("M600 26V734") +
      '<ellipse cx="600" cy="380" rx="320" ry="225" fill="none" stroke="var(--map-road-edge)" stroke-width="48"/>' +
      '<ellipse cx="600" cy="380" rx="320" ry="225" fill="none" stroke="var(--map-road)" stroke-width="38"/>' +
      '<ellipse cx="600" cy="380" rx="320" ry="225" fill="none" stroke="var(--map-road-line)" stroke-width="2" stroke-dasharray="8 11" opacity=".7"/>' +
      sidePath("M350 300L312 238") +
      sidePath("M520 210L478 168") +
      sidePath("M680 210L722 168") +
      sidePath("M850 300L895 234") +
      sidePath("M984 412L956 432") +
      sidePath("M842 544L826 574") +
      sidePath("M620 611V636") +
      sidePath("M392 548L386 575") +
      sidePath("M284 442L260 432") +
      '<circle cx="600" cy="380" r="132" fill="var(--map-plaza)" stroke="var(--map-road-line)" stroke-width="2"/>' +
      '<circle cx="600" cy="380" r="97" fill="var(--map-plaza-inner)"/>' +
      '<circle cx="600" cy="500" r="17" fill="var(--map-water)" stroke="var(--map-water-light)" stroke-width="2"/>' +
      '<circle cx="600" cy="500" r="6" fill="var(--map-water-light)"/>' +
      '<path d="M531 325c14-12 32-12 45 0M624 325c14-12 32-12 45 0" fill="none" stroke="var(--map-tree-dark)" stroke-width="2" stroke-linecap="round" opacity=".55"/>' +
      '<text x="600" y="62" class="map-district" text-anchor="middle">Quartier des organisations</text>' +
      '<text x="1110" y="385" class="map-district" text-anchor="middle" transform="rotate(90 1110 385)">Place des partenaires</text>' +
      '<text x="600" y="744" class="map-district" text-anchor="middle">Allée des particuliers</text>' +
      mapTree(110, 118, 1.05) +
      mapTree(168, 88, 0.9) +
      mapTree(205, 186, 0.8) +
      mapTree(1000, 112, 0.9) +
      mapTree(1062, 158, 1.05) +
      mapTree(1100, 470, 0.85) +
      mapTree(1040, 666, 1) +
      mapTree(955, 646, 0.8) +
      mapTree(160, 674, 0.9) +
      mapTree(218, 704, 0.72) +
      mapTree(66, 402, 0.78) +
      mapTree(1128, 628, 0.8) +
      (center ? buildingMarkup(center) : "") +
      others.map(buildingMarkup).join("") +
      emptyPlotMarkup(420, 304) +
      emptyPlotMarkup(780, 462) +
      "</g>";
  }

  function openSponsor(sponsor) {
    if (!sponsor) return;
    if (sponsor.url) {
      window.open(sponsor.url, "_blank", "noopener");
      return;
    }
    openSponsorSheet(sponsor);
  }

  function openSponsorSheet(sponsor) {
    var sheet = document.querySelector("[data-sponsor-sheet]");
    var body = document.querySelector("[data-sponsor-sheet-body]");
    if (!sheet || !body) return;

    body.innerHTML =
      '<div class="sponsor-sheet-head">' +
      '<span class="sponsor-avatar" style="' + accentStyle(sponsor) + '">' + esc(sponsor.initials) + "</span>" +
      "<div><h2 id=\"sponsor-sheet-title\">" + esc(sponsor.name) + "</h2><span class=\"sponsor-sheet-type\">" + esc(sponsor.typeLabel) + " · " + esc(sponsor.tier) + "</span></div>" +
      '<button type="button" class="sponsor-sheet-close" data-sheet-close aria-label="Fermer">×</button>' +
      "</div>" +
      "<p>" + esc(sponsor.description) + "</p>" +
      '<div class="sponsor-tags">' +
      sponsor.sponsorship
        .map(function (item) {
          return "<span>" + esc(item) + "</span>";
        })
        .join("") +
      "</div>" +
      '<p class="sponsor-empty-note">Sponsor simulé pour la maquette. Son site ou son chatbot réel sera relié à la validation.</p>' +
      '<div class="sponsor-sheet-actions">' +
      '<button type="button" class="site-button site-button-sm" data-sheet-close>Fermer</button>' +
      '<button type="button" class="site-button site-button-sm site-button-ghost" data-open-chat>Devenir sponsor</button>' +
      "</div>";

    if (typeof sheet.showModal === "function") {
      sheet.showModal();
    } else {
      sheet.setAttribute("open", "");
    }
  }

  function showHover(sponsor) {
    var hover = document.querySelector("[data-map-hover]");
    if (!hover) return;
    hover.innerHTML =
      '<span class="map-hover-avatar" style="' + accentStyle(sponsor) + '">' + esc(sponsor.initials) + "</span>" +
      "<span><strong>" + esc(sponsor.name) + "</strong><span>" + esc(sponsor.typeLabel) + " · " + esc(sponsor.sponsorship.join(", ")) + "</span><em>" +
      (sponsor.url ? "Ouvrir le site" : "Voir la fiche") +
      " →</em></span>";
    hover.classList.add("is-visible");
  }

  function hideHover() {
    var hover = document.querySelector("[data-map-hover]");
    if (hover) hover.classList.remove("is-visible");
  }

  function initMap() {
    var map = document.querySelector("[data-town-map]");
    var stage = document.querySelector("[data-town-stage]");
    if (!map || !stage) return;

    renderMap();

    function sponsorFromEvent(event) {
      var target = event.target.closest("[data-sponsor-id]");
      return target ? byId[target.getAttribute("data-sponsor-id")] : null;
    }

    map.addEventListener("pointerover", function (event) {
      var sponsor = sponsorFromEvent(event);
      if (sponsor) showHover(sponsor);
    });

    map.addEventListener("pointerout", function (event) {
      if (!map.contains(event.relatedTarget)) hideHover();
    });

    map.addEventListener("focusin", function (event) {
      var sponsor = sponsorFromEvent(event);
      if (sponsor) showHover(sponsor);
    });

    map.addEventListener("focusout", hideHover);

    map.addEventListener("click", function (event) {
      if (event.target.closest("[data-empty-plot]")) {
        openChat();
        return;
      }
      var sponsor = sponsorFromEvent(event);
      if (sponsor) openSponsor(sponsor);
    });

    map.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("[data-empty-plot]")) {
        event.preventDefault();
        openChat();
        return;
      }
      var sponsor = sponsorFromEvent(event);
      if (sponsor) {
        event.preventDefault();
        openSponsor(sponsor);
      }
    });

    var viewport = stage.querySelector(".town-viewport");
    function centerMap() {
      if (!viewport) return;
      var max = viewport.scrollWidth - viewport.clientWidth;
      if (max > 0) viewport.scrollLeft = max / 2;
    }

    centerMap();
    window.addEventListener("resize", centerMap);
    window.setTimeout(centerMap, 160);

    var toggle = document.querySelector("[data-view-toggle]");
    var viewStatus = document.querySelector("[data-view-status]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var is3d = stage.classList.toggle("is-3d");
        toggle.setAttribute("aria-pressed", String(is3d));
        var label = toggle.querySelector("[data-view-label]");
        if (label) label.textContent = is3d ? "Vue 2D" : "Vue 3D";
        if (viewStatus) {
          viewStatus.textContent = is3d
            ? "Vue 3D isométrique activée. Cliquez à nouveau pour revenir à la carte 2D."
            : "Vue 2D activée.";
        }
        centerMap();
      });
    }
  }

  function initSheets() {
    var sheet = document.querySelector("[data-sponsor-sheet]");
    if (sheet) {
      sheet.addEventListener("click", function (event) {
        if (event.target === sheet) {
          sheet.close();
        }
        if (event.target.closest("[data-sheet-close]")) {
          sheet.close();
        }
        if (event.target.closest("[data-open-chat]")) {
          sheet.close();
          openChat();
        }
      });
    }
  }

  var chatState = {
    phase: "name",
    data: {
      name: "",
      type: "",
      org: "",
      email: "",
      phone: "",
      sponsorship: "",
      consent: false
    }
  };

  function resetChat() {
    chatState.phase = "name";
    chatState.data = {
      name: "",
      type: "",
      org: "",
      email: "",
      phone: "",
      sponsorship: "",
      consent: false
    };
  }

  function progressFor(phase) {
    if (phase === "name") return 22;
    if (phase === "type" || phase === "org") return 42;
    if (phase === "contact") return 62;
    if (phase === "sponsorship") return 82;
    return 100;
  }

  function buildTranscript() {
    var data = chatState.data;
    var phase = chatState.phase;
    var messages = [];
    function add(who, text) {
      messages.push({ who: who, text: text });
    }

    add("bot", "Bonjour, je suis le guide de la Ville ONIR. Je vais vous poser quelques questions pour préparer votre demande de sponsoring.");
    add("bot", "Quel est votre nom complet ?");

    if (phase === "name") return messages;
    add("user", data.name);
    add("bot", "Vous êtes une personne physique ou une organisation ?");

    if (phase === "type") return messages;
    add("user", typeLabel(data.type));

    if (data.type !== "person") {
      add("bot", "Quel est le nom de votre organisation ?");
      if (phase === "org") return messages;
      add("user", data.org);
    }

    add("bot", "Comment peut-on vous contacter ? Laissez un email et, si vous le souhaitez, un téléphone.");
    if (phase === "contact") return messages;
    add("user", data.email + (data.phone ? " · " + data.phone : ""));
    add("bot", "Quel type de sponsoring souhaitez-vous apporter ?");
    if (phase === "sponsorship") return messages;
    add("user", data.sponsorship);
    add("bot", "Merci. Vérifiez la synthèse ci-dessous et envoyez votre demande.");
    return messages;
  }

  function controlsMarkup() {
    var data = chatState.data;
    var phase = chatState.phase;

    if (phase === "name") {
      return (
        '<form class="chat-form" data-chat-form="name">' +
        '<div class="chat-field"><label for="chat-name">Nom complet</label><input id="chat-name" name="name" autocomplete="name" required value="' + esc(data.name) + '" placeholder="Aina Rakoto" /></div>' +
        '<div class="chat-actions"><button type="submit" class="chat-submit">Continuer</button></div>' +
        "</form>"
      );
    }

    if (phase === "type") {
      return (
        '<div class="chat-actions" role="group" aria-label="Type de sponsor">' +
        '<button type="button" class="chat-choice" data-chat-type="person">Personne physique</button>' +
        '<button type="button" class="chat-choice" data-chat-type="company">Entreprise</button>' +
        '<button type="button" class="chat-choice" data-chat-type="society">Société</button>' +
        '<button type="button" class="chat-choice" data-chat-type="organization">Organisation</button>' +
        "</div>" +
        '<button type="button" class="chat-back" data-chat-back>← Retour</button>'
      );
    }

    if (phase === "org") {
      return (
        '<form class="chat-form" data-chat-form="org">' +
        '<div class="chat-field"><label for="chat-org">Nom de l’organisation</label><input id="chat-org" name="org" autocomplete="organization" required value="' + esc(data.org) + '" placeholder="Atelier Moringa" /></div>' +
        '<div class="chat-actions"><button type="submit" class="chat-submit">Continuer</button></div>' +
        "</form>" +
        '<button type="button" class="chat-back" data-chat-back>← Retour</button>'
      );
    }

    if (phase === "contact") {
      return (
        '<form class="chat-form" data-chat-form="contact">' +
        '<div class="chat-field"><label for="chat-email">Email</label><input id="chat-email" name="email" type="email" autocomplete="email" required value="' + esc(data.email) + '" placeholder="vous@exemple.com" /></div>' +
        '<div class="chat-field"><label for="chat-phone">Téléphone (optionnel)</label><input id="chat-phone" name="phone" type="tel" autocomplete="tel" value="' + esc(data.phone) + '" placeholder="+261 …" /></div>' +
        '<div class="chat-actions"><button type="submit" class="chat-submit">Continuer</button></div>' +
        "</form>" +
        '<button type="button" class="chat-back" data-chat-back>← Retour</button>'
      );
    }

    if (phase === "sponsorship") {
      var choices = ["Financier", "Matériel", "Hébergement", "Expertise", "Visibilité", "Autre"];
      return (
        '<div class="chat-actions" role="group" aria-label="Type de sponsoring">' +
        choices
          .map(function (choice) {
            return '<button type="button" class="chat-choice" data-chat-sponsorship="' + choice + '">' + choice + "</button>";
          })
          .join("") +
        "</div>" +
        '<button type="button" class="chat-back" data-chat-back>← Retour</button>'
      );
    }

    if (phase === "recap") {
      return (
        '<div class="chat-summary">' +
        "<div><dt>Nom</dt><dd>" + esc(data.name) + "</dd></div>" +
        "<div><dt>Type</dt><dd>" + esc(typeLabel(data.type)) + "</dd></div>" +
        (data.type !== "person" ? "<div><dt>Organisation</dt><dd>" + esc(data.org) + "</dd></div>" : "") +
        "<div><dt>Email</dt><dd>" + esc(data.email) + "</dd></div>" +
        (data.phone ? "<div><dt>Téléphone</dt><dd>" + esc(data.phone) + "</dd></div>" : "") +
        "<div><dt>Soutien</dt><dd>" + esc(data.sponsorship) + "</dd></div>" +
        "</div>" +
        '<label class="chat-consent"><input type="checkbox" data-chat-consent' + (data.consent ? " checked" : "") + ' /> J’accepte que ces informations soient utilisées pour recontacter ma demande de sponsoring. <a href="/confidentialite-site/" target="_blank" rel="noreferrer">Confidentialité</a></label>' +
        '<p class="chat-hint">Maquette : l’envoi est simulé et aucune donnée n’est transmise.</p>' +
        '<div class="chat-actions"><button type="button" class="chat-submit" data-chat-send>Envoyer la demande</button></div>' +
        '<button type="button" class="chat-back" data-chat-back>← Retour</button>' +
        '<p class="chat-error" data-chat-error hidden></p>'
      );
    }

    return (
      '<div class="chat-success">' +
      '<span class="chat-success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg></span>' +
      "<strong>Merci " + esc(data.name) + ".</strong>" +
      "<p>Votre demande de sponsoring est prête. Dans la version connectée, elle sera envoyée à l’équipe ONIR CMS.</p>" +
      '<p class="chat-hint">Maquette : aucune donnée n’a été envoyée.</p>' +
      '<div class="chat-actions"><button type="button" class="chat-submit" data-chat-close>Revenir à la ville</button><button type="button" class="chat-back" data-chat-reset>Recommencer</button></div>' +
      "</div>"
    );
  }

  function renderChat() {
    var log = document.querySelector("[data-chat-log]");
    var controls = document.querySelector("[data-chat-controls]");
    var bar = document.querySelector("[data-chat-progress-bar]");
    var label = document.querySelector("[data-chat-progress-label]");
    if (!log || !controls) return;

    log.innerHTML = buildTranscript()
      .map(function (message) {
        return '<p class="chat-bubble chat-bubble-' + message.who + '">' + esc(message.text) + "</p>";
      })
      .join("");
    controls.innerHTML = controlsMarkup();
    if (bar) bar.style.width = progressFor(chatState.phase) + "%";

    if (label) {
      var step = chatState.phase === "name" ? 1 : chatState.phase === "type" || chatState.phase === "org" ? 2 : chatState.phase === "contact" ? 3 : 4;
      label.textContent = chatState.phase === "success" ? "Demande prête" : "Étape " + step + " sur 4";
    }

    log.scrollTop = log.scrollHeight;

    var firstInput = controls.querySelector("input, textarea");
    if (firstInput) {
      window.setTimeout(function () {
        firstInput.focus();
      }, 60);
    }
  }

  function openChat() {
    var dialog = document.querySelector("[data-sponsor-chat]");
    if (!dialog) return;
    if (chatState.phase === "success") resetChat();
    renderChat();
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeChat() {
    var dialog = document.querySelector("[data-sponsor-chat]");
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function initChat() {
    var dialog = document.querySelector("[data-sponsor-chat]");
    if (!dialog) return;

    document.querySelectorAll("[data-open-chat]").forEach(function (button) {
      button.addEventListener("click", openChat);
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeChat();
        return;
      }
      if (event.target.closest("[data-chat-close]")) {
        closeChat();
        return;
      }
      if (event.target.closest("[data-chat-reset]")) {
        resetChat();
        renderChat();
        return;
      }
      if (event.target.closest("[data-chat-back]")) {
        var map = {
          type: "name",
          org: "type",
          contact: chatState.data.type === "person" ? "type" : "org",
          sponsorship: "contact",
          recap: "sponsorship"
        };
        chatState.phase = map[chatState.phase] || "name";
        renderChat();
        return;
      }
      var typeButton = event.target.closest("[data-chat-type]");
      if (typeButton) {
        chatState.data.type = typeButton.getAttribute("data-chat-type");
        chatState.phase = chatState.data.type === "person" ? "contact" : "org";
        renderChat();
        return;
      }
      var supportButton = event.target.closest("[data-chat-sponsorship]");
      if (supportButton) {
        chatState.data.sponsorship = supportButton.getAttribute("data-chat-sponsorship");
        chatState.phase = "recap";
        renderChat();
        return;
      }
      if (event.target.closest("[data-chat-send]")) {
        var consent = dialog.querySelector("[data-chat-consent]");
        var error = dialog.querySelector("[data-chat-error]");
        if (!consent || !consent.checked) {
          if (error) {
            error.hidden = false;
            error.textContent = "Merci de cocher la case de consentement avant d’envoyer.";
          }
          return;
        }
        chatState.data.consent = true;
        chatState.phase = "success";
        renderChat();
      }
    });

    dialog.addEventListener("submit", function (event) {
      var form = event.target.closest("[data-chat-form]");
      if (!form) return;
      event.preventDefault();
      var formName = form.getAttribute("data-chat-form");
      var data = new FormData(form);

      if (formName === "name") {
        var name = String(data.get("name") || "").trim();
        if (name.length < 2) return;
        chatState.data.name = name;
        chatState.phase = "type";
        renderChat();
        return;
      }

      if (formName === "org") {
        var org = String(data.get("org") || "").trim();
        if (org.length < 2) return;
        chatState.data.org = org;
        chatState.phase = "contact";
        renderChat();
        return;
      }

      if (formName === "contact") {
        var email = String(data.get("email") || "").trim();
        var phone = String(data.get("phone") || "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
        chatState.data.email = email;
        chatState.data.phone = phone;
        chatState.phase = "sponsorship";
        renderChat();
      }
    });

    dialog.addEventListener("change", function (event) {
      if (event.target.matches("[data-chat-consent]")) {
        chatState.data.consent = event.target.checked;
        var error = dialog.querySelector("[data-chat-error]");
        if (error) error.hidden = true;
      }
    });
  }

  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-tab]"));
    if (!tabs.length) return;
    var panels = Array.prototype.slice.call(document.querySelectorAll("[data-panel]"));

    function activate(name, focus, updateHash) {
      tabs.forEach(function (tab) {
        var selected = tab.getAttribute("data-tab") === name;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focus) tab.focus();
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-panel") !== name;
      });
      if (updateHash) {
        try {
          history.replaceState(null, "", "#" + name);
        } catch (error) {
          /* URL non modifiable */
        }
      }
      if (name === "sponsor") {
        window.setTimeout(function () {
          window.dispatchEvent(new Event("resize"));
        }, 30);
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab.getAttribute("data-tab"), false, true);
      });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var next = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
        activate(tabs[next].getAttribute("data-tab"), true, true);
      });
    });

    var initial = window.location.hash.replace("#", "");
    activate(initial === "developpeur" ? "developpeur" : "sponsor", false, false);

    window.addEventListener("hashchange", function () {
      var name = window.location.hash.replace("#", "");
      activate(name === "developpeur" ? "developpeur" : "sponsor", false, false);
    });
  }

  initTabs();
  initMap();
  initSheets();
  initChat();
})();
