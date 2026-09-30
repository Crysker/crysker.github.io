/* ============ Play tab ============
   A small window with tiny games. First game: "Guess the Average" (questions in guess-data.js).
   Uses helpers from main.js: lang, esc, unlock, setMenu. */

const PLAY_T = {
  en: {
    nav: "Play", title: "Play", back: "Back", close: "Close", soundOn: "Turn sound on", soundOff: "Turn sound off",
    intro: "Tiny games, made for fun. More are on the way.",
    g1: ["Guess the Average", "How much beer does an Austrian drink? How many cups of tea a Turk? Guess the number, the closer the more points."],
    best: "Best: {n}", play: "Play",
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
    nav: "Spielen", title: "Spielen", back: "Zurück", close: "Schließen", soundOn: "Ton einschalten", soundOff: "Ton ausschalten",
    intro: "Kleine Spiele, nur zum Spaß. Mehr folgt.",
    g1: ["Schätz den Durchschnitt", "Wie viel Bier trinkt ein Österreicher? Wie viele Tassen Tee ein Türke? Schätze die Zahl, je näher, desto mehr Punkte."],
    best: "Bestwert: {n}", play: "Spielen",
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

const playDialog = document.getElementById("playDialog");
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
  if (!playDialog) return;
  document.getElementById("playTitle").textContent = pt("title");
  document.getElementById("playClose").setAttribute("aria-label", pt("close"));
  playBack.setAttribute("aria-label", pt("back"));
  const snd = document.getElementById("playSound");
  snd.textContent = playMuted ? "🔇" : "🔊";
  snd.setAttribute("aria-label", playMuted ? pt("soundOn") : pt("soundOff"));
  snd.setAttribute("aria-pressed", String(!playMuted));
  playBack.hidden = play.screen === "menu";
  document.querySelectorAll("[data-play-nav]").forEach((el) => { el.textContent = pt("nav"); });
  if (play.screen === "menu") renderMenu();
  else if (play.screen === "q") renderQuestion();
  else renderEnd();
}

function renderMenu() {
  const best = bestScore();
  playBody.innerHTML = `
    <p class="play__intro">${esc(pt("intro"))}</p>
    <div class="play__games">
      <div class="pgame" id="pgameGuess">
        <span class="pgame__icon" aria-hidden="true">🎯</span>
        <span class="pgame__text"><b>${esc(pt("g1")[0])}</b><span>${esc(pt("g1")[1])}</span>
          ${best ? `<small>${esc(pt("best").replace("{n}", fmtNum(best)))}</small>` : ""}</span>
        <button type="button" class="btn btn--primary pgame__btn">${esc(pt("play"))} →</button>
      </div>
    </div>`;
  document.getElementById("pgameGuess").addEventListener("click", () => { sfx.click(); startGame(); });
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
  document.getElementById("peMenu").addEventListener("click", () => { play.screen = "menu"; renderPlay(); });
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

function openPlay() {
  if (typeof setMenu === "function") setMenu(false);
  play = { screen: "menu", qs: [], i: 0, results: [], guess: null };
  renderPlay();
  if (!playDialog.open) playDialog.showModal();
}
playBack.addEventListener("click", () => { sfx.click(); play.screen = "menu"; renderPlay(); });
document.getElementById("playSound").addEventListener("click", () => {
  playMuted = !playMuted;
  try { localStorage.setItem("playMuted", playMuted ? "1" : "0"); } catch (e) {}
  renderPlay();
  sfx.click();
});
document.getElementById("playClose").addEventListener("click", () => playDialog.close());
playDialog.addEventListener("click", (e) => { if (e.target === playDialog) playDialog.close(); });
document.querySelectorAll("[data-play-open]").forEach((b) => b.addEventListener("click", openPlay));
renderPlay();
