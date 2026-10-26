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

  function houseArt(sponsor, w) {
    var half = w / 2;
    var body = 56;
    var roof = 31;
    var accent = sponsor.accent;
    var roofBase = -body;
    var roofTop = -body - roof;
    return (
      '<ellipse cx="0" cy="9" rx="' + (half + 17) + '" ry="9" fill="var(--map-shadow)" opacity=".42"/>' +
      '<path d="M-46 5H46" stroke="var(--map-sidewalk)" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M-46 5H46" stroke="var(--map-road-line)" stroke-width="1" stroke-dasharray="4 5" opacity=".7"/>' +
      '<path d="M' + (-half - 18) + ' 2V-8M' + (-half - 18) + ' -4H' + (-half + 2) + 'M' + (half + 18) + ' 2V-8M' + (half + 18) + ' -4H' + (half - 2) + '" stroke="var(--map-tree-dark)" stroke-width="2" stroke-linecap="round" opacity=".55"/>' +
      '<rect x="' + (-half - 10) + '" y="-4" width="' + (w + 20) + '" height="10" rx="4" fill="var(--map-park-deep)" opacity=".55"/>' +
      '<rect x="' + (-half) + '" y="' + (-body) + '" width="' + w + '" height="' + body + '" rx="4" fill="var(--map-building)" stroke="var(--map-building-edge)" stroke-width="1.4"/>' +
      '<rect x="' + (-half + 2) + '" y="' + (-body + 2) + '" width="' + (w - 4) + '" height="' + (body - 4) + '" rx="3" fill="url(#town-wall)" opacity=".38"/>' +
      '<path d="M' + (-half - 9) + " " + roofBase + "L0 " + roofTop + "L" + (half + 9) + " " + roofBase + 'Z" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1.25" stroke-linejoin="round"/>' +
      '<path d="M' + (-half - 9) + " " + roofBase + "L0 " + roofTop + "L" + (half + 9) + " " + roofBase + 'Z" fill="url(#town-roof)" opacity=".5"/>' +
      '<path d="M' + (-half - 12) + " " + roofBase + "H" + (half + 12) + '" stroke="var(--map-building-edge)" stroke-width="2" opacity=".6"/>' +
      '<rect x="' + (half - 31) + '" y="' + (roofTop + 2) + '" width="11" height="24" rx="2" fill="#a96143" stroke="var(--map-building-edge)" stroke-width="1"/>' +
      '<rect x="' + (half - 34) + '" y="' + (roofTop + 1) + '" width="17" height="4" rx="1.5" fill="#7f4934"/>' +
      '<path d="M-16 ' + (roofBase - 6) + "l16-15 16 15Z\" fill=\"" + accent + '" stroke="var(--map-building-edge)" stroke-width="1"/>' +
      '<rect x="-7" y="' + (roofBase - 11) + '" width="14" height="10" rx="1.5" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1"/>' +
      '<path d="M' + (-half + 16) + " " + (-body + 14) + 'h22v21h-22z" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.3"/>' +
      '<path d="M' + (-half + 16) + " " + (-body + 24.5) + 'h22M' + (-half + 27) + " " + (-body + 14) + 'v21" stroke="var(--map-window-frame)" stroke-width="1"/>' +
      '<rect x="' + (-half + 11) + '" y="' + (-body + 13) + '" width="4" height="23" rx="1" fill="' + accent + '" opacity=".8"/>' +
      '<rect x="' + (-half + 39) + '" y="' + (-body + 13) + '" width="4" height="23" rx="1" fill="' + accent + '" opacity=".8"/>' +
      '<path d="M' + (half - 38) + " " + (-body + 14) + 'h22v21h-22z" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.3"/>' +
      '<path d="M' + (half - 38) + " " + (-body + 24.5) + 'h22M' + (half - 27) + " " + (-body + 14) + 'v21" stroke="var(--map-window-frame)" stroke-width="1"/>' +
      '<rect x="' + (half - 43) + '" y="' + (-body + 13) + '" width="4" height="23" rx="1" fill="' + accent + '" opacity=".8"/>' +
      '<rect x="' + (half - 15) + '" y="' + (-body + 13) + '" width="4" height="23" rx="1" fill="' + accent + '" opacity=".8"/>' +
      '<rect x="-13" y="-29" width="26" height="29" rx="3" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1"/>' +
      '<circle cx="6" cy="-15" r="1.7" fill="#fff8e8"/>' +
      '<path d="M-19 -30h38l-5-8h-28z" fill="#a96143" stroke="var(--map-building-edge)" stroke-width="1"/>' +
      '<path d="M-12 -5v5M12 -5v5M-17 -5v5M17 -5v5" stroke="var(--map-building-edge)" stroke-width="1.5" opacity=".6"/>' +
      '<rect x="-13" y="-45" width="26" height="12" rx="4" fill="' + accent + '"/>' +
      '<text x="0" y="-36" text-anchor="middle" fill="#ffffff" font-size="7.5" font-weight="800">' + esc(sponsor.initials) + "</text>" +
      '<circle cx="' + (-half - 14) + '" cy="0" r="8" fill="var(--map-tree)"/>' +
      '<circle cx="' + (-half - 24) + '" cy="-2" r="6" fill="var(--map-tree-dark)"/>' +
      '<circle cx="' + (half + 15) + '" cy="0" r="8" fill="var(--map-tree)"/>' +
      '<circle cx="' + (half + 26) + '" cy="-2" r="6" fill="var(--map-tree-dark)"/>' +
      mapFlowerBed(-half + 20, 1, 0.55) +
      mapFlowerBed(half - 18, 1, 0.5)
    );
  }

  function orgArt(sponsor, w, h) {
    var half = w / 2;
    var body = h - 22;
    var accent = sponsor.accent;
    var variant = sponsor.building;
    var roof =
      variant === "house-office" || variant === "coop"
        ? '<path d="M' + (-half - 9) + " " + (-body) + "L0 " + (-h - 15) + "L" + (half + 9) + " " + (-body) + 'Z" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1.2" stroke-linejoin="round"/>' +
          '<path d="M' + (-half - 9) + " " + (-body) + "L0 " + (-h - 15) + "L" + (half + 9) + " " + (-body) + 'Z" fill="url(#town-roof)" opacity=".45"/>'
        : '<rect x="' + (-half - 7) + '" y="' + (-body - 9) + '" width="' + (w + 14) + '" height="12" rx="3" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1"/>' +
          '<rect x="' + (-half + 8) + '" y="' + (-body - 16) + '" width="22" height="9" rx="2" fill="var(--map-building-edge)" opacity=".32"/>' +
          '<rect x="' + (half - 31) + '" y="' + (-body - 14) + '" width="14" height="7" rx="1" fill="var(--map-window)" opacity=".75"/>';
    var windows = "";
    var cols = variant === "studio" ? 2 : 3;
    for (var row = 0; row < 2; row += 1) {
      for (var col = 0; col < cols; col += 1) {
        var wx = -half + 16 + col * ((w - 32) / Math.max(cols - 1, 1));
        var wy = -body + 15 + row * 28;
        windows +=
          '<rect x="' + (wx - 10) + '" y="' + wy + '" width="20" height="18" rx="2" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
          '<path d="M' + wx + " " + wy + "v18M" + (wx - 10) + " " + (wy + 9) + 'h20" stroke="var(--map-window-frame)" stroke-width=".8" opacity=".85"/>';
        if (variant === "workshop") {
          windows += '<rect x="' + (wx - 14) + '" y="' + (wy + 1) + '" width="3" height="16" rx="1" fill="' + accent + '" opacity=".7"/>';
        }
      }
    }
    var extra = "";
    if (variant === "coop") {
      extra =
        '<ellipse cx="' + (half + 13) + '" cy="3" rx="14" ry="5" fill="var(--map-shadow)" opacity=".35"/>' +
        '<rect x="' + (half - 1) + '" y="-54" width="26" height="58" rx="13" fill="var(--map-building)" stroke="var(--map-building-edge)" stroke-width="1.2"/>' +
        '<ellipse cx="' + (half + 12) + '" cy="-54" rx="13" ry="5" fill="' + accent + '" opacity=".85"/>' +
        '<path d="M' + (half + 4) + ' -45h16M' + (half + 4) + ' -38h16" stroke="var(--map-building-edge)" stroke-width="1" opacity=".35"/>';
    } else if (variant === "studio") {
      extra =
        '<rect x="' + (-half + 11) + '" y="' + (-body + 12) + '" width="' + (w - 22) + '" height="' + (body - 54) + '" rx="2" fill="var(--map-window)" opacity=".7"/>' +
        '<path d="M' + (-half + 27) + " " + (-body + 12) + "v" + (body - 54) + "M" + (half - 27) + " " + (-body + 12) + "v" + (body - 54) + '" stroke="var(--map-window-frame)" stroke-width="1.2"/>';
    }
    return (
      '<ellipse cx="0" cy="9" rx="' + (half + 18) + '" ry="9" fill="var(--map-shadow)" opacity=".42"/>' +
      '<path d="M' + (-half - 22) + " " + (-body - 8) + "V-12H" + (-half - 6) + "M" + (half + 22) + " " + (-body - 8) + "V-12H" + (half + 6) + '" stroke="var(--map-tree-dark)" stroke-width="2" stroke-linecap="round" opacity=".55"/>' +
      '<rect x="' + (-half) + '" y="' + (-body) + '" width="' + w + '" height="' + body + '" rx="3" fill="var(--map-building)" stroke="var(--map-building-edge)" stroke-width="1.4"/>' +
      '<rect x="' + (-half + 2) + '" y="' + (-body + 2) + '" width="' + (w - 4) + '" height="' + (body - 4) + '" rx="2" fill="url(#town-wall)" opacity=".35"/>' +
      roof +
      windows +
      extra +
      '<path d="M' + (-half + 1) + " " + (-body + 55) + "H" + (half - 1) + '" stroke="var(--map-building-edge)" stroke-width="1" opacity=".2"/>' +
      '<rect x="-15" y="-31" width="30" height="31" rx="3" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1"/>' +
      '<circle cx="7" cy="-16" r="1.8" fill="#fff8e8"/>' +
      '<path d="M-21 -32h42l-6-9h-30z" fill="#a96143" stroke="var(--map-building-edge)" stroke-width="1"/>' +
      '<rect x="' + (-half + 16) + '" y="' + (-body + 5) + '" width="' + (w - 32) + '" height="15" rx="7" fill="' + accent + '"/>' +
      '<text x="0" y="' + (-body + 16) + '" text-anchor="middle" fill="#ffffff" font-size="8.5" font-weight="800" letter-spacing=".06em">' + esc(sponsor.initials) + "</text>" +
      '<rect x="' + (-half + 22) + '" y="-22" width="8" height="22" rx="2" fill="' + accent + '" opacity=".45"/>' +
      '<rect x="' + (half - 30) + '" y="-20" width="8" height="20" rx="2" fill="var(--map-tree)"/>' +
      '<circle cx="' + (-half - 15) + '" cy="-2" r="8" fill="var(--map-tree)"/>' +
      '<circle cx="' + (half + 17) + '" cy="-2" r="8" fill="var(--map-tree)"/>' +
      mapFlowerBed(-half + 19, 2, 0.5)
    );
  }

  function towerArt(sponsor, w, h) {
    var half = w / 2;
    var accent = sponsor.accent;
    return (
      '<ellipse cx="0" cy="10" rx="' + (half + 28) + '" ry="11" fill="var(--map-shadow)" opacity=".45"/>' +
      '<path d="M-84 6H84" stroke="var(--map-sidewalk)" stroke-width="13" stroke-linecap="round"/>' +
      '<path d="M-84 6H84" stroke="var(--map-road-line)" stroke-width="1" stroke-dasharray="4 5" opacity=".6"/>' +
      '<rect x="' + (-half) + '" y="' + (-h + 14) + '" width="' + w + '" height="' + (h - 14) + '" rx="5" fill="var(--map-building)" stroke="var(--map-building-edge)" stroke-width="1.5"/>' +
      '<rect x="' + (-half + 3) + '" y="' + (-h + 17) + '" width="' + (w - 6) + '" height="' + (h - 20) + '" rx="3" fill="url(#town-wall)" opacity=".32"/>' +
      '<rect x="' + (-half - 9) + '" y="' + (-h + 2) + '" width="' + (w + 18) + '" height="18" rx="4" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1"/>' +
      '<rect x="' + (-half + 18) + '" y="' + (-h + 34) + '" width="' + (w - 36) + '" height="52" rx="3" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.4"/>' +
      '<path d="M' + (-half + 52) + " " + (-h + 34) + "V" + (-h + 86) + "M" + (-half + 84) + " " + (-h + 34) + "V" + (-h + 86) + "M" + (-half + 116) + " " + (-h + 34) + "V" + (-h + 86) + '" stroke="var(--map-window-frame)" stroke-width="1.2" opacity=".8"/>' +
      '<rect x="' + (-half + 18) + '" y="' + (-h + 98) + '" width="40" height="34" rx="2" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
      '<rect x="' + (half - 58) + '" y="' + (-h + 98) + '" width="40" height="34" rx="2" fill="var(--map-window)" stroke="var(--map-window-frame)" stroke-width="1.2"/>' +
      '<rect x="-18" y="-39" width="36" height="39" rx="3" fill="' + accent + '" stroke="var(--map-building-edge)" stroke-width="1"/>' +
      '<circle cx="7" cy="-20" r="1.8" fill="#fff8e8"/>' +
      '<rect x="-45" y="-74" width="90" height="22" rx="11" fill="' + accent + '"/>' +
      '<text x="0" y="-58" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800" letter-spacing=".12em">ONIR</text>' +
      '<path d="M' + (half - 26) + " " + (-h + 2) + "V" + (-h - 45) + '" stroke="' + accent + '" stroke-width="2.5"/>' +
      '<path d="M' + (half - 26) + " " + (-h - 45) + 'h32l-8 8 8 8h-32z" fill="' + accent + '"/>' +
      '<rect x="' + (-half - 4) + '" y="' + (-h + 18) + '" width="' + (w + 8) + '" height="5" rx="2" fill="var(--map-park-deep)" opacity=".9"/>' +
      '<path d="M-72 6 -78 -3H-68M72 6 78 -3H68" stroke="var(--map-tree-dark)" stroke-width="2" opacity=".5"/>' +
      '<circle cx="' + (half + 28) + '" cy="-2" r="10" fill="var(--map-tree)"/>' +
      '<circle cx="' + (-half - 27) + '" cy="-2" r="9" fill="var(--map-tree-dark)"/>' +
      mapFlowerBed(-half + 24, 2, 0.7) +
      mapFlowerBed(half - 24, 2, 0.7)
    );
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

    var center = byId.onirtech;
    var others = sponsors.filter(function (sponsor) {
      return sponsor.id !== "onirtech";
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
      '<text x="600" y="48" class="map-district" text-anchor="middle">Quartier des organisations</text>' +
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
      emptyPlotMarkup(780, 468) +
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
          var module = await import("/assets/js/town-3d.js?v=20261026f");
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
