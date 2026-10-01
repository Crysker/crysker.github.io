/* ============ Zwei Wahrheiten, eine Lüge / Two truths, one lie ============
   Three statements on a theme: two are true, one is made up (or a famous myth). Find the lie, then say how sure you are.
   Points: right = your confidence (1 to 3), wrong = minus (confidence − 1). Six rounds. Everything is hand-written with a source. */
(() => {
  /* each statement: [emoji, German, English, true?, explanation DE, explanation EN, source] */
  const SETS = [
    { t: ["Tiere", "Animals"], s: [
      ["🐙", "Ein Oktopus hat drei Herzen.", "An octopus has three hearts.", true, "Zwei pumpen das Blut durch die Kiemen, eines versorgt den Körper.", "Two pump blood through the gills, one supplies the body.", "Smithsonian"],
      ["🦒", "Eine Giraffe hat gleich viele Halswirbel wie ein Mensch.", "A giraffe has as many neck vertebrae as a human.", true, "Beide haben sieben, bei der Giraffe sind sie nur riesig.", "Both have seven; the giraffe's are just enormous.", "National Geographic"],
      ["🦩", "Flamingos sind von Geburt an rosa.", "Flamingos are pink from birth.", false, "Küken sind grau. Rosa werden sie durch Farbstoffe in ihrer Nahrung.", "Chicks are grey. They turn pink from pigments in their food.", "Smithsonian's National Zoo"]] },
    { t: ["Körper", "Body"], s: [
      ["🦴", "Babys haben mehr Knochen als Erwachsene.", "Babies have more bones than adults.", true, "Rund 300 bei der Geburt, viele wachsen zu den 206 der Erwachsenen zusammen.", "Around 300 at birth; many fuse into the adult 206.", "Britannica"],
      ["❤️", "Ein Herz schlägt in einem langen Leben mehrere Milliarden Mal.", "A heart beats several billion times in a long life.", true, "Bei etwa 70 Schlägen pro Minute sind es in 80 Jahren rund 3 Milliarden.", "At about 70 beats a minute that is roughly 3 billion in 80 years.", "Rechnung / Berechnung"],
      ["💇", "Haare und Fingernägel wachsen nach dem Tod weiter.", "Hair and nails keep growing after death.", false, "Die Haut zieht sich zusammen, dadurch wirken sie länger. Gewachsen ist nichts.", "The skin shrinks back, which makes them look longer. Nothing grew.", "Scientific American"]] },
    { t: ["Österreich", "Austria"], s: [
      ["🚂", "Die Semmeringbahn ist UNESCO-Welterbe.", "The Semmering railway is a UNESCO World Heritage Site.", true, "Sie wurde 1998 als erste Bahn der Welt ins Welterbe aufgenommen.", "In 1998 it became the first railway in the world on the list.", "UNESCO"],
      ["🥩", "Ein „Wiener Schnitzel“ muss in Österreich aus Kalbfleisch sein.", "A “Wiener Schnitzel” in Austria must be made of veal.", true, "Das regelt das Österreichische Lebensmittelbuch. Aus Schwein heißt es „Schnitzel Wiener Art“.", "The Austrian Food Code says so. Made of pork it is “Schnitzel Wiener Art”.", "Österreichisches Lebensmittelbuch"],
      ["🏔️", "Der Großglockner ist über 4.000 Meter hoch.", "The Grossglockner is over 4,000 metres high.", false, "Er misst 3.798 Meter und ist trotzdem der höchste Berg Österreichs.", "It measures 3,798 metres and is still Austria's highest mountain.", "BEV"]] },
    { t: ["Weltall", "Space"], s: [
      ["🪐", "Ein Tag auf der Venus ist länger als ihr Jahr.", "A day on Venus is longer than its year.", true, "Sie dreht sich in rund 243 Erdtagen einmal, umrundet die Sonne aber in 225.", "It rotates once in about 243 Earth days but orbits the Sun in 225.", "NASA"],
      ["🔇", "Im luftleeren Weltall kann man keinen Schall hören.", "You cannot hear sound in the vacuum of space.", true, "Schall braucht ein Medium wie Luft, das es im Vakuum nicht gibt.", "Sound needs a medium such as air, which a vacuum does not have.", "NASA"],
      ["🌙", "Der Mond kommt der Erde jedes Jahr ein paar Zentimeter näher.", "The Moon gets a few centimetres closer to Earth every year.", false, "Er entfernt sich um rund 3,8 Zentimeter pro Jahr.", "It moves away by about 3.8 centimetres a year.", "NASA"]] },
    { t: ["Essen", "Food"], s: [
      ["🍯", "Honig kann praktisch nie verderben.", "Honey practically never spoils.", true, "In ägyptischen Gräbern fand man jahrtausendealten Honig, der noch essbar war.", "Thousands-year-old honey found in Egyptian tombs was still edible.", "Smithsonian"],
      ["🌰", "Die Cashewnuss wächst außen an einer Frucht.", "The cashew nut grows on the outside of a fruit.", true, "Der Cashewapfel hängt über der Nuss, die in einer giftigen Schale steckt.", "The cashew apple hangs above the nut, which sits in a toxic shell.", "Britannica"],
      ["🥜", "Erdnüsse sind botanisch gesehen Nüsse.", "Peanuts are botanically nuts.", false, "Sie sind Hülsenfrüchte und wachsen unter der Erde, wie Linsen.", "They are legumes and grow underground, like lentils.", "Britannica"]] },
    { t: ["Geschichte", "History"], s: [
      ["🏺", "Kleopatra lebte näher an der Mondlandung als am Bau der Cheops-Pyramide.", "Cleopatra lived closer to the Moon landing than to the building of the Great Pyramid.", true, "Die Pyramide ist rund 2.500 v. Chr. entstanden, Kleopatra lebte um 30 v. Chr.", "The pyramid dates to about 2500 BC; Cleopatra lived around 30 BC.", "Britannica"],
      ["🎓", "Die Universität Oxford ist älter als das Aztekenreich.", "The University of Oxford is older than the Aztec Empire.", true, "In Oxford wird seit etwa 1096 gelehrt, Tenochtitlán wurde 1325 gegründet.", "Teaching began in Oxford around 1096; Tenochtitlan was founded in 1325.", "University of Oxford"],
      ["👑", "Napoleon war mit etwa 1,50 Metern ungewöhnlich klein.", "Napoleon was unusually short at about 1.50 metres.", false, "Er war etwa 1,69 Meter groß, für seine Zeit durchschnittlich.", "He was about 1.69 metres tall, average for his time.", "Britannica"]] },
    { t: ["Technik", "Tech"], s: [
      ["☕", "Die erste Webcam der Welt überwachte eine Kaffeemaschine.", "The first webcam in the world watched a coffee pot.", true, "In Cambridge sah man so 1991, ob noch Kaffee da war.", "In Cambridge in 1991 it showed whether there was still coffee.", "University of Cambridge"],
      ["🪲", "Der erste „Bug“ in der Computergeschichte war ein echter Nachtfalter.", "The first computer “bug” was a real moth.", true, "1947 steckte einer im Relais des Computers Harvard Mark II.", "In 1947 one was stuck in a relay of the Harvard Mark II.", "Smithsonian"],
      ["📱", "Das erste iPhone von 2007 hatte eine Frontkamera.", "The first iPhone from 2007 had a front camera.", false, "Nur hinten gab es eine Kamera. Die Frontkamera kam erst 2010.", "It had a camera on the back only. The front camera came in 2010.", "Apple"]] },
    { t: ["Natur", "Nature"], s: [
      ["🍌", "Bananen sind botanisch gesehen Beeren.", "Bananas are botanically berries.", true, "Erdbeeren dagegen sind keine Beeren, sondern Sammelnussfrüchte.", "Strawberries, on the other hand, are not berries.", "Britannica"],
      ["⚡", "Ein Blitz ist heißer als die Oberfläche der Sonne.", "Lightning is hotter than the surface of the Sun.", true, "Er erreicht etwa 30.000 Grad, die Sonnenoberfläche rund 5.500.", "It reaches about 30,000 degrees; the Sun's surface about 5,500.", "NOAA"],
      ["💧", "Reines Wasser leitet Strom besser als Leitungswasser.", "Pure water conducts electricity better than tap water.", false, "Es sind gelöste Salze, die den Strom leiten. Sehr reines Wasser ist ein schlechter Leiter.", "Dissolved salts conduct the current. Very pure water is a poor conductor.", "USGS"]] },
    { t: ["Sport", "Sport"], s: [
      ["🪢", "Tauziehen war einmal eine olympische Disziplin.", "Tug of war used to be an Olympic event.", true, "Von 1900 bis 1920 wurde es bei den Spielen ausgetragen.", "It was contested at the Games from 1900 to 1920.", "IOC"],
      ["⛳", "Auf dem Mond wurde schon Golf gespielt.", "Golf has been played on the Moon.", true, "Alan Shepard schlug 1971 bei Apollo 14 zwei Bälle.", "Alan Shepard hit two balls on Apollo 14 in 1971.", "NASA"],
      ["🏛️", "Die antiken Olympischen Spiele fanden in Rom statt.", "The ancient Olympic Games took place in Rome.", false, "Sie fanden in Olympia in Griechenland statt.", "They took place in Olympia in Greece.", "Britannica"]] },
    { t: ["Sprache", "Language"], s: [
      ["⏳", "„Quarantäne“ kommt vom italienischen Wort für vierzig.", "“Quarantine” comes from the Italian word for forty.", true, "„Quaranta giorni“ meint 40 Tage, so lange mussten Schiffe in Venedig warten.", "“Quaranta giorni” means 40 days, how long ships waited in Venice.", "Merriam-Webster"],
      ["🧂", "Das Wort „Salär“ hat mit Salz zu tun.", "The word “salary” has to do with salt.", true, "Es geht auf das lateinische „sal“ zurück, Salz war früher ein wertvoller Lohn.", "It goes back to Latin “sal”; salt was once a valuable wage.", "Britannica"],
      ["🤖", "Das Wort „Roboter“ kommt vom englischen Namen „Robert“.", "The word “robot” comes from the English name “Robert”.", false, "Es stammt vom tschechischen „robota“ für Zwangsarbeit, geprägt von Karel Čapek.", "It comes from Czech “robota”, forced labour, coined by Karel Čapek.", "Britannica"]] },
    { t: ["Meer", "Sea"], s: [
      ["🌊", "Der Marianengraben ist tiefer, als der Mount Everest hoch ist.", "The Mariana Trench is deeper than Mount Everest is high.", true, "Rund 10.900 Meter Tiefe gegen 8.849 Meter Höhe.", "About 10,900 metres deep against 8,849 metres high.", "NOAA"],
      ["⭐", "Seesterne haben kein Gehirn.", "Starfish have no brain.", true, "Ihr Nervensystem verläuft ringförmig durch den ganzen Körper.", "Their nervous system runs as a ring through the whole body.", "NOAA"],
      ["🦈", "Alle Haie ersticken, wenn sie aufhören zu schwimmen.", "All sharks suffocate if they stop swimming.", false, "Manche Arten pumpen Wasser über die Kiemen und können ruhen.", "Some species pump water over their gills and can rest.", "Smithsonian"]] },
    { t: ["Wien", "Vienna"], s: [
      ["🎡", "Das Wiener Riesenrad steht seit 1897.", "The Vienna Giant Ferris Wheel has stood since 1897.", true, "Es wurde zum Jubiläum von Kaiser Franz Joseph gebaut.", "It was built for the jubilee of Emperor Franz Joseph.", "wien.info"],
      ["🍇", "Es gibt Weinberge innerhalb der Wiener Stadtgrenzen.", "There are vineyards within the Vienna city limits.", true, "Wien ist eine der wenigen Weltstädte mit eigenem Weinbau.", "Vienna is one of the few world cities with its own wine growing.", "Stadt Wien"],
      ["🏰", "Der Bundeskanzler hat seinen Amtssitz in der Hofburg.", "The Federal Chancellor has their office in the Hofburg.", false, "In der Hofburg sitzt der Bundespräsident. Der Kanzler sitzt am Ballhausplatz.", "The Federal President sits in the Hofburg. The Chancellor sits on Ballhausplatz.", "Bundeskanzleramt"]] },
    { t: ["Musik", "Music"], s: [
      ["🎹", "Mozart komponierte schon als Fünfjähriger.", "Mozart was composing at the age of five.", true, "Erste Stücke sind aus dieser Zeit überliefert.", "His first pieces are recorded from that time.", "Mozarteum"],
      ["🎼", "Beethoven schrieb seine Neunte Sinfonie fast taub.", "Beethoven wrote his Ninth Symphony almost deaf.", true, "Bei der Uraufführung 1824 hörte er den Applaus nicht mehr.", "At the 1824 premiere he could not hear the applause.", "Beethoven-Haus Bonn"],
      ["🎻", "Das Wiener Neujahrskonzert findet im Stephansdom statt.", "The Vienna New Year's Concert takes place in St. Stephen's Cathedral.", false, "Es wird im Goldenen Saal des Wiener Musikvereins gespielt.", "It is played in the Golden Hall of the Vienna Musikverein.", "Wiener Philharmoniker"]] },
    { t: ["Zahlen", "Numbers"], s: [
      ["⏱️", "Eine Million Sekunden sind etwa 11,5 Tage.", "One million seconds are about 11.5 days.", true, "1.000.000 geteilt durch 86.400 ergibt rund 11,6.", "1,000,000 divided by 86,400 is about 11.6.", "Rechnung / Calculation"],
      ["🕰️", "Eine Milliarde Sekunden sind etwa 31,7 Jahre.", "One billion seconds are about 31.7 years.", true, "Das sind rund 11.574 Tage.", "That is about 11,574 days.", "Rechnung / Calculation"],
      ["♾️", "Eine Billion (10¹²) Sekunden sind etwa 3.170 Jahre.", "One trillion (10¹²) seconds are about 3,170 years.", false, "Es sind rund 31.700 Jahre, also das Zehnfache.", "It is about 31,700 years, ten times as much.", "Rechnung / Calculation"]] },
    { t: ["Geografie", "Geography"], s: [
      ["🧭", "Russland und die USA liegen an einer Stelle nur etwa 4 km auseinander.", "Russia and the USA are only about 4 km apart at one point.", true, "Zwischen den Diomedes-Inseln in der Beringstraße.", "Between the Diomede Islands in the Bering Strait.", "National Geographic"],
      ["🏜️", "Saudi-Arabien hat keinen einzigen dauerhaft wasserführenden Fluss.", "Saudi Arabia has no permanently flowing river.", true, "Es gibt nur Wadis, die meist trocken sind.", "There are only wadis, which are mostly dry.", "Britannica"],
      ["🌏", "Australien ist flächenmäßig größer als Europa.", "Australia is larger in area than Europe.", false, "Europa hat rund 10,2 Millionen km², Australien rund 7,7.", "Europe is about 10.2 million km², Australia about 7.7.", "Britannica"]] },
    { t: ["Alltag", "Everyday"], s: [
      ["📄", "Faltet man ein Blatt Papier 42-mal, wäre es theoretisch dick genug bis zum Mond.", "Fold a sheet of paper 42 times and it would theoretically reach the Moon.", true, "Jede Faltung verdoppelt die Dicke: 0,1 mm × 2⁴² sind rund 440.000 km.", "Each fold doubles the thickness: 0.1 mm × 2⁴² is about 440,000 km.", "Rechnung / Calculation"],
      ["🪮", "Ein Mensch verliert jeden Tag etwa 50 bis 100 Haare.", "A person loses about 50 to 100 hairs a day.", true, "Das ist ganz normal und wächst nach.", "That is perfectly normal, and they grow back.", "American Academy of Dermatology"],
      ["🧠", "Wir nutzen nur etwa 10 % unseres Gehirns.", "We only use about 10 % of our brain.", false, "Ein Mythos. Bildgebende Verfahren zeigen, dass wir praktisch alle Bereiche nutzen.", "A myth. Brain imaging shows we use virtually all regions.", "Scientific American"]] }
  ];
  const T = {
    en: {
      title: "Two truths, one lie", intro: "Two of these are true, one is a lie. Which one?", sure: "How sure are you?", sures: ["Gut feeling", "Fairly sure", "100 %"], next: "Next", finish: "Result", again: "Play again",
      round: "Round {n} of 6", pts: "Points", right: "Right!", wrong: "That was a truth. The lie was another one.", truth: "True", lie: "Lie", total: "You got {p} points (max. 18).", best: "Best: {n}", toy: "Find the lie",
      ranks: ["Easy to fool", "Careful reader", "Sharp nose", "Lie detector"], src: "Source"
    },
    de: {
      title: "Zwei Wahrheiten, eine Lüge", intro: "Zwei davon stimmen, eine ist gelogen. Welche?", sure: "Wie sicher bist du?", sures: ["Bauchgefühl", "Ziemlich sicher", "100 %"], next: "Weiter", finish: "Ergebnis", again: "Nochmal spielen",
      round: "Runde {n} von 6", pts: "Punkte", right: "Richtig!", wrong: "Das war eine Wahrheit. Die Lüge war eine andere.", truth: "Wahr", lie: "Lüge", total: "Du hast {p} Punkte (max. 18).", best: "Bestwert: {n}", toy: "Finde die Lüge",
      ranks: ["Leicht zu täuschen", "Aufmerksame:r Leser:in", "Feine Nase", "Lügendetektor"], src: "Quelle"
    }
  };
  const tt2 = (k) => (T[lang] || T.en)[k];
  const best = () => { try { return +localStorage.getItem("truthsBest") || 0; } catch (e) { return 0; } };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  let G = null;
  function start() { G = { sets: shuffle(SETS).slice(0, 6).map((s) => ({ t: s.t, s: shuffle(s.s) })), i: 0, pick: null, conf: null, pts: 0, last: 0, done: false }; }
  const si = (n) => (lang === "de" ? n.de : n.en);
  const txt = (it) => (lang === "de" ? it[1] : it[2]), why = (it) => (lang === "de" ? it[4] : it[5]);
  function paint() {
    const body = document.getElementById("playBody");
    if (!G) start();
    if (G.done) { body.innerHTML = endHTML(); bind(); return; }
    const set = G.sets[G.i], revealed = G.conf !== null;
    const cards = set.s.map((it, k) => {
      const isLie = !it[3];
      const cls = revealed ? (isLie ? " is-lie" : " is-true") + (k === G.pick ? " is-picked" : "") : k === G.pick ? " is-picked" : "";
      return `<button type="button" class="tl__card${cls}" data-k="${k}"${revealed ? " disabled" : ""}>
        <span class="tl__emoji" aria-hidden="true">${it[0]}</span>
        <span class="tl__body"><span class="tl__text">${esc(txt(it))}</span>
        ${revealed ? `<span class="tl__badge">${esc(isLie ? tt2("lie") : tt2("truth"))}</span><span class="tl__why">${esc(why(it))} <i>${esc(tt2("src"))}: ${esc(it[6])}</i></span>` : ""}</span></button>`;
    }).join("");
    let foot = "";
    if (revealed) {
      const ok = !set.s[G.pick][3];
      foot = `<p class="wd__msg"><b>${esc(ok ? tt2("right") : tt2("wrong"))}</b> ${G.last >= 0 ? "+" : "−"}${Math.abs(G.last)}</p>
        <div class="wd__actions"><button type="button" class="orch__go" id="tlNext">${esc(tt2(G.i === 5 ? "finish" : "next"))}</button></div>`;
    } else if (G.pick !== null) {
      foot = `<p class="wd__desc">${esc(tt2("sure"))}</p><div class="wd__actions">${[0, 1, 2].map((c) => `<button type="button" class="orch__clear tl__conf" data-c="${c + 1}">${esc(tt2("sures")[c])} · ${c + 1}</button>`).join("")}</div>`;
    }
    body.innerHTML = `<div class="tl"><p class="wd__roundlabel">${esc(tt2("round").replace("{n}", G.i + 1))} · ${esc(tt2("pts"))}: ${G.pts}</p>
      <h2 class="wd__title">${esc(si({ de: set.t[0], en: set.t[1] }))}</h2><p class="wd__desc">${esc(tt2("intro"))}</p>
      <div class="tl__cards">${cards}</div>${foot}</div>`;
    bind();
  }
  function endHTML() {
    const p = G.pts, rank = tt2("ranks")[p >= 14 ? 3 : p >= 9 ? 2 : p >= 4 ? 1 : 0];
    return `<div class="tl"><h2 class="wd__title">${esc(rank)}</h2><p class="wd__desc">${esc(tt2("total").replace("{p}", p))}</p><p class="wd__msg">${esc(tt2("best").replace("{n}", best()))}</p>
      <div class="wd__actions"><button type="button" class="orch__go" id="tlAgain">${esc(tt2("again"))}</button></div></div>`;
  }
  function bind() {
    document.querySelectorAll(".tl__card").forEach((b) => b.addEventListener("click", () => { G.pick = +b.dataset.k; sfx.click(); paint(); }));
    document.querySelectorAll(".tl__conf").forEach((b) => b.addEventListener("click", () => {
      const c = +b.dataset.c, set = G.sets[G.i], ok = !set.s[G.pick][3];
      G.last = ok ? c : -(c - 1); G.pts += G.last; G.conf = c;
      sfx.lock(); setTimeout(() => sfx.score(ok ? 95 : 10), 120); paint();
    }));
    const next = document.getElementById("tlNext");
    if (next) next.addEventListener("click", () => {
      sfx.click();
      if (G.i === 5) {
        G.done = true;
        if (G.pts > best()) { try { localStorage.setItem("truthsBest", String(G.pts)); } catch (e) {} }
        if (G.pts >= 12) unlock("skeptic");
        paint(); return;
      }
      G.i++; G.pick = null; G.conf = null; G.last = 0; paint();
    });
    const again = document.getElementById("tlAgain");
    if (again) again.addEventListener("click", () => { sfx.click(); start(); paint(); });
  }
  const art = `<svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
    <rect x="8" y="12" width="64" height="16" rx="8" style="fill:var(--turq)"/><rect x="8" y="32" width="64" height="16" rx="8" style="fill:var(--orange)"/><rect x="8" y="52" width="64" height="16" rx="8" style="fill:var(--turq)"/>
    <text x="40" y="24" text-anchor="middle" style="font:800 11px sans-serif;fill:#062624">✓</text><text x="40" y="44" text-anchor="middle" style="font:800 11px sans-serif;fill:#2a1200">✗</text><text x="40" y="64" text-anchor="middle" style="font:800 11px sans-serif;fill:#062624">✓</text></svg>`;
  PLAY_GAMES.push({
    id: "truths", hash: "truths", title: { en: T.en.title, de: T.de.title }, art,
    note: () => (best() ? tt2("best").replace("{n}", best()) : tt2("toy")), layout: "plain",
    render: () => { if (!G) start(); paint(); }, state: () => G
  });
})();
