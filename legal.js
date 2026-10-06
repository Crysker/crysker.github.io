/* ============ Imprint & privacy page ============
   Uses play-shell.js for the header (language, light/dark, menu, achievements) and only fills in the text.
   Keep the privacy section in sync with what the site really does: if a new external service is added
   (a font, a script, an embed), it has to be listed here. */

const LEGAL = {
  de: {
    title: "Impressum & Datenschutz",
    crumb: "Impressum & Datenschutz",
    updated: "Stand: Oktober 2026",
    body: `
<h2>Impressum</h2>
<p class="legal__small">Offenlegung gemäß § 25 Mediengesetz und Angaben gemäß § 5 E-Commerce-Gesetz</p>
<dl class="legal__facts">
  <dt>Medieninhaber &amp; Herausgeber</dt><dd>Serkan Sönmez</dd>
  <dt>Ort</dt><dd>St. Pölten, Österreich</dd>
  <dt>E-Mail</dt><dd><a href="mailto:serkan.soenmez@gmx.at">serkan.soenmez@gmx.at</a></dd>
  <dt>Grundlegende Richtung</dt><dd>Persönliches Portfolio: Ich stelle meine Projekte, meine Ausbildung und meine Berufserfahrung vor. Dazu gibt es ein paar Minispiele zum Zeitvertreib.</dd>
</dl>
<h3>Haftung für Links</h3>
<p>Diese Website verlinkt auf externe Seiten (z. B. LinkedIn, YouTube, itch.io). Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich. Sollte mir ein rechtswidriger Inhalt auffallen oder gemeldet werden, entferne ich den Link umgehend.</p>
<h3>Urheberrecht</h3>
<p>Texte, Bilder und Videos auf dieser Website sind, sofern nicht anders angegeben, von mir. Teamprojekte sind gemeinsam mit meinen Teammitgliedern entstanden. Fremde Bilder in den Minispielen sind mit Urheber:in und Lizenz gekennzeichnet.</p>

<h2>Datenschutz</h2>
<p class="legal__lead"><b>Kurz gesagt:</b> keine Cookies, kein Tracking, keine Statistik, keine Werbung. Ich selbst bekomme keine Daten von dir, außer du schreibst mir.</p>

<h3>1. Verantwortlicher</h3>
<p>Serkan Sönmez, St. Pölten, Österreich · <a href="mailto:serkan.soenmez@gmx.at">serkan.soenmez@gmx.at</a></p>

<h3>2. Hosting über GitHub Pages</h3>
<p>Die Website liegt bei GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Beim Aufruf verarbeitet GitHub technisch nötige Daten wie deine IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite und deinen Browser, unter anderem um die Seite auszuliefern und vor Angriffen zu schützen. Rechtsgrundlage ist mein berechtigtes Interesse an einer sicheren und stabilen Bereitstellung (Art. 6 Abs. 1 lit. f DSGVO). GitHub ist unter dem EU-US Data Privacy Framework zertifiziert. Mehr dazu im <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">Datenschutzhinweis von GitHub</a>.</p>

<h3>3. Speicher in deinem Browser</h3>
<p>Die Website setzt keine Cookies. Sie merkt sich aber ein paar Dinge im lokalen Speicher deines Browsers (localStorage): Sprache, hellen oder dunklen Modus, freigeschaltete Erfolge, Highscores und Spielstände der Minispiele sowie deine Beats und eigenen Sounds im Mini-Orchester. Diese Daten bleiben auf deinem Gerät und werden nie an mich oder Dritte übertragen. Sie sind nötig, damit die Funktionen, die du selbst nutzt, funktionieren (§ 165 Abs. 3 TKG 2021). Du kannst sie jederzeit löschen, indem du in deinem Browser die Websitedaten für crysker.github.io entfernst.</p>
<p>Wenn du im Mini-Orchester einen eigenen Sound aufnimmst, fragt dein Browser vorher nach dem Mikrofon. Die Aufnahme wird nur in deinem Browser verarbeitet und nicht hochgeladen.</p>

<h3>4. YouTube-Videos</h3>
<p>Projektvideos sind über den erweiterten Datenschutzmodus von YouTube (youtube-nocookie.com) eingebunden. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Ein Video wird erst geladen, wenn du mit der Maus auf eine Projektkarte zeigst (stumme Vorschau) oder ein Video startest. Schon wenn du mit der Maus in den Projektbereich kommst, baut dein Browser vorab eine Verbindung zu YouTube auf, damit die Vorschau schneller startet. Dabei werden deine IP-Adresse und technische Daten an Google übermittelt, möglicherweise auch in die USA (Google ist unter dem EU-US Data Privacy Framework zertifiziert), und YouTube kann Daten in deinem Browser speichern. Rechtsgrundlage ist mein berechtigtes Interesse, meine Projekte anschaulich zu zeigen (Art. 6 Abs. 1 lit. f DSGVO). Auf Geräten mit Touchscreen gibt es keine Vorschau, dort lädt ein Video erst nach deinem Tippen. Mehr dazu in der <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener">Datenschutzerklärung von Google</a>.</p>

<h3>5. Schriften und Skripte</h3>
<p>Schriften (Fraunces, Plus Jakarta Sans) und alle Skripte liegen direkt auf dieser Website. Es gibt keine Verbindung zu Google Fonts oder anderen Content-Delivery-Netzwerken.</p>

<h3>6. Externe Links</h3>
<p>Links zu LinkedIn, Instagram, TikTok, YouTube, Calendly, Devpost, itch.io und anderen Seiten sind einfache Links. Erst wenn du draufklickst, verlässt du diese Website, und es gelten die Datenschutzbestimmungen der jeweiligen Seite.</p>

<h3>7. Kontakt per E-Mail</h3>
<p>Wenn du mir eine E-Mail schreibst, verwende ich deine Angaben nur, um dir zu antworten, und lösche sie, wenn sie nicht mehr gebraucht werden (Art. 6 Abs. 1 lit. b und f DSGVO).</p>

<h3>8. Deine Rechte</h3>
<p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Schreib mir dafür einfach eine E-Mail. Wenn du glaubst, dass die Verarbeitung deiner Daten gegen das Datenschutzrecht verstößt, kannst du dich bei der Österreichischen Datenschutzbehörde beschweren (Barichgasse 40–42, 1030 Wien, <a href="https://www.dsb.gv.at" target="_blank" rel="noopener">dsb.gv.at</a>).</p>`
  },
  en: {
    title: "Imprint & privacy",
    crumb: "Imprint & privacy",
    updated: "Last updated: October 2026",
    body: `
<h2>Imprint</h2>
<p class="legal__small">Disclosure under § 25 Austrian Media Act and information under § 5 Austrian E-Commerce Act</p>
<dl class="legal__facts">
  <dt>Owner &amp; publisher</dt><dd>Serkan Sönmez</dd>
  <dt>Location</dt><dd>St. Pölten, Austria</dd>
  <dt>Email</dt><dd><a href="mailto:serkan.soenmez@gmx.at">serkan.soenmez@gmx.at</a></dd>
  <dt>Purpose</dt><dd>Personal portfolio: I present my projects, my education and my work experience. Plus a few minigames to pass the time.</dd>
</dl>
<h3>Links</h3>
<p>This website links to external sites (e.g. LinkedIn, YouTube, itch.io). Their operators alone are responsible for their content. If I notice or am told about unlawful content, I remove the link right away.</p>
<h3>Copyright</h3>
<p>Unless stated otherwise, the texts, images and videos on this website are mine. Team projects were made together with my teammates. Third-party images in the minigames are credited with author and licence.</p>

<h2>Privacy</h2>
<p class="legal__lead"><b>In short:</b> no cookies, no tracking, no analytics, no ads. I don't receive any data from you unless you write to me.</p>

<h3>1. Controller</h3>
<p>Serkan Sönmez, St. Pölten, Austria · <a href="mailto:serkan.soenmez@gmx.at">serkan.soenmez@gmx.at</a></p>

<h3>2. Hosting on GitHub Pages</h3>
<p>The website is hosted on GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). When you visit, GitHub processes technically necessary data such as your IP address, date and time, the page you open and your browser, among other things to deliver the site and protect it from attacks. The legal basis is my legitimate interest in providing the site securely and reliably (Art. 6(1)(f) GDPR). GitHub is certified under the EU-US Data Privacy Framework. More in <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub's privacy statement</a>.</p>

<h3>3. Storage in your browser</h3>
<p>The website sets no cookies. It does remember a few things in your browser's local storage (localStorage): language, light or dark mode, unlocked achievements, high scores and progress in the minigames, and your beats and own sounds in Tiny Orchestra. This data stays on your device and is never sent to me or anyone else. It is needed for the features you choose to use (§ 165(3) Austrian Telecommunications Act 2021). You can delete it any time by clearing the site data for crysker.github.io in your browser.</p>
<p>If you record your own sound in Tiny Orchestra, your browser asks for microphone access first. The recording is processed only in your browser and never uploaded.</p>

<h3>4. YouTube videos</h3>
<p>Project videos are embedded in YouTube's privacy-enhanced mode (youtube-nocookie.com). The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. A video only loads when you point at a project card with your mouse (silent preview) or start a video. As soon as your mouse enters the projects area, your browser already opens a connection to YouTube so the preview starts faster. Your IP address and technical data are then sent to Google, possibly also to the USA (Google is certified under the EU-US Data Privacy Framework), and YouTube may store data in your browser. The legal basis is my legitimate interest in showing my projects in a clear way (Art. 6(1)(f) GDPR). On touch devices there is no preview; a video only loads after you tap it. More in <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener">Google's privacy policy</a>.</p>

<h3>5. Fonts and scripts</h3>
<p>Fonts (Fraunces, Plus Jakarta Sans) and all scripts are served from this website itself. There is no connection to Google Fonts or any other content delivery network.</p>

<h3>6. External links</h3>
<p>Links to LinkedIn, Instagram, TikTok, YouTube, Calendly, Devpost, itch.io and other sites are plain links. Only when you click one do you leave this website, and that site's privacy policy applies.</p>

<h3>7. Contact by email</h3>
<p>If you email me, I only use your details to reply and delete them once they are no longer needed (Art. 6(1)(b) and (f) GDPR).</p>

<h3>8. Your rights</h3>
<p>You have the right to access, rectification, erasure, restriction of processing, data portability and to object. Just send me an email. If you believe the processing of your data breaks data protection law, you can complain to the Austrian Data Protection Authority (Barichgasse 40–42, 1030 Vienna, <a href="https://www.dsb.gv.at" target="_blank" rel="noopener">dsb.gv.at</a>).</p>`
  }
};

function renderLegal() {
  const L = LEGAL[lang];
  document.title = `${L.title} · Serkan Sönmez`;
  document.getElementById("legalTitle").textContent = L.title;
  document.getElementById("legalCrumbs").innerHTML =
    `<ol><li><a href="index.html">${lang === "de" ? "Start" : "Home"}</a></li><li aria-current="page">${esc(L.crumb)}</li></ol>`;
  document.getElementById("legalBody").innerHTML = L.body + `<p class="legal__small legal__updated">${esc(L.updated)}</p>`;
}
// runs after the shell's own listener, so `lang` is already switched
document.getElementById("langToggle").addEventListener("click", renderLegal);
renderLegal();
