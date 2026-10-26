import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const MAP_W = 1200;
const MAP_H = 760;
const WORLD_W = 120;
const WORLD_H = 76;

function scaleX(x) {
  return (x - MAP_W / 2) / 10;
}

function scaleZ(y) {
  return (y - MAP_H / 2) / 10;
}

function canvasTexture(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function makeGroundTexture() {
  return canvasTexture(1800, 1140, (ctx, width, height) => {
    const scale = width / MAP_W;
    ctx.scale(scale, scale);

    ctx.fillStyle = "#f7f1e2";
    ctx.fillRect(0, 0, MAP_W, MAP_H);

    for (let i = 0; i < 4200; i += 1) {
      const x = (i * 73.13) % MAP_W;
      const y = (i * 47.71) % MAP_H;
      ctx.fillStyle = i % 5 === 0 ? "rgba(197, 177, 141, .22)" : "rgba(255, 253, 246, .3)";
      ctx.fillRect(x, y, 1.2, 1.2);
    }

    const parkA = new Path2D("M46 96C118 40 220 58 250 142c28 78-40 137-118 141C57 286 9 201 46 96Z");
    const parkB = new Path2D("M946 54c78-27 155 18 159 91 4 61-44 106-110 104-79-2-116-53-107-113 4-30 27-68 58-82Z");
    const parkC = new Path2D("M920 636c80-35 180 3 196 70 12 52-38 93-114 89-89-5-139-63-112-110 8-15 18-35 30-49Z");
    const pond = new Path2D("M74 636c28-32 91-43 129-15 42 31 31 87-18 108-52 23-119-1-129-42-5-19 3-36 18-51Z");

    ctx.fillStyle = "#dfead2";
    ctx.fill(parkA);
    ctx.fill(parkB);
    ctx.fillStyle = "#cbdcbd";
    ctx.fill(parkC);

    ctx.fillStyle = "#bcdcd2";
    ctx.fill(pond);
    ctx.strokeStyle = "rgba(216, 236, 228, .9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(94, 650);
    ctx.bezierCurveTo(116, 633, 158, 632, 181, 648);
    ctx.stroke();

    function strokePath(path, color, width) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke(path);
    }

    function makeRoad(path) {
      strokePath(path, "#d9c9ab", 56);
      strokePath(path, "#e8dcc4", 46);
      strokePath(path, "#fbf7eb", 36);
      ctx.setLineDash([8, 12]);
      strokePath(path, "#d7c5a4", 1.8);
      ctx.setLineDash([]);
    }

    makeRoad(new Path2D("M40 380H1160"));
    makeRoad(new Path2D("M600 26V734"));

    const ring = new Path2D();
    ring.ellipse(600, 380, 320, 225, 0, 0, Math.PI * 2);
    makeRoad(ring);

    const sidePaths = [
      "M350 300L310 252",
      "M510 200L482 160",
      "M690 200L718 160",
      "M860 300L894 252",
      "M984 424L1002 466",
      "M846 608L850 620",
      "M680 600L696 662",
      "M470 600L456 642",
      "M284 480L210 496",
      "M258 454C238 480 226 512 226 548",
      "M942 454C962 480 974 512 970 548"
    ];

    for (const d of sidePaths) {
      const p = new Path2D(d);
      strokePath(p, "#d9c9ab", 22);
      strokePath(p, "#e8dcc4", 17);
      strokePath(p, "#fbf7eb", 11);
    }

    ctx.fillStyle = "#f1e7d0";
    ctx.beginPath();
    ctx.arc(600, 380, 134, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#d7c5a4";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#e1eedc";
    ctx.beginPath();
    ctx.arc(600, 380, 99, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f1e7d0";
    ctx.beginPath();
    ctx.arc(600, 500, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#bcdcd2";
    ctx.beginPath();
    ctx.arc(600, 500, 26, 0, Math.PI * 2);
    ctx.fill();

    function crosswalk(x, y, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = "rgba(255, 253, 246, .9)";
      for (let i = 0; i < 5; i += 1) {
        ctx.fillRect(-24 + i * 12, -14, 5, 28);
      }
      ctx.restore();
    }

    crosswalk(600, 270, 0);
    crosswalk(600, 500, 0);
    crosswalk(480, 380, 90);
    crosswalk(720, 380, 90);

    ctx.fillStyle = "#61766b";
    ctx.font = "800 10px Montserrat, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("QUARTIER DES ORGANISATIONS", 600, 30);
    ctx.save();
    ctx.translate(1110, 385);
    ctx.rotate(Math.PI / 2);
    ctx.fillText("PLACE DES PARTENAIRES", 0, 0);
    ctx.restore();
    ctx.fillText("ALLÉE DES PARTICULIERS", 600, 744);

    ctx.font = "700 8px Montserrat, Arial, sans-serif";
    ctx.fillStyle = "rgba(97, 118, 107, .8)";
    ctx.fillText("RUE DES ORANGERS", 420, 392);
    ctx.save();
    ctx.translate(614, 150);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("PASSAGE DES IDÉES", 0, 0);
    ctx.restore();

    ctx.fillStyle = "#f08000";
    ctx.beginPath();
    ctx.arc(1102, 84, 19, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff8e8";
    ctx.font = "800 10px Montserrat, Arial, sans-serif";
    ctx.fillText("N", 1102, 86);

    ctx.fillStyle = "rgba(255, 253, 246, .85)";
    ctx.strokeStyle = "#d7c5a4";
    ctx.lineWidth = 1;
    ctx.fillRect(1016, 706, 116, 22);
    ctx.strokeRect(1016, 706, 116, 22);
    ctx.fillStyle = "#61766b";
    ctx.font = "700 8px Montserrat, Arial, sans-serif";
    ctx.fillText("VILLE ONIR · 50 M", 1074, 717);

    ctx.strokeStyle = "rgba(6, 61, 46, .25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(24, 24);
    ctx.lineTo(1176, 24);
    ctx.lineTo(1176, 736);
    ctx.lineTo(24, 736);
    ctx.closePath();
    ctx.stroke();
  });
}

function makeSignTexture(text, color) {
  return canvasTexture(256, 128, (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(8, 16, width - 16, height - 32, 18);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 42px Montserrat, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2 + 2);
  });
}

function makeWindowMaterial() {
  return new THREE.MeshStandardMaterial({
    color: "#a9d4cc",
    emissive: "#15332d",
    emissiveIntensity: 0.24,
    roughness: 0.28,
    metalness: 0.08
  });
}

function makeBodyMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.92,
    metalness: 0,
    flatShading: true
  });
}

function makeAccentMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.72,
    metalness: 0.02,
    flatShading: true
  });
}

function addBox(group, w, h, d, x, y, z, material, castShadow) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = castShadow !== false;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addGableRoof(group, w, d, height, y, material, z) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, 0);
  shape.lineTo(w / 2, 0);
  shape.lineTo(0, height);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false });
  geometry.translate(0, 0, -d / 2);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, y, z || 0);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addSideWindows(group, width, depth, glassMat, rows, levels) {
  const rowList = rows || [-1.4, 1.4];
  const levelList = levels || [2.6];
  for (const side of [-1, 1]) {
    for (const level of levelList) {
      for (const z of rowList) {
        addBox(group, 0.14, 1.05, 1.05, side * (width / 2 + 0.08), level, z, glassMat, false);
      }
    }
  }
}

const textureCache = {};

function cachedTexture(key, factory) {
  if (!textureCache[key]) textureCache[key] = factory();
  return textureCache[key];
}

function texturedCanvasTexture(key, size, draw, repeatX, repeatY) {
  return cachedTexture(key, () => {
    const texture = canvasTexture(size, size, draw);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX || 2, repeatY || 2);
    return texture;
  });
}

function makeWallTexture() {
  return texturedCanvasTexture("wall-cream", 256, (ctx, w, h) => {
    ctx.fillStyle = "#e9dfc8";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i += 1) {
      const x = (i * 53.7) % w;
      const y = (i * 89.3) % h;
      ctx.fillStyle = i % 3 === 0 ? "rgba(255,255,255,.12)" : "rgba(123,108,88,.07)";
      ctx.fillRect(x, y, 1.4, 1.4);
    }
  }, 2.2, 2.2);
}

function makeOfficeTexture() {
  return texturedCanvasTexture("office-stone", 256, (ctx, w, h) => {
    ctx.fillStyle = "#d9d7d0";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(125,121,111,.22)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y <= h; y += 64) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    for (let i = 0; i < 500; i += 1) {
      ctx.fillStyle = i % 2 ? "rgba(255,255,255,.12)" : "rgba(100,96,88,.06)";
      ctx.fillRect((i * 41.7) % w, (i * 67.1) % h, 1.2, 1.2);
    }
  }, 2, 2);
}

function makeStoneTexture() {
  return texturedCanvasTexture("stone-base", 256, (ctx, w, h) => {
    ctx.fillStyle = "#9b917f";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(73,67,58,.55)";
    ctx.lineWidth = 2;
    for (let y = 0; y <= h; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      const shift = (y / 32) % 2 ? 32 : 0;
      for (let x = shift; x <= w; x += 64) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 32); ctx.stroke();
      }
    }
    for (let i = 0; i < 160; i += 1) {
      ctx.fillStyle = "rgba(255,255,255,.08)";
      ctx.fillRect((i * 39.7) % w, (i * 71.3) % h, 3, 2);
    }
  }, 2.5, 1.5);
}

function makeRoofTexture() {
  return texturedCanvasTexture("roof-tile", 256, (ctx, w, h) => {
    ctx.fillStyle = "#30363a";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(10,14,16,.65)";
    ctx.lineWidth = 2;
    for (let y = 0; y <= h; y += 18) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      const shift = (y / 18) % 2 ? 12 : 0;
      for (let x = shift; x <= w; x += 24) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 18); ctx.stroke();
      }
    }
    ctx.strokeStyle = "rgba(125,134,136,.25)";
    ctx.lineWidth = 1;
    for (let y = 4; y < h; y += 18) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
  }, 3, 3);
}

function makePavingTexture() {
  return texturedCanvasTexture("paving", 256, (ctx, w, h) => {
    ctx.fillStyle = "#d8d0bd";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(145,134,114,.5)";
    ctx.lineWidth = 1.2;
    for (let y = 0; y <= h; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      const shift = (y / 32) % 2 ? 24 : 0;
      for (let x = shift; x <= w; x += 48) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 32); ctx.stroke();
      }
    }
  }, 3, 3);
}

function makeWallMaterial() {
  return new THREE.MeshStandardMaterial({ map: makeWallTexture(), roughness: 0.94, flatShading: true });
}

function makeOfficeMaterial() {
  return new THREE.MeshStandardMaterial({ map: makeOfficeTexture(), roughness: 0.9, flatShading: true });
}

function makeStoneMaterial() {
  return new THREE.MeshStandardMaterial({ map: makeStoneTexture(), roughness: 0.98, flatShading: true });
}

function makeRoofMaterial() {
  return new THREE.MeshStandardMaterial({ map: makeRoofTexture(), roughness: 0.8, metalness: 0.04, flatShading: true });
}

function makePavingMaterial() {
  return new THREE.MeshStandardMaterial({ map: makePavingTexture(), roughness: 1, flatShading: true });
}

function makeGlassMaterial() {
  return new THREE.MeshStandardMaterial({
    color: "#2f4a50",
    emissive: "#102326",
    emissiveIntensity: 0.2,
    roughness: 0.14,
    metalness: 0.3
  });
}

function makeFrameMaterial() {
  return new THREE.MeshStandardMaterial({ color: "#202426", roughness: 0.5, metalness: 0.2, flatShading: true });
}

function makeWoodMaterial() {
  return new THREE.MeshStandardMaterial({ color: "#8b5a37", roughness: 0.72, metalness: 0.02, flatShading: true });
}

function makeTrimMaterial() {
  return new THREE.MeshStandardMaterial({ color: "#b28150", roughness: 0.8, flatShading: true });
}

function makeConcreteMaterial() {
  return new THREE.MeshStandardMaterial({ color: "#b9b7ae", roughness: 0.95, flatShading: true });
}

function makeGreenMaterial() {
  return new THREE.MeshStandardMaterial({ color: "#6d9b73", roughness: 1, flatShading: true });
}

function makeLawnMaterial() {
  return new THREE.MeshStandardMaterial({ color: "#b7cba6", roughness: 1, flatShading: true });
}

function addFrontWindow(group, x, y, z, w, h, frameMat, glassMat) {
  addBox(group, w + 0.2, h + 0.2, 0.12, x, y, z, frameMat, false);
  addBox(group, w, h, 0.14, x, y, z + 0.06, glassMat, false);
  addBox(group, 0.06, h, 0.16, x, y, z + 0.14, frameMat, false);
  addBox(group, w, 0.06, 0.16, x, y, z + 0.14, frameMat, false);
}

function addSideWindow(group, x, y, z, w, h, frameMat, glassMat) {
  addBox(group, 0.12, h + 0.2, w + 0.2, x, y, z, frameMat, false);
  addBox(group, 0.14, h, w, x + 0.03, y, z, glassMat, false);
  addBox(group, 0.16, 0.06, w, x + 0.14, y, z, frameMat, false);
}

function addDownspout(group, x, y, z, height) {
  const pipe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, height, 6),
    makeFrameMaterial()
  );
  pipe.position.set(x, y, z);
  pipe.castShadow = true;
  group.add(pipe);
}

function addSign(group, text, color, z, y, w, h) {
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(w || 2.3, h || 0.95),
    new THREE.MeshBasicMaterial({ map: makeSignTexture(text, color), transparent: true, side: THREE.DoubleSide })
  );
  sign.position.set(0, y, z);
  group.add(sign);
  return sign;
}

function addCircuitPlaque(group, accent, z, x, y, w, h) {
  const texture = canvasTexture(256, 128, (ctx, cw, ch) => {
    ctx.fillStyle = "#c4c0b6";
    ctx.fillRect(0, 0, cw, ch);
    ctx.strokeStyle = "rgba(105,100,90,.55)";
    ctx.strokeRect(4, 4, cw - 8, ch - 8);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(26, 92); ctx.lineTo(26, 52); ctx.lineTo(66, 52); ctx.lineTo(66, 25);
    ctx.moveTo(66, 52); ctx.lineTo(110, 52); ctx.lineTo(110, 86);
    ctx.moveTo(110, 52); ctx.lineTo(156, 52); ctx.lineTo(156, 28);
    ctx.moveTo(156, 52); ctx.lineTo(204, 52); ctx.lineTo(204, 82);
    ctx.moveTo(66, 25); ctx.lineTo(110, 25); ctx.lineTo(110, 52);
    ctx.moveTo(156, 28); ctx.lineTo(184, 28); ctx.lineTo(184, 52);
    ctx.stroke();
    ctx.fillStyle = accent;
    for (const [cx, cy] of [[26, 92], [66, 25], [110, 86], [156, 28], [204, 82], [184, 52]]) {
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
    }
  });
  const plaque = new THREE.Mesh(
    new THREE.PlaneGeometry(w || 2.4, h || 1.2),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
  );
  plaque.position.set(x || 0, y || 0, z);
  group.add(plaque);
}

function addPlot(group, width, depth, kind) {
  if (kind === "house") {
    addBox(group, width + 4.6, 0.08, depth + 4.5, 0, 0.03, 0, makeLawnMaterial(), false);
    addBox(group, 2.3, 0.1, 3.2, 0, 0.07, depth / 2 + 1.6, makePavingMaterial(), false);
  } else {
    addBox(group, width + 3.6, 0.08, depth + 3.6, 0, 0.03, 0, makePavingMaterial(), false);
    addBox(group, width + 4.2, 0.06, 1.3, 0, 0.05, -depth / 2 - 1.2, makeLawnMaterial(), false);
    addBox(group, width + 4.2, 0.06, 1.3, 0, 0.05, depth / 2 + 1.2, makeLawnMaterial(), false);
  }
}

function addPlanter(group, x, z, scale) {
  const s = scale || 1;
  addBox(group, 1.25 * s, 0.55 * s, 1.25 * s, x, 0.3 * s, z, makeConcreteMaterial(), false);
  const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(0.65 * s, 0), makeGreenMaterial());
  bush.position.set(x, 0.9 * s, z);
  bush.castShadow = true;
  group.add(bush);
}


function createHouse(sponsor) {
  const group = new THREE.Group();
  const bodyMat = makeWallMaterial();
  const stoneMat = makeStoneMaterial();
  const roofMat = makeRoofMaterial();
  const glassMat = makeGlassMaterial();
  const frameMat = makeFrameMaterial();
  const woodMat = makeWoodMaterial();
  const trimMat = makeTrimMaterial();
  const pavingMat = makePavingMaterial();
  const width = 8.8;
  const depth = 6.2;
  const stoneH = 1.0;
  const wallH = 3.2;
  const bodyTop = stoneH + wallH;
  const roofH = 2.4;

  addPlot(group, width, depth, "house");
  addBox(group, width, stoneH, depth, 0, stoneH / 2, 0, stoneMat);
  const body = addBox(group, width, wallH, depth, 0, stoneH + wallH / 2, 0, bodyMat);
  body.userData.isBody = true;
  addGableRoof(group, width + 1.2, depth + 1.2, roofH, bodyTop, roofMat);
  addBox(group, width + 1.4, 0.16, 0.2, 0, bodyTop - 0.02, depth / 2 + 0.55, trimMat, false);
  addBox(group, width + 1.4, 0.16, 0.2, 0, bodyTop - 0.02, -depth / 2 - 0.55, trimMat, false);
  addBox(group, 0.12, 0.12, depth + 1.2, 0, bodyTop + roofH, 0, frameMat, false);
  addBox(group, 0.78, 2.2, 0.78, 2.9, bodyTop + 1.55, -1.2, stoneMat);
  addBox(group, 0.92, 0.18, 0.92, 2.9, bodyTop + 2.7, -1.2, frameMat, false);

  addFrontWindow(group, -2.9, 2.45, depth / 2 + 0.06, 2.15, 1.35, frameMat, glassMat);
  addFrontWindow(group, 2.9, 2.45, depth / 2 + 0.06, 2.15, 1.35, frameMat, glassMat);
  addSideWindow(group, width / 2 + 0.06, 2.45, -1.4, 1.5, 1.15, frameMat, glassMat);
  addSideWindow(group, width / 2 + 0.06, 2.45, 1.4, 1.5, 1.15, frameMat, glassMat);

  addBox(group, 1.65, 2.45, 0.16, 0, 1.5, depth / 2 + 0.07, frameMat, false);
  addBox(group, 1.35, 2.25, 0.18, 0, 1.45, depth / 2 + 0.1, woodMat, false);
  addBox(group, 0.12, 0.12, 0.12, 0.46, 1.45, depth / 2 + 0.2, trimMat, false);
  addBox(group, 3.6, 0.18, 1.8, 0, 3.05, depth / 2 + 1.15, trimMat, false);
  addGableRoof(group, 4.2, 2.0, 1.15, 3.16, roofMat, depth / 2 + 0.95);
  addBox(group, 0.42, 2.55, 0.42, -1.55, 1.45, depth / 2 + 1.45, stoneMat);
  addBox(group, 0.42, 2.55, 0.42, 1.55, 1.45, depth / 2 + 1.45, stoneMat);
  addBox(group, 2.0, 0.2, 1.4, 0, 0.18, depth / 2 + 1.55, pavingMat, false);
  addBox(group, 2.5, 0.2, 1.85, 0, 0.37, depth / 2 + 1.35, pavingMat, false);

  addFrontWindow(group, 0, bodyTop + 0.65, depth / 2 + 0.08, 0.58, 0.78, frameMat, glassMat);
  addDownspout(group, width / 2 + 0.14, 2.1, depth / 2 + 0.08, 4.2);
  addDownspout(group, -width / 2 - 0.14, 2.1, depth / 2 + 0.08, 4.2);
  addSign(group, sponsor.initials, sponsor.accent, depth / 2 + 0.22, 3.35, 1.55, 0.62);
  addPlanter(group, -width / 2 - 0.2, depth / 2 + 1.7, 0.9);
  addPlanter(group, width / 2 + 0.2, depth / 2 + 1.7, 0.9);

  group.rotation.y = sponsor.x < 600 ? 0.045 : -0.045;
  return group;
}

function createOffice(sponsor, center) {
  const group = new THREE.Group();
  const bodyMat = makeOfficeMaterial();
  const stoneMat = makeStoneMaterial();
  const roofMat = makeConcreteMaterial();
  const glassMat = makeGlassMaterial();
  const frameMat = makeFrameMaterial();
  const trimMat = makeTrimMaterial();
  const woodMat = makeWoodMaterial();
  const width = center ? 18 : sponsor.size === "md" ? 12.2 : 10.8;
  const depth = center ? 11 : 8.2;
  const bodyH = center ? 9.6 : sponsor.size === "md" ? 8.6 : 7.9;
  const half = width / 2;
  const front = depth / 2;

  addPlot(group, width, depth, center ? "center" : "office");
  addBox(group, width, 0.6, depth, 0, 0.3, 0, stoneMat);
  const body = addBox(group, width, bodyH - 0.6, depth, 0, 0.6 + (bodyH - 0.6) / 2, 0, bodyMat);
  body.userData.isBody = true;
  addBox(group, width + 0.7, 0.38, depth + 0.7, 0, bodyH + 0.19, 0, roofMat);

  for (const level of [bodyH / 3, (bodyH * 2) / 3]) {
    addBox(group, width + 0.14, 0.12, depth + 0.14, 0, level, 0, trimMat, false);
  }

  const rows = [1.45, 1.45 + (bodyH - 2.3) / 2, bodyH - 1.0];
  for (const y of rows) {
    addFrontWindow(group, -4.25, y, front + 0.06, 2.0, 1.25, frameMat, glassMat);
    addFrontWindow(group, -1.95, y, front + 0.06, 2.0, 1.25, frameMat, glassMat);
    addFrontWindow(group, 2.05, y, front + 0.06, 2.0, 1.25, frameMat, glassMat);
    addFrontWindow(group, 4.35, y, front + 0.06, 2.0, 1.25, frameMat, glassMat);
  }
  if (!center) {
    addFrontWindow(group, 0, 2.1, front + 0.06, 2.15, 1.8, frameMat, glassMat);
    addFrontWindow(group, 0, 4.5, front + 0.06, 2.15, 1.8, frameMat, glassMat);
    addFrontWindow(group, 0, 6.5, front + 0.06, 2.15, 1.45, frameMat, glassMat);
  } else {
    addFrontWindow(group, 0, 2.0, front + 0.06, 3.0, 1.7, frameMat, glassMat);
    addFrontWindow(group, 0, 4.4, front + 0.06, 3.0, 1.7, frameMat, glassMat);
    addFrontWindow(group, 0, 7.0, front + 0.06, 3.0, 1.45, frameMat, glassMat);
  }

  addFrontWindow(group, 0, 1.45, front + 0.07, 2.0, 2.35, frameMat, glassMat);
  addBox(group, 2.1, 2.4, 0.18, 0, 1.4, front + 0.1, woodMat, false);
  addBox(group, 2.9, 0.22, 1.7, 0, 3.0, front + 0.9, trimMat, false);
  addBox(group, 3.4, 0.2, 2.0, 0, 0.15, front + 1.3, makePavingMaterial(), false);
  addBox(group, 4.0, 0.2, 2.5, 0, 0.34, front + 1.0, makePavingMaterial(), false);

  addCircuitPlaque(group, sponsor.accent, front + 0.14, 4.05, 6.25, 2.35, 1.15);
  addSign(group, center ? "ONIR" : sponsor.initials, sponsor.accent, front + 0.2, 3.25, center ? 5.4 : 3.0, center ? 1.4 : 1.0);

  addSideWindow(group, half + 0.06, 2.0, -1.6, 1.9, 1.25, frameMat, glassMat);
  addSideWindow(group, half + 0.06, 2.0, 1.6, 1.9, 1.25, frameMat, glassMat);
  addSideWindow(group, half + 0.06, 5.0, -1.6, 1.9, 1.25, frameMat, glassMat);
  addSideWindow(group, half + 0.06, 5.0, 1.6, 1.9, 1.25, frameMat, glassMat);

  const pentW = center ? 7.2 : 5.2;
  const pentD = center ? 5.0 : 4.2;
  addBox(group, pentW, 2.1, pentD, 0, bodyH + 1.35, -0.8, bodyMat);
  addBox(group, pentW + 0.35, 0.24, pentD + 0.35, 0, bodyH + 2.5, -0.8, roofMat);
  addBox(group, 2.4, 1.0, 0.16, 0, bodyH + 1.55, -0.8 + pentD / 2 + 0.09, frameMat, false);
  addBox(group, 2.0, 0.14, 1.35, 0, bodyH + 0.45, front - 1.4, glassMat, false);
  addBox(group, 2.2, 0.18, 1.55, 0, bodyH + 0.36, front - 1.4, frameMat, false);

  const railingMat = makeFrameMaterial();
  addBox(group, width - 1.2, 0.07, 0.07, 0, bodyH + 1.0, front - 0.35, railingMat, false);
  addBox(group, 0.07, 0.7, 0.07, -width / 2 + 0.5, bodyH + 0.7, front - 0.35, railingMat, false);
  addBox(group, 0.07, 0.7, 0.07, width / 2 - 0.5, bodyH + 0.7, front - 0.35, railingMat, false);
  addBox(group, 0.07, 0.7, 0.07, 0, bodyH + 0.7, front - 0.35, railingMat, false);

  addDownspout(group, half + 0.14, 2.2, front + 0.08, bodyH - 0.6);
  addDownspout(group, -half - 0.14, 2.2, front + 0.08, bodyH - 0.6);
  addPlanter(group, -half - 0.1, front + 1.4, 0.85);
  addPlanter(group, half + 0.1, front + 1.4, 0.85);
  addPlanter(group, -half + 1.8, -front - 0.7, 0.7);

  if (center) {
    addBox(group, 4.0, 0.5, 3.4, 0, bodyH + 2.78, -0.8, makeGreenMaterial(), false);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 5.2, 8), trimMat);
    pole.position.set(7.5, bodyH + 4.7, -2.2);
    pole.castShadow = true;
    group.add(pole);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.2), new THREE.MeshBasicMaterial({ color: sponsor.accent, side: THREE.DoubleSide }));
    flag.position.set(8.65, bodyH + 6.4, -2.2);
    group.add(flag);
  }

  group.rotation.y = center ? 0 : sponsor.x < 600 ? 0.04 : -0.04;
  return group;
}

function createOrganisation(sponsor) {
  return createOffice(sponsor, false);
}

function createTower(sponsor) {
  return createOffice(sponsor, true);
}

function createTree(x, z, scale, type) {
  const group = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12 * scale, 0.17 * scale, 1.2 * scale, 6),
    new THREE.MeshStandardMaterial({ color: "#76563d", roughness: 1, flatShading: true })
  );
  trunk.position.y = 0.6 * scale;
  trunk.castShadow = true;
  group.add(trunk);

  const foliageMat = new THREE.MeshStandardMaterial({
    color: type === "pine" ? "#5b8b66" : "#78a979",
    roughness: 1,
    flatShading: true
  });
  if (type === "pine") {
    for (let i = 0; i < 3; i += 1) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry((1.25 - i * 0.25) * scale, (1.7 - i * 0.15) * scale, 7), foliageMat);
      cone.position.y = (1.5 + i * 0.85) * scale;
      cone.castShadow = true;
      group.add(cone);
    }
  } else {
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55 * scale, 0), foliageMat);
    crown.position.y = 2.35 * scale;
    crown.scale.y = 0.85;
    crown.castShadow = true;
    group.add(crown);
    const crown2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95 * scale, 0), foliageMat);
    crown2.position.set(0.7 * scale, 2.9 * scale, -0.2 * scale);
    crown2.castShadow = true;
    group.add(crown2);
  }
  group.position.set(x, 0, z);
  return group;
}

function createLamp(x, z) {
  const group = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: "#5d6e65", roughness: 0.7, metalness: 0.25 });
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 3.4, 6), metal);
  post.position.y = 1.7;
  post.castShadow = true;
  group.add(post);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), metal);
  arm.position.set(0.42, 3.4, 0);
  group.add(arm);
  const light = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 8, 6),
    new THREE.MeshStandardMaterial({ color: "#ffc46b", emissive: "#f08000", emissiveIntensity: 0.7, roughness: 0.4 })
  );
  light.position.set(0.86, 3.34, 0);
  group.add(light);
  group.position.set(x, 0, z);
  return group;
}

function createFountain() {
  const group = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: "#d8cbb2", roughness: 0.88, flatShading: true });
  const water = new THREE.MeshStandardMaterial({ color: "#88c1b6", roughness: 0.35, metalness: 0.05 });
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.6, 0.8, 14), stone);
  basin.position.y = 0.4;
  basin.castShadow = true;
  basin.receiveShadow = true;
  group.add(basin);
  const pool = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 0.16, 14), water);
  pool.position.y = 0.83;
  group.add(pool);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.55, 1.2, 10), stone);
  stem.position.y = 1.35;
  stem.castShadow = true;
  group.add(stem);
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 0.7, 0.4, 12), stone);
  bowl.position.y = 2.05;
  bowl.castShadow = true;
  group.add(bowl);
  const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.5, 8), water);
  jet.position.y = 2.85;
  group.add(jet);
  group.position.set(0, 0, 12);
  return group;
}

export function createTown3D({ container, sponsors, onOpen, onHover }) {
  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  const isDark = document.documentElement.dataset.theme === "dark";
  const skyColor = isDark ? "#0b2b21" : "#eef4e8";
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(skyColor);
  scene.fog = new THREE.Fog(skyColor, 135, 220);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 500);
  camera.position.set(66, 59, 78);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.6 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.enablePan = false;
  controls.minDistance = 48;
  controls.maxDistance = 180;
  controls.minPolarAngle = 0.45;
  controls.maxPolarAngle = Math.PI / 2.12;
  controls.target.set(0, 1.8, 2);
  controls.update();

  let hasInteracted = false;
  controls.addEventListener("start", () => {
    hasInteracted = true;
  });

  const baseCamera = new THREE.Vector3(66, 59, 78);
  function fitCamera() {
    if (hasInteracted) return;
    const aspect = camera.aspect || 1;
    const factor = aspect < 0.9 ? 1.34 : aspect < 1.15 ? 1.16 : 1;
    camera.position.copy(baseCamera).multiplyScalar(factor);
    controls.update();
  }

  const hemi = new THREE.HemisphereLight("#fff7e3", "#73896f", 1.55);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#fff0ce", 2.2);
  sun.position.set(42, 72, 28);
  sun.castShadow = true;
  sun.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048);
  sun.shadow.camera.left = -80;
  sun.shadow.camera.right = 80;
  sun.shadow.camera.top = 70;
  sun.shadow.camera.bottom = -55;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 180;
  sun.shadow.bias = -0.0004;
  scene.add(sun);

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(WORLD_W + 7, 2.6, WORLD_H + 7),
    new THREE.MeshStandardMaterial({ color: "#cdbfa2", roughness: 0.95, flatShading: true })
  );
  base.position.y = -1.35;
  base.receiveShadow = true;
  base.castShadow = true;
  scene.add(base);

  const groundTexture = makeGroundTexture();
  groundTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(WORLD_W, WORLD_H),
    new THREE.MeshStandardMaterial({ map: groundTexture, roughness: 0.98, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0.02;
  ground.receiveShadow = true;
  scene.add(ground);

  const interactive = [];
  const highlightMaterials = new Map();
  const buildingGroups = new Map();

  function register(group, sponsor) {
    group.position.set(scaleX(sponsor.x), 0, scaleZ(sponsor.y));
    group.userData.sponsorId = sponsor.id;
    group.traverse((object) => {
      if (!object.isMesh) return;
      object.userData.sponsorId = sponsor.id;
      interactive.push(object);
    });
    scene.add(group);
    buildingGroups.set(sponsor.id, group);
  }

  for (const sponsor of sponsors) {
    let group;
    if (sponsor.building === "tower") {
      group = createTower(sponsor);
    } else if (sponsor.building === "house") {
      group = createHouse(sponsor);
    } else {
      group = createOrganisation(sponsor);
    }
    highlightMaterials.set(sponsor.id, group.children.find((child) => child.userData && child.userData.isBody));
    register(group, sponsor);
  }

  const emptyMat = new THREE.MeshBasicMaterial({ color: "#f08000", transparent: true, opacity: 0.16, side: THREE.DoubleSide });
  for (const [x, y] of [[420, 300], [780, 468]]) {
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 5.4), emptyMat);
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(scaleX(x), 0.055, scaleZ(y));
    scene.add(pad);
    const crossMat = new THREE.MeshBasicMaterial({ color: "#c77819", transparent: true, opacity: 0.7 });
    const crossA = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 0.18), crossMat);
    crossA.position.set(scaleX(x), 0.09, scaleZ(y));
    scene.add(crossA);
    const crossB = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 2.4), crossMat);
    crossB.position.set(scaleX(x), 0.09, scaleZ(y));
    scene.add(crossB);
  }

  const treePositions = [
    [110, 118, 1.35, "round"], [168, 88, 1.1, "pine"], [205, 186, 0.9, "round"],
    [128, 206, 0.75, "round"], [1000, 112, 1.1, "pine"], [1062, 158, 1.25, "round"],
    [978, 188, 0.8, "round"], [1100, 470, 1.05, "round"], [1038, 666, 1.2, "pine"],
    [955, 646, 0.9, "round"], [1084, 700, 0.7, "round"], [160, 674, 1.1, "round"],
    [218, 704, 0.85, "pine"], [66, 402, 0.95, "round"], [1128, 628, 1, "round"],
    [540, 82, 0.7, "round"], [660, 82, 0.7, "round"], [330, 700, 0.8, "round"]
  ];
  for (const [x, y, scale, type] of treePositions) {
    scene.add(createTree(scaleX(x), scaleZ(y), scale, type));
  }

  for (const [x, y] of [[470, 300], [730, 300], [470, 462], [730, 462], [250, 300], [950, 300]]) {
    scene.add(createLamp(scaleX(x), scaleZ(y)));
  }
  scene.add(createFountain());

  for (const [x, y, angle] of [[500, 315, -0.12], [700, 315, 0.12], [500, 456, 0.12], [700, 456, -0.12]]) {
    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.35, 1.1),
      new THREE.MeshStandardMaterial({ color: "#a97745", roughness: 0.9, flatShading: true })
    );
    bench.position.set(scaleX(x), 0.55, scaleZ(y));
    bench.rotation.y = angle;
    bench.castShadow = true;
    scene.add(bench);
    const back = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.8, 0.1), bench.material);
    back.position.set(0, 0.45, -0.5);
    bench.add(back);
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pointerDown = null;
  let hoveredId = null;
  let running = false;
  let frame = null;

  function resize() {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    fitCamera();
    renderer.setSize(width, height, false);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  const themeObserver = new MutationObserver(() => {
    const dark = document.documentElement.dataset.theme === "dark";
    const color = dark ? "#0b2b21" : "#eef4e8";
    scene.background.set(color);
    scene.fog.color.set(color);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  function updatePointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(interactive, false);
    return hits.length ? hits[0].object.userData.sponsorId : null;
  }

  function setHovered(id) {
    if (id === hoveredId) return;
    if (hoveredId) {
      const material = highlightMaterials.get(hoveredId);
      if (material && material.material) material.material.emissive.setHex(0x000000);
    }
    hoveredId = id;
    if (id) {
      const material = highlightMaterials.get(id);
      if (material && material.material) material.material.emissive.setHex(0x1b3a2e);
    }
    renderer.domElement.style.cursor = id ? "pointer" : "grab";
    if (onHover) onHover(id);
  }

  function onPointerMove(event) {
    const id = updatePointer(event);
    setHovered(id);
  }

  function onPointerDown(event) {
    pointerDown = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event) {
    if (!pointerDown) return;
    const moved = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
    pointerDown = null;
    if (moved > 7) return;
    const id = updatePointer(event);
    if (id && onOpen) onOpen(id);
  }

  function onPointerLeave() {
    setHovered(null);
    renderer.domElement.style.cursor = "grab";
  }

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointerup", onPointerUp);
  renderer.domElement.addEventListener("pointerleave", onPointerLeave);

  function loop() {
    if (!running) return;
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    loop();
  }

  function stop() {
    running = false;
    if (frame) cancelAnimationFrame(frame);
    frame = null;
  }

  function dispose() {
    stop();
    observer.disconnect();
    themeObserver.disconnect();
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointerup", onPointerUp);
    renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
    controls.dispose();
    renderer.dispose();
    scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose());
        else object.material.dispose();
      }
    });
    container.innerHTML = "";
  }

  return { start, stop, resize, dispose };
}
