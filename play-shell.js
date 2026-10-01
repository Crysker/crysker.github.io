/* ============ Play page: the shared bits of the site ============
   The game page is separate from the portfolio page, so it needs its own small copy of: language, light/dark,
   the mobile menu and the achievement pop-up. Choices and achievements are shared through localStorage,
   so they carry over between the two pages. */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

let lang = "en";
try { lang = localStorage.getItem("lang") || (navigator.language || "en").slice(0, 2); } catch (e) { lang = (navigator.language || "en").slice(0, 2); }
if (lang !== "de") lang = "en";

const SHELL_T = {
  en: {
    skip: "Skip to content", menu: "Menu", projects: "Projects", experience: "Experience", contact: "Contact", play: "Playground",
    toLang: "Auf Deutsch umschalten", toDark: "Switch to dark mode", toLight: "Switch to light mode", unlocked: "Achievement unlocked",
    ach: {
      guess: ["Educated guesser", "Finished a round of Guess the Average"],
      bullseye: ["Bullseye", "Guessed within 5% of the real number"],
      wizard: ["Statistics Wizard", "Scored 85% or more in a round"],
      lang: ["Polyglot", "Switched the language"],
      human: ["Certified human", "Passed the reSHAPTCHA"],
      maestro: ["Maestro", "Placed 6 creatures on the Tiny Orchestra stage and pressed play"],
      conductor: ["Conductor", "Found all 8 secret combinations in Tiny Orchestra"],
      babel: ["Tower builder", "Reached the sky in Tower of Babel"],
      riddler: ["Puzzle fan", "Finished a Puzzle Round"],
      detective: ["Lie detector", "Scored 10 points or more in Who's lying?"],
      haggler: ["Market haggler", "Scored 450 points or more in Price tag for chaos"],
      skeptic: ["Healthy skeptic", "Scored 12 points or more in Two truths, one lie"]
    }
  },
  de: {
    skip: "Zum Inhalt springen", menu: "Menü", projects: "Projekte", experience: "Werdegang", contact: "Kontakt", play: "Spielwiese",
    toLang: "Switch to English", toDark: "Zum dunklen Modus wechseln", toLight: "Zum hellen Modus wechseln", unlocked: "Erfolg freigeschaltet",
    ach: {
      guess: ["Fundierter Schätzer", "Eine Runde Schätz den Durchschnitt beendet"],
      bullseye: ["Volltreffer", "Bis auf 5% an der echten Zahl"],
      wizard: ["Statistik-Zauberer", "85% oder mehr in einer Runde erreicht"],
      lang: ["Polyglot", "Sprache gewechselt"],
      human: ["Zertifizierter Mensch", "Das reSHAPTCHA bestanden"],
      maestro: ["Maestro", "6 Wesen auf die Bühne des Mini-Orchesters gesetzt und Play gedrückt"],
      conductor: ["Dirigent:in", "Alle 8 geheimen Kombinationen im Mini-Orchester gefunden"],
      babel: ["Turmbauer:in", "Im Turmbau zu Babel den Himmel erreicht"],
      riddler: ["Rätselfuchs", "Eine Rätselrunde beendet"],
      detective: ["Lügendetektor", "10 Punkte oder mehr bei Wer lügt? geholt"],
      haggler: ["Marktschreier:in", "450 Punkte oder mehr beim Preisschild fürs Chaos geholt"],
      skeptic: ["Gesunde Skepsis", "12 Punkte oder mehr bei Zwei Wahrheiten, eine Lüge geholt"]
    }
  }
};
/* Games that hook themselves into the menu: { id, hash, title: {en, de}, art (svg), note: () => text, layout: "plain" | "wide", render, stop } */
const PLAY_GAMES = [];
const playGameTitle = (g) => g.title[lang] || g.title.en;
let babelLang = null; // set by the Tower of Babel: for a while the page speaks another language
const st = (k) => { const b = babelLang && SHELL_T[babelLang]; return b && b[k] !== undefined ? b[k] : SHELL_T[lang][k]; };
/* little flags (drawn, so they look the same everywhere: Windows has no flag emoji) for the languages the Tower of Babel speaks */
const FLAG_BODY = {
  fr: '<rect width="10" height="20" fill="#0055a4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ef4135"/>',
  it: '<rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/>',
  nl: '<rect width="30" height="7" fill="#ae1c28"/><rect y="7" width="30" height="6" fill="#fff"/><rect y="13" width="30" height="7" fill="#21468b"/>',
  es: '<rect width="30" height="20" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/>',
  pt: '<rect width="12" height="20" fill="#006600"/><rect x="12" width="18" height="20" fill="#ff0000"/><circle cx="12" cy="10" r="3.4" fill="#ffcc00"/>',
  tr: '<rect width="30" height="20" fill="#e30a17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.6" cy="10" r="4" fill="#e30a17"/><circle cx="17" cy="10" r="1.6" fill="#fff"/>'
};
const flagSVG = (l) => FLAG_BODY[l] ? `<svg class="flag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">${FLAG_BODY[l]}</svg>` : "";
/* ============ Daily and endless mode, shared by the games ============
   Daily: the day (your calendar date) is the seed, so everybody gets the same rounds, once a day; the result and a streak live in this browser.
   Endless: random rounds, as many as you like. */
const DAILY_EPOCH = 20454; // 1 January 2026 as a day number: puzzle no. 1
const DAILY = {
  day() { const d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); },
  number() { return this.day() - DAILY_EPOCH + 1; },
  rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },
  seed(game) { let h = 2166136261; for (const ch of game + ":" + this.day()) { h = Math.imul(h ^ ch.charCodeAt(0), 16777619); } return h >>> 0; },
  load(game) { try { return JSON.parse(localStorage.getItem("daily-" + game) || "null") || {}; } catch (e) { return {}; } },
  played(game) { const s = this.load(game); return s.day === this.day() ? s : null; },
  streak(game) { const s = this.load(game); return s.day === this.day() || s.day === this.day() - 1 ? s.streak || 0 : 0; },
  record(game, pts) { // the first result of the day counts
    const s = this.load(game), today = this.day();
    if (s.day === today) return s.streak || 1;
    const streak = s.day === today - 1 ? (s.streak || 0) + 1 : 1;
    try { localStorage.setItem("daily-" + game, JSON.stringify({ day: today, pts, streak })); } catch (e) {}
    return streak;
  }
};
const DAILY_T = {
  en: { today: "Today's puzzle", num: "No. {n}, the same for everyone", endless: "Endless", endlessSub: "Random rounds, as many as you like", rounds: "{r} rounds", done: "Done: {p} points", streak: "🔥 {n} {d} in a row", day: "day", days: "days", comeBack: "A new puzzle tomorrow.", share: "Share result", copied: "Copied", playEndless: "Play endless", open: "Daily puzzle" },
  de: { today: "Das Tagesrätsel", num: "Nr. {n}, für alle gleich", endless: "Endlos", endlessSub: "Zufällige Runden, so viele du willst", rounds: "{r} Runden", done: "Geschafft: {p} Punkte", streak: "🔥 {n} {d} in Folge", day: "Tag", days: "Tage", comeBack: "Morgen gibt es ein neues Rätsel.", share: "Ergebnis teilen", copied: "Kopiert", playEndless: "Endlos spielen", open: "Tagesrätsel" }
};
const dt = (k) => (DAILY_T[lang] || DAILY_T.en)[k];
/* the choice at the start of a game: today's puzzle or endless. onPick(mode, savedResultOrNull) */
DAILY.chooser = function (game, rounds, onPick) {
  const saved = this.played(game), streak = this.streak(game);
  document.getElementById("playBody").innerHTML = `<div class="dly">
    <div class="dly__cards">
      <button type="button" class="dly__card" data-mode="daily"><b>${esc(dt("today"))}</b><span>${esc(dt("num").replace("{n}", this.number()))}</span><small>${esc(saved ? "✓ " + dt("done").replace("{p}", saved.pts) : dt("rounds").replace("{r}", rounds))}</small></button>
      <button type="button" class="dly__card" data-mode="endless"><b>${esc(dt("endless"))}</b><span>${esc(dt("endlessSub"))}</span><small>${esc(dt("rounds").replace("{r}", rounds))}</small></button>
    </div>
    ${streak ? `<p class="dly__streak">${esc(dt("streak").replace("{n}", streak).replace("{d}", streak === 1 ? dt("day") : dt("days")))}</p>` : ""}</div>`;
  document.querySelectorAll(".dly__card").forEach((b) => b.addEventListener("click", () => { sfx.click(); onPick(b.dataset.mode, b.dataset.mode === "daily" ? saved : null); }));
};
/* under the result of a daily round: streak, share, and a way into endless */
DAILY.extras = function (game, G, shareText) {
  if (G.mode !== "daily") return "";
  const streak = this.streak(game);
  return `${streak ? `<p class="dly__streak">${esc(dt("streak").replace("{n}", streak).replace("{d}", streak === 1 ? dt("day") : dt("days")))}</p>` : ""}<p class="wd__msg">${esc(dt("comeBack"))}</p>
    <div class="wd__actions"><button type="button" class="orch__go" id="dlyShare" data-text="${esc(shareText)}">${esc(dt("share"))}</button><button type="button" class="orch__clear" id="dlyEndless">${esc(dt("playEndless"))}</button></div>`;
};
DAILY.bindExtras = function (onEndless) {
  const share = document.getElementById("dlyShare"), endless = document.getElementById("dlyEndless");
  if (endless) endless.addEventListener("click", () => { sfx.click(); onEndless(); });
  if (share) share.addEventListener("click", () => {
    const text = share.dataset.text, label = share.textContent;
    const done = () => { share.textContent = "✓ " + dt("copied"); setTimeout(() => { share.textContent = label; }, 1800); sfx.pop(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => window.prompt("", text)); else window.prompt("", text);
  });
};
const ACH_TOTAL = 17; // same list as on the portfolio page

function applyShell() {
  document.documentElement.lang = babelLang || lang;
  document.querySelectorAll("[data-nav]").forEach((el) => { el.textContent = st(el.dataset.nav); });
  const tog = document.getElementById("langToggle");
  tog.setAttribute("aria-label", st("toLang"));
  tog.classList.toggle("is-babel", !!babelLang); // in the Tower of Babel the switch shows the tongue you are stuck with
  tog.innerHTML = babelLang ? `<span class="lang__babel">${flagSVG(babelLang)}${babelLang.toUpperCase()}</span>` : '<span data-lang="en">EN</span><span data-lang="de">DE</span>';
  applyMode();
}

/* light / dark (no stored choice = follow the system) */
const themeBtns = [...document.querySelectorAll("#themeToggle, #themeToggleMenu")]; // the round button in the bar and the entry in the phone menu
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
function applyMode() {
  const explicit = document.documentElement.dataset.theme;
  const dark = explicit ? explicit === "dark" : systemDark.matches;
  document.documentElement.dataset.mode = dark ? "dark" : "light";
  const playLink = document.getElementById("playLink");
  playLink.setAttribute("aria-label", st("play"));
  playLink.title = st("play");
  themeBtns.forEach((b) => b.setAttribute("aria-label", dark ? st("toLight") : st("toDark")));
  document.getElementById("themeLabel").textContent = lang === "en" ? (dark ? "Light mode" : "Dark mode") : (dark ? "Heller Modus" : "Dunkler Modus");
}
themeBtns.forEach((b) => b.addEventListener("click", () => {
  const next = document.documentElement.dataset.mode === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  applyMode();
}));
systemDark.addEventListener("change", applyMode);

/* language */
document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "en" ? "de" : "en";
  try { localStorage.setItem("lang", lang); } catch (e) {}
  unlock("lang");
  applyShell();
  if (typeof refreshCaptchaTexts === "function") refreshCaptchaTexts();
  if (typeof renderPlay === "function") renderPlay();
});

/* mobile menu */
const nav = document.querySelector(".nav");
const menuBtn = document.getElementById("menuToggle");
function setMenu(open) {
  nav.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
document.getElementById("navLinks").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => { if (!nav.contains(e.target)) setMenu(false); });

/* achievements: same storage key as the portfolio page */
let achieved = [];
try { achieved = JSON.parse(localStorage.getItem("achievements") || "[]"); } catch (e) {}
const toast = document.getElementById("toast");
let toastTimer;
function unlock(id) {
  if (achieved.includes(id)) return;
  achieved.push(id);
  try { localStorage.setItem("achievements", JSON.stringify(achieved)); } catch (e) {}
  const A = st("ach")[id];
  if (!A) return;
  toast.innerHTML = `<span class="toast__icon" aria-hidden="true">🏆</span>
    <span><small>${esc(st("unlocked"))} · ${achieved.length}/${ACH_TOTAL}</small>
    <b>${esc(A[0])}</b><span>${esc(A[1])}</span></span>`;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3800);
}

applyShell();
