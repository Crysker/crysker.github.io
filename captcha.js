/* ============ reSHAPTCHA – a reCAPTCHA parody with the hero shapes ============
   Lives on the Play page. Uses lang, esc, unlock from play-shell.js. */
const CAPTCHA_T = {
  en: {
    kicker: "Security check", title: "Put every shape into its slot",
    hint: "Drag them into the slots (or tap a shape, then a slot) and hit Verify.",
    close: "Close", verify: "Verify",
    perfect: "100% human. Suspiciously perfect.", mixed: "{h}% human, {t}% toaster 🍞",
    done: "Verified. Preparing your reward…",
    fail: ["Verification failed. Our AI suspects you might be a toaster. 🍞", "A triangle in a circle? Bold. Also wrong.", "Beep boop. That's exactly what a robot would do.", "Error 418: I'm a teapot. And you're not quite human yet.", "Even the goblins from #SaveTheOcean would get this one."],
    tip: "(Tip: every shape has exactly one matching outline.)",
    picked: "Picked up! Now choose its slot.", slot: "Slot for the {s}", won: "Verification complete ✓",
    shapeNames: { sphere: "sphere", cube: "cube", ring: "ring", tri: "triangle", pill: "pill" }
  },
  de: {
    kicker: "Sicherheitsprüfung", title: "Bring jede Form an ihren Platz",
    hint: "Zieh sie in die Plätze (oder Form antippen, dann Platz) und drück auf Prüfen.",
    close: "Schließen", verify: "Prüfen",
    perfect: "100 % Mensch. Verdächtig perfekt.", mixed: "{h} % Mensch, {t} % Toaster 🍞",
    done: "Verifiziert. Belohnung wird geladen…",
    fail: ["Verifizierung fehlgeschlagen. Unsere KI vermutet, du bist ein Toaster. 🍞", "Ein Dreieck im Kreis? Mutig. Aber falsch.", "Beep boop. Genau das würde ein Roboter tun.", "Fehler 418: Ich bin eine Teekanne. Und du bist noch nicht ganz Mensch.", "Sogar die Goblins aus #SaveTheOcean würden das schaffen."],
    tip: "(Tipp: Jede Form hat genau einen passenden Umriss.)",
    picked: "Aufgehoben! Jetzt den Platz wählen.", slot: "Platz für: {s}", won: "Verifizierung abgeschlossen ✓",
    shapeNames: { sphere: "Kugel", cube: "Würfel", ring: "Ring", tri: "Dreieck", pill: "Pille" }
  }
};
const ct = (k) => CAPTCHA_T[lang][k];

const SHAPES = ["sphere", "cube", "ring", "tri", "pill"];
const game = document.getElementById("game");
const gameSlots = document.getElementById("gameSlots");
const gameTray = document.getElementById("gameTray");
const gameMsg = document.getElementById("gameMsg");
const verifyBtn = document.getElementById("gameVerify");
let picked = null, fails = 0;
new Image().src = "assets/img/meme-success.png"; // load the reward early, so it is there the moment you win

const say = (text) => { gameMsg.textContent = text; };
const shapeName = (s) => ct("shapeNames")[s];
const updateVerify = () => { verifyBtn.disabled = gameSlots.querySelectorAll(".slot.is-filled").length < SHAPES.length; };

/* the verdict: every failed Verify costs 10% (never worse than 50/50) */
function renderVerdict() {
  const human = Math.max(50, 100 - 10 * fails), toaster = 100 - human;
  document.getElementById("gameVerdict").textContent = toaster === 0 ? ct("perfect") : ct("mixed").replace("{h}", human).replace("{t}", toaster);
}

/* the fixed texts of the window (kicker, hint, buttons …) follow the language */
function refreshCaptchaTexts() {
  document.querySelectorAll("[data-cap]").forEach((el) => { el.textContent = ct(el.dataset.cap); });
  if (!document.getElementById("gamePlay").hidden) document.getElementById("gameTitle").textContent = ct("title");
  else { document.getElementById("gameTitle").textContent = ct("won"); renderVerdict(); }
}

function startCaptcha() {
  fails = 0; picked = null; say("");
  refreshCaptchaTexts();
  document.getElementById("gameTitle").textContent = ct("title");
  document.querySelector(".game__hint").hidden = false;
  document.getElementById("gameWin").hidden = true;
  document.getElementById("gamePlay").hidden = false;
  gameSlots.innerHTML = SHAPES.map((s) =>
    `<button type="button" class="slot" data-shape="${s}" aria-label="${esc(ct("slot").replace("{s}", shapeName(s)))}">
       <span class="piece piece--${s} is-ghost" aria-hidden="true"></span></button>`).join("");
  // Fisher–Yates, re-rolled until no shape sits right under its own slot
  let shuffled;
  do {
    shuffled = [...SHAPES];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.some((s, i) => s === SHAPES[i]));
  gameTray.innerHTML = shuffled.map((s) =>
    `<button type="button" class="piece-btn" data-shape="${s}" aria-pressed="false" aria-label="${esc(shapeName(s))}">
       <span class="piece piece--${s}" aria-hidden="true"></span></button>`).join("");
  updateVerify();
  if (!game.open) game.showModal();
}

function pick(btn) {
  gameTray.querySelectorAll(".piece-btn").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  picked = btn;
  say(ct("picked"));
}

const shake = (el) => { el.classList.remove("is-wrong"); void el.offsetWidth; el.classList.add("is-wrong"); };

// Any shape fits any slot – like a real CAPTCHA, you only find out when you hit "Verify"
function tryPlace(btn, slot) {
  btn.style.transform = "";
  if (!slot) return;
  if (slot.classList.contains("is-locked")) return shake(btn); // already verified correct
  if (slot.classList.contains("is-filled")) unplace(slot); // swap: the old piece goes back to the tray
  slot.querySelector(".is-ghost").hidden = true;
  slot.appendChild(btn);
  btn.setAttribute("aria-pressed", "false");
  slot.classList.add("is-filled");
  picked = null;
  say("");
  updateVerify();
}
function unplace(slot) {
  const btn = slot.querySelector(".piece-btn");
  if (!btn) return null;
  gameTray.appendChild(btn);
  slot.querySelector(".is-ghost").hidden = false;
  slot.classList.remove("is-filled");
  updateVerify();
  return btn;
}

function verify() {
  const slots = [...gameSlots.querySelectorAll(".slot")];
  const wrong = slots.filter((s) => s.querySelector(".piece-btn").dataset.shape !== s.dataset.shape);
  if (!wrong.length) return win();
  // correct ones get locked in, wrong ones jump back to the tray
  slots.filter((s) => !wrong.includes(s)).forEach((s) => s.classList.add("is-locked"));
  wrong.forEach((s) => { const btn = unplace(s); if (btn) shake(btn); });
  const lines = ct("fail");
  say(lines[fails % lines.length] + (fails >= 2 ? " " + ct("tip") : ""));
  fails++;
}
function win() {
  gameSlots.querySelectorAll(".slot").forEach((s) => s.classList.add("is-locked"));
  verifyBtn.disabled = true;
  say(ct("done"));
  setTimeout(() => {
    document.getElementById("gamePlay").hidden = true;
    document.getElementById("gameWin").hidden = false;
    document.getElementById("gameTitle").textContent = ct("won");
    renderVerdict();
    document.querySelector(".game__hint").hidden = true;
    say("");
    unlock("human");
  }, 800);
}
verifyBtn.addEventListener("click", verify);

// Drag with pointer events (mouse + touch); a press without movement counts as a tap
let drag = null;
gameTray.addEventListener("pointerdown", (e) => {
  const btn = e.target.closest(".piece-btn");
  if (!btn) return;
  drag = { btn, x: e.clientX, y: e.clientY, moved: false };
  try { btn.setPointerCapture(e.pointerId); } catch (err) {}
});
gameTray.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (!drag.moved && Math.hypot(dx, dy) < 6) return;
  drag.moved = true;
  drag.btn.classList.add("is-dragging");
  drag.btn.style.transform = `translate(${dx}px, ${dy}px)`;
});
gameTray.addEventListener("pointerup", (e) => {
  if (!drag) return;
  const { btn, moved } = drag;
  drag = null;
  btn.classList.remove("is-dragging");
  if (!moved) return pick(btn);
  btn.style.visibility = "hidden"; // look underneath the dragged piece
  const slot = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el.classList?.contains("slot"));
  btn.style.visibility = "";
  tryPlace(btn, slot);
});
gameTray.addEventListener("pointercancel", () => {
  if (drag) { drag.btn.style.transform = ""; drag.btn.classList.remove("is-dragging"); drag = null; }
});
// Keyboard: Enter/Space on a shape picks it (pointer taps are handled above)
gameTray.addEventListener("click", (e) => {
  const btn = e.target.closest(".piece-btn");
  if (btn && e.detail === 0) pick(btn);
});
gameSlots.addEventListener("click", (e) => {
  const slot = e.target.closest(".slot");
  if (!slot) return;
  if (picked) tryPlace(picked, slot);
  else if (slot.classList.contains("is-filled") && !slot.classList.contains("is-locked")) unplace(slot); // take it back out
});

const closeCaptcha = () => { game.close(); if (typeof renderPlay === "function") renderPlay(); }; // the tile shows "verified" once done
document.getElementById("gameClose").addEventListener("click", closeCaptcha);
game.addEventListener("close", () => { if (typeof renderPlay === "function") renderPlay(); });
refreshCaptchaTexts();
