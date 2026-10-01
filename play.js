/* ============ Playground ============
   A small window with tiny games. First game: "Guess the Average" (questions in guess-data.js).
   Runs on play.html. Uses helpers from play-shell.js: lang, esc, unlock. */

const PLAY_T = {
  en: {
    home: "Home", nav: "Playground", title: "Playground", back: "Back", close: "Close", soundOn: "Turn sound on", soundOff: "Turn sound off",
    intro: "Tiny games, made for fun. More are on the way.",
    g1: ["Guess the Average", "How much beer does an Austrian drink? How many cups of tea a Turk? Guess the number, the closer the more points."],
    best: "Best: {n}", verified: "Verified", robot: "I'm not a robot", play: "Play", soon: "Soon", g2: "Tiny Orchestra", g3: "Tower of Babel",
    more: "Fun fact & source", answers: "Show my answers", q: "Question {i} of {n}", lock: "Lock in", next: "Next", finish: "See result",
    diff: { easy: "Easy", medium: "Medium", hard: "Hard" },
    you: "You", real: "Real", points: "+{n} / 100", off: "{p} off", exact: "Spot on!",
    src: "Source", yourGuess: "Your guess", total: "Total", outOf: "of {n}",
    share: "Copy result", copied: "Copied!", again: "Play again", menu: "All games",
    placeholder: "Type a number",
    ranks: ["Statistics Wizard", "Sharp Guesser", "Decent Vibes", "Mostly Vibes", "Confidently Wrong"],
    ask: "Your guess (use the slider or type it)"
  },
  de: {
    home: "Start", nav: "Spielwiese", title: "Spielwiese", back: "Zurück", close: "Schließen", soundOn: "Ton einschalten", soundOff: "Ton ausschalten",
    intro: "Kleine Spiele, nur zum Spaß. Mehr folgt.",
    g1: ["Schätz den Durchschnitt", "Wie viel Bier trinkt ein Österreicher? Wie viele Tassen Tee ein Türke? Schätze die Zahl, je näher, desto mehr Punkte."],
    best: "Bestwert: {n}", verified: "Verifiziert", robot: "Ich bin kein Roboter", play: "Spielen", soon: "Bald", g2: "Mini-Orchester", g3: "Turmbau zu Babel",
    more: "Fun Fact & Quelle", answers: "Meine Antworten zeigen", q: "Frage {i} von {n}", lock: "Bestätigen", next: "Weiter", finish: "Ergebnis ansehen",
    diff: { easy: "Leicht", medium: "Mittel", hard: "Schwer" },
    you: "Du", real: "Echt", points: "+{n} / 100", off: "{p} daneben", exact: "Volltreffer!",
    src: "Quelle", yourGuess: "Dein Tipp", total: "Gesamt", outOf: "von {n}",
    share: "Ergebnis kopieren", copied: "Kopiert!", again: "Nochmal spielen", menu: "Alle Spiele",
    placeholder: "Zahl eingeben",
    ranks: ["Statistik-Zauberer", "Scharfer Schätzer", "Ganz gutes Bauchgefühl", "Hauptsächlich Bauchgefühl", "Selbstbewusst daneben"],
    ask: "Dein Tipp (Regler oder Zahl eingeben)"
  }
};
const pt = (k) => (PLAY_T[lang] || PLAY_T.en)[k];
const PLAY_ROUNDS = { easy: 3, medium: 4, hard: 3 };
const PLAY_EMOJI = (s) => s >= 90 ? "🟩" : s >= 65 ? "🟨" : s >= 35 ? "🟧" : "🟥";


/* ---- Sound effects: tiny synthesized sounds (Web Audio), no files. Mute button in the Play bar. ---- */
let playMuted = false;
try { playMuted = localStorage.getItem("playMuted") === "1"; } catch (e) {}
let audioCtx = null;
function tone(freq, start, dur, type = "sine", vol = 0.12, slideTo = null) {
  if (playMuted) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t0 = audioCtx.currentTime + start, osc = audioCtx.createOscillator(), g = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(audioCtx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  } catch (e) {}
}
let lastTick = 0;
const sfx = {
  tick(frac) { const now = performance.now(); if (now - lastTick < 55) return; lastTick = now; tone(320 + frac * 520, 0, 0.05, "triangle", 0.035); },
  click() { tone(520, 0, 0.06, "triangle", 0.06); },
  lock() { tone(190, 0, 0.14, "sine", 0.16, 80); },
  score(s) {
    if (s >= 90) [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.07, 0.22, "triangle", 0.1));
    else if (s >= 65) [523, 659].forEach((f, i) => tone(f, i * 0.09, 0.2, "triangle", 0.1));
    else if (s >= 35) tone(440, 0, 0.22, "triangle", 0.09);
    else [330, 262].forEach((f, i) => tone(f, i * 0.14, 0.3, "sawtooth", 0.05));
  },
  end(ratio) {
    if (ratio >= 0.5) [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.09, 0.3, "triangle", 0.1));
    else [392, 349, 294, 233].forEach((f, i) => tone(f, i * 0.16, 0.4, "sawtooth", 0.05));
  },
  pop() { tone(700, 0, 0.08, "sine", 0.09, 1100); },
  count(frac) { tone(380 + frac * 760, 0, 0.045, "square", 0.03); }
};

const playBody = document.getElementById("playBody");
const playBack = document.getElementById("playBack");
let play = { screen: "menu", qs: [], i: 0, results: [], guess: null };

const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmtNum = (v, dec = 0) => {
  const d = v >= 1000 ? 0 : v >= 100 ? Math.min(dec, 1) : Math.max(dec, v < 10 ? 1 : 0);
  return v.toLocaleString(lang === "de" ? "de-AT" : "en-GB", { maximumFractionDigits: d, minimumFractionDigits: 0 });
};
/* "9.618" could mean 9.618 or 9,618: pick the reading that fits the question's range (decimal wins if both fit) */
const parseNum = (s, q) => {
  s = String(s).trim().replace(/\s/g, "");
  let v;
  if (/^\d{1,3}[.,]\d{3}$/.test(s)) {
    const dec = parseFloat(s.replace(",", ".")), thou = parseFloat(s.replace(/[.,]/, ""));
    const fits = (x) => !q || (x >= q.min && x <= q.max);
    v = fits(dec) || !fits(thou) ? dec : thou;
  } else if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) v = parseFloat(s.replace(/\./g, "").replace(",", "."));   // 1.234,5
  else if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) v = parseFloat(s.replace(/,/g, ""));                        // 1,234.5
  else v = parseFloat(s.replace(",", "."));
  return isFinite(v) && v > 0 ? v : null;
};
const bestScore = () => { try { return +localStorage.getItem("guessBest2") || 0; } catch (e) { return 0; } };
/* 0 to 100 points per question, measured on the same log scale as the slider: within 5% is a full 100, then it falls
   evenly with "how many times off" (too high or too low counts the same), down to 0 at 4x off or more. */
const scoreFor = (guess, real) => {
  if (Math.abs(guess / real - 1) <= 0.05) return 100;
  const d0 = Math.log(1.05);
  return Math.round(100 * Math.max(0, 1 - (Math.abs(Math.log(guess / real)) - d0) / (Math.log(4) - d0)));
};

/* The slider range is shifted at random for every question, so the real value can land anywhere between
   about 12% and 88% of the track: guessing "somewhere in the middle" doesn't work. Range ends are rounded to 1, 2, 5. */
const niceDown = (v) => { const e = Math.pow(10, Math.floor(Math.log10(v))), m = v / e; return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * e; };
const niceUp = (v) => { const e = Math.pow(10, Math.floor(Math.log10(v))), m = v / e; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * e; };
function withRandomRange(q) {
  const width = Math.log(q.max / q.min), p = 0.12 + Math.random() * 0.76; // where the real value sits on the track
  let min = niceDown(q.value * Math.exp(-p * width)), max = niceUp(q.value * Math.exp((1 - p) * width));
  if (q.cap) max = Math.min(max, q.cap); // percentages can't go past 100
  return { ...q, min, max };
}

function pickQuestions() {
  const out = [];
  for (const d of ["easy", "medium", "hard"]) {
    out.push(...shuffle(GUESS_Q.filter((q) => q.diff === d)).slice(0, PLAY_ROUNDS[d]));
  }
  return out.map(withRandomRange); // easy first, hard last
}

function startGame() {
  play = { screen: "q", qs: pickQuestions(), i: 0, results: [], guess: null, revealed: false };
  renderPlay();
}

function renderPlay() {
  document.getElementById("playTitle").textContent = pt("title");
  playBack.setAttribute("aria-label", pt("back"));
  const snd = document.getElementById("playSound");
  snd.textContent = playMuted ? "🔇" : "🔊";
  snd.setAttribute("aria-label", playMuted ? pt("soundOn") : pt("soundOff"));
  snd.setAttribute("aria-pressed", String(!playMuted));
  playBack.hidden = play.screen === "menu";
  // breadcrumbs: Home > Play (> the game you are in)
  document.getElementById("playCrumbs").innerHTML = "<ol>" +
    `<li><a href="index.html">${esc(pt("home"))}</a></li>` +
    (play.screen === "menu" ? `<li aria-current="page">${esc(pt("title"))}</li>`
      : `<li><a href="#" data-menu>${esc(pt("title"))}</a></li><li aria-current="page">${esc(play.screen === "orch" ? pt("g2") : play.screen === "tower" ? pt("g3") : pt("g1")[0])}</li>`) + "</ol>";
  document.querySelector(".play-card").classList.toggle("is-menu", play.screen === "menu");
  document.querySelector(".play-card").classList.toggle("is-wide", play.screen === "orch" || play.screen === "tower"); // the orchestra and the tower use the whole page
  document.querySelector(".play-card").classList.toggle("is-plain", play.screen === "q" || play.screen === "end"); // the guessing game: one calm column, no card
  if (play.screen === "orch") document.getElementById("playTitle").textContent = pt("g2");
  else if (play.screen === "tower") document.getElementById("playTitle").textContent = pt("g3");
  else if (play.screen === "q" || play.screen === "end") document.getElementById("playTitle").textContent = pt("g1")[0];
  if (play.screen !== "orch") orchStop();
  if (play.screen !== "tower") twStop();
  if (play.screen === "menu") renderMenu();
  else if (play.screen === "orch") renderOrchestra();
  else if (play.screen === "tower") renderTower();
  else if (play.screen === "q") renderQuestion();
  else renderEnd();
}

/* Menu: a neal.fun-style grid, one picture tile per game with just its title; the tile is the button. */
const TILE_ART = {
  guess: `<svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
    <text x="40" y="36" text-anchor="middle" class="pgame__q">?</text>
    <line x1="14" y1="56" x2="66" y2="56" class="pgame__rail"/>
    <line x1="14" y1="56" x2="32" y2="56" class="pgame__fill"/>
    <line x1="32" y1="56" x2="52" y2="56" class="pgame__gap"/>
    <circle cx="52" cy="56" r="7" class="pgame__real"/>
    <circle cx="32" cy="56" r="7" class="pgame__you"/></svg>`,
  captcha: `<svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
    <circle cx="22" cy="26" r="11" class="tile__sph"/>
    <rect x="44" y="15" width="22" height="22" rx="5" class="tile__cube" transform="rotate(16 55 26)"/>
    <circle cx="25" cy="58" r="9" class="tile__ring"/>
    <polygon points="44,68 53,50 62,68" class="tile__tri"/>
    <rect x="62" y="48" width="14" height="22" rx="7" class="tile__pill" transform="rotate(-20 69 59)"/></svg>`,
  orchestra: `<svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
    <rect x="16" y="38" width="9" height="26" rx="4.5" class="tile__bar tile__bar--a"/>
    <rect x="29" y="22" width="9" height="42" rx="4.5" class="tile__bar tile__bar--b"/>
    <rect x="42" y="30" width="9" height="34" rx="4.5" class="tile__bar tile__bar--c"/>
    <rect x="55" y="16" width="9" height="48" rx="4.5" class="tile__bar tile__bar--d"/></svg>`,
  tower: `<svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
    <rect x="22" y="54" width="36" height="12" rx="3" class="tile__blk tile__blk--a"/>
    <rect x="27" y="41" width="28" height="12" rx="3" class="tile__blk tile__blk--b" transform="rotate(-4 41 47)"/>
    <rect x="30" y="28" width="22" height="12" rx="3" class="tile__blk tile__blk--c" transform="rotate(5 41 34)"/>
    <rect x="34" y="16" width="14" height="11" rx="3" class="tile__blk tile__blk--d" transform="rotate(-8 41 21)"/></svg>`
};

function renderMenu() {
  const best = bestScore();
  playBody.innerHTML = `
    <p class="play__intro">${esc(pt("intro"))}</p>
    <div class="pgrid">
      <button type="button" class="ptile" id="pgameGuess">
        <span class="ptile__art" aria-hidden="true">${TILE_ART.guess}</span>
        <span class="ptile__title">${esc(pt("g1")[0])}</span>
        ${best ? `<small class="ptile__best">${esc(pt("best").replace("{n}", fmtNum(best)))}</small>` : ""}
      </button>
      <button type="button" class="ptile" id="pgameCaptcha">
        <span class="ptile__art" aria-hidden="true">${TILE_ART.captcha}</span>
        <span class="ptile__title">reSHAPTCHA</span>
        <small class="ptile__best">${esc(achieved.includes("human") ? "✓ " + pt("verified") : pt("robot"))}</small>
      </button>
      <button type="button" class="ptile" id="pgameOrch">
        <span class="ptile__art" aria-hidden="true">${TILE_ART.orchestra}</span>
        <span class="ptile__title">${esc(pt("g2"))}</span><small class="ptile__best">${esc(ot("toy"))}</small>
      </button>
      <button type="button" class="ptile" id="pgameTower">
        <span class="ptile__art" aria-hidden="true">${TILE_ART.tower}</span>
        <span class="ptile__title">${esc(pt("g3"))}</span><small class="ptile__best">${esc(twBestSaved() ? tt("best") + ": " + twBestSaved() + " m" : tt("toy"))}</small>
      </button>
    </div>`;
  document.getElementById("pgameGuess").addEventListener("click", () => openGame("#guess", () => { sfx.click(); startGame(); }));
  document.getElementById("pgameCaptcha").addEventListener("click", () => openGame("#reshaptcha", startCaptcha));
  document.getElementById("pgameTower").addEventListener("click", () => openGame("#tower", () => { sfx.click(); play = { screen: "tower" }; renderPlay(); }));
  document.getElementById("pgameOrch").addEventListener("click", () => openGame("#orchestra", () => { sfx.click(); play = { screen: "orch" }; renderPlay(); }));
}

/* One stable screen per question: locking in only fades things in (the real dot slides onto the same line,
   a score line appears, the fun fact waits behind a tap), so nothing jumps around. */
function renderQuestion() {
  const q = play.qs[play.i], n = play.qs.length;
  const toVal = (s) => q.min * Math.pow(q.max / q.min, s / 1000);
  const toFrac = (v) => Math.log(v / q.min) / Math.log(q.max / q.min);
  const start = play.guess ?? Math.sqrt(q.min * q.max);
  playBody.innerHTML = `
    <div class="pq__top"><span>${esc(pt("q").replace("{i}", play.i + 1).replace("{n}", n))}</span>
      <span class="pq__diff pq__diff--${q.diff}">${esc(pt("diff")[q.diff])}</span></div>
    <div class="pq__bar"><i style="width:${(play.i / n) * 100}%"></i></div>
    <h3 class="pq__q" id="pqQ">${esc(q.q[lang])}</h3>
    <div class="pq__value"><output id="pqOut" aria-live="polite"></output> <span>${esc(q.unit[lang])}</span></div>
    <div class="pq__track" id="pqTrack">
      <span class="pq__rail"><i></i></span>
      <span class="pq__span" id="pqSpan"></span>
      <span class="pq__real" id="pqReal"><em id="pqRealLbl"></em></span>
      <span class="pq__you" id="pqYou">${esc(pt("you"))}</span>
      <input class="pq__slider" id="pqSlider" type="range" min="0" max="1000" step="1" aria-labelledby="pqQ">
    </div>
    <div class="pq__scale"><span>${esc(fmtNum(q.min, q.dec))}</span><span>${esc(fmtNum(q.max, q.dec))}</span></div>
    <div class="pq__row" id="pqRow">
      <input class="pq__num" id="pqNum" type="text" inputmode="decimal" autocomplete="off" placeholder="${esc(pt("placeholder"))}" aria-label="${esc(pt("yourGuess"))}">
      <button type="button" class="btn btn--primary" id="pqLock">${esc(pt("lock"))}</button>
    </div>
    <details class="pq__more is-off" id="pqMore" inert>
      <summary>${esc(pt("more"))}</summary>
      <p class="pq__fact">${esc(q.fact[lang])}</p>
      <p class="pq__src">${esc(pt("src"))}: <a href="${q.src.url}" target="_blank" rel="noopener">${esc(q.src.name)}, ${q.src.year}</a></p>
    </details>`;
  const slider = document.getElementById("pqSlider"), out = document.getElementById("pqOut"), num = document.getElementById("pqNum");
  const setGuess = (v, fromText) => {
    play.guess = v;
    out.textContent = fmtNum(v, q.dec);
    const p = Math.max(0, Math.min(1, toFrac(v)));
    slider.value = String(p * 1000);
    document.getElementById("pqTrack").style.setProperty("--f", p);
    if (!fromText) num.value = "";
  };
  setGuess(start);
  if (play.revealed) { applyReveal(false); return; }
  slider.addEventListener("input", () => { setGuess(toVal(+slider.value)); sfx.tick(+slider.value / 1000); });
  num.addEventListener("input", () => { const v = parseNum(num.value, q); if (v) setGuess(v, true); });
  const lock = () => { const v = parseNum(num.value, q) || play.guess; if (!v) return; play.guess = v; lockIn(); };
  document.getElementById("pqLock").addEventListener("click", lock);
  num.addEventListener("keydown", (e) => { if (e.key === "Enter") lock(); });
  slider.addEventListener("keydown", (e) => { if (e.key === "Enter") lock(); });
}

function lockIn() {
  const q = play.qs[play.i];
  const score = scoreFor(play.guess, q.value);
  play.results.push({ q, guess: play.guess, score });
  if (Math.abs(play.guess / q.value - 1) <= 0.05) unlock("bullseye");
  play.revealed = true;
  sfx.lock();
  applyReveal(true);
}

function applyReveal(animate) {
  const r = play.results[play.results.length - 1], q = r.q, last = play.i === play.qs.length - 1;
  const frac = (v) => Math.max(0, Math.min(1, Math.log(v / q.min) / Math.log(q.max / q.min)));
  const a = frac(r.guess), b = frac(q.value);
  document.getElementById("pqSlider").disabled = true;
  document.getElementById("pqSpan").style.cssText = `--a:${Math.min(a, b)};--w:${Math.abs(a - b)}`;
  document.getElementById("pqReal").style.setProperty("--p", b);
  document.getElementById("pqYou").style.setProperty("--a2", a);
  const track = document.getElementById("pqTrack");
  if (animate) requestAnimationFrame(() => requestAnimationFrame(() => track.classList.add("is-revealed")));
  else track.classList.add("is-revealed");
  const pct = Math.round(Math.abs(r.guess / q.value - 1) * 100);
  const offText = r.score >= 100 ? pt("exact") : pt("off").replace("{p}", (r.guess > q.value ? "+" : "−") + pct + "%");
  // the real number hangs right under the orange dot; near the edges the label leans inward so it stays inside the window
  const lbl = document.getElementById("pqRealLbl");
  lbl.innerHTML = `${esc(pt("real"))}: <b>${esc(fmtNum(q.value, q.dec))} ${esc(q.unit[lang])}</b>`;
  lbl.style.translate = b < 0.2 ? "-14px 0" : b > 0.8 ? "calc(-100% + 14px) 0" : "-50% 0";
  const fmtPts = (n) => pt("points").replace("{n}", n);
  document.getElementById("pqRow").innerHTML = `
    <span class="pq__score" id="pqScore"><b>${esc(fmtPts(animate ? 0 : r.score))}</b><small>${esc(offText)}</small></span>
    <button type="button" class="btn btn--primary" id="pqNext">${esc(last ? pt("finish") : pt("next"))}</button>`;
  const more = document.getElementById("pqMore");
  more.classList.remove("is-off"); more.removeAttribute("inert");
  document.getElementById("pqNext").addEventListener("click", () => {
    sfx.click();
    if (last) { play.screen = "end"; finishGame(); } else { play.i++; play.guess = null; play.revealed = false; }
    renderPlay();
    if (last) { const tot = play.results.reduce((x, r) => x + r.score, 0); setTimeout(() => sfx.end(tot / (play.qs.length * 100)), 150); }
  });
  document.getElementById("pqNext").focus({ preventScroll: true });
  const box = document.getElementById("pqScore"), num = box.querySelector("b");
  if (!animate) { box.classList.add("is-done"); return; }
  countUp(r.score, (n) => { num.textContent = fmtPts(n); }, () => { box.classList.add("is-done"); sfx.score(r.score); });
}

/* points count up from 0 with a tick for every few points, then the tier sound */
function countUp(target, onStep, onDone) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || target === 0) { onStep(target); setTimeout(onDone, 350); return; }
  const dur = 450 + target * 9, delay = 550, t0 = performance.now() + delay;
  const stepSize = Math.max(1, Math.ceil(target / 14));
  let shown = 0;
  const frame = (now) => {
    if (now < t0) return requestAnimationFrame(frame);
    const k = Math.min(1, (now - t0) / dur), n = Math.round(target * (1 - Math.pow(1 - k, 2.2)));
    if (n !== shown) {
      if (Math.floor(n / stepSize) !== Math.floor(shown / stepSize) || n === target) sfx.count(n / 100);
      shown = n; onStep(n);
    }
    if (k < 1) requestAnimationFrame(frame); else { onStep(target); setTimeout(onDone, 120); }
  };
  requestAnimationFrame(frame);
}

function finishGame() {
  const total = play.results.reduce((s, r) => s + r.score, 0);
  if (total > bestScore()) { try { localStorage.setItem("guessBest2", String(total)); } catch (e) {} }
  unlock("guess");
  if (total / (play.qs.length * 1000) >= 0.85) unlock("wizard");
}

function renderEnd() {
  const n = play.qs.length, max = n * 100;
  const total = play.results.reduce((s, r) => s + r.score, 0), ratio = total / max;
  const rank = pt("ranks")[ratio >= 0.85 ? 0 : ratio >= 0.7 ? 1 : ratio >= 0.5 ? 2 : ratio >= 0.3 ? 3 : 4];
  const squares = play.results.map((r) => PLAY_EMOJI(r.score)).join("");
  playBody.innerHTML = `
    <div class="pe__head">
      <p class="pe__total" aria-label="${esc(pt("total"))}"><b>${esc(fmtNum(total))}</b><span>${esc(pt("outOf").replace("{n}", fmtNum(max)))}</span></p>
      <div class="pe__side"><h3 class="pe__rank">${esc(rank)}</h3><p class="pe__squares" aria-hidden="true">${squares}</p></div>
    </div>
    <div class="pe__actions">
      <button type="button" class="btn btn--primary" id="peShare">${esc(pt("share"))}</button>
      <button type="button" class="btn" id="peAgain">${esc(pt("again"))}</button>
      <button type="button" class="btn" id="peMenu">${esc(pt("menu"))}</button>
    </div>
    <details class="pe__details">
      <summary>${esc(pt("answers"))}</summary>
      <ol class="pe__list">${play.results.map((r) => `
        <li><span class="pe__dot">${PLAY_EMOJI(r.score)}</span>
          <span class="pe__what">${esc(r.q.q[lang])}<small>${esc(pt("yourGuess"))}: ${esc(fmtNum(r.guess, r.q.dec))} · ${esc(pt("real"))}: ${esc(fmtNum(r.q.value, r.q.dec))} ${esc(r.q.unit[lang])}</small></span>
          <b>${r.score}</b></li>`).join("")}</ol>
    </details>`;
  document.getElementById("peAgain").addEventListener("click", startGame);
  document.getElementById("peMenu").addEventListener("click", () => { sfx.click(); leaveGame(); });
  document.getElementById("peShare").addEventListener("click", async (e) => {
    const text = `${pt("g1")[0]} 🎯 ${fmtNum(total)}/${fmtNum(max)}\n${squares}\nhttps://crysker.github.io/`;
    try { await navigator.clipboard.writeText(text); } catch (err) {
      const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e2) {} ta.remove();
    }
    sfx.pop();
    e.target.textContent = pt("copied");
    setTimeout(() => { e.target.textContent = pt("share"); }, 1800);
  });
}

document.getElementById("playCrumbs").addEventListener("click", (e) => {
  if (!e.target.closest("a[data-menu]")) return;
  e.preventDefault();
  sfx.click();
  leaveGame();
});
playBack.addEventListener("click", () => { sfx.click(); leaveGame(); });
document.getElementById("playSound").addEventListener("click", () => {
  playMuted = !playMuted;
  try { localStorage.setItem("playMuted", playMuted ? "1" : "0"); } catch (e) {}
  renderPlay();
  sfx.click();
});
/* ============ Every game has its own address ============
   play.html#guess, #orchestra, #tower and #reshaptcha open a game directly (handy for sharing), and the browser's
   back button brings you back to the menu, like a real page. */
let routePushed = false;
function openGame(hash, begin) {
  if (location.hash !== hash) { history.pushState(null, "", hash); routePushed = true; }
  begin();
}
function leaveGame() {
  if (routePushed) { routePushed = false; history.back(); } // popstate shows the menu
  else { history.replaceState(null, "", location.pathname + location.search); showFromHash(); }
}
function showFromHash() {
  const h = location.hash, dlg = document.getElementById("game");
  if (h === "#reshaptcha") { if (!dlg.open) { play = { screen: "menu" }; renderPlay(); startCaptcha(); } return; }
  if (dlg.open) dlg.close();
  if (h.startsWith("#orchestra")) play = { screen: "orch" };
  else if (h === "#tower") play = { screen: "tower" };
  else if (h === "#guess") { if (play.screen !== "q" && play.screen !== "end") { startGame(); return; } }
  else play = { screen: "menu" };
  renderPlay();
}
addEventListener("popstate", showFromHash);
addEventListener("hashchange", showFromHash);
showFromHash();
