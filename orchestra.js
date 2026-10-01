/* ============ Tiny Orchestra ============
   A toy, not a game: drop little creatures onto a stage and they play a looping beat. No score, no goal.
   Sounds are synthesised in the browser (Web Audio), nothing to download. Runs on play.html and uses
   helpers from play.js / play-shell.js (esc, lang, audioCtx, playMuted, sfx, unlock, play, renderPlay). */

const ORCH_COLS = 8, ORCH_MIN_ROWS = 4, ORCH_MAX_ROWS = 8; // the stage starts with 4 rows; more rows add lower notes underneath
const ORCH_NAMES = ["C5", "A4", "G4", "E4", "D4", "C4", "A3", "G3"];
const ORCH_NOTES = [523.25, 440, 392, 329.63, 293.66, 261.63, 220, 196]; // top row to bottom row: C5 A4 G4 E4 D4 C4 A3 G3 (pentatonic, so everything sounds good together)
const ORCH_T = {
  en: {
    toy: "A toy",
    play: "Play", pause: "Pause", clear: "Clear all", tempo: "Tempo", stage: "Stage",
    empty: "empty", row: "Row", beat: "beat", pick: "Creature",
    names: { blob: "Blobby", frog: "Froggo", bird: "Pip", ghost: "Boo", robot: "Bleep", octo: "Inky" },
    sounds: { blob: "kick", frog: "bass", bird: "chirp", ghost: "pad", robot: "tick", octo: "pluck" },
    rows: "Rows", rowMore: "Add a row", rowLess: "Remove a row",
    pitch: "Pitch", kit: "Sound", kits: ["Classic", "8-bit", "Buzz", "Soft"], hint: "Tap a creature to select it: change its pitch or length, remove it, or drop another creature on it to layer sounds.", len: "Note length",
    pitchNote: "Pitch", lenNote: "Length", remove: "Remove", layer: "Add layer", selected: "Selected",
    found: "Discoveries", share: "Share my beat", copied: "Link copied", newFound: "Discovered: {n}!", creatures: "Creatures",
    combos: {
      frogs: ["Frog choir", "A choir needs many voices. How many frogs?"],
      ghosts: ["Witching hour", "With enough ghosts it gets spooky."],
      birds: ["Flock", "Four birds, one sky: all in one row."],
      robots: ["Robot parade", "Robots march in step: every other beat."],
      octo: ["Inky's stairs", "Inky climbs the stage, step by step."],
      floor: ["Four on the floor", "Four kicks along the bottom, on every other beat."],
      all: ["Full band", "All six at once."],
      wall: ["Wall of sound", "Not a single gap."]
    }
  },
  de: {
    toy: "Ein Spielzeug",
    play: "Abspielen", pause: "Pause", clear: "Alles leeren", tempo: "Tempo", stage: "Bühne",
    empty: "leer", row: "Reihe", beat: "Schlag", pick: "Wesen",
    names: { blob: "Blobby", frog: "Froggo", bird: "Pip", ghost: "Boo", robot: "Bleep", octo: "Inky" },
    sounds: { blob: "Bassdrum", frog: "Bass", bird: "Zwitschern", ghost: "Klangteppich", robot: "Tick", octo: "Zupfen" },
    rows: "Reihen", rowMore: "Reihe hinzufügen", rowLess: "Reihe entfernen",
    pitch: "Tonhöhe", kit: "Klang", kits: ["Klassisch", "8-Bit", "Brummig", "Weich"], hint: "Höhere Reihen klingen höher. Tippe ein Wesen an, um es auszuwählen: Tonhöhe oder Länge ändern, entfernen, oder ein weiteres Wesen daraufziehen, um Klänge zu schichten.", len: "Tonlänge",
    pitchNote: "Tonhöhe", lenNote: "Länge", remove: "Entfernen", layer: "Schicht hinzufügen", selected: "Ausgewählt",
    found: "Entdeckungen", share: "Meinen Beat teilen", copied: "Link kopiert", newFound: "Neu entdeckt: {n}!", creatures: "Wesen",
    combos: {
      frogs: ["Froschchor", "Ein Chor braucht viele Stimmen. Wie viele Frösche?"],
      ghosts: ["Geisterstunde", "Mit genug Geistern wird es unheimlich."],
      birds: ["Vogelschwarm", "Vier Vögel, ein Himmel: alle in einer Reihe."],
      robots: ["Roboter-Parade", "Roboter marschieren im Gleichschritt: jeden zweiten Schlag."],
      octo: ["Inkys Treppe", "Inky steigt die Bühne hinauf, Stufe für Stufe."],
      floor: ["Vier auf den Boden", "Vier Bassdrums ganz unten, auf jedem zweiten Schlag."],
      all: ["Volle Besetzung", "Alle sechs auf einmal."],
      wall: ["Klangwand", "Keine einzige Lücke."]
    }
  }
};
const ot = (k) => (ORCH_T[lang] || ORCH_T.en)[k];

/* the creatures: simple shapes with eyes, each with its own sound */
const ORCH_CREATURES = [
  { id: "blob", color: "#40e0d0", body: `<ellipse cx="24" cy="29" rx="16" ry="14"/>`, eyes: [[18, 26], [30, 26]] },
  { id: "frog", color: "#8fd46a", body: `<ellipse cx="24" cy="30" rx="18" ry="12"/><circle cx="14" cy="19" r="6"/><circle cx="34" cy="19" r="6"/>`, eyes: [[14, 19], [34, 19]] },
  { id: "bird", color: "#ffcf5a", body: `<circle cx="24" cy="26" r="15"/><path d="M36 25l9 3-9 3z" fill="#ff8a3d"/><path d="M20 11l3 6M27 11l-3 6" stroke="#ffcf5a" stroke-width="3" stroke-linecap="round"/>`, eyes: [[19, 23], [29, 23]] },
  { id: "ghost", color: "#c4b5fd", body: `<path d="M9 40V24a15 15 0 0 1 30 0v16l-5-4-5 4-5-4-5 4-5-4z"/>`, eyes: [[19, 24], [29, 24]] },
  { id: "robot", color: "#ff9a56", body: `<rect x="9" y="17" width="30" height="24" rx="7"/><path d="M24 17v-6" stroke="#ff9a56" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="9" r="3.2"/>`, eyes: [[18, 28], [30, 28]] },
  { id: "octo", color: "#f472b6", body: `<circle cx="24" cy="21" r="14"/><path d="M12 30c-3 5-3 9-6 10M19 34c-1 4-1 6-3 8M29 34c1 4 1 6 3 8M36 30c3 5 3 9 6 10" stroke="#f472b6" stroke-width="4" stroke-linecap="round" fill="none"/>`, eyes: [[19, 21], [29, 21]] }
];
const ORCH_BY_ID = Object.fromEntries(ORCH_CREATURES.map((c) => [c.id, c]));
const creatureSVG = (c) => `<svg viewBox="0 0 48 48" width="100%" height="100%" focusable="false" aria-hidden="true">
  <g fill="${c.color}">${c.body}</g>
  ${c.eyes.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#1b1a2a"/><circle cx="${x + .8}" cy="${y - .8}" r=".8" fill="#fff"/>`).join("")}
  ${c.id === "frog" || c.id === "blob" ? `<path d="M20 33q4 3 8 0" stroke="#1b1a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/>` : ""}</svg>`;

/* ---- sound: one small voice per creature, scheduled on the audio clock ---- */
function orchCtx() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
let oMult = 1, oLen = 1, oKit = 0; // set around a creature's voice only: pitch factor, note length, sound kit
const O_KIT_TYPE = [null, { sine: "square", triangle: "square", sawtooth: "square" }, { sine: "sawtooth", triangle: "sawtooth" }, { sawtooth: "sine", square: "sine", triangle: "sine" }];
const O_KIT_VOL = [1, 0.45, 0.4, 1];
function oTone(freq, t, dur, type, vol, slideTo, attack = 0.012) {
  const c = orchCtx(), osc = c.createOscillator(), g = c.createGain();
  freq *= oMult; if (slideTo) slideTo *= oMult;
  const stretch = 1 + (oLen - 1) * 0.9; dur *= stretch; vol /= Math.sqrt(stretch); // a longer note rings on, but not louder: same energy spread over more time
  if (oKit) { if (O_KIT_TYPE[oKit][type]) type = O_KIT_TYPE[oKit][type]; vol *= O_KIT_VOL[oKit]; }
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t); osc.stop(t + dur + 0.03);
}
let oNoiseBuf = null;
function oNoise(t, dur, vol) { // a soft, short tick: filtered noise with a tiny fade-in (no hard click) plus a quiet blip
  const c = orchCtx();
  if (!oNoiseBuf) {
    oNoiseBuf = c.createBuffer(1, c.sampleRate * 0.2, c.sampleRate);
    const d = oNoiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const src = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain();
  src.buffer = oNoiseBuf; bp.type = "bandpass"; bp.frequency.value = 4200; bp.Q.value = 0.9;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(g).connect(c.destination);
  src.start(t); src.stop(t + dur + 0.02);
}
function orchVoice(id, t, f, len = 1, pit = 0) { // one creature, with the pitch shift, note length and sound kit chosen on the stage
  oMult = Math.pow(2, (orch.pitch + pit) / 12); oLen = len; oKit = orch.kit;
  try { ORCH_VOICE[id](t, f); } finally { oMult = 1; oLen = 1; oKit = 0; }
}
const ORCH_VOICE = {
  blob: (t) => oTone(150, t, 0.2, "sine", 0.4, 42),
  robot: (t) => { oNoise(t, 0.07, 0.07); oTone(2100, t, 0.045, "sine", 0.05, 1500); },
  frog: (t, f) => oTone(f / 2, t, 0.26, "sine", 0.26, f / 3),
  bird: (t, f) => { oTone(f * 2, t, 0.1, "triangle", 0.07, f * 3); oTone(f * 2.5, t + 0.1, 0.1, "triangle", 0.06, f * 3.5); },
  ghost: (t, f) => { oTone(f, t, 0.7, "sine", 0.08, null, 0.15); oTone(f * 1.005, t, 0.7, "sine", 0.05, null, 0.15); },
  octo: (t, f) => oTone(f, t, 0.32, "triangle", 0.14, f * 0.99)
};

/* ---- secret combinations: find them by trying things; each one is a little reward ---- */
const orchCells = (g, id) => { const out = []; g.forEach((row, r) => row.forEach((v, c) => { if (v === id) out.push([r, c]); })); return out; };
const orchFilled = (g) => { const out = []; g.forEach((row, r) => row.forEach((v, c) => { if (v) out.push([r, c]); })); return out; };
const ORCH_COMBOS = [
  { id: "frogs", notes: [262, 330, 392, 523], find: (g) => { const f = orchCells(g, "frog"); return f.length >= 4 ? f : null; } },
  { id: "ghosts", notes: [330, 392, 494, 659], find: (g) => { const f = orchCells(g, "ghost"); return f.length >= 4 ? f : null; } },
  { id: "birds", notes: [659, 784, 988, 1319], find: (g) => {
    for (let r = 0; r < g.length; r++) { const f = g[r].map((v, c) => v === "bird" ? [r, c] : null).filter(Boolean); if (f.length >= 4) return f; }
    return null; } },
  { id: "robots", notes: [294, 370, 440, 587], find: (g) => {
    for (let r = 0; r < g.length; r++) for (const p of [0, 1]) {
      const cols = [p, p + 2, p + 4, p + 6];
      if (cols.every((c) => g[r][c] === "robot")) return cols.map((c) => [r, c]);
    }
    return null; } },
  { id: "octo", notes: [262, 294, 330, 392, 440, 523], find: (g) => {
    for (let r0 = 0; r0 + 3 < g.length; r0++) for (let c0 = 0; c0 + 3 < ORCH_COLS; c0++) for (const up of [false, true]) {
      const line = [0, 1, 2, 3].map((i) => [r0 + (up ? 3 - i : i), c0 + i]);
      if (line.every(([r, c]) => g[r][c] === "octo")) return line;
    }
    return null; } },
  { id: "floor", notes: [131, 165, 196, 262], find: (g) => [0, 2, 4, 6].every((c) => g[g.length - 1][c] === "blob") ? [0, 2, 4, 6].map((c) => [g.length - 1, c]) : null },
  { id: "all", notes: [262, 330, 392, 523, 659, 784], find: (g) => new Set(g.flat().filter(Boolean)).size === ORCH_CREATURES.length ? orchFilled(g) : null },
  { id: "wall", notes: [262, 392, 523, 659, 784, 1047], find: (g) => g.flat().every(Boolean) ? orchFilled(g) : null }
];

/* ---- the stage and the clock ---- */
const orch = { inspOpen: true, grid: null, len: null, pit: null, more: null, cell: null, pitch: 0, kit: 0, bpm: 100, sel: "blob", playing: false, step: 0, next: 0, timer: null, placed: 0, found: [] };
function orchLoad() {
  try { orch.found = JSON.parse(localStorage.getItem("orchFound") || "[]"); } catch (e) { orch.found = []; }
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("orchestra") || "null"); } catch (e) {}
  if (saved && Array.isArray(saved.g) && saved.g.length >= ORCH_MIN_ROWS && saved.g.length <= ORCH_MAX_ROWS && saved.g.every((row) => Array.isArray(row) && row.length === ORCH_COLS)) { orch.grid = saved.g; orch.bpm = saved.bpm || 100; orch.pitch = Math.max(-12, Math.min(12, +saved.p || 0)); orch.kit = Math.max(0, Math.min(3, +saved.k || 0)); orch.len = orchLenFor(orch.grid, saved.l); orchSync(saved); return; }
  orch.grid = Array.from({ length: ORCH_MIN_ROWS }, () => Array(ORCH_COLS).fill(null));
  [[3, 0, "blob"], [3, 4, "blob"], [0, 2, "robot"], [0, 6, "robot"], [2, 1, "octo"], [1, 3, "octo"], [2, 5, "octo"], [3, 2, "frog"]]
    .forEach(([r, c, id]) => { orch.grid[r][c] = id; });
  orch.len = orchLenFor(orch.grid, null);
  orchSync(null);
}
const orchSync = (saved) => { // per-note pitch (semitones) and extra layers on a square, kept next to the grid
  const ok = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
  orch.pit = orch.grid.map((row, r) => row.map((_, c) => { const v = saved && saved.pt && saved.pt[r] && saved.pt[r][c]; return ok(v, -12, 12) ? v : 0; }));
  orch.more = orch.grid.map((row, r) => row.map((_, c) => { const a = saved && saved.m && saved.m[r] && saved.m[r][c]; return Array.isArray(a) ? a.filter((n) => n && ORCH_BY_ID[n.id]).slice(0, 3).map((n) => ({ id: n.id, len: ok(n.len, 1, ORCH_COLS) ? n.len : 1, pit: ok(n.pit, -12, 12) ? n.pit : 0 })) : []; }));
  orch.cell = null;
};
const orchLenFor = (grid, saved) => grid.map((row, r) => row.map((_, c) => (saved && saved[r] && Number.isInteger(saved[r][c]) && saved[r][c] >= 1 && saved[r][c] <= ORCH_COLS) ? saved[r][c] : 1)); // note lengths (1, 2 or 4 beats) next to the grid
function orchSave() { try { localStorage.setItem("orchestra", JSON.stringify({ g: orch.grid, l: orch.len, pt: orch.pit, m: orch.more, p: orch.pitch, k: orch.kit, bpm: orch.bpm })); } catch (e) {} }
const orchCount = () => orch.grid.flat().filter(Boolean).length;
/* a square holds up to four notes: the main creature (kept in grid / len / pit) and the layers on top of it */
const orchNotes = (r, c) => (orch.grid[r][c] ? [{ id: orch.grid[r][c], len: orch.len[r][c], pit: orch.pit[r][c] }, ...orch.more[r][c]] : []);
function orchSetNotes(r, c, notes) {
  const [a, ...rest] = notes;
  orch.grid[r][c] = a ? a.id : null; orch.len[r][c] = a ? a.len : 1; orch.pit[r][c] = a ? a.pit : 0; orch.more[r][c] = rest;
}
const orchHear = (n, r) => { if (!playMuted) orchVoice(n.id, orchCtx().currentTime + 0.01, ORCH_NOTES[r], n.len, n.pit); };

function orchPlayStep(step, when) {
  if (!playMuted) for (let r = 0; r < orch.grid.length; r++) {
    orchNotes(r, step).forEach((n) => orchVoice(n.id, when, ORCH_NOTES[r], n.len, n.pit));
  }
  setTimeout(() => { // the visuals follow the audio clock
    if (!orch.playing) return;
    document.querySelectorAll(".orch__cell").forEach((el) => {
      const hit = +el.dataset.c === step;
      el.classList.toggle("is-now", hit);
      if (hit && el.dataset.id) { el.classList.remove("is-hit"); void el.offsetWidth; el.classList.add("is-hit"); }
    });
  }, Math.max(0, (when - audioCtx.currentTime) * 1000));
}
function orchTick() {
  const stepDur = 60 / orch.bpm / 2;
  while (orch.next < audioCtx.currentTime + 0.14) {
    orchPlayStep(orch.step, orch.next);
    orch.next += stepDur;
    orch.step = (orch.step + 1) % ORCH_COLS;
  }
}
function orchStart() {
  const c = orchCtx();
  orch.playing = true; orch.step = 0; orch.next = c.currentTime + 0.06;
  orchTick();
  orch.timer = setInterval(orchTick, 25);
  if (orch.placed >= 6) unlock("maestro");
  orchSyncButtons();
}
function orchStop() {
  if (!orch.playing && !orch.timer) return;
  orch.playing = false;
  clearInterval(orch.timer); orch.timer = null;
  document.querySelectorAll(".orch__cell.is-now").forEach((el) => el.classList.remove("is-now"));
  orchSyncButtons();
}
function orchSyncButtons() {
  const b = document.getElementById("orchPlay");
  if (!b) return;
  b.innerHTML = `<span aria-hidden="true">${orch.playing ? "❚❚" : "▶"}</span> ${esc(ot(orch.playing ? "pause" : "play"))}`;
  b.setAttribute("aria-pressed", String(orch.playing));
}
/* Space always plays or pauses, whatever has the focus (it must not place or remove a creature) */
const orchSpace = (e) => e.code === "Space" && typeof play !== "undefined" && play.screen === "orch" && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && !e.ctrlKey && !e.metaKey && !e.altKey;
document.addEventListener("keydown", (e) => { if (!orchSpace(e)) return; e.preventDefault(); if (!e.repeat) { if (orch.playing) orchStop(); else orchStart(); } });
document.addEventListener("keyup", (e) => { if (orchSpace(e)) e.preventDefault(); }); // a button would click on key up
document.addEventListener("visibilitychange", () => { if (document.hidden) orchStop(); });

/* ---- placing creatures ---- */
function orchPreview(id) { // pressing a creature in the tray plays its sound, so you know what you are about to place
  if (!playMuted) orchVoice(id, orchCtx().currentTime + 0.01, ORCH_NOTES[1]);
  const face = document.querySelector(`.orch__pick[data-id="${id}"] .orch__face`);
  if (face) { face.classList.remove("is-hit"); void face.offsetWidth; face.classList.add("is-hit"); }
}
function orchPlace(r, c, drop) {
  const notes = orchNotes(r, c);
  if (!notes.length) { // an empty square: the chosen creature steps onto it and is selected
    orchSetNotes(r, c, [{ id: orch.sel, len: 1, pit: 0 }]); orch.placed++; orch.cell = [r, c];
    orchHear(orchNotes(r, c)[0], r);
    if (orch.playing && orch.placed >= 6) unlock("maestro");
  } else if (drop) { // dropped onto someone: a new layer
    if (notes.length < 4) { notes.push({ id: orch.sel, len: 1, pit: 0 }); orchSetNotes(r, c, notes); orchHear(notes[notes.length - 1], r); } else sfx.pop();
    orch.cell = [r, c];
  } else { // tapped: select it (tap again to let go), so nothing is deleted by accident
    const same = orch.cell && orch.cell[0] === r && orch.cell[1] === c;
    orch.cell = same ? null : [r, c];
    if (!same) notes.forEach((n) => orchHear(n, r));
  }
  orchSave();
  orchPaintStage();
  orchCheck();
}
/* drag a placed creature to another square (a creature already there swaps places with it) */
function orchMoveDrag(e, cell, r, c) {
  const sx = e.clientX, sy = e.clientY, id = orch.grid[r][c];
  let ghost = null;
  const move = (ev) => {
    if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
      dragFlag(true);
      ghost = document.createElement("div");
      ghost.className = "orch__ghost"; ghost.innerHTML = creatureSVG(ORCH_BY_ID[id]);
      document.body.appendChild(ghost);
      cell.classList.add("is-lifted");
    }
    if (ghost) { ghost.style.left = ev.clientX + "px"; ghost.style.top = ev.clientY + "px"; }
  };
  const up = (ev) => {
    removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
    cell.classList.remove("is-lifted");
    if (!ghost) return;
    ghost.remove();
    const hit = document.elementFromPoint(ev.clientX, ev.clientY), to = hit && hit.closest(".orch__cell");
    if (!to || to === cell) return;
    const r2 = +to.dataset.r, c2 = +to.dataset.c;
    const mine = orchNotes(r, c), theirs = orchNotes(r2, c2);
    orchSetNotes(r, c, theirs); orchSetNotes(r2, c2, mine); orch.cell = [r2, c2];
    mine.forEach((n) => orchHear(n, r2));
    orchSave(); orchPaintStage(); orchCheck();
  };
  addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
}
let orchDragFlag = false; // set after a drag so the click that follows is ignored
const dragFlag = (v) => { orchDragFlag = v; };
function orchCheck() { // did this placement complete a combination nobody has found yet?
  for (const cb of ORCH_COMBOS) {
    if (orch.found.includes(cb.id) || !cb.find(orch.grid)) continue;
    orch.found.push(cb.id);
    try { localStorage.setItem("orchFound", JSON.stringify(orch.found)); } catch (e) {}
    cb.notes.forEach((f, i) => { if (!playMuted) oTone(f, orchCtx().currentTime + 0.12 + i * 0.09, 0.4, "triangle", 0.12); });
    const name = ot("combos")[cb.id][0];
    const b = document.getElementById("orchBanner");
    if (b) { b.textContent = ot("newFound").replace("{n}", name); b.classList.add("is-on"); clearTimeout(orch.bannerT); orch.bannerT = setTimeout(() => b.classList.remove("is-on"), 3600); }
    orchPaintStage();
    if (orch.found.length === ORCH_COMBOS.length) unlock("conductor");
  }
}
function orchPaintFound() {
  const list = document.getElementById("orchFound");
  if (!list) return;
  document.getElementById("orchFoundCount").textContent = `${orch.found.length}/${ORCH_COMBOS.length}`;
  list.innerHTML = ORCH_COMBOS.map((cb) => {
    const [name, hint] = ot("combos")[cb.id];
    return orch.found.includes(cb.id)
      ? `<li class="is-found"><b>✓ ${esc(name)}</b><span>${esc(hint)}</span></li>`
      : `<li><b>? ???</b><span>${esc(hint)}</span></li>`;
  }).join("");
}
function orchDancers() { // cells that belong to a discovered combination and are on stage right now
  const set = new Set();
  ORCH_COMBOS.filter((cb) => orch.found.includes(cb.id)).forEach((cb) => (cb.find(orch.grid) || []).forEach(([r, c]) => set.add(r + "," + c)));
  return set;
}
function orchPaintStage() {
  const clr = document.getElementById("orchClear");
  if (clr) clr.disabled = orchCount() === 0;
  const names = ot("names"), dancers = orchDancers();
  const covered = new Set(); // cells under a note bar: no dashed border showing through
  orch.grid.forEach((row, r) => row.forEach((id, c) => { if (id) for (let k = 1; k < Math.min(orch.len[r][c], ORCH_COLS - c); k++) covered.add(r + "," + (c + k)); }));
  document.querySelectorAll(".orch__cell").forEach((el) => {
    const r = +el.dataset.r, c = +el.dataset.c, id = orch.grid[r][c];
    el.dataset.id = id || "";
    el.classList.toggle("is-covered", covered.has(r + "," + c));
    el.dataset.len = id ? Math.min(orch.len[r][c], ORCH_COLS - c) : 1; // the tail shows how long the note rings
    if (id) el.style.setProperty("--tail", ORCH_BY_ID[id].color); else el.style.removeProperty("--tail");
    el.classList.toggle("is-dance", dancers.has(r + "," + c));
    const pit = orch.pit[r][c], more = orch.more[r][c];
    el.innerHTML = id ? creatureSVG(ORCH_BY_ID[id]) + `<i class="orch__handle" aria-hidden="true"></i>` // the little handle shows that the note can be pulled longer
      + (pit ? `<b class="orch__pit">${pit > 0 ? "+" : ""}${pit}</b>` : "")
      + (more.length ? `<span class="orch__layers">${more.map((n) => `<span>${creatureSVG(ORCH_BY_ID[n.id])}</span>`).join("")}</span>` : "") : "";
    el.classList.toggle("is-selected", !!orch.cell && orch.cell[0] === r && orch.cell[1] === c);
    el.setAttribute("aria-label", `${ot("row")} ${r + 1}, ${ot("beat")} ${c + 1}: ${id ? names[id] + (orch.len[r][c] > 1 ? ", " + ot("len") + " " + orch.len[r][c] : "") : ot("empty")}`);
  });
  orchPaintFound();
  orchPaintInsp();
}
/* the panel for the selected square: pitch and length of every note in it, remove, add a layer */
function orchPaintInsp() {
  const box = document.getElementById("orchInsp");
  if (!box) return;
  const notes = orch.cell ? orchNotes(orch.cell[0], orch.cell[1]) : [];
  if (!notes.length) { orch.cell = null; box.hidden = true; box.innerHTML = ""; return; }
  const [r, c] = orch.cell, names = ot("names"), sgn = (n) => (n > 0 ? "+" : "") + n;
  box.hidden = false;
  box.innerHTML = `<details class="orch__det"${orch.inspOpen ? " open" : ""}><summary><span>${esc(ot("selected"))}: ${esc(ORCH_NAMES[r])} · ${esc(ot("beat"))} ${c + 1}</span><span class="orch__sum">${notes.map((n) => `<i>${creatureSVG(ORCH_BY_ID[n.id])}</i>`).join("")}</span></summary>
    <ul class="orch__notes">${notes.map((n, i) => `<li>
      <span class="orch__mini">${creatureSVG(ORCH_BY_ID[n.id])}</span><b>${esc(names[n.id])}</b>
      <span class="orch__ctl"><span>${esc(ot("pitchNote"))}</span><button type="button" data-i="${i}" data-act="pit-" aria-label="${esc(ot("pitchNote"))} −">−</button><output>${sgn(n.pit)}</output><button type="button" data-i="${i}" data-act="pit+" aria-label="${esc(ot("pitchNote"))} +">+</button></span>
      <span class="orch__ctl"><span>${esc(ot("lenNote"))}</span><button type="button" data-i="${i}" data-act="len-" aria-label="${esc(ot("lenNote"))} −">−</button><output>${n.len}</output><button type="button" data-i="${i}" data-act="len+" aria-label="${esc(ot("lenNote"))} +">+</button></span>
      <button type="button" class="orch__x" data-i="${i}" data-act="del" aria-label="${esc(ot("remove"))}" title="${esc(ot("remove"))}">✕</button></li>`).join("")}</ul>
    <button type="button" class="orch__clear" id="orchAddLayer"${notes.length >= 4 ? " disabled" : ""}>＋ ${esc(ot("layer"))}: ${esc(names[orch.sel])}</button></details>`;
}
function orchInspClick(e) {
  const b = e.target.closest("button");
  if (!b || !orch.cell) return;
  const [r, c] = orch.cell, notes = orchNotes(r, c);
  if (b.id === "orchAddLayer") {
    if (notes.length >= 4) return;
    notes.push({ id: orch.sel, len: 1, pit: 0 }); orchSetNotes(r, c, notes); orchHear(notes[notes.length - 1], r);
  } else {
    const n = notes[+b.dataset.i];
    if (!n) return;
    const act = b.dataset.act;
    if (act === "del") { notes.splice(+b.dataset.i, 1); orchSetNotes(r, c, notes); sfx.pop(); }
    else {
      if (act === "pit-") n.pit = Math.max(-12, n.pit - 1); else if (act === "pit+") n.pit = Math.min(12, n.pit + 1);
      else if (act === "len-") n.len = Math.max(1, n.len - 1); else if (act === "len+") n.len = Math.min(ORCH_COLS - c, n.len + 1);
      orchSetNotes(r, c, notes); orchHear(n, r);
    }
  }
  orchSave(); orchPaintStage(); orchCheck();
}
document.addEventListener("keydown", (e) => { // Delete takes the selected square off the stage, Escape lets go of it
  if (typeof play === "undefined" || play.screen !== "orch" || !orch.cell || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); orchSetNotes(orch.cell[0], orch.cell[1], []); sfx.pop(); orchSave(); orchPaintStage(); }
  else if (e.key === "Escape") { orch.cell = null; orchPaintStage(); }
});
function orchPaintTray() {
  document.querySelectorAll(".orch__pick").forEach((el) => el.setAttribute("aria-pressed", String(el.dataset.id === orch.sel)));
}

/* ---- sharing: the whole beat lives in the address (play.html#orchestra/<32 letters>.<tempo>) ---- */
const ORCH_IDS = ["blob", "frog", "bird", "ghost", "robot", "octo"], ORCH_CODE = "bfpgro";
const orchEncode = () => orch.grid.flat().map((id) => id ? ORCH_CODE[ORCH_IDS.indexOf(id)] : "-").join("");
const orchEncodeRest = () => "." + orch.bpm + "." + (orch.pitch + 12) + "." + orch.kit + "." + orch.len.flat().join("") // tempo, pitch (+12), kit, note lengths,
  + "." + orch.pit.flat().map((v) => String.fromCharCode(109 + v)).join("") // pitch of every note (m = 0),
  + "." + orch.more.map((row, r) => row.map((list, c) => list.map((n) => "" + r + c + ORCH_CODE[ORCH_IDS.indexOf(n.id)] + n.len + String.fromCharCode(109 + n.pit)).join("")).join("")).join(""); // and the layers
function orchApplyHash() {
  const m = location.hash.match(/^#orchestra\/([bfpgro-]{32,64})\.(\d{2,3})(?:\.(\d{1,2})\.([0-3])\.([1-8]{32,64})(?:\.([a-y]{32,64})\.((?:[0-7]{2}[bfpgro][1-8][a-y])*))?)?$/);
  if (!m || m[1].length % ORCH_COLS) return;
  const flat = [...m[1]].map((ch) => ch === "-" ? null : ORCH_IDS[ORCH_CODE.indexOf(ch)]);
  orch.grid = Array.from({ length: flat.length / ORCH_COLS }, (_, r) => flat.slice(r * ORCH_COLS, (r + 1) * ORCH_COLS));
  orch.bpm = Math.min(150, Math.max(60, +m[2]));
  orch.pitch = m[3] !== undefined ? Math.max(-12, Math.min(12, +m[3] - 12)) : 0; orch.kit = m[4] !== undefined ? +m[4] : 0;
  const lens = m[5] && m[5].length === m[1].length ? [...m[5]].map(Number) : null;
  orch.len = orch.grid.map((row, r) => row.map((_, c) => lens ? lens[r * ORCH_COLS + c] : 1));
  orchSync(null);
  if (m[6] && m[6].length === m[1].length) [...m[6]].forEach((ch, i) => { orch.pit[Math.floor(i / ORCH_COLS)][i % ORCH_COLS] = ch.charCodeAt(0) - 109; });
  for (const l of (m[7] || "").match(/[0-7]{2}[bfpgro][1-8][a-y]/g) || []) {
    const r = +l[0], c = +l[1];
    if (orch.grid[r] && orch.grid[r][c] && orch.more[r][c].length < 3) orch.more[r][c].push({ id: ORCH_IDS[ORCH_CODE.indexOf(l[2])], len: +l[3], pit: l.charCodeAt(4) - 109 });
  }
  orchSave();
  history.replaceState(null, "", location.pathname + location.search + "#orchestra"); // the shared beat is now yours to change
}
function orchShare(btn) {
  const url = location.origin + location.pathname + "#orchestra/" + orchEncode() + orchEncodeRest();
  const label = btn.innerHTML;
  const done = () => { btn.innerHTML = `<span aria-hidden="true">✓</span> ${esc(ot("copied"))}`; setTimeout(() => { btn.innerHTML = label; }, 1900); sfx.pop(); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => window.prompt(ot("share"), url));
  else window.prompt(ot("share"), url);
}

function renderOrchestra() {
  if (!orch.grid) orchLoad();
  orchApplyHash();
  const names = ot("names"), sounds = ot("sounds");
  playBody.innerHTML = `
    <div class="orch">
      <div class="orch__stagewrap">
        <div class="orch__stage" role="group" aria-label="${esc(ot("stage"))}">
          ${Array.from({ length: orch.grid.length }, (_, r) => Array.from({ length: ORCH_COLS }, (_, c) =>
            `<button type="button" class="orch__cell${c % 4 === 0 ? " is-beat" : ""}" data-r="${r}" data-c="${c}"${c === 0 ? ` data-note="${ORCH_NAMES[r]}"` : ""}></button>`).join("")).join("")}
        </div>
        <p class="orch__banner" id="orchBanner" role="status" aria-live="polite"></p>
        <section class="orch__foundbox orch__insp" id="orchInsp" hidden></section>
      </div>
      <div class="orch__side">
        <div class="orch__tray" role="group" aria-label="${esc(ot("creatures"))}">
          ${ORCH_CREATURES.map((c) => `<button type="button" class="orch__pick" data-id="${c.id}" aria-pressed="false">
            <span class="orch__face">${creatureSVG(c)}</span>
            <span class="orch__name">${esc(names[c.id])}</span><small>${esc(sounds[c.id])}</small></button>`).join("")}
        </div>
        <p class="orch__hint">${esc(ot("hint"))}</p>
        <section class="orch__foundbox" aria-labelledby="orchFoundTitle">
          <h3 id="orchFoundTitle">${esc(ot("found"))} <span id="orchFoundCount"></span></h3>
          <ul class="orch__found" id="orchFound"></ul>
        </section>
      </div>
      <div class="orch__bar">
        <button type="button" class="orch__go" id="orchPlay" aria-pressed="false"></button>
        <label class="orch__tempo"><span>${esc(ot("tempo"))}</span>
          <input type="range" id="orchTempo" min="60" max="150" step="5" value="${orch.bpm}"><output id="orchBpm">${orch.bpm}</output></label>
        <label class="orch__tempo orch__pitch"><span>${esc(ot("pitch"))}</span>
          <input type="range" id="orchPitch" min="-12" max="12" step="1" value="${orch.pitch}"><output id="orchPitchOut">${orch.pitch > 0 ? "+" : ""}${orch.pitch}</output></label>
        <button type="button" class="orch__clear" id="orchKit">${esc(ot("kit"))}: ${esc(ot("kits")[orch.kit])}</button>
        <span class="orch__rows" role="group" aria-label="${esc(ot("rows"))}"><button type="button" class="orch__rowbtn" id="orchRowLess" aria-label="${esc(ot("rowLess"))}"></button><span>${esc(ot("rows"))}</span><button type="button" class="orch__rowbtn" id="orchRowMore" aria-label="${esc(ot("rowMore"))}"></button></span>
        <button type="button" class="orch__clear" id="orchShare"><span aria-hidden="true">↗</span> ${esc(ot("share"))}</button>
        <button type="button" class="orch__clear" id="orchClear"><span aria-hidden="true">✕</span> ${esc(ot("clear"))}</button>
      </div>
    </div>`;
  orchPaintStage(); orchPaintTray(); orchSyncButtons();

  const stage = playBody.querySelector(".orch__stage");
  let dragged = false; // a drag that stretched a note must not count as a tap afterwards
  stage.addEventListener("click", (e) => {
    const cell = e.target.closest(".orch__cell");
    if (dragged || orchDragFlag) { dragged = false; orchDragFlag = false; return; }
    if (cell) orchPlace(+cell.dataset.r, +cell.dataset.c);
  });
  /* press a creature on the stage and pull to the right: its note gets as long as the cells you cover */
  stage.addEventListener("pointerdown", (e) => {
    const cell = e.target.closest(".orch__cell");
    dragged = false; orchDragFlag = false;
    if (!cell || !cell.dataset.id || (e.pointerType === "mouse" && e.button !== 0)) return;
    const r = +cell.dataset.r, c = +cell.dataset.c, box = cell.getBoundingClientRect(), step = box.width + 7, x0 = e.clientX, len0 = orch.len[r][c];
    if (!e.target.closest(".orch__handle")) { orchMoveDrag(e, cell, r, c); return; } // the creature itself moves, only the handle stretches
    let moved = false;
    const move = (ev) => {
      if (!moved && Math.abs(ev.clientX - x0) < 10) return;
      moved = true; dragged = true;
      const n = Math.max(1, Math.min(ORCH_COLS - c, len0 + Math.round((ev.clientX - x0) / step)));
      if (n !== orch.len[r][c]) { orch.len[r][c] = n; orchPaintStage(); if (!playMuted) oTone(300 + n * 60, orchCtx().currentTime, 0.05, "triangle", 0.05); }
    };
    const up = () => {
      removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
      if (moved) { orchSave(); if (!playMuted) orchVoice(orch.grid[r][c], orchCtx().currentTime + 0.01, ORCH_NOTES[r], orch.len[r][c]); }
    };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  });
  /* tray: press to hear a creature and choose it, or drag it onto the stage */
  playBody.querySelectorAll(".orch__pick").forEach((pick) => pick.addEventListener("pointerdown", (e) => {
    const sx = e.clientX, sy = e.clientY, id = pick.dataset.id;
    let ghost = null;
    orchPreview(id);
    const move = (ev) => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
        ghost = document.createElement("div");
        ghost.className = "orch__ghost"; ghost.innerHTML = creatureSVG(ORCH_BY_ID[id]);
        document.body.appendChild(ghost);
      }
      if (ghost) { ghost.style.left = ev.clientX + "px"; ghost.style.top = ev.clientY + "px"; }
    };
    const up = (ev) => {
      removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
      orch.sel = id; orchPaintTray();
      if (ghost) {
        ghost.remove();
        const hit = document.elementFromPoint(ev.clientX, ev.clientY);
        const cell = hit && hit.closest(".orch__cell");
        if (cell) orchPlace(+cell.dataset.r, +cell.dataset.c, true);
      }
    };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  }));
  document.getElementById("orchPlay").addEventListener("click", () => { if (orch.playing) orchStop(); else orchStart(); });
  document.getElementById("orchTempo").addEventListener("input", (e) => {
    orch.bpm = +e.target.value; document.getElementById("orchBpm").textContent = orch.bpm; orchSave();
  });
  document.getElementById("orchPitch").addEventListener("input", (e) => {
    orch.pitch = +e.target.value; document.getElementById("orchPitchOut").textContent = (orch.pitch > 0 ? "+" : "") + orch.pitch; orchSave();
    if (!playMuted && !orch.playing) orchVoice(orch.sel, orchCtx().currentTime + 0.01, ORCH_NOTES[1]);
  });
  document.getElementById("orchKit").addEventListener("click", (e) => {
    orch.kit = (orch.kit + 1) % ot("kits").length; orchSave();
    e.currentTarget.textContent = ot("kit") + ": " + ot("kits")[orch.kit];
    if (!playMuted) orchVoice(orch.sel, orchCtx().currentTime + 0.01, ORCH_NOTES[1]);
  });
  document.getElementById("orchInsp").addEventListener("click", orchInspClick);
  document.getElementById("orchInsp").addEventListener("toggle", (e) => { if (e.target.matches("details")) orch.inspOpen = e.target.open; }, true); // folded up it stays out of the way
  document.getElementById("orchShare").addEventListener("click", (e) => orchShare(e.currentTarget));
  const rowBtns = () => {
    document.getElementById("orchRowLess").disabled = orch.grid.length <= ORCH_MIN_ROWS;
    document.getElementById("orchRowMore").disabled = orch.grid.length >= ORCH_MAX_ROWS;
  };
  const setRows = (delta) => {
    if (delta > 0) { orch.grid.push(Array(ORCH_COLS).fill(null)); orch.len.push(Array(ORCH_COLS).fill(1)); orch.pit.push(Array(ORCH_COLS).fill(0)); orch.more.push(Array.from({ length: ORCH_COLS }, () => [])); }
    else { orch.grid.pop(); orch.len.pop(); orch.pit.pop(); orch.more.pop(); orch.cell = null; }
    orchSave(); sfx.click(); renderOrchestra();
  };
  rowBtns();
  document.getElementById("orchRowMore").addEventListener("click", () => setRows(1));
  document.getElementById("orchRowLess").addEventListener("click", () => setRows(-1));
  document.getElementById("orchClear").addEventListener("click", () => {
    orch.grid = Array.from({ length: orch.grid.length }, () => Array(ORCH_COLS).fill(null));
    orch.len = orchLenFor(orch.grid, null); orchSync(null);
    orchSave(); orchPaintStage(); sfx.pop();
  });
}
