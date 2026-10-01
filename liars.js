/* ============ Wer lügt? / Who's lying? ============
   A logic game. A few animals make statements about each other. Truth-tellers always say true things, liars always say false things.
   Work out who is who. Every puzzle is generated on the spot and checked by brute force, so it always has exactly one solution.
   Five rounds, from three animals up to five. Fewer tries and no hints mean more points. */
(() => {
  const NAMES = ["Fiona", "Bruno", "Pia", "Fred", "Olli"], FACES = ["🦊", "🐻", "🐼", "🐸", "🦉"];
  const TXT = {
    en: {
      title: "Who's lying?", intro: "Truth-tellers always say true things. Liars always say false things. Who is who?", honest: "Honest", liar: "Liar", check: "Check", hint: "Hint (−1)", next: "Next", finish: "Result", again: "Play again",
      round: "Round {n} of 5", tries: "Tries", wrong: "Not yet: {k} of {n} are right.", solved: "Solved!", failed: "The solution was:", points: "Points", total: "You got {p} of 15 points.",
      ranks: ["Easy to fool", "Good ear", "Sharp mind", "Lie detector"], best: "Best: {n}", toy: "A logic puzzle",
      s: {
        T: (a) => `${a.j} always tells the truth.`, L: (a) => `${a.j} always lies.`, same: (a) => `${a.j} and ${a.k} are the same kind.`, diff: (a) => `${a.j} and ${a.k} are different: one lies, one doesn't.`,
        atleast: (a) => `At least ${a.k} of us ${a.k === 1 ? "is a liar" : "are liars"}.`, exactly: (a) => `Exactly ${a.k} of us ${a.k === 1 ? "is a liar" : "are liars"}.`
      }
    },
    de: {
      title: "Wer lügt?", intro: "Ehrliche sagen immer die Wahrheit. Lügner sagen immer etwas Falsches. Wer ist wer?", honest: "Ehrlich", liar: "Lügner", check: "Prüfen", hint: "Tipp (−1)", next: "Weiter", finish: "Ergebnis", again: "Nochmal spielen",
      round: "Runde {n} von 5", tries: "Versuche", wrong: "Noch nicht: {k} von {n} stimmen.", solved: "Gelöst!", failed: "Die Lösung war:", points: "Punkte", total: "Du hast {p} von 15 Punkten.",
      ranks: ["Leicht zu täuschen", "Gutes Gehör", "Scharfer Verstand", "Lügendetektor"], best: "Bestwert: {n}", toy: "Ein Logikrätsel",
      s: {
        T: (a) => `${a.j} sagt immer die Wahrheit.`, L: (a) => `${a.j} lügt immer.`, same: (a) => `${a.j} und ${a.k} sind vom gleichen Typ.`, diff: (a) => `${a.j} und ${a.k} sind verschieden: Einer lügt, einer nicht.`,
        atleast: (a) => `Mindestens ${a.k} von uns ${a.k === 1 ? "lügt" : "lügen"}.`, exactly: (a) => `Genau ${a.k} von uns ${a.k === 1 ? "lügt" : "lügen"}.`
      }
    }
  };
  const lt = (k) => (TXT[lang] || TXT.en)[k];
  const rand = (n) => Math.floor(Math.random() * n);

  /* ---- generating puzzles: a statement per animal, then check by brute force that exactly one assignment fits ---- */
  const evalSt = (s, a) => {
    switch (s.type) {
      case "T": return a[s.j];
      case "L": return !a[s.j];
      case "same": return a[s.j] === a[s.k];
      case "diff": return a[s.j] !== a[s.k];
      case "atleast": return a.filter((x) => !x).length >= s.k;
      default: return a.filter((x) => !x).length === s.k;
    }
  };
  function solutions(sts, n) { // a[i] === true means: animal i tells the truth. Consistent when every statement is true exactly for the truth-tellers.
    const out = [];
    for (let m = 0; m < (1 << n); m++) {
      const a = Array.from({ length: n }, (_, i) => !!((m >> i) & 1));
      if (sts.every((s, i) => evalSt(s, a) === a[i])) out.push(a);
    }
    return out;
  }
  function genPuzzle(n, level) {
    const types = level < 2 ? ["T", "L", "same", "diff"] : ["T", "L", "same", "diff", "atleast", "exactly"];
    for (let attempt = 0; attempt < 5000; attempt++) {
      const sts = [];
      for (let i = 0; i < n; i++) {
        const type = types[rand(types.length)], s = { type };
        if (type === "T" || type === "L") { do s.j = rand(n); while (s.j === i); }
        else if (type === "same" || type === "diff") { do s.j = rand(n); while (s.j === i); do s.k = rand(n); while (s.k === i || s.k === s.j); }
        else s.k = 1 + rand(n - 1);
        sts.push(s);
      }
      if (new Set(sts.map((s) => s.type)).size < 2) continue; // a little variety
      const sols = solutions(sts, n);
      if (sols.length === 1) return { n, sts, sol: sols[0] };
    }
    return genPuzzle(n, 0);
  }

  /* ---- the game ---- */
  const SIZES = [3, 3, 4, 4, 5];
  let G = null;
  const best = () => { try { return +localStorage.getItem("liarsBest") || 0; } catch (e) { return 0; } };
  function start() {
    G = { round: 0, points: 0, puzzles: SIZES.map((n, i) => genPuzzle(n, i)), guess: [], tries: 0, hinted: [], solved: false, over: false, msg: "", done: false };
    G.guess = Array(G.puzzles[0].n).fill(null);
  }
  const sayText = (p, i) => { const s = p.sts[i]; return TXT[lang].s[s.type]({ j: NAMES[s.j], k: s.k !== undefined && (s.type === "same" || s.type === "diff") ? NAMES[s.k] : s.k }); };
  function paint() {
    const bodyEl = document.getElementById("playBody");
    if (!G) start();
    if (G.done) { bodyEl.innerHTML = endHTML(); bind(); return; }
    const p = G.puzzles[G.round];
    const cards = p.sts.map((_, i) => {
      const g = G.guess[i], locked = G.over || G.hinted.includes(i);
      const right = G.over ? p.sol[i] : null;
      return `<div class="lq__card${locked ? " is-locked" : ""}">
        <span class="lq__face" aria-hidden="true">${FACES[i]}</span>
        <div class="lq__body"><b>${esc(NAMES[i])}</b><p class="lq__say">“${esc(sayText(p, i))}”</p></div>
        <div class="lq__pick" role="group" aria-label="${esc(NAMES[i])}">
          <button type="button" class="lq__btn${g === true ? " is-on" : ""}${G.over && right === true ? " is-right" : ""}" data-i="${i}" data-v="1"${locked ? " disabled" : ""}>${esc(lt("honest"))}</button>
          <button type="button" class="lq__btn lq__btn--liar${g === false ? " is-on" : ""}${G.over && right === false ? " is-right" : ""}" data-i="${i}" data-v="0"${locked ? " disabled" : ""}>${esc(lt("liar"))}</button>
        </div></div>`;
    }).join("");
    const ready = G.guess.every((x) => x !== null);
    bodyEl.innerHTML = `<div class="lq">
      <p class="wd__roundlabel">${esc(lt("round").replace("{n}", G.round + 1))} · ${esc(lt("points"))}: ${G.points}</p>
      <p class="wd__desc">${esc(lt("intro"))}</p>
      <div class="lq__cards">${cards}</div>
      <p class="wd__msg" role="status">${esc(G.msg)}</p>
      <div class="wd__actions">${G.over
        ? `<button type="button" class="orch__go" id="lqNext">${esc(lt(G.round === 4 ? "finish" : "next"))}</button>`
        : `<button type="button" class="orch__go" id="lqCheck"${ready ? "" : " disabled"}>${esc(lt("check"))}</button><button type="button" class="orch__clear" id="lqHint">${esc(lt("hint"))}</button>`}
        <span class="lq__tries">${esc(lt("tries"))}: ${G.tries}</span></div></div>`;
    bind();
  }
  function endHTML() {
    const p = G.points, rank = lt("ranks")[p >= 14 ? 3 : p >= 10 ? 2 : p >= 6 ? 1 : 0];
    return `<div class="lq"><h2 class="wd__title">${esc(rank)}</h2><p class="wd__desc">${esc(lt("total").replace("{p}", p))}</p>
      <p class="wd__msg">${esc(lt("best").replace("{n}", best()))}</p>
      <div class="wd__actions"><button type="button" class="orch__go" id="lqAgain">${esc(lt("again"))}</button></div></div>`;
  }
  function roundPoints() { return Math.max(0, 3 - (G.tries - 1) - G.hinted.length); }
  function bind() {
    const $ = (id) => document.getElementById(id);
    document.querySelectorAll(".lq__btn").forEach((b) => b.addEventListener("click", () => {
      const i = +b.dataset.i, v = b.dataset.v === "1";
      G.guess[i] = G.guess[i] === v ? null : v;
      G.msg = ""; sfx.click(); paint();
    }));
    const check = $("lqCheck");
    if (check) check.addEventListener("click", () => {
      const p = G.puzzles[G.round];
      G.tries++;
      const ok = G.guess.filter((g, i) => g === p.sol[i]).length;
      if (ok === p.n) { G.over = true; G.points += roundPoints(); G.msg = lt("solved"); sfx.score(95); }
      else if (G.tries >= 4) { G.over = true; G.msg = lt("failed"); sfx.score(10); }
      else { G.msg = lt("wrong").replace("{k}", ok).replace("{n}", p.n); sfx.score(30); }
      paint();
    });
    const hint = $("lqHint");
    if (hint) hint.addEventListener("click", () => {
      const p = G.puzzles[G.round], open = p.sts.map((_, i) => i).filter((i) => !G.hinted.includes(i));
      if (!open.length) return;
      const i = open[rand(open.length)];
      G.hinted.push(i); G.guess[i] = p.sol[i]; sfx.pop(); paint();
    });
    const next = $("lqNext");
    if (next) next.addEventListener("click", () => {
      sfx.click();
      if (G.round === 4) {
        G.done = true;
        if (G.points > best()) { try { localStorage.setItem("liarsBest", String(G.points)); } catch (e) {} }
        if (G.points >= 10) unlock("detective");
        paint(); return;
      }
      G.round++; G.guess = Array(G.puzzles[G.round].n).fill(null); G.tries = 0; G.hinted = []; G.over = false; G.msg = "";
      paint();
    });
    const again = $("lqAgain");
    if (again) again.addEventListener("click", () => { sfx.click(); start(); paint(); });
  }

  const art = `<svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
    <circle cx="24" cy="50" r="13" style="fill:var(--orange)"/><circle cx="56" cy="50" r="13" style="fill:var(--turq)"/>
    <rect x="8" y="10" width="34" height="18" rx="9" style="fill:var(--surface);stroke:var(--ink-soft);stroke-width:2"/><path d="M20 28l-3 8 9-8z" style="fill:var(--surface);stroke:var(--ink-soft);stroke-width:2"/>
    <rect x="42" y="14" width="30" height="16" rx="8" style="fill:var(--surface);stroke:var(--ink-soft);stroke-width:2"/>
    <text x="25" y="23" text-anchor="middle" style="font:800 12px sans-serif;fill:var(--ink)">?</text><text x="57" y="26" text-anchor="middle" style="font:800 11px sans-serif;fill:var(--ink)">!</text></svg>`;
  PLAY_GAMES.push({
    id: "liars", hash: "liars", title: { en: TXT.en.title, de: TXT.de.title }, art,
    note: () => (best() ? lt("best").replace("{n}", best()) : lt("toy")), layout: "plain",
    render: () => { if (!G) start(); paint(); },
    state: () => G // for testing
  });
})();
