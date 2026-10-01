/* ============ Rätselrunde / Puzzle Round ============
   Three short rounds that are the same for everyone on a given day (picked from words-data.js by the date):
   1. Five  – guess a five-letter word in six tries (Wordle style)
   2. Fours – sort 16 words into four groups, four mistakes allowed (Connections style)
   3. Know-how – three general-knowledge questions
   At the end you get a result you can copy and share. After the daily round you can play more random ones.
   Uses helpers from play.js / play-shell.js (esc, lang, unlock, sfx, play, playBody, renderPlay). */

const WD_T = {
  en: {
    intro: "Three short rounds, the same for everyone today.", names: ["Five", "Fours", "Know-how"],
    descs: ["Guess the five-letter word in six tries.", "Sort 16 words into four groups. Four mistakes are allowed.", "Three general-knowledge questions."],
    start: "Start", doneToday: "You have played today's round.", again: "Play another round", next: "Next", enter: "Enter", submit: "Submit", deselect: "Deselect", shuffle: "Shuffle",
    mistakes: "Mistakes left", oneAway: "One away!", notThis: "Not this time.", word: "The word was", solved: "Solved!", round: "Round {n} of 3", share: "Copy result", copied: "Copied!",
    daily: "Daily", random: "Random round", result: "Result", fact: "Did you know?", toy: "New every day", played: "Played today", tries: "{n}/6", title: "Puzzle Round", finish: "See result",
    pick: "Pick a letter", correct: "Correct!", wrong: "Not quite.", tooShort: "Not enough letters"
  },
  de: {
    intro: "Drei kurze Runden, heute für alle gleich.", names: ["Fünfer", "Vierer", "Wissen"],
    descs: ["Errate das Wort mit fünf Buchstaben in sechs Versuchen.", "Sortiere 16 Wörter in vier Gruppen. Vier Fehler sind erlaubt.", "Drei Fragen aus dem Allgemeinwissen."],
    start: "Starten", doneToday: "Du hast die heutige Runde gespielt.", again: "Noch eine Runde", next: "Weiter", enter: "Enter", submit: "Prüfen", deselect: "Abwählen", shuffle: "Mischen",
    mistakes: "Fehler übrig", oneAway: "Fast! Ein Wort passt nicht.", notThis: "Diesmal nicht.", word: "Das Wort war", solved: "Geschafft!", round: "Runde {n} von 3", share: "Ergebnis kopieren", copied: "Kopiert!",
    daily: "Täglich", random: "Zufällige Runde", result: "Ergebnis", fact: "Wusstest du?", toy: "Jeden Tag neu", played: "Heute gespielt", tries: "{n}/6", title: "Rätselrunde", finish: "Ergebnis ansehen",
    pick: "Buchstabe wählen", correct: "Richtig!", wrong: "Leider nicht.", tooShort: "Zu wenig Buchstaben"
  }
};
const wt = (k) => (WD_T[lang] || WD_T.en)[k];
const WD_EPOCH = 20454; // 1 January 2026 as a day number: puzzle #1
const wdDay = () => Math.floor(Date.now() / 86400000);
const wdNumber = () => wdDay() - WD_EPOCH + 1;
const wdData = () => WORDS_DATA[wd.lang] || WORDS_DATA.en;
const wdKey = () => "wordsDaily-" + lang;
function wdSavedToday() { try { const s = JSON.parse(localStorage.getItem(wdKey()) || "null"); return s && s.day === wdDay() ? s : null; } catch (e) { return null; } }
function wdSaveToday(res) { try { localStorage.setItem(wdKey(), JSON.stringify({ day: wdDay(), res })); } catch (e) {} }
function wdShuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---- state of the round you are in (the language is fixed when you start, so the puzzle stays in one language) ---- */
const wd = { screen: "intro", lang: "en", mode: "daily", idx: 0, five: null, four: null, quiz: null, res: {} };
function wdSetup(mode) {
  wd.lang = lang; wd.mode = mode; wd.res = {};
  const d = wdData(), n = wdNumber();
  const idx = mode === "daily" ? n : Math.floor(Math.random() * 100000);
  wd.idx = idx;
  const word = d.five[(idx * 7) % d.five.length];
  wd.five = { word, guesses: [], cur: "", over: false, won: false, msg: "" };
  const puzzle = d.four[idx % d.four.length];
  const words = wdShuffle(puzzle.groups.flatMap((g, gi) => g.w.map((w) => ({ w, g: gi }))));
  wd.four = { puzzle, tiles: words, sel: [], solved: [], mistakes: 0, hist: [], over: false, won: false, msg: "" };
  const start = (idx * 3) % d.quiz.length;
  wd.quiz = { qs: [0, 1, 2].map((i) => d.quiz[(start + i) % d.quiz.length]), i: 0, picked: null, hist: [] };
}
function wdGo(screen) { wd.screen = screen; wdPaint(); }

/* ---- shared bits ---- */
const wdSteps = (n) => `<div class="wd__steps" aria-hidden="true">${[0, 1, 2].map((i) => `<i class="${i < n ? "is-done" : i === n ? "is-now" : ""}"></i>`).join("")}</div>`;
const wdHead = (n) => `${wdSteps(n)}<p class="wd__roundlabel">${esc(wt("round").replace("{n}", n + 1))} · ${esc(wt(wd.mode === "daily" ? "daily" : "random"))}</p><h2 class="wd__title">${esc(wt("names")[n])}</h2><p class="wd__desc">${esc(wt("descs")[n])}</p>`;

/* ---- round 1: five letters ---- */
function wdEval(guess, word) {
  const out = Array(5).fill("absent"), left = {};
  for (let i = 0; i < 5; i++) { if (guess[i] === word[i]) out[i] = "correct"; else left[word[i]] = (left[word[i]] || 0) + 1; }
  for (let i = 0; i < 5; i++) if (out[i] !== "correct" && left[guess[i]] > 0) { out[i] = "present"; left[guess[i]]--; }
  return out;
}
const WD_KB = { de: ["QWERTZUIOP", "ASDFGHJKL", "#YXCVBNM<"], en: ["QWERTYUIOP", "ASDFGHJKL", "#ZXCVBNM<"] };
function wdFiveHTML() {
  const f = wd.five, rows = [];
  for (let r = 0; r < 6; r++) {
    const g = f.guesses[r], isCur = r === f.guesses.length && !f.over;
    const ev = g ? wdEval(g, f.word) : null;
    let tiles = "";
    for (let c = 0; c < 5; c++) {
      const ch = g ? g[c] : isCur ? (f.cur[c] || "") : "";
      tiles += `<span class="wd5__tile${ev ? " is-" + ev[c] : ch ? " is-typed" : ""}">${esc(ch)}</span>`;
    }
    rows.push(`<div class="wd5__row">${tiles}</div>`);
  }
  const status = {};
  f.guesses.forEach((g) => wdEval(g, f.word).forEach((s, i) => { const ch = g[i], rank = { absent: 1, present: 2, correct: 3 }; if (!status[ch] || rank[s] > rank[status[ch]]) status[ch] = s; }));
  const kb = WD_KB[wd.lang].map((row) => `<div class="wd5__kbrow">${[...row].map((k) => k === "#" ? `<button type="button" class="wd5__key wd5__key--wide" data-k="ENTER">${esc(wt("enter"))}</button>`
    : k === "<" ? `<button type="button" class="wd5__key wd5__key--wide" data-k="BACK" aria-label="Backspace">⌫</button>`
    : `<button type="button" class="wd5__key${status[k] ? " is-" + status[k] : ""}" data-k="${k}">${k}</button>`).join("")}</div>`).join("");
  return `<div class="wd5__grid" aria-label="${esc(wt("names")[0])}">${rows.join("")}</div>
    <p class="wd__msg" role="status">${esc(f.msg)}</p>
    ${f.over ? `<div class="wd__actions"><button type="button" class="orch__go" id="wdNext">${esc(wt("next"))}</button></div>` : `<div class="wd5__kb">${kb}</div>`}`;
}
function wdFiveKey(k) {
  const f = wd.five;
  if (!f || f.over || wd.screen !== "five") return;
  f.msg = "";
  if (k === "BACK") f.cur = f.cur.slice(0, -1);
  else if (k === "ENTER") {
    if (f.cur.length < 5) { f.msg = wt("tooShort"); sfx.pop(); }
    else {
      f.guesses.push(f.cur);
      if (f.cur === f.word) { f.over = true; f.won = true; f.msg = wt("solved"); }
      else if (f.guesses.length === 6) { f.over = true; f.msg = wt("word") + ": " + f.word; }
      f.cur = "";
      if (f.over) wd.res.five = { won: f.won, tries: f.guesses.length, rows: f.guesses.map((g) => wdEval(g, f.word)) };
      if (f.over && f.won) setTimeout(() => sfx.score(95), 50); else sfx.click();
    }
  } else if (/^[A-Z]$/.test(k) && f.cur.length < 5) { f.cur += k; sfx.click(); }
  wdPaint();
}

/* ---- round 2: four groups ---- */
const WD_COLORS = ["#fcd34d", "#8fd46a", "#60a5fa", "#a78bfa"];
const WD_SQUARE = ["🟨", "🟩", "🟦", "🟪"];
function wdFourHTML() {
  const f = wd.four, g = f.puzzle.groups;
  const solved = f.solved.map((gi, order) => `<div class="wd4__group" style="--c:${WD_COLORS[order]}"><b>${esc(g[gi].n)}</b><span>${esc(g[gi].w.join(", "))}</span></div>`).join("");
  const left = f.tiles.filter((t) => !f.solved.includes(t.g));
  const tiles = left.map((t) => `<button type="button" class="wd4__tile${f.sel.includes(t.w) ? " is-sel" : ""}" data-w="${esc(t.w)}"${f.over ? " disabled" : ""}>${esc(t.w)}</button>`).join("");
  const dots = Array.from({ length: 4 }, (_, i) => `<i class="${i < 4 - f.mistakes ? "is-on" : ""}"></i>`).join("");
  return `<div class="wd4__solved">${solved}</div>
    ${left.length ? `<div class="wd4__grid">${tiles}</div>` : ""}
    <p class="wd__msg" role="status">${esc(f.msg)}</p>
    <p class="wd4__lives">${esc(wt("mistakes"))}: <span class="wd4__dots">${dots}</span></p>
    ${f.over ? `<div class="wd__actions"><button type="button" class="orch__go" id="wdNext">${esc(wt("next"))}</button></div>`
      : `<div class="wd__actions"><button type="button" class="orch__go" id="wdSubmit"${f.sel.length === 4 ? "" : " disabled"}>${esc(wt("submit"))}</button>
         <button type="button" class="orch__clear" id="wdShuffle">${esc(wt("shuffle"))}</button><button type="button" class="orch__clear" id="wdDeselect"${f.sel.length ? "" : " disabled"}>${esc(wt("deselect"))}</button></div>`}`;
}
function wdFourSubmit() {
  const f = wd.four, g = f.puzzle.groups;
  if (f.sel.length !== 4 || f.over) return;
  const sel = f.tiles.filter((t) => f.sel.includes(t.w));
  const counts = [0, 0, 0, 0];
  sel.forEach((t) => counts[t.g]++);
  const hit = counts.findIndex((c) => c === 4);
  if (hit >= 0) {
    f.solved.push(hit); f.hist.push(f.solved.length - 1); f.sel = []; f.msg = ""; // colours follow the order you solved the groups in
    if (!playMuted) [523, 659, 784].forEach((fr, i) => oTone(fr, orchCtx().currentTime + i * 0.07, 0.2, "triangle", 0.1));
    if (f.solved.length === 4) { f.over = true; f.won = true; f.msg = wt("solved"); }
  } else {
    f.mistakes++; f.hist.push(-1);
    f.msg = counts.some((c) => c === 3) ? wt("oneAway") : "";
    f.sel = [];
    if (!playMuted) oTone(220, orchCtx().currentTime, 0.2, "sawtooth", 0.05, 150);
    if (f.mistakes >= 4) { f.over = true; f.msg = wt("notThis"); g.forEach((_, gi) => { if (!f.solved.includes(gi)) f.solved.push(gi); }); }
  }
  if (f.over) wd.res.four = { won: f.won, mistakes: f.mistakes, hist: f.hist };
  wdPaint();
}

/* ---- round 3: general knowledge ---- */
function wdQuizHTML() {
  const z = wd.quiz, q = z.qs[z.i], answered = z.picked !== null;
  const opts = q.o.map((o, i) => `<button type="button" class="wdq__opt${answered ? (i === q.a ? " is-right" : i === z.picked ? " is-wrong" : "") : ""}" data-i="${i}"${answered ? " disabled" : ""}>${esc(o)}</button>`).join("");
  return `<p class="wdq__count">${z.i + 1} / 3</p><h3 class="wdq__q">${esc(q.q)}</h3><div class="wdq__opts">${opts}</div>
    ${answered ? `<p class="wd__msg"><b>${esc(z.picked === q.a ? wt("correct") : wt("wrong"))}</b> ${esc(q.f)}</p>
      <div class="wd__actions"><button type="button" class="orch__go" id="wdNext">${esc(z.i === 2 ? wt("finish") : wt("next"))}</button></div>` : ""}`;
}
function wdQuizPick(i) {
  const z = wd.quiz;
  if (z.picked !== null) return;
  z.picked = i;
  const ok = i === z.qs[z.i].a;
  z.hist.push(ok);
  sfx.score(ok ? 95 : 10);
  wdPaint();
}

/* ---- the end: a result you can share ---- */
function wdShareText() {
  const r = wd.res, de = wd.lang === "de", names = WD_T[wd.lang].names;
  const head = `${WD_T[wd.lang].title} #${wd.mode === "daily" ? wdNumber() : "?"}`;
  const five = r.five ? `${names[0]} ${r.five.won ? r.five.tries + "/6" : "X/6"}\n` + r.five.rows.map((row) => row.map((s) => s === "correct" ? "🟩" : s === "present" ? "🟨" : "⬛").join("")).join("\n") : "";
  const four = r.four ? `${names[1]} ${r.four.hist.map((h) => h < 0 ? "⬛" : WD_SQUARE[h]).join("")}${de ? " (" + r.four.mistakes + " Fehler)" : " (" + r.four.mistakes + " mistakes)"}` : "";
  const quiz = `${names[2]} ${wd.quiz.hist.map((h) => h ? "✅" : "❌").join("")}`;
  return [head, five, four, quiz, location.origin + location.pathname + "#words"].filter(Boolean).join("\n");
}
function wdEndHTML() {
  const r = wd.res, names = wt("names");
  const five = r.five ? (r.five.won ? wt("tries").replace("{n}", r.five.tries) : "✗") : "–";
  const four = r.four ? (r.four.won ? "✓ · " + r.four.mistakes + " ✗" : "✗") : "–";
  const quiz = wd.quiz.hist.filter(Boolean).length + " / 3";
  return `<h2 class="wd__title">${esc(wt("result"))}</h2>
    <ul class="wd__sum"><li><span>${esc(names[0])}</span><b>${esc(five)}</b></li><li><span>${esc(names[1])}</span><b>${esc(four)}</b></li><li><span>${esc(names[2])}</span><b>${esc(quiz)}</b></li></ul>
    <pre class="wd__share">${esc(wdShareText())}</pre>
    <div class="wd__actions"><button type="button" class="orch__go" id="wdShare">${esc(wt("share"))}</button><button type="button" class="orch__clear" id="wdMore">${esc(wt("again"))}</button></div>`;
}

/* ---- screens ---- */
function wdIntroHTML() {
  const saved = wdSavedToday();
  return `<p class="wd__intro">${esc(wt("intro"))}</p>
    <ol class="wd__list">${wt("names").map((n, i) => `<li><b>${esc(n)}</b><span>${esc(wt("descs")[i])}</span></li>`).join("")}</ol>
    <div class="wd__actions">${saved ? `<p class="wd__msg">${esc(wt("doneToday"))}</p><button type="button" class="orch__go" id="wdShowSaved">${esc(wt("result"))}</button><button type="button" class="orch__clear" id="wdMore">${esc(wt("again"))}</button>`
      : `<button type="button" class="orch__go" id="wdStart">${esc(wt("start"))}</button>`}</div>`;
}
function wdPaint() {
  const s = wd.screen;
  let html = "";
  if (s === "intro") html = wdIntroHTML();
  else if (s === "five") html = wdHead(0) + wdFiveHTML();
  else if (s === "four") html = wdHead(1) + wdFourHTML();
  else if (s === "quiz") html = wdHead(2) + wdQuizHTML();
  else html = wdEndHTML();
  playBody.innerHTML = `<div class="wd">${html}</div>`;
  wdBind();
}
function wdBind() {
  const $ = (id) => document.getElementById(id);
  const on = (id, fn) => { const el = $(id); if (el) el.addEventListener("click", fn); };
  on("wdStart", () => { sfx.click(); wdSetup("daily"); wdGo("five"); });
  on("wdMore", () => { sfx.click(); wdSetup("random"); wdGo("five"); });
  on("wdShowSaved", () => { const sv = wdSavedToday(); wdSetup("daily"); if (sv) wd.res = sv.res; wdReplayFrom(sv); wdGo("end"); });
  playBody.querySelectorAll(".wd5__key").forEach((b) => b.addEventListener("click", () => wdFiveKey(b.dataset.k)));
  playBody.querySelectorAll(".wd4__tile").forEach((b) => b.addEventListener("click", () => {
    const f = wd.four, w = b.dataset.w;
    if (f.over) return;
    if (f.sel.includes(w)) f.sel = f.sel.filter((x) => x !== w); else if (f.sel.length < 4) f.sel.push(w);
    f.msg = ""; sfx.click(); wdPaint();
  }));
  on("wdSubmit", wdFourSubmit);
  on("wdDeselect", () => { wd.four.sel = []; wdPaint(); });
  on("wdShuffle", () => { wd.four.tiles = wdShuffle(wd.four.tiles); sfx.click(); wdPaint(); });
  playBody.querySelectorAll(".wdq__opt").forEach((b) => b.addEventListener("click", () => wdQuizPick(+b.dataset.i)));
  on("wdNext", () => {
    sfx.click();
    if (wd.screen === "five") wdGo("four");
    else if (wd.screen === "four") wdGo("quiz");
    else if (wd.screen === "quiz") {
      if (wd.quiz.i < 2) { wd.quiz.i++; wd.quiz.picked = null; wdPaint(); }
      else { wd.res.quiz = wd.quiz.hist; if (wd.mode === "daily") wdSaveToday(wd.res); unlock("riddler"); wdGo("end"); }
    }
  });
  on("wdShare", async (e) => {
    const text = wdShareText(), btn = e.currentTarget;
    try { await navigator.clipboard.writeText(text); } catch (err) { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e2) {} ta.remove(); }
    sfx.pop(); btn.textContent = wt("copied"); setTimeout(() => { btn.textContent = wt("share"); }, 1800);
  });
}
function wdReplayFrom(sv) { // rebuild what the share text needs from the saved result of today
  if (!sv) return;
  const r = sv.res;
  wd.quiz.hist = r.quiz || [];
  if (r.five) wd.five.won = r.five.won;
}
addEventListener("keydown", (e) => {
  if (wd.screen !== "five" || !document.querySelector(".wd5__grid") || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === "Enter") { e.preventDefault(); wdFiveKey("ENTER"); }
  else if (e.key === "Backspace") { e.preventDefault(); wdFiveKey("BACK"); }
  else if (/^[a-zA-Z]$/.test(e.key)) wdFiveKey(e.key.toUpperCase());
});
function renderWords() {
  if (wd.screen === "intro" || !wd.five) { wd.screen = "intro"; }
  else if (wd.lang !== lang && wd.screen !== "intro") wd.screen = "intro"; // another language: start over
  wdPaint();
}
function wdDoneToday() { return !!wdSavedToday(); }
