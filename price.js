/* ============ Was kost' die Welt? / What does it cost? ============
   Real prices from Vienna. You guess what something costs today; where we know the price from a few years ago, it is shown as a hint
   ("In September 2021 it cost …"), and after your guess you see how much prices have risen.
   Sources: AK Wien Preismonitor "Warenkorb Wien" (March 2026 and September 2021, cheapest product, average of Billa, Billa Plus, Spar, Interspar, Hofer, Lidl, Penny;
   licence CC BY-SA 4.0), BILLA Online Shop (1 October 2026, regular price), wienkultur.info "Preise Wiener Melange" (September 2026 and September 2020, without guarantee).
   Six rounds, up to 100 points each (log scale, so "twice as much" and "half as much" count the same). Photos: Wikimedia Commons, credits in assets/img/price/CREDITS.md. */
(() => {
  const AK = "AK Wien Preismonitor Warenkorb Wien, 03/2026 und 09/2021 (billigstes Produkt, Durchschnitt Wiener Supermärkte und Diskonter), CC BY-SA 4.0";
  const AK_EN = "AK Vienna price monitor “Warenkorb Wien”, 03/2026 and 09/2021 (cheapest product, average of Viennese supermarkets and discounters), CC BY-SA 4.0";
  const CREDITS = {"kartoffeln": {"by": "Johann Jaritz", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Poertschach_Stillleben_Kraeutersalz_und_Kartoffeln_02022015_9410.jpg"}, "aepfel": {"by": "Abhijit Tembhekar from Mumbai, India", "lic": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Red_Apple.jpg"}, "bananen": {"by": "Tim Reckmann from Hamm, Deutschland", "lic": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Bananen_(14443890233).jpg"}, "tomaten": {"by": "User:Luigi Chiesa", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Pomodorini_sulla_pianta.jpg"}, "gurke": {"by": "Dr. Jan Hinrichs-Berger, Landwirtschaftliches Technologiezen", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Cucumis_sativus_-_St%C3%A4ngelbrand_-_Stagonosporopsis_cucurbitacearum-1-Hinrichs-Berger.jpg"}, "flaschenbier": {"by": "Scott A. Miller", "lic": "CC BY 3.0", "page": "https://commons.wikimedia.org/wiki/File:Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg"}, "dosenbier": {"by": "Habib M'henni", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Berber_limited_Edition,_2019.jpg"}, "orangensaft": {"by": "Shixart1985", "lic": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Freshly_squeezed_juice_on_a_kitchen_counter_with_a_person_writing_notes_while_surrounded_by_fruit.jpg"}, "weisswein": {"by": "Merlin Bungart", "lic": "CC BY 2.5", "page": "https://commons.wikimedia.org/wiki/File:Whitewine_-_South_Africa.jpg"}, "rotwein": {"by": "congerdesign", "lic": "CC0", "page": "https://commons.wikimedia.org/wiki/File:Bottle_and_glass_of_red_wine.jpg"}, "butter": {"by": "Jacek Halicki", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:2023_Mas%C5%82o_w_maselniczce.jpg"}, "gouda": {"by": "Guy Waterval", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Fontal_suisse1.JPG"}, "ei": {"by": "Evan-Amos", "lic": "Public domain", "page": "https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg"}, "brot": {"by": "No machine-readable author provided. Rainer Zenz assumed (ba", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Mischbrot-1.jpg"}, "reis": {"by": "cookbookman17", "lic": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Basmati_Rice_India,_raw.jpg"}, "mehl": {"by": "Veganbaking.net from USA", "lic": "CC BY-SA 2.0", "page": "https://commons.wikimedia.org/wiki/File:All-Purpose_Flour_(4107895947).jpg"}, "zucker": {"by": "Dietmar Rabich", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:W%C3%BCrfelzucker_--_2018_--_3582.jpg"}, "schoko": {"by": "Ubcule", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Milka_Alpine_Milk_Chocolate_bar_100g.jpg"}, "kaffee": {"by": "Christian Schnettelker from Essen, Deutschland", "lic": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Coffee_Beans_Kaffeebohnen_II_(11477597236).jpg"}, "penne": {"by": "BPARiedl", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Nudeln_trocken_makro.jpg"}, "passata": {"by": "Tabby", "lic": "CC0", "page": "https://commons.wikimedia.org/wiki/File:Tomato_passata.jpg"}, "sonnenblumenoel": {"by": "torange.biz", "lic": "CC BY 4.0", "page": "https://commons.wikimedia.org/wiki/File:Sunflower_oil_and_sunflower.jpg"}, "pizza": {"by": "Pannet", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Frozen_pizzas_03.jpg"}, "fischstaebchen": {"by": "Superbass", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Fishfinger_classic_frozen_1.jpg"}, "pommes": {"by": "Tony Webster from Minneapolis, Minnesota, United States", "lic": "CC BY-SA 2.0", "page": "https://commons.wikimedia.org/wiki/File:Truffle_oil_french_fries_(33024792848).jpg"}, "semmel": {"by": "Kobako", "lic": "CC BY-SA 2.5", "page": "https://commons.wikimedia.org/wiki/File:Kaisersemmel-.jpg"}, "cola15": {"by": "Shahroozporia", "lic": "CC0", "page": "https://commons.wikimedia.org/wiki/File:Coca-Cola_6_bottle_pack.JPG"}, "almdudler": {"by": "Loimo", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Almdudlerflaschen.jpg"}, "nutella": {"by": "Lenore Edman from Sunnyvale, CA", "lic": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Sconic_Sections_toppings_(9124751290).jpg"}, "manner": {"by": "Debbie Tingzon", "lic": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Manner_Neapolitaner_(Swiss_Chocolate_Wafers).jpg"}, "stiegl": {"by": "FakirNL", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Stiegl_Gold.jpg"}, "raimund": {"by": "Manfred Werner (Tsui)", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Caf%C3%A9_Raimund_2018_Wien.jpg"}, "ministerium": {"by": "ThomasTiroch", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Caf%C3%A9_Ministerium_(Wien_I)_%E2%80%94_Au%C3%9Fenansicht_2013-06-05.jpg"}, "pruckel": {"by": "Andreas Poeschek, viennaphoto.at", "lic": "CC BY-SA 2.0 at", "page": "https://commons.wikimedia.org/wiki/File:Cafe-prueckel-eingang.jpg"}, "palmenhaus": {"by": "Aconcagua", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Wien_Burggarten_Palmenhaus.jpg"}, "korb": {"by": "Invisigoth67", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Wien_Cafe_Korb.jpg"}, "diglas": {"by": "Loimo", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Caf%C3%A9_Diglas,_Wien,_Januar_2018.jpg"}, "schwarzenberg": {"by": "Andreas Faessler", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Cafe_schwarzenberg.jpg"}, "frauenhuber": {"by": "Zyance", "lic": "CC BY-SA 2.5", "page": "https://commons.wikimedia.org/wiki/File:Frauenhuber_z03.JPG"}, "museum": {"by": "Gerd Eichmann", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Wien-Operngasse-02-Nr_7-Cafe_Museum-2007-gje.jpg"}, "mozart": {"by": "Zyance", "lic": "CC BY-SA 2.5", "page": "https://commons.wikimedia.org/wiki/File:CafeMozart_z02.JPG"}, "melange": {"by": "Dr. Bernd Gross", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Wiener_Melange_2.JPG"}};

  /* AK basket: [id, emoji, photo, name DE, name EN, unit DE, unit EN, price 09/2021, price 03/2026] */
  const BASKET = [
    ["kartoffeln", "🥔", "kartoffeln", "Kartoffeln", "Potatoes", "1 kg", "1 kg", 0.56, 0.73], ["aepfel", "🍎", "aepfel", "Tafeläpfel", "Apples", "1 kg", "1 kg", 1.24, 1.51],
    ["bananen", "🍌", "bananen", "Bananen", "Bananas", "1 kg", "1 kg", 1.35, 1.65], ["tomaten", "🍅", "tomaten", "Tomaten", "Tomatoes", "1 kg", "1 kg", 1.58, 2.49],
    ["gurke", "🥒", "gurke", "Salatgurke", "Cucumber", "1 Stück", "1 piece", 1.02, 1.60], ["wasser", "💧", null, "Mineralwasser mit Kohlensäure", "Sparkling mineral water", "1 L", "1 L", 0.18, 0.27],
    ["flaschenbier", "🍺", "flaschenbier", "Flaschenbier", "Bottled beer", "0,5 L", "0.5 L", 0.68, 0.76], ["dosenbier", "🍺", "dosenbier", "Dosenbier", "Canned beer", "0,5 L", "0.5 L", 0.46, 0.56],
    ["orangensaft", "🍊", "orangensaft", "Orangensaft", "Orange juice", "1 L", "1 L", 0.89, 1.86], ["cola", "🥤", null, "Cola-Getränk in der PET-Flasche", "Cola in a PET bottle", "1 L", "1 L", 0.24, 0.42],
    ["weisswein", "🍷", "weisswein", "Weißwein in der Glasflasche", "White wine in a glass bottle", "1 L", "1 L", 2.39, 3.42], ["rotwein", "🍷", "rotwein", "Rotwein in der Glasflasche", "Red wine in a glass bottle", "1 L", "1 L", 2.39, 3.12],
    ["vollmilch", "🥛", null, "Vollmilch", "Whole milk", "1 L", "1 L", 1.05, 1.39], ["teebutter", "🧈", "butter", "Teebutter", "Butter", "1 kg", "1 kg", 5.85, 5.96],
    ["joghurt", "🥣", null, "Fruchtjoghurt", "Fruit yoghurt", "1 kg", "1 kg", 1.66, 2.40], ["gouda", "🧀", "gouda", "Gouda, verpackt", "Gouda, packed", "1 kg", "1 kg", 5.26, 7.27],
    ["ei", "🥚", "ei", "Ei, Größe M", "Egg, size M", "1 Stück", "1 piece", 0.16, 0.27], ["brot", "🍞", "brot", "Mischbrotwecken", "Mixed-grain loaf", "1 kg", "1 kg", 1.23, 1.63],
    ["reis", "🍚", "reis", "Langkornreis", "Long-grain rice", "1 kg", "1 kg", 0.79, 1.25], ["mehl", "🌾", "mehl", "Weizenmehl, griffig", "Wheat flour", "1 kg", "1 kg", 0.40, 0.74],
    ["zucker", "🍬", "zucker", "Feinkristallzucker", "Granulated sugar", "1 kg", "1 kg", 0.78, 0.99], ["schoko", "🍫", "schoko", "Vollmilchschokolade", "Milk chocolate", "100 g", "100 g", 0.55, 0.89],
    ["kaffee", "☕", "kaffee", "Bohnenkaffee, gemahlen", "Ground coffee", "1 kg", "1 kg", 4.09, 10.27], ["marille", "🍑", null, "Marillenmarmelade", "Apricot jam", "1 kg", "1 kg", 1.53, 2.65],
    ["penne", "🍝", "penne", "Penne", "Penne pasta", "1 kg", "1 kg", 0.78, 1.35], ["passata", "🍅", "passata", "Passierte Tomaten", "Passata", "1 kg", "1 kg", 0.74, 1.38],
    ["sonnenblumenoel", "🌻", "sonnenblumenoel", "Sonnenblumenöl", "Sunflower oil", "1 L", "1 L", 1.19, 1.79], ["essig", "🫙", null, "Tafelessig", "Table vinegar", "1 L", "1 L", 0.37, 0.69],
    ["pizza", "🍕", "pizza", "Tiefkühlpizza Margherita", "Frozen pizza Margherita", "1 kg", "1 kg", 2.72, 4.41], ["fischstaebchen", "🐟", "fischstaebchen", "Fischstäbchen, tiefgekühlt", "Fish fingers, frozen", "1 kg", "1 kg", 4.42, 5.82],
    ["pommes", "🍟", "pommes", "Pommes frites, tiefgekühlt", "French fries, frozen", "1 kg", "1 kg", 1.12, 1.50]
  ];
  /* BILLA Online Shop, 1 October 2026: [id, emoji, photo, name DE, name EN, unit DE, unit EN, price] */
  const BILLA = [
    ["billa-semmel", "🥖", "semmel", "Ja! Natürlich Bio-Kaisersemmel", "Ja! Natürlich organic Kaisersemmel", "1 Stück (65 g)", "1 roll (65 g)", 0.42],
    ["billa-cola", "🥤", "cola15", "Coca-Cola, 1,5-Liter-Flasche (ohne Pfand)", "Coca-Cola, 1.5 L bottle (excl. deposit)", "1,5 L", "1.5 L", 2.49],
    ["billa-almdudler", "🥤", "almdudler", "Almdudler, 1-Liter-Flasche (ohne Pfand)", "Almdudler, 1 L bottle (excl. deposit)", "1 L", "1 L", 1.99],
    ["billa-nutella", "🍫", "nutella", "Nutella, 400 g", "Nutella, 400 g", "1 Glas", "1 jar", 4.17],
    ["billa-manner", "🍫", "manner", "Manner Neapolitaner, 75 g", "Manner Neapolitaner wafers, 75 g", "1 Packung", "1 pack", 1.69],
    ["billa-butter", "🧈", "butter", "Schärdinger Sommerbutter, 250 g", "Schärdinger summer butter, 250 g", "1 Stück", "1 block", 2.66],
    ["billa-eier", "🥚", null, "Ja! Natürlich Bio-Eier, Größe L", "Ja! Natürlich organic eggs, size L", "6 Stück", "6 eggs", 3.99],
    ["billa-milch", "🥛", null, "nöm Vollmilch länger frisch", "nöm whole milk, longer-lasting", "1 L", "1 L", 1.66],
    ["billa-stiegl", "🍺", "stiegl", "Stiegl Goldbräu, 12er-Packung (Einweg)", "Stiegl Goldbräu, pack of 12 (single-use)", "12 × 0,33 L", "12 × 0.33 L", 10.32]
  ];
  /* Melange in a Viennese coffee house (wienkultur.info): [id, café, address, photo, price 09/2020, price 09/2026] */
  const CAFES = [
    ["alt-wien", "Kaffee Alt Wien", "Bäckerstraße 9", null, 3.60, 4.20], ["raimund", "Café Raimund", "Museumstraße 6", "raimund", 3.80, 4.70], ["bellaria", "Café Bellaria", "Bellariastraße 6", null, 3.90, 4.80],
    ["ministerium", "Café Ministerium", "Georg-Coch-Platz 4", "ministerium", 3.60, 4.90], ["pruckel", "Café Prückel", "Stubenring 24", "pruckel", 4.60, 4.90], ["palmenhaus", "Café Palmenhaus", "Burggarten 1", "palmenhaus", 3.90, 5.60],
    ["korb", "Café Korb", "Brandstätte 9", "korb", 4.10, 5.60], ["einstein", "Café Einstein", "Rathausplatz 4", null, 3.90, 5.90], ["diglas", "Café Diglas", "Wollzeile 10", "diglas", 4.60, 5.90],
    ["schwarzenberg", "Café Schwarzenberg", "Kärntner Ring 17", "schwarzenberg", 4.80, 6.90], ["frauenhuber", "Café Frauenhuber", "Himmelpfortgasse 6", "frauenhuber", 4.90, 6.90],
    ["museum", "Café Museum", "Operngasse 7", "museum", 5.50, 6.90], ["mozart", "Café Mozart", "Albertinaplatz 2", "mozart", 5.90, 6.90], ["landtmann", "Café Landtmann", "Universitätsring 4", null, 5.90, 6.90]
  ];
  const T = {
    en: {
      title: "What does it cost?", toy: "Real prices from Vienna", set: "Set the price", next: "Next", finish: "Result", again: "Play again", round: "Round {n} of 6", points: "Points",
      ask: "What does it cost today?", hint: "To help you: in {w} it cost {p}.", yours: "Your price", real: "Real price today", thenLabel: "In {w}",
      off: "{x}× too high", offLow: "{x}× too low", spot: "Spot on!", rise: "{p} % more than in {w}.", fall: "{p} % less than in {w}.", same: "About the same as in {w}.",
      total: "You scored {p} of 600 points.", best: "Best: {n}", ranks: ["Pays too much", "Market regular", "Bargain hunter", "Price oracle"], src: "Source", photo: "Photo",
      w21: "September 2021", w20: "September 2020", cafeName: "Melange at {c}", cafeUnit: "1 cup"
    },
    de: {
      title: "Was kost' die Welt?", toy: "Echte Preise aus Wien", set: "Preis festlegen", next: "Weiter", finish: "Ergebnis", again: "Nochmal spielen", round: "Runde {n} von 6", points: "Punkte",
      ask: "Was kostet das heute?", hint: "Zur Orientierung: Im {w} hat es {p} gekostet.", yours: "Dein Preis", real: "Echter Preis heute", thenLabel: "Im {w}",
      off: "{x}× zu hoch", offLow: "{x}× zu niedrig", spot: "Volltreffer!", rise: "{p} % mehr als im {w}.", fall: "{p} % weniger als im {w}.", same: "Etwa gleich viel wie im {w}.",
      total: "Du hast {p} von 600 Punkten.", best: "Bestwert: {n}", ranks: ["Zahlt immer drauf", "Markt-Stammkund:in", "Schnäppchenjäger:in", "Preis-Orakel"], src: "Quelle", photo: "Foto",
      w21: "September 2021", w20: "September 2020", cafeName: "Melange im {c}", cafeUnit: "1 Häferl"
    }
  };
  const L = (k) => (T[lang] || T.en)[k];
  const MIN = 0.05, MAX = 25, DECADES = Math.log10(MAX / MIN);
  const euro = (v) => new Intl.NumberFormat(lang === "de" ? "de-AT" : "en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
  const fromSlider = (s) => { const v = MIN * Math.pow(10, (s / 1000) * DECADES); return v < 1 ? Math.round(v * 100) / 100 : v < 10 ? Math.round(v * 20) / 20 : Math.round(v * 10) / 10; };
  const score = (guess, real) => { const r = Math.max(guess, real) / Math.min(guess, real); return r <= 1.06 ? 100 : Math.max(0, Math.round(100 * (1 - Math.log(r) / Math.log(5)))); };
  const best = () => { try { return +localStorage.getItem("priceBest2") || 0; } catch (e) { return 0; } };
  const shuffle = (a, r = Math.random) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const pick = (arr, n, r) => shuffle(arr, r).slice(0, n);
  const de = () => lang === "de";

  /* a round: { mode: "now" | "then", name, unit, emoji, photo, now, then, when, source, kind } */
  function basketRound(it) {
    return { kind: "ak", emoji: it[1], photo: it[2], name: de() ? it[3] : it[4], unit: de() ? it[5] : it[6], then: it[7], now: it[8], when: L("w21"), source: de() ? AK : AK_EN };
  }
  function billaRound(it) {
    return { kind: "billa", emoji: it[1], photo: it[2], name: de() ? it[3] : it[4], unit: de() ? it[5] : it[6], now: it[7], source: de() ? "BILLA Online Shop, 1. Oktober 2026, regulärer Preis" : "BILLA Online Shop, 1 October 2026, regular price" };
  }
  function cafeRound(c) {
    return { kind: "cafe", emoji: "☕", photo: c[3] || "melange", name: L("cafeName").replace("{c}", c[1]) + " (" + c[2] + ")", unit: L("cafeUnit"), then: c[4], now: c[5], when: L("w20"),
      source: de() ? "wienkultur.info, Preise Wiener Melange, Stand 09/2026 und 09/2020 (ohne Gewähr)" : "wienkultur.info, Melange prices, as of 09/2026 and 09/2020 (without guarantee)" };
  }
  let G = null;
  function start(mode = "endless") {
    const r = mode === "daily" ? DAILY.rng(DAILY.seed("price")) : Math.random;
    const ak = pick(BASKET, 3, r), billa = pick(BILLA, 1, r), cafes = pick(CAFES, 2, r);
    const rounds = shuffle([() => billaRound(billa[0]), () => basketRound(ak[0]), () => cafeRound(cafes[0]), () => cafeRound(cafes[1]), () => basketRound(ak[1]), () => basketRound(ak[2])], r); // built when shown, so a language switch applies
    G = { mode, rounds, i: 0, s: 450, revealed: false, pts: 0, last: null, done: false };
  }
  const shareText = () => `${L("title")} #${DAILY.number()} · ${G.pts}/600\nhttps://crysker.github.io/play.html#price`;
  const choose = () => DAILY.chooser("price", 6, (mode, saved) => {
    if (saved) G = { mode: "daily", done: true, pts: saved.pts }; else start(mode);
    paint();
  });
  function photoHTML(r) {
    if (!r.photo) return `<span class="pr__emoji" aria-hidden="true">${r.emoji}</span>`;
    const c = CREDITS[r.photo];
    return `<figure class="pr__photo"><img src="assets/img/price/${r.photo}.jpg" alt="" loading="lazy" width="320" height="200">${c ? `<figcaption>${esc(L("photo"))}: ${esc(c.by)}, ${esc(c.lic)}, <a href="${esc(c.page)}" target="_blank" rel="noopener">Wikimedia Commons</a></figcaption>` : ""}</figure>`;
  }
  function paint() {
    const body = document.getElementById("playBody");
    if (!G) { choose(); return; }
    if (G.done) { body.innerHTML = endHTML(); bind(); return; }
    const r = G.rounds[G.i](), guess = fromSlider(G.s), target = r.now, hasThen = r.then !== undefined;
    const hint = hasThen && !G.revealed ? L("hint").replace("{w}", r.when).replace("{p}", euro(r.then)) : "";
    let result = "";
    if (G.revealed) {
      const ratio = Math.max(guess, target) / Math.min(guess, target);
      const off = ratio <= 1.06 ? L("spot") : (guess > target ? L("off") : L("offLow")).replace("{x}", ratio < 10 ? ratio.toFixed(1).replace(".", de() ? "," : ".") : Math.round(ratio));
      let change = "";
      if (hasThen) {
        const pct = Math.round((r.now / r.then - 1) * 100);
        change = `<p class="pr__change">${esc(pct > 1 ? L("rise").replace("{p}", pct) : pct < -1 ? L("fall").replace("{p}", Math.abs(pct)) : L("same")).replace("{w}", esc(r.when))}</p>`;
      }
      result = `<div class="pr__result"><div class="pr__row"><span>${esc(L("yours"))}</span><b>${esc(euro(guess))}</b></div>
        <div class="pr__row pr__row--real"><span>${esc(L("real"))}</span><b>${esc(euro(target))}</b></div>
        ${hasThen ? `<div class="pr__row"><span>${esc(L("thenLabel").replace("{w}", r.when))}</span><b>${esc(euro(r.then))}</b></div>` : ""}
        <p class="pr__off">${esc(off)} · <b>+${G.last}</b></p>${change}<p class="pr__src">${esc(L("src"))}: ${esc(r.source)}</p></div>`;
    }
    body.innerHTML = `<div class="pr">
      <p class="wd__roundlabel">${esc(L("round").replace("{n}", G.i + 1))} · ${esc(L("points"))}: ${G.pts}</p>
      <div class="pr__item">${photoHTML(r)}<div><h3>${esc(r.name)}</h3><p class="pr__unit">${esc(r.unit)}</p></div></div>
      <p class="wd__desc">${esc(L("ask"))}</p>
      ${hint ? `<p class="pr__hint">💡 ${esc(hint)}</p>` : ""}
      <div class="pr__tag"><span class="pr__hole" aria-hidden="true"></span><output class="pr__price" id="prPrice">${esc(euro(guess))}</output></div>
      <input type="range" class="pr__slider" id="prSlider" min="0" max="1000" step="1" value="${G.s}" aria-label="${esc(L("ask"))}"${G.revealed ? " disabled" : ""}>
      <div class="pr__scale"><span>${esc(euro(MIN))}</span><span>${esc(euro(MAX))}</span></div>
      ${result}
      <div class="wd__actions">${G.revealed ? `<button type="button" class="orch__go" id="prNext">${esc(L(G.i === 5 ? "finish" : "next"))}</button>` : `<button type="button" class="orch__go" id="prSet">${esc(L("set"))}</button>`}</div></div>`;
    bind();
  }
  function endHTML() {
    const p = G.pts, rank = L("ranks")[p >= 480 ? 3 : p >= 360 ? 2 : p >= 220 ? 1 : 0];
    return `<div class="pr"><h2 class="wd__title">${esc(rank)}</h2><p class="wd__desc">${esc(L("total").replace("{p}", p))}</p><p class="wd__msg">${esc(L("best").replace("{n}", best()))}</p>
      ${G.mode === "daily" ? DAILY.extras("price", G, shareText()) : `<div class="wd__actions"><button type="button" class="orch__go" id="prAgain">${esc(L("again"))}</button></div>`}</div>`;
  }
  function bind() {
    const $ = (id) => document.getElementById(id);
    const slider = $("prSlider");
    if (slider && !slider.disabled) slider.addEventListener("input", () => { G.s = +slider.value; $("prPrice").textContent = euro(fromSlider(G.s)); sfx.tick(G.s / 1000); });
    const set = $("prSet");
    if (set) set.addEventListener("click", () => {
      const r = G.rounds[G.i](), pts = score(fromSlider(G.s), r.now);
      G.last = pts; G.pts += pts; G.revealed = true; sfx.lock(); setTimeout(() => sfx.score(pts), 120); paint();
    });
    const next = $("prNext");
    if (next) next.addEventListener("click", () => {
      sfx.click();
      if (G.i === 5) {
        G.done = true;
        if (G.mode === "daily") DAILY.record("price", G.pts);
        if (G.pts > best()) { try { localStorage.setItem("priceBest2", String(G.pts)); } catch (e) {} }
        if (G.pts >= 450) unlock("haggler");
        paint(); return;
      }
      G.i++; G.s = 450; G.revealed = false; G.last = null; paint();
    });
    const again = $("prAgain");
    if (again) again.addEventListener("click", () => { sfx.click(); start(); paint(); });
    DAILY.bindExtras(() => { start("endless"); paint(); });
  }
  const art = `<svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
    <path d="M14 30l28-14 24 24-22 24-30-8z" style="fill:var(--yellow)"/><circle cx="26" cy="32" r="3.5" style="fill:var(--surface)"/>
    <text x="40" y="49" text-anchor="middle" transform="rotate(-8 40 49)" style="font:800 20px sans-serif;fill:#1b1a2a">€?</text></svg>`;
  PLAY_GAMES.push({
    id: "price", hash: "price", title: { en: T.en.title, de: T.de.title }, art,
    note: () => (!DAILY.played("price") ? dt("open") : best() ? L("best").replace("{n}", best()) : L("toy")), layout: "plain",
    render: () => paint(), stop: () => { if (G && G.done) G = null; }, state: () => G
  });
})();
