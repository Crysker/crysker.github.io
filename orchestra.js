/* ============ Tiny Orchestra ============
   A toy, not a game: drop little creatures onto a stage and they play a looping beat. No score, no goal.
   Sounds are synthesised in the browser (Web Audio), nothing to download. Runs on play.html and uses
   helpers from play.js / play-shell.js (esc, lang, audioCtx, playMuted, sfx, unlock, play, renderPlay). */

const ORCH_COLS = 8, ORCH_ROWS = 4;
const ORCH_NOTES = [523.25, 440, 392, 329.63]; // top row to bottom row: C5 A4 G4 E4 (pentatonic, so everything sounds good together)
const ORCH_T = {
  en: {
    toy: "A toy",
    play: "Play", pause: "Pause", clear: "Clear all", tempo: "Tempo", stage: "Stage",
    empty: "empty", row: "Row", beat: "beat", pick: "Creature",
    names: { blob: "Blobby", frog: "Froggo", bird: "Pip", ghost: "Boo", robot: "Bleep", octo: "Inky" },
    sounds: { blob: "kick", frog: "bass", bird: "chirp", ghost: "pad", robot: "tick", octo: "pluck" },
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
function oTone(freq, t, dur, type, vol, slideTo, attack = 0.012) {
  const c = orchCtx(), osc = c.createOscillator(), g = c.createGain();
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
    for (let r = 0; r < ORCH_ROWS; r++) { const f = g[r].map((v, c) => v === "bird" ? [r, c] : null).filter(Boolean); if (f.length >= 4) return f; }
    return null; } },
  { id: "robots", notes: [294, 370, 440, 587], find: (g) => {
    for (let r = 0; r < ORCH_ROWS; r++) for (const p of [0, 1]) {
      const cols = [p, p + 2, p + 4, p + 6];
      if (cols.every((c) => g[r][c] === "robot")) return cols.map((c) => [r, c]);
    }
    return null; } },
  { id: "octo", notes: [262, 294, 330, 392, 440, 523], find: (g) => {
    for (let c0 = 0; c0 + 3 < ORCH_COLS; c0++) for (const up of [false, true]) {
      const line = [0, 1, 2, 3].map((i) => [up ? 3 - i : i, c0 + i]);
      if (line.every(([r, c]) => g[r][c] === "octo")) return line;
    }
    return null; } },
  { id: "floor", notes: [131, 165, 196, 262], find: (g) => [0, 2, 4, 6].every((c) => g[ORCH_ROWS - 1][c] === "blob") ? [0, 2, 4, 6].map((c) => [ORCH_ROWS - 1, c]) : null },
  { id: "all", notes: [262, 330, 392, 523, 659, 784], find: (g) => new Set(g.flat().filter(Boolean)).size === ORCH_CREATURES.length ? orchFilled(g) : null },
  { id: "wall", notes: [262, 392, 523, 659, 784, 1047], find: (g) => g.flat().every(Boolean) ? orchFilled(g) : null }
];

/* ---- the stage and the clock ---- */
const orch = { grid: null, bpm: 100, sel: "blob", playing: false, step: 0, next: 0, timer: null, placed: 0, found: [] };
function orchLoad() {
  try { orch.found = JSON.parse(localStorage.getItem("orchFound") || "[]"); } catch (e) { orch.found = []; }
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("orchestra") || "null"); } catch (e) {}
  if (saved && Array.isArray(saved.g) && saved.g.length === ORCH_ROWS) { orch.grid = saved.g; orch.bpm = saved.bpm || 100; return; }
  orch.grid = Array.from({ length: ORCH_ROWS }, () => Array(ORCH_COLS).fill(null));
  [[3, 0, "blob"], [3, 4, "blob"], [0, 2, "robot"], [0, 6, "robot"], [2, 1, "octo"], [1, 3, "octo"], [2, 5, "octo"], [3, 2, "frog"]]
    .forEach(([r, c, id]) => { orch.grid[r][c] = id; });
}
function orchSave() { try { localStorage.setItem("orchestra", JSON.stringify({ g: orch.grid, bpm: orch.bpm })); } catch (e) {} }
const orchCount = () => orch.grid.flat().filter(Boolean).length;

function orchPlayStep(step, when) {
  if (!playMuted) for (let r = 0; r < ORCH_ROWS; r++) {
    const id = orch.grid[r][step];
    if (id) ORCH_VOICE[id](when, ORCH_NOTES[r]);
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
document.addEventListener("visibilitychange", () => { if (document.hidden) orchStop(); });

/* ---- placing creatures ---- */
function orchPreview(id) { // pressing a creature in the tray plays its sound, so you know what you are about to place
  if (!playMuted) ORCH_VOICE[id](orchCtx().currentTime + 0.01, ORCH_NOTES[1]);
  const face = document.querySelector(`.orch__pick[data-id="${id}"] .orch__face`);
  if (face) { face.classList.remove("is-hit"); void face.offsetWidth; face.classList.add("is-hit"); }
}
function orchPlace(r, c) {
  const cur = orch.grid[r][c];
  if (cur === orch.sel) { orch.grid[r][c] = null; sfx.pop(); }
  else {
    orch.grid[r][c] = orch.sel; orch.placed++;
    if (!playMuted) ORCH_VOICE[orch.sel](orchCtx().currentTime + 0.01, ORCH_NOTES[r]); // a little preview
    if (orch.playing && orch.placed >= 6) unlock("maestro");
  }
  orchSave();
  orchPaintStage();
  orchCheck();
}
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
  document.querySelectorAll(".orch__cell").forEach((el) => {
    const r = +el.dataset.r, c = +el.dataset.c, id = orch.grid[r][c];
    el.dataset.id = id || "";
    el.classList.toggle("is-dance", dancers.has(r + "," + c));
    el.innerHTML = id ? creatureSVG(ORCH_BY_ID[id]) : "";
    el.setAttribute("aria-label", `${ot("row")} ${r + 1}, ${ot("beat")} ${c + 1}: ${id ? names[id] : ot("empty")}`);
  });
  orchPaintFound();
}
function orchPaintTray() {
  document.querySelectorAll(".orch__pick").forEach((el) => el.setAttribute("aria-pressed", String(el.dataset.id === orch.sel)));
}

/* ---- sharing: the whole beat lives in the address (play.html#orchestra/<32 letters>.<tempo>) ---- */
const ORCH_IDS = ["blob", "frog", "bird", "ghost", "robot", "octo"], ORCH_CODE = "bfpgro";
const orchEncode = () => orch.grid.flat().map((id) => id ? ORCH_CODE[ORCH_IDS.indexOf(id)] : "-").join("");
function orchApplyHash() {
  const m = location.hash.match(/^#orchestra\/([bfpgro-]{32})\.(\d{2,3})$/);
  if (!m) return;
  const flat = [...m[1]].map((ch) => ch === "-" ? null : ORCH_IDS[ORCH_CODE.indexOf(ch)]);
  orch.grid = Array.from({ length: ORCH_ROWS }, (_, r) => flat.slice(r * ORCH_COLS, (r + 1) * ORCH_COLS));
  orch.bpm = Math.min(150, Math.max(60, +m[2]));
  orchSave();
  history.replaceState(null, "", location.pathname + location.search + "#orchestra"); // the shared beat is now yours to change
}
function orchShare(btn) {
  const url = location.origin + location.pathname + "#orchestra/" + orchEncode() + "." + orch.bpm;
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
          ${Array.from({ length: ORCH_ROWS }, (_, r) => Array.from({ length: ORCH_COLS }, (_, c) =>
            `<button type="button" class="orch__cell${c % 4 === 0 ? " is-beat" : ""}" data-r="${r}" data-c="${c}"></button>`).join("")).join("")}
        </div>
        <p class="orch__banner" id="orchBanner" role="status" aria-live="polite"></p>
      </div>
      <div class="orch__side">
        <div class="orch__tray" role="group" aria-label="${esc(ot("creatures"))}">
          ${ORCH_CREATURES.map((c) => `<button type="button" class="orch__pick" data-id="${c.id}" aria-pressed="false">
            <span class="orch__face">${creatureSVG(c)}</span>
            <span class="orch__name">${esc(names[c.id])}</span><small>${esc(sounds[c.id])}</small></button>`).join("")}
        </div>
        <section class="orch__foundbox" aria-labelledby="orchFoundTitle">
          <h3 id="orchFoundTitle">${esc(ot("found"))} <span id="orchFoundCount"></span></h3>
          <ul class="orch__found" id="orchFound"></ul>
        </section>
      </div>
      <div class="orch__bar">
        <button type="button" class="orch__go" id="orchPlay" aria-pressed="false"></button>
        <label class="orch__tempo"><span>${esc(ot("tempo"))}</span>
          <input type="range" id="orchTempo" min="60" max="150" step="5" value="${orch.bpm}"><output id="orchBpm">${orch.bpm}</output></label>
        <button type="button" class="orch__clear" id="orchShare"><span aria-hidden="true">↗</span> ${esc(ot("share"))}</button>
        <button type="button" class="orch__clear" id="orchClear"><span aria-hidden="true">✕</span> ${esc(ot("clear"))}</button>
      </div>
    </div>`;
  orchPaintStage(); orchPaintTray(); orchSyncButtons();

  const stage = playBody.querySelector(".orch__stage");
  stage.addEventListener("click", (e) => {
    const cell = e.target.closest(".orch__cell");
    if (cell) orchPlace(+cell.dataset.r, +cell.dataset.c);
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
        if (cell) orchPlace(+cell.dataset.r, +cell.dataset.c);
      }
    };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  }));
  document.getElementById("orchPlay").addEventListener("click", () => { if (orch.playing) orchStop(); else orchStart(); });
  document.getElementById("orchTempo").addEventListener("input", (e) => {
    orch.bpm = +e.target.value; document.getElementById("orchBpm").textContent = orch.bpm; orchSave();
  });
  document.getElementById("orchShare").addEventListener("click", (e) => orchShare(e.currentTarget));
  document.getElementById("orchClear").addEventListener("click", () => {
    orch.grid = Array.from({ length: ORCH_ROWS }, () => Array(ORCH_COLS).fill(null));
    orchSave(); orchPaintStage(); sfx.pop();
  });
}
