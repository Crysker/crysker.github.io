/* ============ Turmbau zu Babel / Tower of Babel ============
   Combine two things to craft a new one (Infinite Craft style, but with hand-written recipes and a name-mashing
   fallback, so no combination is ever a dead end), then stack your finds into a tower that reaches for the sky.
   You drag the pieces onto the tower yourself and let go where you want them. Heavy, wide and grippy pieces make a safe base,
   slippery ones are risky. The physics is a simple balance check: a joint holds when the centre of mass of everything
   above it sits over the piece below. Uses helpers from orchestra.js (sound) and play.js / play-shell.js. */

const TW_W = 480, TW_H = 400, TW_GOAL = 1000, TW_GROUND = 34; // stage size and goal height, in "units" (10 units = 1 m)
const TW_T = {
  en: {
    toy: "A building game", craft: "Craft", build: "Build", combine: "Combine two things", drag: "Drag a piece onto the tower", again: "Rebuild",
    height: "Height", best: "Best", pieces: "Pieces", discovered: "Discovered", current: "Selected",
    newItem: "New: {n}!", miss: "Missed the tower!", wobble: "The tower wobbles … {k} pieces fall.", won: "The tower touches the sky!",
    widths: ["narrow", "medium", "wide"], grips: ["slippery", "okay", "grippy"],
    events: { 25: "Confusion of tongues! The builders no longer understand each other.", 50: "A cloud brushes the tower …", 75: "The air gets thin. Hold on tight." },
    stage: "Building site", pickLabel: "Pieces",
    levels: ["Double ", "Super Saiyan ", "Super Saiyan 2 ", "Super Saiyan 3 ", "Super Saiyan God ", "Ultra Instinct "]
  },
  de: {
    toy: "Ein Bauspiel", craft: "Basteln", build: "Bauen", combine: "Kombiniere zwei Dinge", drag: "Zieh ein Teil auf den Turm", again: "Neu bauen",
    height: "Höhe", best: "Rekord", pieces: "Teile", discovered: "Entdeckt", current: "Ausgewählt",
    newItem: "Neu: {n}!", miss: "Daneben!", wobble: "Der Turm wankt … {k} Teile fallen.", won: "Der Turm berührt den Himmel!",
    widths: ["schmal", "mittel", "breit"], grips: ["rutschig", "okay", "fest"],
    events: { 25: "Sprachverwirrung! Die Bauleute verstehen sich nicht mehr.", 50: "Eine Wolke streift den Turm …", 75: "Die Luft wird dünn. Gut festhalten." },
    stage: "Baustelle", pickLabel: "Teile",
    levels: ["Doppel-", "Super-Saiyajin-", "Super-Saiyajin-2-", "Super-Saiyajin-3-", "Super-Saiyajin-Gott-", "Ultra-Instinkt-"]
  }
};
const tt = (k) => (TW_T[lang] || TW_T.en)[k];

/* ---- things: emoji, names [en, de], width, height, grip (1 = sticks, low = slides off) ---- */
const TW_ITEMS = {
  brick: { e: "🧱", n: ["Brick", "Ziegel"], w: 90, h: 38, g: .95 },
  cat: { e: "🐱", n: ["Cat", "Katze"], w: 58, h: 52, g: .6 },
  cloud: { e: "☁️", n: ["Cloud", "Wolke"], w: 110, h: 40, g: .5 },
  cheese: { e: "🧀", n: ["Cheese", "Käse"], w: 80, h: 40, g: .7 },
  sock: { e: "🧦", n: ["Sock", "Socke"], w: 50, h: 56, g: .55 },
  water: { e: "💧", n: ["Water", "Wasser"], w: 40, h: 40, g: .4 },
  wall: { e: "🧱", n: ["Wall", "Mauer"], w: 150, h: 44, g: 1 },
  puddle: { e: "💦", n: ["Puddle", "Pfütze"], w: 120, h: 20, g: .35 },
  mud: { e: "🟫", n: ["Mud", "Matsch"], w: 90, h: 30, g: .75 },
  mortar: { e: "🪣", n: ["Mortar", "Mörtel"], w: 110, h: 30, g: 1 },
  rain: { e: "🌧️", n: ["Rain", "Regen"], w: 100, h: 40, g: .4 },
  fluffcat: { e: "😺", n: ["Cloud cat", "Wolkenkatze"], w: 84, h: 56, g: .55 },
  wetcat: { e: "😾", n: ["Wet cat", "Nasse Katze"], w: 56, h: 52, g: .45 },
  mouse: { e: "🐭", n: ["Mouse", "Maus"], w: 40, h: 34, g: .6 },
  fondue: { e: "🫕", n: ["Fondue", "Fondue"], w: 96, h: 44, g: .5 },
  cheesebrick: { e: "🟨", n: ["Cheese brick", "Käseziegel"], w: 104, h: 46, g: .8 },
  moon: { e: "🌙", n: ["Moon", "Mond"], w: 76, h: 56, g: .5 },
  stinksock: { e: "💨", n: ["Stink sock", "Stinksocke"], w: 56, h: 60, g: .45 },
  wetsock: { e: "🧦", n: ["Wet sock", "Nasse Socke"], w: 52, h: 58, g: .4 },
  slipper: { e: "🥿", n: ["Slipper", "Pantoffel"], w: 74, h: 38, g: .85 },
  sockstone: { e: "🪨", n: ["Sock stone", "Sockenstein"], w: 70, h: 50, g: .7 },
  cloudbrick: { e: "🫧", n: ["Cloud brick", "Wolkenziegel"], w: 104, h: 42, g: .6 },
  house: { e: "🏠", n: ["House", "Haus"], w: 130, h: 76, g: .95 },
  tower: { e: "🗼", n: ["Tall tower", "Hoher Turm"], w: 96, h: 104, g: .9 },
  stars: { e: "⭐", n: ["Stars", "Sterne"], w: 70, h: 48, g: .55 },
  goldbrick: { e: "🥇", n: ["Gold brick", "Goldziegel"], w: 100, h: 44, g: 1 },
  rainbow: { e: "🌈", n: ["Rainbow", "Regenbogen"], w: 140, h: 40, g: .5 },
  bridge: { e: "🌉", n: ["Bridge", "Brücke"], w: 160, h: 34, g: .9 },
  castle: { e: "🏰", n: ["Castle", "Burg"], w: 150, h: 110, g: .95 },
  angelcat: { e: "😇", n: ["Angel cat", "Engelskatze"], w: 84, h: 58, g: .5 },
  babelstone: { e: "🗿", n: ["Babel stone", "Babelstein"], w: 124, h: 90, g: 1 },
  stairway: { e: "🪜", n: ["Stairway", "Himmelsleiter"], w: 70, h: 130, g: .7 }
};
const TW_START = ["brick", "cat", "cloud", "cheese", "sock", "water"];
const TW_RECIPES = {};
[["brick", "brick", "wall"], ["water", "water", "puddle"], ["brick", "water", "mud"], ["brick", "mud", "mortar"], ["cloud", "water", "rain"],
 ["cat", "cloud", "fluffcat"], ["cat", "water", "wetcat"], ["cat", "cheese", "mouse"], ["cheese", "water", "fondue"], ["brick", "cheese", "cheesebrick"],
 ["cheese", "cloud", "moon"], ["cheese", "sock", "stinksock"], ["sock", "water", "wetsock"], ["cat", "sock", "slipper"], ["brick", "sock", "sockstone"],
 ["brick", "cloud", "cloudbrick"], ["mortar", "wall", "house"], ["wall", "wall", "tower"], ["cloud", "moon", "stars"], ["mortar", "stars", "goldbrick"],
 ["moon", "rain", "rainbow"], ["water", "wall", "bridge"], ["house", "tower", "castle"], ["cat", "stars", "angelcat"], ["castle", "tower", "babelstone"],
 ["bridge", "tower", "stairway"]
].forEach(([a, b, r]) => { TW_RECIPES[[a, b].sort().join("+")] = r; });

/* ---- state ---- */
const tw = { found: [], mash: {}, best: 0, cur: "brick", mode: "craft", slots: [], tower: [], fired: {}, x: 0, won: false, lock: false, pressing: false, bannerT: 0, u: 1 };
function twLoad() {
  try { tw.found = JSON.parse(localStorage.getItem("towerFound") || "null") || [...TW_START]; } catch (e) { tw.found = [...TW_START]; }
  try { tw.mash = JSON.parse(localStorage.getItem("towerMash") || "{}"); } catch (e) { tw.mash = {}; }
  tw.best = twBestSaved();
  Object.values(tw.mash).forEach((m) => { // older saves: "Double Double Cheese" becomes a level on the ladder
    if (m.lvl || !/^Double /.test(m.n[0])) return;
    const lvl = Math.min(6, (m.n[0].match(/Double /g) || []).length);
    m.bn = [m.n[0].replace(/^(Double )+/, ""), m.n[1].replace(/^(Doppel-)+/, "")];
    m.lvl = lvl; m.n = twLevelName(m.bn, lvl);
  });
  TW_START.forEach((id) => { if (!tw.found.includes(id)) tw.found.push(id); });
}
const twBestSaved = () => { try { return +localStorage.getItem("towerBest") || 0; } catch (e) { return 0; } };
function twSave() {
  try { localStorage.setItem("towerFound", JSON.stringify(tw.found)); localStorage.setItem("towerMash", JSON.stringify(tw.mash)); localStorage.setItem("towerBest", String(tw.best)); } catch (e) {}
}
const twItem = (id) => TW_ITEMS[id] || tw.mash[id];
const twName = (id) => twItem(id).n[lang === "de" ? 1 : 0];
const twHash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; };
const twClamp = (v, a, b) => Math.min(b, Math.max(a, v));
const twHue = (id) => Math.round(twHash("hue" + id) * 360);

/* ---- crafting ---- */
function twMashName(a, b, i) { // "Cheese" + "Sock" = "Cheesock"
  const x = a.n[i].split(" ")[0], y = b.n[i].split(" ").pop();
  const name = x.slice(0, Math.ceil(x.length * 0.7)) + y.slice(Math.floor(y.length * 0.45)).toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
}
/* doubling the same thing again and again climbs a ladder: Double Cheese, Super Saiyan Cheese, … Ultra Instinct Cheese */
const twLevelName = (bn, lvl) => [0, 1].map((i) => TW_T[i ? "de" : "en"].levels[Math.min(lvl, 6) - 1] + bn[i]);
function twCombine(a, b) {
  const key = [a, b].sort().join("+");
  if (TW_RECIPES[key]) return TW_RECIPES[key];
  if (a === b && (twItem(a).lvl || 0) >= 6) return a; // already at the top of the ladder
  const id = "m:" + key;
  if (!tw.mash[id]) {
    const A = twItem(a), B = twItem(b), r = twHash(key), r2 = twHash(key + "!");
    if (a === b) {
      const lvl = (A.lvl || 0) + 1, bn = A.bn || A.n;
      tw.mash[id] = {
        e: A.e, bn, lvl, n: twLevelName(bn, lvl),
        w: Math.round(twClamp(A.w * 1.12, 34, 150)), h: Math.round(twClamp(A.h * 1.1, 24, 110)), g: +twClamp(A.g + 0.03, 0.36, 0.98).toFixed(2)
      };
    } else tw.mash[id] = {
      e: r < 0.5 ? A.e : B.e,
      n: [twMashName(A, B, 0), twMashName(A, B, 1)],
      w: Math.round(twClamp((A.w + B.w) / 2 * (0.85 + r * 0.4), 34, 150)),
      h: Math.round(twClamp((A.h + B.h) / 2 * (0.85 + r2 * 0.4), 24, 92)),
      g: +twClamp((A.g + B.g) / 2 + (r2 - 0.5) * 0.2, 0.36, 0.95).toFixed(2)
    };
  }
  return id;
}
function twPick(id) {
  if (tw.mode === "build") { tw.cur = id; twPaintAll(); if (!playMuted) ORCH_VOICE.octo(orchCtx().currentTime + 0.01, 523); return; }
  if (tw.lock || tw.slots.length >= 2) return;
  tw.slots.push(id);
  if (!playMuted) ORCH_VOICE.octo(orchCtx().currentTime + 0.01, tw.slots.length === 1 ? 392 : 494);
  twPaintCraft();
  if (tw.slots.length === 2) {
    tw.lock = true;
    const res = twCombine(tw.slots[0], tw.slots[1]);
    setTimeout(() => {
      const isNew = !tw.found.includes(res);
      if (isNew) {
        tw.found.push(res); twSave();
        twBanner(tt("newItem").replace("{n}", twItem(res).e + " " + twName(res)));
        if (!playMuted) [523, 659, 784, 1047].forEach((f, i) => oTone(f, orchCtx().currentTime + i * 0.07, 0.28, "triangle", 0.1));
        if (tw.found.length - TW_START.length >= 15) unlock("alchemist");
      } else if (!playMuted) oTone(660, orchCtx().currentTime, 0.12, "triangle", 0.08);
      tw.cur = res;
      tw.slots = [res];
      tw.newest = isNew ? res : null;
      twPaintAll();
      setTimeout(() => { tw.slots = []; tw.lock = false; tw.newest = null; twPaintCraft(); twPaintInv(); }, 1100);
    }, 260);
  }
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
function twDrop() {
  if (tw.won) return;
  const it = twItem(tw.cur), top = tw.tower[tw.tower.length - 1], px = Math.round(tw.x);
  const piece = { id: tw.cur, x: px, w: it.w, h: it.h, g: it.g, m: it.w * it.h / 1000, e: it.e };
  if (top && Math.abs(px - top.x) >= (piece.w + top.w) / 2 - 4) { // not even touching
    twBanner(tt("miss"));
    if (!playMuted) oTone(300, orchCtx().currentTime, 0.25, "sawtooth", 0.05, 120);
    twFall([{ ...piece, y: twHeight() + 40 }]);
    return;
  }
  tw.tower.push(piece);
  if (!playMuted) { ORCH_VOICE.blob(orchCtx().currentTime + 0.12); oTone(180 + Math.min(300, twHeight() / 4), orchCtx().currentTime + 0.1, 0.1, "triangle", 0.08); }
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
    }, 260);
    return;
  }
  twPaintAll(true);
  const meters = Math.round(twHeight() / 10);
  for (const at of [25, 50, 75]) if (meters >= at && !tw.fired[at]) {
    tw.fired[at] = true; twBanner(tt("events")[at]);
    if (at === 50) { const c = document.getElementById("twCloud"); if (c) { c.classList.remove("is-on"); void c.offsetWidth; c.classList.add("is-on"); } }
  }
  if (twHeight() > tw.best * 10) { tw.best = Math.round(twHeight() / 10); twSave(); }
  if (twHeight() >= TW_GOAL) twWin();
}
function twWin() {
  tw.won = true;
  twBanner(tt("won"), 6000);
  document.getElementById("twStage")?.classList.add("is-won");
  if (!playMuted) [262, 330, 392, 523, 659, 784, 1047].forEach((f, i) => oTone(f, orchCtx().currentTime + i * 0.1, 0.5, "triangle", 0.11));
  unlock("babel");
  twPaintAll();
}
function twReset() {
  tw.tower = []; tw.fired = {}; tw.won = false;
  document.getElementById("twStage")?.classList.remove("is-won");
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

/* ---- drawing ---- */
function twPieceEl(p, y) {
  const el = document.createElement("div");
  const u = tw.u;
  el.className = "tw__piece";
  el.style.cssText = `width:${p.w * u}px;height:${p.h * u}px;left:${(TW_W / 2 + p.x - p.w / 2) * u}px;bottom:${y * u}px;` +
    `background:hsl(${twHue(p.id)} 55% 60%);font-size:${Math.max(14, Math.min(p.h, p.w) * 0.72) * u}px`;
  el.textContent = p.e;
  return el;
}
function twCamera() { return Math.max(0, twHeight() - 170); }
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
  const worldEl = document.getElementById("twWorld");
  worldEl.style.bottom = TW_GROUND * tw.u + "px"; // the ground strip stays visible below the first piece
  worldEl.style.transform = `translateY(${twCamera() * tw.u}px)`;
  // sway: the closer a joint is to giving way, the more the tower leans and wobbles
  let risk = 0;
  for (let i = 0; i < tw.tower.length - 1; i++) {
    let m = 0, mx = 0;
    for (let j = i + 1; j < tw.tower.length; j++) { m += tw.tower[j].m; mx += tw.tower[j].m * tw.tower[j].x; }
    risk = Math.max(risk, Math.abs(mx / m - tw.tower[i].x) / (tw.tower[i].w / 2 * tw.tower[i].g));
  }
  const stage = document.getElementById("twStage");
  stage.style.setProperty("--sway", (risk * 2.4 + twHeight() / TW_GOAL * 0.8).toFixed(2) + "deg");
  stage.style.setProperty("--r", Math.min(1, twHeight() / TW_GOAL).toFixed(3));
}
function twPaintHud() {
  const hud = document.getElementById("twHud");
  if (hud) hud.innerHTML = `<span>${esc(tt("height"))}: <b>${Math.round(twHeight() / 10)} m</b></span><span>${esc(tt("pieces"))}: <b>${tw.tower.length}</b></span><span>${esc(tt("best"))}: <b>${tw.best} m</b></span>`;
  const cur = twItem(tw.cur);
  const wi = cur.w < 60 ? 0 : cur.w < 100 ? 1 : 2, gi = cur.g < 0.55 ? 0 : cur.g < 0.8 ? 1 : 2;
  document.getElementById("twCur").innerHTML = `${esc(tt("current"))}: <b>${cur.e} ${esc(twName(tw.cur))}</b> · ${esc(tt("widths")[wi])} · ${esc(tt("grips")[gi])}`;
}
function twPaintCraft() {
  const box = document.getElementById("twSlots");
  if (!box) return;
  const slot = (id) => id ? `<span class="tw__slot is-full">${twItem(id).e}</span>` : `<span class="tw__slot"></span>`;
  box.innerHTML = tw.slots.length === 1 && tw.lock
    ? `${slot(tw.slots[0])}<span class="tw__newlabel">${esc(twName(tw.slots[0]))}${tw.newest ? " ✨" : ""}</span>`
    : `${slot(tw.slots[0])}<span class="tw__plus">+</span>${slot(tw.slots[1])}<span class="tw__plus">=</span><span class="tw__slot tw__slot--res">?</span>`;
}
function twPaintInv() {
  const inv = document.getElementById("twInv");
  if (!inv) return;
  inv.innerHTML = tw.found.map((id) => {
    const it = twItem(id);
    return `<button type="button" class="tw__chip${id === tw.cur && tw.mode === "build" ? " is-current" : ""}${id === tw.newest ? " is-newest" : ""}" data-id="${esc(id)}"><span>${it.e}</span> ${esc(twName(id))}</button>`;
  }).join("");
  document.getElementById("twCount").textContent = `${tw.found.length}`;
}
function twPaintAll(animateTop) {
  twPaintTower(animateTop); twPaintHud(); twPaintCraft(); twPaintInv();
  document.querySelectorAll(".tw__tab").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.mode === tw.mode)));
  document.getElementById("twCraftBox").hidden = tw.mode !== "craft";
}
function twBanner(text, ms = 3200) {
  const b = document.getElementById("twBanner");
  if (!b) return;
  b.textContent = text; b.classList.add("is-on");
  clearTimeout(tw.bannerT); tw.bannerT = setTimeout(() => b.classList.remove("is-on"), ms);
}

/* ---- placing pieces yourself: drag from the list onto the tower, or press on the stage and slide ---- */
function twShowPreview(clientX) { // the piece hovers where it would land
  const stage = document.getElementById("twStage"), h = document.getElementById("twHover");
  if (!stage || !h || tw.won) return;
  const r = stage.getBoundingClientRect(), it = twItem(tw.cur), u = tw.u;
  tw.x = twClamp((clientX - r.left) / u - TW_W / 2, -(TW_W / 2 - 10), TW_W / 2 - 10);
  h.style.display = "";
  h.style.width = it.w * u + "px"; h.style.height = it.h * u + "px";
  h.style.fontSize = Math.max(14, Math.min(it.h, it.w) * 0.72) * u + "px";
  h.style.background = `hsl(${twHue(tw.cur)} 55% 60%)`;
  h.style.transform = `translate(${(TW_W / 2 + tw.x - it.w / 2) * u}px, ${-(TW_GROUND + twHeight() - twCamera() + 6) * u}px)`;
  h.textContent = it.e;
}
function twHidePreview() { const h = document.getElementById("twHover"); if (h) h.style.display = "none"; }
const twOverStage = (x, y) => { const r = document.getElementById("twStage").getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; };
function twStop() { tw.drag = null; }
function twResize() {
  const s = document.getElementById("twStage");
  if (!s) return;
  tw.u = s.clientWidth / TW_W;
  twPaintTower();
}
addEventListener("resize", () => { if (document.getElementById("twStage")) twResize(); });

function renderTower() {
  if (!tw.found.length) twLoad();
  playBody.innerHTML = `
    <div class="tw">
      <div class="tw__main">
        <div class="tw__stage" id="twStage" tabindex="0" role="application" aria-label="${esc(tt("stage"))}">
          <div class="tw__sky" aria-hidden="true"></div>
          <div class="tw__world" id="twWorld" style="bottom:0"><div class="tw__tower" id="twTower"><div class="tw__ground"></div></div></div>
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
        <div class="tw__tabs" role="tablist">
          <button type="button" role="tab" class="tw__tab" data-mode="craft" aria-selected="true">${esc(tt("craft"))}</button>
          <button type="button" role="tab" class="tw__tab" data-mode="build" aria-selected="false">${esc(tt("build"))}</button>
        </div>
        <div class="tw__craftbox" id="twCraftBox"><p class="tw__hint">${esc(tt("combine"))}</p><div class="tw__slots" id="twSlots"></div></div>
        <h3 class="tw__invtitle">${esc(tt("discovered"))} <span id="twCount"></span> <span class="tw__draghint">· ${esc(tt("drag"))}</span></h3>
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
  stage.addEventListener("pointerdown", (e) => { if (tw.won) return; tw.pressing = true; stage.setPointerCapture?.(e.pointerId); twShowPreview(e.clientX); });
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
    } else if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (document.getElementById("twHover").style.display === "none") twShowPreview(stage.getBoundingClientRect().left + stage.clientWidth / 2); twDrop(); }
  });

  /* the list: tap to craft or select; drag a piece onto the stage to build with it */
  const inv = document.getElementById("twInv");
  inv.addEventListener("pointerdown", (e) => {
    const chip = e.target.closest(".tw__chip");
    if (!chip) return;
    const id = chip.dataset.id, sx = e.clientX, sy = e.clientY;
    let ghost = null;
    const move = (ev) => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
        const it = twItem(id);
        ghost = document.createElement("div");
        ghost.className = "tw__piece tw__dragghost";
        ghost.style.cssText = `width:${it.w * tw.u}px;height:${it.h * tw.u}px;background:hsl(${twHue(id)} 55% 60%);font-size:${Math.max(14, Math.min(it.h, it.w) * 0.72) * tw.u}px`;
        ghost.textContent = it.e;
        document.body.appendChild(ghost);
        tw.cur = id; twPaintHud();
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
        else { twHidePreview(); twPaintAll(); }
      } else twPick(id); // a plain tap
    };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  });
  inv.addEventListener("click", (e) => { const c = e.target.closest(".tw__chip"); if (c && e.detail === 0) twPick(c.dataset.id); }); // keyboard
  playBody.querySelectorAll(".tw__tab").forEach((b) => b.addEventListener("click", () => { tw.mode = b.dataset.mode; sfx.click(); twPaintAll(); }));
}
