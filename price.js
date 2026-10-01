/* ============ Preisschild fürs Chaos / Price Tag for Chaos ============
   A silly estimating game with everyday (and not so everyday) Austrian things. You hang a price tag on each one; the game shows
   the "chaos value" and a punchline. The values are rough and meant as a joke, not as a price list.
   Six rounds, up to 100 points each: the closer your price, the more points (log scale, so "twice as much" and "half as much" count the same). */
(() => {
  /* [emoji, price in €, German text, German punchline, English text, English punchline] */
  const ITEMS = [
    ["🥖", 4, "Eine Leberkässemmel um 3 Uhr nachts", "Gefühlt unbezahlbar, in Wahrheit ein Vierer. Die Semmel weiß das.", "A Leberkäse roll at 3 a.m.", "Feels priceless, actually about a fiver. The roll knows."],
    ["🚆", 2500, "Ein ÖBB-Zug, der pünktlich ankommt", "Sammlerstück. Man erzählt sich, es gab mal einen.", "An ÖBB train that arrives on time", "Collector's item. People say there was one once."],
    ["🅿️", 500, "Ein freier Parkplatz in der Wiener Innenstadt, Samstag um 11", "Wer einen findet, zieht ein.", "A free parking spot in downtown Vienna on a Saturday at 11", "Whoever finds one moves in."],
    ["🧻", 80, "Ein Packerl Klopapier im Frühjahr 2020", "Im Regal 3 €, im Kopf 80. Die Nerven sind nicht eingerechnet.", "A pack of toilet paper in spring 2020", "3 € on the shelf, 80 in your head. Nerves not included."],
    ["🍰", 9, "Ein Stück Sachertorte im Touristenlokal", "Mit Schlag. Ohne Schlag wäre es ein Skandal.", "A slice of Sachertorte in a tourist café", "With whipped cream. Without it would be a scandal."],
    ["🍻", 4, "Ein Seidl am Heurigen-Tisch mit Aussicht", "Der Preis ist egal, die Aussicht zahlt mit.", "A beer at a Heuriger table with a view", "The price hardly matters, the view pays too."],
    ["🎻", 350, "Eintritt zum Wiener Opernball (ungefähr)", "Dafür bekommst du sehr viel Walzer und sehr wenig Platz.", "Admission to the Vienna Opera Ball (roughly)", "Buys you a lot of waltz and very little space."],
    ["🏔️", 120, "Ein Foto vom Großglockner ohne eine einzige Wolke", "Wer wartet, gewinnt. Oder erfriert.", "A photo of the Grossglockner without a single cloud", "Those who wait win. Or freeze."],
    ["⛷️", 75, "Ein Tagesskipass in Kitzbühel in der Hochsaison (ungefähr)", "Für das Geld hättest du auch die Piste kaufen können. Fast.", "A day ski pass in Kitzbühel in high season (roughly)", "For that money you could almost have bought the slope."],
    ["🥟", 14, "Ein Teller Kasnocken auf der Hütte nach sechs Stunden Wandern", "Der Preis stimmt nicht, aber das Gefühl.", "A plate of Kasnocken at the hut after six hours of hiking", "The price is off, the feeling is right."],
    ["🚗", 25, "Eine Stunde Stau am Brenner im August", "Die Zeit ist gratis. Die Laune nicht.", "An hour of traffic jam at the Brenner in August", "The time is free. The mood is not."],
    ["📶", 50, "Handyempfang im Arlbergtunnel", "Wert theoretisch riesig, praktisch null.", "Phone signal inside the Arlberg tunnel", "Worth a fortune in theory, nothing in practice."],
    ["🌭", 5, "Die letzte Käsekrainer am Würstelstand um 2 Uhr", "Mit Senf und Gewissen, extra scharf.", "The last Käsekrainer at the sausage stand at 2 a.m.", "With mustard and a clear conscience."],
    ["🎶", 1200, "Ein Platz beim Neujahrskonzert in Wien (Schwarzmarkt, geschätzt)", "Ein Walzer, der teurer ist als dein Urlaub.", "A seat at the New Year's Concert in Vienna (black market, estimated)", "One waltz that costs more than your holiday."],
    ["🪑", 200, "Der letzte freie Sitzplatz in der U6 um 8 Uhr morgens", "Wer ihn hat, tut so, als würde er schlafen.", "The last free seat on the U6 at 8 a.m.", "Whoever has it pretends to be asleep."],
    ["📄", 800, "Ein Amtsweg ganz ohne Wartezeit", "Gerüchte sprechen von einem Mythos.", "A trip to the authorities without any waiting", "Rumour has it that it is a myth."],
    ["☕", 6, "Eine Melange im Kaffeehaus, ohne Zeitdruck", "Man zahlt nicht den Kaffee, sondern den Tisch.", "A Melange in a coffee house, with no rush", "You are not paying for the coffee, you pay for the table."],
    ["🍫", 1, "Eine Mozartkugel direkt in Salzburg (ungefähr)", "Klein, rund, und trotzdem schwer zu teilen.", "A Mozartkugel right in Salzburg (roughly)", "Small, round, and still hard to share."],
    ["🍲", 40, "Hirschgulasch von Omas Herd", "Das Rezept ist unauffindbar. Die Zutat heißt Liebe.", "Venison goulash from Grandma's stove", "The recipe cannot be found. The ingredient is love."],
    ["🍷", 4, "Ein Achterl Grüner Veltliner im Gastgarten", "Ein Achtel Liter, ein ganzer Nachmittag.", "An eighth of a litre of Grüner Veltliner in a beer garden", "An eighth of a litre, a whole afternoon."],
    ["🚲", 350, "Ein Fahrrad, das auch nach einer Nacht vorm Bahnhof noch da ist", "Selten wie ein Einhorn, aber mit Kettenschloss.", "A bike that is still there after a night in front of the station", "As rare as a unicorn, but with a chain lock."],
    ["🍳", 22, "Ein Wiener Schnitzel im Beisl, größer als der Teller", "Der Teller schämt sich ein bisschen.", "A Wiener Schnitzel at a Beisl, bigger than the plate", "The plate is a little ashamed."],
    ["🏠", 900, "Ein Altbauzimmer in Wien, „Charme“ inklusive", "Der Charme: Schiefer Boden, Aussicht auf Hinterhof.", "A room in an old Vienna building, “charm” included", "The charm: a sloping floor and a view of the courtyard."],
    ["🛋️", 60, "Ein Sonntag ohne einen einzigen Termin", "Selten und kostbar, wie Beeren im Winter.", "A Sunday without a single appointment", "Rare and precious, like berries in winter."],
    ["🧊", 3, "Ein Eis am Stiel im Hochsommer am Donauinselfest", "Es schmilzt schneller, als du zahlen kannst.", "An ice lolly in midsummer at the Donauinselfest", "It melts faster than you can pay."]
  ];
  const T = {
    en: {
      title: "Price tag for chaos", intro: "Hang a price tag on it. How much is it worth?", set: "Hang the tag", next: "Next", finish: "Result", again: "Play again", round: "Round {n} of 6", points: "Points",
      yours: "Your price", chaos: "Chaos value", off: "{x}× too high", offLow: "{x}× too low", spot: "Spot on!", total: "You scored {p} of 600 points.", best: "Best: {n}", toy: "A silly estimating game",
      ranks: ["Pays too much", "Market stall regular", "Bargain hunter", "Viennese grouch"], note: "The values are rough and meant as a joke."
    },
    de: {
      title: "Preisschild fürs Chaos", intro: "Häng ein Preisschild dran. Wie viel ist das wert?", set: "Preisschild anhängen", next: "Weiter", finish: "Ergebnis", again: "Nochmal spielen", round: "Runde {n} von 6", points: "Punkte",
      yours: "Dein Preis", chaos: "Chaos-Wert", off: "{x}× zu hoch", offLow: "{x}× zu niedrig", spot: "Volltreffer!", total: "Du hast {p} von 600 Punkten.", best: "Bestwert: {n}", toy: "Ein Schätzspiel mit Schmäh",
      ranks: ["Zahlt immer drauf", "Markt-Stammkund:in", "Schnäppchenjäger:in", "Wiener Grantler:in"], note: "Die Werte sind grob und als Schmäh gemeint."
    }
  };
  const pt2 = (k) => (T[lang] || T.en)[k];
  const MIN = 0.1, MAX = 100000, DECADES = Math.log10(MAX / MIN);
  const euro = (v) => new Intl.NumberFormat(lang === "de" ? "de-AT" : "en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: v >= 100 ? 0 : 2, maximumFractionDigits: v >= 100 ? 0 : 2 }).format(v);
  const fromSlider = (s) => { const v = MIN * Math.pow(10, (s / 1000) * DECADES); return v < 10 ? Math.round(v * 20) / 20 : v < 100 ? Math.round(v * 2) / 2 : v < 1000 ? Math.round(v / 5) * 5 : Math.round(v / 50) * 50; };
  const toSlider = (v) => Math.round(Math.log10(v / MIN) / DECADES * 1000);
  const score = (guess, real) => { const r = Math.max(guess, real) / Math.min(guess, real); return r <= 1.1 ? 100 : Math.max(0, Math.round(100 * (1 - Math.log(r) / Math.log(20)))); };
  const best = () => { try { return +localStorage.getItem("priceBest") || 0; } catch (e) { return 0; } };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  let G = null;
  function start() { G = { items: shuffle(ITEMS).slice(0, 6), i: 0, s: 450, revealed: false, pts: 0, last: null, done: false }; }
  const itemText = (it) => (lang === "de" ? it[2] : it[4]), itemPunch = (it) => (lang === "de" ? it[3] : it[5]);
  function paint() {
    const body = document.getElementById("playBody");
    if (!G) start();
    if (G.done) { body.innerHTML = endHTML(); bind(); return; }
    const it = G.items[G.i], guess = fromSlider(G.s);
    let result = "";
    if (G.revealed) {
      const r = it[1], pts = G.last, ratio = Math.max(guess, r) / Math.min(guess, r);
      const off = ratio <= 1.1 ? pt2("spot") : (guess > r ? pt2("off") : pt2("offLow")).replace("{x}", ratio < 10 ? ratio.toFixed(1).replace(".", lang === "de" ? "," : ".") : Math.round(ratio));
      result = `<div class="pr__result"><div class="pr__row"><span>${esc(pt2("yours"))}</span><b>${esc(euro(guess))}</b></div>
        <div class="pr__row pr__row--real"><span>${esc(pt2("chaos"))}</span><b>${esc(euro(r))}</b></div>
        <p class="pr__off">${esc(off)} · <b>+${pts}</b></p><p class="pr__punch">${esc(itemPunch(it))}</p></div>`;
    }
    body.innerHTML = `<div class="pr">
      <p class="wd__roundlabel">${esc(pt2("round").replace("{n}", G.i + 1))} · ${esc(pt2("points"))}: ${G.pts}</p>
      <div class="pr__item"><span class="pr__emoji" aria-hidden="true">${it[0]}</span><h3>${esc(itemText(it))}</h3></div>
      <div class="pr__tag"><span class="pr__hole" aria-hidden="true"></span><output class="pr__price" id="prPrice">${esc(euro(guess))}</output></div>
      <input type="range" class="pr__slider" id="prSlider" min="0" max="1000" step="1" value="${G.s}" aria-label="${esc(pt2("intro"))}"${G.revealed ? " disabled" : ""}>
      <div class="pr__scale"><span>${esc(euro(MIN))}</span><span>${esc(euro(MAX))}</span></div>
      ${result}
      <div class="wd__actions">${G.revealed ? `<button type="button" class="orch__go" id="prNext">${esc(pt2(G.i === 5 ? "finish" : "next"))}</button>` : `<button type="button" class="orch__go" id="prSet">${esc(pt2("set"))}</button>`}</div>
      <p class="pr__note">${esc(pt2("note"))}</p></div>`;
    bind();
  }
  function endHTML() {
    const p = G.pts, rank = pt2("ranks")[p >= 480 ? 3 : p >= 360 ? 2 : p >= 220 ? 1 : 0];
    return `<div class="pr"><h2 class="wd__title">${esc(rank)}</h2><p class="wd__desc">${esc(pt2("total").replace("{p}", p))}</p><p class="wd__msg">${esc(pt2("best").replace("{n}", best()))}</p>
      <div class="wd__actions"><button type="button" class="orch__go" id="prAgain">${esc(pt2("again"))}</button></div></div>`;
  }
  function bind() {
    const $ = (id) => document.getElementById(id);
    const slider = $("prSlider");
    if (slider && !slider.disabled) slider.addEventListener("input", () => { G.s = +slider.value; $("prPrice").textContent = euro(fromSlider(G.s)); sfx.tick(G.s / 1000); });
    const set = $("prSet");
    if (set) set.addEventListener("click", () => {
      const it = G.items[G.i], pts = score(fromSlider(G.s), it[1]);
      G.last = pts; G.pts += pts; G.revealed = true; sfx.lock(); setTimeout(() => sfx.score(pts), 120); paint();
    });
    const next = $("prNext");
    if (next) next.addEventListener("click", () => {
      sfx.click();
      if (G.i === 5) {
        G.done = true;
        if (G.pts > best()) { try { localStorage.setItem("priceBest", String(G.pts)); } catch (e) {} }
        if (G.pts >= 450) unlock("haggler");
        paint(); return;
      }
      G.i++; G.s = 450; G.revealed = false; G.last = null; paint();
    });
    const again = $("prAgain");
    if (again) again.addEventListener("click", () => { sfx.click(); start(); paint(); });
  }
  const art = `<svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
    <path d="M14 30l28-14 24 24-22 24-30-8z" style="fill:var(--yellow)"/><circle cx="26" cy="32" r="3.5" style="fill:var(--surface)"/>
    <text x="40" y="49" text-anchor="middle" transform="rotate(-8 40 49)" style="font:800 20px sans-serif;fill:#1b1a2a">€?</text></svg>`;
  PLAY_GAMES.push({
    id: "price", hash: "price", title: { en: T.en.title, de: T.de.title }, art,
    note: () => (best() ? pt2("best").replace("{n}", best()) : pt2("toy")), layout: "plain",
    render: () => { if (!G) start(); paint(); }, state: () => G
  });
})();
