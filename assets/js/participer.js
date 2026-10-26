(function () {
  "use strict";

  var sponsors = window.ONIR_SPONSORS || [];
  var byId = {};
  sponsors.forEach(function (sponsor) {
    byId[sponsor.id] = sponsor;
  });
  var partnerChatUrl = document.querySelector("[data-partner-chat-url]")?.getAttribute("data-partner-chat-url") || "";

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

  function mapTree(x, y, scale, variant) {
    var s = scale || 1;
    var kind = variant || "round";
    var shadow = '<ellipse cx="0" cy="3" rx="16" ry="5" fill="var(--map-shadow)" opacity=".35"/>';
    var art = "";

    if (kind === "pine") {
      art =
        '<rect x="-2.5" y="-5" width="5" height="18" rx="1.5" fill="var(--map-tree-dark)"/>' +
        '<path d="M0 -50 16 -26H-16Z" fill="var(--map-tree-dark)"/>' +
        '<path d="M0 -38 14 -17H-14Z" fill="var(--map-tree)"/>' +
        '<path d="M0 -27 11 -10H-11Z" fill="var(--map-tree-dark)"/>';
    } else if (kind === "bush") {
      art =
        '<circle cx="-11" cy="-8" r="11" fill="var(--map-tree)"/>' +
        '<circle cx="7" cy="-10" r="13" fill="var(--map-tree-dark)"/>' +
        '<circle cx="1" cy="-20" r="10" fill="var(--map-tree)"/>' +
        '<circle cx="-3" cy="-11" r="5" fill="#ffffff" opacity=".16"/>';
    } else {
      art =
        '<rect x="-2.5" y="-5" width="5" height="17" rx="1.8" fill="var(--map-tree-dark)"/>' +
        '<circle cx="-9" cy="-13" r="13" fill="var(--map-tree-dark)"/>' +
        '<circle cx="8" cy="-12" r="12" fill="var(--map-tree)"/>' +
        '<circle cx="0" cy="-24" r="13" fill="var(--map-tree)"/>' +
        '<circle cx="-5" cy="-17" r="6" fill="#ffffff" opacity=".16"/>' +
        '<circle cx="9" cy="-20" r="4" fill="var(--map-tree-dark)" opacity=".5"/>';
    }

    return '<g transform="translate(' + x + " " + y + ') scale(' + s + ')" aria-hidden="true">' + shadow + art + "</g>";
  }

  function mapBush(x, y, scale) {
    return mapTree(x, y, scale || 0.52, "bush");
  }

  function mapFlowerBed(x, y, scale) {
    var s = scale || 1;
    return (
      '<g transform="translate(' + x + " " + y + ') scale(' + s + ')" aria-hidden="true">' +
      '<ellipse cx="0" cy="0" rx="24" ry="9" fill="var(--map-park-deep)"/>' +
      '<circle cx="-14" cy="-2" r="3" fill="#e68b56"/><circle cx="-5" cy="2" r="2.5" fill="#f3c35a"/>' +
      '<circle cx="5" cy="-2" r="3" fill="#d86f55"/><circle cx="14" cy="2" r="2.5" fill="#f0a34c"/>' +
      '<path d="M-18 3c3-4 5-4 8 0M2 5c3-4 5-4 8 0" fill="none" stroke="var(--map-tree-dark)" stroke-width="1.2" stroke-linecap="round"/>' +
      "</g>"
    );
  }

  function mapLamp(x, y, scale) {
    var s = scale || 1;
    return (
      '<g transform="translate(' + x + " " + y + ') scale(' + s + ')" aria-hidden="true">' +
      '<ellipse cx="0" cy="2" rx="8" ry="3" fill="var(--map-shadow)" opacity=".35"/>' +
      '<path d="M0 0V-38" stroke="#63746a" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M0-38h12" stroke="#63746a" stroke-width="2.5" stroke-linecap="round"/>' +
      '<circle cx="13" cy="-38" r="9" fill="#ffc46b" opacity=".16"/>' +
      '<circle cx="13" cy="-38" r="4" fill="#ffc46b" stroke="#a96c22" stroke-width=".8"/>' +
      "</g>"
    );
  }

  function mapBench(x, y, angle) {
    return (
      '<g transform="translate(' + x + " " + y + ') rotate(' + (angle || 0) + ')" aria-hidden="true">' +
      '<ellipse cx="0" cy="4" rx="21" ry="4" fill="var(--map-shadow)" opacity=".3"/>' +
      '<rect x="-20" y="-4" width="40" height="5" rx="2" fill="#a97745"/>' +
      '<rect x="-19" y="-13" width="38" height="4" rx="2" fill="#bd8b55"/>' +
      '<path d="M-13 1v7M13 1v7M-16-3v6M16-3v6" stroke="#6f5c49" stroke-width="2" stroke-linecap="round"/>' +
      "</g>"
    );
  }

  function crosswalk(x, y, angle) {
    var bars = "";
    for (var i = 0; i < 5; i += 1) {
      bars += '<rect x="' + (-24 + i * 12) + '" y="-14" width="5" height="28" rx="1" fill="#f7f1e2" opacity=".9"/>';
    }
    return '<g transform="translate(' + x + " " + y + ') rotate(' + (angle || 0) + ')" aria-hidden="true">' + bars + "</g>";
  }

  function roadName(text, x, y, angle) {
    return (
      '<text x="' + x + '" y="' + y + '" class="map-street" text-anchor="middle" transform="rotate(' + (angle || 0) + " " + x + " " + y + ')">' +
      esc(text) +
      "</text>"
    );
  }

  function mapCompass(x, y) {
    return (
      '<g transform="translate(' + x + " " + y + ')" aria-hidden="true">' +
      '<circle r="27" fill="var(--map-paper)" stroke="var(--map-road-line)" stroke-width="1.2" opacity=".82"/>' +
      '<circle r="21" fill="none" stroke="var(--map-road-line)" stroke-width=".7" stroke-dasharray="2 4" opacity=".7"/>' +
      '<path d="M0 -17 6 1 0 -3 -6 1Z" fill="#f08000"/>' +
      '<path d="M0 15 4 3 0 5 -4 3Z" fill="var(--map-muted)" opacity=".55"/>' +
      '<text x="0" y="22" text-anchor="middle" fill="var(--map-muted)" font-size="8" font-weight="800" letter-spacing=".12em">N</text>' +
      "</g>"
    );
  }

  function road(d) {
    return (
      '<path d="' + d + '" fill="none" stroke="var(--map-road-edge)" stroke-width="56" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="var(--map-sidewalk)" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="var(--map-road)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="var(--map-road-line)" stroke-width="1.8" stroke-dasharray="8 12" stroke-linecap="round" opacity=".75"/>'
    );
  }

  function sidePath(d) {
    return (
      '<path d="' + d + '" fill="none" stroke="var(--map-road-edge)" stroke-width="22" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="var(--map-sidewalk)" stroke-width="17" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="var(--map-road)" stroke-width="11" stroke-linecap="round"/>'
    );
  }

  function buildingDims(sponsor) {
    if (sponsor.building === "tower") return { w: 196, h: 164 };
    if (sponsor.building === "house") return { w: 96, h: 96 };
    if (sponsor.size === "md") return { w: 116, h: 108 };
    return { w: 98, h: 96 };
  }

  function plotArt(w, kind) {
    var half = w / 2;
    var paved = kind === "house" ? "#d8d0bd" : "#d4cdbd";
    var lawn = kind === "house" ? "#b7cba6" : "#c5d4b8";
    var art =
      '<rect x="' + (-half - 27) + '" y="-3" width="' + (w + 54) + '" height="14" rx="3" fill="' + lawn + '"/>' +
      '<rect x="' + (-half - 19) + '" y="-1" width="' + (w + 38) + '" height="10" rx="2" fill="' + paved + '" stroke="#b4a991" stroke-width=".8"/>';
    for (var i = -half - 12; i < half + 20; i += 16) {
      art += '<path d="M' + i + ' 0v7" stroke="#bdb39e" stroke-width=".7" opacity=".75"/>';
    }
    art += '<path d="M' + (-half - 18) + ' 5H' + (half + 18) + '" stroke="#c7bda7" stroke-width=".8" opacity=".8"/>';
    return art;
  }

  function glassWindow(x, y, w, h, frame) {
    var f = frame || "#252a2c";
    return (
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="1.2" fill="' + f + '"/>' +
      '<rect x="' + (x + 2.5) + '" y="' + (y + 2.5) + '" width="' + (w - 5) + '" height="' + (h - 5) + '" fill="url(#glass-grad)"/>' +
      '<path d="M' + (x + 2.5) + " " + (y + h - 5) + "L" + (x + w - 4) + " " + (y + 3) + '" stroke="#b7d3d3" stroke-width="1" opacity=".28"/>' +
      '<path d="M' + (x + w / 3) + " " + (y + 2.5) + "v" + (h - 5) + "M" + (x + (w * 2) / 3) + " " + (y + 2.5) + "v" + (h - 5) + '" stroke="' + f + '" stroke-width="1.6"/>'
    );
  }

  function houseArt(sponsor, w) {
    var half = w / 2;
    var accent = sponsor.accent;
    var bodyH = 52;
    var roofPeak = -84;
    return (
      '<ellipse cx="0" cy="8" rx="' + (half + 20) + '" ry="8" fill="var(--map-shadow)" opacity=".35"/>' +
      plotArt(w, "house") +
      '<rect x="' + (-half - 9) + '" y="-5" width="' + (w + 18) + '" height="7" rx="2" fill="#c4d3b2"/>' +
      '<rect x="' + (-half) + '" y="' + (-bodyH) + '" width="' + w + '" height="' + bodyH + '" rx="1.5" fill="url(#wall-cream)" stroke="#746b5d" stroke-width="1"/>' +
      '<rect x="' + (-half) + '" y="-17" width="' + w + '" height="17" fill="url(#stone-base)" stroke="#746b5d" stroke-width=".8"/>' +
      '<path d="M' + (-half - 9) + " " + (-bodyH) + "L0 " + roofPeak + "L" + (half + 9) + " " + (-bodyH) + 'Z" fill="#30363a" stroke="#202426" stroke-width="1"/>' +
      '<path d="M' + (-half - 9) + " " + (-bodyH) + "L0 " + roofPeak + "L" + (half + 9) + " " + (-bodyH) + 'Z" fill="url(#roof-tile)" opacity=".55"/>' +
      '<path d="M' + (-half - 11) + " " + (-bodyH) + "H" + (half + 11) + '" stroke="#b28150" stroke-width="2.2"/>' +
      '<path d="M' + (-half - 10) + " " + (-bodyH) + "L0 " + (roofPeak + 1) + "L" + (half + 10) + " " + (-bodyH) + '" fill="none" stroke="#9b6f44" stroke-width="1.1" opacity=".8"/>' +
      '<path d="M0 ' + roofPeak + 'V' + (roofPeak + 6) + '" stroke="#1d2123" stroke-width="2"/>' +
      '<rect x="' + (half - 24) + '" y="-97" width="12" height="29" rx="1" fill="url(#stone-base)" stroke="#6e6659" stroke-width="1"/>' +
      '<rect x="' + (half - 28) + '" y="-99" width="20" height="4" rx="1" fill="#2b3033"/>' +
      '<rect x="' + (-half + 10) + '" y="-44" width="37" height="21" rx="1" fill="#252a2c"/>' +
      '<rect x="' + (-half + 12) + '" y="-42" width="33" height="17" fill="url(#glass-grad)"/>' +
      '<path d="M' + (-half + 23) + ' -42v17M' + (-half + 34) + ' -42v17M' + (-half + 12) + ' -32h33" stroke="#202426" stroke-width="1.2"/>' +
      '<path d="M' + (-half + 12) + ' -41h33" stroke="#f3eee2" stroke-width="3" opacity=".35"/>' +
      '<rect x="' + (-half + 8) + '" y="-23" width="41" height="2" rx="1" fill="#b7ad98"/>' +
      '<rect x="' + (half - 51) + '" y="-44" width="37" height="21" rx="1" fill="#252a2c"/>' +
      '<rect x="' + (half - 49) + '" y="-42" width="33" height="17" fill="url(#glass-grad)"/>' +
      '<path d="M' + (half - 38) + ' -42v17M' + (half - 27) + ' -42v17M' + (half - 49) + ' -32h33" stroke="#202426" stroke-width="1.2"/>' +
      '<path d="M' + (half - 49) + ' -41h33" stroke="#f3eee2" stroke-width="3" opacity=".35"/>' +
      '<rect x="' + (half - 53) + '" y="-23" width="41" height="2" rx="1" fill="#b7ad98"/>' +
      '<rect x="' + (-half + 18) + '" y="-76" width="12" height="12" fill="#252a2c" stroke="#b28150" stroke-width="1"/>' +
      '<rect x="' + (-half + 19) + '" y="-75" width="10" height="10" fill="url(#glass-grad)"/>' +
      '<rect x="-23" y="-46" width="46" height="7" rx="2" fill="#a97745"/>' +
      '<path d="M-28 -46 0 -60 28 -46Z" fill="#30363a" stroke="#202426" stroke-width="1"/>' +
      '<path d="M-28 -46 0 -60 28 -46Z" fill="url(#roof-tile)" opacity=".55"/>' +
      '<rect x="-25" y="-43" width="8" height="43" fill="url(#stone-base)" stroke="#6e6659" stroke-width=".8"/>' +
      '<rect x="17" y="-43" width="8" height="43" fill="url(#stone-base)" stroke="#6e6659" stroke-width=".8"/>' +
      '<rect x="-11" y="-37" width="22" height="37" rx="1" fill="#8b5a37" stroke="#5f3d27" stroke-width="1"/>' +
      '<path d="M-11 -27h22M-11 -17h22M-11 -7h22" stroke="#6c442b" stroke-width=".9"/>' +
      '<circle cx="7" cy="-18" r="1.6" fill="#d8c7a8"/>' +
      '<path d="M-26 0h52" stroke="#a99d87" stroke-width="2"/>' +
      '<path d="M-30 4h60M-34 8h68" stroke="#c4baa6" stroke-width="3"/>' +
      '<path d="M' + (-half + 1) + ' -52V0M' + (half - 1) + ' -52V0" stroke="#2b3033" stroke-width="1.6" opacity=".9"/>' +
      '<path d="M' + (-half + 1) + ' 0h5M' + (half - 6) + ' 0h5" stroke="#2b3033" stroke-width="2"/>' +
      '<rect x="-14" y="-54" width="28" height="8" rx="4" fill="' + accent + '"/>' +
      '<text x="0" y="-48" text-anchor="middle" fill="#fff" font-size="6.5" font-weight="800">' + esc(sponsor.initials) + "</text>" +
      '<rect x="' + (-half + 18) + '" y="-13" width="16" height="5" rx="1" fill="#8b5a37" opacity=".7"/>' +
      mapBush(-half - 12, 0, 0.55) +
      mapBush(half + 12, 0, 0.5) +
      mapFlowerBed(-half + 26, 2, 0.45) +
      mapFlowerBed(half - 28, 2, 0.4)
    );
  }

  function officeWindow(x, y, w, h) {
    return (
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#252a2c"/>' +
      '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="' + (w - 4) + '" height="' + (h - 4) + '" fill="url(#glass-grad)"/>' +
      '<path d="M' + (x + 2) + " " + (y + h - 4) + "L" + (x + w - 4) + " " + (y + 2) + '" stroke="#c4dcd9" stroke-width="1" opacity=".25"/>' +
      '<path d="M' + (x + w / 2) + " " + (y + 2) + "v" + (h - 4) + "M" + (x + 2) + " " + (y + h / 2) + "h" + (w - 4) + '" stroke="#202426" stroke-width="1.2"/>'
    );
  }

  function orgArt(sponsor, w, h) {
    var half = w / 2;
    var accent = sponsor.accent;
    var bodyH = h - 12;
    var floor = bodyH / 3;
    var art =
      '<ellipse cx="0" cy="8" rx="' + (half + 22) + '" ry="8" fill="var(--map-shadow)" opacity=".38"/>' +
      plotArt(w, "organization") +
      '<rect x="' + (-half - 8) + '" y="-6" width="' + (w + 16) + '" height="7" rx="1" fill="#b7cba6"/>' +
      '<rect x="' + (-half) + '" y="' + (-bodyH) + '" width="' + w + '" height="' + bodyH + '" fill="url(#office-wall)" stroke="#6e6b63" stroke-width="1"/>' +
      '<rect x="' + (-half) + '" y="' + (-bodyH) + '" width="' + w + '" height="' + bodyH + '" fill="url(#office-panel)" opacity=".55"/>' +
      '<rect x="' + (-half) + '" y="-12" width="' + w + '" height="12" fill="url(#stone-base)" stroke="#6e6b63" stroke-width=".8"/>';
    for (var f = 1; f <= 2; f += 1) {
      art += '<path d="M' + (-half) + " " + (-bodyH + floor * f) + "H" + half + '" stroke="#7e7a70" stroke-width="1.2" opacity=".55"/>';
    }
    for (var row = 0; row < 3; row += 1) {
      var y = -bodyH + 13 + row * (floor - 1);
      art += officeWindow(-half + 9, y, 23, Math.min(19, floor - 8));
      art += officeWindow(-half + 38, y, 23, Math.min(19, floor - 8));
      art += officeWindow(half - 34, y, 28, Math.min(19, floor - 8));
    }
    art +=
      '<rect x="-14" y="' + (-bodyH + 5) + '" width="28" height="' + (bodyH - 5) + '" fill="#2b4a52" opacity=".82"/>' +
      '<path d="M0 ' + (-bodyH + 5) + 'v' + (bodyH - 5) + '" stroke="#1f2c30" stroke-width="1.4"/>' +
      '<rect x="-14" y="' + (-bodyH + 5) + '" width="28" height="' + (bodyH - 5) + '" fill="url(#glass-grad)" opacity=".35"/>' +
      '<rect x="-20" y="-12" width="40" height="12" rx="2" fill="#252a2c"/>' +
      '<rect x="-18" y="-10" width="36" height="10" fill="url(#glass-grad)" opacity=".8"/>' +
      '<path d="M0 -10v10" stroke="#202426" stroke-width="1"/>' +
      '<rect x="-25" y="-2" width="50" height="3" fill="#c3b9a5"/>' +
      '<rect x="-29" y="1" width="58" height="3" fill="#d0c6b1"/>' +
      '<rect x="' + (half - 38) + '" y="' + (-bodyH + 26) + '" width="29" height="20" rx="1" fill="#c4c0b6" stroke="#817c70" stroke-width=".8"/>' +
      '<path d="M' + (half - 34) + " " + (-bodyH + 40) + "h7m3 0h5m3 0h7M" + (half - 35) + " " + (-bodyH + 34) + "v12M" + (half - 25) + " " + (-bodyH + 31) + "v15M" + (half - 17) + " " + (-bodyH + 33) + "v11" + '" stroke="' + accent + '" stroke-width="1.1" opacity=".75"/>' +
      '<rect x="' + (-half - 8) + '" y="' + (-bodyH - 8) + '" width="' + (w + 16) + '" height="8" fill="#b9b7ae" stroke="#77736a" stroke-width=".8"/>' +
      '<path d="M' + (-half - 8) + " " + (-bodyH - 8) + "H" + (half + 8) + '" stroke="#d8d6ce" stroke-width="1.2"/>' +
      '<rect x="-26" y="' + (-bodyH - 23) + '" width="52" height="18" rx="1" fill="#b8b7b0" stroke="#77736a" stroke-width=".8"/>' +
      '<rect x="9" y="' + (-bodyH - 26) + '" width="28" height="11" rx="1" fill="#5c6a6d" stroke="#2e3335" stroke-width=".8"/>' +
      '<rect x="-17" y="' + (-bodyH - 27) + '" width="19" height="7" fill="#8fb3b1" stroke="#4d5b5d" stroke-width=".7"/>' +
      '<path d="M' + (-half + 7) + " " + (-bodyH - 10) + "h" + (w - 14) + '" stroke="#4a4d4c" stroke-width="1.2" opacity=".7"/>' +
      '<rect x="' + (-half + 16) + '" y="' + (-bodyH + 12) + '" width="' + (w - 32) + '" height="13" rx="4" fill="' + accent + '"/>' +
      '<text x="0" y="' + (-bodyH + 21.5) + '" text-anchor="middle" fill="#fff" font-size="7.5" font-weight="800" letter-spacing=".04em">' + esc(sponsor.initials) + "</text>" +
      '<rect x="' + (-half + 21) + '" y="-7" width="14" height="7" rx="1" fill="#8b5a37" opacity=".8"/>' +
      '<rect x="' + (half - 34) + '" y="-7" width="14" height="7" rx="1" fill="#8b5a37" opacity=".8"/>' +
      mapBush(-half - 14, 0, 0.5) +
      mapBush(half + 14, 0, 0.45) +
      mapBush(-half + 4, -3, 0.32) +
      mapFlowerBed(-half + 34, 1, 0.35);
    return art;
  }

  function towerArt(sponsor, w, h) {
    var half = w / 2;
    var accent = sponsor.accent;
    var bodyH = h - 14;
    var floor = bodyH / 3;
    var art =
      '<ellipse cx="0" cy="10" rx="' + (half + 30) + '" ry="10" fill="var(--map-shadow)" opacity=".4"/>' +
      plotArt(w, "organization") +
      '<rect x="' + (-half - 10) + '" y="-6" width="' + (w + 20) + '" height="7" rx="2" fill="#b7cba6"/>' +
      '<rect x="' + (-half) + '" y="' + (-bodyH) + '" width="' + w + '" height="' + bodyH + '" fill="url(#office-wall)" stroke="#6e6b63" stroke-width="1.2"/>' +
      '<rect x="' + (-half) + '" y="' + (-bodyH) + '" width="' + w + '" height="' + bodyH + '" fill="url(#office-panel)" opacity=".55"/>' +
      '<rect x="' + (-half) + '" y="-14" width="' + w + '" height="14" fill="url(#stone-base)" stroke="#6e6b63" stroke-width="1"/>';
    for (var f = 1; f <= 2; f += 1) {
      art += '<path d="M' + (-half) + " " + (-bodyH + floor * f) + "H" + half + '" stroke="#7e7a70" stroke-width="1.4" opacity=".55"/>';
    }
    for (var row = 0; row < 3; row += 1) {
      var y = -bodyH + 16 + row * (floor - 1);
      art += officeWindow(-half + 12, y, 28, Math.min(22, floor - 9));
      art += officeWindow(-half + 48, y, 28, Math.min(22, floor - 9));
      art += officeWindow(half - 42, y, 30, Math.min(22, floor - 9));
    }
    art +=
      '<rect x="-24" y="' + (-bodyH + 6) + '" width="48" height="' + (bodyH - 6) + '" fill="#2b4a52" opacity=".8"/>' +
      '<rect x="-24" y="' + (-bodyH + 6) + '" width="48" height="' + (bodyH - 6) + '" fill="url(#glass-grad)" opacity=".33"/>' +
      '<path d="M0 ' + (-bodyH + 6) + 'v' + (bodyH - 6) + '" stroke="#1f2c30" stroke-width="1.5"/>' +
      '<rect x="-33" y="-14" width="66" height="14" rx="2" fill="#252a2c"/>' +
      '<rect x="-30" y="-11" width="60" height="11" fill="url(#glass-grad)" opacity=".8"/>' +
      '<rect x="-38" y="-2" width="76" height="3" fill="#c3b9a5"/>' +
      '<rect x="-43" y="1" width="86" height="3" fill="#d0c6b1"/>' +
      '<rect x="' + (half - 54) + '" y="' + (-bodyH + 30) + '" width="34" height="23" rx="1" fill="#c4c0b6" stroke="#817c70" stroke-width=".8"/>' +
      '<path d="M' + (half - 49) + " " + (-bodyH + 47) + "h9m4 0h7m4 0h9M" + (half - 50) + " " + (-bodyH + 39) + "v14M" + (half - 36) + " " + (-bodyH + 35) + "v18M" + (half - 26) + " " + (-bodyH + 38) + "v14" + '" stroke="' + accent + '" stroke-width="1.2" opacity=".8"/>' +
      '<rect x="' + (-half - 10) + '" y="' + (-bodyH - 10) + '" width="' + (w + 20) + '" height="10" fill="#b9b7ae" stroke="#77736a" stroke-width=".9"/>' +
      '<path d="M' + (-half - 10) + " " + (-bodyH - 10) + "H" + (half + 10) + '" stroke="#d8d6ce" stroke-width="1.4"/>' +
      '<rect x="-44" y="' + (-bodyH - 30) + '" width="88" height="22" rx="1" fill="#b8b7b0" stroke="#77736a" stroke-width="1"/>' +
      '<rect x="20" y="' + (-bodyH - 34) + '" width="43" height="13" rx="1" fill="#5c6a6d" stroke="#2e3335" stroke-width=".9"/>' +
      '<rect x="-27" y="' + (-bodyH - 34) + '" width="28" height="9" fill="#8fb3b1" stroke="#4d5b5d" stroke-width=".8"/>' +
      '<path d="M' + (-half + 12) + " " + (-bodyH - 12) + "h" + (w - 24) + '" stroke="#4a4d4c" stroke-width="1.4" opacity=".7"/>' +
      '<path d="M' + (-half + 20) + " " + (-bodyH - 12) + "v-9M" + (half - 20) + " " + (-bodyH - 12) + "v-9" + '" stroke="#5f625f" stroke-width="1"/>' +
      '<rect x="-48" y="' + (-bodyH + 12) + '" width="96" height="15" rx="5" fill="' + accent + '"/>' +
      '<text x="0" y="' + (-bodyH + 23) + '" text-anchor="middle" fill="#fff" font-size="9.5" font-weight="800" letter-spacing=".1em">ONIR-CMS</text>' +
      '<rect x="' + (-half + 28) + '" y="-8" width="16" height="8" rx="1" fill="#8b5a37" opacity=".8"/>' +
      '<rect x="' + (half - 44) + '" y="-8" width="16" height="8" rx="1" fill="#8b5a37" opacity=".8"/>' +
      '<path d="M' + (half - 4) + ' -112V-141" stroke="#2b3033" stroke-width="2"/>' +
      '<path d="M' + (half - 4) + ' -141h27l-7 7 7 7h-27z" fill="' + accent + '"/>' +
      mapBush(-half - 16, 0, 0.58) +
      mapBush(half + 16, 0, 0.52) +
      mapBush(-half + 8, -4, 0.38) +
      mapFlowerBed(-half + 42, 1, 0.5) +
      mapFlowerBed(half - 42, 1, 0.45);
    return art;
  }

  function buildingMarkup(sponsor) {
    var dims = buildingDims(sponsor);
    var w = dims.w;
    var h = dims.h;
    var half = w / 2;
    var art = "";
    var labelY = 24;

    if (sponsor.building === "tower") {
      labelY = 34;
      art = towerArt(sponsor, w, h);
    } else if (sponsor.building === "house") {
      labelY = 25;
      art = houseArt(sponsor, w);
    } else {
      labelY = 25;
      art = orgArt(sponsor, w, h);
    }

    return (
      '<g class="sponsor-building" data-sponsor-id="' + esc(sponsor.id) + '" tabindex="0" role="link" aria-label="' +
      esc(sponsor.name + " — " + sponsor.typeLabel + " — " + sponsor.sponsorship.join(", ")) + '" transform="translate(' + sponsor.x + " " + sponsor.y + ')">' +
      "<title>" + esc(sponsor.name) + "</title>" +
      "<desc>" + esc(sponsor.typeLabel + ". " + sponsor.description) + "</desc>" +
      '<g class="building-art">' + art + "</g>" +
      '<rect class="hit-area" x="' + (-half - 18) + '" y="' + (-h - 24) + '" width="' + (w + 36) + '" height="' + (h + 44) + '" rx="10" fill="transparent"/>' +
      '<rect class="focus-ring" x="' + (-half - 14) + '" y="' + (-h - 18) + '" width="' + (w + 28) + '" height="' + (h + 32) + '" rx="9" fill="none" stroke="' + sponsor.accent + '" stroke-width="2.5" opacity="0"/>' +
      '<text class="map-label" x="0" y="' + labelY + '" text-anchor="middle">' + esc(sponsor.name) + "</text>" +
      "</g>"
    );
  }

  function emptyPlotMarkup(x, y) {
    return (
      '<g class="empty-plot" data-empty-plot tabindex="0" role="button" aria-label="Emplacement libre — devenir sponsor" transform="translate(' + x + " " + y + ')">' +
      "<title>Votre place</title>" +
      '<ellipse cx="0" cy="4" rx="42" ry="10" fill="var(--map-shadow)" opacity=".2"/>' +
      '<rect x="-40" y="-29" width="80" height="58" rx="10" fill="url(#town-paper)" stroke="var(--map-muted)" stroke-width="1.4" stroke-dasharray="7 6" opacity=".82"/>' +
      '<path d="M0 -14v28M-14 0h28" stroke="var(--map-ink)" stroke-width="2" stroke-linecap="round" opacity=".5"/>' +
      '<text x="0" y="18" text-anchor="middle" class="map-label" font-size="11">Votre place</text>' +
      '<text x="0" y="46" class="map-label map-label-small" text-anchor="middle">Devenir sponsor</text>' +
      "</g>"
    );
  }

  function renderMap() {
    var map = document.querySelector("[data-town-map]");
    if (!map) return;

    var center = byId["onir-cms"];
    var others = sponsors.filter(function (sponsor) {
      return sponsor.id !== center.id;
    });

    var parkA = "M46 96C118 40 220 58 250 142c28 78-40 137-118 141C57 286 9 201 46 96Z";
    var parkB = "M946 54c78-27 155 18 159 91 4 61-44 106-110 104-79-2-116-53-107-113 4-30 27-68 58-82Z";
    var parkC = "M920 636c80-35 180 3 196 70 12 52-38 93-114 89-89-5-139-63-112-110 8-15 18-35 30-49Z";
    var pond = "M74 636c28-32 91-43 129-15 42 31 31 87-18 108-52 23-119-1-129-42-5-19 3-36 18-51Z";

    map.innerHTML =
      "<title>La Ville ONIR — carte interactive des sponsors</title>" +
      "<desc>Une carte illustrée en 2D. ONIR-CMS occupe le centre. Cliquez sur un bâtiment pour découvrir son sponsor, ou sur un emplacement libre pour proposer votre soutien.</desc>" +
      "<defs>" +
      '<pattern id="town-dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="var(--map-road-line)" opacity=".24"/></pattern>' +
      '<pattern id="town-paper" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 18 18 0" stroke="var(--map-road-line)" stroke-width=".6" opacity=".18"/></pattern>' +
      '<pattern id="town-grass" width="22" height="18" patternUnits="userSpaceOnUse"><path d="M4 17c2-5 4-5 6 0M14 15c1-4 3-4 4 0" fill="none" stroke="var(--map-tree-dark)" stroke-width="1" opacity=".3"/></pattern>' +
      '<pattern id="town-roof" width="14" height="9" patternUnits="userSpaceOnUse"><path d="M0 9 7 0l7 9" fill="none" stroke="#ffffff" stroke-width="1" opacity=".3"/></pattern>' +
      '<pattern id="town-wall" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 12 12 0M-3 3 3-3M9 15 15 9" stroke="var(--map-building-edge)" stroke-width=".55" opacity=".25"/></pattern>' +
      '<pattern id="town-water" width="28" height="14" patternUnits="userSpaceOnUse"><path d="M0 7c7-5 14 5 21 0" fill="none" stroke="var(--map-water-light)" stroke-width="1.4" opacity=".65"/></pattern>' +
      '<pattern id="wall-cream" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#e9dfc8"/><circle cx="3" cy="4" r=".8" fill="#fff" opacity=".35"/><circle cx="13" cy="12" r=".6" fill="#7d7160" opacity=".15"/></pattern>' +
      '<pattern id="stone-base" width="18" height="12" patternUnits="userSpaceOnUse"><rect width="18" height="12" fill="#9b917f"/><path d="M0 6h18M6 0v6M13 6v6" stroke="#7e7565" stroke-width=".8" opacity=".75"/></pattern>' +
      '<pattern id="office-wall" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#d9d7d0"/><path d="M0 20 20 0" stroke="#a7a39a" stroke-width=".5" opacity=".35"/></pattern>' +
      '<pattern id="office-panel" width="23" height="23" patternUnits="userSpaceOnUse"><path d="M0 23 23 0" stroke="#aaa69d" stroke-width=".45" opacity=".35"/></pattern>' +
      '<pattern id="roof-tile" width="12" height="7" patternUnits="userSpaceOnUse"><path d="M0 7 6 0l6 7" fill="none" stroke="#0e1214" stroke-width=".8" opacity=".55"/><path d="M0 3.5h12" stroke="#5d6265" stroke-width=".45" opacity=".4"/></pattern>' +
      '<linearGradient id="glass-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b9aa0"/><stop offset=".48" stop-color="#46656b"/><stop offset="1" stop-color="#263f45"/></linearGradient>' +
      '<clipPath id="town-clip"><rect width="1200" height="760" rx="30"/></clipPath>' +
      "</defs>" +
      '<g clip-path="url(#town-clip)">' +
      '<rect width="1200" height="760" fill="var(--map-paper)"/>' +
      '<rect width="1200" height="760" fill="url(#town-dots)"/>' +
      '<rect width="1200" height="760" fill="url(#town-paper)" opacity=".65"/>' +
      '<path d="M0 0h1200v760H0z" fill="none" stroke="var(--map-road-line)" stroke-width="2" opacity=".35"/>' +
      '<path d="' + parkA + '" fill="var(--map-park)"/><path d="' + parkA + '" fill="url(#town-grass)" opacity=".65"/>' +
      '<path d="' + parkB + '" fill="var(--map-park)"/><path d="' + parkB + '" fill="url(#town-grass)" opacity=".65"/>' +
      '<path d="' + parkC + '" fill="var(--map-park-deep)"/><path d="' + parkC + '" fill="url(#town-grass)" opacity=".6"/>' +
      '<path d="' + pond + '" fill="var(--map-water)"/><path d="' + pond + '" fill="url(#town-water)" opacity=".55"/>' +
      '<path d="M94 650c22-17 64-18 87-2" fill="none" stroke="var(--map-water-light)" stroke-width="3" stroke-linecap="round" opacity=".8"/>' +
      '<path d="M68 618c11-8 24-8 35 0M122 686c18-8 37-6 52 4" fill="none" stroke="var(--map-tree-dark)" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>' +
      road("M40 380H1160") +
      road("M600 26V734") +
      '<ellipse cx="600" cy="380" rx="320" ry="225" fill="none" stroke="var(--map-road-edge)" stroke-width="56"/>' +
      '<ellipse cx="600" cy="380" rx="320" ry="225" fill="none" stroke="var(--map-sidewalk)" stroke-width="46"/>' +
      '<ellipse cx="600" cy="380" rx="320" ry="225" fill="none" stroke="var(--map-road)" stroke-width="36"/>' +
      '<ellipse cx="600" cy="380" rx="320" ry="225" fill="none" stroke="var(--map-road-line)" stroke-width="1.8" stroke-dasharray="8 12" opacity=".75"/>' +
      sidePath("M350 300L310 252") +
      sidePath("M510 200L482 160") +
      sidePath("M690 200L718 160") +
      sidePath("M860 300L894 252") +
      sidePath("M984 424L1002 466") +
      sidePath("M846 608L850 620") +
      sidePath("M680 600L696 662") +
      sidePath("M470 600L456 642") +
      sidePath("M284 480L210 496") +
      sidePath("M258 454C238 480 226 512 226 548") +
      sidePath("M942 454C962 480 974 512 970 548") +
      crosswalk(600, 270, 0) +
      crosswalk(600, 500, 0) +
      crosswalk(480, 380, 90) +
      crosswalk(720, 380, 90) +
      '<circle cx="600" cy="380" r="134" fill="var(--map-plaza)" stroke="var(--map-road-line)" stroke-width="2"/>' +
      '<circle cx="600" cy="380" r="134" fill="url(#town-paper)" opacity=".35"/>' +
      '<circle cx="600" cy="380" r="99" fill="var(--map-plaza-inner)"/>' +
      '<circle cx="600" cy="500" r="34" fill="var(--map-plaza)" stroke="var(--map-road-line)" stroke-width="2"/>' +
      '<circle cx="600" cy="500" r="26" fill="var(--map-water)"/>' +
      '<circle cx="600" cy="500" r="26" fill="url(#town-water)" opacity=".7"/>' +
      '<circle cx="600" cy="500" r="7" fill="var(--map-water-light)" stroke="var(--map-window-frame)" stroke-width="1.4"/>' +
      '<path d="M600 482c-10 8-10 18 0 25M600 482c10 8 10 18 0 25" fill="none" stroke="var(--map-water-light)" stroke-width="2" stroke-linecap="round" opacity=".9"/>' +
      '<path d="M531 325c14-12 32-12 45 0M624 325c14-12 32-12 45 0" fill="none" stroke="var(--map-tree-dark)" stroke-width="2" stroke-linecap="round" opacity=".55"/>' +
      mapBench(500, 315, -8) + mapBench(700, 315, 8) + mapBench(500, 456, 8) + mapBench(700, 456, -8) +
      mapFlowerBed(525, 462, 0.8) + mapFlowerBed(675, 462, 0.8) +
      mapLamp(470, 300, 0.95) + mapLamp(730, 300, 0.95) + mapLamp(470, 462, 0.95) + mapLamp(730, 462, 0.95) +
      '<text x="600" y="30" class="map-district" text-anchor="middle">Quartier des organisations</text>' +
      '<text x="1110" y="385" class="map-district" text-anchor="middle" transform="rotate(90 1110 385)">Place des partenaires</text>' +
      '<text x="600" y="744" class="map-district" text-anchor="middle">Allée des particuliers</text>' +
      roadName("Rue des Orangers", 420, 392, 0) +
      roadName("Passage des Idées", 614, 150, 90) +
      roadName("Boucle des Bâtisseurs", 820, 590, 26) +
      mapCompass(1102, 84) +
      mapTree(110, 118, 1.05, "round") +
      mapTree(168, 88, 0.9, "pine") +
      mapTree(205, 186, 0.8, "bush") +
      mapTree(128, 206, 0.64, "round") +
      mapTree(1000, 112, 0.9, "pine") +
      mapTree(1062, 158, 1.05, "round") +
      mapTree(978, 188, 0.64, "bush") +
      mapTree(1100, 470, 0.85, "round") +
      mapTree(1038, 666, 1, "pine") +
      mapTree(955, 646, 0.8, "round") +
      mapTree(1084, 700, 0.58, "bush") +
      mapTree(160, 674, 0.9, "round") +
      mapTree(218, 704, 0.72, "pine") +
      mapTree(66, 402, 0.78, "round") +
      mapTree(1128, 628, 0.8, "round") +
      mapTree(540, 82, 0.55, "bush") +
      mapTree(660, 82, 0.55, "bush") +
      mapBench(112, 172, 28) +
      mapBench(1012, 92, -22) +
      mapBush(88, 464, 0.6) +
      mapBush(1098, 352, 0.55) +
      mapBush(1048, 596, 0.6) +
      (center ? buildingMarkup(center) : "") +
      others.map(buildingMarkup).join("") +
      emptyPlotMarkup(420, 300) +
      emptyPlotMarkup(860, 300) +
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
    if (!hover) return;
    hover.classList.remove("is-visible");
    hover.innerHTML = "";
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
    var view3d = stage.querySelector("[data-town-3d]");
    var town3d = null;
    var loading3d = false;

    function setViewLabel(text) {
      var label = toggle ? toggle.querySelector("[data-view-label]") : null;
      if (label) label.textContent = text;
    }

    async function enter3D() {
      if (loading3d || !view3d) return;
      loading3d = true;
      toggle.disabled = true;
      toggle.setAttribute("aria-busy", "true");
      setViewLabel("Chargement 3D…");
      hideHover();
      view3d.hidden = false;

      try {
        if (!town3d) {
          var module = await import("/assets/js/town-3d.js?v=20261026i");
          town3d = module.createTown3D({
            container: view3d,
            sponsors: sponsors,
            onOpen: function (id) {
              openSponsor(byId[id]);
            },
            onHover: function (id) {
              if (id) showHover(byId[id]);
              else hideHover();
            }
          });
        }
        stage.classList.add("is-3d");
        toggle.setAttribute("aria-pressed", "true");
        setViewLabel("Vue 2D");
        if (viewStatus) viewStatus.textContent = "Vue 3D activée. Faites glisser pour tourner, cliquez sur un bâtiment pour ouvrir son sponsor.";
        town3d.start();
      } catch (error) {
        view3d.hidden = true;
        stage.classList.remove("is-3d");
        toggle.setAttribute("aria-pressed", "false");
        setViewLabel("Vue 3D");
        if (viewStatus) viewStatus.textContent = "La vue 3D n’est pas disponible sur ce navigateur. La carte 2D reste active.";
        console.warn("Vue 3D indisponible", error);
      } finally {
        loading3d = false;
        toggle.disabled = false;
        toggle.removeAttribute("aria-busy");
      }
    }

    function exit3D() {
      if (town3d) town3d.stop();
      hideHover();
      stage.classList.remove("is-3d");
      view3d.hidden = true;
      toggle.setAttribute("aria-pressed", "false");
      setViewLabel("Vue 3D");
      if (viewStatus) viewStatus.textContent = "Vue 2D activée.";
      centerMap();
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        if (stage.classList.contains("is-3d")) exit3D();
        else enter3D();
      });
    }

    window.addEventListener("onir:tabchange", function (event) {
      hideHover();
      if (!town3d) return;
      if (event.detail.name === "sponsor" && stage.classList.contains("is-3d")) town3d.start();
      else town3d.stop();
    });
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
    if (partnerChatUrl) {
      window.open(partnerChatUrl, "_blank", "noopener");
      return;
    }
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
      window.dispatchEvent(new CustomEvent("onir:tabchange", { detail: { name: name } }));
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
