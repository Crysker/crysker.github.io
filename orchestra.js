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
    names: { blob: "Blobby", frog: "Froggo", bird: "Pip", ghost: "Boo", robot: "Bleep", octo: "Inky", mine: "My sound" },
    sounds: { blob: "kick", frog: "bass", bird: "chirp", ghost: "pad", robot: "tick", octo: "pluck", mine: "your own" },
    rows: "Rows", rowMore: "Add a row", rowLess: "Remove a row",
    pitch: "Pitch", kit: "Sound", kits: ["Classic", "8-bit", "Buzz", "Soft"], hint: "Tap a creature to select it: change its pitch or length, remove it, or drop another creature on it to layer sounds.", len: "Note length",
    pitchNote: "Pitch", lenNote: "Length", remove: "Remove", layer: "Add layer", selected: "Selected",
    found: "Discoveries", share: "Share my beat", download: "Download", rendering: "Rendering…",
    createOwn: "Create own sound", mkSound: "Sound", mkTitle: "Create your own sound", mkEdit: "Edit your sound", mkName: "Name", mkAvatar: "Avatar", mkUploadImg: "Upload image", mkStart: "Start", mkLen: "Length", mkMax: "max. {n} s", save: "Save", cancel: "Cancel", edit: "Edit", noSample: "Record or upload a sound first.", ownTag: "own sound", mkDefault: "My sound",
    modeFree: "Freestyle", modeLearn: "Learn", level: "Level {n} of 5", next: "Next level", restart: "Restart level", doneTitle: "You know every tool now", doneText: "Creatures, pitch, tempo, shaping notes, layers, kits, rows, sharing: all yours. Time for freestyle!", openFree: "Open freestyle",
    mineTitle: "Your own sound", rec: "Record", recStop: "Stop", upload: "Upload", test: "Test", del: "Remove", mineNone: "Record up to 2.5 seconds or upload a sound file. Sounds stay on your device, a shared link plays a plain blip instead.", mineHas: "Your sound is ready. Put My sound on the stage.", mineMic: "Could not use the microphone.", mineBad: "That file could not be read.", mineRec: "Recording …", copied: "Link copied", newFound: "Discovered: {n}!", creatures: "Creatures",
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
    names: { blob: "Blobby", frog: "Froggo", bird: "Pip", ghost: "Boo", robot: "Bleep", octo: "Inky", mine: "Mein Ton" },
    sounds: { blob: "Bassdrum", frog: "Bass", bird: "Zwitschern", ghost: "Klangteppich", robot: "Tick", octo: "Zupfen", mine: "dein Klang" },
    rows: "Reihen", rowMore: "Reihe hinzufügen", rowLess: "Reihe entfernen",
    pitch: "Tonhöhe", kit: "Klang", kits: ["Klassisch", "8-Bit", "Brummig", "Weich"], hint: "Höhere Reihen klingen höher. Tippe ein Wesen an, um es auszuwählen: Tonhöhe oder Länge ändern, entfernen, oder ein weiteres Wesen daraufziehen, um Klänge zu schichten.", len: "Tonlänge",
    pitchNote: "Tonhöhe", lenNote: "Länge", remove: "Entfernen", layer: "Schicht hinzufügen", selected: "Ausgewählt",
    found: "Entdeckungen", share: "Meinen Beat teilen", download: "Herunterladen", rendering: "Wird erstellt …",
    createOwn: "Eigenen Klang erstellen", mkSound: "Klang", mkTitle: "Erstelle deinen eigenen Klang", mkEdit: "Klang bearbeiten", mkName: "Name", mkAvatar: "Avatar", mkUploadImg: "Bild hochladen", mkStart: "Start", mkLen: "Länge", mkMax: "max. {n} s", save: "Speichern", cancel: "Abbrechen", edit: "Bearbeiten", noSample: "Nimm erst einen Klang auf oder lade einen hoch.", ownTag: "eigener Klang", mkDefault: "Mein Ton",
    modeFree: "Freestyle", modeLearn: "Lernen", level: "Stufe {n} von 5", next: "Nächste Stufe", restart: "Stufe neu starten", doneTitle: "Du kennst jetzt alle Werkzeuge", doneText: "Wesen, Tonhöhe, Tempo, Noten formen, Schichten, Klänge, Reihen, Teilen: alles deins. Zeit für Freestyle!", openFree: "Freestyle öffnen",
    mineTitle: "Dein eigener Klang", rec: "Aufnehmen", recStop: "Stopp", upload: "Hochladen", test: "Anhören", del: "Entfernen", mineNone: "Nimm bis zu 2,5 Sekunden auf oder lade eine Audiodatei hoch. Der Klang bleibt auf deinem Gerät, ein geteilter Link spielt stattdessen einen einfachen Ton.", mineHas: "Dein Klang ist bereit. Setz „Mein Ton“ auf die Bühne.", mineMic: "Das Mikrofon ließ sich nicht verwenden.", mineBad: "Diese Datei konnte nicht gelesen werden.", mineRec: "Aufnahme läuft …", copied: "Link kopiert", newFound: "Neu entdeckt: {n}!", creatures: "Wesen",
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
  { id: "octo", color: "#f472b6", body: `<circle cx="24" cy="21" r="14"/><path d="M12 30c-3 5-3 9-6 10M19 34c-1 4-1 6-3 8M29 34c1 4 1 6 3 8M36 30c3 5 3 9 6 10" stroke="#f472b6" stroke-width="4" stroke-linecap="round" fill="none"/>`, eyes: [[19, 21], [29, 21]] },
];
const ORCH_BY_ID = Object.fromEntries(ORCH_CREATURES.map((c) => [c.id, c]));
const ORCH_CUSTOM_IDS = ["mine", "mine2", "mine3"], ORCH_LIMIT = 2.5; // up to three own sounds, each at most 2.5 seconds
ORCH_CUSTOM_IDS.forEach((id) => { ORCH_BY_ID[id] = { id, custom: true, color: "#fb7185", name: "My sound", emoji: "🎧", img: null }; });
const orchCustomSVG = (c) => `<svg viewBox="0 0 48 48" width="100%" height="100%" focusable="false" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="${c.color}"/>${c.img ? `<image href="${c.img}" x="5" y="5" width="38" height="38"/>` : `<text x="24" y="33" text-anchor="middle" font-size="24">${c.emoji}</text>`}</svg>`;
const creatureSVG = (c) => c.custom ? orchCustomSVG(c) : `<svg viewBox="0 0 48 48" width="100%" height="100%" focusable="false" aria-hidden="true">
  <g fill="${c.color}">${c.body}</g>
  ${c.eyes.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#1b1a2a"/><circle cx="${x + .8}" cy="${y - .8}" r=".8" fill="#fff"/>`).join("")}
  ${c.id === "frog" || c.id === "blob" ? `<path d="M20 33q4 3 8 0" stroke="#1b1a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/>` : ""}</svg>`;

/* ---- sound: one small voice per creature, scheduled on the audio clock ---- */
let oCtxOverride = null; // while the beat is rendered to a file, the voices play into an offline context
function orchCtx() {
  if (oCtxOverride) return oCtxOverride;
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
  octo: (t, f) => oTone(f, t, 0.32, "triangle", 0.14, f * 0.99),
  mine: (t, f) => orchCustomVoice("mine", t, f), mine2: (t, f) => orchCustomVoice("mine2", t, f), mine3: (t, f) => orchCustomVoice("mine3", t, f)
};
/* ---- your own sounds: name them, give them an avatar, record or upload a sound and slide out the part you want (at most 2.5 seconds) ---- */
const ORCH_EMOJI = ["🎤", "🎸", "🥁", "🎹", "🎺", "🐶", "🐱", "🐮", "🦆", "🐸", "🚗", "🔔", "👏", "🤖", "👻", "🌟"];
let orchCustom = []; // { id, name, emoji, img, rate, pcm (Int16Array), buf (AudioBuffer) }
const orchIsCustom = (id) => orchCustom.some((c) => c.id === id);
const orchName = (id) => (ORCH_BY_ID[id] && ORCH_BY_ID[id].custom ? ORCH_BY_ID[id].name : (ot("names")[id] || id));
const orchTrayList = () => ORCH_CREATURES.concat(orchCustom.map((c) => ORCH_BY_ID[c.id]));
function orchCustomVoice(id, t, f) {
  const cu = orchCustom.find((x) => x.id === id), c = orchCtx();
  if (!cu || !cu.buf) { oTone(f, t, 0.16, "square", 0.05); return; } // a shared beat on a device without this sound: a plain blip
  const src = c.createBufferSource(), g = c.createGain(), rate = Math.max(0.25, Math.min(4, oMult)); // exactly as you made it, on every row; only the pitch controls change it
  src.buffer = cu.buf; src.playbackRate.value = rate; // played once, however long the note bar is
  const dur = Math.max(0.1, Math.min(6, cu.buf.duration / rate)), vol = 0.7;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.006); g.gain.setValueAtTime(vol, t + dur - 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(g).connect(c.destination); src.start(t); src.stop(t + dur + 0.02);
}
const orchB64 = (i16) => { let s = ""; const u = new Uint8Array(i16.buffer); for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); };
const orchFromB64 = (b64) => { const bin = atob(b64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return new Int16Array(u.buffer); };
function orchBufFrom(pcm, rate) {
  const buf = new AudioBuffer({ length: pcm.length, sampleRate: rate, numberOfChannels: 1 }), ch = buf.getChannelData(0);
  for (let i = 0; i < pcm.length; i++) ch[i] = pcm[i] / 32768;
  return buf;
}
function orchCustomApply(cu) { cu.buf = orchBufFrom(cu.pcm, cu.rate); Object.assign(ORCH_BY_ID[cu.id], { name: cu.name, emoji: cu.emoji, img: cu.img }); }
function orchCustomSave() {
  try { localStorage.setItem("orchCustom", JSON.stringify(orchCustom.map((c) => ({ id: c.id, name: c.name, emoji: c.emoji, img: c.img, rate: c.rate, data: orchB64(c.pcm) })))); } catch (e) {}
}
function orchCustomLoad() {
  orchCustom = [];
  try {
    let list = JSON.parse(localStorage.getItem("orchCustom") || "null");
    if (!list) { // the single "my sound" of the first version moves over
      const old = JSON.parse(localStorage.getItem("orchMine") || "null");
      list = old && old.data ? [{ id: "mine", name: ot("mkDefault"), emoji: "🎧", img: null, rate: old.rate, data: old.data }] : [];
    }
    list.forEach((s) => { if (ORCH_CUSTOM_IDS.includes(s.id) && s.data) { const cu = { id: s.id, name: s.name || "My sound", emoji: s.emoji || "🎧", img: s.img || null, rate: s.rate, pcm: orchFromB64(s.data) }; orchCustomApply(cu); orchCustom.push(cu); } });
  } catch (e) {}
}
function orchRemoveId(id) { // taking a sound away also takes its creatures off the stage
  orch.grid.forEach((row, r) => row.forEach((_, c) => { const notes = orchNotes(r, c); if (notes.some((n) => n.id === id)) orchSetNotes(r, c, notes.filter((n) => n.id !== id)); }));
}
/* raw audio to a small mono sample: at most 12 seconds, half the sample rate when it is high, normalised */
function orchPrep(dec) {
  const n = dec.numberOfChannels, len = Math.min(dec.length, Math.floor(dec.sampleRate * 12)), f = new Float32Array(len);
  for (let c = 0; c < n; c++) { const d = dec.getChannelData(c); for (let i = 0; i < len; i++) f[i] += d[i] / n; }
  let out = f, rate = dec.sampleRate;
  if (rate >= 32000) { out = new Float32Array(Math.floor(len / 2)); for (let i = 0; i < out.length; i++) out[i] = (f[2 * i] + f[2 * i + 1]) / 2; rate = Math.round(rate / 2); }
  let peak = 0; for (let i = 0; i < out.length; i++) peak = Math.max(peak, Math.abs(out[i]));
  if (peak < 0.003) return null;
  for (let i = 0; i < out.length; i++) out[i] /= peak;
  return { f32: out, rate };
}
function orchOpenMaker(editId) {
  const cu = editId ? orchCustom.find((x) => x.id === editId) : null;
  if (!cu && orchCustom.length >= ORCH_CUSTOM_IDS.length) return;
  const mk = { name: cu ? cu.name : "", emoji: cu ? cu.emoji : "🎤", img: cu ? cu.img : null, f32: cu ? Float32Array.from(cu.pcm, (v) => v / 32768) : null, rate: cu ? cu.rate : 0, start: 0, len: ORCH_LIMIT, rec: null, msg: "" };
  const dlg = document.createElement("dialog");
  dlg.className = "orch__dlg";
  dlg.innerHTML = `<h3>${esc(ot(cu ? "mkEdit" : "mkTitle"))}</h3>
    <label class="mk__field"><span>${esc(ot("mkName"))}</span><input id="mkName" maxlength="14" autocomplete="off" value="${esc(mk.name)}" placeholder="${esc(ot("mkDefault"))}"></label>
    <div class="mk__field"><span>${esc(ot("mkAvatar"))}</span>
      <div class="mk__avatar" id="mkAvatar">${ORCH_EMOJI.map((e) => `<button type="button" class="mk__emo" data-e="${e}" aria-label="${e}">${e}</button>`).join("")}
        <label class="orch__clear mk__upimg">${esc(ot("mkUploadImg"))}<input type="file" id="mkImg" accept="image/*" hidden></label></div>
      <span class="mk__prev" id="mkPrev" aria-hidden="true"></span></div>
    <div class="mk__field"><span>${esc(ot("mkSound"))}</span>
      <div class="mk__row"><button type="button" class="orch__clear" id="mkRec"></button>
        <label class="orch__clear"><span aria-hidden="true">⬆</span> ${esc(ot("upload"))}<input type="file" id="mkFile" accept="audio/*" hidden></label>
        <button type="button" class="orch__clear" id="mkTest"><span aria-hidden="true">▶</span> ${esc(ot("test"))}</button></div>
      <canvas id="mkWave" width="520" height="84" aria-hidden="true"></canvas>
      <label class="mk__slide"><span>${esc(ot("mkStart"))}</span><input type="range" id="mkStart" min="0" max="0" step="0.01" value="0"><output id="mkStartOut"></output></label>
      <label class="mk__slide"><span>${esc(ot("mkLen"))}</span><input type="range" id="mkLen" min="0.1" max="${ORCH_LIMIT}" step="0.05" value="${ORCH_LIMIT}"><output id="mkLenOut"></output></label>
      <small class="mk__max">${esc(ot("mkMax").replace("{n}", ORCH_LIMIT))}</small></div>
    <p class="orch__hint" id="mkMsg" role="status"></p>
    <div class="mk__btns"><button type="button" class="orch__go" id="mkSave">${esc(ot("save"))}</button><button type="button" class="orch__clear" id="mkCancel">${esc(ot("cancel"))}</button></div>`;
  document.body.appendChild(dlg);
  const $ = (id) => dlg.querySelector("#" + id), dur = () => (mk.f32 ? mk.f32.length / mk.rate : 0);
  const say = (m) => { mk.msg = m; $("mkMsg").textContent = m; };
  function draw() {
    const cv = $("mkWave"), g = cv.getContext("2d"), W = cv.width, H = cv.height;
    g.clearRect(0, 0, W, H);
    const ink = getComputedStyle(dlg).getPropertyValue("--ink-soft") || "#999", turq = getComputedStyle(dlg).getPropertyValue("--turq") || "#40e0d0";
    if (!mk.f32) return;
    const d = dur(), x0 = (mk.start / d) * W, x1 = ((mk.start + mk.len) / d) * W, step = mk.f32.length / W;
    g.fillStyle = "rgba(64,224,208,.16)"; g.fillRect(x0, 0, x1 - x0, H);
    for (let x = 0; x < W; x++) {
      let m = 0; for (let i = Math.floor(x * step); i < Math.floor((x + 1) * step) && i < mk.f32.length; i += Math.max(1, Math.floor(step / 8))) m = Math.max(m, Math.abs(mk.f32[i]));
      g.fillStyle = x >= x0 && x <= x1 ? turq.trim() || "#40e0d0" : ink.trim() || "#999";
      g.globalAlpha = x >= x0 && x <= x1 ? 1 : 0.45; g.fillRect(x, H / 2 - m * H * 0.45, 1, Math.max(1, m * H * 0.9));
    }
    g.globalAlpha = 1;
  }
  function sync() {
    const d = dur(), has = !!mk.f32, maxLen = Math.min(ORCH_LIMIT, d || ORCH_LIMIT);
    mk.len = Math.max(Math.min(0.1, maxLen), Math.min(mk.len, maxLen));
    mk.start = Math.max(0, Math.min(mk.start, Math.max(0, d - mk.len)));
    const sl = $("mkLen"), ss = $("mkStart");
    sl.max = maxLen; sl.value = mk.len; ss.max = Math.max(0, d - mk.len); ss.value = mk.start;
    sl.disabled = !has; ss.disabled = !has || d - mk.len < 0.01;
    $("mkLenOut").textContent = mk.len.toFixed(2) + " s"; $("mkStartOut").textContent = mk.start.toFixed(2) + " s";
    $("mkTest").disabled = !has; $("mkSave").disabled = !has;
    $("mkRec").innerHTML = mk.rec ? `<span aria-hidden="true">■</span> ${esc(ot("recStop"))}` : `<span aria-hidden="true">●</span> ${esc(ot("rec"))}`;
    $("mkRec").classList.toggle("is-rec", !!mk.rec);
    draw();
  }
  function preview() {
    const prev = $("mkPrev");
    prev.innerHTML = creatureSVG({ custom: true, color: "#fb7185", emoji: mk.emoji || "🎧", img: mk.img });
    dlg.querySelectorAll(".mk__emo").forEach((b) => b.classList.toggle("is-on", !mk.img && b.dataset.e === mk.emoji));
  }
  const windowPcm = () => {
    const a = Math.floor(mk.start * mk.rate), b = Math.min(mk.f32.length, Math.floor((mk.start + mk.len) * mk.rate)), w = mk.f32.subarray(a, b), out = new Int16Array(w.length);
    let peak = 0; for (let i = 0; i < w.length; i++) peak = Math.max(peak, Math.abs(w[i]));
    for (let i = 0; i < w.length; i++) out[i] = Math.round(Math.max(-1, Math.min(1, (w[i] / (peak || 1)) * 0.9)) * 32767);
    return out;
  };
  async function load(ab) {
    try {
      const prep = orchPrep(await orchCtx().decodeAudioData(ab));
      if (!prep) { say(ot("mineBad")); return; }
      mk.f32 = prep.f32; mk.rate = prep.rate; mk.start = 0; mk.len = ORCH_LIMIT; say(""); sync();
    } catch (e) { say(ot("mineBad")); }
  }
  async function record() {
    if (mk.rec) { mk.rec.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }), rec = new MediaRecorder(stream), chunks = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = async () => { stream.getTracks().forEach((tr) => tr.stop()); clearTimeout(mk.recT); mk.rec = null; say(""); sync(); await load(await new Blob(chunks).arrayBuffer()); };
      rec.start(); mk.rec = rec; say(ot("mineRec")); sync();
      mk.recT = setTimeout(() => { if (mk.rec) mk.rec.stop(); }, 8000);
    } catch (e) { mk.rec = null; say(ot("mineMic")); sync(); }
  }
  dlg.querySelectorAll(".mk__emo").forEach((b) => b.addEventListener("click", () => { mk.emoji = b.dataset.e; mk.img = null; preview(); sfx.click(); }));
  $("mkImg").addEventListener("change", (e) => { // a round 96 px avatar cropped from the middle of the picture
    const f = e.target.files[0];
    if (!f) return;
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement("canvas"), s = Math.min(img.width, img.height); cv.width = cv.height = 96;
      const g = cv.getContext("2d"); g.beginPath(); g.arc(48, 48, 48, 0, Math.PI * 2); g.clip();
      g.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 96, 96);
      mk.img = cv.toDataURL("image/png"); URL.revokeObjectURL(img.src); preview();
    };
    img.onerror = () => say(ot("mineBad"));
    img.src = URL.createObjectURL(f);
  });
  $("mkFile").addEventListener("change", async (e) => { const f = e.target.files[0]; if (f) await load(await f.arrayBuffer()); });
  $("mkRec").addEventListener("click", record);
  $("mkTest").addEventListener("click", () => {
    if (!mk.f32) return;
    const pcm = windowPcm(), c = orchCtx(), src = c.createBufferSource(); src.buffer = orchBufFrom(pcm, mk.rate); src.connect(c.destination); src.start();
  });
  $("mkStart").addEventListener("input", (e) => { mk.start = +e.target.value; sync(); });
  $("mkLen").addEventListener("input", (e) => { mk.len = +e.target.value; sync(); });
  $("mkSave").addEventListener("click", () => {
    if (!mk.f32) { say(ot("noSample")); return; }
    const id = cu ? cu.id : ORCH_CUSTOM_IDS.find((x) => !orchIsCustom(x)), entry = { id, name: ($("mkName").value.trim() || ot("mkDefault")).slice(0, 14), emoji: mk.emoji || "🎧", img: mk.img, rate: mk.rate, pcm: windowPcm() };
    orchApplyCustom(entry); orchCustomSave(); orch.sel = id;
    dlg.close(); sfx.score(95); renderOrchestra();
  });
  $("mkCancel").addEventListener("click", () => dlg.close());
  dlg.addEventListener("close", () => { if (mk.rec) { mk.rec.onstop = null; mk.rec.stop(); } dlg.remove(); });
  preview(); sync(); dlg.showModal(); $("mkName").focus();
}
function orchApplyCustom(entry) {
  const i = orchCustom.findIndex((c) => c.id === entry.id);
  orchCustomApply(entry);
  if (i >= 0) orchCustom[i] = entry; else orchCustom.push(entry);
}
function orchPaintMine() { // under the tray: change or delete the own sound you have selected
  const box = document.getElementById("orchMine");
  if (!box) return;
  const cu = orchCustom.find((c) => c.id === orch.sel);
  if (!cu) { box.hidden = true; box.innerHTML = ""; return; }
  box.hidden = !orchFeat("mine");
  box.innerHTML = `<h3>${esc(cu.name)}</h3><div class="orch__mineRow"><button type="button" class="orch__clear" id="orchMineEdit"><span aria-hidden="true">✎</span> ${esc(ot("edit"))}</button>
    <button type="button" class="orch__clear" id="orchMineTest"><span aria-hidden="true">▶</span> ${esc(ot("test"))}</button>
    <button type="button" class="orch__clear" id="orchMineDel"><span aria-hidden="true">✕</span> ${esc(ot("del"))}</button></div>`;
  document.getElementById("orchMineEdit").addEventListener("click", () => orchOpenMaker(cu.id));
  document.getElementById("orchMineTest").addEventListener("click", () => orchHear({ id: cu.id, len: 1, pit: 0 }, 2));
  document.getElementById("orchMineDel").addEventListener("click", () => {
    orchRemoveId(cu.id); orchCustom = orchCustom.filter((c) => c.id !== cu.id); Object.assign(ORCH_BY_ID[cu.id], { name: "My sound", emoji: "🎧", img: null });
    orchCustomSave(); orch.sel = "blob"; orchSave(); renderOrchestra();
  });
}

/* ---- learn mode: five short levels, each with a little starting beat and three things to try ---- */
const orchN = (id, len = 1, pit = 0) => ({ id, len, pit });
let orchFlags = {}; // things done in this level that the grid alone can't show (pressed Play, moved a creature, ...)
const orchAnyPit = () => orch.pit.flat().some((v) => v !== 0) || orch.more.flat(2).some((n) => n.pit !== 0);
const ORCH_GROOVE = [[3, 0, [orchN("blob")]], [3, 4, [orchN("blob")]], [0, 2, [orchN("robot")]], [0, 6, [orchN("robot")]], [1, 1, [orchN("octo")]], [1, 5, [orchN("octo")]]];
const ORCH_LEARN = [
  { feats: [], start: [],
    title: { en: "Meet the creatures", de: "Lerne die Wesen kennen" },
    text: { en: "Every creature has its own sound. Press one in the tray to hear it, then tap squares on the stage to place it.", de: "Jedes Wesen hat seinen eigenen Klang. Drück eins im Tray, um es zu hören, und tippe dann auf Felder der Bühne, um es zu setzen." },
    tasks: [
      { text: { en: "Press a creature in the tray to hear it", de: "Drück ein Wesen im Tray, um es zu hören" }, ok: (f) => !!f.heard },
      { text: { en: "Place four creatures on the stage", de: "Setz vier Wesen auf die Bühne" }, ok: () => orchCount() >= orch.base.count + 4 },
      { text: { en: "Press Play (or Space) and listen", de: "Drück Abspielen (oder die Leertaste) und hör zu" }, ok: (f) => !!f.played }] },
  { feats: ["tempo"], start: [[3, 0, [orchN("blob")]], [3, 4, [orchN("blob")]]],
    title: { en: "Pitch and tempo", de: "Tonhöhe und Tempo" },
    text: { en: "Rows are pitch: the higher a creature stands, the higher its note. The tempo slider sets the speed.", de: "Die Reihen sind die Tonhöhe: Je höher ein Wesen steht, desto höher sein Ton. Der Tempo-Regler bestimmt die Geschwindigkeit." },
    tasks: [
      { text: { en: "Put Inky in the top row", de: "Setz Inky in die oberste Reihe" }, ok: () => orch.grid[0].includes("octo") },
      { text: { en: "Put Inky in the bottom row too", de: "Setz Inky auch in die unterste Reihe" }, ok: () => orch.grid[orch.grid.length - 1].includes("octo") },
      { text: { en: "Move the tempo slider", de: "Beweg den Tempo-Regler" }, ok: (f) => !!f.tempo }] },
  { feats: ["tempo", "panel"], start: ORCH_GROOVE,
    title: { en: "Shape a note", de: "Eine Note formen" },
    text: { en: "Tap a creature to select it. A panel opens under the stage: change its pitch with − and +, and pull its bar longer.", de: "Tippe ein Wesen an, um es auszuwählen. Unter der Bühne öffnet sich ein Panel: Ändere die Tonhöhe mit − und +, und zieh den Balken länger." },
    tasks: [
      { text: { en: "Tap a creature to select it", de: "Tippe ein Wesen an, um es auszuwählen" }, ok: (f) => !!f.selected },
      { text: { en: "Change a note's pitch with − or +", de: "Ändere die Tonhöhe einer Note mit − oder +" }, ok: () => orchAnyPit() },
      { text: { en: "Make a note longer: pull its bar", de: "Mach eine Note länger: zieh ihren Balken" }, ok: () => orch.len.flat().some((l) => l > 1) }] },
  { feats: ["tempo", "panel"], start: ORCH_GROOVE,
    title: { en: "Layers", de: "Schichten" },
    text: { en: "A square can hold several sounds. Drag one creature onto another to layer them, or drag it to a new square.", de: "Ein Feld kann mehrere Klänge halten. Zieh ein Wesen auf ein anderes, um sie zu schichten, oder zieh es auf ein neues Feld." },
    tasks: [
      { text: { en: "Layer two creatures on one square", de: "Schichte zwei Wesen auf einem Feld" }, ok: () => orch.more.flat().some((a) => a.length > 0) },
      { text: { en: "Drag a creature to another square", de: "Zieh ein Wesen auf ein anderes Feld" }, ok: (f) => !!f.moved },
      { text: { en: "Give a layer its own pitch", de: "Gib einer Schicht eine eigene Tonhöhe" }, ok: () => orch.more.flat(2).some((n) => n.pit !== 0) }] },
  { feats: ["tempo", "panel", "pitch", "kit", "rows", "share", "download", "found", "mine"], start: ORCH_GROOVE,
    title: { en: "Make it yours", de: "Mach es zu deinem" },
    text: { en: "The Sound button below cycles through the sound kits. Add a row for more notes, then share your beat or download it as MP3.", de: "Der Klang-Knopf unten schaltet durch die Klang-Kits. Füg eine Reihe für mehr Töne hinzu und teile dann dein Beat oder lade es als MP3 herunter." },
    tasks: [
      { text: { en: "Press the Sound button below to switch to another kit", de: "Drück unten auf den Klang-Knopf, um ein anderes Kit zu wählen" }, ok: (f) => !!f.kit },
      { text: { en: "Press + next to Rows to add a row", de: "Drück das + neben „Reihen“, um eine Reihe hinzuzufügen" }, ok: () => orch.grid.length > orch.base.rows },
      { text: { en: "Press Share or Download", de: "Drück „Teilen“ oder „Herunterladen“" }, ok: (f) => !!f.shared }] }
];
const orchFeat = (k) => orch.mode !== "learn" || orch.level >= ORCH_LEARN.length || ORCH_LEARN[orch.level].feats.includes(k);
function orchLearnStart() { // the level's own little beat, kept in memory only
  const L = ORCH_LEARN[Math.min(orch.level, ORCH_LEARN.length - 1)];
  orch.grid = Array.from({ length: ORCH_MIN_ROWS }, () => Array(ORCH_COLS).fill(null));
  orch.len = orchLenFor(orch.grid, null); orchSync(null);
  L.start.forEach(([r, c, notes]) => orchSetNotes(r, c, notes.map((n) => ({ ...n }))));
  orch.bpm = 100; orch.pitch = 0; orch.kit = 0; orch.sel = "blob"; orchFlags = {};
  orch.base = { count: orchCount(), rows: orch.grid.length };
}
function orchFlag(name) { orchFlags[name] = true; orchLearnPaint(); }
function orchLearnPaint() {
  const box = document.getElementById("orchLesson");
  if (!box) return;
  if (orch.mode !== "learn") { box.hidden = true; box.innerHTML = ""; return; }
  box.hidden = false;
  if (orch.level >= ORCH_LEARN.length) {
    box.innerHTML = `<h3>${esc(ot("doneTitle"))}</h3><p>${esc(ot("doneText"))}</p><div class="orch__lessonbtns"><button type="button" class="orch__go" id="orchOpenFree">${esc(ot("openFree"))}</button></div>`;
    document.getElementById("orchOpenFree").addEventListener("click", () => { sfx.click(); orchSetMode("free"); });
    return;
  }
  const L = ORCH_LEARN[orch.level], tasks = L.tasks.map((k) => ({ text: k.text[lang] || k.text.en, ok: !!k.ok(orchFlags) })), all = tasks.every((k) => k.ok);
  if (all && !orchFlags._cleared) { orchFlags._cleared = true; sfx.score(95); }
  box.innerHTML = `<div class="orch__dots" aria-hidden="true">${ORCH_LEARN.map((_, i) => `<i class="${i < orch.level ? "is-done" : i === orch.level ? "is-now" : ""}"></i>`).join("")}</div>
    <h3>${esc(ot("level").replace("{n}", orch.level + 1))} · ${esc(L.title[lang] || L.title.en)}</h3><p>${esc(L.text[lang] || L.text.en)}</p>
    <ul class="orch__tasks">${tasks.map((k) => `<li class="${k.ok ? "is-ok" : ""}"><span aria-hidden="true">${k.ok ? "✓" : "○"}</span>${esc(k.text)}</li>`).join("")}</ul>
    <div class="orch__lessonbtns"><button type="button" class="orch__go" id="orchNextLevel"${all ? "" : " disabled"}>${esc(ot("next"))}</button><button type="button" class="orch__clear" id="orchRestartLevel">${esc(ot("restart"))}</button></div>`;
  document.getElementById("orchNextLevel").addEventListener("click", () => {
    sfx.click(); orchStop(); orch.level++;
    try { localStorage.setItem("orchLearn", String(orch.level)); } catch (e) {}
    if (orch.level < ORCH_LEARN.length) orchLearnStart();
    renderOrchestra();
  });
  document.getElementById("orchRestartLevel").addEventListener("click", () => { sfx.click(); orchStop(); orchLearnStart(); renderOrchestra(); });
}
function orchSetMode(m) {
  if (m === orch.mode) return;
  orchStop(); orch.mode = m;
  try { localStorage.setItem("orchMode", m); } catch (e) {}
  if (m === "learn") { if (orch.level >= ORCH_LEARN.length) orch.level = 0; orchLearnStart(); } else { orch.grid = null; orchLoad(); } // after the last level, Learn starts over
  renderOrchestra();
}

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
  { id: "all", notes: [262, 330, 392, 523, 659, 784], find: (g) => new Set(g.flat().filter((id) => id && !ORCH_CUSTOM_IDS.includes(id))).size === 6 /* the six creatures, not your own sound */ ? orchFilled(g) : null },
  { id: "wall", notes: [262, 392, 523, 659, 784, 1047], find: (g) => g.flat().every(Boolean) ? orchFilled(g) : null }
];

/* ---- the stage and the clock ---- */
const orch = { mode: null, level: 0, base: null, inspOpen: true, grid: null, len: null, pit: null, more: null, cell: null, pitch: 0, kit: 0, bpm: 100, sel: "blob", playing: false, step: 0, next: 0, timer: null, placed: 0, found: [] };
function orchLoad() {
  orchCustomLoad();
  try { orch.found = JSON.parse(localStorage.getItem("orchFound") || "[]"); } catch (e) { orch.found = []; }
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("orchestra2") || "null"); } catch (e) {}
  if (saved && Array.isArray(saved.g) && saved.g.length >= ORCH_MIN_ROWS && saved.g.length <= ORCH_MAX_ROWS && saved.g.every((row) => Array.isArray(row) && row.length === ORCH_COLS)) { orch.grid = saved.g; orch.bpm = saved.bpm || 100; orch.pitch = Math.max(-12, Math.min(12, +saved.p || 0)); orch.kit = Math.max(0, Math.min(3, +saved.k || 0)); orch.len = orchLenFor(orch.grid, saved.l); orchSync(saved); return; }
  /* the starter beat: kick, bass, hats, a pad and a little pluck tune with a harmony on top (no secret combination is complete yet) */
  orch.grid = Array.from({ length: 6 }, () => Array(ORCH_COLS).fill(null));
  orch.len = orchLenFor(orch.grid, null);
  orchSync(null);
  const n = (id, len = 1, pit = 0) => ({ id, len, pit });
  [[5, 0, [n("blob"), n("frog", 2, -5)]], [5, 3, [n("blob")]], [5, 4, [n("blob")]], [5, 6, [n("blob")]],
    [4, 0, [n("frog", 2)]], [4, 3, [n("frog", 1, 3)]], [3, 6, [n("frog", 2, -2)]],
    [0, 1, [n("robot")]], [0, 3, [n("robot")]], [0, 5, [n("robot")]], [0, 6, [n("robot")]],
    [2, 0, [n("ghost", 4), n("ghost", 4, 7)]], [2, 5, [n("ghost", 3, -2)]],
    [1, 2, [n("octo")]], [2, 4, [n("octo", 1), n("octo", 1, 5)]], [1, 5, [n("octo", 2)]], [0, 7, [n("octo", 1, 2)]]]
    .forEach(([r, c, notes]) => orchSetNotes(r, c, notes));
  orch.cell = [5, 0]; // a layered square is open, so the note panel shows what layers are
  orch.bpm = 108; orch.pitch = 0; orch.kit = 0;
}
const orchSync = (saved) => { // per-note pitch (semitones) and extra layers on a square, kept next to the grid
  const ok = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
  orch.pit = orch.grid.map((row, r) => row.map((_, c) => { const v = saved && saved.pt && saved.pt[r] && saved.pt[r][c]; return ok(v, -12, 12) ? v : 0; }));
  orch.more = orch.grid.map((row, r) => row.map((_, c) => { const a = saved && saved.m && saved.m[r] && saved.m[r][c]; return Array.isArray(a) ? a.filter((n) => n && ORCH_BY_ID[n.id]).slice(0, 3).map((n) => ({ id: n.id, len: ok(n.len, 1, ORCH_COLS) ? n.len : 1, pit: ok(n.pit, -12, 12) ? n.pit : 0 })) : []; }));
  orch.cell = null;
};
const orchLenFor = (grid, saved) => grid.map((row, r) => row.map((_, c) => (saved && saved[r] && Number.isInteger(saved[r][c]) && saved[r][c] >= 1 && saved[r][c] <= ORCH_COLS) ? saved[r][c] : 1)); // note lengths (1, 2 or 4 beats) next to the grid
function orchSave() { if (orch.mode === "learn") return; /* lessons never touch your own beat */ try { localStorage.setItem("orchestra2", JSON.stringify({ g: orch.grid, l: orch.len, pt: orch.pit, m: orch.more, p: orch.pitch, k: orch.kit, bpm: orch.bpm })); } catch (e) {} }
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
  orch.playing = true; orch.step = 0; orch.next = c.currentTime + 0.06; orchFlag("played");
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
  orchFlag("heard");
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
    orch.cell = same ? null : [r, c]; if (!same) orchFlags.selected = true;
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
    if (theirs.length && mine.length + theirs.length <= 4) { // dropped onto someone: it joins them as a layer
      orchSetNotes(r2, c2, [...theirs, ...mine.map((n) => ({ ...n, len: Math.min(n.len, ORCH_COLS - c2) }))]); orchSetNotes(r, c, []);
    } else { orchSetNotes(r, c, theirs); orchSetNotes(r2, c2, mine); } // no room for layers: they swap places
    orch.cell = [r2, c2]; orchFlag("moved");
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
  const dancers = orchDancers();
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
    el.setAttribute("aria-label", `${ot("row")} ${r + 1}, ${ot("beat")} ${c + 1}: ${id ? orchName(id) + (orch.len[r][c] > 1 ? ", " + ot("len") + " " + orch.len[r][c] : "") : ot("empty")}`);
  });
  orchPaintFound();
  orchPaintInsp();
  if (orch.mode === "learn") orchLearnPaint();
}
/* the panel for the selected square: pitch and length of every note in it, remove, add a layer */
function orchPaintInsp() {
  const box = document.getElementById("orchInsp");
  if (!box) return;
  const notes = orch.cell && orchFeat("panel") ? orchNotes(orch.cell[0], orch.cell[1]) : [];
  if (!notes.length) { orch.cell = null; box.hidden = true; box.innerHTML = ""; return; }
  const [r, c] = orch.cell, sgn = (n) => (n > 0 ? "+" : "") + n;
  box.hidden = false;
  box.innerHTML = `<details class="orch__det"${orch.inspOpen ? " open" : ""}><summary><span>${esc(ot("selected"))}: ${esc(ORCH_NAMES[r])} · ${esc(ot("beat"))} ${c + 1}</span><span class="orch__sum">${notes.map((n) => `<i>${creatureSVG(ORCH_BY_ID[n.id])}</i>`).join("")}</span></summary>
    <ul class="orch__notes">${notes.map((n, i) => `<li>
      <span class="orch__mini">${creatureSVG(ORCH_BY_ID[n.id])}</span><b>${esc(orchName(n.id))}</b>
      <span class="orch__ctl"><span>${esc(ot("pitchNote"))}</span><button type="button" data-i="${i}" data-act="pit-" aria-label="${esc(ot("pitchNote"))} −">−</button><output>${sgn(n.pit)}</output><button type="button" data-i="${i}" data-act="pit+" aria-label="${esc(ot("pitchNote"))} +">+</button></span>
      <span class="orch__lane" role="group" aria-label="${esc(ot("lenNote"))}">${Array.from({ length: ORCH_COLS }, (_, k) => `<i class="${k === c ? "is-here" : ""}" style="grid-column:${k + 1};grid-row:1"></i>`).join("")}<span class="orch__nb" tabindex="0" data-i="${i}" role="slider" aria-valuemin="1" aria-valuemax="${ORCH_COLS - c}" aria-valuenow="${n.len}" aria-label="${esc(ot("lenNote"))}" style="grid-column:${c + 1} / span ${n.len};--tail:${ORCH_BY_ID[n.id].color}"><b>${n.len}</b><span class="orch__bh"></span></span></span>
      <button type="button" class="orch__x" data-i="${i}" data-act="del" aria-label="${esc(ot("remove"))}" title="${esc(ot("remove"))}">✕</button></li>`).join("")}</ul>
    <button type="button" class="orch__clear" id="orchAddLayer"${notes.length >= 4 ? " disabled" : ""}>＋ ${esc(ot("layer"))}: ${esc(orchName(orch.sel))}</button></details>`;
}
/* the lane of a note: pull the end of the bar to change its length, drag the bar to put it on another beat */
function orchLaneDown(e) {
  const bar = e.target.closest(".orch__nb");
  if (!bar || !orch.cell || (e.pointerType === "mouse" && e.button !== 0)) return;
  e.preventDefault();
  const [r, c] = orch.cell, i = +bar.dataset.i, n = orchNotes(r, c)[i];
  if (!n) return;
  const step = bar.parentElement.getBoundingClientRect().width / ORCH_COLS, x0 = e.clientX, resize = !!e.target.closest(".orch__bh");
  let len = n.len, nc = c;
  const move = (ev) => {
    const d = Math.round((ev.clientX - x0) / step);
    if (resize) { len = Math.max(1, Math.min(ORCH_COLS - c, n.len + d)); bar.style.gridColumn = `${c + 1} / span ${len}`; bar.firstChild.textContent = len; }
    else { nc = Math.max(0, Math.min(ORCH_COLS - n.len, c + d)); bar.style.gridColumn = `${nc + 1} / span ${n.len}`; }
  };
  const up = () => {
    removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
    if (resize && len !== n.len) { const notes = orchNotes(r, c); notes[i].len = len; orchSetNotes(r, c, notes); orchHear(notes[i], r); }
    else if (!resize && nc !== c) orchMoveNote(r, c, i, nc);
    orchSave(); orchPaintStage(); orchCheck();
  };
  addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
}
function orchMoveNote(r, c, i, nc) { // a note from this square goes to another beat of the same row (joining whoever is there)
  const from = orchNotes(r, c), to = orchNotes(r, nc);
  if (to.length >= 4) return;
  const [n] = from.splice(i, 1);
  n.len = Math.min(n.len, ORCH_COLS - nc);
  to.push(n);
  orchSetNotes(r, c, from); orchSetNotes(r, nc, to);
  orch.cell = [r, nc]; orchHear(n, r); orchFlag("moved");
}
function orchInspKey(e) { // keyboard: arrows on a bar change its length (Shift moves it)
  const bar = e.target.closest && e.target.closest(".orch__nb");
  if (!bar || !orch.cell || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
  e.preventDefault();
  const [r, c] = orch.cell, i = +bar.dataset.i, notes = orchNotes(r, c), n = notes[i], dir = e.key === "ArrowRight" ? 1 : -1;
  if (!n) return;
  if (e.shiftKey) { const nc = Math.max(0, Math.min(ORCH_COLS - n.len, c + dir)); if (nc !== c) orchMoveNote(r, c, i, nc); }
  else { n.len = Math.max(1, Math.min(ORCH_COLS - c, n.len + dir)); orchSetNotes(r, c, notes); orchHear(n, r); }
  orchSave(); orchPaintStage(); orchCheck();
  const next = document.querySelector(`.orch__nb[data-i="${i}"]`); if (next) next.focus();
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
  orchPaintMine();
  const add = document.getElementById("orchAddLayer"); // the layer button names the creature that is chosen now
  if (add) add.textContent = "＋ " + ot("layer") + ": " + orchName(orch.sel);
}

/* ---- sharing: the whole beat lives in the address (play.html#orchestra/<32 letters>.<tempo>) ---- */
const ORCH_IDS = ["blob", "frog", "bird", "ghost", "robot", "octo", "mine", "mine2", "mine3"], ORCH_CODE = "bfpgromnq";
const orchEncode = () => orch.grid.flat().map((id) => id ? ORCH_CODE[ORCH_IDS.indexOf(id)] : "-").join("");
const orchEncodeRest = () => "." + orch.bpm + "." + (orch.pitch + 12) + "." + orch.kit + "." + orch.len.flat().join("") // tempo, pitch (+12), kit, note lengths,
  + "." + orch.pit.flat().map((v) => String.fromCharCode(109 + v)).join("") // pitch of every note (m = 0),
  + "." + orch.more.map((row, r) => row.map((list, c) => list.map((n) => "" + r + c + ORCH_CODE[ORCH_IDS.indexOf(n.id)] + n.len + String.fromCharCode(109 + n.pit)).join("")).join("")).join(""); // and the layers
function orchApplyHash() {
  const m = location.hash.match(/^#orchestra\/([bfpgromnq-]{32,64})\.(\d{2,3})(?:\.(\d{1,2})\.([0-3])\.([1-8]{32,64})(?:\.([a-y]{32,64})\.((?:[0-7]{2}[bfpgromnq][1-8][a-y])*))?)?$/);
  if (!m || m[1].length % ORCH_COLS) return;
  const flat = [...m[1]].map((ch) => ch === "-" ? null : ORCH_IDS[ORCH_CODE.indexOf(ch)]);
  orch.grid = Array.from({ length: flat.length / ORCH_COLS }, (_, r) => flat.slice(r * ORCH_COLS, (r + 1) * ORCH_COLS));
  orch.bpm = Math.min(150, Math.max(60, +m[2]));
  orch.pitch = m[3] !== undefined ? Math.max(-12, Math.min(12, +m[3] - 12)) : 0; orch.kit = m[4] !== undefined ? +m[4] : 0;
  const lens = m[5] && m[5].length === m[1].length ? [...m[5]].map(Number) : null;
  orch.len = orch.grid.map((row, r) => row.map((_, c) => lens ? lens[r * ORCH_COLS + c] : 1));
  orchSync(null);
  if (m[6] && m[6].length === m[1].length) [...m[6]].forEach((ch, i) => { orch.pit[Math.floor(i / ORCH_COLS)][i % ORCH_COLS] = ch.charCodeAt(0) - 109; });
  for (const l of (m[7] || "").match(/[0-7]{2}[bfpgromnq][1-8][a-y]/g) || []) {
    const r = +l[0], c = +l[1];
    if (orch.grid[r] && orch.grid[r][c] && orch.more[r][c].length < 3) orch.more[r][c].push({ id: ORCH_IDS[ORCH_CODE.indexOf(l[2])], len: +l[3], pit: l.charCodeAt(4) - 109 });
  }
  orchSave();
  history.replaceState(null, "", location.pathname + location.search + "#orchestra"); // the shared beat is now yours to change
}
/* ---- download: the loop is played into an offline audio context (twice, plus a tail) and saved as MP3, or WAV if the encoder can't be loaded ---- */
const ORCH_RATE = 44100;
async function orchRender() {
  const stepDur = 60 / orch.bpm / 2, loops = 2, tail = 2.2, secs = loops * ORCH_COLS * stepDur + tail;
  const off = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, Math.ceil(secs * ORCH_RATE), ORCH_RATE);
  const saveBuf = oNoiseBuf; oNoiseBuf = null; oCtxOverride = off;
  try {
    for (let l = 0; l < loops; l++) for (let s = 0; s < ORCH_COLS; s++) {
      const when = (l * ORCH_COLS + s) * stepDur + 0.05;
      for (let r = 0; r < orch.grid.length; r++) orchNotes(r, s).forEach((n) => orchVoice(n.id, when, ORCH_NOTES[r], n.len, n.pit));
    }
    return await off.startRendering();
  } finally { oCtxOverride = null; oNoiseBuf = saveBuf; }
}
function orchToInt16(buf) {
  const f = buf.getChannelData(0), out = new Int16Array(f.length);
  let peak = 0; for (let i = 0; i < f.length; i++) peak = Math.max(peak, Math.abs(f[i]));
  const gain = peak > 0.95 ? 0.95 / peak : 1; // never clip
  for (let i = 0; i < f.length; i++) out[i] = Math.max(-32768, Math.min(32767, Math.round(f[i] * gain * 32767)));
  return out;
}
function orchWav(pcm) {
  const v = new DataView(new ArrayBuffer(44 + pcm.length * 2)), w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, "RIFF"); v.setUint32(4, 36 + pcm.length * 2, true); w(8, "WAVEfmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, ORCH_RATE, true); v.setUint32(28, ORCH_RATE * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, "data"); v.setUint32(40, pcm.length * 2, true);
  pcm.forEach((s, i) => v.setInt16(44 + i * 2, s, true));
  return new Blob([v], { type: "audio/wav" });
}
function orchLoadLame() { // the MP3 encoder is only fetched when someone presses Download
  if (window.lamejs) return Promise.resolve();
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js"; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}
async function orchDownload(btn) {
  const label = btn.innerHTML;
  btn.disabled = true; btn.textContent = ot("rendering");
  try {
    const pcm = orchToInt16(await orchRender());
    let blob, ext = "mp3";
    try {
      await orchLoadLame();
      const enc = new lamejs.Mp3Encoder(1, ORCH_RATE, 128), parts = [];
      for (let i = 0; i < pcm.length; i += 1152) { const b = enc.encodeBuffer(pcm.subarray(i, i + 1152)); if (b.length) parts.push(b); }
      const end = enc.flush(); if (end.length) parts.push(end);
      blob = new Blob(parts, { type: "audio/mpeg" });
    } catch (e) { blob = orchWav(pcm); ext = "wav"; }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "tiny-orchestra." + ext;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    sfx.pop();
  } finally { btn.disabled = false; btn.innerHTML = label; }
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
  if (orch.mode === null) { // the first time on this page: where did you leave off?
    let m = "free", lv = 0;
    try { m = localStorage.getItem("orchMode") === "learn" ? "learn" : "free"; lv = Math.max(0, Math.min(ORCH_LEARN.length, +localStorage.getItem("orchLearn") || 0)); } catch (e) {}
    orch.mode = m; orch.level = lv;
    if (m === "learn") orchLearnStart();
  }
  if (/^#orchestra\/[bfpgromnq-]/.test(location.hash) && orch.mode === "learn") { orch.mode = "free"; orch.grid = null; orchLoad(); } // a shared beat opens in freestyle
  orchApplyHash();
  const sounds = ot("sounds");
  playBody.innerHTML = `
    <div class="orch">
      <div class="orch__stagewrap">
        <div class="orch__modes" role="group"><button type="button" data-mode="free" aria-pressed="${orch.mode !== "learn"}">${esc(ot("modeFree"))}</button><button type="button" data-mode="learn" aria-pressed="${orch.mode === "learn"}">${esc(ot("modeLearn"))}</button></div>
        <section class="orch__lesson" id="orchLesson" hidden aria-live="polite"></section>
        <div class="orch__stage" role="group" aria-label="${esc(ot("stage"))}">
          ${Array.from({ length: orch.grid.length }, (_, r) => Array.from({ length: ORCH_COLS }, (_, c) =>
            `<button type="button" class="orch__cell${c % 4 === 0 ? " is-beat" : ""}" data-r="${r}" data-c="${c}"${c === 0 ? ` data-note="${ORCH_NAMES[r]}"` : ""}></button>`).join("")).join("")}
        </div>
        <p class="orch__banner" id="orchBanner" role="status" aria-live="polite"></p>
        <section class="orch__foundbox orch__insp" id="orchInsp" hidden></section>
      </div>
      <div class="orch__side">
        <div class="orch__tray" role="group" aria-label="${esc(ot("creatures"))}">
          ${orchTrayList().map((c) => `<button type="button" class="orch__pick" data-id="${c.id}" aria-pressed="false">
            <span class="orch__face">${creatureSVG(c)}</span>
            <span class="orch__name">${esc(orchName(c.id))}</span><small>${esc(c.custom ? ot("ownTag") : sounds[c.id])}</small></button>`).join("")}
          ${orchCustom.length < ORCH_CUSTOM_IDS.length ? `<button type="button" class="orch__make" id="orchMake" data-feat="mine"><span aria-hidden="true">＋</span> ${esc(ot("createOwn"))}</button>` : ""}
        </div>
        <p class="orch__hint">${esc(ot("hint"))}</p>
        <section class="orch__foundbox orch__mine" id="orchMine" data-feat="mine"></section>
        <section class="orch__foundbox" aria-labelledby="orchFoundTitle" data-feat="found">
          <h3 id="orchFoundTitle">${esc(ot("found"))} <span id="orchFoundCount"></span></h3>
          <ul class="orch__found" id="orchFound"></ul>
        </section>
      </div>
      <div class="orch__bar">
        <button type="button" class="orch__go" id="orchPlay" aria-pressed="false"></button>
        <label class="orch__tempo" data-feat="tempo"><span>${esc(ot("tempo"))}</span>
          <input type="range" id="orchTempo" min="60" max="150" step="5" value="${orch.bpm}"><output id="orchBpm">${orch.bpm}</output></label>
        <label class="orch__tempo orch__pitch" data-feat="pitch"><span>${esc(ot("pitch"))}</span>
          <input type="range" id="orchPitch" min="-12" max="12" step="1" value="${orch.pitch}"><output id="orchPitchOut">${orch.pitch > 0 ? "+" : ""}${orch.pitch}</output></label>
        <button type="button" class="orch__clear" id="orchKit" data-feat="kit">${esc(ot("kit"))}: ${esc(ot("kits")[orch.kit])}</button>
        <span class="orch__rows" role="group" data-feat="rows" aria-label="${esc(ot("rows"))}"><button type="button" class="orch__rowbtn" id="orchRowLess" aria-label="${esc(ot("rowLess"))}"></button><span>${esc(ot("rows"))}</span><button type="button" class="orch__rowbtn" id="orchRowMore" aria-label="${esc(ot("rowMore"))}"></button></span>
        <button type="button" class="orch__clear" id="orchDownload" data-feat="download"><span aria-hidden="true">⬇</span> ${esc(ot("download"))}</button>
        <button type="button" class="orch__clear" id="orchShare" data-feat="share"><span aria-hidden="true">↗</span> ${esc(ot("share"))}</button>
        <button type="button" class="orch__clear" id="orchClear"><span aria-hidden="true">✕</span> ${esc(ot("clear"))}</button>
      </div>
    </div>`;
  playBody.querySelectorAll("[data-feat]").forEach((el) => { el.hidden = !orchFeat(el.dataset.feat); });
  playBody.querySelectorAll(".orch__modes button").forEach((b) => b.addEventListener("click", () => { sfx.click(); orchSetMode(b.dataset.mode); }));
  const make = document.getElementById("orchMake");
  if (make) make.addEventListener("click", () => { sfx.click(); orchOpenMaker(null); });
  orchPaintStage(); orchPaintTray(); orchSyncButtons(); orchPaintMine(); orchLearnPaint();

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
    orch.bpm = +e.target.value; document.getElementById("orchBpm").textContent = orch.bpm; orchSave(); orchFlag("tempo");
  });
  document.getElementById("orchPitch").addEventListener("input", (e) => {
    orch.pitch = +e.target.value; document.getElementById("orchPitchOut").textContent = (orch.pitch > 0 ? "+" : "") + orch.pitch; orchSave();
    if (!playMuted && !orch.playing) orchVoice(orch.sel, orchCtx().currentTime + 0.01, ORCH_NOTES[1]);
  });
  document.getElementById("orchKit").addEventListener("click", (e) => {
    orch.kit = (orch.kit + 1) % ot("kits").length; orchSave(); orchFlag("kit");
    e.currentTarget.textContent = ot("kit") + ": " + ot("kits")[orch.kit];
    if (!playMuted) orchVoice(orch.sel, orchCtx().currentTime + 0.01, ORCH_NOTES[1]);
  });
  document.getElementById("orchInsp").addEventListener("click", orchInspClick);
  document.getElementById("orchInsp").addEventListener("pointerdown", orchLaneDown);
  document.getElementById("orchInsp").addEventListener("keydown", orchInspKey);
  document.getElementById("orchInsp").addEventListener("toggle", (e) => { if (e.target.matches("details")) orch.inspOpen = e.target.open; }, true); // folded up it stays out of the way
  document.getElementById("orchDownload").addEventListener("click", (e) => { orchFlag("shared"); orchDownload(e.currentTarget); });
  document.getElementById("orchShare").addEventListener("click", (e) => { orchFlag("shared"); orchShare(e.currentTarget); });
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
