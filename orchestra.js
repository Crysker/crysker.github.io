/* ============ Tiny Orchestra ============
   A toy, not a game: drop little creatures onto a stage and they play a looping beat. No score, no goal.
   Sounds are synthesised in the browser (Web Audio), nothing to download. Runs on play.html and uses
   helpers from play.js / play-shell.js (esc, lang, audioCtx, playMuted, sfx, unlock, play, renderPlay). */

const ORCH_COLS = 8, ORCH_ROWS = 4;
const ORCH_NOTES = [523.25, 440, 392, 329.63]; // top row to bottom row: C5 A4 G4 E4 (pentatonic, so everything sounds good together)
const ORCH_T = {
  en: {
    toy: "A toy", hint: "Pick a creature, then tap the stage. You can also drag them. Tap a placed creature again to remove it.",
    play: "Play", pause: "Pause", clear: "Clear all", tempo: "Tempo", stage: "Stage",
    empty: "empty", row: "Row", beat: "beat", pick: "Creature",
    names: { blob: "Blobby", frog: "Froggo", bird: "Pip", ghost: "Boo", robot: "Bleep", octo: "Inky" },
    sounds: { blob: "kick", frog: "bass", bird: "chirp", ghost: "pad", robot: "tick", octo: "pluck" }
  },
  de: {
    toy: "Ein Spielzeug", hint: "Such dir ein Wesen aus und tippe dann auf die Bühne. Ziehen geht auch. Tippe ein gesetztes Wesen noch einmal an, um es zu entfernen.",
    play: "Abspielen", pause: "Pause", clear: "Alles leeren", tempo: "Tempo", stage: "Bühne",
    empty: "leer", row: "Reihe", beat: "Schlag", pick: "Wesen",
    names: { blob: "Blobby", frog: "Froggo", bird: "Pip", ghost: "Boo", robot: "Bleep", octo: "Inky" },
    sounds: { blob: "Bassdrum", frog: "Bass", bird: "Zwitschern", ghost: "Klangteppich", robot: "Tick", octo: "Zupfen" }
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
function oNoise(t, dur, vol) {
  const c = orchCtx();
  if (!oNoiseBuf) {
    oNoiseBuf = c.createBuffer(1, c.sampleRate * 0.2, c.sampleRate);
    const d = oNoiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const src = c.createBufferSource(), hp = c.createBiquadFilter(), g = c.createGain();
  src.buffer = oNoiseBuf; hp.type = "highpass"; hp.frequency.value = 6500;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(hp).connect(g).connect(c.destination);
  src.start(t); src.stop(t + dur + 0.02);
}
const ORCH_VOICE = {
  blob: (t) => oTone(150, t, 0.2, "sine", 0.4, 42),
  robot: (t) => oNoise(t, 0.05, 0.14),
  frog: (t, f) => oTone(f / 2, t, 0.26, "sine", 0.26, f / 3),
  bird: (t, f) => { oTone(f * 2, t, 0.1, "triangle", 0.07, f * 3); oTone(f * 2.5, t + 0.1, 0.1, "triangle", 0.06, f * 3.5); },
  ghost: (t, f) => { oTone(f, t, 0.7, "sine", 0.08, null, 0.15); oTone(f * 1.005, t, 0.7, "sine", 0.05, null, 0.15); },
  octo: (t, f) => oTone(f, t, 0.32, "triangle", 0.14, f * 0.99)
};

/* ---- the stage and the clock ---- */
const orch = { grid: null, bpm: 100, sel: "blob", playing: false, step: 0, next: 0, timer: null, placed: 0 };
function orchLoad() {
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
}
function orchPaintStage() {
  const clr = document.getElementById("orchClear");
  if (clr) clr.disabled = orchCount() === 0;
  const names = ot("names");
  document.querySelectorAll(".orch__cell").forEach((el) => {
    const r = +el.dataset.r, c = +el.dataset.c, id = orch.grid[r][c];
    el.dataset.id = id || "";
    el.innerHTML = id ? creatureSVG(ORCH_BY_ID[id]) : "";
    el.setAttribute("aria-label", `${ot("row")} ${r + 1}, ${ot("beat")} ${c + 1}: ${id ? names[id] : ot("empty")}`);
  });
}
function orchPaintTray() {
  document.querySelectorAll(".orch__pick").forEach((el) => el.setAttribute("aria-pressed", String(el.dataset.id === orch.sel)));
}

function renderOrchestra() {
  if (!orch.grid) orchLoad();
  const names = ot("names"), sounds = ot("sounds");
  playBody.innerHTML = `
    <div class="orch">
      <p class="play__intro">${esc(ot("hint"))}</p>
      <div class="orch__stage" role="group" aria-label="${esc(ot("stage"))}">
        ${Array.from({ length: ORCH_ROWS }, (_, r) => Array.from({ length: ORCH_COLS }, (_, c) =>
          `<button type="button" class="orch__cell${c % 4 === 0 ? " is-beat" : ""}" data-r="${r}" data-c="${c}"></button>`).join("")).join("")}
      </div>
      <div class="orch__tray" role="group" aria-label="${esc(ot("pick"))}">
        ${ORCH_CREATURES.map((c) => `<button type="button" class="orch__pick" data-id="${c.id}" aria-pressed="false">
          <span class="orch__face">${creatureSVG(c)}</span>
          <span class="orch__name">${esc(names[c.id])}</span><small>${esc(sounds[c.id])}</small></button>`).join("")}
      </div>
      <div class="orch__bar">
        <button type="button" class="orch__go" id="orchPlay" aria-pressed="false"></button>
        <label class="orch__tempo"><span>${esc(ot("tempo"))}</span>
          <input type="range" id="orchTempo" min="60" max="150" step="5" value="${orch.bpm}"><output id="orchBpm">${orch.bpm}</output></label>
        <button type="button" class="orch__clear" id="orchClear"><span aria-hidden="true">✕</span> ${esc(ot("clear"))}</button>
      </div>
    </div>`;
  orchPaintStage(); orchPaintTray(); orchSyncButtons();

  const stage = playBody.querySelector(".orch__stage");
  stage.addEventListener("click", (e) => {
    const cell = e.target.closest(".orch__cell");
    if (cell) orchPlace(+cell.dataset.r, +cell.dataset.c);
  });
  /* tray: tap to choose, or drag a creature onto the stage */
  playBody.querySelectorAll(".orch__pick").forEach((pick) => pick.addEventListener("pointerdown", (e) => {
    const sx = e.clientX, sy = e.clientY, id = pick.dataset.id;
    let ghost = null;
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
        const cell = document.elementFromPoint(ev.clientX, ev.clientY)?.closest(".orch__cell");
        if (cell) orchPlace(+cell.dataset.r, +cell.dataset.c);
      } else sfx.click();
    };
    addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  }));
  document.getElementById("orchPlay").addEventListener("click", () => { if (orch.playing) orchStop(); else orchStart(); });
  document.getElementById("orchTempo").addEventListener("input", (e) => {
    orch.bpm = +e.target.value; document.getElementById("orchBpm").textContent = orch.bpm; orchSave();
  });
  document.getElementById("orchClear").addEventListener("click", () => {
    orch.grid = Array.from({ length: ORCH_ROWS }, () => Array(ORCH_COLS).fill(null));
    orchSave(); orchPaintStage(); sfx.pop();
  });
}
