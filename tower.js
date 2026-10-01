/* ============ Turmbau zu Babel / Tower of Babel ============
   A building puzzle. The tower is drawn as a blueprint in 13 sections of 100 m. Every section is a grid that has to be
   filled completely with the pieces you are given (1x1, 2x1, 2x2, L, T …). You drag the pieces in wherever you like, turn them
   (R or the button) and pick them up again. When a section is full, the next one opens with other material and, later, stranger shapes.
   Every puzzle is made by cutting the grid into pieces first, so it can always be solved.
   From 1000 m the builders no longer understand each other: the page changes its language (again at 1100 m and 1200 m). At the top it is back to normal.
   Uses helpers from orchestra.js (sound) and play.js / play-shell.js (esc, lang, babelLang, unlock, sfx, play). */

const TW_ROWS = 3, TW_SECTIONS = 13;
const twCols = (k) => Math.max(5, 9 - Math.floor(k / 3)); // the blueprint narrows towards the sky: 9, 8, 7, 6, 5 cells wide

/* ---- texts: en/de for the page, tr/fr/es for the confusion of tongues (only what the tower screen shows) ---- */
const TW_T = {
  en: {
    toy: "A building puzzle", again: "Start over", rotate: "Rotate", shuffle: "Reshuffle", height: "Height", best: "Best", section: "Section", left: "Pieces left",
    hint: "Drag the pieces into the grid. Press R or ↻ to turn one. Pick a placed piece up again to move it.", done: "Section complete!",
    unlock: "New material: {n}", shapes: "New shapes!", tongues: "Confusion of tongues! Everyone speaks differently now.", won: "The tower touches the sky!", stage: "Building site"
  },
  de: {
    toy: "Ein Bauspiel", again: "Von vorn", rotate: "Drehen", shuffle: "Neu verteilen", height: "Höhe", best: "Rekord", section: "Bereich", left: "Teile übrig",
    hint: "Zieh die Teile ins Raster. R oder ↻ dreht ein Teil. Gesetzte Teile kannst du wieder aufnehmen.", done: "Bereich geschafft!",
    unlock: "Neues Material: {n}", shapes: "Neue Formen!", tongues: "Sprachverwirrung! Alle sprechen jetzt anders.", won: "Der Turm berührt den Himmel!", stage: "Baustelle"
  },
  tr: {
    again: "Baştan başla", rotate: "Döndür", shuffle: "Yeniden dağıt", height: "Yükseklik", best: "Rekor", section: "Bölüm", left: "Kalan parça",
    hint: "Parçaları ızgaraya sürükle. R veya ↻ ile döndür. Yerleştirdiğin parçayı tekrar alabilirsin.", done: "Bölüm tamam!",
    unlock: "Yeni malzeme: {n}", shapes: "Yeni şekiller!", tongues: "Dil karışıklığı! Artık herkes farklı konuşuyor.", won: "Kule göğe dokunuyor!", stage: "İnşaat alanı"
  },
  fr: {
    again: "Tout recommencer", rotate: "Tourner", shuffle: "Redistribuer", height: "Hauteur", best: "Record", section: "Zone", left: "Pièces restantes",
    hint: "Glisse les pièces dans la grille. R ou ↻ pour tourner. Reprends une pièce posée pour la déplacer.", done: "Zone terminée !",
    unlock: "Nouveau matériau : {n}", shapes: "Nouvelles formes !", tongues: "Confusion des langues ! Tout le monde parle autrement.", won: "La tour touche le ciel !", stage: "Chantier"
  },
  es: {
    again: "Empezar de nuevo", rotate: "Girar", shuffle: "Repartir", height: "Altura", best: "Récord", section: "Zona", left: "Piezas restantes",
    hint: "Arrastra las piezas a la cuadrícula. R o ↻ para girar. Recoge una pieza colocada para moverla.", done: "¡Zona completa!",
    unlock: "Material nuevo: {n}", shapes: "¡Nuevas formas!", tongues: "¡Confusión de lenguas! Ahora todos hablan distinto.", won: "¡La torre toca el cielo!", stage: "Obra"
  }
};
Object.assign(TW_T, {
  it: {
    again: "Ricomincia", rotate: "Ruota", shuffle: "Rimescola", height: "Altezza", best: "Record", section: "Zona", left: "Pezzi rimasti",
    hint: "Trascina i pezzi nella griglia. R o ↻ per ruotare. Riprendi un pezzo posato per spostarlo.", done: "Zona completata!",
    unlock: "Nuovo materiale: {n}", shapes: "Nuove forme!", tongues: "Confusione delle lingue! Ora parlano tutti in modo diverso.", won: "La torre tocca il cielo!", stage: "Cantiere"
  },
  pt: {
    again: "Recomeçar", rotate: "Girar", shuffle: "Redistribuir", height: "Altura", best: "Recorde", section: "Zona", left: "Peças restantes",
    hint: "Arrasta as peças para a grelha. R ou ↻ para rodar. Pega numa peça colocada para a mover.", done: "Zona concluída!",
    unlock: "Novo material: {n}", shapes: "Novas formas!", tongues: "Confusão de línguas! Agora todos falam de maneira diferente.", won: "A torre toca o céu!", stage: "Obra"
  },
  nl: {
    again: "Opnieuw beginnen", rotate: "Draaien", shuffle: "Opnieuw verdelen", height: "Hoogte", best: "Record", section: "Deel", left: "Stukken over",
    hint: "Sleep de stukken in het raster. R of ↻ om te draaien. Pak een geplaatst stuk op om het te verplaatsen.", done: "Deel klaar!",
    unlock: "Nieuw materiaal: {n}", shapes: "Nieuwe vormen!", tongues: "Spraakverwarring! Iedereen praat nu anders.", won: "De toren raakt de hemel!", stage: "Bouwplaats"
  }
});
/* name and greeting of every language the builders can speak */
const TW_LANGS = { fr: ["Français", "Bonjour !"], tr: ["Türkçe", "Merhaba!"], es: ["Español", "¡Hola!"], it: ["Italiano", "Ciao!"], pt: ["Português", "Olá!"], nl: ["Nederlands", "Hallo!"] };
const tt = (k) => { const b = tw.babel && TW_T[tw.babel]; return b && b[k] !== undefined ? b[k] : (TW_T[lang] || TW_T.en)[k]; };

/* what the page says in those other languages (menu bar and breadcrumbs) */
if (typeof SHELL_T !== "undefined") {
  Object.assign(SHELL_T, {
    tr: { projects: "Projeler", experience: "Deneyim", contact: "İletişim", play: "Oyun Bahçesi" },
    fr: { projects: "Projets", experience: "Parcours", contact: "Contact", play: "Terrain de jeu" },
    es: { projects: "Proyectos", experience: "Trayectoria", contact: "Contacto", play: "Zona de juegos" },
    it: { projects: "Progetti", experience: "Esperienza", contact: "Contatti", play: "Area giochi" },
    pt: { projects: "Projetos", experience: "Percurso", contact: "Contacto", play: "Área de jogos" },
    nl: { projects: "Projecten", experience: "Ervaring", contact: "Contact", play: "Speeltuin" }
  });
}
function twPatchTexts() { // PLAY_T lives in play.js, which loads after this file
  if (typeof PLAY_T === "undefined" || PLAY_T.tr) return;
  Object.assign(PLAY_T, {
    tr: { home: "Ana sayfa", title: "Oyun Bahçesi", g3: "Babil Kulesi", back: "Geri" },
    fr: { home: "Accueil", title: "Terrain de jeu", g3: "La Tour de Babel", back: "Retour" },
    es: { home: "Inicio", title: "Zona de juegos", g3: "La Torre de Babel", back: "Volver" },
    it: { home: "Home", title: "Area giochi", g3: "La Torre di Babele", back: "Indietro" },
    pt: { home: "Início", title: "Área de jogos", g3: "A Torre de Babel", back: "Voltar" },
    nl: { home: "Home", title: "Speeltuin", g3: "De Toren van Babel", back: "Terug" }
  });
}
/* which language the page speaks while you build this section (index 0 is the first 100 m); once the sky is reached it is yours again */
const TW_ORDER = [null, "fr", "tr", "es", "it", "pt", "nl", "tr", "fr", "it", "es", "nl", "pt"]; // a new tongue with every section, no two in a row
const twLangFor = (k) => k >= 13 ? null : TW_ORDER[k]; // at the very top everyone understands each other again

/* ---- material per section: the higher you build, the stranger ---- */
const TW_MAT = [
  { e: "🧱", n: ["Brick", "Ziegel"] }, { e: "🪨", n: ["Stone", "Stein"] }, { e: "🪵", n: ["Log", "Holz"] },
  { e: "🐱", n: ["Cat", "Katze"] }, { e: "🧀", n: ["Cheese", "Käse"] }, { e: "🧦", n: ["Sock", "Socke"] },
  { e: "☁️", n: ["Cloud", "Wolke"] }, { e: "🍕", n: ["Pizza", "Pizza"] }, { e: "🛸", n: ["UFO", "UFO"] },
  { e: "🌙", n: ["Moon", "Mond"] }, { e: "🌈", n: ["Rainbow", "Regenbogen"] }, { e: "🐉", n: ["Dragon", "Drache"] }, { e: "🤡", n: ["Clown", "Clown"] }
];
/* shapes (row, column); more of them the higher you build */
const TW_SHAPES = {
  mono: [[0, 0]], domino: [[0, 0], [0, 1]], i3: [[0, 0], [0, 1], [0, 2]], o: [[0, 0], [0, 1], [1, 0], [1, 1]],
  l3: [[0, 0], [1, 0], [1, 1]], i4: [[0, 0], [0, 1], [0, 2], [0, 3]], t4: [[0, 0], [0, 1], [0, 2], [1, 1]], l4: [[0, 0], [1, 0], [1, 1], [1, 2]], s4: [[0, 1], [0, 2], [1, 0], [1, 1]]
};
const twShapesFor = (k) => k < 3 ? ["mono", "domino", "i3", "o"] : k < 6 ? ["mono", "domino", "i3", "o", "l3"] : Object.keys(TW_SHAPES);

/* ---- small helpers ---- */
const twNorm = (cells) => { const r0 = Math.min(...cells.map((c) => c[0])), c0 = Math.min(...cells.map((c) => c[1])); return cells.map(([r, c]) => [r - r0, c - c0]); };
const twRot = (cells, n) => { let out = cells; for (let i = 0; i < ((n % 4) + 4) % 4; i++) out = twNorm(out.map(([r, c]) => [c, -r])); return twNorm(out); };
const twSize = (cells) => [Math.max(...cells.map((c) => c[0])) + 1, Math.max(...cells.map((c) => c[1])) + 1];
function twRng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* ---- the puzzle: cut the grid into pieces first, then hand them out turned around ---- */
/* obstacles: from the second section on there are pillars and windows in the wall that no piece can cover; they stay the same for a section */
function twObstacles(k, cols) {
  if (k < 1) return [];
  const rng = twRng(k * 313 + 5), want = Math.min(1 + Math.floor((k - 1) / 3), 4), out = [], has = (r, c) => out.some((o) => o.r === r && o.c === c);
  for (let tries = 0; out.length < want * 2 && tries < 30; tries++) {
    const c = Math.floor(rng() * cols);
    if (rng() < 0.5) { // a pillar: two cells on top of each other
      const r = Math.floor(rng() * (TW_ROWS - 1));
      if (!has(r, c) && !has(r + 1, c)) { out.push({ r, c, kind: "pillar" }, { r: r + 1, c, kind: "pillar" }); }
    } else {
      const r = Math.floor(rng() * TW_ROWS);
      if (!has(r, c)) out.push({ r, c, kind: "window" });
    }
    if (out.length >= want + 1) break;
  }
  return out;
}
function twTile(cols, rows, k, rng) {
  const allowed = twShapesFor(k);
  let best = null;
  for (let attempt = 0; attempt < 40; attempt++) {
    const g = Array.from({ length: rows }, () => Array(cols).fill(-1)), pieces = [];
    twObstacles(k, cols).forEach((o) => { g[o.r][o.c] = -2; }); // walls count as already filled
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      if (g[r][c] !== -1) continue;
      const opts = [];
      for (const name of allowed) for (let rot = 0; rot < 4; rot++) {
        const cells = twRot(TW_SHAPES[name], rot);
        const [ar, ac] = cells.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])[0]; // the first cell lands on (r, c)
        const at = cells.map(([cr, cc]) => [r + cr - ar, c + cc - ac]);
        if (at.every(([pr, pc]) => pr >= 0 && pr < rows && pc >= 0 && pc < cols && g[pr][pc] === -1)) opts.push({ name, cells, at, w: name === "mono" ? 0.45 : 1 });
      }
      const total = opts.reduce((s, o) => s + o.w, 0);
      let pick = rng() * total, chosen = opts[opts.length - 1];
      for (const o of opts) { pick -= o.w; if (pick <= 0) { chosen = o; break; } }
      chosen.at.forEach(([pr, pc]) => { g[pr][pc] = pieces.length; });
      pieces.push({ name: chosen.name, base: chosen.cells });
    }
    const monos = pieces.filter((p) => p.name === "mono").length;
    if (!best || monos < best.monos) best = { pieces, monos };
    if (monos <= Math.max(1, pieces.length * 0.2)) break;
  }
  return best.pieces;
}
const tw = { k: 0, best: 0, sec: null, sel: null, attempt: 0, babel: null, won: false, bannerT: 0, c: 40, drag: null, preview: null };
function twNewSection() {
  const k = tw.k, cols = twCols(k), rng = twRng(k * 1009 + tw.attempt * 7919 + 17);
  const pieces = twTile(cols, TW_ROWS, k, rng).map((p, i) => ({ id: i, name: p.name, base: p.base, rot: Math.floor(rng() * 4), pos: null, hue: Math.floor(rng() * 360) }));
  for (let i = pieces.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [pieces[i], pieces[j]] = [pieces[j], pieces[i]]; }
  const grid = Array.from({ length: TW_ROWS }, () => Array(cols).fill(null)), blocks = twObstacles(k, cols);
  blocks.forEach((o) => { grid[o.r][o.c] = "#"; });
  tw.sec = { k, cols, rows: TW_ROWS, pieces, grid, blocks };
  tw.sel = pieces.length ? pieces[0].id : null;
}
const twPiece = (id) => tw.sec.pieces.find((p) => p.id === id);
const twCells = (p) => twRot(p.base, p.rot);
const twLeft = () => tw.sec.pieces.filter((p) => !p.pos);
const twFilled = () => tw.sec.grid.flat().filter((v) => v !== null).length; // walls count as filled
const twMeters = () => tw.won ? TW_SECTIONS * 100 : Math.min(TW_SECTIONS * 100, tw.k * 100 + Math.round(twFilled() / (tw.sec.cols * tw.sec.rows) * 100));
const twMat = (k) => TW_MAT[Math.min(k, TW_MAT.length - 1)];
const twMatName = (k) => twMat(k).n[tw.babel ? 0 : (lang === "de" ? 1 : 0)];
function twCanPlace(p, r0, c0) {
  const s = tw.sec;
  return twCells(p).every(([r, c]) => { const rr = r0 + r, cc = c0 + c; return rr >= 0 && rr < s.rows && cc >= 0 && cc < s.cols && s.grid[rr][cc] === null; });
}
function twPlace(p, r0, c0) { twCells(p).forEach(([r, c]) => { tw.sec.grid[r0 + r][c0 + c] = p.id; }); p.pos = { r: r0, c: c0 }; }
function twPickUp(p) { if (!p.pos) return; twCells(p).forEach(([r, c]) => { tw.sec.grid[p.pos.r + r][p.pos.c + c] = null; }); p.pos = null; }

/* ---- progress ---- */
const twSaved = () => { try { return +localStorage.getItem("towerSection") || 0; } catch (e) { return 0; } };
const twBestSaved = () => { try { return +localStorage.getItem("towerBest") || 0; } catch (e) { return 0; } };
function twSave() { try { localStorage.setItem("towerSection", String(tw.k)); localStorage.setItem("towerBest", String(tw.best)); } catch (e) {} }
function twComplete() {
  if (!playMuted) [523, 659, 784, 1047].forEach((f, i) => oTone(f, orchCtx().currentTime + i * 0.08, 0.3, "triangle", 0.11));
  tw.k++;
  if (tw.k >= TW_SECTIONS) { tw.won = true; tw.best = TW_SECTIONS * 100; twSave(); unlock("babel"); twSetLanguage(); twBanner(tt("won"), 7000); twPaintAll(); return; }
  tw.attempt = 0;
  twNewSection();
  twSave();
  const changed = twSetLanguage();
  const hasNewShapes = tw.k === 3 || tw.k === 6;
  twBanner(tt("done") + " " + tt("unlock").replace("{n}", twMat(tw.k).e + " " + twMatName(tw.k)) + (hasNewShapes ? " " + tt("shapes") : "") + (changed ? "  " + TW_LANGS[tw.babel][0] + ": " + tt("tongues") : ""), changed ? 6500 : 4200, changed ? tw.babel : null);
  if (changed && tw.babel) twBubbles();
  if (changed && !playMuted) [196, 233, 175, 262].forEach((f, i) => oTone(f, orchCtx().currentTime + 0.4 + i * 0.12, 0.3, "sawtooth", 0.05));
}
/* the Babel meme: everybody greets in their own language and nobody understands anybody */
function twBubbles() {
  const stage = document.getElementById("twStage");
  if (!stage) return;
  const langs = Object.keys(TW_LANGS), mine = tw.babel;
  [mine, ...langs.filter((l) => l !== mine).sort(() => Math.random() - 0.5).slice(0, 4)].forEach((l, i) => {
    const b = document.createElement("span");
    b.className = "tw2__bubble" + (i === 0 ? " is-main" : "");
    b.innerHTML = flagSVG(l) + esc(TW_LANGS[l][1]);
    b.style.cssText = `left:${8 + Math.random() * 70}%;--d:${i * 0.35}s`;
    stage.appendChild(b);
    setTimeout(() => b.remove(), 4200 + i * 350);
  });
}
function twSetLanguage() { // confusion of tongues: the page speaks another language from 1000 m on
  twPatchTexts();
  const l = twLangFor(tw.k);
  if (l === tw.babel) { twPaintAll(); return false; }
  tw.babel = l; babelLang = l;
  applyShell();
  renderPlay();
  return true;
}
function twStop() { // leaving the game: the page speaks your language again
  twEndDrag();
  if (tw.babel) { tw.babel = null; babelLang = null; applyShell(); }
}
function twStart() { // starting over
  tw.k = 0; tw.attempt = 0; tw.won = false;
  twNewSection(); twSave();
  twSetLanguage();
  twPaintAll();
}

/* ---- drawing ---- */
const twCellHTML = (e, hue) => `<span class="tw2__cell is-filled" style="--h:${hue}">${e}</span>`;
function twCellSize() { const s = document.getElementById("twStage"); return Math.floor(Math.min(56, (s ? s.clientWidth : 540) / 11)); }
function twPaintStage() {
  const stage = document.getElementById("twStage"), world = document.getElementById("twWorld");
  if (!stage) return;
  const c = tw.c = twCellSize(), W = stage.clientWidth, secH = TW_ROWS * c;
  stage.style.setProperty("--c", c + "px");
  stage.style.height = Math.round(c * 8.6) + "px";
  stage.style.setProperty("--r", Math.min(1, twMeters() / (TW_SECTIONS * 100)).toFixed(3));
  const current = Math.min(tw.k, TW_SECTIONS - 1);
  world.style.bottom = Math.round(c * 3.4 - current * secH) + "px"; // the current section sits near the bottom of the stage
  let html = `<div class="tw2__ground"></div>`;
  for (let k = 0; k < TW_SECTIONS; k++) {
    const cols = twCols(k), left = Math.round((W - cols * c) / 2), bottom = k * secH;
    const style = `left:${left}px;bottom:${bottom}px;width:${cols * c}px;height:${secH}px`;
    const mat = twMat(k);
    html += `<span class="tw2__tick" style="bottom:${bottom + secH - 9}px">${(k + 1) * 100} m</span>`;
    if (k < tw.k) { // finished: solid
      html += `<div class="tw2__grid is-done" style="${style};--cols:${cols}">${Array.from({ length: cols * TW_ROWS }, (_, i) => { const o = twObstacles(k, cols).find((b) => b.r * cols + b.c === i); return o ? `<span class="tw2__cell is-block is-${o.kind}"></span>` : twCellHTML(mat.e, k * 29 % 360); }).join("")}</div>`;
    } else if (k === tw.k && !tw.won) { // the one you are working on
      const s = tw.sec;
      let cells = "";
      for (let r = 0; r < s.rows; r++) for (let cc = 0; cc < s.cols; cc++) {
        const id = s.grid[r][cc];
        if (id === "#") { const kind = s.blocks.find((o) => o.r === r && o.c === cc).kind; cells += `<span class="tw2__cell is-block is-${kind}" data-r="${r}" data-c="${cc}" aria-hidden="true"></span>`; continue; }
        cells += id === null ? `<span class="tw2__cell" data-r="${r}" data-c="${cc}"></span>` : `<span class="tw2__cell is-filled" data-r="${r}" data-c="${cc}" data-id="${id}" style="--h:${twPiece(id).hue}">${mat.e}</span>`;
      }
      html += `<div class="tw2__grid is-active" id="twGrid" style="${style};--cols:${cols}">${cells}</div>`;
    } else {
      html += `<div class="tw2__grid is-future" style="${style}"></div>`;
    }
  }
  world.innerHTML = html;
  twPaintPreview();
}
function twPieceHTML(p, size) { // a piece as little cells (tray and drag ghost)
  const cells = twCells(p), [h, w] = twSize(cells), e = twMat(tw.k).e;
  let out = `<span class="tw2__shape" style="grid-template-columns:repeat(${w},${size}px);grid-template-rows:repeat(${h},${size}px)">`;
  for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) out += cells.some(([cr, cc]) => cr === r && cc === c)
    ? `<span class="tw2__cell is-filled" style="--h:${p.hue};font-size:${size * 0.7}px">${e}</span>` : `<span></span>`;
  return out + `</span>`;
}
function twPaintTray() {
  const tray = document.getElementById("twTray");
  if (!tray) return;
  const left = twLeft();
  tray.innerHTML = left.map((p) => `<button type="button" class="tw2__piece${p.id === tw.sel ? " is-sel" : ""}" data-id="${p.id}" aria-label="${esc(tt("rotate"))}">${twPieceHTML(p, 26)}</button>`).join("");
  const cnt = document.getElementById("twLeft");
  if (cnt) cnt.textContent = `${tt("left")}: ${left.length}`;
}
function twPaintHud() {
  const hud = document.getElementById("twHud");
  if (!hud) return;
  const m = twMeters();
  if (m > tw.best) { tw.best = m; twSave(); }
  hud.innerHTML = `<span>${esc(tt("height"))}: <b>${m} m</b></span><span>${esc(tt("section"))}: <b>${Math.min(tw.k + 1, TW_SECTIONS)}/${TW_SECTIONS}</b></span><span>${esc(tt("best"))}: <b>${tw.best} m</b></span>`;
}
function twPaintAll() { twClearGhosts(); twPaintStage(); twPaintTray(); twPaintHud(); }
function twBanner(text, ms = 3200, flagLang = null) {
  const b = document.getElementById("twBanner");
  if (!b) return;
  b.innerHTML = (flagLang ? flagSVG(flagLang) : "") + esc(text); b.classList.add("is-on");
  clearTimeout(tw.bannerT); tw.bannerT = setTimeout(() => b.classList.remove("is-on"), ms);
}

/* ---- dragging, turning, placing ---- */
function twPaintPreview() {
  document.querySelectorAll(".tw2__cell.is-ok, .tw2__cell.is-bad").forEach((el) => el.classList.remove("is-ok", "is-bad"));
  const pv = tw.preview;
  if (!pv || !tw.drag) return;
  twCells(tw.drag.p).forEach(([r, c]) => {
    const el = document.querySelector(`#twGrid .tw2__cell[data-r="${pv.r + r}"][data-c="${pv.c + c}"]`);
    if (el) el.classList.add(pv.ok ? "is-ok" : "is-bad");
  });
}
function twGhostSync(x, y) {
  const d = tw.drag;
  if (!d || !d.ghost) return;
  const [h, w] = twSize(twCells(d.p)), c = tw.c;
  d.ghost.style.left = x - (w * c) / 2 + "px"; d.ghost.style.top = y - (h * c) / 2 + "px";
}
function twMoveDrag(x, y) {
  const d = tw.drag, grid = document.getElementById("twGrid");
  if (!d || !grid) return;
  d.x = x; d.y = y;
  twGhostSync(x, y);
  const rect = grid.getBoundingClientRect(), [h, w] = twSize(twCells(d.p)), c = tw.c;
  const over = x > rect.left - c && x < rect.right + c && y > rect.top - c && y < rect.bottom + c;
  if (!over) { tw.preview = null; twPaintPreview(); return; }
  const r0 = Math.round((y - rect.top) / c - h / 2), c0 = Math.round((x - rect.left) / c - w / 2);
  tw.preview = { r: r0, c: c0, ok: twCanPlace(d.p, r0, c0) };
  twPaintPreview();
}
function twBeginDrag(p, x, y) {
  twEndDrag(); twClearGhosts();
  const ghost = document.createElement("div");
  ghost.className = "tw2__ghost";
  document.body.appendChild(ghost);
  tw.drag = { p, ghost, x, y };
  twRedrawGhost();
  twMoveDrag(x, y);
}
function twRedrawGhost() { const d = tw.drag; if (d) { d.ghost.innerHTML = twPieceHTML(d.p, tw.c); twGhostSync(d.x, d.y); } }
function twClearGhosts() { document.querySelectorAll(".tw2__ghost").forEach((g) => { if (!tw.drag || g !== tw.drag.ghost) g.remove(); }); } // no piece may ever be left hanging on the page
function twEndDrag() { if (tw.drag && tw.drag.ghost) tw.drag.ghost.remove(); tw.drag = null; tw.preview = null; twClearGhosts(); }
addEventListener("blur", () => { if (tw.drag) { twEndDrag(); if (document.getElementById("twGrid")) twPaintAll(); } }); // the mouse was let go outside the window, or the tab lost the focus
addEventListener("pointercancel", () => { if (tw.drag) { twEndDrag(); if (document.getElementById("twGrid")) twPaintAll(); } });
function twDropDrag() {
  const d = tw.drag, pv = tw.preview;
  if (!d) return;
  const p = d.p;
  twEndDrag();
  if (pv && pv.ok) {
    twPlace(p, pv.r, pv.c);
    if (!playMuted) oTone(300 + twFilled() * 12, orchCtx().currentTime, 0.1, "triangle", 0.08);
    twPaintAll();
    if (!twLeft().length && twFilled() === tw.sec.cols * tw.sec.rows) setTimeout(twComplete, 260);
  } else {
    if (pv && !pv.ok && !playMuted) oTone(200, orchCtx().currentTime, 0.12, "sawtooth", 0.04, 140);
    twPaintAll();
  }
}
function twRotate() { // turn the selected piece (or the one you are holding)
  const p = tw.drag ? tw.drag.p : (tw.sel !== null && twPiece(tw.sel));
  if (!p) return;
  if (p.pos && !tw.drag) { // a piece that is already in the tower: lift it, turn it, and put it back where it fits (or leave it as it was)
    const old = p.pos, rot = p.rot;
    twPickUp(p); p.rot = (rot + 1) % 4;
    let spot = null;
    for (const [dr, dc] of [[0, 0], [0, -1], [-1, 0], [0, 1], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1], [0, -2], [0, 2], [-2, 0], [2, 0]]) if (!spot && twCanPlace(p, old.r + dr, old.c + dc)) spot = [old.r + dr, old.c + dc];
    if (spot) { twPlace(p, spot[0], spot[1]); if (!playMuted) oTone(620, orchCtx().currentTime, 0.05, "triangle", 0.06); }
    else { p.rot = rot; twPlace(p, old.r, old.c); if (!playMuted) oTone(200, orchCtx().currentTime, 0.12, "sawtooth", 0.04, 140); } // no room to turn it
    twPaintAll();
    return;
  }
  p.rot = (p.rot + 1) % 4;
  if (!playMuted) oTone(620, orchCtx().currentTime, 0.05, "triangle", 0.06);
  if (tw.drag) { twRedrawGhost(); twMoveDrag(tw.drag.x, tw.drag.y); }
  twPaintTray();
}
addEventListener("resize", () => { if (document.getElementById("twStage")) twPaintAll(); });
addEventListener("keydown", (e) => {
  if (!document.getElementById("twStage") || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === "r" || e.key === "R") { e.preventDefault(); twRotate(); }
});

function renderTower() {
  twPatchTexts();
  if (!tw.sec) { tw.k = twSaved(); tw.best = twBestSaved(); tw.won = tw.k >= TW_SECTIONS; if (!tw.won) twNewSection(); else tw.sec = { k: 12, cols: 5, rows: 3, pieces: [], grid: [], blocks: [] }; }
  playBody.innerHTML = `
    <div class="tw">
      <div class="tw__main">
        <div class="tw__stage" id="twStage" role="application" aria-label="${esc(tt("stage"))}">
          <div class="tw__sky" aria-hidden="true"></div>
          <div class="tw2__world" id="twWorld"></div>
          <p class="tw__hud" id="twHud"></p>
          <p class="orch__banner tw__banner" id="twBanner" role="status" aria-live="polite"></p>
        </div>
      </div>
      <div class="tw__side">
        <p class="tw__hint">${esc(tt("hint"))}</p>
        <h3 class="tw__invtitle"><span id="twLeft"></span> · ${esc(twMatName(Math.min(tw.k, TW_SECTIONS - 1)))} ${twMat(Math.min(tw.k, TW_SECTIONS - 1)).e}</h3>
        <div class="tw2__tray" id="twTray"></div>
        <div class="tw__bar">
        <button type="button" class="orch__go tw2__rotate" id="twRotate"><span aria-hidden="true">↻</span> ${esc(tt("rotate"))}</button>
        <button type="button" class="orch__clear" id="twShuffle">${esc(tt("shuffle"))}</button>
        <button type="button" class="orch__clear" id="twAgain"><span aria-hidden="true">↺</span> ${esc(tt("again"))}</button>
      </div>
      </div>
    </div>`;
  twPaintAll();
  document.getElementById("twRotate").addEventListener("click", twRotate);
  document.getElementById("twShuffle").addEventListener("click", () => { if (tw.won) return; sfx.pop(); tw.attempt++; twNewSection(); twPaintAll(); });
  document.getElementById("twAgain").addEventListener("click", () => { if (tw.k > 0 && !window.confirm(lang === "de" ? "Wirklich von vorn anfangen?" : "Really start over?")) return; sfx.pop(); twStart(); });

  /* tray: tap a piece to select it (tap again to turn it), drag it into the grid */
  document.getElementById("twTray").addEventListener("pointerdown", (e) => {
    const btn = e.target.closest(".tw2__piece");
    if (!btn) return;
    e.preventDefault();
    const p = twPiece(+btn.dataset.id), sx = e.clientX, sy = e.clientY, wasSel = tw.sel === p.id;
    tw.sel = p.id;
    let moved = false;
    const move = (ev) => {
      if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) { moved = true; twBeginDrag(p, ev.clientX, ev.clientY); btn.classList.add("is-lifted"); }
      if (moved) twMoveDrag(ev.clientX, ev.clientY);
    };
    const up = () => {
      removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
      if (moved) twDropDrag();
      else { if (wasSel) twRotate(); else if (!playMuted) oTone(520, orchCtx().currentTime, 0.05, "triangle", 0.06); twPaintTray(); }
    };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
    twPaintTray();
  });
  /* the grid: pick a placed piece up again */
  document.getElementById("twStage").addEventListener("pointerdown", (e) => {
    const cell = e.target.closest("#twGrid .tw2__cell.is-filled");
    if (!cell || tw.won) return;
    e.preventDefault();
    const p = twPiece(+cell.dataset.id);
    twPickUp(p);
    tw.sel = p.id;
    twPaintAll();
    twBeginDrag(p, e.clientX, e.clientY);
    const move = (ev) => twMoveDrag(ev.clientX, ev.clientY);
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up); twDropDrag(); };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  });
  document.getElementById("twStage").addEventListener("contextmenu", (e) => { if (tw.drag) { e.preventDefault(); twRotate(); } });
}
