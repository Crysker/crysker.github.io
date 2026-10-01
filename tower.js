/* ============ Turmbau zu Babel / Tower of Babel ============
   Build the tower along a blueprint: pieces may only go inside the dashed outline, which narrows towards the sky.
   You drag the pieces onto the tower yourself and let go where you want them. A piece stays put as long as the centre of
   mass of everything above it sits over it (wide, grippy pieces are a safe base; slippery ones slide off).
   Up to 100 m you build with bricks and other basic things; the higher you get, the stranger the material becomes.
   Above 1000 m the builders no longer understand each other: the page changes its language, and again at 1100 m …
   Uses helpers from orchestra.js (sound) and play.js / play-shell.js (esc, lang, babelLang, unlock, sfx, play). */

const TW_W = 480, TW_H = 400, TW_K = 2, TW_GOAL = 2600, TW_GROUND = 34; // stage size, units per metre, goal height (1300 m), ground strip
const TW_STEP = 300; // the blueprint narrows in steps of this many units

/* ---- texts: en/de for the page, tr/fr/es/la for the confusion of tongues (only what the tower screen shows) ---- */
const TW_T = {
  en: {
    toy: "A building game", again: "Rebuild", height: "Height", best: "Best", pieces: "Pieces", material: "Material", current: "Selected",
    drag: "Drag a piece onto the tower", outside: "Outside the blueprint!", wobble: "The tower wobbles … {k} pieces fall.", won: "The tower touches the sky!",
    unlock: "New material: {n}", tongues: "Confusion of tongues! Everyone speaks differently now.", next: "More material from {m} m",
    widths: ["narrow", "medium", "wide"], grips: ["slippery", "okay", "grippy"], stage: "Building site"
  },
  de: {
    toy: "Ein Bauspiel", again: "Neu bauen", height: "Höhe", best: "Rekord", pieces: "Teile", material: "Material", current: "Ausgewählt",
    drag: "Zieh ein Teil auf den Turm", outside: "Außerhalb des Bauplans!", wobble: "Der Turm wankt … {k} Teile fallen.", won: "Der Turm berührt den Himmel!",
    unlock: "Neues Material: {n}", tongues: "Sprachverwirrung! Alle sprechen jetzt anders.", next: "Mehr Material ab {m} m",
    widths: ["schmal", "mittel", "breit"], grips: ["rutschig", "okay", "fest"], stage: "Baustelle"
  },
  tr: {
    again: "Yeniden kur", height: "Yükseklik", best: "Rekor", pieces: "Parça", material: "Malzeme", current: "Seçili",
    drag: "Bir parçayı kuleye sürükle", outside: "Planın dışında!", wobble: "Kule sallanıyor … {k} parça düşüyor.", won: "Kule göğe dokunuyor!",
    unlock: "Yeni malzeme: {n}", tongues: "Dil karışıklığı! Artık herkes farklı konuşuyor.", next: "{m} m'den sonra yeni malzeme",
    widths: ["dar", "orta", "geniş"], grips: ["kaygan", "idare eder", "sağlam"], stage: "İnşaat alanı"
  },
  fr: {
    again: "Recommencer", height: "Hauteur", best: "Record", pieces: "Pièces", material: "Matériau", current: "Choisi",
    drag: "Glisse une pièce sur la tour", outside: "Hors du plan !", wobble: "La tour vacille … {k} pièces tombent.", won: "La tour touche le ciel !",
    unlock: "Nouveau matériau : {n}", tongues: "Confusion des langues ! Tout le monde parle autrement.", next: "Plus de matériaux dès {m} m",
    widths: ["étroit", "moyen", "large"], grips: ["glissant", "correct", "adhérent"], stage: "Chantier"
  },
  es: {
    again: "Reconstruir", height: "Altura", best: "Récord", pieces: "Piezas", material: "Material", current: "Elegida",
    drag: "Arrastra una pieza a la torre", outside: "¡Fuera del plano!", wobble: "La torre se tambalea … caen {k} piezas.", won: "¡La torre toca el cielo!",
    unlock: "Material nuevo: {n}", tongues: "¡Confusión de lenguas! Ahora todos hablan distinto.", next: "Más material desde {m} m",
    widths: ["estrecho", "medio", "ancho"], grips: ["resbaladizo", "normal", "agarra bien"], stage: "Obra"
  },
  la: {
    again: "Iterum aedifica", height: "Altitudo", best: "Maximum", pieces: "Partes", material: "Materia", current: "Electum",
    drag: "Trahe partem ad turrim", outside: "Extra formam!", wobble: "Turris nutat … {k} partes cadunt.", won: "Turris caelum tangit!",
    unlock: "Nova materia: {n}", tongues: "Confusio linguarum! Iam omnes aliter loquuntur.", next: "Plus materiae ab {m} m",
    widths: ["angustum", "medium", "latum"], grips: ["lubricum", "tolerabile", "firmum"], stage: "Aedificium"
  }
};
const tt = (k) => { const b = tw.babel && TW_T[tw.babel]; return b && b[k] !== undefined ? b[k] : (TW_T[lang] || TW_T.en)[k]; };

/* what the page says in those other languages (menu bar and breadcrumbs) */
if (typeof SHELL_T !== "undefined") {
  Object.assign(SHELL_T, {
    tr: { projects: "Projeler", experience: "Deneyim", contact: "İletişim", play: "Oyun Bahçesi" },
    fr: { projects: "Projets", experience: "Parcours", contact: "Contact", play: "Terrain de jeu" },
    es: { projects: "Proyectos", experience: "Trayectoria", contact: "Contacto", play: "Zona de juegos" },
    la: { projects: "Opera", experience: "Cursus", contact: "Epistula", play: "Ludus" }
  });
}
function twPatchTexts() { // PLAY_T lives in play.js, which loads after this file
  if (typeof PLAY_T === "undefined" || PLAY_T.tr) return;
  Object.assign(PLAY_T, {
    tr: { home: "Ana sayfa", title: "Oyun Bahçesi", g3: "Babil Kulesi", back: "Geri" },
    fr: { home: "Accueil", title: "Terrain de jeu", g3: "La Tour de Babel", back: "Retour" },
    es: { home: "Inicio", title: "Zona de juegos", g3: "La Torre de Babel", back: "Volver" },
    la: { home: "Domus", title: "Ludus", g3: "Turris Babel", back: "Redi" }
  });
}
const TW_BABEL = [[1000, "tr"], [1100, "fr"], [1200, "es"], [1300, "la"]]; // from this height (m) the page speaks this language

/* ---- material: emoji, names [en, de], width, height, grip (1 = sticks, low = slides off) ---- */
const TW_ITEMS = {
  brick: { e: "🧱", n: ["Brick", "Ziegel"], w: 90, h: 38, g: .95 },
  stone: { e: "🪨", n: ["Stone", "Stein"], w: 80, h: 42, g: .9 },
  wood: { e: "🪵", n: ["Log", "Holzbalken"], w: 110, h: 30, g: .85 },
  wall: { e: "🧱", n: ["Wall", "Mauer"], w: 150, h: 44, g: 1 },
  cat: { e: "🐱", n: ["Cat", "Katze"], w: 58, h: 52, g: .6 },
  cheese: { e: "🧀", n: ["Cheese", "Käse"], w: 80, h: 40, g: .7 },
  sock: { e: "🧦", n: ["Sock", "Socke"], w: 50, h: 56, g: .55 },
  cloud: { e: "☁️", n: ["Cloud", "Wolke"], w: 110, h: 40, g: .5 },
  pizza: { e: "🍕", n: ["Pizza", "Pizza"], w: 96, h: 26, g: .55 },
  donut: { e: "🍩", n: ["Donut", "Donut"], w: 70, h: 36, g: .6 },
  duck: { e: "🦆", n: ["Rubber duck", "Quietscheente"], w: 56, h: 50, g: .5 },
  ufo: { e: "🛸", n: ["UFO", "UFO"], w: 110, h: 40, g: .5 },
  rocket: { e: "🚀", n: ["Rocket", "Rakete"], w: 50, h: 100, g: .5 },
  piano: { e: "🎹", n: ["Piano", "Klavier"], w: 120, h: 56, g: .85 },
  moon: { e: "🌙", n: ["Moon", "Mond"], w: 76, h: 58, g: .5 },
  planet: { e: "🪐", n: ["Planet", "Planet"], w: 120, h: 62, g: .55 },
  whale: { e: "🐋", n: ["Whale", "Wal"], w: 140, h: 60, g: .4 },
  rainbow: { e: "🌈", n: ["Rainbow", "Regenbogen"], w: 140, h: 40, g: .5 },
  angel: { e: "👼", n: ["Angel", "Engel"], w: 60, h: 56, g: .5 },
  dragon: { e: "🐉", n: ["Dragon", "Drache"], w: 120, h: 70, g: .6 },
  castle: { e: "🏰", n: ["Castle", "Burg"], w: 150, h: 110, g: .95 },
  stairway: { e: "🪜", n: ["Stairway", "Himmelsleiter"], w: 70, h: 130, g: .7 },
  babelstone: { e: "🗿", n: ["Babel stone", "Babelstein"], w: 124, h: 90, g: 1 },
  tongue: { e: "👅", n: ["Tongue", "Zunge"], w: 90, h: 34, g: .3 },
  clown: { e: "🤡", n: ["Clown", "Clown"], w: 56, h: 56, g: .5 },
  trophy: { e: "🏆", n: ["Trophy", "Pokal"], w: 60, h: 70, g: .8 }
};
/* from this height (m) on, these things are available; the higher, the stranger */
const TW_TIERS = [
  [0, ["brick", "stone", "wood", "wall"]],
  [100, ["cat", "cheese", "sock"]],
  [250, ["cloud", "pizza", "donut", "duck"]],
  [400, ["ufo", "rocket", "piano"]],
  [600, ["moon", "planet", "whale"]],
  [800, ["rainbow", "angel", "dragon"]],
  [1000, ["castle", "stairway", "babelstone"]],
  [1100, ["tongue", "clown", "trophy"]]
];

/* ---- state ---- */
const tw = { best: 0, cur: "brick", tower: [], fired: {}, peak: 0, x: 0, won: false, pressing: false, bannerT: 0, u: 1, babel: null, newest: [] };
const twBestSaved = () => { try { return +localStorage.getItem("towerBest") || 0; } catch (e) { return 0; } };
const twSaveBest = () => { try { localStorage.setItem("towerBest", String(tw.best)); } catch (e) {} };
const twItem = (id) => TW_ITEMS[id];
const twName = (id) => TW_ITEMS[id].n[tw.babel ? 0 : (lang === "de" ? 1 : 0)];
const twClamp = (v, a, b) => Math.min(b, Math.max(a, v));
const twMeters = () => Math.round(twHeight() / TW_K);
const twAvailable = () => TW_TIERS.filter(([m]) => m <= tw.peak).flatMap(([, ids]) => ids);

/* ---- the blueprint ---- */
const twHalfWidth = (y) => Math.max(64, 160 - Math.floor(y / TW_STEP) * 12);
function twPlanSVG() { // a stepped outline, wider at the bottom, narrower towards the sky
  const H = TW_GOAL, left = [], right = [];
  for (let y = 0; y < H; y += TW_STEP) {
    const w = twHalfWidth(y), top = Math.min(H, y + TW_STEP);
    left.push([-w, y], [-w, top]); right.push([w, y], [w, top]);
  }
  const pt = ([x, y]) => `${x + TW_W / 2},${H - y}`;
  const d = "M" + left.map(pt).join(" L") + " L" + right.reverse().map(pt).join(" L") + " Z";
  const ticks = TW_TIERS.filter(([m]) => m > 0).map(([m]) => {
    const y = H - m * TW_K;
    return `<line x1="0" x2="${TW_W}" y1="${y}" y2="${y}" class="tw__tick"/><text x="8" y="${y - 6}" class="tw__ticklabel">${m} m</text>`;
  }).join("");
  return `<path d="${d}" class="tw__planpath"/>${ticks}<text x="${TW_W / 2}" y="22" text-anchor="middle" class="tw__ticklabel">☁ ${Math.round(H / TW_K)} m ☁</text>`;
}

/* ---- the tower ---- */
const twHeight = () => tw.tower.reduce((s, p) => s + p.h, 0);
function twStable(list) { // lowest joint that does not hold: returns the index of the support piece, or -1
  for (let i = 0; i < list.length - 1; i++) {
    let m = 0, mx = 0;
    for (let j = i + 1; j < list.length; j++) { m += list[j].m; mx += list[j].m * list[j].x; }
    if (Math.abs(mx / m - list[i].x) > list[i].w / 2 * list[i].g) return i;
  }
  return -1;
}
const twFits = (it, x) => Math.abs(x) + it.w / 2 <= twHalfWidth(twHeight()) + 12; // inside the blueprint at this height
function twDrop() {
  if (tw.won) return;
  const it = twItem(tw.cur), top = tw.tower[tw.tower.length - 1], px = Math.round(tw.x);
  if (!twFits(it, px)) { // the blueprint says no
    twBanner(tt("outside"), 1800);
    if (!playMuted) oTone(260, orchCtx().currentTime, 0.2, "sawtooth", 0.05, 150);
    return;
  }
  const piece = { id: tw.cur, x: px, w: it.w, h: it.h, g: it.g, m: it.w * it.h / 1000, e: it.e };
  if (top && Math.abs(px - top.x) >= (piece.w + top.w) / 2 - 4) { // not even touching the tower
    twBanner(tt("outside"), 1800);
    twFall([{ ...piece, y: twHeight() + 40 }]);
    return;
  }
  tw.tower.push(piece);
  if (!playMuted) { ORCH_VOICE.blob(orchCtx().currentTime + 0.12); oTone(180 + Math.min(300, twHeight() / 8), orchCtx().currentTime + 0.1, 0.1, "triangle", 0.08); }
  const bad = twStable(tw.tower);
  if (bad >= 0) {
    const lost = tw.tower.splice(bad + 1);
    let y = tw.tower.reduce((s, p) => s + p.h, 0);
    const falling = lost.map((p) => { const f = { ...p, y }; y += p.h; return f; });
    twPaintAll(true);
    setTimeout(() => {
      twBanner(tt("wobble").replace("{k}", lost.length));
      if (!playMuted) [300, 240, 190, 140].forEach((f, i) => oTone(f, orchCtx().currentTime + i * 0.09, 0.3, "sawtooth", 0.06, f * 0.6));
      twFall(falling);
      twPaintAll();
      twLanguage();
    }, 260);
    return;
  }
  twPaintAll(true);
  const m = twMeters();
  if (m > tw.peak) tw.peak = m;
  twUnlock();
  if (m >= 500 && !tw.fired.cloud) { tw.fired.cloud = true; const c = document.getElementById("twCloud"); if (c) { c.classList.remove("is-on"); void c.offsetWidth; c.classList.add("is-on"); } }
  if (m > tw.best) { tw.best = m; twSaveBest(); }
  if (twHeight() >= TW_GOAL) twWin();
  setTimeout(twLanguage, 380);
}
function twUnlock() { // stranger material the higher you get
  TW_TIERS.forEach(([at, ids], i) => {
    if (at === 0 || tw.peak < at || tw.fired["t" + i]) return;
    tw.fired["t" + i] = true;
    tw.newest = ids;
    twBanner(tt("unlock").replace("{n}", ids.map((id) => twItem(id).e + " " + twName(id)).join(", ")), 4200);
    if (!playMuted) [523, 659, 784].forEach((f, k) => oTone(f, orchCtx().currentTime + k * 0.08, 0.25, "triangle", 0.1));
    twPaintInv();
  });
}
function twLanguage() { // confusion of tongues: the page speaks another language at 1000 m, 1100 m, …
  twPatchTexts();
  let l = null;
  TW_BABEL.forEach(([at, lg]) => { if (twMeters() >= at) l = lg; });
  if (l === tw.babel) return;
  tw.babel = l; babelLang = l;
  applyShell();
  renderPlay();
  if (l) {
    twBanner(tt("tongues"), 4200);
    if (!playMuted) [196, 233, 175, 262].forEach((f, i) => oTone(f, orchCtx().currentTime + i * 0.12, 0.3, "sawtooth", 0.05));
  }
}
function twWin() {
  tw.won = true;
  twBanner(tt("won"), 6000);
  const st = document.getElementById("twStage");
  if (st) st.classList.add("is-won");
  if (!playMuted) [262, 330, 392, 523, 659, 784, 1047].forEach((f, i) => oTone(f, orchCtx().currentTime + i * 0.1, 0.5, "triangle", 0.11));
  unlock("babel");
  twPaintAll();
}
function twReset() {
  tw.tower = []; tw.fired = {}; tw.won = false; tw.peak = 0; tw.cur = "brick"; tw.newest = [];
  const st = document.getElementById("twStage");
  if (st) st.classList.remove("is-won");
  if (tw.babel) { tw.babel = null; babelLang = null; applyShell(); renderPlay(); return; }
  twPaintAll();
}
function twFall(list) { // pieces that slide off tumble away and fade
  const world = document.getElementById("twTower");
  if (!world) return;
  list.forEach((p) => {
    const el = twPieceEl(p, p.y);
    el.classList.add("is-falling");
    el.style.setProperty("--dx", (Math.random() * 160 - 80) * tw.u + "px");
    el.style.setProperty("--rot", (Math.random() * 120 - 60) + "deg");
    world.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  });
}

/* ---- drawing: the things themselves, no coloured tiles ---- */
function twFace(it) { // a wide piece is a row of the same thing, so a wall looks like a wall
  const n = twClamp(Math.round(it.w / it.h), 1, 5), size = Math.min(it.h * 0.95, it.w / n * 0.95);
  return `<span style="font-size:${size * tw.u}px">${it.e}</span>`.repeat(n);
}
function twPieceEl(p, y) {
  const el = document.createElement("div"), u = tw.u;
  el.className = "tw__piece";
  el.style.cssText = `width:${p.w * u}px;height:${p.h * u}px;left:${(TW_W / 2 + p.x - p.w / 2) * u}px;bottom:${y * u}px`;
  el.innerHTML = twFace(p);
  return el;
}
const twCamera = () => Math.max(0, twHeight() - 170);
function twPaintTower(animateTop) {
  const world = document.getElementById("twTower");
  if (!world) return;
  world.querySelectorAll(".tw__piece:not(.is-falling)").forEach((e) => e.remove());
  let y = 0;
  tw.tower.forEach((p, i) => {
    const el = twPieceEl(p, y);
    if (animateTop && i === tw.tower.length - 1) el.classList.add("is-new");
    world.appendChild(el);
    y += p.h;
  });
  const worldEl = document.getElementById("twWorld"), plan = document.getElementById("twPlan"), u = tw.u;
  worldEl.style.bottom = TW_GROUND * u + "px";
  worldEl.style.transform = `translateY(${twCamera() * u}px)`;
  plan.style.height = TW_GOAL * u + "px";
  // sway: the closer a joint is to giving way, the more the tower leans and wobbles
  let risk = 0;
  for (let i = 0; i < tw.tower.length - 1; i++) {
    let m = 0, mx = 0;
    for (let j = i + 1; j < tw.tower.length; j++) { m += tw.tower[j].m; mx += tw.tower[j].m * tw.tower[j].x; }
    risk = Math.max(risk, Math.abs(mx / m - tw.tower[i].x) / (tw.tower[i].w / 2 * tw.tower[i].g));
  }
  const stage = document.getElementById("twStage");
  stage.style.setProperty("--sway", (risk * 2.2 + twHeight() / TW_GOAL * 0.7).toFixed(2) + "deg");
  stage.style.setProperty("--r", Math.min(1, twHeight() / TW_GOAL).toFixed(3));
}
function twPaintHud() {
  const hud = document.getElementById("twHud");
  if (hud) hud.innerHTML = `<span>${esc(tt("height"))}: <b>${twMeters()} m</b></span><span>${esc(tt("pieces"))}: <b>${tw.tower.length}</b></span><span>${esc(tt("best"))}: <b>${tw.best} m</b></span>`;
  const cur = twItem(tw.cur), wi = cur.w < 60 ? 0 : cur.w < 100 ? 1 : 2, gi = cur.g < 0.55 ? 0 : cur.g < 0.8 ? 1 : 2;
  document.getElementById("twCur").innerHTML = `${esc(tt("current"))}: <b>${cur.e} ${esc(twName(tw.cur))}</b> · ${esc(tt("widths")[wi])} · ${esc(tt("grips")[gi])}`;
}
function twPaintInv() {
  const inv = document.getElementById("twInv");
  if (!inv) return;
  const room = (twHalfWidth(twHeight()) + 12) * 2; // what still fits at the current height
  const next = TW_TIERS.find(([m]) => m > tw.peak);
  inv.innerHTML = twAvailable().map((id) => {
    const it = twItem(id);
    return `<button type="button" class="tw__chip${id === tw.cur ? " is-current" : ""}${tw.newest.includes(id) ? " is-newest" : ""}${it.w > room ? " is-toowide" : ""}" data-id="${id}"><span>${it.e}</span> ${esc(twName(id))}</button>`;
  }).join("") + (next ? `<p class="tw__next">🔒 ${esc(tt("next").replace("{m}", next[0]))}</p>` : "");
}
function twPaintAll(animateTop) { twPaintTower(animateTop); twPaintHud(); twPaintInv(); }
function twBanner(text, ms = 3200) {
  const b = document.getElementById("twBanner");
  if (!b) return;
  b.textContent = text; b.classList.add("is-on");
  clearTimeout(tw.bannerT); tw.bannerT = setTimeout(() => b.classList.remove("is-on"), ms);
}

/* ---- placing pieces yourself: drag from the list onto the tower, or press on the stage and slide ---- */
function twShowPreview(clientX) { // the piece hovers where it would land; red when the blueprint does not allow it
  const stage = document.getElementById("twStage"), h = document.getElementById("twHover");
  if (!stage || !h || tw.won) return;
  const r = stage.getBoundingClientRect(), it = twItem(tw.cur), u = tw.u;
  tw.x = twClamp((clientX - r.left) / u - TW_W / 2, -(TW_W / 2 - 10), TW_W / 2 - 10);
  h.style.display = "";
  h.style.width = it.w * u + "px"; h.style.height = it.h * u + "px";
  h.innerHTML = twFace(it);
  h.classList.toggle("is-bad", !twFits(it, tw.x));
  h.style.transform = `translate(${(TW_W / 2 + tw.x - it.w / 2) * u}px, ${-(TW_GROUND + twHeight() - twCamera() + 6) * u}px)`;
}
function twHidePreview() { const h = document.getElementById("twHover"); if (h) h.style.display = "none"; }
const twOverStage = (x, y) => { const r = document.getElementById("twStage").getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; };
function twStop() { // leaving the game: the page speaks your language again
  tw.pressing = false;
  if (tw.babel) { tw.babel = null; babelLang = null; applyShell(); }
}
function twResize() {
  const s = document.getElementById("twStage");
  if (!s) return;
  tw.u = s.clientWidth / TW_W;
  twPaintTower();
}
addEventListener("resize", () => { if (document.getElementById("twStage")) twResize(); });

function renderTower() {
  twPatchTexts();
  if (!tw.best) tw.best = twBestSaved();
  playBody.innerHTML = `
    <div class="tw">
      <div class="tw__main">
        <div class="tw__stage" id="twStage" tabindex="0" role="application" aria-label="${esc(tt("stage"))}">
          <div class="tw__sky" aria-hidden="true"></div>
          <div class="tw__world" id="twWorld" style="bottom:0">
            <svg class="tw__plan" id="twPlan" viewBox="0 0 ${TW_W} ${TW_GOAL}" aria-hidden="true">${twPlanSVG()}</svg>
            <div class="tw__tower" id="twTower"><div class="tw__ground"></div></div>
          </div>
          <div class="tw__cloud" id="twCloud" aria-hidden="true">☁️</div>
          <div class="tw__piece tw__hover" id="twHover" aria-hidden="true" style="display:none"></div>
          <p class="tw__hud" id="twHud"></p>
          <p class="orch__banner tw__banner" id="twBanner" role="status" aria-live="polite"></p>
        </div>
        <div class="tw__bar">
          <span class="tw__cur" id="twCur"></span>
          <button type="button" class="orch__clear" id="twReset"><span aria-hidden="true">↺</span> ${esc(tt("again"))}</button>
        </div>
      </div>
      <div class="tw__side">
        <h3 class="tw__invtitle">${esc(tt("material"))} <span class="tw__draghint">· ${esc(tt("drag"))}</span></h3>
        <div class="tw__inv" id="twInv"></div>
      </div>
    </div>`;
  const stage = document.getElementById("twStage");
  tw.u = stage.clientWidth / TW_W;
  twPaintAll();
  document.getElementById("twReset").addEventListener("click", () => { sfx.pop(); twReset(); });

  /* the stage: the piece follows the mouse; press and slide on touch screens; let go to place it */
  stage.addEventListener("pointermove", (e) => { if (!tw.won && (e.pointerType === "mouse" || tw.pressing)) twShowPreview(e.clientX); });
  stage.addEventListener("pointerleave", () => { if (!tw.pressing) twHidePreview(); });
  stage.addEventListener("pointerdown", (e) => { if (tw.won) return; tw.pressing = true; if (stage.setPointerCapture) stage.setPointerCapture(e.pointerId); twShowPreview(e.clientX); });
  stage.addEventListener("pointerup", (e) => {
    if (!tw.pressing) return;
    tw.pressing = false;
    twShowPreview(e.clientX);
    twDrop();
    if (e.pointerType !== "mouse") twHidePreview();
  });
  stage.addEventListener("pointercancel", () => { tw.pressing = false; twHidePreview(); });
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const r = stage.getBoundingClientRect();
      twShowPreview(r.left + (TW_W / 2 + tw.x + (e.key === "ArrowLeft" ? -14 : 14)) * tw.u);
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (document.getElementById("twHover").style.display === "none") twShowPreview(stage.getBoundingClientRect().left + stage.clientWidth / 2);
      twDrop();
    }
  });

  /* the list: tap to select; drag a piece onto the stage to build with it */
  const inv = document.getElementById("twInv");
  inv.addEventListener("pointerdown", (e) => {
    const chip = e.target.closest(".tw__chip");
    if (!chip) return;
    const id = chip.dataset.id, sx = e.clientX, sy = e.clientY;
    let ghost = null;
    const select = () => { tw.cur = id; tw.newest = []; twPaintHud(); twPaintInv(); if (!playMuted) ORCH_VOICE.octo(orchCtx().currentTime + 0.01, 523); };
    const move = (ev) => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
        const it = twItem(id);
        ghost = document.createElement("div");
        ghost.className = "tw__piece tw__dragghost";
        ghost.style.cssText = `width:${it.w * tw.u}px;height:${it.h * tw.u}px`;
        ghost.innerHTML = twFace(it);
        document.body.appendChild(ghost);
        select();
      }
      if (ghost) {
        ghost.style.left = ev.clientX + "px"; ghost.style.top = ev.clientY + "px";
        const over = twOverStage(ev.clientX, ev.clientY);
        ghost.style.opacity = over ? "0" : ".9"; // over the tower the landing preview takes over
        if (over) twShowPreview(ev.clientX); else twHidePreview();
      }
    };
    const up = (ev) => {
      removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
      if (ghost) {
        ghost.remove();
        if (twOverStage(ev.clientX, ev.clientY)) { twShowPreview(ev.clientX); twDrop(); if (ev.pointerType !== "mouse") twHidePreview(); }
        else twHidePreview();
      } else select(); // a plain tap
    };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  });
  inv.addEventListener("click", (e) => { const c = e.target.closest(".tw__chip"); if (c && e.detail === 0) { tw.cur = c.dataset.id; tw.newest = []; twPaintHud(); twPaintInv(); } }); // keyboard
}
